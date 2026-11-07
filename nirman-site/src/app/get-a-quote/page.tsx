import type { Metadata } from "next";
import { Reveal } from "@/components/motion/reveal";
import { QuoteForm } from "@/components/quote/quote-form";
import { nextSteps, quoteIntro } from "@/content/quote";
import { site } from "@/content/site";

// /get-a-quote/ (PAGE-PLAN section 3; docs/sections/p3-get-a-quote.md, variant B):
// centred four-step form card, then what happens next as four tiles on an ink band.

const title = "Get a quote for your website, SEO, software or CRM";
const description = "Tell us what you need in four short steps. Nirman replies within 2 working hours (IST) and sends a written proposal within 48 hours of the call.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/get-a-quote/" },
  openGraph: { type: "website", siteName: site.name, locale: "en_IN", url: "/get-a-quote/", title, description },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: `${site.url}/` },
    { "@type": "ListItem", position: 2, name: "Get a quote", item: `${site.url}/get-a-quote/` },
  ],
};

export default function GetAQuotePage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }} />
      <Reveal aria-labelledby="quote-title" className="pt-14 pb-20 lg:pt-20 lg:pb-24">
        <div className="container-page">
          <div className="mx-auto max-w-[46rem] text-center">
            <h1 id="quote-title" className="rv text-[clamp(2.1rem,4vw,3.4rem)] leading-[1.08] font-semibold tracking-[-0.03em]">
              {quoteIntro.title}
            </h1>
            <p className="rv mx-auto mt-4 max-w-[36rem] text-muted">{quoteIntro.line}</p>
          </div>
          <div className="rv mx-auto mt-10 max-w-[46rem] rounded-[1.75rem] bg-white p-6 shadow-[0_1.5rem_3rem_-1.5rem_rgba(18,20,24,0.18)] ring-1 ring-line sm:p-9">
            <QuoteForm />
          </div>
        </div>
      </Reveal>
      <Reveal aria-labelledby="next-title" className="mb-14 bg-[linear-gradient(160deg,var(--color-band-2),var(--color-band))] py-16 text-white lg:mb-20 lg:py-20">
        <div className="container-page">
          <h2 id="next-title" className="rv text-[clamp(1.5rem,2.4vw,2rem)] font-semibold tracking-[-0.02em]">
            What happens next
          </h2>
          <ol className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {nextSteps.map((s, i) => (
              <li key={s.title} className="rv rounded-2xl bg-white/6 p-6 ring-1 ring-white/12">
                <p className="text-[0.8rem] font-semibold text-[#f6a57a]">0{i + 1}</p>
                <p className="mt-2 text-[1.05rem] font-semibold">{s.title}</p>
                <p className="mt-1.5 text-[0.88rem] text-white/80">{s.line}</p>
              </li>
            ))}
          </ol>
        </div>
      </Reveal>
    </>
  );
}
