import Link from "next/link";
import { JsonLd } from "@/components/site/JsonLd";
import { breadcrumbJsonLd, type Crumb } from "@/lib/jsonld";
import { getSiteUrl } from "@/lib/seo";

/**
 * Visual breadcrumbs plus the matching BreadcrumbList markup — the two are
 * built from one list so they can never disagree.
 *
 * `items` starts at the homepage; the last entry is the current page and is
 * rendered as plain text rather than a link.
 */
export async function Breadcrumbs({ items }: { items: Crumb[] }) {
  const base = await getSiteUrl();

  return (
    <>
      <nav aria-label="Хлебные крошки">
        <ol className="flex flex-wrap items-center gap-x-2 gap-y-1 font-mono text-[11px] uppercase tracking-widest text-textColor/60">
          {items.map((c, i) => {
            const last = i === items.length - 1;
            return (
              <li key={c.href} className="flex items-center gap-2">
                {last ? (
                  <span aria-current="page" className="text-textColorDark/70">
                    {c.label}
                  </span>
                ) : (
                  <Link href={c.href} className="transition-colors hover:text-onbutton">
                    {c.label}
                  </Link>
                )}
                {!last && <span aria-hidden>/</span>}
              </li>
            );
          })}
        </ol>
      </nav>
      <JsonLd data={breadcrumbJsonLd(items, base)} />
    </>
  );
}
