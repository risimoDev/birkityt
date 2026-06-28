import Link from "next/link";
import type { Metadata } from "next";
import { PageHeader } from "@/components/site/PageHeader";
import { Gallery } from "@/components/works/Gallery";
import { getWorks } from "@/lib/works";
import { getWorkCategories } from "@/lib/categories";
import { getContent, pick } from "@/lib/content";
import { cn } from "@/lib/cn";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Наши работы — примеры бирок | БИРКИТУТ",
  description:
    "Портфолио выполненных проектов: тканые, силиконовые и картонные бирки для брендов одежды.",
};

export default async function WorksPage({
  searchParams,
}: {
  searchParams: Promise<{ cat?: string }>;
}) {
  const { cat } = await searchParams;
  const [categories, content] = await Promise.all([getWorkCategories(), getContent()]);
  const activeSlug = cat && categories.some((c) => c.slug === cat) ? cat : undefined;
  const works = await getWorks(activeSlug ? { categorySlug: activeSlug } : undefined);

  return (
    <>
      <PageHeader
        eyebrow="портфолио"
        title={pick(content, "works.title", "Наши работы")}
        description={pick(
          content,
          "works.description",
          "Подборка выполненных проектов и примеров материалов. Нажмите на работу, чтобы рассмотреть детальнее.",
        )}
      />

      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        {categories.length > 0 && (
          <div className="mb-8 flex flex-wrap gap-2">
            <Tab href="/works" active={!activeSlug}>
              Все
            </Tab>
            {categories.map((c) => (
              <Tab key={c.id} href={`/works?cat=${c.slug}`} active={activeSlug === c.slug}>
                {c.name}
              </Tab>
            ))}
          </div>
        )}

        <Gallery works={works} />
      </section>
    </>
  );
}

function Tab({
  href,
  active,
  children,
}: {
  href: string;
  active: boolean;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      className={cn(
        "rounded-full border px-4 py-1.5 text-sm font-medium transition-colors",
        active
          ? "border-textColorDark bg-textColorDark text-mainColor"
          : "border-textColorDark/15 bg-white text-textColorDark hover:border-textColorDark/40",
      )}
    >
      {children}
    </Link>
  );
}
