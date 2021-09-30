import { ethers } from "ethers";
import { Contract } from "@ethersproject/contracts";

// Addresses
import addresses from "./addresses";

// ABI
import mintAbi from "../abi/mint.json";
import wbnbAbi from "../abi/WETH.json";
import erc20Abi from "../abi/erc20.json";
import mintClubBondAbi from "../abi/mintClubBond.json";
import mintClubTokenAbi from "../abi/mintClubToken.json";
import mintClubZapAbi from "../abi/mintClubZap.json";
import { abi as IUniswapV2Router02ABI } from "@uniswap/v2-periphery/build/IUniswapV2Router02.json";
import { simpleRpcProvider } from "./providers";
import { BSC_MAINNET } from "../constants";

const { mintClubBond, mintClubZap, mint, pancakeSwapRouter, wbnb } = addresses;

export const getContract = (abi, address, signer, chainId) => {
  const signerOrProvider = signer ?? simpleRpcProvider(chainId);
  return new Contract(address, abi, signerOrProvider);
};

export const getBEP20Contract = (address, signer, chainId = BSC_MAINNET) => {
  return getContract(erc20Abi, address, signer, chainId);
};

export const getMintTokenContract = (
  address,
  signer,
  chainId = BSC_MAINNET
) => {
  return getContract(mintClubTokenAbi, address, signer, chainId);
};

export const getMintContract = (signer, chainId = BSC_MAINNET) => {
  return getContract(mintAbi, mint[chainId], signer, chainId);
};

export const getMintClubBondContract = (signer, chainId = BSC_MAINNET) => {
  return getContract(mintClubBondAbi, mintClubBond[chainId], signer, chainId);
};

export const getMintClubZapContract = (signer, chainId = BSC_MAINNET) => {
  return getContract(mintClubZapAbi, mintClubZap[chainId], signer, chainId);
};

export const getRouterContract = (signer, chainId = BSC_MAINNET) => {
  return getContract(
    IUniswapV2Router02ABI,
    pancakeSwapRouter[chainId],
    signer,
    chainId
  );
};

export const getWBNBContract = (signer, chainId = BSC_MAINNET) => {
  return getContract(wbnbAbi, wbnb[chainId], signer, chainId);
};
