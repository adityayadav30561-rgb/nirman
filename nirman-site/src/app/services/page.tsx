import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";
import { Reveal } from "@/components/motion/reveal";
import { ServiceQuestions, ServiceSteps } from "@/components/services/service-page";
import { heroShots } from "@/components/services/service-screens";
import { ShotCrop } from "@/components/services/shot-crop";
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

export default function ServicesHubPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }} />
      <Reveal aria-labelledby="hub-title" className="bg-[linear-gradient(160deg,var(--color-band-2),var(--color-band))] py-16 text-white lg:py-24">
        <div className="container-page max-w-[60rem] text-center">
          <p className="rv text-[0.85rem] font-semibold text-[#f6a57a]">Services</p>
          <h1 id="hub-title" className="rv mt-3 text-[clamp(2.1rem,4.2vw,3.6rem)] leading-[1.07] font-semibold tracking-[-0.035em]">
            {servicesHub.title}
          </h1>
          <p className="rv mx-auto mt-5 max-w-[40rem] text-[1.05rem] text-white/85">{servicesHub.line}</p>
          <Link href="/get-a-quote/" className="rv mt-8 inline-flex h-12 items-center rounded-full bg-white px-7 text-[0.9rem] font-medium text-ink transition-colors hover:bg-wash">
            Get a quote
          </Link>
        </div>
      </Reveal>
      <Reveal aria-label="Our four services" className="py-20 lg:py-28">
        <div className="container-page flex flex-col gap-6">
          {serviceSlugs.map((slug, i) => {
            const s = servicePages[slug];
            const shot = heroShots[slug];
            return (
              <article key={slug} aria-labelledby={`hub-${slug}`} className="rv grid grid-cols-1 items-center gap-10 overflow-hidden rounded-[2rem] bg-white p-7 ring-1 ring-line sm:p-10 lg:grid-cols-2 lg:gap-14">
                <div className={i % 2 ? "lg:order-2" : ""}>
                  <p className="text-[0.8rem] font-semibold text-brand">0{i + 1} · {s.eyebrow}</p>
                  <h2 id={`hub-${slug}`} className="mt-2 text-[clamp(1.5rem,2.6vw,2.2rem)] leading-tight font-semibold tracking-[-0.02em]">{s.title}</h2>
                  <p className="mt-3 text-muted">{s.line}</p>
                  <p className="mt-4 text-[0.88rem]"><b className="font-semibold">For:</b> <span className="text-ink/75">{s.audiences.map((a) => a.name.toLowerCase()).join(", ")}.</span></p>
                  <ul className="mt-4 flex flex-col gap-2 text-[0.92rem]">
                    {s.included.slice(0, 3).map((x) => (
                      <li key={x.title} className="flex gap-2"><Check className="mt-0.5 size-4.5 shrink-0 text-brand" strokeWidth={2.6} aria-hidden />{x.title}</li>
                    ))}
                  </ul>
                  <Link href={`/services/${slug}/`} className="mt-7 inline-flex h-12 items-center gap-2 rounded-full bg-ink-2 px-6 text-[0.9rem] font-medium text-white transition-colors hover:bg-brand">
                    Explore {s.name === "SEO" ? "SEO" : s.name.toLowerCase()}
                    <ArrowRight className="size-4" aria-hidden />
                  </Link>
                </div>
                <div aria-hidden>
                  <div className="hidden md:block">{shot.window()}</div>
                  <div className="md:hidden"><ShotCrop shot={shot} height={240} /></div>
                </div>
              </article>
            );
          })}
        </div>
      </Reveal>
      <ServiceSteps steps={servicesHub.steps} title="How we work" />
      <ServiceQuestions faqs={faqs} title="Questions before you start" />
      <Reveal aria-labelledby="hub-cta" className="pb-20 lg:pb-28">
        <div className="container-page">
          <div className="rv flex flex-col items-start gap-6 rounded-[2rem] bg-wash p-8 sm:p-12 md:flex-row md:items-center md:justify-between">
            <div>
              <h2 id="hub-cta" className="text-[clamp(1.5rem,2.6vw,2.1rem)] leading-tight font-semibold tracking-[-0.02em]">Not sure which service you need?</h2>
              <p className="mt-2 max-w-[34rem] text-ink/75">Tell us what you want to achieve. We will suggest the right mix and send a written proposal within 48 hours of our call.</p>
            </div>
            <Link href="/get-a-quote/" className="inline-flex h-12 shrink-0 items-center rounded-full bg-ink-2 px-7 text-[0.9rem] font-medium text-white transition-colors hover:bg-brand">
              Get a quote
            </Link>
          </div>
        </div>
      </Reveal>
    </>
  );
}
