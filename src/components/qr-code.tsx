"use client"

import * as React from "react"
import { QRCodeSVG } from "qrcode.react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { cn } from "@/lib/utils"
import { z } from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"

const ethereumAddressSchema = z.object({
  address: z.string().regex(/^0x[a-fA-F0-9]{40}$/, "Invalid Ethereum address"),
})

export interface EthereumQRCodeProps extends React.ComponentPropsWithoutRef<typeof Card> {
  onAddressChange?: (address: string) => void
  qrCodeSize?: number
  qrCodeLevel?: "L" | "M" | "Q" | "H"
  qrCodeIncludeMargin?: boolean
}

const EthereumQRCode = React.forwardRef<HTMLDivElement, EthereumQRCodeProps>(
  ({ className, onAddressChange, qrCodeSize = 200, qrCodeLevel = "L", qrCodeIncludeMargin = true, ...props }, ref) => {
    const [qrValue, setQrValue] = React.useState("")

    const { register, handleSubmit, formState: { errors }, setValue } = useForm({
      resolver: zodResolver(ethereumAddressSchema),
    })

    const onSubmit = (data: { address: string }) => {
      setQrValue(data.address)
      onAddressChange?.(data.address)
    }

    return (
      <Card ref={ref} className={cn("w-full max-w-md mx-auto", className)} {...props}>
        <CardHeader>
          <CardTitle>Ethereum QR Code Generator</CardTitle>
          <CardDescription>Generate a QR code for your Ethereum address</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="address">Ethereum Address</Label>
              <Input
                id="address"
                placeholder="0x..."
                {...register("address")}
                className="w-full"
              />
              {errors.address && (
                <p className="text-red-500 text-sm">{errors.address.message}</p>
              )}
            </div>
            <Button type="submit" className="w-full">Generate QR Code</Button>
          </form>
        </CardContent>
        <CardFooter className="flex justify-center">
          {qrValue && (
            <div className="mt-4 p-4 bg-white rounded-lg shadow">
              <QRCodeSVG
                value={qrValue}
                size={qrCodeSize}
                level={qrCodeLevel}
                includeMargin={qrCodeIncludeMargin}
                className="mx-auto"
              />
            </div>
          )}
        </CardFooter>
      </Card>
    )
  }
)

EthereumQRCode.displayName = "EthereumQRCode"

export { EthereumQRCode }
