# mint.club-sdk

>

[![NPM](https://img.shields.io/npm/v/mint.club-sdk.svg)](https://www.npmjs.com/package/mint.club-sdk) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

## Install

```bash
npm install --save mint.club-sdk

or

yarn add mint.club-sdk
```

## Hooks

### useBuyWithMint

Input parameters

| Parameter    | Type           | Description                           |
| ------------ | -------------- | ------------------------------------- |
| amountIn     | number/string  | amount to spend                       |
| inputType    | 'USD' / 'MINT' | amountIn currency                     |
| slippage     | number         | pass in 2 for 2% slippage             |
| tokenAddress | string         | MINT-based token address              |
| referrer     | string         | referrer address to send buy/sell tax |

Output

| Parameter | Type    | Description                                                                                                                                                                                                 |
| --------- | ------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| amountOut | object  | `{value: string, tax: string, BN: BigNumber, buy: function(signer)}` - value: output value, tax: tax in MINT, BN: bignumber.js object for more precise calculation, buy: function that invokes contrat call |
| loading   | boolean | `true` if calculation is loading                                                                                                                                                                            |
| error     | string  | non-null string value if there is error message                                                                                                                                                             |

Usage

```jsx
import { useBuyWithMint } from "mint.club-sdk";

const { amountOut, loading, error } = useBuyWithMint({
  amountIn,
  inputType,
  slippage,
  tokenAddress,
  referrer,
});
```
