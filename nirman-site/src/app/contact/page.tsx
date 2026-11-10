import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { ContactForm } from "@/components/pages/contact-form";
import { Channels } from "@/components/pages/contact-parts";
import { WorldClocks } from "@/components/pages/world-clocks";
import { AccentTitle, heroGrid } from "@/components/services/service-hero";
import { ServiceMotion } from "@/components/services/service-motion";
import { mapIntro } from "@/content/map";
import { contactPage } from "@/content/pages";
import { site } from "@/content/site";

// /contact/ (PAGE-PLAN section 3; docs/sections/p4-contact-about.md, variant B):
// one ink stage with the headline and the ways to reach us on the left and the
// form card on the right, live clocks, what happens next, two onward links.

const title = "Contact Nirman: message, call or WhatsApp";
const description = "Contact Nirman about a website, SEO, custom software or Nirman CRM. Send a message, call or write on WhatsApp; we reply within 2 working hours (IST).";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/contact/" },
  openGraph: { type: "website", siteName: site.name, locale: "en_IN", url: "/contact/", title, description },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    { "@type": "ContactPage", name: title, url: `${site.url}/contact/`, about: { "@id": `${site.url}/#organization` } },
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: `${site.url}/` },
        { "@type": "ListItem", position: 2, name: "Contact", item: `${site.url}/contact/` },
      ],
    },
  ],
};

const h2 = "rv text-[clamp(1.8rem,3.2vw,2.8rem)] leading-[1.12] font-semibold tracking-[-0.03em]";
const eyebrow = "rv text-[0.78rem] font-semibold tracking-[0.08em] text-brand uppercase";

export default function ContactPage() {
  return (
    <ServiceMotion>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }} />
      <section aria-labelledby="contact-title" className="relative overflow-hidden bg-band text-white">
        <div aria-hidden className={`absolute inset-0 ${heroGrid} [mask-image:radial-gradient(ellipse_at_20%_20%,black,transparent_70%)]`} />
        <div aria-hidden className="absolute bottom-0 left-0 size-[36rem] -translate-x-1/3 translate-y-1/3 rounded-full bg-[radial-gradient(closest-side,rgba(242,107,43,0.22),transparent)]" />
        <div className="container-page relative grid gap-10 pt-12 lg:grid-cols-[minmax(0,5.4fr)_minmax(0,6.6fr)] lg:gap-14 lg:py-20 pb-12">
          <div>
            <p className="gs-hide text-[0.78rem] font-semibold tracking-[0.08em] text-[#ff9a62] uppercase">Contact</p>
            <h1 id="contact-title" className="gs-hide mt-4 text-[clamp(2.2rem,4.1vw,3.6rem)] leading-[1.08] font-semibold tracking-[-0.035em]">
              <AccentTitle title={contactPage.title} accent={contactPage.accent} />
            </h1>
            <p className="gs-hide mt-5 max-w-[32rem] text-[1.05rem] text-white/75">{contactPage.line}</p>
            <div className="gs-hide mt-8">
              <Channels dark />
            </div>
          </div>
          <div className="gs-hide self-start rounded-[1.75rem] bg-white p-6 text-ink shadow-[0_2rem_4rem_-2rem_rgba(18,20,24,0.45)] ring-1 ring-line sm:p-9">
            <h2 className="mb-6 text-[1.4rem] font-semibold tracking-[-0.02em]">Send us a message</h2>
            <ContactForm />
          </div>
        </div>
      </section>

      <section aria-labelledby="clock-title" className="py-20 lg:py-28">
        <div className="container-page">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-[40rem]">
              <p className={eyebrow}>Right now</p>
              <h2 id="clock-title" className={`${h2} mt-3`}>{mapIntro.title}</h2>
            </div>
            <p className="rv max-w-[26rem] text-[0.95rem] text-muted">Our office is in India. We work with businesses in the UAE, the UK and the US remotely, with calls in your working hours.</p>
          </div>
          <div className="mt-10">
            <WorldClocks />
          </div>
        </div>
      </section>

      <section aria-labelledby="next-title" className="bg-wash py-20 lg:py-24">
        <div className="container-page">
          <p className={eyebrow}>After you write</p>
          <h2 id="next-title" className={`${h2} mt-3 max-w-[36rem]`}>What happens next</h2>
          <ol className="mt-12 grid grid-cols-1 gap-x-8 md:grid-cols-3">
            {contactPage.next.map((s, i) => (
              <li key={s.title} className="rv border-t-2 border-ink/15 py-6">
                <p className="text-[2.2rem] leading-none font-light text-brand/80">0{i + 1}</p>
                <h3 className="mt-5 text-[1.2rem] font-semibold tracking-[-0.015em]">{s.title}</h3>
                <p className="mt-2 max-w-[24rem] text-[0.92rem] text-ink/70">{s.line}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section aria-label="Other ways to start" className="py-20 lg:py-28">
        <div className="container-page grid gap-4 md:grid-cols-2">
          <div className="rv relative flex flex-col items-start overflow-hidden rounded-[2.25rem] bg-band p-8 text-white sm:p-12">
            <div aria-hidden className="absolute -right-32 -bottom-48 size-[30rem] rounded-full bg-[radial-gradient(closest-side,rgba(242,107,43,0.32),transparent)]" />
            <h2 className="relative text-[clamp(1.5rem,2.4vw,2rem)] leading-[1.15] font-semibold tracking-[-0.025em]">Know what you need? Ask for a written quote.</h2>
            <p className="relative mt-3 max-w-[28rem] text-white/75">Four short steps, and a written proposal within 48 hours of our call.</p>
            <Link href="/get-a-quote/" className="relative mt-8 inline-flex h-12 items-center gap-2 rounded-full bg-white px-7 text-[0.9rem] font-medium text-ink transition-colors hover:bg-[#ffe3d1] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white">
              Get a quote
              <ArrowRight className="size-4" aria-hidden />
            </Link>
          </div>
          <div className="rv flex flex-col items-start rounded-[2.25rem] bg-white p-8 ring-1 ring-line sm:p-12">
            <h2 className="text-[clamp(1.5rem,2.4vw,2rem)] leading-[1.15] font-semibold tracking-[-0.025em]">Here for Nirman CRM? See it with your own leads.</h2>
            <p className="mt-3 max-w-[28rem] text-muted">A guided demo of the inbox, pipeline and automatic follow-ups.</p>
            <Link href="/nirman-crm/" className="mt-8 inline-flex h-12 items-center gap-2 rounded-full bg-ink-2 px-7 text-[0.9rem] font-medium text-white transition-colors hover:bg-brand focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand">
              Book a demo
              <ArrowRight className="size-4" aria-hidden />
            </Link>
          </div>
        </div>
      </section>
    </ServiceMotion>
  );
}
