import { AddressZero } from "@ethersproject/constants";
import BigNumber from "bignumber.js";
import { ethers } from "ethers";
import { BSC_MAINNET, DEFAULT_TOKEN_DECIMAL } from "../constants";
import { BIG_TEN } from "../utils/bignumber";
import { calculateSellToMint } from "../utils/buysell";
import { getBEP20Contract, getMintClubBondContract } from "../utils/contracts";
import { truncateDecimals } from "../utils/formatBalance";

export default async function sellToMint(
  amountIn,
  tokenAddress,
  slippage,
  referrer,
  chainId = BSC_MAINNET
) {
  const [value, tax, BN] = await calculateSellToMint(
    amountIn,
    tokenAddress,
    chainId
  );

  const sell = async (signer) => {
    const bondContract = getMintClubBondContract(signer, chainId);
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
    const tokenContract = getBEP20Contract(tokenAddress, signer, chainId);

    const bondContract = getMintClubBondContract(signer, chainId);

    return tokenContract.approve(
      bondContract.address,
      ethers.constants.MaxUint256
    );
  };

  return { value, tax, BN, sell, approve };
}
