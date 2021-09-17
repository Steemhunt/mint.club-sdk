import BigNumber from "bignumber.js";
import debounce from "lodash/debounce";
import { useRef, useState } from "react";
import { useAsync } from "react-async-hook";
import useConstant from "use-constant";
import { DEFAULT_TOKEN_DECIMAL, INPUT_USD } from "../constants";
import { getErrorString } from "../errors";
import { BIG_TEN } from "../utils/bignumber";
import { calculateCryptoOutAmount } from "../utils/buysell";
import { truncateDecimals } from "../utils/formatBalance";
import { BSC_MAINNET } from "../constants";
import addresses from "../utils/addresses";
import { getMintClubZapContract } from "../utils/contracts";
import { AddressZero } from "@ethersproject/constants";

const useDebouncedCalculation = (
  amountIn,
  tokenIn,
  tokenAddress,
  slippage,
  referrer
) => {
  const hasError = useRef(false);
  const [loading, setLoading] = useState(false);
  const [amountOut, setAmountOut] = useState("");
  const [error, setError] = useState("");

  async function calc(amountIn, tokenIn, tokenAddress, slippage, referrer) {
    console.log("token in", tokenIn);
    hasError.current = false;
    const inAddress =
      tokenIn.address === "BNB" ? addresses.wbnb[BSC_MAINNET] : tokenIn.address;
    calculateCryptoOutAmount(
      inAddress,
      tokenAddress,
      amountIn,
      (value, tax, BN) => {
        if (!hasError.current) {
          const buy = async (signer) => {
            const zapContract = getMintClubZapContract(signer);
            const minReward = truncateDecimals(
              BN.times(100 - slippage)
                .div(100)
                .toFixed(0, 1)
                .toString(10),
              0
            );

            if (tokenIn.address === "BNB") {
              return zapContract.zapInBNB(
                tokenAddress,
                minReward,
                referrer || AddressZero,
                {
                  value: new BigNumber(amountIn)
                    .times(BIG_TEN.pow(tokenIn.decimals))
                    .toString(),
                }
              );
            } else {
              return zapContract.zapIn(
                tokenIn.address,
                tokenAddress,
                new BigNumber(amountIn)
                  .times(BIG_TEN.pow(tokenIn.decimals))
                  .toString(),
                minReward,
                referrer || AddressZero
              );
            }
          };

          setAmountOut({ value, tax, BN, buy });
          setError(null);
        }
        setLoading(false);
      },
      (e) => {
        setError(getErrorString(e));
        setLoading(false);
      }
    );
  }

  const debounced = useConstant(() => debounce(calc, 1000));

  useAsync(async () => {
    if (!tokenIn.address) {
      setError("tokenIn address must be set");
    } else if (amountIn && amountIn > 0 && tokenAddress && tokenIn.address) {
      setError("");
      setLoading(true);
      return debounced(amountIn, tokenIn, tokenAddress, slippage, referrer);
    }
  }, [
    amountIn,
    tokenIn.address,
    tokenIn.decimals,
    tokenAddress,
    slippage,
    referrer,
  ]);

  return { loading, amountOut, error };
};

export default function useBuyWithCrypto({
  amountIn,
  tokenIn,
  tokenAddress,
  slippage,
  referrer,
}) {
  const { amountOut, loading, error } = useDebouncedCalculation(
    amountIn,
    tokenIn,
    tokenAddress,
    slippage,
    referrer
  );

  return { amountOut, loading, error };
}
