import { useWeb3React } from "@web3-react/core";
import { useMemo } from "react";
import useWeb3Provider from "../hooks/useWeb3Provider";
import { getMintClubBondContract } from "../utils/contracts";

export const useMintClubBondContract = (signer) => {
  const provider = useWeb3Provider();
  const { account } = useWeb3React();

  return useMemo(
    () => getMintClubBondContract(provider.getSigner(account)),
    [provider, account]
  );
};
