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
import { JsonLd } from "@/components/json-ld";
import { localBusinessLd, organizationLd, registryMetadata, websiteLd } from "@/lib/seo";

export const metadata = registryMetadata("/");

const jsonLd = [
  organizationLd(),
  websiteLd(),
  localBusinessLd({
    offers: [
      "SEO services",
      "Website design and development",
      "CRM solutions",
      "Custom software development",
      "Mobile app development",
      "WhatsApp and email marketing",
    ],
  }),
];

export default function Home() {
  return (
    <>
      <JsonLd data={jsonLd} />
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
