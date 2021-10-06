import { AddressZero } from "@ethersproject/constants";
import BigNumber from "bignumber.js";
import { ethers } from "ethers";
import debounce from "lodash/debounce";
import { useRef, useState } from "react";
import { useAsync } from "react-async-hook";
import useConstant from "use-constant";
import { BSC_MAINNET, DEFAULT_TOKEN_DECIMAL } from "../constants";
import addresses from "../utils/addresses";
import { getErrorString } from "../errors";
import { BIG_TEN } from "../utils/bignumber";
import { calculateSellToCrypto } from "../utils/buysell";
import { getBEP20Contract, getMintClubZapContract } from "../utils/contracts";
import { truncateDecimals } from "../utils/formatBalance";

const useDebouncedCalculation = (
  tokenAddress,
  tokenOut,
  amountIn,
  slippage,
  referrer,
  chainId = BSC_MAINNET
) => {
  const hasError = useRef(false);
  const [loading, setLoading] = useState(false);
  const [amountOut, setAmountOut] = useState("");
  const [error, setError] = useState("");

  async function calc(
    tokenAddress,
    tokenOut,
    amountIn,
    slippage,
    referrer,
    chainId
  ) {
    hasError.current = false;

    const outAddress =
      tokenOut.address === "BNB" ? addresses.wbnb[chainId] : tokenOut.address;

    calculateSellToCrypto(
      tokenAddress,
      outAddress,
      amountIn,
      chainId,
      (value, tax, BN) => {
        if (!hasError.current) {
          const sell = async (signer) => {
            const zapContract = getMintClubZapContract(signer, chainId);
            const minAmountOut = BN.times(100 - slippage)
              .div(100)
              .toFixed(0, 1)
              .toString(10);

            const sellAmount = truncateDecimals(
              new BigNumber(amountIn)
                .times(BIG_TEN.pow(DEFAULT_TOKEN_DECIMAL))
                .toString(),
              0
            );

            if (tokenOut.address === "BNB") {
              return zapContract.zapOutBNB(
                tokenAddress,
                sellAmount,
                minAmountOut,
                referrer || AddressZero
              );
            } else {
              return zapContract.zapOut(
                tokenOut.address,
                tokenAddress,
                new BigNumber(amountIn)
                  .times(BIG_TEN.pow(tokenOut.decimals))
                  .toString(),
                minAmountOut,
                referrer || AddressZero
              );
            }
          };

          const approve = async (signer) => {
            const tokenContract = getBEP20Contract(
              tokenAddress,
              signer,
              chainId
            );

            const zapContract = getMintClubZapContract(signer, chainId);

            return tokenContract.approve(
              zapContract.address,
              ethers.constants.MaxUint256
            );
          };

          setAmountOut({ value, tax, BN, sell, approve });
          setError(null);
        }
        setLoading(false);
      },
      (e) => {
        console.error(e);
        setError(getErrorString(e));
        setLoading(false);
      }
    );
  }

  const debounced = useConstant(() => debounce(calc, 1000));

  useAsync(async () => {
    if (amountIn && amountIn > 0 && tokenAddress && tokenOut) {
      setError("");
      setLoading(true);
      return debounced(
        tokenAddress,
        tokenOut,
        amountIn,
        slippage,
        referrer,
        chainId
      );
    }
  }, [
    amountIn,
    tokenAddress,
    tokenOut.address,
    tokenOut.decimals,
    slippage,
    referrer,
    chainId,
  ]);

  return { loading, amountOut, error };
};

export default function useSellToCrypto({
  amountIn,
  tokenAddress,
  tokenOut,
  slippage,
  referrer,
  chainId,
}) {
  const { amountOut, loading, error } = useDebouncedCalculation(
    tokenAddress,
    tokenOut,
    amountIn,
    slippage,
    referrer,
    chainId
  );

  return { amountOut, loading, error };
}
