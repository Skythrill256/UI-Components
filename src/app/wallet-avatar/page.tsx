import React from 'react'
import { Web3WalletAvatar } from '@/components/wallet-avatar'
const page = () => {
  return (
    <div className='flex justify-center items-center h-screen'>
      <h2>User Profile</h2>

      <div className="p-4">
        <Web3WalletAvatar
          address="0x742d35Cc6634C0532925a3b844Bc454e4438f44e"
          ensName="vitalik.eth"
          balance="1.5"
        />
      </div>
    </div>
  )
}

export default page 
