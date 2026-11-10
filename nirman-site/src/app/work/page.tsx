import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { AccentTitle, heroGrid } from "@/components/services/service-hero";
import { ServiceMotion } from "@/components/services/service-motion";
import { AppCard, SeoCard, SiteCard } from "@/components/work/cards";
import { site } from "@/content/site";
import { apps, seoCases, sites, workIntro } from "@/content/work";

// /work/ (docs/sections/p5-work.md, variant B): ink hero with jump links,
// then a selection per kind of work, each with the card that suits it and a
// button to the full list (/work/websites/, /work/seo/, /work/apps/). Every
// card opens its project page; no links to client sites (user, 2026-11-10).

const title = "Our work: selected websites, SEO results and apps by Nirman";
const description = "Selected work by Nirman, shown as screenshots: websites we designed and built, SEO figures from Google Analytics and Search Console, and mobile apps.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/work/" },
  openGraph: { type: "website", siteName: site.name, locale: "en_IN", url: "/work/", title, description },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "CollectionPage",
      name: title,
      url: `${site.url}/work/`,
      about: { "@id": `${site.url}/#organization` },
      mainEntity: {
        "@type": "ItemList",
        itemListElement: [...sites.map((s) => ({ name: s.name, path: `/work/websites/${s.slug}/` })), ...seoCases.map((c) => ({ name: c.name, path: `/work/seo/${c.slug}/` })), ...apps.map((a) => ({ name: a.name, path: `/work/apps/${a.slug}/` }))].map((x, i) => ({ "@type": "ListItem", position: i + 1, name: x.name, url: `${site.url}${x.path}` })),
      },
    },
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: `${site.url}/` },
        { "@type": "ListItem", position: 2, name: "Our work", item: `${site.url}/work/` },
      ],
    },
  ],
};

const h2 = "rv text-[clamp(1.8rem,3.2vw,2.8rem)] leading-[1.12] font-semibold tracking-[-0.03em]";
const eyebrow = "rv text-[0.78rem] font-semibold tracking-[0.08em] text-brand uppercase";
const groups = [
  { id: "websites", label: "Websites" },
  { id: "seo", label: "SEO" },
  { id: "apps", label: "Apps" },
];

function Head({ id, kicker, title, line }: { id: string; kicker: string; title: string; line: string }) {
  return (
    <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
      <div className="max-w-[40rem]">
        <p className={eyebrow}>{kicker}</p>
        <h2 id={`${id}-title`} className={`${h2} mt-3`}>{title}</h2>
      </div>
      <p className="rv max-w-[26rem] text-[0.95rem] text-muted">{line}</p>
    </div>
  );
}

function More({ href, label }: { href: string; label: string }) {
  return (
    <div className="rv mt-10 flex justify-center">
      <Link href={href} className="group inline-flex h-12 items-center gap-2 rounded-full bg-ink-2 px-7 text-[0.9rem] font-medium text-white transition-colors hover:bg-brand focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand">
        {label}
        <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" aria-hidden />
      </Link>
    </div>
  );
}

