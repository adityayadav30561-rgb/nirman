import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";
import { DashboardScreen } from "@/components/crm/screens";
import { WhereWeWork } from "@/components/home/map";
import { serviceArt } from "@/components/services/service-art";
import { AccentTitle, heroGrid } from "@/components/services/service-hero";
import { ServiceMotion } from "@/components/services/service-motion";
import { ServiceSteps } from "@/components/services/service-page";
import { CrmShot } from "@/components/services/visuals/crm-shot";
import { aboutPage } from "@/content/pages";
import { servicePages, serviceSlugs, servicesHub } from "@/content/service-pages";
import { site } from "@/content/site";

// /about/ (PAGE-PLAN section 3; docs/sections/p4-contact-about.md, hero
// variant A): centred ink hero over the four kinds of work, our story, how we
// treat a project, how we work, our own product, where we work. The team
// block waits for real names and photos from the client (nothing invented).

const title = "About Nirman: one team for websites, SEO, software and CRM";
const description = "Nirman is a digital agency in India. One team builds your website, runs SEO, develops custom software and automates follow-ups with its own product, Nirman CRM.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/about/" },
  openGraph: { type: "website", siteName: site.name, locale: "en_IN", url: "/about/", title, description },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    { "@type": "AboutPage", name: title, url: `${site.url}/about/`, about: { "@id": `${site.url}/#organization` } },
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: `${site.url}/` },
        { "@type": "ListItem", position: 2, name: "About", item: `${site.url}/about/` },
      ],
    },
  ],
};

const h2 = "rv text-[clamp(1.8rem,3.2vw,2.8rem)] leading-[1.12] font-semibold tracking-[-0.03em]";
const eyebrow = "rv text-[0.78rem] font-semibold tracking-[0.08em] text-brand uppercase";

export default function AboutPage() {
  return (
    <>
      <ServiceMotion>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }} />
        <section aria-labelledby="about-title" className="relative overflow-hidden bg-band pt-14 text-white lg:pt-20">
          <div aria-hidden className={`absolute inset-0 ${heroGrid} [mask-image:radial-gradient(ellipse_at_50%_0%,black,transparent_70%)]`} />
          <div aria-hidden className="absolute -top-64 left-1/2 size-[46rem] -translate-x-1/2 rounded-full bg-[radial-gradient(closest-side,rgba(242,107,43,0.2),transparent)]" />
          <div className="container-page relative text-center">
            <p className="gs-hide text-[0.78rem] font-semibold tracking-[0.08em] text-[#ff9a62] uppercase">About Nirman</p>
            <h1 id="about-title" className="gs-hide mx-auto mt-4 max-w-[54rem] text-[clamp(2.3rem,4.6vw,4rem)] leading-[1.06] font-semibold tracking-[-0.035em]">
              <AccentTitle title={aboutPage.title} accent={aboutPage.accent} />
            </h1>
            <p className="gs-hide mx-auto mt-6 max-w-[42rem] text-[1.05rem] text-white/75">{aboutPage.line}</p>
            <ul className="gs-hide mt-12 grid grid-cols-2 gap-3 text-left lg:grid-cols-4 lg:gap-4">
              {serviceSlugs.map((slug) => {
                const { Scene } = serviceArt[slug];
                return (
                  <li key={slug}>
                    <Link href={`/services/${slug}/`} className="group block h-full overflow-hidden rounded-t-[1.5rem] bg-white/6 px-4 pt-4 ring-1 ring-white/10 transition-colors hover:bg-white/10 focus-visible:outline-2 focus-visible:outline-white lg:px-5 lg:pt-5">
                      <span className="flex items-center justify-between text-[0.9rem] font-medium">
                        {servicePages[slug].name}
                        <ArrowRight className="size-4 text-[#ff9a62] transition-transform group-hover:translate-x-1" aria-hidden />
                      </span>
                      <Scene className="mt-4 -mb-2" />
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        </section>

        <section aria-labelledby="story-title" className="py-20 lg:py-28">
          <div className="container-page grid grid-cols-1 gap-10 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-16">
            <div>
              <p className={eyebrow}>Our story</p>
              <h2 id="story-title" className={`${h2} mt-3`}>One team, instead of four vendors</h2>
            </div>
            <div className="flex flex-col gap-5">
              {aboutPage.story.map((t, i) => (
                <p key={t} className={`rv ${i === 0 ? "text-[1.35rem] leading-[1.45] font-medium tracking-[-0.01em]" : "text-[1.02rem] text-ink/75"}`}>{t}</p>
              ))}
            </div>
          </div>
        </section>

        <section aria-labelledby="how-title" className="bg-wash py-20 lg:py-24">
          <div className="container-page">
            <p className={eyebrow}>What you can count on</p>
            <h2 id="how-title" className={`${h2} mt-3 max-w-[36rem]`}>How we treat every project</h2>
            <ul className="mt-12 grid grid-cols-1 gap-x-8 sm:grid-cols-2 lg:grid-cols-4">
              {aboutPage.principles.map((a, i) => (
                <li key={a.title} className="rv border-t-2 border-ink/15 py-6 transition-colors duration-300 hover:border-brand">
                  <p className="text-[2.2rem] leading-none font-light text-brand/80">0{i + 1}</p>
                  <h3 className="mt-5 text-[1.2rem] leading-snug font-semibold tracking-[-0.015em]">{a.title}</h3>
                  <p className="mt-2 text-[0.92rem] text-ink/70">{a.line}</p>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <ServiceSteps steps={servicesHub.steps} title="One way of working, whatever we build" line="The same five steps for a website, an SEO plan, a custom system or a campaign." />

        <section aria-labelledby="crm-title" className="pt-20 lg:pt-28">
          <div className="container-page">
            <div className="rv grid grid-cols-1 overflow-hidden rounded-[2.25rem] bg-white ring-1 ring-line lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)]">
              <div className="p-8 sm:p-12 lg:p-14">
                <p className="text-[0.78rem] font-semibold tracking-[0.08em] text-brand uppercase">Our own product</p>
                <h2 id="crm-title" className="mt-3 text-[clamp(1.7rem,2.8vw,2.4rem)] leading-[1.12] font-semibold tracking-[-0.03em]">We build software for ourselves too: Nirman CRM</h2>
                <p className="mt-4 text-muted">Every enquiry in one inbox, an instant reply, and reminders so no lead goes cold. It is the product behind our marketing automation work.</p>
                <ul className="mt-6 flex flex-col gap-2.5 text-[0.95rem]">
                  {["WhatsApp, email, forms and calls in one inbox", "A pipeline from new enquiry to won", "Follow-ups that run on their own"].map((t) => (
                    <li key={t} className="flex gap-2.5"><Check className="mt-0.5 size-4.5 shrink-0 text-brand" strokeWidth={2.8} aria-hidden />{t}</li>
                  ))}
                </ul>
                <Link href="/nirman-crm/" className="mt-8 inline-flex h-12 items-center gap-2 rounded-full bg-ink-2 px-7 text-[0.9rem] font-medium text-white transition-colors hover:bg-brand focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand">
                  Book a demo
                  <ArrowRight className="size-4" aria-hidden />
                </Link>
              </div>
              <div aria-hidden className="relative min-h-[20rem] overflow-hidden bg-[linear-gradient(160deg,#f1f3f6,#e6e9ee)]">
                <CrmShot active="dashboard" className="top-[2.2rem] left-[2.2rem] max-md:-left-[8.4rem]"><DashboardScreen /></CrmShot>
              </div>
            </div>
          </div>
        </section>
      </ServiceMotion>
      <WhereWeWork />
    </>
  );
}
