import { useEffect, useState } from "react";
import { BSC_MAINNET } from "../constants";
import { getBEP20Contract } from "../utils/contracts";

export default function useAllowance(
  tokenAddress,
  owner,
  spender,
  chainId = BSC_MAINNET
) {
  const [allowance, setAllowance] = useState(null);
  useEffect(() => {
    (async () => {
      try {
        if (tokenAddress && owner && spender && chainId) {
          const contract = getBEP20Contract(tokenAddress, null, chainId);
          const _allowance = await contract.allowance(owner, spender);
          setAllowance(_allowance);
        }
      } catch (e) {
        throw new Error(e);
      }
    })();
  }, [tokenAddress, owner, spender, chainId]);

  return allowance?.toString();
}
