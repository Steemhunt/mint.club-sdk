import BigNumber from "bignumber.js";
import { BIG_TEN } from "./bignumber";
import { MINT_DECIMAL_FORMAT } from "../constants";
import numeral from "numeral";

/**
 * Take a formatted amount, e.g. 15 BNB and convert it to full decimal value, e.g. 15000000000000000
 */
export const getDecimalAmount = (amount, decimals = 18) => {
  return new BigNumber(amount).times(BIG_TEN.pow(decimals));
};

export const getAbbreviated = (amount, maxValue = 1000000) => {
  if (amount > maxValue) return numeral(amount).format("0.0a").toUpperCase();
  return numeral(amount).format("0,0");
};

export const getBalanceAmount = (amount, decimals = 18) => {
  return new BigNumber(amount).dividedBy(BIG_TEN.pow(decimals));
};

export function toFixedDown(num, digits = 18) {
  if (!num) return "";
  return Math.trunc(num * Math.pow(10, digits)) / Math.pow(10, digits);
}

export function truncateDecimals(num, digits = 18) {
  const str = num?.toString();

  if (str?.includes(".")) {
    const numbers = str.split(".");
    const decimals = numbers[1];
    if (digits === 0) {
      return numbers[0];
    } else if (decimals.length > digits) {
      return `${numbers[0]}.${numbers[1].toString().substring(0, digits)}`;
    }

    return num;
  }

  return num;
}

export const handleTinyNumber = (value, format = "0,0.000000") => {
  if (Number.isNaN(value) || value === 0) return "0.00";
  else if (value <= 1e-2) return "< 0.01";
  else return numeral(value).format(format);
};

export const handleTinyUSD = (value, format = "$0,0.00") => {
  if (Number.isNaN(value) || value === 0) return "$0.00";
  else if (value <= 1e-2) return "< $0.01";
  else return numeral(value).format(format);
};

export const handleTinyPercentage = (value, format = "0,0.00%") => {
  if (Number.isNaN(value) || value === 0) return "0.00%";
  else if (value <= 1e-2) return "< 0.01%";
  else return numeral(value).format(format);
};

export const formatMintBalance = (value, format = MINT_DECIMAL_FORMAT) => {
  if (Number.isNaN(value) || value === 0) return "0.00";
  else if (value <= 1e-2) return "< 0.01";
  else return numeral(value).format(format);
};

/**
 * This function is not really necessary but is used throughout the site.
 */
export const getBalanceNumber = (balance, decimals = 18) => {
  return getBalanceAmount(balance, decimals).toNumber();
};

export const getFullDisplayBalance = (
  balance,
  decimals = 18,
  decimalsToAppear
) => {
  return getBalanceAmount(balance, decimals).toFixed(decimalsToAppear);
};

export const formatNumber = (number, minPrecision = 2, maxPrecision = 2) => {
  const options = {
    minimumFractionDigits: minPrecision,
    maximumFractionDigits: maxPrecision,
  };
  return number.toLocaleString(undefined, options);
};
