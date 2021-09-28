export const ETH_MAINNET = 1;
export const ETH_GOERLI = 5;
export const BSC_TESTNET = 97;
export const BSC_MAINNET = 56;

export function isValidAddress(value) {
  try {
    return ethers.utils.isAddress(value);
  } catch {
    return false;
  }
}

const data = {
  mintClubBond: {
    [BSC_TESTNET]: "0xB9B492B5D470ae0eB2BB07a87062EC97615d8b09",
    [BSC_MAINNET]: "0x8BBac0C7583Cc146244a18863E708bFFbbF19975",
  },
  mintClubZap: {
    [BSC_TESTNET]: "0x320da45A732c0deEeaD3285D7646098c1b8E9a48",
    [BSC_MAINNET]: "0x5d1f0031eC952761294D6326A41f123AE7785546",
  },
  mint: {
    [BSC_TESTNET]: "0x4d24BF63E5d6E03708e2DFd5cc8253B3f22FE913",
    [BSC_MAINNET]: "0x1f3Af095CDa17d63cad238358837321e95FC5915",
  },
  pancakeswapRouter: {
    [BSC_TESTNET]: "0xD99D1c33F9fC3444f8101754aBC46c52416550D1", // Factory: 0x6725F303b657a9451d8BA641348b6761A6CC7a17
    [BSC_MAINNET]: "0x10ED43C718714eb63d5aA57B78B54704E256024E",
  },
  wbnb: {
    [BSC_TESTNET]: "0xae13d989daC2f0dEbFf460aC112a837C89BAa7cd",
    [BSC_MAINNET]: "0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c",
  },
  busd: {
    [BSC_TESTNET]: "0xeD24FC36d5Ee211Ea25A80239Fb8C4Cfd80f12Ee",
    [BSC_MAINNET]: "0xe9e7cea3dedca5984780bafc599bd69add087d56",
  },
  usdt: {
    [BSC_TESTNET]: "0x337610d27c682E347C9cD60BD4b3b107C9d34dDd",
    [BSC_MAINNET]: "0x55d398326f99059fF775485246999027B3197955",
  },
};

export const ADDRESS_TO_SYMBOL = {
  "0x1f3Af095CDa17d63cad238358837321e95FC5915": "mint",
  "0xe9e7cea3dedca5984780bafc599bd69add087d56": "busd",
  "0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c": "wbnb",
};

export default data;
