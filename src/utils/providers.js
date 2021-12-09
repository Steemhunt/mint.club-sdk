import { ethers } from "ethers";
import sample from "lodash/sample";
import { BSC_MAINNET, BSC_TESTNET } from "../constants";

const REACT_APP_NODE_1 = "https://bsc-dataseed1.binance.org/";
const REACT_APP_NODE_2 = "https://bsc-dataseed1.defibit.io/";
const REACT_APP_NODE_3 = "https://bsc-dataseed1.ninicoin.io/";
const REACT_APP_NODE_4 = "https://bsc-dataseed2.binance.org/";
const REACT_APP_NODE_5 = "https://bsc-dataseed2.defibit.io/";
const REACT_APP_NODE_6 = "https://bsc-dataseed2.ninicoin.io/";
const REACT_APP_NODE_7 = "https://bsc-dataseed3.binance.org/";
const REACT_APP_NODE_8 = "https://bsc-dataseed3.defibit.io/";
const REACT_APP_NODE_9 = "https://bsc-dataseed3.ninicoin.io/";
const REACT_APP_NODE_10 = "https://bsc-dataseed4.binance.org/";
const REACT_APP_NODE_11 = "https://bsc-dataseed4.defibit.io/";
const REACT_APP_NODE_12 = "https://bsc-dataseed4.ninicoin.io/";

const REACT_APP_TEST_NODE_1 = "https://data-seed-prebsc-2-s2.binance.org:8545/";
const REACT_APP_TEST_NODE_2 = "https://data-seed-prebsc-1-s3.binance.org:8545/";
const REACT_APP_TEST_NODE_3 = "https://data-seed-prebsc-2-s3.binance.org:8545/";

// Array of available nodes to connect to
export const nodes = [
  REACT_APP_NODE_1,
  REACT_APP_NODE_2,
  REACT_APP_NODE_3,
  // REACT_APP_NODE_4,
  // REACT_APP_NODE_5,
  // REACT_APP_NODE_6,
  // REACT_APP_NODE_7,
  // REACT_APP_NODE_8,
  // REACT_APP_NODE_9,
  // REACT_APP_NODE_10,
  // REACT_APP_NODE_11,
  // REACT_APP_NODE_12,
];

export const testNodes = [
  REACT_APP_TEST_NODE_1,
  REACT_APP_TEST_NODE_2,
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
