import Link from "next/link";
import { NAV } from "@/lib/nav";
import { getSettings, setting } from "@/lib/settings";
import { Logo } from "@/components/site/Logo";
import { GoalAnchor } from "@/components/site/GoalLink";
import type { Goal } from "@/lib/metrika";
import { LEGAL } from "@/lib/legal";

export async function Footer() {
  const s = await getSettings();
  const phone = setting(s, "site.phone");
  const email = setting(s, "site.email");
  const address = setting(s, "site.address");
  const tg = setting(s, "social.telegram");
  const vk = setting(s, "social.vk");
  const wa = setting(s, "social.whatsapp");
  const max = setting(s, "social.max");

  return (
    <footer className="mt-24 bg-textColorDark text-mainColor">
      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <div className="grid gap-12 md:grid-cols-[1.4fr_1fr_1fr]">
          {/* brand */}
          <div>
            <Logo variant="light" href={null} className="h-11 sm:h-12" />
            <p className="mt-5 max-w-sm text-sm leading-relaxed text-mainColor/70">
              Производим тканые, силиконовые и картонные бирки для одежды.
              Готовим макеты, печатаем и доставляем по всему миру.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <SocialLink href={tg} label="Telegram" goal="click_telegram" />
              {/* VK has no goal in the agreed list — plain link. */}
              <SocialLink href={vk} label="VK" />
              <SocialLink href={wa} label="WhatsApp" goal="click_whatsapp" />
              {max && <SocialLink href={max} label="MAX" goal="click_max" />}
            </div>
          </div>

          {/* nav */}
          <nav className="flex flex-col gap-3 text-sm">
            <div className="font-mono text-xs uppercase tracking-widest text-mainColor/40">
              Навигация
            </div>
            {NAV.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="w-fit text-mainColor/80 transition-colors hover:text-onbutton"
              >
                {item.label}
              </Link>
            ))}
            {/* Not part of NAV — the header must not show it. */}
            <Link
              href="/privacy"
              className="w-fit text-mainColor/80 transition-colors hover:text-onbutton"
            >
              Политика конфиденциальности
            </Link>
          </nav>

          {/* contacts */}
          <div className="flex flex-col gap-3 text-sm">
            <div className="font-mono text-xs uppercase tracking-widest text-mainColor/40">
              Контакты
            </div>
            <GoalAnchor
              href={`tel:${phone.replace(/[^+\d]/g, "")}`}
              goal="click_phone"
              className="font-semibold hover:text-onbutton"
            >
              {phone}
            </GoalAnchor>
            <GoalAnchor
              href={`mailto:${email}`}
              goal="click_email"
              className="text-mainColor/80 hover:text-onbutton"
            >
              {email}
            </GoalAnchor>
            <span className="text-mainColor/80">{address}</span>
          </div>
        </div>

        <div className="mt-12 space-y-4 border-t border-mainColor/15 pt-6 text-xs text-mainColor/50">
          <p className="leading-relaxed">
            {LEGAL.entity} · ИНН {LEGAL.inn} · ОГРНИП {LEGAL.ogrn} · {address}
          </p>
          <div className="flex flex-col items-start justify-between gap-2 sm:flex-row sm:items-center">
            <span>© {new Date().getFullYear()} birkityt.ru — бирки для твоего бренда</span>
            <span className="font-mono uppercase tracking-wider">сделано с любовью к деталям</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

function SocialLink({
  href,
  label,
  goal,
}: {
  href: string;
  label: string;
  goal?: Goal;
}) {
  const className =
    "rounded-full border border-mainColor/25 px-4 py-2 text-xs font-medium text-mainColor/80 transition-colors hover:border-onbutton hover:bg-onbutton hover:text-white";
  if (!goal) {
    return (
      <a href={href} target="_blank" rel="noopener" className={className}>
        {label}
      </a>
    );
  }
  return (
    <GoalAnchor href={href} goal={goal} external className={className}>
      {label}
    </GoalAnchor>
  );
}
