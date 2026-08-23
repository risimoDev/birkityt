import type { MetadataRoute } from "next";
import { getSiteUrl } from "@/lib/seo";

export const dynamic = "force-dynamic";

/**
 * Public routes. `changeFrequency`/`priority` are hints only — Yandex and
 * Google both mostly ignore them, so they stay coarse on purpose.
 */
const ROUTES: { path: string; priority: number; changeFrequency: "daily" | "weekly" | "monthly" | "yearly" }[] = [
  { path: "/", priority: 1.0, changeFrequency: "weekly" },
  { path: "/price", priority: 0.9, changeFrequency: "weekly" },
  { path: "/calc", priority: 0.9, changeFrequency: "monthly" },
  { path: "/materials", priority: 0.8, changeFrequency: "monthly" },
  { path: "/works", priority: 0.8, changeFrequency: "weekly" },
  { path: "/privacy", priority: 0.2, changeFrequency: "yearly" },
];

/**
 * Evaluated once when the server process starts, i.e. at deploy time.
 * Reporting `new Date()` per request would tell crawlers the whole site
 * changed on every crawl, which they learn to ignore.
 */
const DEPLOYED_AT = new Date();

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = await getSiteUrl();
  const lastModified = DEPLOYED_AT;

  return ROUTES.map((r) => ({
    url: `${base}${r.path === "/" ? "" : r.path}`,
    lastModified,
    changeFrequency: r.changeFrequency,
    priority: r.priority,
  }));
}
