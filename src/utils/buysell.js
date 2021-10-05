import BigNumber from "bignumber.js";
import { getMintClubBondContract, getMintClubZapContract } from "./contracts";
import { BSC_MAINNET, DEFAULT_TOKEN_DECIMAL } from "../constants";
import { BIG_TEN } from "./bignumber";
import { getBalanceNumber, truncateDecimals } from "./formatBalance";
import { INPUT_USD } from "../constants";

export async function calculateCryptoOutAmount(
  from,
  to,
  amount,
  chainId = BSC_MAINNET,
  onSuccess,
  onError
) {
  try {
    // console.log(toFixedDown(mintAmount));
    console.log("call");
    const contract = getMintClubZapContract(null, chainId);
    console.log(from, to, amount, chainId);
    const result = await contract.estimateZapIn(
      from,
      to,
      truncateDecimals(
        new BigNumber(amount)
          .times(BIG_TEN.pow(DEFAULT_TOKEN_DECIMAL))
          .toString(),
        0
      )
    );
    const mintTokenTaxAmount = getBalanceNumber(
      result.mintTokenTaxAmount.toString()
    );
    const tokenToReceive = getBalanceNumber(result.tokenToReceive.toString());
    const outBN = new BigNumber(result.tokenToReceive.toString());
    onSuccess(tokenToReceive, mintTokenTaxAmount, outBN);
  } catch (e) {
    console.error(e);
    onError(e);
  }
}

/**
 * Used for reverse calculation, when calculating IN amount.
 * @param {*} amount
 * @param {*} totalSupply
 * @param {*} address
 * @param {*} getBestTradeExactOut
 * @param {*} onSuccess
 * @param {*} onError
 */

export async function calculateCryptoInAmount(
  amount,
  totalSupply,
  address,
  getBestTradeExactOut,
  onSuccess,
  onError
) {
  const squareMax = new BigNumber(totalSupply).plus(amount).exponentiatedBy(2);
  const squareTotal = new BigNumber(totalSupply).exponentiatedBy(2);

  const mintRequired = new BigNumber(1)
    .dividedBy(2)
    .multipliedBy(squareMax.minus(squareTotal))
    .multipliedBy(1000)
    .dividedBy(997)
    .toFixed(18);

  const tokenRequired = await getBestTradeExactOut(address, mintRequired);
  onSuccess(tokenRequired);
}

export async function calculateMintOutAmount(
  tokenAddress,
  mintAmount,
  chainId = BSC_MAINNET,
  onSuccess,
  onError
) {
  try {
    const contract = getMintClubBondContract(null, chainId);
    const result = await contract.getMintReward(
      tokenAddress,
      truncateDecimals(
        new BigNumber(mintAmount)
          .times(BIG_TEN.pow(DEFAULT_TOKEN_DECIMAL))
          .toString(),
        0
      )
    );
    const out = getBalanceNumber(result[0].toString());
    const outBN = new BigNumber(result[0].toString());
    const tax = getBalanceNumber(result[1].toString());
    onSuccess(out, tax, outBN);
  } catch (e) {
    console.error(e);
    onError(e);
  }
}

export async function calculateMintInAmount(
  amount,
  mintPrice,
  totalSupply,
  inputType,
  onSuccess,
  onError
) {
  const squareMax = new BigNumber(totalSupply).plus(amount).exponentiatedBy(2);
  const squareTotal = new BigNumber(totalSupply).exponentiatedBy(2);

  const mintRequired = new BigNumber(1)
    .dividedBy(2)
    .multipliedBy(squareMax.minus(squareTotal))
    .multipliedBy(1000)
    .dividedBy(997);

  if (inputType === INPUT_USD) {
    onSuccess(truncateDecimals(mintRequired.times(mintPrice).toString(10)));
  } else {
    onSuccess(mintRequired.toString(10));
  }
}

export async function calculateSellToMint(
  amount,
  tokenAddress,
  chainId,
  onSuccess,
  onError
) {
  if (amount === "0") {
    onSuccess(0, 0, null);
    return;
  }
  try {
    const contract = getMintClubBondContract(null, chainId);
    const result = await contract.getBurnRefund(
      tokenAddress,
      new BigNumber(amount).times(BIG_TEN.pow(DEFAULT_TOKEN_DECIMAL)).toString()
    );
    const out = getBalanceNumber(result[0].toString());
    const outBN = new BigNumber(result[0].toString());
    const tax = getBalanceNumber(result[1].toString());
    onSuccess(out, tax, outBN);
  } catch (e) {
    console.error(e);
    onError(e);
  }
}

export async function calculateSellToCrypto(
  from,
  to,
  amount,
  chainId,
  onSuccess,
  onError
) {
  if (amount === "0") {
    onSuccess(0, 0, null);
    return;
  }
  try {
    const contract = getMintClubZapContract(null, chainId);
    const result = await contract.estimateZapOut(
      from,
      to,
      new BigNumber(amount).times(BIG_TEN.pow(DEFAULT_TOKEN_DECIMAL)).toString()
    );
    const out = getBalanceNumber(result[0].toString());
    const outBN = new BigNumber(result[0].toString());
    const tax = getBalanceNumber(result[1].toString());
    onSuccess(out, tax, outBN);
  } catch (e) {
    console.error(e);
    onError(e);
  }
}
