"use client";

import { useEffect, useRef, useState } from "react";
import Script from "next/script";
import { usePathname } from "next/navigation";
import {
  METRIKA_ID,
  readConsent,
  writeConsent,
  type Consent,
} from "@/lib/metrika";
import { CookieBanner } from "@/components/site/CookieBanner";

/**
 * Owns the cookie decision and, once it is "granted", loads Yandex.Metrika.
 * Nothing is requested from mc.yandex.ru before the visitor accepts.
 */
export function Analytics() {
  const pathname = usePathname();
  const [consent, setConsent] = useState<Consent | null>(null);
  // The decision lives in localStorage, which is unavailable during SSR —
  // render nothing until the first effect has read it, so markup matches.
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setConsent(readConsent());
    setReady(true);
  }, []);

  const enabled = ready && consent === "granted" && METRIKA_ID !== "";

  // App Router navigations go through the History API without a reload, so the
  // counter never sees them. The very first view is already reported by
  // `init` — skip it, then send a hit on every real route change.
  const lastPath = useRef<string | null>(null);
  useEffect(() => {
    if (!enabled) return;
    if (lastPath.current === null || lastPath.current === pathname) {
      lastPath.current = pathname;
      return;
    }
    lastPath.current = pathname;
    window.ym?.(Number(METRIKA_ID), "hit", window.location.href, {
      referer: document.referrer,
    });
  }, [enabled, pathname]);

  function decide(value: Consent) {
    writeConsent(value);
    setConsent(value);
  }

  if (!METRIKA_ID) return null;

  return (
    <>
      {enabled && (
        <Script id="yandex-metrika" strategy="afterInteractive">
            {`(function(m,e,t,r,i,k,a){
    m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};
    m[i].l=1*new Date();
    for (var j = 0; j < document.scripts.length; j++) {if (document.scripts[j].src === r) { return; }}
    k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)
})(window, document,'script','https://mc.yandex.ru/metrika/tag.js?id=${METRIKA_ID}', 'ym');

ym(${METRIKA_ID}, 'init', {clickmap:true, trackLinks:true, accurateTrackBounce:true, webvisor:true, trackHash:true});`}
        </Script>
      )}

      {/* Fallback for visitors without JavaScript. It has to live outside the
          consent gate to end up in the server-rendered HTML at all — such a
          visitor can never be shown the prompt. See docs/metrika.md. */}
      <noscript>
        <div>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={`https://mc.yandex.ru/watch/${METRIKA_ID}`}
            style={{ position: "absolute", left: "-9999px" }}
            alt=""
          />
        </div>
      </noscript>

      {ready && consent === null && (
        <CookieBanner
          onAccept={() => decide("granted")}
          onDecline={() => decide("denied")}
        />
      )}
    </>
  );
}
