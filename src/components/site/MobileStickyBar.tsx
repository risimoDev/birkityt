"use client";

import Link from "next/link";
import { reachGoal } from "@/lib/metrika";

export function MobileStickyBar({
  phone,
  telegram,
  whatsapp,
}: {
  phone: string;
  telegram?: string;
  whatsapp?: string;
}) {
  return (
    <div className="fixed inset-x-0 bottom-0 z-50 border-t border-textColorDark/15 bg-textColorDark/95 p-3 backdrop-blur lg:hidden">
      <div className="mx-auto flex max-w-md items-center justify-between gap-2">
        <Link
          href="/calc"
          onClick={() => reachGoal("calc_open")}
          className="flex-1 rounded-full bg-onbutton px-4 py-2.5 text-center text-xs font-semibold text-white shadow"
        >
          Рассчитать заказ
        </Link>
        {telegram && (
          <a
            href={telegram}
            target="_blank"
            rel="noopener"
            onClick={() => reachGoal("click_telegram")}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-mainColor/25 text-mainColor hover:bg-mainColor/10"
            aria-label="Telegram"
          >
            ✈
          </a>
        )}
        {whatsapp && (
          <a
            href={whatsapp}
            target="_blank"
            rel="noopener"
            onClick={() => reachGoal("click_whatsapp")}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-mainColor/25 text-mainColor hover:bg-mainColor/10"
            aria-label="WhatsApp"
          >
            💬
          </a>
        )}
        <a
          href={`tel:${phone.replace(/[^+\d]/g, "")}`}
          onClick={() => reachGoal("click_phone")}
          className="flex h-10 w-10 items-center justify-center rounded-full bg-mainColor text-textColorDark shadow"
          aria-label="Позвонить"
        >
          📞
        </a>
      </div>
    </div>
  );
}
