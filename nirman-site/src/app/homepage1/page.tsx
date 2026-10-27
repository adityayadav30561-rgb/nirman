import { Faq } from "@/components/faq";
import { JsonLd } from "@/components/json-ld";
import { NirmanCrm } from "@/components/nirman-crm";
import { QuoteSection } from "@/components/quote-section";
import { Band1 } from "@/components/home1/band";
import { Hero1 } from "@/components/home1/hero";
import { Industries1 } from "@/components/home1/industries";
import { Method1 } from "@/components/home1/method";
import { Promise1 } from "@/components/home1/promise";
import { Services1 } from "@/components/home1/services";
import { Tools1 } from "@/components/home1/tools";
import { Work1 } from "@/components/home1/work";
import { finalCta, quickAnswers } from "@/content/home1";
import { faqPageLd, organizationLd, registryMetadata, websiteLd } from "@/lib/seo";

// Review route for the v3 homepage (docs/REDESIGN.md §6). Not indexed.
export const metadata = registryMetadata("/homepage1/");

const jsonLd = [organizationLd(), websiteLd(), faqPageLd(quickAnswers)];

export default function Homepage1() {
  return (
    <>
      <JsonLd data={jsonLd} />
      <Hero1 />
      <Promise1 />
      <Services1 />
      <Band1 />
      <NirmanCrm />
      <Method1 />
      <Industries1 />
      <Work1 />
      <Tools1 />
      <Faq items={quickAnswers} title="Quick answers" />
      <QuoteSection service="General enquiry" path="/homepage1/" title={finalCta.title} intro={finalCta.intro} />
    </>
  );
}
