"use client";

import { useMemo, useState, useTransition } from "react";
import { saveContent } from "@/app/admin/(dash)/content/actions";
import type { ContentGroup } from "@/lib/content-schema";
import { cn } from "@/lib/cn";

type Extra = { key: string; value: string };

export function VisualContentEditor({
  groups,
  values: initialValues,
  extras: initialExtras,
}: {
  groups: ContentGroup[];
  values: Record<string, string>;
  extras: Extra[];
}) {
  const [values, setValues] = useState<Record<string, string>>(initialValues);
  const [extras, setExtras] = useState<Extra[]>(initialExtras);
  const [openId, setOpenId] = useState<string | null>(groups[0]?.id ?? null);
  const [showExtras, setShowExtras] = useState(false);
  const [query, setQuery] = useState("");
  const [pending, start] = useTransition();
  const [msg, setMsg] = useState<string | null>(null);

  const q = query.toLowerCase().trim();

  const visibleGroups = useMemo(() => {
    if (!q) return groups;
    return groups
      .map((g) => ({
        ...g,
        fields: g.fields.filter(
          (f) =>
            f.label.toLowerCase().includes(q) ||
            f.key.toLowerCase().includes(q) ||
            (values[f.key] ?? "").toLowerCase().includes(q),
        ),
      }))
      .filter((g) => g.fields.length > 0 || g.title.toLowerCase().includes(q));
  }, [groups, q, values]);

  function set(key: string, value: string) {
    setValues((v) => ({ ...v, [key]: value }));
  }

  function save() {
    setMsg(null);
    start(async () => {
      // Submit every schema key + extras so nothing is dropped.
      const entries: Extra[] = [
        ...Object.entries(values).map(([key, value]) => ({ key, value })),
        ...extras.filter((e) => e.key.trim() !== ""),
      ];
      const res = await saveContent(entries);
      setMsg(res.ok ? "Сохранено ✓" : res.info ?? "Ошибка");
    });
  }

  return (
    <div className="grid gap-6 lg:grid-cols-[14rem_1fr]">
      {/* side jump nav */}
      <aside className="hidden lg:block">
        <div className="sticky top-6 space-y-1">
          {groups.map((g) => (
            <button
              key={g.id}
              onClick={() => {
                setOpenId(g.id);
                setQuery("");
                document.getElementById(`grp-${g.id}`)?.scrollIntoView({ behavior: "smooth", block: "start" });
              }}
              className={cn(
                "block w-full rounded-lg px-3 py-2 text-left text-sm transition-colors",
                openId === g.id
                  ? "bg-textColorDark text-mainColor"
                  : "text-textColor hover:bg-textColorDark/5 hover:text-textColorDark",
              )}
            >
              {g.title}
            </button>
          ))}
          <button
            onClick={() => setShowExtras((v) => !v)}
            className="block w-full rounded-lg px-3 py-2 text-left text-sm text-textColor/70 hover:bg-textColorDark/5"
          >
            Прочие ключи ({extras.length})
          </button>
        </div>
      </aside>

      <div>
        {/* toolbar */}
        <div className="sticky top-0 z-10 -mx-4 mb-4 flex flex-wrap items-center gap-3 bg-mainColor/90 px-4 py-3 backdrop-blur sm:-mx-8 sm:px-8">
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Поиск по тексту…"
            className="min-w-0 flex-1 rounded-xl border border-textColorDark/15 bg-white px-4 py-2 text-sm outline-none focus:border-onbutton"
          />
          <button
            onClick={save}
            disabled={pending}
            className="rounded-xl bg-textColorDark px-5 py-2 text-sm font-semibold text-mainColor disabled:opacity-60"
          >
            {pending ? "Сохраняем…" : "Сохранить всё"}
          </button>
          {msg && <span className="text-sm font-medium text-onbutton">{msg}</span>}
        </div>

        <div className="space-y-3">
          {visibleGroups.map((g) => {
            const open = q ? true : openId === g.id;
            return (
              <section
                key={g.id}
                id={`grp-${g.id}`}
                className="overflow-hidden rounded-2xl border border-textColorDark/10 bg-white/70 scroll-mt-20"
              >
                <button
                  onClick={() => setOpenId(open ? null : g.id)}
                  className="flex w-full items-center justify-between gap-3 px-5 py-4 text-left"
                >
                  <div>
                    <h2 className="font-bold text-textColorDark">{g.title}</h2>
                    {g.description && (
                      <p className="mt-0.5 text-xs text-textColor/70">{g.description}</p>
                    )}
                  </div>
                  <span className="text-textColor/40">{open ? "▾" : "▸"}</span>
                </button>

                {open && (
                  <div className="grid gap-4 border-t border-textColorDark/10 p-5">
                    {g.fields.map((f) => {
                      const multiline = f.type === "textarea" || f.type === "html";
                      return (
                        <div key={f.key}>
                          <label className="mb-1.5 flex items-center gap-2 text-sm font-medium text-textColorDark">
                            {f.label}
                            {f.type === "html" && (
                              <span className="rounded bg-onbutton/15 px-1.5 py-0.5 font-mono text-[9px] uppercase text-onbutton">
                                html
                              </span>
                            )}
                          </label>
                          {multiline ? (
                            <textarea
                              value={values[f.key] ?? ""}
                              onChange={(e) => set(f.key, e.target.value)}
                              rows={f.type === "html" ? 2 : 3}
                              className="w-full resize-y rounded-xl border border-textColorDark/15 bg-white px-4 py-2.5 text-sm outline-none focus:border-onbutton"
                            />
                          ) : (
                            <input
                              value={values[f.key] ?? ""}
                              onChange={(e) => set(f.key, e.target.value)}
                              className="w-full rounded-xl border border-textColorDark/15 bg-white px-4 py-2.5 text-sm outline-none focus:border-onbutton"
                            />
                          )}
                          {f.help && (
                            <p className="mt-1 text-xs text-textColor/60">{f.help}</p>
                          )}
                          <p className="mt-0.5 font-mono text-[10px] text-textColor/35">{f.key}</p>
                        </div>
                      );
                    })}
                  </div>
                )}
              </section>
            );
          })}
        </div>

        {/* extras / raw keys */}
        {showExtras && (
          <section className="mt-6 rounded-2xl border border-dashed border-textColorDark/20 bg-white/50 p-5">
            <div className="mb-3 flex items-center justify-between">
              <h2 className="font-bold text-textColorDark">Прочие ключи</h2>
              <button
                onClick={() => setExtras((e) => [...e, { key: "", value: "" }])}
                className="rounded-lg border border-textColorDark/15 bg-white px-3 py-1.5 text-xs font-medium hover:border-textColorDark/40"
              >
                + ключ
              </button>
            </div>
            <p className="mb-3 text-xs text-textColor/60">
              Ключи, не входящие в структурированные блоки. Меняйте осторожно.
            </p>
            <div className="grid gap-2">
              {extras.map((e, i) => (
                <div key={i} className="grid gap-2 md:grid-cols-[16rem_1fr_auto]">
                  <input
                    value={e.key}
                    onChange={(ev) =>
                      setExtras((arr) => arr.map((x, idx) => (idx === i ? { ...x, key: ev.target.value } : x)))
                    }
                    placeholder="ключ"
                    className="rounded-lg border border-textColorDark/10 bg-mainColor px-3 py-2 font-mono text-xs outline-none focus:border-onbutton"
                  />
                  <textarea
                    value={e.value}
                    onChange={(ev) =>
                      setExtras((arr) => arr.map((x, idx) => (idx === i ? { ...x, value: ev.target.value } : x)))
                    }
                    rows={1}
                    className="resize-y rounded-lg border border-textColorDark/10 bg-white px-3 py-2 text-sm outline-none focus:border-onbutton"
                  />
                  <button
                    onClick={() => setExtras((arr) => arr.filter((_, idx) => idx !== i))}
                    className="rounded-lg border border-textColorDark/15 px-3 py-2 text-xs text-textColor hover:border-red-300 hover:text-red-600"
                  >
                    Удалить
                  </button>
                </div>
              ))}
              {extras.length === 0 && (
                <p className="text-sm text-textColor/50">Нет прочих ключей.</p>
              )}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
