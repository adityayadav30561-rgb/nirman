import type { Metadata } from "next";
import { ServiceAudiences, ServiceDeliverables, ServiceIncluded, ServiceOthers, ServiceQuestions, ServiceQuote, ServiceSteps } from "@/components/services/service-page";
import { ServiceHero } from "@/components/services/service-hero";
import { ServiceMotion } from "@/components/services/service-motion";
import { servicePages, type ServiceSlug } from "@/content/service-pages";
import { site } from "@/content/site";

// Shared route body for /services/websites/, /services/seo/, /services/software/
// and /services/marketing/ (docs/sections/p1-services.md). Each service has its
// own fixed route folder, so any other /services/... path is a real 404 (a
// [slug] route with notFound() answered 200 under Cache Components).

export function serviceMetadata(slug: ServiceSlug): Metadata {
  const s = servicePages[slug];
  const url = `/services/${s.slug}/`;
  return {
    title: s.metaTitle,
    description: s.metaDescription,
    alternates: { canonical: url },
    openGraph: { type: "website", siteName: site.name, locale: "en_IN", url, title: s.metaTitle, description: s.metaDescription },
  };
}

export function ServiceRoute({ slug }: { slug: ServiceSlug }) {
  const s = servicePages[slug];
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Service",
        name: s.eyebrow,
        serviceType: s.name,
        description: s.metaDescription,
        provider: { "@id": `${site.url}/#organization` },
        areaServed: ["IN", "AE", "GB", "US"],
        url: `${site.url}/services/${s.slug}/`,
        hasOfferCatalog: { "@type": "OfferCatalog", name: s.name, itemListElement: s.included.map((x) => ({ "@type": "Offer", itemOffered: { "@type": "Service", name: x.title, description: x.line } })) },
      },
      { "@type": "FAQPage", mainEntity: s.faqs.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })) },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: `${site.url}/` },
          { "@type": "ListItem", position: 2, name: "Services", item: `${site.url}/services/` },
          { "@type": "ListItem", position: 3, name: s.name, item: `${site.url}/services/${s.slug}/` },
        ],
      },
    ],
  };
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }} />
      <ServiceMotion>
        <ServiceHero s={s} />
        <ServiceIncluded s={s} />
        <ServiceAudiences s={s} />
        <ServiceSteps steps={s.steps} title="Five clear steps, and something in your hands after each" line="No surprises: you know what happens next and what you receive at every step." />
        <ServiceDeliverables s={s} />
        <ServiceQuestions faqs={s.faqs} title={`Questions about ${s.name === "SEO" ? "SEO" : s.name.toLowerCase()}`} />
        <ServiceQuote s={s} />
        <ServiceOthers s={s} />
      </ServiceMotion>
    </>
  );
}
