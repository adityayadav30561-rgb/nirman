import type { Metadata } from "next";
import Link from "next/link";
import { Contents } from "@/components/blog/reading";
import { heroGrid } from "@/components/services/service-hero";
import { ServiceMotion } from "@/components/services/service-motion";
import type { LegalDoc } from "@/content/legal";
import { site } from "@/content/site";

/*
 * Privacy policy and terms (docs/sections/p7b-legal.md): one template. Ink
 * header with the title and date; numbered sections in a readable column;
 * the contents list stays in view on the right (the article layout's aside).
 */

const date = (iso: string) => new Intl.DateTimeFormat("en-GB", { day: "numeric", month: "long", year: "numeric", timeZone: "UTC" }).format(new Date(iso));

export function legalMetadata(doc: LegalDoc): Metadata {
  const url = `/${doc.slug}/`;
  return { title: doc.title, description: doc.description, alternates: { canonical: url }, openGraph: { type: "article", siteName: site.name, locale: "en_IN", url, title: doc.title, description: doc.description } };
}

/** An email address inside a sentence becomes a link. */
function withLinks(text: string) {
  const parts = text.split(site.email);
  return parts.flatMap((part, i) => (i < parts.length - 1 ? [part, <a key={i} href={`mailto:${site.email}`} className="font-medium text-brand underline decoration-brand/40 underline-offset-[3px] hover:decoration-brand">{site.email}</a>] : [part]));
}

export function LegalPage({ doc, other }: { doc: LegalDoc; other: LegalDoc }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      { "@type": "WebPage", name: doc.title, description: doc.description, url: `${site.url}/${doc.slug}/`, dateModified: doc.updated, publisher: { "@id": `${site.url}/#organization` } },
      { "@type": "BreadcrumbList", itemListElement: [["Home", "/"], [doc.title, `/${doc.slug}/`]].map(([name, href], i) => ({ "@type": "ListItem", position: i + 1, name, item: `${site.url}${href}` })) },
    ],
  };
  return (
    <ServiceMotion>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }} />
      <section aria-labelledby="legal-title" className="relative overflow-hidden bg-band text-white">
        <div aria-hidden className={`absolute inset-0 ${heroGrid} [mask-image:radial-gradient(ellipse_at_30%_0%,black,transparent_70%)]`} />
        <div className="container-page relative py-14 lg:py-20">
          <p className="gs-hide text-[0.78rem] font-semibold tracking-[0.08em] text-[#ff9a62] uppercase">Legal</p>
          <h1 id="legal-title" className="gs-hide mt-4 text-[clamp(2.2rem,4.4vw,3.8rem)] leading-[1.06] font-semibold tracking-[-0.035em]">{doc.title}</h1>
          <p className="gs-hide mt-5 max-w-[44rem] text-[1.05rem] leading-relaxed text-white/75">{doc.intro}</p>
          <p className="gs-hide mt-6 text-[0.85rem] text-white/60">Last updated <time dateTime={doc.updated}>{date(doc.updated)}</time></p>
        </div>
      </section>

      <section aria-label={doc.title} className="py-14 lg:py-20">
        <div className="container-page grid gap-12 lg:grid-cols-[minmax(0,1fr)_19rem] lg:gap-16">
          <div className="max-w-[46rem]">
            {doc.sections.map((s, i) => (
              <section key={s.id} aria-labelledby={s.id} className={i ? "mt-12 border-t border-line pt-10" : ""}>
                <h2 id={s.id} className="flex scroll-mt-28 items-baseline gap-3 text-[clamp(1.35rem,2.2vw,1.7rem)] leading-tight font-semibold tracking-[-0.02em]">
                  <span aria-hidden className="text-[0.85rem] font-semibold text-brand tabular-nums">{String(i + 1).padStart(2, "0")}</span>
                  {s.title}
                </h2>
                {s.text.map((t, k) =>
                  typeof t === "string" ? (
                    <p key={k} className="mt-4 text-[1.02rem] leading-[1.8] text-ink/85">{withLinks(t)}</p>
                  ) : (
                    <ul key={k} className="mt-4 flex list-disc flex-col gap-2 pl-6 text-[1.02rem] leading-[1.7] text-ink/85 marker:text-brand">
                      {t.map((li) => <li key={li}>{li}</li>)}
                    </ul>
                  ),
                )}
              </section>
            ))}
          </div>

          <aside className="flex flex-col gap-7 lg:sticky lg:top-28 lg:self-start">
            <div className="hidden lg:block"><Contents items={doc.sections.map((s) => ({ id: s.id, title: s.title }))} label="On this page" /></div>
            <div className="rv rounded-[1.5rem] bg-white p-7 ring-1 ring-line">
              <p className="font-semibold">Also read</p>
              <Link href={`/${other.slug}/`} className="mt-3 inline-flex h-11 items-center rounded-full border border-ink-2/80 px-5 text-[0.88rem] font-medium transition-colors hover:border-brand hover:text-brand focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand">{other.title}</Link>
              <p className="mt-5 text-[0.9rem] leading-relaxed text-muted">A question about either page? Write to <a href={`mailto:${site.email}`} className="font-medium text-brand underline decoration-brand/40 underline-offset-[3px]">{site.email}</a>.</p>
            </div>
          </aside>
        </div>
      </section>
    </ServiceMotion>
  );
}
