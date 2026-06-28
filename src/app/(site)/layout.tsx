import type { Metadata, Viewport } from "next";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { getSettings, setting } from "@/lib/settings";

export async function generateMetadata(): Promise<Metadata> {
  const s = await getSettings();
  const title = setting(s, "seo.title");
  const description = setting(s, "seo.description");
  const canonical = setting(s, "seo.canonical");
  return {
    title,
    description,
    keywords: setting(s, "seo.keywords"),
    metadataBase: new URL(canonical || "https://birkityt.ru"),
    alternates: { canonical: "/" },
    openGraph: {
      title,
      description,
      url: canonical,
      type: "website",
      locale: "ru_RU",
    },
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
      />
      <main>{children}</main>
      <Footer />
    </>
  );
}
