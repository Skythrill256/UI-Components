# TokenList Component

## Overview

The `TokenList` component is a highly customizable React component designed to display a list of tokens, filter them by network (chain), and allow users to search by token name, symbol, or address. It supports optional selection of tokens and network filtering based on the chain IDs. The component is styled using Tailwind CSS classes and provides scrolling support to display long lists of tokens.

## Features

- **Token Filtering**: Search tokens by name, symbol, or address.
- **Network Filter**: Optionally filter tokens by blockchain networks (e.g., Ethereum, BNB Chain, etc.).
- **Custom Tokens**: Ability to pass custom token data if needed.
- **Token Selection**: Tokens can be selected, triggering a callback when a token is clicked.
- **Scrolling**: Handles long lists of tokens with a scrollable area.

## Props

| Prop Name           | Type                          | Default             | Description                                                                 |
|---------------------|-------------------------------|---------------------|-----------------------------------------------------------------------------|
| `onSelectToken`      | `(token: Token) => void`      | `undefined`         | Callback function that gets triggered when a token is selected.             |
| `initialChainId`     | `number \| "all"`             | `"all"`             | Specifies the initial chain to filter tokens (e.g., 1 for Ethereum).        |
| `maxHeight`          | `string`                      | `"400px"`           | Maximum height for the scroll area.                                         |
| `minHeight`          | `string`                      | `"150px"`           | Minimum height for the scroll area.                                         |
| `showNetworkFilter`  | `boolean`                     | `true`              | Controls whether the network filter dropdown is displayed.                  |
| `customTokens`       | `Token[]`                     | `undefined`         | Allows you to provide a custom list of tokens instead of the default list.  |
| `chainIdToName`      | `{ [key: number]: string }`   | `defaultChainIdToName` | Map of chain IDs to their names (used in the network filter).             |
| `className`          | `string`                      | `""`                | Additional CSS classes to customize the outermost container styling.        |

### Token Interface

Each token should adhere to the following structure:

```ts
interface Token {
  chainId: number
  address: string
  name: string
  symbol: string
  decimals: number
  logoURI: string
}
