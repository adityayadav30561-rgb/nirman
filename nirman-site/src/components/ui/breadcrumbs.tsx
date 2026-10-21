import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { site } from "@/content/site";

export type Crumb = { label: string; href: string };

/**
 * Visible breadcrumb trail plus BreadcrumbList JSON-LD. Pass the full trail
 * including the current page last; the first item should be Home ("/").
 */
export function Breadcrumbs({ items, className = "" }: { items: Crumb[]; className?: string }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((c, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: c.label,
      item: new URL(c.href, site.url).toString(),
    })),
  };
  return (
    <nav aria-label="Breadcrumb" className={className}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <ol className="flex flex-wrap items-center gap-1.5 text-[0.875rem] text-ink-3">
        {items.map((c, i) => {
          const last = i === items.length - 1;
          return (
            <li key={c.href} className="flex items-center gap-1.5">
              {last ? (
                <span aria-current="page" className="text-ink">
                  {c.label}
                </span>
              ) : (
                <Link href={c.href} className="hover:text-ink">
                  {c.label}
                </Link>
              )}
              {!last && <ChevronRight className="size-3.5" aria-hidden />}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
