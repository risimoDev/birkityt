import Link from "next/link";
import { getCalcConfig } from "@/lib/calc-config";
import { CalcConfigEditor } from "@/components/admin/CalcConfigEditor";

export const dynamic = "force-dynamic";

export default async function CalcAdminPage() {
  const config = await getCalcConfig();

  return (
    <div>
      <h1 className="text-2xl font-extrabold tracking-tight text-textColorDark">Калькулятор</h1>
      <p className="mt-1 text-textColor">
        Дополнительные опции калькулятора и быстрые кнопки тиража.
      </p>
      <div className="mt-3 rounded-xl border border-dashed border-onbutton/40 bg-onbutton/10 px-4 py-3 text-sm text-textColorDark">
        Материалы, варианты и цена за штуку настраиваются в разделе{" "}
        <Link href="/admin/prices" className="font-semibold underline">
          Цены
        </Link>
        . Здесь — только надбавки и тиражи.
      </div>

      <div className="mt-6">
        <CalcConfigEditor initial={config} />
      </div>
    </div>
  );
}
