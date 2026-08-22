/**
 * Yandex.Metrika helpers: counter id, cookie-consent storage and goal calls.
 *
 * The counter script is rendered only after the visitor accepts cookies
 * (see components/site/Analytics.tsx), so every helper here is a no-op until
 * `window.ym` exists.
 */

/** Counter id, inlined at build time. Empty string disables analytics. */
export const METRIKA_ID = process.env.NEXT_PUBLIC_YANDEX_METRIKA_ID ?? "";

export const CONSENT_KEY = "birkityt.cookie-consent";

export type Consent = "granted" | "denied";

/** Conversion goals — mirror docs/metrika.md, keep the two in sync. */
export type Goal =
  | "form_submit"
  | "click_phone"
  | "click_whatsapp"
  | "click_telegram"
  | "click_max"
  | "click_email"
  | "calc_open";

declare global {
  interface Window {
    ym?: (id: number, action: string, ...args: unknown[]) => void;
  }
}

export function readConsent(): Consent | null {
  if (typeof window === "undefined") return null;
  try {
    const v = window.localStorage.getItem(CONSENT_KEY);
    return v === "granted" || v === "denied" ? v : null;
  } catch {
    // Private mode / storage disabled — treat as "not decided yet".
    return null;
  }
}

export function writeConsent(value: Consent): void {
  try {
    window.localStorage.setItem(CONSENT_KEY, value);
  } catch {
    /* nothing we can do; the banner still hides for this page view */
  }
}

/** Fire a conversion goal. Safe to call before the counter has loaded. */
export function reachGoal(goal: Goal): void {
  if (!METRIKA_ID) return;
  try {
    window.ym?.(Number(METRIKA_ID), "reachGoal", goal);
  } catch {
    /* analytics must never break the UI */
  }
}
