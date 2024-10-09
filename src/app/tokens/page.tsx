"use client"

import { TokenList } from "@/components/token-list"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export default function CustomTokenListExample() {
  const [selectedToken, setSelectedToken] = useState(null)

  const handleSelectToken = (token: any) => {
    setSelectedToken(token)
    console.log("Selected token:", token)
  }

  const customTokens = [
    {
      chainId: 1,
      address: "0x1f9840a85d5af5bf1d1762f925bdaddc4201f984",
      name: "Uniswap",
      symbol: "UNI",
      decimals: 18,
      logoURI: "https://assets.coingecko.com/coins/images/12504/thumb/uniswap-uni.png?1600306604"
    },
    {
      chainId: 56,
      address: "0x3ee2200efb3400fabb9aacf31297cbdd1d435d47",
      name: "Cardano Token",
      symbol: "ADA",
      decimals: 18,
      logoURI: "https://assets.coingecko.com/coins/images/975/thumb/cardano.png?1547034860"
    },
    {
      chainId: 137,
      address: "0x7ceb23fd6bc0add59e62ac25578270cff1b9f619",
      name: "Wrapped Ether",
      symbol: "WETH",
      decimals: 18,
      logoURI: "https://assets.coingecko.com/coins/images/2518/thumb/weth.png?1628852295"
    }
  ]

  const customChainIdToName = {
    1: "Ethereum",
    56: "Binance Smart Chain",
    137: "Polygon",
  }

  return (
    <Card className="w-full max-w-3xl mx-auto">
      <CardHeader>
        <CardTitle>Custom Styled Token List</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col md:flex-row gap-4">
        <div className="w-full md:w-1/2">
          <TokenList
            onSelectToken={handleSelectToken}
            initialChainId="all"
            maxHeight="400px"
            showNetworkFilter={true}
            customTokens={customTokens}
            chainIdToName={customChainIdToName}
            className="border-2 border-primary rounded-xl shadow-lg"
          />
        </div>
        <div className="w-full md:w-1/2 flex flex-col justify-center items-center p-4 bg-secondary rounded-xl">
          <h2 className="text-xl font-bold mb-4">Selected Token</h2>
          {selectedToken ? (
            <div className="text-center">
              <img src={selectedToken.logoURI} alt={selectedToken.name} className="w-16 h-16 rounded-full mx-auto mb-2" />
              <h3 className="text-lg font-semibold">{selectedToken.name}</h3>
              <p className="text-sm text-muted-foreground">{selectedToken.symbol}</p>
              <Badge variant="outline" className="mt-2">
                {customChainIdToName[selectedToken.chainId]}
              </Badge>
              <p className="mt-2 text-xs break-all">
                Address: {selectedToken.address}
              </p>
            </div>
          ) : (
            <p className="text-muted-foreground">No token selected</p>
          )}
          <Button
            onClick={() => setSelectedToken(null)}
            className="mt-4"
            variant="outline"
            disabled={!selectedToken}
          >
            Clear Selection
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
