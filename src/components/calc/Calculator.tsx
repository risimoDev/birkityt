"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import type { PriceGroupDTO } from "@/lib/prices";
import { computeQuote, formatRub } from "@/lib/pricing";
import { type CalcConfig, lengthSurchargeFor } from "@/lib/calc-config";
import { cn } from "@/lib/cn";

type Status = "idle" | "sending" | "error";

export function Calculator({
  groups,
  config,
}: {
  groups: PriceGroupDTO[];
  config: CalcConfig;
}) {
  const router = useRouter();
  const [groupId, setGroupId] = useState(groups[0]?.id ?? "");
  const group = groups.find((g) => g.id === groupId) ?? groups[0];

  const [itemId, setItemId] = useState(group?.items[0]?.id ?? "");
  const item =
    group?.items.find((i) => i.id === itemId) ?? group?.items[0] ?? null;

  const [quantity, setQuantity] = useState(config.defaultQuantity);
  const [length, setLength] = useState<string | null>(null);
  const [fraying, setFraying] = useState(false);

  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");

  const showExtras = config.lengthEnabled || config.frayingEnabled;

  const quote = useMemo(
    () =>
      computeQuote({
        tiers: item?.tiers ?? [],
        quantity,
        lengthSurcharge: lengthSurchargeFor(config, length),
        frayingSurcharge: fraying && config.frayingEnabled ? config.frayingSurcharge : 0,
      }),
    [item, quantity, length, fraying, config],
  );

  function onGroupChange(id: string) {
    setGroupId(id);
    const g = groups.find((x) => x.id === id);
    setItemId(g?.items[0]?.id ?? "");
  }

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!group || !item) return;
    setStatus("sending");
    setError("");
    const fd = new FormData(e.currentTarget);
    const payload = {
      groupId: group.id,
      itemId: item.id,
      quantity,
      length,
      fraying,
      name: fd.get("name"),
      phone: fd.get("phone"),
      email: fd.get("email"),
      contactMethod: fd.get("contactMethod"),
      message: fd.get("message"),
      company: fd.get("company"), // honeypot
    };
    try {
      const res = await fetch("/api/calc", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const json = await res.json();
      if (!res.ok || json.result !== "success") {
        throw new Error(json.info || "Не удалось отправить заявку");
      }
      router.push("/success");
    } catch (err) {
      setStatus("error");
      setError((err as Error).message);
    }
  }

  if (!group) {
    return <p className="text-textColor">Калькулятор временно недоступен.</p>;
  }

  return (
    <form onSubmit={onSubmit} className="grid gap-8 lg:grid-cols-[1.3fr_0.7fr]">
      {/* left: configurator */}
      <div className="space-y-8">
        <Step n="01" title="Материал">
          <div className="flex flex-wrap gap-2">
            {groups.map((g) => (
              <Chip
                key={g.id}
                active={g.id === groupId}
                onClick={() => onGroupChange(g.id)}
              >
                {g.name}
              </Chip>
            ))}
          </div>
        </Step>

        {group.items.length > 0 && (
          <Step n="02" title="Вариант / ширина">
            <div className="flex flex-wrap gap-2">
              {group.items.map((it) => (
                <Chip
                  key={it.id}
                  active={it.id === itemId}
                  onClick={() => setItemId(it.id)}
                >
                  {it.variant || "Стандарт"}
                </Chip>
              ))}
            </div>
            {group.note && (
              <p className="mt-3 font-mono text-[11px] uppercase tracking-wide text-textColor/55">
                {group.note}
              </p>
            )}
          </Step>
        )}

        <Step n="03" title="Количество">
          <div className="flex items-center gap-4">
            <input
              type="number"
              min={1}
              value={quantity}
              onChange={(e) => setQuantity(parseInt(e.target.value) || 0)}
              className="w-36 rounded-xl border border-textColorDark/15 bg-white px-4 py-3 text-lg font-semibold text-textColorDark outline-none focus:border-onbutton"
            />
            <div className="flex flex-wrap gap-2">
              {config.quantityPresets.map((q) => (
                <Chip key={q} small active={quantity === q} onClick={() => setQuantity(q)}>
                  {q.toLocaleString("ru-RU")}
                </Chip>
              ))}
            </div>
          </div>
        </Step>

        {showExtras && (
          <Step n="04" title="Дополнительно" optional>
            <div className="space-y-4">
              {config.lengthEnabled && config.lengthOptions.length > 0 && (
                <div>
                  <div className="mb-2 text-sm text-textColor">{config.lengthLabel}</div>
                  <div className="flex flex-wrap gap-2">
                    <Chip small active={length === null} onClick={() => setLength(null)}>
                      Не важно
                    </Chip>
                    {config.lengthOptions.map((l) => (
                      <Chip
                        key={l.label}
                        small
                        active={length === l.label}
                        onClick={() => setLength(l.label)}
                      >
                        {l.label}
                        {l.surcharge > 0 && (
                          <span className="ml-1 text-[11px] opacity-70">+{l.surcharge}₽</span>
                        )}
                      </Chip>
                    ))}
                  </div>
                </div>
              )}
              {config.frayingEnabled && (
                <label className="flex w-fit cursor-pointer items-center gap-3 rounded-xl border border-dashed border-textColorDark/20 px-4 py-2.5">
                  <input
                    type="checkbox"
                    checked={fraying}
                    onChange={(e) => setFraying(e.target.checked)}
                    className="h-4 w-4 accent-onbutton"
                  />
                  <span className="text-sm text-textColorDark">
                    {config.frayingLabel}{" "}
                    <span className="font-mono text-xs text-textColor/60">
                      +{config.frayingSurcharge} ₽/шт
                    </span>
                  </span>
                </label>
              )}
            </div>
          </Step>
        )}

        <Step n="05" title="Контакты">
          <div className="grid gap-4 sm:grid-cols-2">
            <Input name="name" label="ФИО" required />
            <Input name="phone" label="Телефон" type="tel" required />
            <Input name="email" label="Email" type="email" />
            <div>
              <Label>Способ связи</Label>
              <select
                name="contactMethod"
                className="w-full rounded-xl border border-textColorDark/15 bg-white px-4 py-3 text-textColorDark outline-none focus:border-onbutton"
              >
                <option>Telegram</option>
                <option>Телефон</option>
                <option>WhatsApp</option>
                <option>Email</option>
              </select>
            </div>
            <div className="sm:col-span-2">
              <Label>Сообщение</Label>
              <textarea
                name="message"
                rows={3}
                className="w-full resize-none rounded-xl border border-textColorDark/15 bg-white px-4 py-3 text-textColorDark outline-none focus:border-onbutton"
                placeholder="Комментарий к заказу, ссылка на макет…"
              />
            </div>
          </div>
          <input
            type="text"
            name="company"
            tabIndex={-1}
            autoComplete="off"
            className="hidden"
            aria-hidden
          />
        </Step>
      </div>

      {/* right: sticky summary */}
      <div className="lg:sticky lg:top-28 lg:self-start">
        <div className="relative overflow-hidden rounded-3xl bg-textColorDark p-7 text-mainColor">
          <span className="absolute left-6 top-6 h-3 w-3 rounded-full border border-mainColor/40" />
          <div className="pl-7 font-mono text-[11px] uppercase tracking-widest text-mainColor/50">
            предварительный расчёт
          </div>

          <div className="mt-6 text-sm text-mainColor/70">{group.name}</div>
          {item?.variant && (
            <div className="text-sm text-mainColor/70">{item.variant}</div>
          )}

          <div className="mt-6 space-y-2 border-t border-mainColor/15 pt-4 text-sm">
            <Line label="Цена за штуку" value={formatRub(quote.unitBase)} />
            {quote.lengthSurcharge > 0 && (
              <Line label="Длина" value={`+${formatRub(quote.lengthSurcharge)}`} />
            )}
            {quote.frayingSurcharge > 0 && (
              <Line label="Обработка" value={`+${formatRub(quote.frayingSurcharge)}`} />
            )}
            <Line label="Итог за штуку" value={formatRub(quote.unitTotal)} strong />
            <Line label="Тираж" value={`${quote.quantity.toLocaleString("ru-RU")} шт`} />
          </div>

          <div className="mt-5 border-t border-mainColor/15 pt-5">
            <div className="font-mono text-[11px] uppercase tracking-widest text-mainColor/50">
              ориентировочно
            </div>
            <div className="mt-1 text-4xl font-extrabold">{formatRub(quote.total)}</div>
          </div>

          <button
            type="submit"
            disabled={status === "sending"}
            className="mt-6 w-full rounded-full bg-onbutton px-6 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-white hover:text-textColorDark disabled:opacity-60"
          >
            {status === "sending" ? "Отправляем…" : "Отправить заявку"}
          </button>
          {status === "error" && (
            <p className="mt-3 text-center text-sm text-clrLoft">{error}</p>
          )}
          <p className="mt-3 text-center text-[11px] text-mainColor/40">
            Точную цену подтвердит менеджер после согласования макета.
          </p>
        </div>
      </div>
    </form>
  );
}

