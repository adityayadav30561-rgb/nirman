import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { JsonLd } from "@/components/json-ld";
import { breadcrumbLd } from "@/lib/seo";

export type Crumb = { label: string; href: string };

/**
 * Visible breadcrumb trail plus BreadcrumbList JSON-LD. Pass the full trail
 * including the current page last; the first item should be Home ("/").
 */
export function Breadcrumbs({ items, className = "" }: { items: Crumb[]; className?: string }) {
  return (
    <nav aria-label="Breadcrumb" className={className}>
      <JsonLd data={breadcrumbLd(items)} />
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
