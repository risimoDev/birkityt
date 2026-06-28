import { getPriceGroups } from "@/lib/prices";
import { PriceGroupEditor, type GroupState } from "@/components/admin/PriceGroupEditor";
import { AddGroup } from "@/components/admin/AddGroup";

export const dynamic = "force-dynamic";

export default async function PricesPage() {
  const groups = await getPriceGroups();
  const states: GroupState[] = groups.map((g) => ({
    id: g.id,
    name: g.name,
    note: g.note ?? "",
    items: g.items.map((i) => ({
      variant: i.variant,
      tiers: i.tiers.map((t) => ({ maxQty: t.maxQty, pricePerUnit: t.pricePerUnit })),
    })),
  }));

  return (
    <div>
      <h1 className="text-2xl font-extrabold tracking-tight text-textColorDark">Цены</h1>
      <p className="mt-1 text-textColor">
        Группы → варианты → тиражи. Цена за штуку зависит от тиража. Эти данные
        использует и прайс, и калькулятор.
      </p>

      <div className="mt-5">
        <AddGroup />
      </div>

      <div className="mt-5 grid gap-3">
        {states.map((g) => (
          <PriceGroupEditor key={g.id} initial={g} />
        ))}
        {states.length === 0 && (
          <p className="rounded-2xl border border-dashed border-textColorDark/20 p-10 text-center text-textColor">
            Групп пока нет. Добавьте первую.
          </p>
        )}
      </div>
    </div>
  );
}
