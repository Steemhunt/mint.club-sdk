# mint.club-sdk

- [mint.club-sdk](#mintclub-sdk)
  - [Install](#install)
  - [Constants](#constants)
  - [When to use Functions vs Hooks.](#when-to-use-functions-vs-hooks)
  - [Functions](#functions)
    - [getMintClubBondContract](#getmintclubbondcontract)
    - [getMintClubZapContract](#getmintclubzapcontract)
    - [getBEP20Contract](#getbep20contract)
  - [Hooks](#hooks)
    - [useMintPrice](#usemintprice)
    - [useAllowance](#useallowance)
    - [useCreate](#usecreate)
    - [useBuyWithMint](#usebuywithmint)
    - [useBuyWithCrypto](#usebuywithcrypto)
    - [useSellToMint](#useselltomint)
    - [useSellToCrypto](#useselltocrypto)

>

[![NPM](https://img.shields.io/npm/v/mint.club-sdk.svg)](https://www.npmjs.com/package/mint.club-sdk) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

## Install

```bash
npm install --save mint.club-sdk

or

yarn add mint.club-sdk
```

## Constants

These are all constants exported from the SDK.

```js
import { BSC_MAINNET, BSC_TESTNET } from "mint.club-sdk";
```

| Name        | Type   | Value |
| ----------- | ------ | ----- |
| BSC_MAINNET | number | 56    |
| BSC_TESTNET | number | 97    |

## When to use Functions vs Hooks.

If you're working on a React project, using Hooks is recommended.

You may use functions if you're working on a node project, or you want to only invoke the call on certain events like button click.

## Functions

### getMintClubBondContract

Returns the `ethers.js` Contract of Mint.club Bond contract.

Usage

```jsx
import { getMintClubBondContract } from "mint.club-sdk";

const contract =
  getMintClubBondContract(signer?, chainId?);
contract.someAwesomeCall();
```

Input parameters

| Parameter | Type   | Description      | Required |
| --------- | ------ | ---------------- | -------- |
| signer    | object | Signer           | No       |
| chainId   | number | Network chain id | No       |

### getMintClubZapContract

Returns the `ethers.js` Contract of Mint.club Zap contract.

Usage

```jsx
import { getMintClubZapContract } from "mint.club-sdk";

const contract =
  getMintClubZapContract(signer?, chainId?);
contract.someAwesomeCall();
```

Input parameters

| Parameter | Type   | Description      | Required |
| --------- | ------ | ---------------- | -------- |
| signer    | object | Signer           | No       |
| chainId   | number | Network chain id | No       |

### getBEP20Contract

Usage

```jsx
import { getBEP20Contract } from "mint.club-sdk";

const contract =
  getMintClubZapContract(signer?, chainId?);
contract.someAwesomeCall();
```

Input parameters

| Parameter | Type   | Description      | Required |
| --------- | ------ | ---------------- | -------- |
| address   | string | Token address    | No       |
| chainId   | number | Network chain id | No       |

## Hooks

### useMintPrice

This hook is used to retrieve the current price of MINT on pancakeswap.finance.

Usage

```jsx
import { useMintPrice } from "mint.club-sdk";

const mintPrice = useMintPrice(chainId?);
```

Input parameters

| Parameter | Type   | Description      | Required |
| --------- | ------ | ---------------- | -------- |
| chainId   | number | Network chain id | No       |

Output

| Parameter | Type   | Description                |
| --------- | ------ | -------------------------- |
| price     | number | MINT price value in number |

### useAllowance

This hook is used to retrieve approved allowance on a certain contract.

Usage

```jsx
import { useAllowance } from "mint.club-sdk";

const allowance = useMintPrice(tokenAddress, owner, spender, chainId?);
```

Input parameters

| Parameter    | Type   | Description      | Required |
| ------------ | ------ | ---------------- | -------- |
| tokenAddress | string | token address    | Yes      |
| owner        | string | owner address    | Yes      |
| spender      | string | spender address  | Yes      |
| chainId      | number | Network chain id | No       |

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
  provider?.getSigner(account),
  chainId?
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

| Parameter | Type   | Description                             | Required |
| --------- | ------ | --------------------------------------- | -------- |
| signer    | object | signer object to sign the contract call | Yes      |
| chainId   | number | Network chain id                        | No       |

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
  referrer?,
  chainId?
});
```

Input parameters

| Parameter    | Type             | Description                           | Required |
| ------------ | ---------------- | ------------------------------------- | -------- |
| amountIn     | number or string | amount to spend                       | Yes      |
| inputType    | string           | "USD" or "MINT"                       | Yes      |
| slippage     | number           | pass in 2 for 2% slippage             | Yes      |
| tokenAddress | string           | MINT-based token address              | Yes      |
| referrer     | string           | referrer address to send buy/sell tax | No       |
| chainId      | number           | Network chain id                      | No       |

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
  referrer?,
  chainId?
});
```

Input parameters

| Parameter    | Type          | Description                                                           | Required |
| ------------ | ------------- | --------------------------------------------------------------------- | -------- |
| amountIn     | number/string | amount to spend                                                       | Yes      |
| tokenIn      | object        | `{address: input token address, decimals: number of token decimals }` | Yes      |
| tokenAddress | string        | MINT-based token address                                              | Yes      |
| slippage     | number        | pass in 2 for 2% slippage                                             | Yes      |
| referrer     | string        | referrer address to send buy/sell tax                                 | No       |
| chainId      | number        | Network chain id                                                      | No       |

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
  referrer?,
  chainId?
});
```

Input parameters

| Parameter    | Type          | Description                           | Required |
| ------------ | ------------- | ------------------------------------- | -------- |
| amountIn     | number/string | amount to sell                        | Yes      |
| tokenAddress | string        | MINT-based token address              | Yes      |
| slippage     | number        | pass in 2 for 2% slippage             | Yes      |
| referrer     | string        | referrer address to send buy/sell tax | No       |

Output

| Parameter | Type    | Description                                                                                                                                                                                                                                                                                             |
| --------- | ------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| amountOut | object  | `{value: string, tax: string, BN: BigNumber, sell: function(signer), approve: function(signer)}` - value: output value, tax: tax in MINT, BN: bignumber.js object for more precise calculation, sell: function that invokes `sell` contrat call, approve: function that invokes `approve` contract call |
| loading   | boolean | `true` if calculation is loading                                                                                                                                                                                                                                                                        |
| error     | string  | string value if there is an error message                                                                                                                                                                                                                                                               |

### useSellToCrypto

This hook is used to convert MINT-based token to other BEP-20 token.

Usage

```jsx
import { useSellToCrypto } from "mint.club-sdk";

const { amountOut, loading, error } = useBuyWithCrypto({
  amountIn,
  tokenAddress,
  tokenOut,
  slippage,
  referrer?,
  chainId?
});
```

Input parameters

| Parameter    | Type          | Description                                                            | Required |
| ------------ | ------------- | ---------------------------------------------------------------------- | -------- |
| amountIn     | number/string | amount to sell                                                         | Yes      |
| tokenAddress | string        | MINT-based token address                                               | Yes      |
| tokenOut     | object        | `{address: output token address, decimals: number of token decimals }` | Yes      |
| slippage     | number        | pass in 2 for 2% slippage                                              | Yes      |
| referrer     | string        | referrer address to send buy/sell tax                                  | No       |
| chainId      | number        | Network chain id                                                       | No       |

Output

| Parameter | Type    | Description                                                                                                                                                                                                                                                                                             |
| --------- | ------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| amountOut | object  | `{value: string, tax: string, BN: BigNumber, sell: function(signer), approve: function(signer)}` - value: output value, tax: tax in MINT, BN: bignumber.js object for more precise calculation, sell: function that invokes `sell` contrat call, approve: function that invokes `approve` contract call |
| loading   | boolean | `true` if calculation is loading                                                                                                                                                                                                                                                                        |
| error     | string  | string value if there is an error message                                                                                                                                                                                                                                                               |
