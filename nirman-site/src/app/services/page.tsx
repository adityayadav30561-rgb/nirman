import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";
import { ServiceIcon } from "@/components/home/service-icons";
import { serviceArt } from "@/components/services/service-art";
import { AccentTitle, heroGrid } from "@/components/services/service-hero";
import { ServiceMotion } from "@/components/services/service-motion";
import { ServiceQuestions, ServiceSteps } from "@/components/services/service-page";
import { facts } from "@/content/facts";
import { faqs } from "@/content/faq";
import { servicePages, serviceSlugs, servicesHub } from "@/content/service-pages";
import { site } from "@/content/site";

// /services/ (PAGE-PLAN section 3; docs/sections/p1-services.md): hero, four
// equal rows (what it is, who it is for, three included items, a button to the
// page, a picture), how we work in five steps, questions, Get a quote.

const title = "Services: websites, SEO, custom software and marketing automation";
const description = servicesHub.line;

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/services/" },
  openGraph: { type: "website", siteName: site.name, locale: "en_IN", url: "/services/", title, description },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: `${site.url}/` },
    { "@type": "ListItem", position: 2, name: "Services", item: `${site.url}/services/` },
  ],
};

// Panel look per service, so the four rows do not read as one repeated card.
const looks = [
  { panel: "bg-white ring-1 ring-line", dark: false },
  { panel: "bg-band text-white", dark: true },
  { panel: "bg-wash", dark: false },
  { panel: "bg-white ring-1 ring-line", dark: false },
];

