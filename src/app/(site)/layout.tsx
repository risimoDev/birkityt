import type { Metadata, Viewport } from "next";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { Analytics } from "@/components/site/Analytics";
import { getSettings, setting } from "@/lib/settings";
import { SITE_URL } from "@/lib/seo";

export async function generateMetadata(): Promise<Metadata> {
  const s = await getSettings();
  const canonical = setting(s, "seo.canonical", SITE_URL);
  // Only site-wide defaults live here. `alternates` and `openGraph` are
  // deliberately absent: anything set at this level is inherited by every
  // page that does not override it, which is exactly how all five pages ended
  // up pointing their canonical at the homepage. Each page now declares its
  // own via pageMetadata().
  return {
    title: setting(s, "seo.title"),
    description: setting(s, "seo.description"),
    metadataBase: new URL(canonical),
  };
}

export const viewport: Viewport = {
  themeColor: "#A1B5D8",
};

export default async function SiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const s = await getSettings();
  return (
    <>
      <Header
        phone={setting(s, "site.phone")}
        hours={setting(s, "site.hours")}
        telegram={setting(s, "social.telegram")}
        max={setting(s, "social.max")}
      />
      <main>{children}</main>
      <Footer />
      <Analytics />
    </>
  );
}
