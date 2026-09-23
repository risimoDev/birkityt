"use client";

import { useState } from "react";
import Link from "next/link";
import type { ReviewDTO } from "@/lib/reviews";
import { submitPublicReview } from "@/app/(site)/review-actions";

export function Reviews({ reviews }: { reviews: ReviewDTO[] }) {
  const [modalOpen, setModalOpen] = useState(false);
  const [status, setStatus] = useState<"idle" | "sending" | "ok" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const [name, setName] = useState("");
  const [brand, setBrand] = useState("");
  const [text, setText] = useState("");
  const [rating, setRating] = useState(5);
  const [consent, setConsent] = useState(false);
  const [honeypot, setHoneypot] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!consent) {
      setErrorMsg("Необходимо согласие на обработку персональных данных");
      return;
    }
    setStatus("sending");
    setErrorMsg("");

    const res = await submitPublicReview({
      name,
      brand,
      text,
      rating,
      consent,
      company: honeypot,
    });

    if (!res.ok) {
      setStatus("error");
      setErrorMsg(res.info || "Не удалось отправить отзыв");
      return;
    }

    setStatus("ok");
  }

  function resetAndClose() {
    setModalOpen(false);
    setStatus("idle");
    setErrorMsg("");
    setName("");
    setBrand("");
    setText("");
    setRating(5);
    setConsent(false);
  }

  return (
    <section className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
      <div className="mb-12 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <span className="font-mono text-xs uppercase tracking-widest text-onbutton">
            / отзывы клиентов
          </span>
          <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-textColorDark sm:text-4xl">
            Что говорят бренды о работе с БИРКИТУТ
          </h2>
          <div className="mt-2 flex items-center gap-2 font-mono text-xs text-textColor/60">
            <span className="text-amber-500 text-base">★★★★★</span>
            <span>На основе реальных отзывов клиентов</span>
          </div>
        </div>

        <button
          type="button"
          onClick={() => setModalOpen(true)}
          className="w-fit rounded-full border border-textColorDark/20 bg-white px-6 py-3 text-sm font-semibold text-textColorDark shadow-sm transition-all hover:border-onbutton hover:bg-onbutton hover:text-white"
        >
          + Оставить отзыв
        </button>
      </div>

      {/* Reviews Grid */}
      <div className="grid gap-6 md:grid-cols-3">
        {reviews.map((r) => (
          <article
            key={r.id}
            className="flex flex-col justify-between rounded-3xl border border-textColorDark/10 bg-white p-7 shadow-sm transition-shadow hover:shadow-md"
          >
            <div>
              <div className="flex items-center justify-between gap-2">
                <div className="flex text-amber-500 text-sm">
                  {"★".repeat(r.rating || 5)}
                </div>
                <span className="font-mono text-[10px] uppercase tracking-wider text-textColor/40">
                  проверено
                </span>
              </div>
              <p className="mt-4 text-sm leading-relaxed text-textColor">{r.text}</p>
            </div>

            <div className="mt-6 border-t border-textColorDark/10 pt-4">
              <div className="font-bold text-textColorDark">{r.name}</div>
              {r.brand && (
                <div className="font-mono text-xs text-onbutton mt-0.5">
                  {r.brand}
                </div>
              )}
            </div>
          </article>
        ))}
      </div>

      {/* Modal */}
      {modalOpen && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-textColorDark/75 backdrop-blur-sm transition-opacity"
          onClick={resetAndClose}
        >
          <div
            className="relative w-full max-w-lg rounded-3xl border border-textColorDark/10 bg-white p-6 shadow-2xl sm:p-8"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={resetAndClose}
              className="absolute right-5 top-5 grid h-9 w-9 place-items-center rounded-full border border-textColorDark/15 text-sm text-textColor hover:bg-gray-100"
              aria-label="Закрыть"
            >
              ✕
            </button>

            {status === "ok" ? (
              <div className="text-center py-6">
                <div className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-emerald-100 text-2xl text-emerald-600">
                  ✓
                </div>
                <h3 className="mt-4 text-2xl font-bold text-textColorDark">
                  Спасибо за ваш отзыв!
                </h3>
                <p className="mt-2 text-sm text-textColor/80 leading-relaxed">
                  Ваш отзыв успешно отправлен и появится на сайте сразу после проверки модератором.
                </p>
                <button
                  type="button"
                  onClick={resetAndClose}
                  className="mt-6 rounded-full bg-textColorDark px-6 py-2.5 text-sm font-semibold text-mainColor hover:bg-onbutton hover:text-white"
                >
                  Понятно, закрыть
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <h3 className="text-2xl font-bold text-textColorDark">
                    Оставить отзыв
                  </h3>
                  <p className="mt-1 text-xs text-textColor/70">
                    Поделитесь вашим впечатлением о качестве бирок и скорости выполнения заказа.
                    Отзыв будет опубликован после проверки модератором.
                  </p>
                </div>

                {errorMsg && (
                  <div className="rounded-xl border border-red-200 bg-red-50 p-3 text-xs text-red-600">
                    {errorMsg}
                  </div>
                )}

                <div className="space-y-3">
                  <div>
                    <label className="mb-1 block font-mono text-[11px] uppercase tracking-wider text-textColor/70">
                      Ваше имя *
                    </label>
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Иван М."
                      className="w-full rounded-xl border border-textColorDark/15 bg-white px-3.5 py-2.5 text-sm text-textColorDark outline-none focus:border-onbutton"
                    />
                  </div>

                  <div>
                    <label className="mb-1 block font-mono text-[11px] uppercase tracking-wider text-textColor/70">
                      Бренд или мастерская (необязательно)
                    </label>
                    <input
                      type="text"
                      value={brand}
                      onChange={(e) => setBrand(e.target.value)}
                      placeholder="Швейная мастерская Silk & Line"
                      className="w-full rounded-xl border border-textColorDark/15 bg-white px-3.5 py-2.5 text-sm text-textColorDark outline-none focus:border-onbutton"
                    />
                  </div>

                  <div>
                    <label className="mb-1 block font-mono text-[11px] uppercase tracking-wider text-textColor/70">
                      Ваша оценка
                    </label>
                    <div className="flex items-center gap-1.5 py-1">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button
                          key={star}
                          type="button"
                          onClick={() => setRating(star)}
                          className={`text-2xl transition-transform hover:scale-110 ${
                            star <= rating ? "text-amber-500" : "text-gray-200"
                          }`}
                        >
                          ★
                        </button>
                      ))}
                      <span className="ml-2 font-mono text-xs text-textColor/60">
                        {rating} из 5
                      </span>
                    </div>
                  </div>

                  <div>
                    <label className="mb-1 block font-mono text-[11px] uppercase tracking-wider text-textColor/70">
                      Текст отзыва *
                    </label>
                    <textarea
                      required
                      rows={4}
                      value={text}
                      onChange={(e) => setText(e.target.value)}
                      placeholder="Расскажите о качестве печати, стойкости к стиркам, соблюдении сроков..."
                      className="w-full resize-none rounded-xl border border-textColorDark/15 bg-white px-3.5 py-2.5 text-sm text-textColorDark outline-none focus:border-onbutton"
                    />
                  </div>

                  {/* Honeypot hidden input */}
                  <input
                    type="text"
                    name="company"
                    tabIndex={-1}
                    autoComplete="off"
                    value={honeypot}
                    onChange={(e) => setHoneypot(e.target.value)}
                    className="hidden"
                    aria-hidden
                  />

                  {/* Consent checkbox */}
                  <label className="flex cursor-pointer items-start gap-2.5 text-[12px] leading-relaxed text-textColor/80">
                    <input
                      type="checkbox"
                      checked={consent}
                      onChange={(e) => setConsent(e.target.checked)}
                      required
                      className="mt-0.5 h-4 w-4 shrink-0 accent-onbutton"
                    />
                    <span>
                      Я согласен на обработку персональных данных в соответствии с{" "}
                      <Link
                        href="/privacy"
                        target="_blank"
                        rel="noopener"
                        className="underline decoration-textColor/30 underline-offset-2 hover:text-onbutton"
                      >
                        политикой конфиденциальности
                      </Link>
                      <span className="text-onbutton"> *</span>
                    </span>
                  </label>
                </div>

                <div className="pt-2 flex items-center justify-end gap-3">
                  <button
                    type="button"
                    onClick={resetAndClose}
                    className="rounded-full border border-textColorDark/15 px-5 py-2.5 text-sm font-medium text-textColor hover:bg-gray-100"
                  >
                    Отмена
                  </button>
                  <button
                    type="submit"
                    disabled={status === "sending" || !consent}
                    className="rounded-full bg-onbutton px-6 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-textColorDark disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {status === "sending" ? "Отправляем…" : "Отправить на модерацию"}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </section>
  );
}
