"use client";

import { useState } from "react";
import Link from "next/link";
import { reachGoal } from "@/lib/metrika";
import { LazyMap } from "@/components/site/LazyMap";

type Status = "idle" | "sending" | "ok" | "error";

export function ContactSection({
  phone,
  email,
  address,
  eyebrow,
  title,
  text,
}: {
  phone: string;
  email: string;
  address: string;
  eyebrow: string;
  title: string;
  text: string;
}) {
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");
  const [consent, setConsent] = useState(false);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("sending");
    setError("");
    const form = e.currentTarget;
    const payload = Object.fromEntries(new FormData(form));
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const json = await res.json();
      if (!res.ok || json.result !== "success") {
        throw new Error(json.info || "Не удалось отправить заявку");
      }
      setStatus("ok");
      reachGoal("form_submit");
      form.reset();
      setConsent(false);
    } catch (err) {
      setStatus("error");
      setError((err as Error).message);
    }
  }

  return (
    <section id="contact" className="relative overflow-hidden bg-textColorDark text-mainColor">
      <div className="mx-auto grid max-w-6xl gap-0 px-4 py-20 sm:px-6 lg:grid-cols-2 lg:gap-12">
        {/* left: info + map */}
        <div>
          <span className="font-mono text-xs uppercase tracking-widest text-onbutton">
            / {eyebrow}
          </span>
          <h2 className="mt-4 text-3xl font-extrabold tracking-tight sm:text-4xl">
            {title}
          </h2>
          <p className="mt-4 max-w-md text-mainColor/70">{text}</p>

          <dl className="mt-8 space-y-4 text-sm">
            <Row label="Телефон">
              <a
                href={`tel:${phone.replace(/[^+\d]/g, "")}`}
                className="hover:text-onbutton"
                onClick={() => reachGoal("click_phone")}
              >
                {phone}
              </a>
            </Row>
            <Row label="Почта">
              <a
                href={`mailto:${email}`}
                className="hover:text-onbutton"
                onClick={() => reachGoal("click_email")}
              >
                {email}
              </a>
            </Row>
            <Row label="Адрес">{address}</Row>
          </dl>

          <div className="mt-8 overflow-hidden rounded-2xl border border-mainColor/15">
            <LazyMap
              title={`БИРКИТУТ на карте — ${address}`}
              src="https://yandex.ru/map-widget/v1/?um=constructor%3A5a9e66ca8e53422be682486f68b65a31f288f536be5e5ccf37730aab74481305&source=constructor"
            />
          </div>
        </div>

        {/* right: form */}
        <div className="mt-10 lg:mt-0">
          <form
            onSubmit={onSubmit}
            className="rounded-3xl border border-mainColor/15 bg-mainColor/5 p-6 backdrop-blur sm:p-8"
          >
            <div className="grid gap-4">
              <Field name="name" label="Имя" required />
              <Field name="phone" label="Телефон" type="tel" required />
              <Field name="email" label="Почта" type="email" />
              <div>
                <label className="mb-1.5 block font-mono text-[11px] uppercase tracking-wider text-mainColor/60">
                  Сообщение
                </label>
                <textarea
                  name="message"
                  rows={4}
                  className="w-full resize-none rounded-xl border border-mainColor/20 bg-textColorDark/40 px-4 py-3 text-mainColor outline-none placeholder:text-mainColor/30 focus:border-onbutton"
                  placeholder="Что нужно напечатать?"
                />
              </div>
            </div>

            {/* honeypot */}
            <input
              type="text"
              name="company"
              tabIndex={-1}
              autoComplete="off"
              className="hidden"
              aria-hidden
            />

            <label className="mt-6 flex cursor-pointer items-start gap-3 text-[13px] leading-relaxed text-mainColor/70">
              <input
                type="checkbox"
                name="consent"
                checked={consent}
                onChange={(e) => setConsent(e.target.checked)}
                required
                className="mt-0.5 h-4 w-4 shrink-0 accent-onbutton"
              />
              <span>
                Я согласен на обработку персональных данных
                <span className="text-onbutton"> *</span>
              </span>
            </label>

            <button
              type="submit"
              disabled={status === "sending" || !consent}
              className="mt-5 w-full rounded-full bg-onbutton px-6 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-white hover:text-textColorDark disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:bg-onbutton disabled:hover:text-white"
            >
              {status === "sending" ? "Отправляем…" : "Отправить заявку"}
            </button>

            {status === "ok" && (
              <p className="mt-4 text-center text-sm text-tgreen">
                Заявка принята! Мы скоро свяжемся с вами.
              </p>
            )}
            {status === "error" && (
              <p className="mt-4 text-center text-sm text-clrLoft">{error}</p>
            )}

            <p className="mt-4 text-center text-[11px] leading-relaxed text-mainColor/40">
              Нажимая кнопку, вы соглашаетесь с{" "}
              <Link
                href="/privacy"
                target="_blank"
                rel="noopener"
                className="underline decoration-mainColor/30 underline-offset-2 hover:text-onbutton"
              >
                политикой обработки персональных данных
              </Link>
              .
            </p>
          </form>
        </div>
      </div>
    </section>
  );
}

function Row({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="flex items-baseline gap-4">
      <dt className="w-16 shrink-0 font-mono text-[11px] uppercase tracking-wider text-mainColor/40">
        {label}
      </dt>
      <dd className="font-medium">{children}</dd>
    </div>
  );
}

function Field({
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
      <label className="mb-1.5 block font-mono text-[11px] uppercase tracking-wider text-mainColor/60">
        {label}
        {required && <span className="text-onbutton"> *</span>}
      </label>
      <input
        name={name}
        type={type}
        required={required}
        className="w-full rounded-xl border border-mainColor/20 bg-textColorDark/40 px-4 py-3 text-mainColor outline-none placeholder:text-mainColor/30 focus:border-onbutton"
      />
    </div>
  );
}
