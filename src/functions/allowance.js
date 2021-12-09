import { BSC_MAINNET } from "../constants";
import { getBEP20Contract } from "../utils/contracts";

export default async function allowance(
  tokenAddress,
  owner,
  spender,
  chainId = BSC_MAINNET,
  onSuccess,
  onError
) {
  try {
    const contract = getBEP20Contract(tokenAddress, null, chainId);
    const tx = await contract.allowance(owner, spender);
    onSuccess && onSuccess(tx);
    return tx;
  } catch (e) {
    console.error(e);
    onError && onError(e);
  }
}
