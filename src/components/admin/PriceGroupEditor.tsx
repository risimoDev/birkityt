"use client";

import { useState, useTransition } from "react";
import { saveGroup, deleteGroup, moveGroup } from "@/app/admin/(dash)/prices/actions";

type Tier = { maxQty: number | string; pricePerUnit: number | string };
type Item = { variant: string; tiers: Tier[] };
export type GroupState = {
  id: string;
  name: string;
  note: string;
  items: Item[];
};

export function PriceGroupEditor({
  initial,
  index,
  total,
}: {
  initial: GroupState;
  index: number;
  total: number;
}) {
  const [g, setG] = useState<GroupState>(initial);
  const [open, setOpen] = useState(false);
  const [pending, start] = useTransition();
  const [msg, setMsg] = useState<string | null>(null);
  const isFirst = index === 0;
  const isLast = index === total - 1;

  function patch(p: Partial<GroupState>) {
    setG((s) => ({ ...s, ...p }));
  }
  function setItem(i: number, p: Partial<Item>) {
    setG((s) => ({ ...s, items: s.items.map((it, idx) => (idx === i ? { ...it, ...p } : it)) }));
  }
  function addItem() {
    setG((s) => ({ ...s, items: [...s.items, { variant: "", tiers: [{ maxQty: "", pricePerUnit: "" }] }] }));
  }
  function removeItem(i: number) {
    setG((s) => ({ ...s, items: s.items.filter((_, idx) => idx !== i) }));
  }
  function setTier(ii: number, ti: number, p: Partial<Tier>) {
    setItem(ii, {
      tiers: g.items[ii].tiers.map((t, idx) => (idx === ti ? { ...t, ...p } : t)),
    });
  }
  function addTier(ii: number) {
    setItem(ii, { tiers: [...g.items[ii].tiers, { maxQty: "", pricePerUnit: "" }] });
  }
  function removeTier(ii: number, ti: number) {
    setItem(ii, { tiers: g.items[ii].tiers.filter((_, idx) => idx !== ti) });
  }

  function save() {
    setMsg(null);
    start(async () => {
      const res = await saveGroup({
        id: g.id,
        name: g.name,
        note: g.note,
        items: g.items.map((it) => ({
          variant: it.variant,
          tiers: it.tiers
            .filter((t) => t.maxQty !== "" && t.pricePerUnit !== "")
            .map((t) => ({ maxQty: Number(t.maxQty), pricePerUnit: Number(t.pricePerUnit) })),
        })),
      });
      setMsg(res.ok ? "Сохранено" : res.info ?? "Ошибка");
    });
  }

  return (
    <div className="rounded-2xl border border-textColorDark/10 bg-white/70">
      <div className="flex flex-wrap items-center gap-3 p-4">
        <div className="flex flex-col">
          <button
            onClick={() => start(() => moveGroup(g.id, "up"))}
            disabled={pending || isFirst}
            title="Выше"
            className="text-textColor/50 hover:text-textColorDark disabled:opacity-25"
          >
            ▲
          </button>
          <button
            onClick={() => start(() => moveGroup(g.id, "down"))}
            disabled={pending || isLast}
            title="Ниже"
            className="text-textColor/50 hover:text-textColorDark disabled:opacity-25"
          >
            ▼
          </button>
        </div>
        <button onClick={() => setOpen((v) => !v)} className="text-textColor/50 hover:text-textColorDark">
          {open ? "▾" : "▸"}
        </button>
        <input
          value={g.name}
          onChange={(e) => patch({ name: e.target.value })}
          className="min-w-0 flex-1 rounded-lg border border-textColorDark/10 bg-mainColor px-3 py-2 font-semibold outline-none focus:border-onbutton"
        />
        <span className="font-mono text-xs text-textColor/50">{g.items.length} вар.</span>
        <button
          onClick={save}
          disabled={pending}
          className="rounded-lg bg-textColorDark px-3 py-2 text-xs font-semibold text-mainColor disabled:opacity-50"
        >
          {pending ? "…" : "Сохранить"}
        </button>
        <button
          onClick={() => { if (confirm(`Удалить группу «${g.name}»?`)) start(() => deleteGroup(g.id)); }}
          disabled={pending}
          className="rounded-lg border border-textColorDark/15 px-3 py-2 text-xs text-textColor hover:border-red-300 hover:text-red-600"
        >
          Удалить
        </button>
        {msg && <span className="text-xs text-onbutton">{msg}</span>}
      </div>

      {open && (
        <div className="space-y-4 border-t border-textColorDark/10 p-4">
          <input
            value={g.note}
            onChange={(e) => patch({ note: e.target.value })}
            placeholder="Примечание к группе (необязательно)"
            className="w-full rounded-lg border border-textColorDark/10 bg-mainColor px-3 py-2 text-sm outline-none focus:border-onbutton"
          />

          {g.items.map((item, ii) => (
            <div key={ii} className="rounded-xl border border-textColorDark/10 bg-mainColor p-3">
              <div className="mb-2 flex items-center gap-2">
                <input
                  value={item.variant}
                  onChange={(e) => setItem(ii, { variant: e.target.value })}
                  placeholder="Вариант / ширина (напр. Ширина 12-15мм)"
                  className="min-w-0 flex-1 rounded-lg border border-textColorDark/10 bg-white px-3 py-1.5 text-sm outline-none focus:border-onbutton"
                />
                <button
                  onClick={() => removeItem(ii)}
                  className="rounded-lg border border-textColorDark/15 px-2.5 py-1.5 text-xs text-textColor hover:border-red-300 hover:text-red-600"
                >
                  ✕
                </button>
              </div>

              <div className="space-y-1.5">
                <div className="grid grid-cols-[1fr_1fr_auto] gap-2 font-mono text-[10px] uppercase text-textColor/50">
                  <span>до кол-ва (шт)</span>
                  <span>цена/шт (₽)</span>
                  <span></span>
                </div>
                {item.tiers.map((t, ti) => (
                  <div key={ti} className="grid grid-cols-[1fr_1fr_auto] gap-2">
                    <input
                      type="number"
                      value={t.maxQty}
                      onChange={(e) => setTier(ii, ti, { maxQty: e.target.value })}
                      className="rounded-lg border border-textColorDark/10 bg-white px-3 py-1.5 text-sm outline-none focus:border-onbutton"
                    />
                    <input
                      type="number"
                      value={t.pricePerUnit}
                      onChange={(e) => setTier(ii, ti, { pricePerUnit: e.target.value })}
                      className="rounded-lg border border-textColorDark/10 bg-white px-3 py-1.5 text-sm outline-none focus:border-onbutton"
                    />
                    <button
                      onClick={() => removeTier(ii, ti)}
                      className="rounded-lg border border-textColorDark/15 px-2.5 text-xs text-textColor hover:border-red-300 hover:text-red-600"
                    >
                      ✕
                    </button>
                  </div>
                ))}
                <button
                  onClick={() => addTier(ii)}
                  className="mt-1 text-xs font-medium text-onbutton hover:underline"
                >
                  + тираж
                </button>
              </div>
            </div>
          ))}

          <button
            onClick={addItem}
            className="rounded-lg border border-dashed border-textColorDark/25 px-4 py-2 text-sm font-medium text-textColorDark hover:border-textColorDark/50"
          >
            + вариант
          </button>
        </div>
      )}
    </div>
  );
}
