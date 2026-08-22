import Link from "next/link";

/**
 * Consent prompt shown until the visitor accepts or declines cookies.
 * Purely presentational — the decision is owned by <Analytics>.
 */
export function CookieBanner({
  onAccept,
  onDecline,
}: {
  onAccept: () => void;
  onDecline: () => void;
}) {
  return (
    <div
      role="dialog"
      aria-label="Согласие на использование cookie"
      className="fixed inset-x-0 bottom-0 z-[70] px-4 pb-4 sm:px-6 sm:pb-6"
    >
      <div className="mx-auto flex max-w-4xl flex-col gap-4 rounded-3xl border border-mainColor/15 bg-textColorDark p-6 text-mainColor shadow-3xl sm:flex-row sm:items-center sm:gap-6">
        <p className="text-sm leading-relaxed text-mainColor/80">
          Мы используем cookie и Яндекс.Метрику, чтобы понимать, как посетители
          пользуются сайтом. Аналитика включается только с вашего согласия —
          подробности в{" "}
          <Link
            href="/privacy"
            target="_blank"
            rel="noopener"
            className="underline decoration-onbutton underline-offset-4 hover:text-onbutton"
          >
            политике обработки персональных данных
          </Link>
          .
        </p>
        <div className="flex shrink-0 gap-2">
          <button
            type="button"
            onClick={onAccept}
            className="rounded-full bg-onbutton px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-white hover:text-textColorDark"
          >
            Принять
          </button>
          <button
            type="button"
            onClick={onDecline}
            className="rounded-full border border-mainColor/25 px-5 py-2.5 text-sm font-medium text-mainColor/80 transition-colors hover:border-mainColor/50"
          >
            Отказаться
          </button>
        </div>
      </div>
    </div>
  );
}
