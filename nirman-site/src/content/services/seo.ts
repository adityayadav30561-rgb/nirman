import type { Service } from "./types";

// SEO pillar: hub + 4. Content written in P4.3.

export const seoServices: Service[] = [
  {
    path: "/services/seo/",
    kind: "hub",
    pillar: "seo",
    name: "SEO",
    serviceType: "Search engine optimization",
    visual: "seo",
    related: ["/services/web/", "/services/marketing/"],
    tools: ["/tools/seo-audit/", "/tools/serp-preview/"],
  },
  {
    path: "/services/seo/local-seo/",
    kind: "detail",
    pillar: "seo",
    name: "Local SEO",
    serviceType: "Local SEO and Google Business Profile management",
    visual: "seo",
    related: ["/services/seo/technical-seo/", "/services/web/website-design/"],
    tools: ["/tools/gbp-checker/", "/tools/seo-audit/"],
  },
  {
    path: "/services/seo/ecommerce-seo/",
    kind: "detail",
    pillar: "seo",
    name: "E-commerce SEO",
    serviceType: "E-commerce SEO",
    visual: "seo",
    related: ["/services/web/ecommerce-websites/", "/services/seo/technical-seo/"],
    tools: ["/tools/seo-audit/", "/tools/schema-generator/"],
  },
  {
    path: "/services/seo/technical-seo/",
    kind: "detail",
    pillar: "seo",
    name: "Technical SEO",
    serviceType: "Technical SEO and site audit",
    visual: "seo",
    related: ["/services/web/website-development/", "/services/seo/ai-search-optimization/"],
    tools: ["/tools/seo-audit/", "/tools/sitemap-generator/"],
  },
  {
    path: "/services/seo/ai-search-optimization/",
    kind: "detail",
    pillar: "seo",
    name: "AI search optimization",
    serviceType: "Generative engine optimization (GEO) and answer engine optimization (AEO)",
    visual: "seo",
    related: ["/services/seo/technical-seo/", "/services/seo/local-seo/"],
    tools: ["/tools/schema-generator/", "/tools/seo-audit/"],
  },
];
