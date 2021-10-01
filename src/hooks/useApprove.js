import { ethers } from "ethers";
import { useCallback } from "react";
import { BSC_MAINNET } from "../constants";
import { getBEP20Contract } from "../utils/contracts";

export default function useApprove() {
  const approve = useCallback(
    async (
      tokenAddress,
      spender,
      amount,
      signer,
      chainId = BSC_MAINNET,
      onStart,
      onSuccess,
      onError
    ) => {
      amount = amount || ethers.constants.MaxUint256;
      try {
        const contract = getBEP20Contract(tokenAddress, signer, chainId);
        const tx = await contract.approve(spender, amount);
        onStart && onStart();
        const receipt = await tx.wait();
        onSuccess && onSuccess(receipt);
      } catch (e) {
        console.error(e);
        onError && onError(e);
      }
    },
    []
  );

  return { approve };
}
