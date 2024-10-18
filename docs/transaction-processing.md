# TransactionConfirmation Component

## Overview

The `TransactionConfirmation` component is a React modal designed to provide visual feedback during blockchain transactions. It shows the progress of a transaction, confirming its status on both the source and destination chains, and allows users to close the modal once the transaction completes. The component is powered by Framer Motion for smooth animations and is fully customizable, with options to pass in custom colors, text, and transaction details.

## Features

- **Transaction Progress**: Displays the status of the transaction on both source and destination chains.
- **Animations**: Smooth modal entry, exit, and status animations using Framer Motion.
- **Transaction Details**: Shows the transaction hash in a detailed view.
- **Customizable Text and Colors**: Allows customization of status messages and colors for the source and destination chains.
- **Closable Modal**: Modal can be closed by users with a customizable close button.

## Props

| Prop Name               | Type                          | Default                     | Description                                                                                                                                                 |
|-------------------------|-------------------------------|-----------------------------|-------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `isOpen`                | `boolean`                     | `false`                     | Controls the visibility of the modal.                                                                                                                        |
| `onClose`               | `() => void`                  | `undefined`                 | Callback triggered when the modal is closed.                                                                                                                 |
| `transactionHash`        | `string`                      | `""`                        | The transaction hash displayed in the modal.                                                                                                                 |
| `sourceConfirmed`       | `boolean`                     | `false`                     | Indicates if the transaction is confirmed on the source chain.                                                                                               |
| `destinationConfirming` | `boolean`                     | `true`                      | Indicates if the transaction is still confirming on the destination chain.                                                                                   |
| `sourceText`            | `string`                      | `"Confirmed in source"`      | Custom text to show when the transaction is confirmed on the source chain.                                                                                   |
| `destinationText`       | `string`                      | `"Confirming for destination"`| Custom text to show while the transaction is confirming on the destination chain.                                                                            |
| `primaryColor`          | `string`                      | `"green"`                   | The color used for the source confirmation indicator.                                                                                                        |
| `secondaryColor`        | `string`                      | `"blue"`                    | The color used for the destination confirmation indicator.                                                                                                   |
| `modalClassName`        | `string`                      | `""`                        | Additional CSS classes for customizing the modal's appearance.                                                                                               |

### TransactionConfirmation Example

```tsx
import { TransactionConfirmation } from "./TransactionConfirmation"

export default function App() {
  const [isOpen, setIsOpen] = React.useState(true)

  return (
    <div>
      <TransactionConfirmation
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        transactionHash="0xabc1234567890def"
        sourceConfirmed={true}
        destinationConfirming={true}
        primaryColor="green"
        secondaryColor="blue"
      />
    </div>
  )
}
```
In this example:

- The modal is controlled by the isOpen state and closes when the user clicks the close button.
- It uses default text and colors for the source and destination status indicators.

## Customization

### Custom Status Text and Colors

You can pass custom text and colors for both the source and destination chain confirmation statuses:

```tsx
<TransactionConfirmation
  isOpen={isOpen}
  onClose={() => setIsOpen(false)}
  transactionHash="0xabc1234567890def"
  sourceConfirmed={true}
  destinationConfirming={true}
  sourceText="Transaction Confirmed on Source Chain"
  destinationText="Awaiting Confirmation on Destination Chain"
  primaryColor="purple"
  secondaryColor="orange"
/>
```

This customization allows you to tailor the modal to your specific use case by changing the colors and labels.

### Adding Custom Modal Styles

To change the appearance of the modal itself, pass a modalClassName prop:

```tsx
<TransactionConfirmation
  isOpen={isOpen}
  onClose={() => setIsOpen(false)}
  transactionHash="0xabc1234567890def"
  sourceConfirmed={true}
  destinationConfirming={true}
  modalClassName="custom-modal-styles"
/>
```

This will apply additional custom styles to the modal.

## Component Breakdown

### TransactionConfirmationContent
Handles the main content of the modal, including the status indicators and transaction details.

| Prop Name           | Type        | Default                   | Description                                                      |
|---------------------|-------------|---------------------------|------------------------------------------------------------------|
| `isClosing`         | boolean     | `false`                   | Controls whether the modal is in the process of closing.          |
| `onClose`           | () => void  | `undefined`               | Callback triggered when the modal is closed.                      |
| `transactionHash`   | string      | `""`                      | The transaction hash displayed in the modal.                      |
| `sourceConfirmed`   | boolean     | `false`                   | Indicates if the transaction is confirmed on the source chain.     |
| `destinationConfirming` | boolean  | `true`                    | Indicates if the transaction is still confirming on the destination chain. |
| `sourceText`        | string      | `"Confirmed in source"`    | Custom text to show when the transaction is confirmed on the source chain. |
| `destinationText`   | string      | `"Confirming for destination"` | Custom text to show while the transaction is confirming on the destination chain. |
| `primaryColor`      | string      | `"green"`                 | The color used for the source confirmation indicator.              |
| `secondaryColor`    | string      | `"blue"`                  | The color used for the destination confirmation indicator.         |
| `modalClassName`    | string      | `""`                      | Additional CSS classes for customizing the modal's appearance.     |

---

### TransactionStatus
Renders the status of either the source or destination chain transaction, showing whether it is confirmed or still in progress.

| Prop Name  | Type             | Default    | Description                                         |
|------------|------------------|------------|-----------------------------------------------------|
| `confirmed` | boolean          | `false`    | Whether the status is confirmed.                    |
| `text`      | string           | `""`       | The status text to display.                         |
| `color`     | string           | `"green"`  | The color used for the status indicator.            |
| `icon`      | React.ReactNode  | `undefined` | Icon to display alongside the status text.          |
| `animate`   | boolean          | `false`    | Whether to animate the status (used for pending states). |

---

### CloseButton
A reusable close button component to handle modal dismissal.

| Prop Name | Type            | Default    | Description                                 |
|-----------|-----------------|------------|---------------------------------------------|
| `onClose` | () => void      | `undefined` | Function to call when the button is clicked to close the modal. |

---

### TransactionDetails
Displays the transaction details including the transaction hash.

| Prop Name        | Type   | Default  | Description                         |
|------------------|--------|----------|-------------------------------------|
| `transactionHash`| string | `""`     | The transaction hash to display.    |



