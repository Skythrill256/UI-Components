# Ethereum Balance Converter Component

## Overview

`EthereumBalanceInput` is a React component that allows users to input and convert Ethereum balances across three units: ETH, Gwei, and Wei. This component provides real-time validation and conversion for Ethereum balance values entered by the user in any of the three units.

## Usage

To use the `EthereumBalanceInput` component in your project, import the component and add it to your page or layout. The component takes optional props for handling balance conversions and can be customized with CSS classes.

### Example

```tsx
import { EthereumBalanceInput } from "@/components/EthereumBalanceInput"

export default function ExamplePage() {
  const handleBalanceChange = (conversions) => {
    console.log("Updated balance conversions:", conversions)
  }

  return (
    <div>
      <h1>Ethereum Balance Converter</h1>
      <EthereumBalanceInput onBalanceChange={handleBalanceChange} />
    </div>
  )
} 
``````

## Props

onBalanceChange (optional): A callback function that receives the converted balance values when the user enters a balance in any unit. It returns an object with ETH, Gwei, and Wei as keys and their respective converted values as strings.

```tsx
onBalanceChange?: (conversions: Record<"ETH" | "Gwei" | "Wei", string>) => void
```
## Default-Values

By default, the component initializes with empty values for ETH, Gwei, and Wei.

## Input-Fields

The component consists of three input fields:

1. ETH: Enter the Ethereum balance in ETH.
2. Gwei: Enter the balance in Gwei.
3. Wei: Enter the balance in Wei.

Each input field performs real-time validation based on the format of the respective unit. Errors are shown if the format is invalid.

## Conversions

When a value is entered into any field, the component automatically converts it into the other two units. For example, entering a value in ETH converts it to Gwei and Wei.

## Error-Handling

The component uses zod schema validation to ensure that the input follows the correct format for each unit:

. ETH: A decimal value representing ETH.
. Gwei: A decimal value representing Gwei.
. Wei: An integer representing Wei.

If the input is invalid, an error message will appear below the respective input field.

## Styling

You can customize the component using Tailwind CSS classes or by passing a className prop to apply additional styles. Each input field changes border color to red if there's an error.

```tsx
<EthereumBalanceInput className="custom-class" />
```

