import { useEffect, useState } from "react";
import { getBEP20Contract } from "../utils/contracts";

export default function useAllowance(tokenAddress, owner, spender) {
  const [allowance, setAllowance] = useState(null);
  useEffect(() => {
    (async () => {
      try {
        if (tokenAddress && owner && spender) {
          const contract = getBEP20Contract(tokenAddress);
          const _allowance = await contract.allowance(owner, spender);
          setAllowance(_allowance);
        }
      } catch (e) {
        throw new Error(e);
      }
    })();
  }, [tokenAddress, owner, spender]);

  return allowance?.toString();
}