export default function WorkPage() {
  return (
    <ServiceMotion>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }} />
      <section aria-labelledby="work-title" className="relative overflow-hidden bg-band text-white">
        <div aria-hidden className={`absolute inset-0 ${heroGrid} [mask-image:radial-gradient(ellipse_at_50%_0%,black,transparent_70%)]`} />
        <div aria-hidden className="absolute -top-64 left-1/2 size-[46rem] -translate-x-1/2 rounded-full bg-[radial-gradient(closest-side,rgba(242,107,43,0.2),transparent)]" />
        <div className="container-page relative flex flex-col items-center pt-14 pb-12 text-center lg:pt-20 lg:pb-14">
          <p className="gs-hide text-[0.78rem] font-semibold tracking-[0.08em] text-[#ff9a62] uppercase">Our work</p>
          <h1 id="work-title" className="gs-hide mt-4 max-w-[50rem] text-[clamp(2.3rem,4.6vw,4rem)] leading-[1.06] font-semibold tracking-[-0.035em]">
            <AccentTitle title={workIntro.title} accent={workIntro.accent} />
          </h1>
          <p className="gs-hide mt-6 max-w-[40rem] text-[1.05rem] text-white/75">{workIntro.line}</p>
          <ul className="gs-hide mt-8 flex flex-wrap justify-center gap-2">
            {groups.map((g) => (
              <li key={g.id}>
                <a href={`#${g.id}`} className="inline-flex h-11 items-center gap-2 rounded-full bg-white/8 px-5 text-[0.88rem] font-medium ring-1 ring-white/12 transition-colors hover:bg-white/14 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white">
                  {g.label}
                  <ArrowRight className="size-3.5 rotate-90 opacity-60" aria-hidden />
                </a>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section id="websites" aria-labelledby="websites-title" className="scroll-mt-24 py-20 lg:py-28">
        <div className="container-page">
          <Head id="websites" kicker="Websites" title="Sites we have designed and built" line="Each picture is the real homepage. Open a project to see more of the site, on desktop and on phones." />
          <div className="mt-12 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-2">
            {sites.slice(0, 3).map((s, i) => <SiteCard key={s.key} s={s} big={i === 0} />)}
          </div>
          <More href="/work/websites/" label="See all websites" />
        </div>
      </section>

      <section id="seo" aria-labelledby="seo-title" className="scroll-mt-24 bg-wash py-20 lg:py-28">
        <div className="container-page">
          <Head id="seo" kicker="SEO" title="Search results, in Google's own numbers" line="Every figure is read from the client's Google Analytics or Search Console, with its period. Open a project for the full screenshots." />
          <div className="mt-12 grid grid-cols-1 gap-4 lg:grid-cols-2">
            {seoCases.slice(0, 3).map((c, i) => <SeoCard key={c.key} c={c} big={i === 0} />)}
          </div>
          <More href="/work/seo/" label="See all SEO projects" />
        </div>
      </section>

      <section id="apps" aria-labelledby="apps-title" className="scroll-mt-24 py-20 lg:py-28">
        <div className="container-page">
          <Head id="apps" kicker="Apps" title="Apps for Android, iPhone and the web" line="The screens below are the apps themselves, running with demo data. Open a project to see every screen." />
          <div className="mt-12 flex flex-col gap-5">
            {apps.slice(0, 2).map((a) => <AppCard key={a.key} a={a} />)}
          </div>
          <More href="/work/apps/" label="See all apps" />
        </div>
      </section>

      <section aria-labelledby="work-cta" className="pb-20 lg:pb-28">
        <div className="container-page">
          <div className="rv relative flex flex-col items-start gap-8 overflow-hidden rounded-[2.25rem] bg-band p-8 text-white sm:p-12 md:flex-row md:items-center md:justify-between lg:p-16">
            <div aria-hidden className="absolute -right-32 -bottom-48 size-[34rem] rounded-full bg-[radial-gradient(closest-side,rgba(242,107,43,0.32),transparent)]" />
            <div className="relative">
              <h2 id="work-cta" className="text-[clamp(1.7rem,3vw,2.6rem)] leading-[1.12] font-semibold tracking-[-0.03em]">Want yours on this page?</h2>
              <p className="mt-3 max-w-[34rem] text-white/75">Tell us what you need. We reply within 2 working hours (IST) and send a written proposal within 48 hours of our call.</p>
            </div>
            <Link href="/get-a-quote/" className="relative inline-flex h-13 shrink-0 items-center rounded-full bg-white px-8 text-[0.95rem] font-medium text-ink transition-colors hover:bg-[#ffe3d1] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white">
              Get a quote
            </Link>
          </div>
        </div>
      </section>
    </ServiceMotion>
  );
}
