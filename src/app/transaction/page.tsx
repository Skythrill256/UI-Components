
"use client"
import { TransactionConfirmation } from '@/components/transaction_processing'
import React from 'react'

const Page = () => {
  const [isOpen, setIsOpen] = React.useState(false)
  const [sourceConfirmed, setSourceConfirmed] = React.useState(false)
  const [destinationConfirming, setDestinationConfirming] = React.useState(true)

  return (
    <div className="flex items-center justify-center h-screen">
      <button
        onClick={() => setIsOpen(true)}
        className="px-6 py-3 bg-green-500 text-white font-semibold rounded-lg shadow-md hover:bg-green-600 transition-colors duration-300"
      >
        Show Transaction Confirmation
      </button>
      <TransactionConfirmation
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        transactionHash="0x123456789abcdef..."
        sourceConfirmed={sourceConfirmed}
        destinationConfirming={destinationConfirming}
        sourceText="Confirmed in Ethereum"
        destinationText="Confirming in Optimism"
        primaryColor="green"
        secondaryColor="blue"
      />
    </div>
  )
}

export default Page
