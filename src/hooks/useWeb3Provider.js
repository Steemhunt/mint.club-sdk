import { useEffect, useState, useRef } from "react";
import { useWeb3React } from "@web3-react/core";
import { simpleRpcProvider } from "../utils/providers";

const useWeb3Provider = () => {
  const { library, chainId } = useWeb3React();
  const refEth = useRef(library);
  const [provider, setProvider] = useState(library || simpleRpcProvider());

  useEffect(() => {
    if (library !== refEth.current) {
      setProvider(library || simpleRpcProvider(chainId));
      refEth.current = library;
    }
  }, [library, chainId]);

  return provider;
};

export default useWeb3Provider;
