"use client";

import { useState, useTransition } from "react";
import { sendTestMax } from "@/app/admin/(dash)/notify-actions";

/**
 * Shows whether the notification channels are configured and lets an operator
 * send a test message to MAX without submitting a fake order.
 */
export function NotificationStatus({
  max,
  email,
}: {
  max: boolean;
  email: boolean;
}) {
  const [pending, startTransition] = useTransition();
  const [result, setResult] = useState<{ ok: boolean; message: string } | null>(
    null,
  );

  function onTest() {
    setResult(null);
    startTransition(async () => setResult(await sendTestMax()));
  }

  return (
    <section className="mt-8 rounded-2xl border border-textColorDark/10 bg-white/70 p-5">
      <h2 className="text-lg font-bold text-textColorDark">
        Уведомления о заявках
      </h2>
      <p className="mt-1 text-sm text-textColor">
        Куда уходит сообщение, когда посетитель отправляет форму или расчёт.
      </p>

      <div className="mt-4 flex flex-wrap gap-3">
        <Badge label="MAX" on={max} />
        <Badge label="Почта" on={email} />
      </div>

      {!max && (
        <p className="mt-4 rounded-xl bg-onbutton/10 px-4 py-3 text-sm text-textColor">
          Бот MAX не настроен: в <code>.env</code> пусты{" "}
          <code>MAX_BOT_TOKEN</code> или <code>MAX_CHAT_ID</code>. Заявки при
          этом всё равно сохраняются и видны в разделе «Заявки».
        </p>
      )}

      <div className="mt-4 flex flex-wrap items-center gap-3">
        <button
          type="button"
          onClick={onTest}
          disabled={pending || !max}
          className="rounded-full bg-textColorDark px-5 py-2.5 text-sm font-semibold text-mainColor transition-colors hover:bg-onbutton hover:text-white disabled:cursor-not-allowed disabled:opacity-50"
        >
          {pending ? "Отправляем…" : "Отправить тестовое сообщение"}
        </button>
        {result && (
          <span
            className={
              "text-sm " + (result.ok ? "text-textColorDark" : "text-clrLoft")
            }
          >
            {result.ok ? "✓ " : "✕ "}
            {result.message}
          </span>
        )}
      </div>
    </section>
  );
}

function Badge({ label, on }: { label: string; on: boolean }) {
  return (
    <span
      className={
        "inline-flex items-center gap-2 rounded-full border px-4 py-1.5 text-sm font-medium " +
        (on
          ? "border-tgreen bg-tgreen/20 text-textColorDark"
          : "border-textColorDark/15 bg-white text-textColor/70")
      }
    >
      <span
        aria-hidden
        className={
          "h-2 w-2 rounded-full " + (on ? "bg-tgreen" : "bg-textColor/30")
        }
      />
      {label}: {on ? "настроен" : "не настроен"}
    </span>
  );
}
