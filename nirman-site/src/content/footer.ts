// Site footer (docs/sections/08-footer.md). Links follow PAGE-PLAN option B
// (18 pages). Social profiles are placeholders with generic icons (no brand
// logos: client rule) until the client says which profiles exist.

import type { NavLink } from "@/content/nav";

export const footerBlurb =
  "Nirman builds websites, runs SEO, develops custom software and mobile apps, and automates WhatsApp and email follow-ups with Nirman CRM.";

export const footerColumns: { title: string; links: NavLink[] }[] = [
  {
    title: "Company",
    links: [
      { label: "About", href: "/about/" },
      { label: "Our work", href: "/work/" },
      { label: "Industries", href: "/industries/" },
      { label: "Contact", href: "/contact/" },
    ],
  },
  {
    title: "Services",
    links: [
      { label: "SEO", href: "/services/seo/" },
      { label: "Websites", href: "/services/websites/" },
      { label: "Custom software", href: "/services/software/" },
      { label: "Marketing automation", href: "/services/marketing/" },
      { label: "Nirman CRM", href: "/nirman-crm/" },
    ],
  },
  {
    title: "Resources",
    links: [
      { label: "Free tools", href: "/tools/" },
      { label: "Free SEO audit", href: "/tools/seo-audit/" },
      { label: "Blog", href: "/blog/" },
      { label: "Get a quote", href: "/get-a-quote/" },
    ],
  },
];

export const legalLinks: NavLink[] = [
  { label: "Privacy policy", href: "/privacy-policy/" },
  { label: "Terms", href: "/terms/" },
];

/** Placeholder profiles: generic icons, replace href and label when real profiles exist. */
export type SocialIcon = "network" | "video" | "articles";
export const socialLinks: { label: string; href: string; icon: SocialIcon }[] = [
  { label: "Nirman on a professional network (placeholder)", href: "#", icon: "network" },
  { label: "Nirman video channel (placeholder)", href: "#", icon: "video" },
  { label: "Nirman articles (placeholder)", href: "#", icon: "articles" },
];

export const contactNote = "Reply within 2 working hours (IST)";
export const servedNote = "India and worldwide";
