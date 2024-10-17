"use client"

import * as React from "react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { cn } from "@/lib/utils"
import { z } from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"

const ethereumBalanceSchema = z.object({
  eth: z.string().regex(/^\d*\.?\d*$/, "Invalid Ethereum balance"),
  gwei: z.string().regex(/^\d*\.?\d*$/, "Invalid Gwei balance"),
  wei: z.string().regex(/^\d*$/, "Invalid Wei balance"),
})

type ConversionUnit = "ETH" | "Gwei" | "Wei"

export interface EthereumBalanceInputProps extends React.ComponentPropsWithoutRef<typeof Card> {
  onBalanceChange?: (conversions: Record<ConversionUnit, string>) => void
}

const EthereumBalanceInput = React.forwardRef<HTMLDivElement, EthereumBalanceInputProps>(
  ({ className, onBalanceChange, ...props }, ref) => {
    const { register, setValue, watch, formState: { errors } } = useForm({
      resolver: zodResolver(ethereumBalanceSchema),
      defaultValues: {
        eth: "",
        gwei: "",
        wei: "",
      },
    })

    const eth = watch("eth")
    const gwei = watch("gwei")
    const wei = watch("wei")

    const convertBalance = (value: string, from: ConversionUnit): Record<ConversionUnit, string> => {
      if (!value || isNaN(Number(value))) return { ETH: "", Gwei: "", Wei: "" }

      let weiValue: bigint
      try {
        switch (from) {
          case "ETH":
            weiValue = BigInt(Math.floor(parseFloat(value) * 1e18))
            break
          case "Gwei":
            weiValue = BigInt(Math.floor(parseFloat(value) * 1e9))
            break
          case "Wei":
            weiValue = BigInt(value)
            break
        }
      } catch (error) {
        console.error("Conversion error:", error)
        return { ETH: "", Gwei: "", Wei: "" }
      }

      return {
        ETH: (Number(weiValue) / 1e18).toFixed(18),
        Gwei: (Number(weiValue) / 1e9).toFixed(9),
        Wei: weiValue.toString(),
      }
    }

    const updateValues = (value: string, from: ConversionUnit) => {
      const conversions = convertBalance(value, from)
      if (from !== "ETH") setValue("eth", conversions.ETH)
      if (from !== "Gwei") setValue("gwei", conversions.Gwei)
      if (from !== "Wei") setValue("wei", conversions.Wei)
      onBalanceChange?.(conversions)
    }

    React.useEffect(() => {
      updateValues(eth, "ETH")
    }, [eth])

    React.useEffect(() => {
      updateValues(gwei, "Gwei")
    }, [gwei])

    React.useEffect(() => {
      updateValues(wei, "Wei")
    }, [wei])

    return (
      <Card ref={ref} className={cn("w-full max-w-md mx-auto", className)} {...props}>
        <CardHeader>
          <CardTitle>Ethereum Balance Converter</CardTitle>
          <CardDescription>Enter a value in any unit to see conversions</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="eth">ETH</Label>
              <Input
                id="eth"
                placeholder="Enter amount in ETH"
                {...register("eth")}
                className={cn(errors.eth && "border-red-500 focus-visible:ring-red-500")}
              />
              {errors.eth && (
                <p className="text-red-500 text-sm">{errors.eth.message}</p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="gwei">Gwei</Label>
              <Input
                id="gwei"
                placeholder="Enter amount in Gwei"
                {...register("gwei")}
                className={cn(errors.gwei && "border-red-500 focus-visible:ring-red-500")}
              />
              {errors.gwei && (
                <p className="text-red-500 text-sm">{errors.gwei.message}</p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="wei">Wei</Label>
              <Input
                id="wei"
                placeholder="Enter amount in Wei"
                {...register("wei")}
                className={cn(errors.wei && "border-red-500 focus-visible:ring-red-500")}
              />
              {errors.wei && (
                <p className="text-red-500 text-sm">{errors.wei.message}</p>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    )
  }
)

EthereumBalanceInput.displayName = "EthereumBalanceInput"

export { EthereumBalanceInput }
