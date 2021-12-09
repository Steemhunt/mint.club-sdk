import { AddressZero } from "@ethersproject/constants";
import BigNumber from "bignumber.js";
import { BSC_MAINNET, DEFAULT_TOKEN_DECIMAL } from "../constants";
import { BIG_TEN } from "../utils/bignumber";
import { getMintClubBondContract } from "../utils/contracts";

export async function createToken(
  name,
  symbol,
  supply,
  signer,
  chainId = BSC_MAINNET,
  onStart,
  onSuccess,
  onError
) {
  try {
    const bondContract = getMintClubBondContract(signer, chainId);
    const tx = await bondContract.createToken(
      name,
      symbol,
      new BigNumber(supply).times(BIG_TEN.pow(DEFAULT_TOKEN_DECIMAL)).toString()
    );
    onStart && onStart();
    const receipt = await tx.wait();
    onSuccess && onSuccess(receipt);
    return tx;
  } catch (e) {
    console.error(e);
    onError && onError(e);
  }
}

export async function createTokenAndBuy(
  name,
  symbol,
  supply,
  amount,
  beneficiary,
  signer,
  chainId = BSC_MAINNET,
  onStart,
  onSuccess,
  onError
) {
  try {
    const bondContract = getMintClubBondContract(signer, chainId);
    const tx = await bondContract.createAndBuy(
      name,
      symbol,
      new BigNumber(supply)
        .times(BIG_TEN.pow(DEFAULT_TOKEN_DECIMAL))
        .toString(),
      new BigNumber(amount)
        .times(BIG_TEN.pow(DEFAULT_TOKEN_DECIMAL))
        .toString(),
      beneficiary || AddressZero
    );
    onStart && onStart();
    const receipt = await tx.wait();
    onSuccess && onSuccess(receipt);
    return tx;
  } catch (e) {
    console.error(e);
    onError && onError(e);
  }
}
