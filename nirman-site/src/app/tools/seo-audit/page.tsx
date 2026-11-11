import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Bot, FileSearch, Gauge, Network, Share2, Smartphone } from "lucide-react";
import { AuditTool } from "@/components/audit/audit-tool";
import { heroGrid } from "@/components/services/service-hero";
import { ServiceMotion } from "@/components/services/service-motion";
import { auditPage } from "@/content/audit-page";
import { site } from "@/content/site";
import { CATS } from "@/lib/audit/types";

/*
 * /tools/seo-audit/ (docs/sections/p6-seo-audit.md): the free SEO audit.
 * The tool lives in the ink hero (components/audit/audit-tool.tsx) and owns
 * the page's h1 in each of its phases. Below it: what is checked, how it
 * works, questions (FAQPage JSON-LD) and Get a quote.
 */
const url = "/tools/seo-audit/";
export const metadata: Metadata = {
  title: auditPage.title,
  description: auditPage.description,
  alternates: { canonical: url },
  openGraph: { type: "website", siteName: site.name, locale: "en_IN", url, title: `${auditPage.title} for your website`, description: auditPage.description },
};

const icons = { index: Network, content: FileSearch, speed: Gauge, mobile: Smartphone, rich: Share2, ai: Bot } as const;
const h2 = "text-[clamp(1.7rem,3vw,2.5rem)] leading-[1.12] font-semibold tracking-[-0.03em]";
const eyebrow = "text-[0.78rem] font-semibold tracking-[0.08em] text-brand uppercase";

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    { "@type": "WebApplication", name: `${site.name} free SEO audit`, url: `${site.url}${url}`, applicationCategory: "BusinessApplication", operatingSystem: "Any", description: auditPage.description, isAccessibleForFree: true, provider: { "@id": `${site.url}/#organization` } },
    { "@type": "BreadcrumbList", itemListElement: [["Home", "/"], [auditPage.title, url]].map(([name, href], i) => ({ "@type": "ListItem", position: i + 1, name, item: `${site.url}${href}` })) },
    { "@type": "FAQPage", mainEntity: auditPage.faqs.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })) },
  ],
};

export default function SeoAuditPage() {
  return (
    <ServiceMotion>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }} />
      <section aria-labelledby="audit-title" className="relative overflow-hidden bg-band text-white">
        <div aria-hidden className={`absolute inset-0 ${heroGrid} [mask-image:radial-gradient(ellipse_at_50%_0%,black,transparent_70%)]`} />
        <div aria-hidden className="absolute -top-64 left-1/2 size-[46rem] -translate-x-1/2 rounded-full bg-[radial-gradient(closest-side,rgba(242,107,43,0.2),transparent)]" />
        <div className="container-page relative flex min-h-[34rem] flex-col justify-center py-16 lg:min-h-[38rem] lg:py-20">
          <AuditTool />
        </div>
      </section>

      <section aria-labelledby="audit-checks" className="py-20 lg:py-28">
        <div className="container-page">
          <div className="max-w-[40rem]">
            <p className={`rv ${eyebrow}`}>What it checks</p>
            <h2 id="audit-checks" className={`rv ${h2} mt-3`}>{auditPage.checksTitle}</h2>
            <p className="rv mt-4 text-muted">{auditPage.checksLine}</p>
          </div>
          <ul className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {CATS.map((c) => {
              const Icon = icons[c.key];
              return (
                <li key={c.key} className="rv rounded-[1.5rem] bg-white p-7 ring-1 ring-line">
                  <span className="grid size-12 place-items-center rounded-2xl bg-[#fdeee4] text-brand"><Icon className="size-6" aria-hidden /></span>
                  <h3 className="mt-5 text-[1.15rem] font-semibold tracking-[-0.015em]">{c.label}</h3>
                  <p className="mt-2 text-[0.95rem] leading-relaxed text-muted">{c.line}</p>
                </li>
              );
            })}
          </ul>
        </div>
      </section>

      <section aria-labelledby="audit-steps" className="bg-wash py-20 lg:py-28">
        <div className="container-page">
          <p className={`rv ${eyebrow}`}>From address to report</p>
          <h2 id="audit-steps" className={`rv ${h2} mt-3`}>{auditPage.stepsTitle}</h2>
          <ol className="mt-12 grid gap-10 md:grid-cols-3 md:gap-8">
            {auditPage.steps.map((s, i) => (
              <li key={s.title} className="rv border-t-2 border-ink/15 pt-6">
                <span aria-hidden className="text-[2.6rem] leading-none font-light tracking-[-0.04em] text-brand">{String(i + 1).padStart(2, "0")}</span>
                <h3 className="mt-3 text-[1.25rem] font-semibold tracking-[-0.02em]">{s.title}</h3>
                <p className="mt-2 leading-relaxed text-ink/75">{s.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section aria-labelledby="audit-faq" className="py-20 lg:py-28">
        <div className="container-page grid gap-10 lg:grid-cols-[19rem_1fr] lg:gap-14">
          <div>
            <p className={`rv ${eyebrow}`}>Good to know</p>
            <h2 id="audit-faq" className={`rv ${h2} mt-3`}>{auditPage.faqTitle}</h2>
          </div>
          <dl className="grid gap-4 md:grid-cols-2">
            {auditPage.faqs.map((f) => (
              <div key={f.q} className="rv rounded-[1.25rem] bg-white p-6 ring-1 ring-line">
                <dt className="text-[1.05rem] font-semibold">{f.q}</dt>
                <dd className="mt-2 leading-relaxed text-ink/80">{f.a}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <section aria-labelledby="audit-cta" className="pb-20 lg:pb-28">
        <div className="container-page">
          <div className="rv relative flex flex-col items-start gap-8 overflow-hidden rounded-[2.25rem] bg-band p-8 text-white sm:p-12 md:flex-row md:items-center md:justify-between lg:p-16">
            <div aria-hidden className="absolute -right-32 -bottom-48 size-[34rem] rounded-full bg-[radial-gradient(closest-side,rgba(242,107,43,0.32),transparent)]" />
            <div className="relative">
              <h2 id="audit-cta" className="text-[clamp(1.7rem,3vw,2.6rem)] leading-[1.12] font-semibold tracking-[-0.03em]">Rather have it fixed for you?</h2>
              <p className="mt-3 max-w-[34rem] text-white/75">Send us your site. We reply within 2 working hours (IST) and send a written proposal within 48 hours of our call.</p>
            </div>
            <Link href="/get-a-quote/?service=seo" className="group relative inline-flex h-13 shrink-0 items-center gap-2 rounded-full bg-white px-8 text-[0.95rem] font-medium text-ink transition-colors hover:bg-[#ffe3d1] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white">
              Get a quote
              <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" aria-hidden />
            </Link>
          </div>
        </div>
      </section>
    </ServiceMotion>
  );
}
