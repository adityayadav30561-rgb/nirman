// Site footer (docs/sections/08-footer.md). Only pages that exist are linked
// (user, 2026-11-11: Industries removed; tools return with P6). Social profiles are placeholders with generic icons (no brand
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
      { label: "Free SEO audit", href: "/tools/seo-audit/" },
      { label: "Blog", href: "/blog/" },
      { label: "Book a demo", href: "/nirman-crm/#book-a-demo" },
      { label: "Get a quote", href: "/get-a-quote/" },
    ],
  },
];

export const legalLinks: NavLink[] = [
  { label: "Privacy policy", href: "/privacy-policy/" },
  { label: "Terms", href: "/terms/" },
];

/** Placeholder profiles: generic icons. An entry is shown only once its href is a real address (not "#"). */
export type SocialIcon = "network" | "video" | "articles";
export const socialLinks: { label: string; href: string; icon: SocialIcon }[] = [
  { label: "Nirman on a professional network (placeholder)", href: "#", icon: "network" },
  { label: "Nirman video channel (placeholder)", href: "#", icon: "video" },
  { label: "Nirman articles (placeholder)", href: "#", icon: "articles" },
];

export const contactNote = "Reply within 2 working hours (IST)";
export const servedNote = "India and worldwide";
