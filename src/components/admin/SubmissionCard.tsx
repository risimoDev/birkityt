"use client";

import { useState, useTransition } from "react";
import { setStatus, saveNote, deleteSubmission } from "@/app/admin/(dash)/submissions/actions";
import { cn } from "@/lib/cn";

export type SubmissionView = {
  id: string;
  type: "CONTACT" | "CALC";
  name: string | null;
  phone: string | null;
  email: string | null;
  message: string | null;
  payload: Record<string, unknown> | null;
  status: "NEW" | "IN_PROGRESS" | "DONE" | "SPAM";
  note: string | null;
  createdAt: string;
};

const STATUSES: { value: SubmissionView["status"]; label: string; cls: string }[] = [
  { value: "NEW", label: "Новая", cls: "bg-onbutton/20 text-textColorDark" },
  { value: "IN_PROGRESS", label: "В работе", cls: "bg-clrLoft/30 text-textColorDark" },
  { value: "DONE", label: "Выполнена", cls: "bg-tgreen/40 text-textColorDark" },
  { value: "SPAM", label: "Спам", cls: "bg-textColorDark/10 text-textColor" },
];

export function SubmissionCard({ s }: { s: SubmissionView }) {
  const [pending, start] = useTransition();
  const [note, setNote] = useState(s.note ?? "");
  const [savedNote, setSavedNote] = useState(s.note ?? "");

  const quote = s.payload?.quote as { total?: number; unitTotal?: number } | undefined;

  return (
    <article className="rounded-2xl border border-textColorDark/10 bg-white/70 p-5">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <div className="flex items-center gap-2">
            <span className="font-mono text-[10px] uppercase tracking-wider text-onbutton">
              {s.type === "CALC" ? "калькулятор" : "форма"}
            </span>
            <span className="text-xs text-textColor/50">
              {new Date(s.createdAt).toLocaleString("ru-RU")}
            </span>
          </div>
          <h3 className="mt-1 text-lg font-bold text-textColorDark">
            {s.name || "Без имени"}
          </h3>
          <div className="mt-1 flex flex-wrap gap-x-4 gap-y-1 text-sm text-textColor">
            {s.phone && (
              <a href={`tel:${s.phone}`} className="hover:text-textColorDark">
                {s.phone}
              </a>
            )}
            {s.email && (
              <a href={`mailto:${s.email}`} className="hover:text-textColorDark">
                {s.email}
              </a>
            )}
          </div>
        </div>

        <select
          value={s.status}
          disabled={pending}
          onChange={(e) => start(() => setStatus(s.id, e.target.value))}
          className={cn(
            "rounded-lg border border-textColorDark/10 px-3 py-1.5 text-sm font-medium",
            STATUSES.find((x) => x.value === s.status)?.cls,
          )}
        >
          {STATUSES.map((st) => (
            <option key={st.value} value={st.value}>
              {st.label}
            </option>
          ))}
        </select>
      </div>

      {s.message && (
        <p className="mt-3 whitespace-pre-wrap rounded-xl bg-mainColor px-4 py-3 text-sm text-textColor">
          {s.message}
        </p>
      )}

      {s.type === "CALC" && s.payload && (
        <dl className="mt-3 grid grid-cols-2 gap-x-4 gap-y-1 rounded-xl bg-mainColor px-4 py-3 text-sm sm:grid-cols-3">
          <Item label="Материал" value={String(s.payload.group ?? "")} />
          <Item label="Вариант" value={String(s.payload.variant ?? "")} />
          <Item label="Тираж" value={`${s.payload.quantity ?? ""} шт`} />
          {s.payload.length ? <Item label="Длина" value={String(s.payload.length)} /> : null}
          {s.payload.fraying ? <Item label="Обработка" value="да" /> : null}
          {quote?.total != null && (
            <Item label="Итого" value={`${quote.total.toLocaleString("ru-RU")} ₽`} strong />
          )}
        </dl>
      )}

      <div className="mt-3">
        <textarea
          value={note}
          onChange={(e) => setNote(e.target.value)}
          placeholder="Заметка менеджера…"
          rows={2}
          className="w-full resize-none rounded-xl border border-textColorDark/10 bg-white px-3 py-2 text-sm outline-none focus:border-onbutton"
        />
        <div className="mt-2 flex items-center gap-3">
          <button
            type="button"
            disabled={pending || note === savedNote}
            onClick={() =>
              start(async () => {
                await saveNote(s.id, note);
                setSavedNote(note);
              })
            }
            className="rounded-lg bg-textColorDark px-3 py-1.5 text-xs font-semibold text-mainColor disabled:opacity-40"
          >
            Сохранить заметку
          </button>
          <button
            type="button"
            disabled={pending}
            onClick={() => {
              if (confirm("Удалить заявку?")) start(() => deleteSubmission(s.id));
            }}
            className="rounded-lg border border-textColorDark/15 px-3 py-1.5 text-xs text-textColor hover:border-red-300 hover:text-red-600"
          >
            Удалить
          </button>
        </div>
      </div>
    </article>
  );
}

function Item({ label, value, strong }: { label: string; value: string; strong?: boolean }) {
  return (
    <div>
      <dt className="font-mono text-[10px] uppercase tracking-wider text-textColor/50">
        {label}
      </dt>
      <dd className={cn("text-textColorDark", strong && "font-bold")}>{value}</dd>
    </div>
  );
}
