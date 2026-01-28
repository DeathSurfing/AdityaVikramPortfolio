"use client";

import { Text } from "@/components/retroui/Text";
import {
  convertFromUsdCents,
  formatPrice,
} from "@/lib/currency-utils";

import { useCurrency } from "@/components/providers/currency-provider";
import { useCurrencyRates } from "@/components/providers/currency-rate-provider";

export function ProductPrice({
  amount,
  size = "lg",
}: {
  amount: number; // USD cents
  size?: "lg" | "xl";
}) {
  const { currency } = useCurrency();
  const { rates, isLoading } = useCurrencyRates();

  if (isLoading) {
    return <Text className="opacity-60">—</Text>;
  }

  const rate = rates[currency] ?? 1;

  const converted = Math.round(amount * rate);

  return (
    <Text
      className={
        size === "xl"
          ? "text-2xl font-black"
          : "text-xl font-black"
      }
    >
      {formatPrice(
        convertFromUsdCents(converted, currency),
        currency,
      )}
    </Text>
  );
}
