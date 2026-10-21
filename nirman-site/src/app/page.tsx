import { Hero } from "@/components/hero";
import { Services } from "@/components/services/services";
import { NirmanCrm } from "@/components/nirman-crm";
import { Work } from "@/components/work";
import { Process } from "@/components/process";
import { Team } from "@/components/team";
import { FreeTools } from "@/components/free-tools";
import { Testimonials } from "@/components/testimonials";
import { Faq } from "@/components/faq";
import { FinalCta } from "@/components/final-cta";
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
    "WhatsApp and email marketing",
  ].map((name) => ({ "@type": "Offer", itemOffered: { "@type": "Service", name } })),
};

export default function Home() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Hero />
      <Services />
      <NirmanCrm />
      <Work />
      <Process />
      <Team />
      <FreeTools />
      <Testimonials />
      <Faq />
      <FinalCta />
    </>
  );
}
