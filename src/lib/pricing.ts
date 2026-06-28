/**
 * Pricing logic shared by the client (live estimate) and the server
 * (authoritative recompute). Keep this pure and dependency-free.
 * Surcharge amounts come from the editable calculator config (see calc-config).
 */

export type Tier = { maxQty: number; pricePerUnit: number };

/**
 * Resolve the per-unit price for a quantity from ascending tiers.
 * Picks the first tier whose maxQty >= quantity; if the quantity exceeds
 * every tier, the cheapest (last) tier applies.
 */
export function resolveUnitPrice(tiers: Tier[], quantity: number): number {
  if (!tiers.length || quantity <= 0) return 0;
  const sorted = [...tiers].sort((a, b) => a.maxQty - b.maxQty);
  for (const t of sorted) {
    if (quantity <= t.maxQty) return t.pricePerUnit;
  }
  return sorted[sorted.length - 1].pricePerUnit;
}

export type QuoteInput = {
  tiers: Tier[];
  quantity: number;
  lengthSurcharge?: number;
  frayingSurcharge?: number;
};

export type Quote = {
  unitBase: number;
  lengthSurcharge: number;
  frayingSurcharge: number;
  unitTotal: number;
  quantity: number;
  total: number;
};

export function computeQuote(input: QuoteInput): Quote {
  const quantity = Math.max(0, Math.floor(input.quantity || 0));
  const unitBase = resolveUnitPrice(input.tiers, quantity);
  const lengthSurcharge = Math.max(0, input.lengthSurcharge ?? 0);
  const frayingSurcharge = Math.max(0, input.frayingSurcharge ?? 0);
  const unitTotal = unitBase + lengthSurcharge + frayingSurcharge;
  return {
    unitBase,
    lengthSurcharge,
    frayingSurcharge,
    unitTotal,
    quantity,
    total: unitTotal * quantity,
  };
}

export function formatRub(value: number): string {
  return `${value.toLocaleString("ru-RU")} ₽`;
}
