# mint.club-sdk

- [mint.club-sdk](#mintclub-sdk)
  - [Install](#install)
  - [Hooks](#hooks)
    - [useMintPrice](#usemintprice)
    - [useAllowance](#useallowance)
    - [useCreate](#usecreate)
    - [useBuyWithMint](#usebuywithmint)
    - [useBuyWithCrypto](#usebuywithcrypto)
    - [useSellToMint](#useselltomint)

>

[![NPM](https://img.shields.io/npm/v/mint.club-sdk.svg)](https://www.npmjs.com/package/mint.club-sdk) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

## Install

```bash
npm install --save mint.club-sdk

or

yarn add mint.club-sdk
```

## Hooks

### useMintPrice

This hook is used to retrieve the current price of MINT on pancakeswap.finance.

Usage

```jsx
import { useMintPrice } from "mint.club-sdk";

const mintPrice = useMintPrice();
```

Output

| Parameter | Type   | Description                |
| --------- | ------ | -------------------------- |
| price     | number | MINT price value in number |

### useAllowance

This hook is used to retrieve approved allowance on a certain contract.

Usage

```jsx
import { useAllowance } from "mint.club-sdk";

const allowance = useMintPrice(tokenAddress, owner, spender);
```

Input parameters

| Parameter    | Type   | Description     |
| ------------ | ------ | --------------- |
| tokenAddress | string | token address   |
| owner        | string | owner address   |
| spender      | string | spender address |

Output

| Parameter | Type   | Description               |
| --------- | ------ | ------------------------- |
| allowance | string | allowance value in string |

### useCreate

This hook is used to mint a new MINT-based BEP-20 token.

The hook returns two functions `createToken` and `createTokenAndBuy`.

Use `createToken` if you want to just mint a new token, and use `createTokenAndBuy` if you want to instant purchase the token after minting to prevent front-running.

Usage

```jsx
import { useCreate, useWeb3Provider } from "mint.club-sdk";
import { useWeb3React } from "@web3-react/core";

const { account } = useWeb3React();
const { createToken, createTokenAndBuy } = useCreate(
  provider?.getSigner(account)
);

<div>
  <button
    onClick={() => {
      createToken(name, symbol, supply, onStart, onSuccess, onError);
    }}
  >
    Create w/o Instant purchase
  </button>
  <button
    onClick={() => {
      createTokenAndBuy(
        name,
        symbol,
        supply,
        amount,
        referrer,
        onStart,
        onSuccess,
        onError
      );
    }}
  >
    Create w/ Instant purchase
  </button>;
</div>;
```

Input parameters

| Parameter | Type   | Description                             |
| --------- | ------ | --------------------------------------- |
| signer    | object | signer object to sign the contract call |

Output

| Parameter         | Type     | Description                                                                                                                                                       |
| ----------------- | -------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| createToken       | function | function createToken(name:string, symbol:string, supply:number, onStart:function?, onSuccess:function?, onError:function?);                                       |
| createTokenAndBuy | function | function createTokenAndBuy(name:string, symbol:string, supply:number, amount:number, referrer:string, onStart:function?, onSuccess:function?, onError:function?); |

### useBuyWithMint

This hook is used to convert MINT token to MINT-based token.

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

Input parameters

| Parameter    | Type             | Description                           |
| ------------ | ---------------- | ------------------------------------- |
| amountIn     | number or string | amount to spend                       |
| inputType    | string           | "USD" or "MINT"                       |
| slippage     | number           | pass in 2 for 2% slippage             |
| tokenAddress | string           | MINT-based token address              |
| referrer     | string           | referrer address to send buy/sell tax |

Output

| Parameter | Type    | Description                                                                                                                                                                                                 |
| --------- | ------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| amountOut | object  | `{value: string, tax: string, BN: BigNumber, buy: function(signer)}` - value: output value, tax: tax in MINT, BN: bignumber.js object for more precise calculation, buy: function that invokes contrat call |
| loading   | boolean | `true` if calculation is loading                                                                                                                                                                            |
| error     | string  | string value if there is an error message                                                                                                                                                                   |

### useBuyWithCrypto

This hook is used to convert BEP-20 token to MINT-based token.

Usage

```jsx
import { useBuyWithCrypto } from "mint.club-sdk";

const { amountOut, loading, error } = useBuyWithCrypto({
  amountIn,
  tokenIn,
  tokenAddress,
  slippage,
  referrer,
});
```

Input parameters

| Parameter    | Type          | Description                                                           |
| ------------ | ------------- | --------------------------------------------------------------------- |
| amountIn     | number/string | amount to spend                                                       |
| tokenIn      | object        | `{address: input token address, decimals: number of token decimals }` |
| tokenAddress | string        | MINT-based token address                                              |
| slippage     | number        | pass in 2 for 2% slippage                                             |
| referrer     | string        | referrer address to send buy/sell tax                                 |

Output

| Parameter | Type    | Description                                                                                                                                                                                                 |
| --------- | ------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| amountOut | object  | `{value: string, tax: string, BN: BigNumber, buy: function(signer)}` - value: output value, tax: tax in MINT, BN: bignumber.js object for more precise calculation, buy: function that invokes contrat call |
| loading   | boolean | `true` if calculation is loading                                                                                                                                                                            |
| error     | string  | string value if there is an error message                                                                                                                                                                   |

### useSellToMint

This hook is used to convert MINT-based token to MINT.

Usage

```jsx
import { useSellToMint } from "mint.club-sdk";

const { amountOut, loading, error } = useBuyWithCrypto({
  amountIn,
  tokenAddress,
  slippage,
  referrer,
});
```

Input parameters

| Parameter    | Type          | Description                           |
| ------------ | ------------- | ------------------------------------- |
| amountIn     | number/string | amount to sell                        |
| tokenAddress | string        | MINT-based token address              |
| slippage     | number        | pass in 2 for 2% slippage             |
| referrer     | string        | referrer address to send buy/sell tax |

Output

| Parameter | Type    | Description                                                                                                                                                                                                                                                                                             |
| --------- | ------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| amountOut | object  | `{value: string, tax: string, BN: BigNumber, sell: function(signer), approve: function(signer)}` - value: output value, tax: tax in MINT, BN: bignumber.js object for more precise calculation, sell: function that invokes `sell` contrat call, approve: function that invokes `approve` contract call |
| loading   | boolean | `true` if calculation is loading                                                                                                                                                                                                                                                                        |
| error     | string  | string value if there is an error message                                                                                                                                                                                                                                                               |
