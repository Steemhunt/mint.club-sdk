import { ethers } from "ethers";
import { BSC_MAINNET } from "../constants";
import { getBEP20Contract } from "../utils/contracts";

export default async function approve(
  tokenAddress,
  spender,
  signer,
  amount,
  chainId = BSC_MAINNET,
  onStart,
  onSuccess,
  onError
) {
  const _amount = amount || ethers.constants.MaxUint256;
  try {
    const contract = getBEP20Contract(tokenAddress, signer, chainId);
    const tx = await contract.approve(spender, _amount);
    onStart && onStart();
    const receipt = await tx.wait();
    onSuccess && onSuccess(receipt);
  } catch (e) {
    console.error(e);
    onError && onError(e);
  }
}
