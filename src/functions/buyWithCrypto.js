import { AddressZero } from "@ethersproject/constants";
import BigNumber from "bignumber.js";
import addresses from "../utils/addresses";
import { BIG_TEN } from "../utils/bignumber";
import { calculateCryptoOutAmount } from "../utils/buysell";
import { getMintClubZapContract } from "../utils/contracts";
import { truncateDecimals } from "../utils/formatBalance";

export default async function buyWithCrypto(
  amountIn,
  tokenIn,
  tokenAddress,
  slippage,
  referrer,
  chainId
) {
  const inAddress =
    tokenIn.address === "BNB" ? addresses.wbnb[chainId] : tokenIn.address;
  const [value, tax, BN] = await calculateCryptoOutAmount(
    inAddress,
    tokenAddress,
    amountIn,
    chainId
  );

  const buy = async (signer) => {
    const zapContract = getMintClubZapContract(signer, chainId);
    const minReward = truncateDecimals(
      BN.times(100 - slippage)
        .div(100)
        .toFixed(0, 1)
        .toString(10),
      0
    );

    if (tokenIn.address === "BNB") {
      return zapContract.zapInBNB(
        tokenAddress,
        minReward,
        referrer || AddressZero,
        {
          value: new BigNumber(amountIn)
            .times(BIG_TEN.pow(tokenIn.decimals))
            .toString(),
        }
      );
    } else {
      return zapContract.zapIn(
        tokenIn.address,
        tokenAddress,
        new BigNumber(amountIn).times(BIG_TEN.pow(tokenIn.decimals)).toString(),
        minReward,
        referrer || AddressZero
      );
    }
  };

  return { value, tax, buy, BN };
}
