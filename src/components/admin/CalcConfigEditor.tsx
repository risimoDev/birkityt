"use client";

import { useState, useTransition } from "react";
import type { CalcConfig } from "@/lib/calc-config";
import { saveCalcConfig } from "@/app/admin/(dash)/calc/actions";

export function CalcConfigEditor({ initial }: { initial: CalcConfig }) {
  const [c, setC] = useState<CalcConfig>(initial);
  const [pending, start] = useTransition();
  const [msg, setMsg] = useState<string | null>(null);

  function patch(p: Partial<CalcConfig>) {
    setC((s) => ({ ...s, ...p }));
  }

  function save() {
    setMsg(null);
    start(async () => {
      const res = await saveCalcConfig({
        ...c,
        // keep numeric strings as numbers
        frayingSurcharge: Number(c.frayingSurcharge) || 0,
        defaultQuantity: Number(c.defaultQuantity) || 1,
        lengthOptions: c.lengthOptions.map((o) => ({
          label: o.label,
          surcharge: Number(o.surcharge) || 0,
        })),
        quantityPresets: c.quantityPresets.map((n) => Number(n) || 0).filter((n) => n > 0),
      });
      setMsg(res.ok ? "Сохранено ✓" : res.info ?? "Ошибка");
    });
  }

  return (
    <div className="space-y-6">
      {/* Length */}
      <section className="rounded-2xl border border-textColorDark/10 bg-white/70 p-5">
        <label className="flex items-center gap-3">
          <input
            type="checkbox"
            checked={c.lengthEnabled}
            onChange={(e) => patch({ lengthEnabled: e.target.checked })}
            className="h-4 w-4 accent-onbutton"
          />
          <span className="font-bold text-textColorDark">Опция «Длина изделия»</span>
        </label>
        <p className="mt-1 pl-7 text-sm text-textColor/70">
          Покупатель выбирает длину, к цене за штуку добавляется надбавка.
        </p>

        {c.lengthEnabled && (
          <div className="mt-4 space-y-3 pl-7">
            <Field
              label="Название опции"
              value={c.lengthLabel}
              onChange={(v) => patch({ lengthLabel: v })}
            />
            <div>
              <div className="mb-2 font-mono text-[11px] uppercase tracking-wider text-textColor/60">
                Варианты длины и надбавка (₽/шт)
              </div>
              <div className="space-y-2">
                {c.lengthOptions.map((o, i) => (
                  <div key={i} className="grid grid-cols-[1fr_8rem_auto] gap-2">
                    <input
                      value={o.label}
                      onChange={(e) =>
                        patch({
                          lengthOptions: c.lengthOptions.map((x, idx) =>
                            idx === i ? { ...x, label: e.target.value } : x,
                          ),
                        })
                      }
                      placeholder="напр. 5см"
                      className="rounded-lg border border-textColorDark/15 bg-white px-3 py-2 text-sm outline-none focus:border-onbutton"
                    />
                    <input
                      type="number"
                      value={o.surcharge}
                      onChange={(e) =>
                        patch({
                          lengthOptions: c.lengthOptions.map((x, idx) =>
                            idx === i ? { ...x, surcharge: Number(e.target.value) } : x,
                          ),
                        })
                      }
                      className="rounded-lg border border-textColorDark/15 bg-white px-3 py-2 text-sm outline-none focus:border-onbutton"
                    />
                    <button
                      onClick={() =>
                        patch({ lengthOptions: c.lengthOptions.filter((_, idx) => idx !== i) })
                      }
                      className="rounded-lg border border-textColorDark/15 px-3 text-xs text-textColor hover:border-red-300 hover:text-red-600"
                    >
                      ✕
                    </button>
                  </div>
                ))}
              </div>
              <button
                onClick={() =>
                  patch({ lengthOptions: [...c.lengthOptions, { label: "", surcharge: 0 }] })
                }
                className="mt-2 text-xs font-medium text-onbutton hover:underline"
              >
                + вариант длины
              </button>
            </div>
          </div>
        )}
      </section>

      {/* Fraying */}
      <section className="rounded-2xl border border-textColorDark/10 bg-white/70 p-5">
        <label className="flex items-center gap-3">
          <input
            type="checkbox"
            checked={c.frayingEnabled}
            onChange={(e) => patch({ frayingEnabled: e.target.checked })}
            className="h-4 w-4 accent-onbutton"
          />
          <span className="font-bold text-textColorDark">Опция-галочка с надбавкой</span>
        </label>
        <p className="mt-1 pl-7 text-sm text-textColor/70">
          Например «Обработка от осыпания». Добавляет фиксированную сумму к цене за штуку.
        </p>
        {c.frayingEnabled && (
          <div className="mt-4 grid gap-3 pl-7 sm:grid-cols-2">
            <Field
              label="Название опции"
              value={c.frayingLabel}
              onChange={(v) => patch({ frayingLabel: v })}
            />
            <NumField
              label="Надбавка (₽/шт)"
              value={c.frayingSurcharge}
              onChange={(v) => patch({ frayingSurcharge: v })}
            />
          </div>
        )}
      </section>

      {/* Quantity */}
      <section className="rounded-2xl border border-textColorDark/10 bg-white/70 p-5">
        <h2 className="font-bold text-textColorDark">Тираж</h2>
        <p className="mt-1 text-sm text-textColor/70">
          Быстрые кнопки тиража и значение по умолчанию.
        </p>
        <div className="mt-4 grid gap-3 sm:grid-cols-2">
          <div>
            <div className="mb-2 font-mono text-[11px] uppercase tracking-wider text-textColor/60">
              Быстрые кнопки (через запятую)
            </div>
            <input
              value={c.quantityPresets.join(", ")}
              onChange={(e) =>
                patch({
                  quantityPresets: e.target.value
                    .split(",")
                    .map((s) => parseInt(s.trim()))
                    .filter((n) => !isNaN(n) && n > 0),
                })
              }
              className="w-full rounded-lg border border-textColorDark/15 bg-white px-3 py-2 text-sm outline-none focus:border-onbutton"
            />
          </div>
          <NumField
            label="Тираж по умолчанию"
            value={c.defaultQuantity}
            onChange={(v) => patch({ defaultQuantity: v })}
          />
        </div>
      </section>

      <div className="sticky bottom-4 flex items-center gap-3">
        <button
          onClick={save}
          disabled={pending}
          className="rounded-xl bg-textColorDark px-6 py-2.5 text-sm font-semibold text-mainColor shadow-lg disabled:opacity-60"
        >
          {pending ? "Сохраняем…" : "Сохранить калькулятор"}
        </button>
        {msg && <span className="text-sm font-medium text-onbutton">{msg}</span>}
      </div>
    </div>
  );
}

function Field({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <div>
      <div className="mb-1.5 font-mono text-[11px] uppercase tracking-wider text-textColor/60">
        {label}
      </div>
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-lg border border-textColorDark/15 bg-white px-3 py-2 text-sm outline-none focus:border-onbutton"
      />
    </div>
  );
}

function NumField({
  label,
  value,
  onChange,
}: {
  label: string;
  value: number;
  onChange: (v: number) => void;
}) {
  return (
    <div>
      <div className="mb-1.5 font-mono text-[11px] uppercase tracking-wider text-textColor/60">
        {label}
      </div>
      <input
        type="number"
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-full rounded-lg border border-textColorDark/15 bg-white px-3 py-2 text-sm outline-none focus:border-onbutton"
      />
    </div>
  );
}
