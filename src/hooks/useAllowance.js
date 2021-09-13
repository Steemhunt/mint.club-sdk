import { useEffect, useState } from "react";
import { isValidAddress } from "../utils/addresses";
import { getERC20Contract, getMintTokenContract } from "../utils/contracts";

export default function useAllowance(tokenAddress, owner, spender) {
  const [allowance, setAllowance] = useState(null);
  useEffect(() => {
    (async () => {
      try {
        if (tokenAddress) {
          const contract = getERC20Contract(tokenAddress);
          const _allowance = await contract.allowance(owner, spender);
          setAllowance(_allowance);
        }
      } catch (e) {
        throw new Error(e);
      }
    })();
  }, [tokenAddress, owner, spender]);

  console.log(allowance);

  return allowance?.toString();
}