function Step({
  n,
  title,
  optional,
  children,
}: {
  n: string;
  title: string;
  optional?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div>
      <div className="mb-4 flex items-center gap-3">
        <span className="font-mono text-sm font-bold text-onbutton">{n}</span>
        <h2 className="text-lg font-bold text-textColorDark">{title}</h2>
        {optional && (
          <span className="font-mono text-[10px] uppercase tracking-wider text-textColor/40">
            необязательно
          </span>
        )}
      </div>
      {children}
    </div>
  );
}

function Chip({
  active,
  small,
  onClick,
  children,
}: {
  active?: boolean;
  small?: boolean;
  onClick?: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "rounded-full border transition-colors",
        small ? "px-3.5 py-1.5 text-sm" : "px-4 py-2 text-sm",
        active
          ? "border-textColorDark bg-textColorDark text-mainColor"
          : "border-textColorDark/15 bg-white text-textColorDark hover:border-textColorDark/40",
      )}
    >
      {children}
    </button>
  );
}

function Label({ children }: { children: React.ReactNode }) {
  return (
    <label className="mb-1.5 block font-mono text-[11px] uppercase tracking-wider text-textColor/60">
      {children}
    </label>
  );
}

function Input({
  name,
  label,
  type = "text",
  required,
}: {
  name: string;
  label: string;
  type?: string;
  required?: boolean;
}) {
  return (
    <div>
      <Label>
        {label}
        {required && <span className="text-onbutton"> *</span>}
      </Label>
      <input
        name={name}
        type={type}
        required={required}
        className="w-full rounded-xl border border-textColorDark/15 bg-white px-4 py-3 text-textColorDark outline-none focus:border-onbutton"
      />
    </div>
  );
}

function Line({
  label,
  value,
  strong,
}: {
  label: string;
  value: string;
  strong?: boolean;
}) {
  return (
    <div className="flex items-baseline justify-between">
      <span className="text-mainColor/60">{label}</span>
      <span className={cn(strong ? "text-base font-bold" : "font-medium")}>{value}</span>
    </div>
  );
}
