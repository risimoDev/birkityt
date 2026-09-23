import type { Metadata, Viewport } from "next";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { Analytics } from "@/components/site/Analytics";
import { MobileStickyBar } from "@/components/site/MobileStickyBar";
import { getSettings, setting } from "@/lib/settings";
import { SITE_URL } from "@/lib/seo";
import { JsonLd } from "@/components/site/JsonLd";
import { organizationJsonLd } from "@/lib/jsonld";

export async function generateMetadata(): Promise<Metadata> {
  const s = await getSettings();
  const canonical = setting(s, "seo.canonical", SITE_URL);
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
  const organization = await organizationJsonLd();
  return (
    <>
      <JsonLd data={organization} />
      <Header
        phone={setting(s, "site.phone")}
        hours={setting(s, "site.hours")}
        telegram={setting(s, "social.telegram")}
        max={setting(s, "social.max")}
      />
      <main className="pb-14 lg:pb-0">{children}</main>
      <Footer />
      <MobileStickyBar
        phone={setting(s, "site.phone")}
        telegram={setting(s, "social.telegram")}
        whatsapp={setting(s, "social.whatsapp")}
      />
      <Analytics />
    </>
  );
}
