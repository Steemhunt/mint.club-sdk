import { ethers } from "ethers";
import sample from "lodash/sample";

const REACT_APP_NODE_1 = "https://bsc-dataseed1.ninicoin.io";
const REACT_APP_NODE_2 = "https://bsc-dataseed1.defibit.io";
const REACT_APP_NODE_3 = "https://bsc-dataseed.binance.org";

// Array of available nodes to connect to
export const nodes = [REACT_APP_NODE_1, REACT_APP_NODE_2, REACT_APP_NODE_3];

const getNodeUrl = () => {
  return sample(nodes);
};

export const simpleRpcProvider = new ethers.providers.JsonRpcProvider(
  getNodeUrl()
);

export default getNodeUrl;
