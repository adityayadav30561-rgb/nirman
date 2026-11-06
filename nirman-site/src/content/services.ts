// The four service lines shown in "What we do" (docs/sections/03-services.md).
// Copy is a draft for the user to change. No prices; no PPC or social media
// marketing.

export type ServiceKey = "websites" | "seo" | "software" | "marketing";

export type ServiceLine = { key: ServiceKey; title: string; line: string; href: string; cta: string };

export const serviceLines: ServiceLine[] = [
  {
    key: "websites",
    title: "Websites",
    line: "Fast, mobile-first websites and online stores that turn visitors into enquiries.",
    href: "/services/websites/",
    cta: "Explore websites",
  },
  {
    key: "seo",
    title: "SEO",
    line: "Local, technical and AI-search SEO, so customers find you before your competitors.",
    href: "/services/seo/",
    cta: "Explore SEO",
  },
  {
    key: "software",
    title: "Custom software",
    line: "CRMs, web apps and mobile apps built around the way your team works.",
    href: "/services/software/",
    cta: "Explore software",
  },
  {
    key: "marketing",
    title: "Marketing automation",
    line: "WhatsApp and email follow-ups that run on their own through Nirman CRM.",
    href: "/services/marketing/",
    cta: "Explore automation",
  },
];

export const servicesIntro = {
  title: "Everything your business needs to grow online.",
  line: "Four services from one team, so your website, search, software and follow-ups work together.",
};
