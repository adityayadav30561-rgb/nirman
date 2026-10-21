import type { Metadata } from "next";
import { site } from "@/content/site";
import { pageByPath } from "@/content/pages";

// Page metadata and JSON-LD builders (handoff §9). Render JSON-LD with
// <JsonLd> from "@/components/json-ld". Paths are site-relative, lowercase,
// with a trailing slash ("/services/seo/").

export type JsonLdNode = Record<string, unknown>;

export function absoluteUrl(path: string) {
  return new URL(path, site.url).toString();
}

// ---------------------------------------------------------------------------
// Metadata

type PageMetaInput = {
  /** Page title without the " | Nirman" suffix; the root template adds it. */
  title: string;
  description: string;
  path: string;
  /** Use the title as given, without the template suffix (homepage). */
  absoluteTitle?: boolean;
  image?: { url: string; width: number; height: number; alt: string };
  type?: "website" | "article";
  noindex?: boolean;
};

/**
 * Metadata for one page: title, description, canonical, Open Graph and X card.
 * Always sets the share image, because a page-level openGraph/twitter object
 * replaces the root one whole (see ARCHITECTURE gotcha 23).
 */
export function pageMetadata({
  title,
  description,
  path,
  absoluteTitle = false,
  image = site.ogImage,
  type = "website",
  noindex = false,
}: PageMetaInput): Metadata {
  const fullTitle = absoluteTitle ? title : `${title} | ${site.name}`;
  return {
    title: absoluteTitle ? { absolute: title } : title,
    description,
    alternates: { canonical: path },
    openGraph: {
      title: fullTitle,
      description,
      url: path,
      siteName: site.name,
      type,
      images: [image],
    },
    twitter: { card: "summary_large_image", title: fullTitle, description, images: [image] },
    ...(noindex && { robots: { index: false, follow: true } }),
  };
}

/** pageMetadata() for a page in content/pages.ts, by path. */
export function registryMetadata(path: string): Metadata {
  const page = pageByPath(path);
  if (!page) throw new Error(`registryMetadata: ${path} is not in content/pages.ts`);
  return pageMetadata({
    title: page.title,
    description: page.description,
    path: page.path,
    absoluteTitle: page.path === "/",
    noindex: page.noindex,
  });
}

// ---------------------------------------------------------------------------
// JSON-LD

const ORG_ID = absoluteUrl("/#organization");
const BUSINESS_ID = absoluteUrl("/#business");
const WEBSITE_ID = absoluteUrl("/#website");

/** Contact values in site.ts that are still placeholders stay out of structured data. */
function real(value: string) {
  return /example\.com|00000|^Office address/.test(value) ? undefined : value;
}

const sameAs = site.social.map((s) => s.href).filter((href) => href.startsWith("http"));

export function organizationLd(): JsonLdNode {
  return {
    "@type": "Organization",
    "@id": ORG_ID,
    name: site.name,
    url: absoluteUrl("/"),
    description: site.description,
    email: real(site.email),
    ...(sameAs.length > 0 && { sameAs }),
    // TODO: add `logo` (square PNG ≥ 112px) once the brand files are final.
  };
}

/** India office. ProfessionalService is a LocalBusiness subtype. */
export function localBusinessLd({ offers = [] }: { offers?: string[] } = {}): JsonLdNode {
  return {
    "@type": "ProfessionalService",
    "@id": BUSINESS_ID,
    name: `${site.name} ${site.descriptor}`,
    url: absoluteUrl("/"),
    description: site.description,
    parentOrganization: { "@id": ORG_ID },
    email: real(site.email),
    telephone: real(site.phone),
    address: { "@type": "PostalAddress", streetAddress: real(site.address), addressCountry: "IN" },
    areaServed: [{ "@type": "Country", name: "India" }, "Worldwide"],
    ...(offers.length > 0 && {
      makesOffer: offers.map((name) => ({ "@type": "Offer", itemOffered: { "@type": "Service", name } })),
    }),
  };
}

export function websiteLd(): JsonLdNode {
  return {
    "@type": "WebSite",
    "@id": WEBSITE_ID,
    name: site.name,
    url: absoluteUrl("/"),
    inLanguage: "en",
    publisher: { "@id": ORG_ID },
  };
}

/** One service page. No offers or prices (client rule). */
export function serviceLd({
  name,
  description,
  path,
  serviceType,
}: {
  name: string;
  description: string;
  path: string;
  serviceType?: string;
}): JsonLdNode {
  return {
    "@type": "Service",
    name,
    description,
    url: absoluteUrl(path),
    serviceType: serviceType ?? name,
    provider: { "@id": ORG_ID },
    areaServed: [{ "@type": "Country", name: "India" }, "Worldwide"],
  };
}

/** Nirman CRM. No offers: the only CTA is "Book a demo". */
export function softwareApplicationLd({
  name,
  description,
  path,
}: {
  name: string;
  description: string;
  path: string;
}): JsonLdNode {
  return {
    "@type": "SoftwareApplication",
    name,
    description,
    url: absoluteUrl(path),
    applicationCategory: "BusinessApplication",
    operatingSystem: "Web",
    publisher: { "@id": ORG_ID },
  };
}

/** Free browser tools. */
export function webApplicationLd({
  name,
  description,
  path,
}: {
  name: string;
  description: string;
  path: string;
}): JsonLdNode {
  return {
    "@type": "WebApplication",
    name,
    description,
    url: absoluteUrl(path),
    applicationCategory: "BusinessApplication",
    browserRequirements: "Requires JavaScript",
    isAccessibleForFree: true,
    publisher: { "@id": ORG_ID },
  };
}

export function faqPageLd(items: readonly { q: string; a: string }[]): JsonLdNode {
  return {
    "@type": "FAQPage",
    mainEntity: items.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };
}

export function breadcrumbLd(items: readonly { label: string; href: string }[]): JsonLdNode {
  return {
    "@type": "BreadcrumbList",
    itemListElement: items.map((c, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: c.label,
      item: absoluteUrl(c.href),
    })),
  };
}

export function articleLd({
  title,
  description,
  path,
  datePublished,
  dateModified,
  author,
  image = site.ogImage.url,
}: {
  title: string;
  description: string;
  path: string;
  /** ISO 8601 date. */
  datePublished: string;
  dateModified?: string;
  author: string;
  image?: string;
}): JsonLdNode {
  return {
    "@type": "Article",
    headline: title,
    description,
    url: absoluteUrl(path),
    mainEntityOfPage: absoluteUrl(path),
    image: absoluteUrl(image),
    datePublished,
    dateModified: dateModified ?? datePublished,
    author: { "@type": "Person", name: author },
    publisher: { "@id": ORG_ID },
  };
}
