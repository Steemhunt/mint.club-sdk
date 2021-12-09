import ADDRESSES, { BSC_MAINNET, BSC_TESTNET } from "./utils/addresses";

import approve from "./functions/approve";
import balanceOf from "./functions/balanceOf";
import allowance from "./functions/allowance";
import buyWithCrypto from "./functions/buyWithCrypto";
import buyWithMint from "./functions/buyWithMint";
import { createToken, createTokenAndBuy } from "./functions/create";
import getMintPrice from "./functions/getMintPrice";
import sellToCrypto from "./functions/sellToCrypto";
import sellToMint from "./functions/sellToMint";

import {
  getBEP20Contract,
  getContract,
  getMintClubBondContract,
  getMintClubZapContract,
  getMintTokenContract,
} from "./utils/contracts";

export {
  allowance,
  approve,
  balanceOf,
  buyWithCrypto,
  buyWithMint,
  createToken,
  createTokenAndBuy,
  getMintPrice,
  sellToCrypto,
  sellToMint,
  getContract,
  getMintClubBondContract,
  getMintClubZapContract,
  getMintTokenContract,
  getBEP20Contract,
  BSC_MAINNET,
  BSC_TESTNET,
  ADDRESSES,
};
