import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Check, FileSearch, Gauge, MessageCircleQuestion, Network, Share2, Smartphone, Sparkles } from "lucide-react";
import { AuditTool } from "@/components/audit/audit-tool";
import { heroGrid } from "@/components/services/service-hero";
import { ServiceMotion } from "@/components/services/service-motion";
import { auditPage } from "@/content/audit-page";
import { site } from "@/content/site";
import { CATS } from "@/lib/audit/types";

/*
 * /tools/seo-audit/ (docs/sections/p6-seo-audit.md): the free SEO audit.
 * The tool lives in the ink hero (components/audit/audit-tool.tsx) and owns
 * the page's h1 in each of its phases. Below it, written for people looking
 * for a free SEO audit tool with no signup: every check by area, what is
 * free with and without contact details, the three steps, how the score is
 * worked out, questions (FAQPage JSON-LD) and Get a quote.
 */
const url = "/tools/seo-audit/";
export const metadata: Metadata = {
  title: auditPage.metaTitle,
  description: auditPage.description,
  alternates: { canonical: url },
  openGraph: { type: "website", siteName: site.name, locale: "en_IN", url, title: auditPage.metaTitle, description: auditPage.description },
};

const icons = { index: Network, content: FileSearch, speed: Gauge, mobile: Smartphone, rich: Share2, aeo: MessageCircleQuestion, geo: Sparkles } as const;
const h2 = "text-[clamp(1.7rem,3vw,2.5rem)] leading-[1.12] font-semibold tracking-[-0.03em]";
const eyebrow = "text-[0.78rem] font-semibold tracking-[0.08em] text-brand uppercase";
const inline = "font-medium text-brand underline decoration-brand/40 underline-offset-[3px] transition-colors hover:decoration-brand";

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebApplication",
      name: `${site.name} free SEO audit tool`,
      alternateName: ["Free SEO audit tool", "Website SEO checker"],
      url: `${site.url}${url}`,
      applicationCategory: "BusinessApplication",
      operatingSystem: "Any",
      browserRequirements: "Requires JavaScript",
      description: auditPage.description,
      isAccessibleForFree: true,
      featureList: CATS.map((c) => c.label),
      provider: { "@id": `${site.url}/#organization` },
    },
    { "@type": "BreadcrumbList", itemListElement: [["Home", "/"], ["Free SEO audit tool", url]].map(([name, href], i) => ({ "@type": "ListItem", position: i + 1, name, item: `${site.url}${href}` })) },
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
            {CATS.filter((c) => c.key !== "aeo" && c.key !== "geo").map((c) => {
              const Icon = icons[c.key];
              return (
                <li key={c.key} className="rv flex flex-col rounded-[1.5rem] bg-white p-7 ring-1 ring-line">
                  <span className="grid size-12 place-items-center rounded-2xl bg-[#fdeee4] text-brand"><Icon className="size-6" aria-hidden /></span>
                  <h3 className="mt-5 text-[1.15rem] font-semibold tracking-[-0.015em]">{c.label}</h3>
                  <p className="mt-2 text-[0.95rem] leading-relaxed text-muted">{c.line}</p>
                  <ul className="mt-5 flex flex-col gap-2 border-t border-line pt-5 text-[0.9rem]">
                    {auditPage.checks[c.key].map((k) => (
                      <li key={k} className="flex gap-2.5"><Check className="mt-1 size-3.5 shrink-0 text-brand" strokeWidth={3} aria-hidden />{k}</li>
                    ))}
                  </ul>
                </li>
              );
            })}
            <li className="rv">
              <a href="#aeo-geo" className="group flex h-full flex-col justify-between rounded-[1.5rem] bg-band p-7 text-white transition-colors hover:bg-ink-2 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand">
                <span className="flex gap-2">
                  <span className="grid size-12 place-items-center rounded-2xl bg-white/8 text-[#ff9a62] ring-1 ring-white/12"><MessageCircleQuestion className="size-6" aria-hidden /></span>
                  <span className="grid size-12 place-items-center rounded-2xl bg-white/8 text-[#ff9a62] ring-1 ring-white/12"><Sparkles className="size-6" aria-hidden /></span>
                </span>
                <span className="mt-8 block">
                  <span className="block text-[1.15rem] font-semibold tracking-[-0.015em]">Plus AEO and GEO</span>
                  <span className="mt-2 block text-[0.95rem] leading-relaxed text-white/70">Two more areas for answer engines and AI assistants, 30% of the score.</span>
                  <span className="mt-5 inline-flex items-center gap-2 text-[0.9rem] font-medium text-[#ff9a62]">See what they check<ArrowRight className="size-4 rotate-90 transition-transform group-hover:translate-y-0.5" aria-hidden /></span>
                </span>
              </a>
            </li>
          </ul>
        </div>
      </section>

      <section id="aeo-geo" aria-labelledby="audit-aeo-geo" className="scroll-mt-24 bg-wash py-20 lg:py-28">
        <div className="container-page">
          <div className="max-w-[44rem]">
            <p className={`rv ${eyebrow}`}>Answer engines and AI assistants</p>
            <h2 id="audit-aeo-geo" className={`rv ${h2} mt-3`}>{auditPage.aeoGeoTitle}</h2>
            <p className="rv mt-4 text-muted">{auditPage.aeoGeoLine}</p>
          </div>
          <div className="mt-12 grid gap-4 lg:grid-cols-2">
            {auditPage.aeoGeo.map((g) => {
              const cat = CATS.find((c) => c.key === g.key)!;
              const Icon = icons[cat.key];
              return (
                <article key={g.key} className="rv rounded-[1.75rem] bg-white p-8 ring-1 ring-line">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <span className="grid size-12 place-items-center rounded-2xl bg-[#fdeee4] text-brand"><Icon className="size-6" aria-hidden /></span>
                      <h3 className="mt-5 text-[1.5rem] leading-tight font-semibold tracking-[-0.02em]">{g.name}<span className="block text-[1rem] font-medium text-muted">{g.full}</span></h3>
                    </div>
                    <span className="shrink-0 rounded-full bg-wash px-3 py-1 text-[0.8rem] font-semibold text-brand">{cat.weight}% of the score</span>
                  </div>
                  <p className="mt-4 leading-relaxed text-ink/80">{g.text}</p>
                  <ul className="mt-6 grid gap-2.5 border-t border-line pt-6 text-[0.93rem] sm:grid-cols-2">
                    {auditPage.checks[g.key].map((k) => (
                      <li key={k} className="flex gap-2.5"><Check className="mt-1 size-3.5 shrink-0 text-brand" strokeWidth={3} aria-hidden />{k}</li>
                    ))}
                  </ul>
                </article>
              );
            })}
          </div>
          <p className="rv mt-6 text-[0.88rem] text-muted">{auditPage.aeoGeoNote}</p>
        </div>
      </section>

      <section aria-labelledby="audit-free" className="bg-band py-20 text-white lg:py-28">
        <div className="container-page">
          <div className="max-w-[42rem]">
            <p className="rv text-[0.78rem] font-semibold tracking-[0.08em] text-[#ff9a62] uppercase">No account, ever</p>
            <h2 id="audit-free" className={`rv ${h2} mt-3`}>{auditPage.freeTitle}</h2>
            <p className="rv mt-4 text-white/75">{auditPage.freeLine}</p>
          </div>
          <div className="mt-12 grid gap-4 md:grid-cols-2">
            {[auditPage.free, auditPage.gated].map((g, i) => (
              <div key={g.title} className={`rv rounded-[1.75rem] p-8 ring-1 ${i === 0 ? "bg-white text-ink ring-white" : "bg-white/6 ring-white/12"}`}>
                <h3 className="text-[1.3rem] leading-tight font-semibold tracking-[-0.02em]">{g.title}</h3>
                <ul className="mt-5 flex flex-col gap-3 text-[0.98rem]">
                  {g.points.map((p) => (
                    <li key={p} className="flex gap-3"><Check className={`mt-1 size-4 shrink-0 ${i === 0 ? "text-brand" : "text-[#ff9a62]"}`} strokeWidth={3} aria-hidden />{p}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <div className="rv mt-10">
            <a href="#audit-title" className="group inline-flex h-13 items-center gap-2 rounded-full bg-white px-8 text-[0.95rem] font-medium text-ink transition-colors hover:bg-[#ffe3d1] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white">
              Run a free SEO audit
              <ArrowRight className="size-4 -rotate-90 transition-transform group-hover:-translate-y-1" aria-hidden />
            </a>
          </div>
        </div>
      </section>

      <section aria-labelledby="audit-steps" className="py-20 lg:py-28">
        <div className="container-page">
          <p className={`rv ${eyebrow}`}>Three steps</p>
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

      <section aria-labelledby="audit-score" className="py-20 lg:py-28">
        <div className="container-page grid gap-10 lg:grid-cols-[19rem_1fr] lg:gap-14">
          <div>
            <p className={`rv ${eyebrow}`}>The method</p>
            <h2 id="audit-score" className={`rv ${h2} mt-3`}>{auditPage.scoreTitle}</h2>
          </div>
          <div className="rv max-w-[46rem]">
            {auditPage.scoreText.map((t) => <p key={t} className="mb-4 text-[1.02rem] leading-[1.8] text-ink/85">{t}</p>)}
            <p className="text-[1.02rem] leading-[1.8] text-ink/85">
              An automated audit is a starting point. For what it cannot see, read about our <Link href="/services/seo/" className={inline}>SEO service</Link> or look at <Link href="/work/seo/" className={inline}>SEO results for our clients</Link>.
            </p>
          </div>
        </div>
      </section>

      <section aria-labelledby="audit-faq" className="bg-wash py-20 lg:py-28">
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

      <section aria-labelledby="audit-cta" className="py-20 lg:py-28">
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
