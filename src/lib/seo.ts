import type { Metadata } from "next";
import { getSettings, setting } from "@/lib/settings";

/**
 * Per-page metadata helpers.
 *
 * `metadataBase` lives in the (site) layout, so every URL here can stay
 * relative — Next resolves it to an absolute one. Each page MUST call
 * `pageMetadata` with its own path: without it the page ends up with no
 * canonical at all, which is still better than inheriting someone else's.
 */

/** Fallback when the DB is unavailable; the real value is Setting["seo.canonical"]. */
export const SITE_URL = "https://birkityt.ru";

export const SITE_NAME = "БИРКИТУТ";

/**
 * Social preview card. 1200x630 is the size Yandex, VK and Telegram expect.
 * TODO: replace with a purpose-made cover — this one is cropped from a work photo.
 */
export const OG_IMAGE = {
  url: "/images/og-cover.jpg",
  width: 1200,
  height: 630,
  alt: "Тканевые бирки с логотипом бренда, изготовленные в БИРКИТУТ",
} as const;

export function pageMetadata({
  path,
  title,
  description,
}: {
  /** Absolute path of this page, e.g. "/price". */
  path: string;
  title: string;
  description: string;
}): Metadata {
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      title,
      description,
      url: path,
      siteName: SITE_NAME,
      type: "website",
      locale: "ru_RU",
      images: [OG_IMAGE],
    },
  };
}

/** Base URL for robots.txt / sitemap.xml, taken from the admin-editable setting. */
export async function getSiteUrl(): Promise<string> {
  const s = await getSettings();
  return setting(s, "seo.canonical", SITE_URL).replace(/\/+$/, "");
}
