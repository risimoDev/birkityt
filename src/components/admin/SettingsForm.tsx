"use client";

import { useState, useTransition } from "react";
import { saveSettings } from "@/app/admin/(dash)/seo/actions";

export type Field = { key: string; label: string; multiline?: boolean };
export type Group = { title: string; fields: Field[] };

export function SettingsForm({
  groups,
  initial,
}: {
  groups: Group[];
  initial: Record<string, string>;
}) {
  const [values, setValues] = useState<Record<string, string>>(initial);
  const [pending, start] = useTransition();
  const [msg, setMsg] = useState<string | null>(null);

  function save() {
    setMsg(null);
    start(async () => {
      const res = await saveSettings(values);
      setMsg(res.ok ? "Сохранено" : "Ошибка");
    });
  }

  return (
    <div className="space-y-8">
      {groups.map((g) => (
        <section key={g.title}>
          <h2 className="mb-3 font-mono text-xs uppercase tracking-widest text-onbutton">
            {g.title}
          </h2>
          <div className="grid gap-4 rounded-2xl border border-textColorDark/10 bg-white/70 p-5 sm:grid-cols-2">
            {g.fields.map((f) => (
              <div key={f.key} className={f.multiline ? "sm:col-span-2" : ""}>
                <label className="mb-1.5 block font-mono text-[11px] uppercase tracking-wider text-textColor/60">
                  {f.label}
                </label>
                {f.multiline ? (
                  <textarea
                    rows={2}
                    value={values[f.key] ?? ""}
                    onChange={(e) => setValues((v) => ({ ...v, [f.key]: e.target.value }))}
                    className="w-full resize-y rounded-xl border border-textColorDark/15 bg-white px-4 py-2.5 text-sm outline-none focus:border-onbutton"
                  />
                ) : (
                  <input
                    value={values[f.key] ?? ""}
                    onChange={(e) => setValues((v) => ({ ...v, [f.key]: e.target.value }))}
                    className="w-full rounded-xl border border-textColorDark/15 bg-white px-4 py-2.5 text-sm outline-none focus:border-onbutton"
                  />
                )}
              </div>
            ))}
          </div>
        </section>
      ))}

      <div className="sticky bottom-4 flex items-center gap-3">
        <button
          onClick={save}
          disabled={pending}
          className="rounded-xl bg-textColorDark px-6 py-2.5 text-sm font-semibold text-mainColor shadow-lg disabled:opacity-60"
        >
          {pending ? "Сохраняем…" : "Сохранить настройки"}
        </button>
        {msg && <span className="text-sm text-onbutton">{msg}</span>}
      </div>
    </div>
  );
}
