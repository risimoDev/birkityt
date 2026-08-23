import { getSettings, setting } from "@/lib/settings";
import { getSiteUrl, SITE_NAME, OG_IMAGE } from "@/lib/seo";
import { ADDRESS, FOUNDING_YEAR, GEO, LEGAL, OPENING_HOURS } from "@/lib/legal";
import { pick, type ContentMap } from "@/lib/content";
import type { PriceGroupDTO } from "@/lib/prices";

/**
 * Schema.org builders. Every value here comes from the same source the page
 * renders from — settings, content keys or the price tables — so the markup
 * cannot drift away from what visitors actually see.
 */

type Json = Record<string, unknown>;

/** Social profiles, in the order Yandex likes to see them. */
async function sameAs(): Promise<string[]> {
  const s = await getSettings();
  return [
    setting(s, "social.vk"),
    setting(s, "social.telegram"),
    setting(s, "social.max"),
  ].filter(Boolean);
}

export async function organizationJsonLd(): Promise<Json> {
  const s = await getSettings();
  const base = await getSiteUrl();
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${base}/#organization`,
    name: SITE_NAME,
    legalName: LEGAL.entity,
    url: base,
    logo: `${base}/images/logo.svg`,
    image: `${base}${OG_IMAGE.url}`,
    telephone: setting(s, "site.phone"),
    email: setting(s, "site.email"),
    foundingDate: String(FOUNDING_YEAR),
    taxID: LEGAL.inn,
    vatID: LEGAL.inn,
    sameAs: await sameAs(),
  };
}

export async function localBusinessJsonLd(): Promise<Json> {
  const s = await getSettings();
  const base = await getSiteUrl();
  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": `${base}/#localbusiness`,
    name: SITE_NAME,
    description: setting(s, "seo.description"),
    url: base,
    image: `${base}${OG_IMAGE.url}`,
    telephone: setting(s, "site.phone"),
    email: setting(s, "site.email"),
    foundingDate: String(FOUNDING_YEAR),
    parentOrganization: { "@id": `${base}/#organization` },
    address: {
      "@type": "PostalAddress",
      streetAddress: ADDRESS.street,
      addressLocality: ADDRESS.locality,
      addressRegion: ADDRESS.region,
      addressCountry: ADDRESS.country,
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: GEO.lat,
      longitude: GEO.lng,
    },
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: [...OPENING_HOURS.days],
        opens: OPENING_HOURS.opens,
        closes: OPENING_HOURS.closes,
      },
    ],
    // Schema.org wants a coarse indicator here, not a min-max of the catalogue.
    // A computed range would also be wrong: the price table mixes per-piece
    // tags with per-set items (the children's name-tag kit is 510 ₽ a set),
    // so "3–510 ₽" would read as the price of a single tag.
    priceRange: "₽₽",
    sameAs: await sameAs(),
  };
}

/** Strips the markup admins may have typed into an answer. */
function plain(html: string): string {
  return html
    .replace(/<br\s*\/?>/gi, " ")
    .replace(/<[^>]+>/g, "")
    .replace(/\s+/g, " ")
    .trim();
}

/**
 * Built from the same `faq.qN` / `faq.aN` content keys the FAQ block renders,
 * so the markup always matches the visible questions.
 */
export async function faqJsonLd(content: ContentMap): Promise<Json | null> {
  const base = await getSiteUrl();
  const items: Json[] = [];
  for (let i = 1; i <= 6; i++) {
    const q = pick(content, `faq.q${i}`);
    const a = pick(content, `faq.a${i}`);
    if (!q || !a) continue;
    items.push({
      "@type": "Question",
      name: q,
      acceptedAnswer: { "@type": "Answer", text: plain(a) },
    });
  }
  if (items.length === 0) return null;
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "@id": `${base}/#faq`,
    mainEntity: items,
  };
}

export type Crumb = { label: string; href: string };

export function breadcrumbJsonLd(items: Crumb[], base: string): Json {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((c, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: c.label,
      item: `${base}${c.href === "/" ? "" : c.href}`,
    })),
  };
}

/**
 * One Product per price group, priced with an AggregateOffer — a group covers
 * several widths and tiers, so a single `price` would be a lie.
 */
export async function priceListJsonLd(
  groups: PriceGroupDTO[],
): Promise<Json | null> {
  const base = await getSiteUrl();
  const products = groups
    .map((g) => {
      const prices = g.items.flatMap((i) =>
        i.tiers.map((t) => t.pricePerUnit),
      );
      if (prices.length === 0) return null;
      return {
        "@type": "Product",
        name: g.name,
        description: g.note ?? undefined,
        category: "Бирки и этикетки для одежды",
        brand: { "@type": "Brand", name: SITE_NAME },
        offers: {
          "@type": "AggregateOffer",
          priceCurrency: "RUB",
          lowPrice: Math.min(...prices),
          highPrice: Math.max(...prices),
          offerCount: prices.length,
          availability: "https://schema.org/InStock",
          url: `${base}/price`,
          seller: { "@id": `${base}/#organization` },
        },
      };
    })
    .filter((p): p is NonNullable<typeof p> => p !== null);

  if (products.length === 0) return null;
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Прайс-лист на бирки для одежды",
    itemListElement: products.map((p, i) => ({
      "@type": "ListItem",
      position: i + 1,
      item: p,
    })),
  };
}
