# mint.club-sdk

- [mint.club-sdk](#mintclub-sdk)
  - [Demo](#demo)
  - [Install](#install)
  - [Constants](#constants)
  - [Functions](#functions)
    - [allowance](#allowance)
    - [approve](#approve)
    - [balanceOf](#balanceof)
    - [getMintPrice](#getmintprice)
    - [createToken](#createtoken)
    - [createTokenAndBuy](#createtokenandbuy)
    - [buyWithCrypto](#buywithcrypto)
    - [sellToCrypto](#selltocrypto)
    - [buyWithMint](#buywithmint)
    - [sellToMint](#selltomint)
    - [getMintClubBondContract](#getmintclubbondcontract)
    - [getMintClubZapContract](#getmintclubzapcontract)
    - [getBEP20Contract](#getbep20contract)

>

[![NPM](https://img.shields.io/npm/v/mint.club-sdk.svg)](https://www.npmjs.com/package/mint.club-sdk) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

## Demo

Please check out the demo code [here](https://github.com/Steemhunt/mint.club-sdk-example).

## Install

```bash
npm install --save mint.club-sdk

or

yarn add mint.club-sdk
```

## Constants

These are all constants exported from the SDK.

```js
import { ADDRESSES, BSC_MAINNET, BSC_TESTNET } from "mint.club-sdk";
```

| Name        | Type   | Value |
| ----------- | ------ | ----- |
| BSC_MAINNET | number | 56    |
| BSC_TESTNET | number | 97    |

```js
ADDRESSES = {
  mintClubBond: {
    [BSC_TESTNET]: "0xB9B492B5D470ae0eB2BB07a87062EC97615d8b09",
    [BSC_MAINNET]: "0x8BBac0C7583Cc146244a18863E708bFFbbF19975",
  },
  mintClubZap: {
    [BSC_TESTNET]: "0xFC1Ccd12A3aFbf3e6E5ba134Fa446935D20bc2F6",
    [BSC_MAINNET]: "0x9111A272e9dE242Cf9aa7932a42dB3664Ca3eC9D",
  },
  mint: {
    [BSC_TESTNET]: "0x4d24BF63E5d6E03708e2DFd5cc8253B3f22FE913",
    [BSC_MAINNET]: "0x1f3Af095CDa17d63cad238358837321e95FC5915",
  },
  pancakeswapRouter: {
    [BSC_TESTNET]: "0xD99D1c33F9fC3444f8101754aBC46c52416550D1",
    [BSC_MAINNET]: "0x10ED43C718714eb63d5aA57B78B54704E256024E",
  },
  wbnb: {
    [BSC_TESTNET]: "0xae13d989daC2f0dEbFf460aC112a837C89BAa7cd",
    [BSC_MAINNET]: "0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c",
  },
  busd: {
    [BSC_TESTNET]: "0xeD24FC36d5Ee211Ea25A80239Fb8C4Cfd80f12Ee",
    [BSC_MAINNET]: "0xe9e7cea3dedca5984780bafc599bd69add087d56",
  },
  usdt: {
    [BSC_TESTNET]: "0x337610d27c682E347C9cD60BD4b3b107C9d34dDd",
    [BSC_MAINNET]: "0x55d398326f99059fF775485246999027B3197955",
  },
};
```

## Functions

### allowance

Returns the allowed spending of `spender` from `owner` in BigNumber.

Usage

```jsx
import { allowance } from "mint.club-sdk";

const allowance = await allowance(tokenAddress, owner, spender, chainId?, onSuccess?, onError?);

```

Input parameters

| Parameter    | Type     | Description                     | Required |
| ------------ | -------- | ------------------------------- | -------- |
| tokenAddress | string   | BEP-20 Token address            | Yes      |
| owner        | address  | Owner contract/wallet address   | Yes      |
| spender      | address  | Spender contract/wallet address | Yes      |
| chainId      | number   | Network chain id                | No       |
| onSuccess    | function | (BigNumber) => {}               | No       |
| onError      | function | (error) => {}                   | No       |

Output

| Parameter | Type      | Description           |
| --------- | --------- | --------------------- |
| allowance | BigNumber | bignumber.js instance |

### approve

Returns the allowed spending of `spender` from `owner` in BigNumber.

Usage

```jsx
import { approve } from "mint.club-sdk";

await approve(tokenAddress, spender, signer, amount?, chainId?, onStart? onSuccess?, onError?);

```

Input parameters

| Parameter    | Type     | Description                                                | Required |
| ------------ | -------- | ---------------------------------------------------------- | -------- |
| tokenAddress | string   | BEP-20 Token address                                       | Yes      |
| owner        | address  | Owner contract/wallet address                              | Yes      |
| spender      | address  | Spender contract/wallet address                            | Yes      |
| amount       | number   | Amount to approve, defaults to ethers.constants.MaxUint256 | No       |
| chainId      | number   | Network chain id                                           | No       |
| onStart      | function | () => {}                                                   | No       |
| onSuccess    | function | (tx) => {}                                                 | No       |
| onError      | function | (error) => {}                                              | No       |

### balanceOf

Returns the balanceOf wallet address for a specific token.

Usage

```jsx
import { balanceOf } from "mint.club-sdk";

const balance = await banlanceOf(tokenAddress, walletAddress, chainId?, onSuccess?, onError?);

```

### getMintPrice

Returns the price of MINT based on pancakeswap.finance.

Usage

```jsx
import { getMintPrice } from "mint.club-sdk";

const price = await getMintPrice(chainId?);

```

Input parameters

| Parameter | Type   | Description      | Required |
| --------- | ------ | ---------------- | -------- |
| chainId   | number | Network chain id | No       |

Output

| Parameter | Type   | Description   |
| --------- | ------ | ------------- |
| price     | number | Price of MINT |

### createToken

Invokes the createToken contract call from Mint.club bond contract.

```jsx
import { createToken } from "mint.club-sdk";

const tx = await createToken(name, symbol, supply, signer, chainId?, onStart?, onSuccess?, onError?);
```

Input parameters

| Parameter | Type     | Description         | Required |
| --------- | -------- | ------------------- | -------- |
| name      | string   | Name of token       | Yes      |
| symbol    | string   | Symbol of token     | Yes      |
| supply    | number   | Max supply amount   | Yes      |
| signer    | Signer   | Transaction signer. | Yes      |
| chainId   | number   | Network chain id    | No       |
| onStart   | function | (tx) => {}          | No       |
| onSuccess | function | (tx) => {}          | No       |
| onError   | function | (err) => {}         | No       |

Output

| Parameter | Type   | Description         |
| --------- | ------ | ------------------- |
| tx        | object | Transaction receipt |

### createTokenAndBuy

Invokes the createTokenAndBuy contract call from Mint.club bond contract. Used for instant purchasing a token after it's minted to prevent front-running.

```jsx
import { createTokenAndBuy } from "mint.club-sdk";

const tx = await createTokenAndBuy(name, symbol, supply, amount, referrer, signer, chainId?, onStart?, onSuccess?, onError?);
```

Input parameters

| Parameter | Type     | Description                 | Required |
| --------- | -------- | --------------------------- | -------- |
| name      | string   | Name of token               | Yes      |
| symbol    | string   | Symbol of token             | Yes      |
| supply    | number   | Max supply amount           | Yes      |
| amount    | string   | Amount of token to purchase | Yes      |
| referrer  | addrress | Referrer wallet address     | Yes      |
| signer    | Signer   | Transaction signer.         | Yes      |
| chainId   | number   | Network chain id            | No       |
| onStart   | function | (tx) => {}                  | No       |
| onSuccess | function | (tx) => {}                  | No       |
| onError   | function | (err) => {}                 | No       |

Output

| Parameter | Type   | Description         |
| --------- | ------ | ------------------- |
| tx        | object | Transaction receipt |

Input parameters

| Parameter     | Type     | Description          | Required |
| ------------- | -------- | -------------------- | -------- |
| tokenAddress  | string   | BEP-20 Token address | Yes      |
| walletAddress | address  | Wallet address       | Yes      |
| chainId       | number   | Network chain id     | No       |
| onSuccess     | function | (BigNumber) => {}    | No       |
| onError       | function | (error) => {}        | No       |

Output

| Parameter | Type      | Description           |
| --------- | --------- | --------------------- |
| balance   | BigNumber | bignumber.js instance |

### buyWithCrypto

Invokes the buy contract call from Mint.club bond contract. Used for Crypto -> MINT-based Token.

Usage

```jsx
import { buyWithCrypto } from "mint.club-sdk";

const { value, tax, buy, BN } = await buyWithCrypto(amountIn, tokenIn, tokenAddress, slippage, referrer?, chainId?);
const tx = await buy();
```

Input parameters

| Parameter    | Type    | Description                                                                | Required |
| ------------ | ------- | -------------------------------------------------------------------------- | -------- |
| amountIn     | string  | Amount to purchase                                                         | Yes      |
| tokenIn      | object  | `{ address, decimals }` Pass 'BNB' to address for native currency purchase | Yes      |
| tokenAddress | address | Token address to purchase                                                  | Yes      |
| slippage     | number  | Slippage amount. Pass 2 for 2%                                             | No       |
| referrer     | address | Referrer address                                                           | No       |
| chainId      | number  | Network chain id                                                           | No       |

Output

| Parameter | Type           | Description                                                 |
| --------- | -------------- | ----------------------------------------------------------- |
| value     | number         | Estimated output value                                      |
| tax       | number         | Estimated tax amount                                        |
| BN        | BigNumber      | BigNumber instance of `value`. Used for precise calculation |
| buy       | async function | A buy function that returns a Promise                       |

### sellToCrypto

Invokes the sell contract call from Mint.club bond contract. Used for MINT-based token -> Crypto.

Usage

```jsx
import { sellToCrypto } from "mint.club-sdk";

const { value, tax, BN, sell, approve } = await sellToCrypto(amountIn, tokenAddress, tokenOut, slippage, referrer?, chainId?);
const tx = await sell();
```

Input parameters

| Parameter    | Type    | Description                                                                         | Required |
| ------------ | ------- | ----------------------------------------------------------------------------------- | -------- |
| amountIn     | string  | Amount to sell                                                                      | Yes      |
| tokenAddress | address | Token address to sell                                                               | Yes      |
| tokenOut     | object  | `{ address, decimals }` Pass 'BNB' to address to receive native currency after sell | Yes      |
| slippage     | number  | Slippage amount. Pass 2 for 2%                                                      | Yes      |
| referrer     | address | Referrer address                                                                    | No       |
| chainId      | number  | Network chain id                                                                    | No       |

Output

| Parameter | Type           | Description                                                                               |
| --------- | -------------- | ----------------------------------------------------------------------------------------- |
| value     | number         | Estimated output value                                                                    |
| tax       | number         | Estimated tax amount                                                                      |
| BN        | BigNumber      | BigNumber instance of `value`. Used for precise calculation                               |
| sell      | async function | A sell function that returns a Promise                                                    |
| approve   | async function | An approve function that returns a Promise. Null if allowance for token is greater than 0 |

### buyWithMint

Invokes the buy contract call from Mint.club bond contract. Used for MINT -> MINT-based token.

Usage

```jsx
import { buyWithMint } from "mint.club-sdk";

const { value, tax, buy, BN } = await buyWithMint(amountIn, tokenAddress, slippage, referrer?, isUSD?, forcedMintPrice?, chainId?);
const tx = await buy();
```

Input parameters

| Parameter       | Type    | Description                                             | Required |
| --------------- | ------- | ------------------------------------------------------- | -------- |
| amountIn        | string  | Amount to purchase                                      | Yes      |
| tokenAddress    | address | Token address to purchase                               | Yes      |
| slippage        | number  | Slippage amount. Pass 2 for 2%                          | Yes      |
| referrer        | address | Referrer address                                        | No       |
| isUSD           | boolean | Pass true if `amountIn` is USD value                    | No       |
| forcedMintPrice | number  | Calculate the output amount with this forced MINT price | No       |
| chainId         | number  | Network chain id                                        | No       |

Output

| Parameter | Type           | Description                                                 |
| --------- | -------------- | ----------------------------------------------------------- |
| value     | number         | Estimated output value                                      |
| tax       | number         | Estimated tax amount                                        |
| BN        | BigNumber      | BigNumber instance of `value`. Used for precise calculation |
| buy       | async function | A buy function that returns a Promise                       |

### sellToMint

Invokes the sell contract call from Mint.club bond contract. Used for MINT-based token -> MINT.

```jsx
import { sellToMint } from "mint.club-sdk";

const { value, tax, BN, sell, approve } = await sellToMint(amountIn, tokenAddress, slippage, referrer?, chainId?);
const tx = await sell();
```

Input parameters

| Parameter    | Type    | Description                    | Required |
| ------------ | ------- | ------------------------------ | -------- |
| amountIn     | string  | Amount to sell                 | Yes      |
| tokenAddress | address | Token address to sell          | Yes      |
| slippage     | number  | Slippage amount. Pass 2 for 2% | Yes      |
| referrer     | address | Referrer address               | No       |
| chainId      | number  | Network chain id               | No       |

Output

| Parameter | Type           | Description                                                                               |
| --------- | -------------- | ----------------------------------------------------------------------------------------- |
| value     | number         | Estimated output value                                                                    |
| tax       | number         | Estimated tax amount                                                                      |
| BN        | BigNumber      | BigNumber instance of `value`. Used for precise calculation                               |
| sell      | async function | A sell function that returns a Promise                                                    |
| approve   | async function | An approve function that returns a Promise. Null if allowance for token is greater than 0 |

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
  getBEP20Contract(address, chainId?);
contract.someAwesomeCall();
```

Input parameters

| Parameter | Type   | Description      | Required |
| --------- | ------ | ---------------- | -------- |
| address   | string | Token address    | Yes      |
| chainId   | number | Network chain id | No       |
|           |
