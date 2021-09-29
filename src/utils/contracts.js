import { ethers } from "ethers";
import { Contract } from "@ethersproject/contracts";

// Addresses
import addresses from "./addresses";
const { mintClubBond, mintClubZap, mint, pancakeSwapRouter, wbnb } = addresses;

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

export const getContract = (abi, address, signer) => {
  const signerOrProvider = signer ?? simpleRpcProvider;
  return new Contract(address, abi, signerOrProvider);
};

export const getBEP20Contract = (address, signer) => {
  return getContract(erc20Abi, address, signer);
};

export const getMintTokenContract = (address, signer) => {
  return getContract(mintClubTokenAbi, address, signer);
};

export const getMintContract = (signer, chainId = BSC_MAINNET) => {
  return getContract(mintAbi, mint[chainId], signer);
};

export const getMintClubBondContract = (signer, chainId = BSC_MAINNET) => {
  return getContract(mintClubBondAbi, mintClubBond[chainId], signer);
};

export const getMintClubZapContract = (signer, chainId = BSC_MAINNET) => {
  return getContract(mintClubZapAbi, mintClubZap[chainId], signer);
};

export const getRouterContract = (signer, chainId = BSC_MAINNET) => {
  return getContract(IUniswapV2Router02ABI, pancakeSwapRouter[chainId], signer);
};

export const getWBNBContract = (signer, chainId = BSC_MAINNET) => {
  return getContract(wbnbAbi, wbnb[chainId], signer);
};
