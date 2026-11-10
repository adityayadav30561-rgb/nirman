import type { Metadata } from "next";
import type { ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ChevronRight } from "lucide-react";
import { heroGrid } from "@/components/services/service-hero";
import { ServiceMotion } from "@/components/services/service-motion";
import { AppCard, SeoCard, SiteCard } from "@/components/work/cards";
import { AppMedia, BrowserShot, SeoMedia, SiteMedia, siteHome } from "@/components/work/shots";
import { site } from "@/content/site";
import { apps, categories, seoCases, sites, type WorkCategory } from "@/content/work";

/*
 * Project pages and category pages of /work/ (docs/sections/p5-work.md).
 * Project layout: variant A (ink hero, the main picture hanging over the
 * band, facts in a row, then every screenshot). One template, three kinds.
 * Routes are fixed folders (a [slug] route answers 200 for unknown slugs
 * under Cache Components): to add a project, add it to content/work.ts, put
 * its images in public/images/work/ and add a folder with a page.tsx like
 * the others (two lines).
 */

type Item = { slug: string; name: string };
const lists: Record<WorkCategory, Item[]> = { websites: sites, seo: seoCases, apps };
const one = { websites: "Website", seo: "SEO project", apps: "App" } as const;

function describe(cat: WorkCategory, slug: string) {
  if (cat === "websites") {
    const s = sites.find((x) => x.slug === slug)!;
    return { name: s.name, h1: `${s.name} website`, sub: [s.kind, s.place].filter(Boolean).join(" · "), facts: [["Client", s.name], ["Business", s.kind], ...(s.place ? [["Where", s.place]] : []), ["What we did", "Website design and development"]], desc: `Screenshots of the ${s.name} website (${s.kind.toLowerCase()}), designed and built by Nirman, on desktop and on phones.` };
  }
  if (cat === "seo") {
    const c = seoCases.find((x) => x.slug === slug)!;
    return { name: c.name, h1: `${c.name}: SEO results`, sub: `${c.headline.value} ${c.headline.label}. ${c.source}.`, facts: [["Client", c.name], ["What we did", "SEO"], ["Sources", "Google Analytics and Search Console"]], desc: `SEO results for ${c.name}: ${c.headline.value} ${c.headline.label}, with screenshots from Google Analytics and Search Console.` };
  }
  const a = apps.find((x) => x.slug === slug)!;
  return { name: a.name, h1: `${a.name} app`, sub: a.line, facts: [["App", a.name], ["Kind", a.kind], ["Built with", a.built.join(", ")], ["What we did", "App design and development"]], desc: `Screens of the ${a.name} app (${a.kind.toLowerCase()}), designed and built by Nirman.` };
}

export function projectMetadata(cat: WorkCategory, slug: string): Metadata {
  const d = describe(cat, slug);
  const url = `/work/${cat}/${slug}/`;
  return { title: d.h1, description: d.desc, alternates: { canonical: url }, openGraph: { type: "article", siteName: site.name, locale: "en_IN", url, title: d.h1, description: d.desc } };
}

const crumbs = (items: [string, string][]) => ({
  "@type": "BreadcrumbList",
  itemListElement: [["Home", "/"], ["Our work", "/work/"], ...items].map(([name, path], i) => ({ "@type": "ListItem", position: i + 1, name, item: `${site.url}${path}` })),
});
const Ld = ({ data }: { data: object }) => <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }} />;

function Crumbs({ items }: { items: [string, string | null][] }) {
  return (
    <nav aria-label="Breadcrumb" className="gs-hide">
      <ol className="flex flex-wrap items-center justify-center gap-1.5 text-[0.8rem] text-white/60">
        {items.map(([label, href], i) => (
          <li key={label} className="flex items-center gap-1.5" aria-current={href ? undefined : "page"}>
            {i > 0 && <ChevronRight className="size-3.5" aria-hidden />}
            {href ? <Link href={href} className="inline-flex min-h-11 items-center hover:text-white">{label}</Link> : <span className="text-white">{label}</span>}
          </li>
        ))}
      </ol>
    </nav>
  );
}

