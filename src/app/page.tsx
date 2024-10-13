"use client"
import { EthereumQRCode } from "@/components/qr-code";
import { TokenList } from "@/components/token-list";
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
      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-bold mb-4">Token List</h1>
        <TokenList
          maxHeight="400px"
          className="bg-black text-white hover:blue"
        />
      </div>
    </div>
  )
}

export default page 
