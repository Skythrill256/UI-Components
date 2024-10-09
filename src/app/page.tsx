"use client"
import { EthereumQRCode } from "@/components/qr-code";
import React from 'react'

const page = () => {
  return (
    <div>
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
