import { ethers } from "ethers";
import sample from "lodash/sample";
import { BSC_MAINNET, BSC_TESTNET } from "../constants";

const REACT_APP_NODE_1 = "https://bsc-dataseed1.ninicoin.io";
const REACT_APP_NODE_2 = "https://bsc-dataseed1.defibit.io";
const REACT_APP_NODE_3 = "https://bsc-dataseed.binance.org";

const REACT_APP_TEST_NODE_1 = "https://data-seed-prebsc-2-s2.binance.org:8545/";
const REACT_APP_TEST_NODE_2 = "https://data-seed-prebsc-1-s3.binance.org:8545/";
const REACT_APP_TEST_NODE_3 = "https://data-seed-prebsc-2-s3.binance.org:8545/";
// https://data-seed-prebsc-2-s2.binance.org:8545/
// https://data-seed-prebsc-1-s3.binance.org:8545/
// https://data-seed-prebsc-2-s3.binance.org:8545/

// Array of available nodes to connect to
export const nodes = [REACT_APP_NODE_1, REACT_APP_NODE_2, REACT_APP_NODE_3];
export const testNodes = [
  // REACT_APP_TEST_NODE_1,
  // REACT_APP_TEST_NODE_2,
  REACT_APP_TEST_NODE_3,
];

const NODE_MAP = {
  [BSC_TESTNET]: testNodes,
  [BSC_MAINNET]: nodes,
};

const getNodeUrl = (chainId) => {
  return sample(NODE_MAP[chainId]);
};

export const simpleRpcProvider = (chainId = BSC_MAINNET) =>
  new ethers.providers.JsonRpcProvider(getNodeUrl(chainId));

export default getNodeUrl;
