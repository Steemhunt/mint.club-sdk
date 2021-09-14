import { ADDRESS_ZERO } from "@uniswap/v3-sdk";
import BigNumber from "bignumber.js";
import debounce from "lodash/debounce";
import React, { useRef, useState } from "react";
import { useAsync } from "react-async-hook";
import useConstant from "use-constant";
import { DEFAULT_TOKEN_DECIMAL, INPUT_USD } from "../constants";
import { BIG_TEN } from "../utils/bignumber";
import { calculateMintOutAmount } from "../utils/buysell";
import { truncateDecimals } from "../utils/formatBalance";
import { useMintPrice } from "./useMintPrice";
import { useWeb3React } from "@web3-react/core";
import { isValidAddress } from "../utils/addresses";
import { getErrorString } from "../errors";
import { getMintClubBondContract } from "../utils/contracts";

const useDebouncedCalculation = (
  amountIn,
  tokenAddress,
  slippage,
  referrer,
  isUSD,
  forcedMintPrice
) => {
  const hasError = useRef(false);
  const [loading, setLoading] = useState(false);
  const [amountOut, setAmountOut] = useState("");
  const [buy, setBuy] = useState(null);
  const [error, setError] = useState("");
  const { getMintPrice } = useMintPrice();
  const { account, library } = useWeb3React();

  async function calc(
    amountIn,
    tokenAddress,
    slippage,
    referrer,
    isUSD,
    forcedMintPrice
  ) {
    let price, amount;
    amount = amountIn;

    if (isUSD) {
      price = forcedMintPrice || (await getMintPrice());
      amount = amountIn / price;
    }

    hasError.current = false;
    calculateMintOutAmount(
      tokenAddress,
      amount,
      (value, tax, BN) => {
        if (!hasError.current) {
          const buy = async (signer) => {
            const minReward = truncateDecimals(
              BN.times(100 - slippage)
                .div(100)
                .toFixed(0, 1)
                .toString(10),
              0
            );

            const reserveAmount = truncateDecimals(
              new BigNumber(amount)
                .times(BIG_TEN.pow(DEFAULT_TOKEN_DECIMAL))
                .toString(),
              0
            );

            const bondContract = getMintClubBondContract(signer);
            return bondContract.buy(
              tokenAddress,
              reserveAmount,
              minReward,
              referrer || ADDRESS_ZERO
            );
          };

          // setBuy(buy);
          setAmountOut({ value, tax, BN, buy });
          setError(null);
        }
        setLoading(false);
      },
      (e) => {
        setError(getErrorString(e));
        setLoading(false);
        // throw new Error(e);
      }
    );
  }

  const debounced = useConstant(() => debounce(calc, 1000));

  useAsync(async () => {
    if (amountIn && amountIn > 0) {
      setError("");
      setLoading(true);
      return debounced(
        amountIn,
        tokenAddress,
        slippage,
        referrer,
        isUSD,
        forcedMintPrice
      );
    }
  }, [amountIn, tokenAddress, slippage, referrer, isUSD, forcedMintPrice]);

  return { loading, amountOut, error, buy };
};

export default function useBuyWithMint({
  amountIn,
  tokenAddress,
  slippage,
  inputType,
  referrer,
  mintPrice, //optional
}) {
  const { amountOut, loading, error } = useDebouncedCalculation(
    amountIn,
    tokenAddress,
    slippage,
    referrer,
    inputType === INPUT_USD,
    mintPrice
  );

  return { amountOut, loading, error };
}
