import {
  Token,
  Fetcher,
  Percent,
  Trade,
  TradeType,
  Route,
  TokenAmount,
  WETH,
} from "@pancakeswap/sdk";
import JSBI from "jsbi";
import addresses from "../utils/addresses";
import BigNumber from "bignumber.js";
import { JsonRpcProvider } from "@ethersproject/providers";
import getNodeUrl from "../utils/providers";
import { BSC_MAINNET } from "../constants";

export const BIPS_BASE = JSBI.BigInt(10000);

export default async function getMintPrice(chainId = BSC_MAINNET) {
  try {
    const MINT = new Token(chainId, addresses.mint[chainId], 18);
    const USDT = new Token(chainId, addresses.usdt[chainId], 18);
    const BNB = WETH[chainId];
    const provider = new JsonRpcProvider(getNodeUrl(chainId));
    const MINT_BNB_PAIR = await Fetcher.fetchPairData(MINT, BNB, provider);
    const BNB_USDT_PAIR = await Fetcher.fetchPairData(USDT, BNB, provider);
    const route = new Route([MINT_BNB_PAIR, BNB_USDT_PAIR], MINT);
    const amountIn = new BigNumber(1).times(Math.pow(10, 18)).toString(10);
    const trade = new Trade(
      route,
      new TokenAmount(MINT, amountIn),
      TradeType.EXACT_INPUT
    );
    const amountOut = new BigNumber(
      parseInt(
        trade
          .minimumAmountOut(new Percent(JSBI.BigInt(0), BIPS_BASE))
          .raw.toString(10)
      )
    )
      .dividedBy(Math.pow(10, 18))
      .toNumber();
    return amountOut;
  } catch (e) {
    console.error(e);
    return 0;
  }
}
