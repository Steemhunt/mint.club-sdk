import { AddressZero } from "@ethersproject/constants";
import BigNumber from "bignumber.js";
import { ethers } from "ethers";
import debounce from "lodash/debounce";
import { useRef, useState } from "react";
import { useAsync } from "react-async-hook";
import useConstant from "use-constant";
import { DEFAULT_TOKEN_DECIMAL } from "../constants";
import { getErrorString } from "../errors";
import { BIG_TEN } from "../utils/bignumber";
import { calculateSell } from "../utils/buysell";
import { getERC20Contract, getMintClubBondContract } from "../utils/contracts";
import { truncateDecimals } from "../utils/formatBalance";

const useDebouncedCalculation = (
  amountIn,
  tokenAddress,
  slippage,
  referrer
) => {
  const hasError = useRef(false);
  const [loading, setLoading] = useState(false);
  const [amountOut, setAmountOut] = useState("");
  const [error, setError] = useState("");

  async function calc(amountIn, tokenAddress, slippage, referrer) {
    hasError.current = false;
    calculateSell(
      amountIn,
      tokenAddress,
      (value, tax, BN) => {
        if (!hasError.current) {
          const sell = async (signer) => {
            const bondContract = getMintClubBondContract(signer);
            const minRefund = BN.times(100 - slippage)
              .div(100)
              .toFixed(0, 1)
              .toString(10);

            const sellAmount = truncateDecimals(
              new BigNumber(amountIn)
                .times(BIG_TEN.pow(DEFAULT_TOKEN_DECIMAL))
                .toString(),
              0
            );

            return bondContract.sell(
              tokenAddress,
              sellAmount,
              minRefund,
              referrer || AddressZero
            );
          };

          const approve = async (signer) => {
            const tokenContract = getERC20Contract(tokenAddress, signer);
            const bondContract = getMintClubBondContract();

            console.log(tokenContract, bondContract);

            return tokenContract.approve(
              bondContract.address,
              ethers.constants.MaxUint256
            );
          };

          setAmountOut({ value, tax, BN, sell, approve });
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
    if (amountIn && amountIn > 0 && tokenAddress) {
      setError("");
      setLoading(true);
      return debounced(amountIn, tokenAddress, slippage, referrer);
    }
  }, [amountIn, tokenAddress, slippage, referrer]);

  return { loading, amountOut, error };
};

export default function useSellToMint({
  amountIn,
  tokenAddress,
  slippage,
  referrer,
}) {
  const { amountOut, loading, error } = useDebouncedCalculation(
    amountIn,
    tokenAddress,
    slippage,
    referrer
  );

  return { amountOut, loading, error };
}
