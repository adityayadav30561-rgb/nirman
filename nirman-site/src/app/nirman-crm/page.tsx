import type { Metadata } from "next";
import { CrmHero } from "@/components/crm-page/hero";
import { CrmTour } from "@/components/crm-page/tour";
import { CrmAudiences, CrmChannels, CrmCustomisation, CrmDemo, CrmIntegrations, CrmProblems, CrmQuestions } from "@/components/crm-page/sections";
import { crmFaqs, crmHero, features } from "@/content/crm-page";
import { site } from "@/content/site";

// /nirman-crm/ (PAGE-PLAN section 3; docs/sections/p2-crm-page.md). Every call to action: Book a demo.

const title = "Nirman CRM: WhatsApp and email CRM for growing businesses";
const description =
  "Nirman CRM brings website forms, WhatsApp, email, calls and ad leads into one inbox, replies instantly and reminds your team to follow up. Book a demo.";

export const metadata: Metadata = {
  title: { absolute: title },
  description,
  alternates: { canonical: "/nirman-crm/" },
  openGraph: { type: "website", siteName: site.name, locale: "en_IN", url: "/nirman-crm/", title, description },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "SoftwareApplication",
      name: "Nirman CRM",
      applicationCategory: "BusinessApplication",
      operatingSystem: "Web",
      description: crmHero.line,
      featureList: features.map((f) => f.title),
      url: `${site.url}/nirman-crm/`,
      publisher: { "@id": `${site.url}/#organization` },
    },
    {
      "@type": "FAQPage",
      mainEntity: crmFaqs.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
    },
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: `${site.url}/` },
        { "@type": "ListItem", position: 2, name: "Nirman CRM", item: `${site.url}/nirman-crm/` },
      ],
    },
  ],
};

export default function NirmanCrmPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }} />
      <CrmHero />
      <CrmProblems />
      <CrmTour />
      <CrmChannels />
      <CrmIntegrations />
      <CrmAudiences />
      <CrmCustomisation />
      <CrmQuestions />
      <CrmDemo />
    </>
  );
}
