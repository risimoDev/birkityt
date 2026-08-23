import Link from "next/link";
import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import { PageHeader } from "@/components/site/PageHeader";
import { getContent, pick } from "@/lib/content";
import { getMaterials } from "@/lib/materials";

export const dynamic = "force-dynamic";

export const metadata: Metadata = pageMetadata({
  path: "/materials",
  title: "Материалы для бирок: силикон, сатин, картон | БИРКИТУТ",
  description:
    "Из чего делаем бирки для одежды: силикон, премиум сатин с тканым краем, киперная лента, хлопковая текстура и картон. Поможем подобрать материал под изделие.",
});

export default async function MaterialsPage() {
  const [content, materials] = await Promise.all([getContent(), getMaterials()]);

  const items = materials
    .filter((m) => m.title)
    .map((m, i) => ({
      n: String(i + 1).padStart(2, "0"),
      title: m.title,
      text: m.text,
    }));

  return (
    <>
      <PageHeader
        eyebrow="материалы"
        title={pick(content, "materials.title", "Материалы")}
        description={pick(
          content,
          "materials.description",
          "Выбирайте основу под задачу: от мягкого силикона до плотного картона. Поможем подобрать материал под вашу одежду.",
        )}
      />

      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <div className="grid gap-6 md:grid-cols-2">
          {items.map((it) => (
            <article
              key={it.n}
              className="group relative overflow-hidden rounded-3xl border border-textColorDark/10 bg-white/70 p-7 transition-colors hover:bg-white"
            >
              <span className="absolute left-6 top-6 h-3 w-3 rounded-full border-2 border-textColorDark/20 bg-mainColor" />
              <div className="flex items-start justify-between gap-4 pl-7">
                <h2 className="text-2xl font-bold text-textColorDark">{it.title}</h2>
                <span className="font-mono text-4xl font-bold text-onbutton/30 transition-colors group-hover:text-onbutton">
                  {it.n}
                </span>
              </div>
              <p className="mt-4 pl-7 leading-relaxed text-textColor">{it.text}</p>
            </article>
          ))}
        </div>

        <div className="mt-12 rounded-3xl border border-dashed border-textColorDark/20 bg-onbutton/10 p-8 text-center">
          <p className="text-lg text-textColorDark">
            Не уверены, какой материал подойдёт?
          </p>
          <Link
            href="/#contact"
            className="mt-4 inline-block rounded-full bg-textColorDark px-6 py-3 text-sm font-semibold text-mainColor transition-colors hover:bg-onbutton hover:text-white"
          >
            Спросить менеджера
          </Link>
        </div>
      </section>
    </>
  );
}
