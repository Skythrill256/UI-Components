# EthereumQRCode Component

The `EthereumQRCode` component allows users to generate a QR code for an Ethereum address. It includes a form to input the Ethereum address, validates the input, and renders a QR code.

## Props

- `onAddressChange?`: Optional callback that receives the Ethereum address after it has been submitted.
- `qrCodeSize?`: Size of the generated QR code (default is 200).
- `qrCodeLevel?`: Error correction level for the QR code, with possible values:
  - `"L"` (Low)
  - `"M"` (Medium)
  - `"Q"` (Quartile)
  - `"H"` (High)
  - Default is `"L"`.
- `qrCodeIncludeMargin?`: Whether to include a margin around the QR code (default is `true`).

## Example Usage

```tsx
"use client"
import { EthereumQRCode } from "@/components/qr-code";
import React from 'react'

const page = () => {
  return (
    <div className="flex flex-col justify-center items-center">
      <EthereumQRCode
        className="bg-gray-100 shadow-lg "
        qrCodeSize={250}
        qrCodeLevel="H"
        qrCodeIncludeMargin={false}
        onAddressChange={(address) => console.log("New address:", address)}
      />
    </div>
  )
}

export default page
```

## Structure

The component is built using a Card layout and includes:

- A form for inputting an Ethereum address.
- Validation using the Zod schema to ensure the Ethereum address is valid.
- A QR code generator that displays the QR code when the form is submitted.

## Customization

- You can customize the size of the QR code by passing the qrCodeSize prop.
- The QR code error correction level can be adjusted using the qrCodeLevel  prop.
- The onAddressChange prop allows you to handle the address submission outside the component.

## Styling

You can customize the component using Tailwind CSS classes or by passing a className prop to apply additional styles. Each input field changes border color to red if there's an error.

```tsx
<EthereumQRCode className="custom-class" />
```
