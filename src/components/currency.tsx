"use client"

import * as React from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { cn } from "@/lib/utils"
import { z } from "zod"
import { useForm, Controller } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"

const ethereumBalanceSchema = z.object({
  balance: z.string().regex(/^(\d*\.?\d{0,18})$/, "Invalid Ethereum balance"),
  unit: z.enum(["ETH", "Gwei", "Wei"]),
})

export interface EthereumBalanceInputProps extends React.ComponentPropsWithoutRef<typeof Card> {
  onBalanceChange?: (balance: string, unit: "ETH" | "Gwei" | "Wei") => void
  initialUnit?: "ETH" | "Gwei" | "Wei"
}

const EthereumBalanceInput = React.forwardRef<HTMLDivElement, EthereumBalanceInputProps>(
  ({ className, onBalanceChange, initialUnit = "ETH", ...props }, ref) => {
    const { register, handleSubmit, formState: { errors }, control, watch, setValue } = useForm({
      resolver: zodResolver(ethereumBalanceSchema),
      defaultValues: {
        balance: "",
        unit: initialUnit,
      },
    })

    const unit = watch("unit")

    const onSubmit = (data: { balance: string; unit: "ETH" | "Gwei" | "Wei" }) => {
      onBalanceChange?.(data.balance, data.unit)
    }

    const handleUnitChange = (newUnit: "ETH" | "Gwei" | "Wei") => {
      const currentBalance = watch("balance")
      if (currentBalance) {
        const etherValue = parseFloat(currentBalance)
        let newBalance: string
        switch (newUnit) {
          case "ETH":
            newBalance = unit === "Gwei" ? (etherValue / 1e9).toString() : (etherValue / 1e18).toString()
            break
          case "Gwei":
            newBalance = unit === "ETH" ? (etherValue * 1e9).toString() : (etherValue / 1e9).toString()
            break
          case "Wei":
            newBalance = unit === "ETH" ? (etherValue * 1e18).toString() : (etherValue * 1e9).toString()
            break
        }
        setValue("balance", newBalance)
      }
      setValue("unit", newUnit)
    }

    return (
      <Card ref={ref} className={cn("w-full max-w-md mx-auto", className)} {...props}>
        <CardHeader>
          <CardTitle>Ethereum Balance Input</CardTitle>
          <CardDescription>Enter your Ethereum balance and select the unit</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="balance">Ethereum Balance</Label>
              <div className="flex">
                <Input
                  id="balance"
                  placeholder={`Enter amount in ${unit}`}
                  {...register("balance")}
                  className={cn(
                    "rounded-r-none",
                    errors.balance && "border-red-500 focus-visible:ring-red-500"
                  )}
                />
                <Controller
                  name="unit"
                  control={control}
                  render={({ field }) => (
                    <Select
                      onValueChange={(value: "ETH" | "Gwei" | "Wei") => {
                        field.onChange(value)
                        handleUnitChange(value)
                      }}
                      value={field.value}
                    >
                      <SelectTrigger className="w-[100px] rounded-l-none">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="ETH">ETH</SelectItem>
                        <SelectItem value="Gwei">Gwei</SelectItem>
                        <SelectItem value="Wei">Wei</SelectItem>
                      </SelectContent>
                    </Select>
                  )}
                />
              </div>
              {errors.balance && (
                <p className="text-red-500 text-sm">{errors.balance.message}</p>
              )}
            </div>
            <Button type="submit" className="w-full">Submit Balance</Button>
          </form>
        </CardContent>
      </Card>
    )
  }
)

EthereumBalanceInput.displayName = "EthereumBalanceInput"

export { EthereumBalanceInput }