function Quote() {
  return (
    <section aria-labelledby="proj-cta" className="pb-20 lg:pb-28">
      <div className="container-page">
        <div className="rv relative flex flex-col items-start gap-8 overflow-hidden rounded-[2.25rem] bg-band p-8 text-white sm:p-12 md:flex-row md:items-center md:justify-between lg:p-16">
          <div aria-hidden className="absolute -right-32 -bottom-48 size-[34rem] rounded-full bg-[radial-gradient(closest-side,rgba(242,107,43,0.32),transparent)]" />
          <div className="relative">
            <h2 id="proj-cta" className="text-[clamp(1.7rem,3vw,2.6rem)] leading-[1.12] font-semibold tracking-[-0.03em]">Want something like this?</h2>
            <p className="mt-3 max-w-[34rem] text-white/75">Tell us what you need. We reply within 2 working hours (IST) and send a written proposal within 48 hours of our call.</p>
          </div>
          <Link href="/get-a-quote/" className="relative inline-flex h-13 shrink-0 items-center rounded-full bg-white px-8 text-[0.95rem] font-medium text-ink transition-colors hover:bg-[#ffe3d1] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white">
            Get a quote
          </Link>
        </div>
      </div>
    </section>
  );
}

export function ProjectPage({ cat, slug }: { cat: WorkCategory; slug: string }) {
  const d = describe(cat, slug);
  const list = lists[cat];
  const at = list.findIndex((x) => x.slug === slug);
  const next = list[(at + 1) % list.length];
  let lead: ReactNode;
  let media: ReactNode;
  if (cat === "websites") {
    const s = sites[at];
    lead = <BrowserShot src={siteHome(s)} name={s.name} alt={`${s.name}: homepage`} priority sizes="(min-width: 64rem) 62rem, 100vw" />;
    media = <SiteMedia s={s} />;
  } else if (cat === "seo") {
    const c = seoCases[at];
    lead = (
      <dl className="grid grid-cols-2 overflow-hidden rounded-[1.75rem] bg-white text-left text-ink shadow-[0_2rem_4rem_-2rem_rgba(18,20,24,0.45)] ring-1 ring-line lg:grid-cols-4">
        {[c.headline, ...c.stats].slice(0, 4).map((st, i) => (
          <div key={st.label} className={`p-6 sm:p-8 ${i % 2 ? "border-l border-line" : ""} ${i > 1 ? "border-t border-line lg:border-t-0" : ""} ${i === 2 ? "lg:border-l" : ""}`}>
            <dd className={`text-[clamp(2rem,3.4vw,3rem)] leading-none font-light tracking-[-0.04em] ${i === 0 ? "text-brand" : ""}`}>{st.value}</dd>
            <dt className="mt-2 text-[0.85rem] text-muted">{st.label}</dt>
          </div>
        ))}
      </dl>
    );
    media = <SeoMedia c={c} />;
  } else {
    const a = apps[at];
    lead = <Image src={`/images/work/app-${a.key}.webp`} alt={`${a.name}: main screens`} width={1680} height={960} sizes="(min-width: 64rem) 62rem, 100vw" priority className="w-full rounded-[1.75rem] shadow-[0_2rem_4rem_-2rem_rgba(18,20,24,0.6)]" />;
    media = <AppMedia a={a} />;
  }
  return (
    <ServiceMotion>
      <Ld data={{ "@context": "https://schema.org", "@graph": [{ "@type": "CreativeWork", name: d.h1, description: d.desc, url: `${site.url}/work/${cat}/${slug}/`, creator: { "@id": `${site.url}/#organization` } }, crumbs([[categories[cat].label, `/work/${cat}/`], [d.name, `/work/${cat}/${slug}/`]])] }} />
      <section aria-labelledby="proj-title" className="relative bg-band text-white">
        <div aria-hidden className={`absolute inset-0 ${heroGrid} [mask-image:radial-gradient(ellipse_at_50%_0%,black,transparent_70%)]`} />
        <div className="container-page relative flex flex-col items-center pt-8 text-center lg:pt-12">
          <Crumbs items={[["Our work", "/work/"], [categories[cat].label, `/work/${cat}/`], [d.name, null]]} />
          <p className="gs-hide mt-4 text-[0.78rem] font-semibold tracking-[0.08em] text-[#ff9a62] uppercase">{one[cat]}</p>
          <h1 id="proj-title" className="gs-hide mt-3 max-w-[52rem] text-[clamp(2.2rem,4.4vw,3.8rem)] leading-[1.06] font-semibold tracking-[-0.035em]">{d.h1}</h1>
          <p className="gs-hide mt-5 max-w-[42rem] text-[1.02rem] text-white/75">{d.sub}</p>
          <div className="gs-hide mt-10 -mb-24 w-full max-w-[64rem] lg:-mb-36">{lead}</div>
        </div>
      </section>
      <section aria-label="Project details" className="pt-36 pb-20 lg:pt-52 lg:pb-28">
        <div className="container-page">
          <dl className="rv mx-auto grid max-w-[64rem] grid-cols-2 gap-x-8 gap-y-6 md:grid-cols-4">
            {d.facts.map(([a, b]) => (
              <div key={a} className="border-t-2 border-ink/15 pt-4">
                <dt className="text-[0.75rem] font-semibold tracking-[0.08em] text-muted uppercase">{a}</dt>
                <dd className="mt-1.5 font-medium">{b}</dd>
              </div>
            ))}
          </dl>
          <div className="mt-14">{media}</div>
          <div className="rv mt-14 flex flex-col gap-3 border-t border-line pt-8 sm:flex-row sm:items-center sm:justify-between">
            <Link href={`/work/${cat}/`} className="inline-flex h-12 items-center self-start rounded-full border border-ink-2/80 bg-white/70 px-6 text-[0.9rem] font-medium transition-colors hover:border-brand hover:text-brand focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand">All {categories[cat].label === "SEO" ? "SEO projects" : categories[cat].label.toLowerCase()}</Link>
            {next.slug !== slug && (
              <Link href={`/work/${cat}/${next.slug}/`} className="group inline-flex h-12 items-center gap-2 self-start rounded-full bg-ink-2 px-6 text-[0.9rem] font-medium text-white transition-colors hover:bg-brand focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand">
                Next: {next.name}
                <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" aria-hidden />
              </Link>
            )}
          </div>
        </div>
      </section>
      <Quote />
    </ServiceMotion>
  );
}

