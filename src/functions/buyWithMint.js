import { ADDRESS_ZERO } from "@uniswap/v3-sdk";
import BigNumber from "bignumber.js";
import { BSC_MAINNET, DEFAULT_TOKEN_DECIMAL } from "../constants";
import { BIG_TEN } from "../utils/bignumber";
import { calculateMintOutAmount } from "../utils/buysell";
import { getMintClubBondContract } from "../utils/contracts";
import { truncateDecimals } from "../utils/formatBalance";
import getMintPrice from "./getMintPrice";

export default async function buyWithMint(
  amountIn,
  tokenAddress,
  slippage,
  referrer,
  isUSD,
  forcedMintPrice,
  chainId = BSC_MAINNET
) {
  let price, amount;
  amount = amountIn;

  if (isUSD) {
    price = forcedMintPrice || (await getMintPrice(chainId));
    if (price === 0) {
      throw new Error("Value of MINT price is 0.");
    } else {
      amount = amountIn / price;
    }
  }

  const [value, tax, BN] = await calculateMintOutAmount(
    tokenAddress,
    amount,
    chainId
  );

  const buy = async (signer) => {
    const minReward = truncateDecimals(
      BN.times(100 - slippage)
        .div(100)
        .toFixed(0, 1)
        .toString(10),
      0
    );

    const reserveAmount = truncateDecimals(
      new BigNumber(amount)
        .times(BIG_TEN.pow(DEFAULT_TOKEN_DECIMAL))
        .toString(),
      0
    );

    const bondContract = getMintClubBondContract(signer, chainId);
    return bondContract.buy(
      tokenAddress,
      reserveAmount,
      minReward,
      referrer || ADDRESS_ZERO
    );
  };

  return { value, tax, buy, BN };
}
