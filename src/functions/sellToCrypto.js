import { AddressZero } from "@ethersproject/constants";
import BigNumber from "bignumber.js";
import { ethers } from "ethers";
import { BSC_MAINNET, DEFAULT_TOKEN_DECIMAL } from "../constants";
import addresses from "../utils/addresses";
import { BIG_TEN } from "../utils/bignumber";
import { calculateSellToCrypto } from "../utils/buysell";
import { getBEP20Contract, getMintClubZapContract } from "../utils/contracts";
import { truncateDecimals } from "../utils/formatBalance";

export default async function sellToCrypto(
  amountIn,
  tokenAddress,
  tokenOut,
  slippage,
  referrer,
  chainId = BSC_MAINNET
) {
  const outAddress =
    tokenOut.address === "BNB" ? addresses.wbnb[chainId] : tokenOut.address;

  const [value, tax, BN] = await calculateSellToCrypto(
    tokenAddress,
    outAddress,
    amountIn,
    chainId
  );

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
        tokenAddress,
        tokenOut.address,
        new BigNumber(amountIn)
          .times(BIG_TEN.pow(tokenOut.decimals))
          .toString(),
        minAmountOut,
        referrer || AddressZero
      );
    }
  };

  const approve = async (signer) => {
    const tokenContract = getBEP20Contract(tokenAddress, signer, chainId);

    const zapContract = getMintClubZapContract(signer, chainId);

    return tokenContract.approve(
      zapContract.address,
      ethers.constants.MaxUint256
    );
  };

  return { value, tax, BN, sell, approve };
}
