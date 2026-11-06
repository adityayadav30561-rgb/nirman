import type { Metadata } from "next";
import { site } from "@/content/site";
import { Hero } from "@/components/home/hero";
import { Facts } from "@/components/home/facts";
import { Services } from "@/components/home/services";
import { WhereWeWork } from "@/components/home/map";
import { Crm } from "@/components/home/crm";
import { Results } from "@/components/home/results";
import { Questions } from "@/components/home/questions";

// Homepage, built section by section from docs/PAGE-PLAN.md section 2 and
// docs/REFERENCE-VIDEO.md, each section chosen per docs/DESIGN-PROTOCOL.md.
// Done so far: header (in layout), hero, facts band, what we do, where we work, Nirman CRM, results, questions.
export const metadata: Metadata = {
  alternates: { canonical: "/" },
};

/* Organization + WebSite JSON-LD for the homepage (FAQPage is in Questions).
   Contact details are placeholders in content/site.ts until the client sends them. */
const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": `${site.url}/#organization`,
      name: site.name,
      url: `${site.url}/`,
      description: site.description,
      email: site.email,
      areaServed: ["IN", "AE", "GB", "US"],
      address: { "@type": "PostalAddress", addressCountry: "IN" },
    },
    {
      "@type": "WebSite",
      "@id": `${site.url}/#website`,
      url: `${site.url}/`,
      name: site.name,
      inLanguage: "en",
      publisher: { "@id": `${site.url}/#organization` },
    },
  ],
};

export default function Home() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }} />
      <Hero />
      <Facts />
      <Services />
      <WhereWeWork />
      <Crm />
      <Results />
      <Questions />
    </>
  );
}
