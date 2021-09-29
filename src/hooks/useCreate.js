import { useCallback } from "react";
import { getMintClubBondContract } from "../utils/contracts";
import BigNumber from "bignumber.js";
import { BIG_TEN } from "../utils/bignumber";
import { BSC_MAINNET, DEFAULT_TOKEN_DECIMAL } from "../constants";
import { AddressZero } from "@ethersproject/constants";

export default function useCreate(signer, chainId = BSC_MAINNET) {
  async function createToken(
    name,
    symbol,
    supply,
    onStart,
    onSuccess,
    onError
  ) {
    try {
      const bondContract = getMintClubBondContract(signer, chainId);
      const tx = await bondContract.createToken(
        name,
        symbol,
        new BigNumber(supply)
          .times(BIG_TEN.pow(DEFAULT_TOKEN_DECIMAL))
          .toString()
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

  async function createTokenAndBuy(
    name,
    symbol,
    supply,
    amount,
    beneficiary,
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
      toastError(e);
      onError && onError(e);
    }
  }

  return { createToken, createTokenAndBuy };
}
