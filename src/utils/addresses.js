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
    [BSC_TESTNET]: "0xa91D00e26d2D535c47DE44190141d65149f8C965",
    [BSC_MAINNET]: "0x8BBac0C7583Cc146244a18863E708bFFbbF19975",
  },
  mintClubZap: {
    [BSC_MAINNET]: "0x5d1f0031eC952761294D6326A41f123AE7785546",
  },
  mint: {
    [BSC_TESTNET]: "0xda6e0a343802c22D28379A04B65E20dA69e35A4C",
    [BSC_MAINNET]: "0x1f3Af095CDa17d63cad238358837321e95FC5915",
  },
  pancakeswapRouter: {
    [BSC_TESTNET]: "0xD99D1c33F9fC3444f8101754aBC46c52416550D1",
    [BSC_MAINNET]: "0x10ED43C718714eb63d5aA57B78B54704E256024E",
  },
  wbnb: {
    [BSC_MAINNET]: "0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c",
  },
  busd: {
    [BSC_MAINNET]: "0xe9e7cea3dedca5984780bafc599bd69add087d56",
  },
  usdt: {
    [BSC_MAINNET]: "0x55d398326f99059fF775485246999027B3197955",
  },
};

export const ADDRESS_TO_SYMBOL = {
  "0x1f3Af095CDa17d63cad238358837321e95FC5915": "mint",
  "0xe9e7cea3dedca5984780bafc599bd69add087d56": "busd",
  "0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c": "wbnb",
};

export default data;
