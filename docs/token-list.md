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
```

## Example-usage

```tsx
import { TokenList } from "./TokenList"

export default function App() {
  const handleTokenSelect = (token) => {
    console.log("Selected Token:", token)
  }

  return (
    <div className="p-8">
      <h1 className="text-xl font-bold mb-4">Select a Token</h1>
      <TokenList
        onSelectToken={handleTokenSelect}
        maxHeight="400px"
        minHeight="300px"
      />
    </div>
  )
}
```
In the example above:

1. The TokenList component is rendered with a maxHeight of 400px and a minHeight of 300px.
2. When a token is selected, the handleTokenSelect function is triggered, logging the selected token to the console.

### Using custom tokens

```tsx
const customTokenList = [
  {
    chainId: 1,
    address: "0x1234567890abcdef1234567890abcdef12345678",
    name: "Custom Token 1",
    symbol: "CT1",
    decimals: 18,
    logoURI: "https://example.com/ct1-logo.png",
  },
  {
    chainId: 56,
    address: "0xabcdefabcdefabcdefabcdefabcdefabcdef",
    name: "Custom Token 2",
    symbol: "CT2",
    decimals: 18,
    logoURI: "https://example.com/ct2-logo.png",
  },
]

export default function App() {
  return (
    <div>
      <TokenList customTokens={customTokenList} />
    </div>
  )
}
```
This example showcases how you can pass a custom list of tokens to the TokenList component. The tokens will be displayed and can be searched or filtered by chain.

### Hiding Network Filter

If you don't want the network filter to be shown, you can hide it by setting the showNetworkFilter prop to false.

```tsx
<TokenList showNetworkFilter={false} />
```
This will hide the network selector, allowing all tokens to be displayed without filtering by chain.

## Customization

You can customize the styling of the TokenList component by passing custom CSS classes via the className prop.

```tsx
<TokenList className="my-custom-class" />
```

### Customizing the chain names

To modify or expand the available chains in the filter dropdown, you can pass your own chainIdToName mapping.

```tsx
const customChainMapping = {
  1: "Ethereum",
  56: "BNB Chain",
  137: "Polygon",
  43114: "Avalanche",
}

<TokenList chainIdToName={customChainMapping} />
```
This example adds support for Avalanche (Chain ID 43114) and displays the appropriate chain names.
