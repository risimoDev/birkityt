import type { MetadataRoute } from "next";
import { getSiteUrl } from "@/lib/seo";

// Host comes from the admin-editable canonical setting.
export const dynamic = "force-dynamic";

export default async function robots(): Promise<MetadataRoute.Robots> {
  const base = await getSiteUrl();
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: [
          "/admin",
          "/api/",
          "/success",
          // Category tabs on /works are the same set of items in a different
          // order — keep the crawler on the canonical listing.
          "/works?",
        ],
      },
    ],
    host: base,
    sitemap: `${base}/sitemap.xml`,
  };
}
