import { SiteHeader } from "@/components/site-header";
import { Hero } from "@/components/hero";
import { Services } from "@/components/services/services";
import { NirmanCrm } from "@/components/nirman-crm";
import { Work } from "@/components/work";
import { Process } from "@/components/process";
import { WhyUs } from "@/components/why-us";
import { FinalCta } from "@/components/final-cta";
import { SiteFooter } from "@/components/site-footer";
import { site } from "@/content/site";

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: `${site.name} ${site.descriptor}`,
  description: site.description,
  url: site.url,
  email: site.email,
  areaServed: "IN",
  makesOffer: [
    "SEO services",
    "Website design and development",
    "CRM solutions",
    "Custom software development",
    "Mobile app development",
    "Digital marketing",
  ].map((name) => ({ "@type": "Offer", itemOffered: { "@type": "Service", name } })),
};

export default function Home() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-full focus:bg-ink focus:px-4 focus:py-2 focus:text-paper"
      >
        Skip to content
      </a>
      <SiteHeader />
      <main id="main">
        <Hero />
        <Services />
        <NirmanCrm />
        <Work />
        <Process />
        <WhyUs />
        <FinalCta />
      </main>
      <SiteFooter />
    </>
  );
}
