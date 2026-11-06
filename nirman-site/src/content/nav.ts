// Main navigation (docs/PAGE-PLAN.md, option B: 18 pages).

export type NavLink = { label: string; href: string; description?: string };

export const serviceLinks: NavLink[] = [
  { label: "SEO", href: "/services/seo/", description: "Local, e-commerce, technical and AI-search SEO" },
  { label: "Websites", href: "/services/websites/", description: "Design, development, e-commerce and care" },
  { label: "Custom software", href: "/services/software/", description: "CRM, web apps, mobile apps, automation" },
  { label: "Marketing automation", href: "/services/marketing/", description: "WhatsApp and email follow-ups" },
];

export const mainNav: (NavLink & { children?: NavLink[] })[] = [
  { label: "Home", href: "/" },
  { label: "Services", href: "/services/", children: serviceLinks },
  { label: "Nirman CRM", href: "/nirman-crm/" },
  { label: "Work", href: "/work/" },
  { label: "About", href: "/about/" },
  { label: "Contact", href: "/contact/" },
];

export const headerCtas = {
  primary: { label: "Get a quote", href: "/get-a-quote/" },
  secondary: { label: "Free SEO audit", href: "/tools/seo-audit/" },
} as const;
