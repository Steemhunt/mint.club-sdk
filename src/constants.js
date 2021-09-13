import BigNumber from "bignumber.js";

BigNumber.config({
  EXPONENTIAL_AT: 1000,
  DECIMAL_PLACES: 80,
});

export const DEFAULT_TOKEN_DECIMAL = 18;
export const MINT_DECIMAL_FORMAT = "0,0.00";
export const INPUT_MINT = "MINT";
export const INPUT_USD = "USD";
export const BSC_MAINNET = 56;
