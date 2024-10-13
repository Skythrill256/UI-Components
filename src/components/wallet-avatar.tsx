"use client"

import * as React from "react"
import { useState, useEffect } from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card"
import { cn } from "@/lib/utils"
import { isAddress, getAddress } from "viem"
import { Copy, ExternalLink } from "lucide-react"

export interface Web3WalletAvatarProps extends React.ComponentPropsWithoutRef<typeof Avatar> {
  address: string
  ensName?: string
  balance?: string
  className?: string
  avatarUrl?: string
}

export function Web3WalletAvatar({ address, ensName, balance, className, avatarUrl, ...props }: Web3WalletAvatarProps) {
  const [avatarSrc, setAvatarSrc] = useState<string | null>(null)

  useEffect(() => {
    if (avatarUrl) {
      setAvatarSrc(avatarUrl)
    } else if (isAddress(address)) {
      try {
        const checksummedAddress = getAddress(address)
        const seed = checksummedAddress.toLowerCase().replace('0x', '')
        const randomAvatar = `https://api.dicebear.com/6.x/identicon/svg?seed=${seed}`
        setAvatarSrc(randomAvatar)
      } catch (error) {
        console.error("Error generating avatar:", error)
        setAvatarSrc(null)
      }
    } else {
      setAvatarSrc(null)
    }
  }, [address, avatarUrl])

  const shortenedAddress = isAddress(address)
    ? `${address.slice(0, 6)}...${address.slice(-4)}`
    : 'Invalid Address'

  const copyAddress = () => {
    navigator.clipboard.writeText(address)
      .then(() => alert("Address copied to clipboard!"))
      .catch(err => console.error('Failed to copy address: ', err))
  }

  return (
    <HoverCard>
      <HoverCardTrigger asChild>
        <Avatar className={cn("h-8 w-8 cursor-pointer", className)} {...props}>
          {avatarSrc && <AvatarImage src={avatarSrc} alt={ensName || address} />}
          <AvatarFallback>{ensName ? ensName.slice(0, 2).toUpperCase() : '??'}</AvatarFallback>
        </Avatar>
      </HoverCardTrigger>
      <HoverCardContent className="w-80">
        <div className="grid gap-4">
          <div className="space-y-2">
            <h4 className="font-medium leading-none">{ensName || shortenedAddress}</h4>
            {balance && <p className="text-sm text-muted-foreground">Balance: {balance} ETH</p>}
          </div>
          <div className="flex items-center gap-2">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="outline" size="icon" className="h-8 w-8" onClick={copyAddress}>
                    <Copy className="h-4 w-4" />
                    <span className="sr-only">Copy address</span>
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Copy address</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="outline" size="icon" className="h-8 w-8" asChild>
                    <a href={`https://etherscan.io/address/${address}`} target="_blank" rel="noopener noreferrer">
                      <ExternalLink className="h-4 w-4" />
                      <span className="sr-only">View on Etherscan</span>
                    </a>
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>View on Etherscan</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
        </div>
      </HoverCardContent>
    </HoverCard>
  )
}