export default function ServicesHubPage() {
  return (
    <ServiceMotion>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }} />
      <section aria-labelledby="hub-title" className="relative overflow-hidden bg-band text-white">
        <div aria-hidden className={`absolute inset-0 ${heroGrid} [mask-image:radial-gradient(ellipse_at_50%_0%,black,transparent_70%)]`} />
        <div aria-hidden className="absolute -top-64 left-1/2 size-[46rem] -translate-x-1/2 rounded-full bg-[radial-gradient(closest-side,rgba(242,107,43,0.22),transparent)]" />
        <div className="container-page relative flex flex-col items-center pt-16 pb-14 text-center lg:pt-24 lg:pb-16">
          <p className="gs-hide text-[0.78rem] font-semibold tracking-[0.08em] text-[#ff9a62] uppercase">Services</p>
          <h1 id="hub-title" className="gs-hide mt-4 max-w-[52rem] text-[clamp(2.3rem,4.8vw,4.2rem)] leading-[1.05] font-semibold tracking-[-0.035em]">
            <AccentTitle title={servicesHub.title} accent={servicesHub.accent} />
          </h1>
          <p className="gs-hide mt-6 max-w-[40rem] text-[1.05rem] text-white/75">{servicesHub.line}</p>
          <Link href="/get-a-quote/" className="gs-hide mt-8 inline-flex h-13 items-center rounded-full bg-white px-8 text-[0.95rem] font-medium text-ink transition-colors hover:bg-[#ffe3d1] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white">
            Get a quote
          </Link>
          <ul className="gs-hide mt-12 grid w-full max-w-[60rem] grid-cols-2 gap-3 lg:grid-cols-4">
            {serviceSlugs.map((slug) => (
              <li key={slug}>
                <a href={`#${slug}`} className="group flex h-full items-center gap-3 rounded-[1.25rem] bg-white/6 p-3 pr-4 text-left ring-1 ring-white/12 transition-colors hover:bg-white/12 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white">
                  <ServiceIcon name={slug} uid={`hubnav-${slug}`} className="size-11 shrink-0" />
                  <span className="text-[0.92rem] leading-tight font-medium">{servicePages[slug].name}</span>
                </a>
              </li>
            ))}
          </ul>
        </div>
        <dl className="gs-hide relative border-t border-white/10">
          <div className="container-page grid grid-cols-2 lg:grid-cols-4">
            {facts.map((f, i) => (
              <div key={f.label} className={`py-6 lg:px-8 lg:first:pl-0 ${i % 2 ? "pl-6" : ""} ${i > 0 ? "lg:border-l lg:border-white/10" : ""}`}>
                <dd className="text-[2rem] leading-none font-light tracking-[-0.02em]">{f.value}<span className="ml-0.5 text-[1rem] text-[#ff9a62]">{f.unit}</span></dd>
                <dt className="mt-2 text-[0.82rem] text-white/65">{f.label}</dt>
              </div>
            ))}
          </div>
        </dl>
      </section>

      <section aria-label="Our four services" className="py-16 lg:py-24">
        <div className="container-page flex flex-col gap-5">
          {serviceSlugs.map((slug, i) => {
            const s = servicePages[slug];
            const { Scene } = serviceArt[slug];
            const { panel, dark } = looks[i];
            return (
              <article key={slug} id={slug} aria-labelledby={`hub-${slug}`} className={`rv relative grid scroll-mt-24 grid-cols-1 items-center gap-10 overflow-hidden rounded-[2.25rem] p-6 sm:p-10 lg:grid-cols-[minmax(0,5fr)_minmax(0,6fr)] lg:gap-14 lg:p-14 ${panel}`}>
                {dark && <div aria-hidden className={`absolute inset-0 ${heroGrid} [mask-image:radial-gradient(ellipse_at_25%_50%,black,transparent_70%)]`} />}
                <div className={`relative ${i % 2 ? "lg:order-2" : ""}`}>
                  <p className="flex items-center gap-3">
                    <ServiceIcon name={slug} uid={`hub-${slug}`} className="size-12" />
                    <span className={`text-[0.78rem] font-semibold tracking-[0.08em] uppercase ${dark ? "text-[#ff9a62]" : "text-brand"}`}>0{i + 1} · {s.name}</span>
                  </p>
                  <h2 id={`hub-${slug}`} className="mt-5 text-[clamp(1.6rem,2.7vw,2.3rem)] leading-[1.15] font-semibold tracking-[-0.025em]">{s.title}</h2>
                  <p className={`mt-4 max-w-[32rem] ${dark ? "text-white/75" : "text-muted"}`}>{s.line}</p>
                  <ul className="mt-6 flex flex-wrap gap-2">
                    {s.included.map((x) => (
                      <li key={x.title} className={`flex items-center gap-1.5 rounded-full px-3.5 py-1.5 text-[0.82rem] ${dark ? "bg-white/8 ring-1 ring-white/12" : i === 2 ? "bg-white ring-1 ring-black/5" : "bg-page ring-1 ring-line"}`}>
                        <Check className={`size-3.5 shrink-0 ${dark ? "text-[#ff9a62]" : "text-brand"}`} strokeWidth={3} aria-hidden />
                        {x.title}
                      </li>
                    ))}
                  </ul>
                  <Link href={`/services/${slug}/`} className={`mt-8 inline-flex h-12 items-center gap-2 rounded-full px-6 text-[0.9rem] font-medium transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand ${dark ? "bg-white text-ink hover:bg-[#ffe3d1]" : "bg-ink-2 text-white hover:bg-brand"}`}>
                    Explore {s.name === "SEO" ? "SEO" : s.name.toLowerCase()}
                    <ArrowRight className="size-4" aria-hidden />
                  </Link>
                </div>
                <Scene className="sv-stage sv-anim relative" />
              </article>
            );
          })}
        </div>
      </section>

      <ServiceSteps steps={servicesHub.steps} title="One way of working, whatever we build" line="The same five steps for a website, an SEO plan, a custom system or a campaign." />
      <ServiceQuestions faqs={faqs} title="Questions before you start" />
      <section aria-labelledby="hub-cta" className="pb-20 lg:pb-28">
        <div className="container-page">
          <div className="rv relative flex flex-col items-start gap-8 overflow-hidden rounded-[2.25rem] bg-band p-8 text-white sm:p-12 md:flex-row md:items-center md:justify-between lg:p-16">
            <div aria-hidden className="absolute -right-32 -bottom-48 size-[34rem] rounded-full bg-[radial-gradient(closest-side,rgba(242,107,43,0.32),transparent)]" />
            <div className="relative">
              <h2 id="hub-cta" className="text-[clamp(1.7rem,3vw,2.6rem)] leading-[1.12] font-semibold tracking-[-0.03em]">Not sure which service you need?</h2>
              <p className="mt-3 max-w-[34rem] text-white/75">Tell us what you want to achieve. We will suggest the right mix and send a written proposal within 48 hours of our call.</p>
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