export function categoryMetadata(cat: WorkCategory): Metadata {
  const c = categories[cat];
  const url = `/work/${cat}/`;
  return { title: c.title, description: c.line, alternates: { canonical: url }, openGraph: { type: "website", siteName: site.name, locale: "en_IN", url, title: c.title, description: c.line } };
}

export function CategoryPage({ cat }: { cat: WorkCategory }) {
  const c = categories[cat];
  return (
    <ServiceMotion>
      <Ld data={{ "@context": "https://schema.org", "@graph": [{ "@type": "CollectionPage", name: c.title, url: `${site.url}/work/${cat}/`, mainEntity: { "@type": "ItemList", itemListElement: lists[cat].map((x, i) => ({ "@type": "ListItem", position: i + 1, name: x.name, url: `${site.url}/work/${cat}/${x.slug}/` })) } }, crumbs([[c.label, `/work/${cat}/`]])] }} />
      <section aria-labelledby="cat-title" className="relative overflow-hidden bg-band text-white">
        <div aria-hidden className={`absolute inset-0 ${heroGrid} [mask-image:radial-gradient(ellipse_at_50%_0%,black,transparent_70%)]`} />
        <div className="container-page relative flex flex-col items-center pt-8 pb-12 text-center lg:pt-12 lg:pb-16">
          <Crumbs items={[["Our work", "/work/"], [c.label, null]]} />
          <h1 id="cat-title" className="gs-hide mt-4 max-w-[50rem] text-[clamp(2.2rem,4.4vw,3.8rem)] leading-[1.06] font-semibold tracking-[-0.035em]">{c.title}</h1>
          <p className="gs-hide mt-5 max-w-[40rem] text-[1.05rem] text-white/75">{c.line}</p>
          <ul className="gs-hide mt-8 flex flex-wrap justify-center gap-2">
            {(Object.keys(categories) as WorkCategory[]).map((k) => (
              <li key={k}>
                <Link href={`/work/${k}/`} aria-current={k === cat ? "page" : undefined} className={`inline-flex h-11 items-center rounded-full px-5 text-[0.88rem] font-medium transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white ${k === cat ? "bg-white text-ink" : "bg-white/8 ring-1 ring-white/12 hover:bg-white/14"}`}>
                  {categories[k].label} <span className={`ml-2 text-[0.8rem] ${k === cat ? "text-muted" : "text-white/55"}`}>{lists[k].length}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>
      <section aria-label={c.label} className="py-16 lg:py-24">
        <div className={`container-page ${cat === "apps" ? "flex flex-col gap-5" : "grid grid-cols-1 gap-4 lg:grid-cols-2"}`}>
          {cat === "websites" && sites.map((s, i) => <SiteCard key={s.key} s={s} big={i === 0} />)}
          {cat === "seo" && seoCases.map((x, i) => <SeoCard key={x.key} c={x} big={i === 0} />)}
          {cat === "apps" && apps.map((a) => <AppCard key={a.key} a={a} />)}
        </div>
      </section>
      <Quote />
    </ServiceMotion>
  );
}
