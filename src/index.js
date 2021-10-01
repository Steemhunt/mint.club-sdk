import useBuyWithMint from "./hooks/useBuyWithMint";
import useBuyWithCrypto from "./hooks/useBuyWithCrypto";
import useSellToMint from "./hooks/useSellToMint";
import useAllowance from "./hooks/useAllowance";
import useCreate from "./hooks/useCreate";
import useWeb3Provider from "./hooks/useWeb3Provider";
import ADDRESSES from "./utils/addresses";
import {
  getBEP20Contract,
  getContract,
  getMintClubZapContract,
  getMintTokenContract,
  getMintClubBondContract,
} from "./utils/contracts";

import { BSC_MAINNET, BSC_TESTNET } from "./utils/addresses";
import useApprove from "./hooks/useApprove";

export {
  useBuyWithMint,
  useBuyWithCrypto,
  useSellToMint,
  useCreate,
  useAllowance,
  useWeb3Provider,
  useApprove,
  getContract,
  getMintClubBondContract,
  getMintClubZapContract,
  getMintTokenContract,
  getBEP20Contract,
  BSC_MAINNET,
  BSC_TESTNET,
  ADDRESSES,
};
