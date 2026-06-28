import { prisma } from "@/lib/db";

export type PriceTierDTO = { maxQty: number; pricePerUnit: number };
export type PriceItemDTO = { id: string; variant: string; tiers: PriceTierDTO[] };
export type PriceGroupDTO = {
  id: string;
  name: string;
  note: string | null;
  items: PriceItemDTO[];
};

export async function getPriceGroups(): Promise<PriceGroupDTO[]> {
  try {
    const groups = await prisma.priceGroup.findMany({
      orderBy: { sortOrder: "asc" },
      include: {
        items: {
          orderBy: { sortOrder: "asc" },
          include: { tiers: { orderBy: { sortOrder: "asc" } } },
        },
      },
    });
    return groups.map((g) => ({
      id: g.id,
      name: g.name,
      note: g.note,
      items: g.items.map((i) => ({
        id: i.id,
        variant: i.variant,
        tiers: i.tiers.map((t) => ({
          maxQty: t.maxQty,
          pricePerUnit: t.pricePerUnit,
        })),
      })),
    }));
  } catch {
    return [];
  }
}
