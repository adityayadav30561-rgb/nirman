// Single source of truth for brand, contact details and navigation.
// Values marked "placeholder" must be replaced before launch (handoff §1:
// domain, WhatsApp number, phone and address are still pending).

export const site = {
  name: "Nirman",
  descriptor: "Digital",
  tagline: "Websites, SEO, custom software and CRM automation",
  description:
    "Nirman builds websites, runs SEO, develops custom software and mobile apps, and automates WhatsApp and email marketing with Nirman CRM, for businesses in India and worldwide.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.example.com", // placeholder until the domain is shared
  email: "hello@example.com", // placeholder
  phone: "+91 00000 00000", // placeholder
  phoneHref: "tel:+910000000000", // placeholder
  whatsappHref: "https://wa.me/910000000000", // placeholder
  address: "Office address, City, State, India", // placeholder
  copyrightYear: 2026,
  // Points at the homepage contact section until /book-a-call/ exists (P3.4 / P5.4).
  bookingUrl: "#contact",
  social: [
    { label: "LinkedIn", href: "#" }, // placeholder
    { label: "Instagram", href: "#" }, // placeholder
    { label: "X", href: "#" }, // placeholder
  ],
} as const;

export type NavLink = { label: string; href: string };
export type NavGroup = { title: string; href: string; links: NavLink[] };

/** Services dropdown: the 4 pillars from handoff §2 with their child pages. */
export const serviceGroups: NavGroup[] = [
  {
    title: "SEO",
    href: "/services/seo/",
    links: [
      { label: "SEO services", href: "/services/seo/" },
      { label: "Local SEO & Google Business Profile", href: "/services/seo/local-seo/" },
      { label: "E-commerce SEO", href: "/services/seo/ecommerce-seo/" },
      { label: "Technical SEO & site audit", href: "/services/seo/technical-seo/" },
      { label: "AI search optimization", href: "/services/seo/ai-search-optimization/" },
    ],
  },
  {
    title: "Website design & development",
    href: "/services/web/",
    links: [
      { label: "Website design", href: "/services/web/website-design/" },
      { label: "Website development", href: "/services/web/website-development/" },
      { label: "E-commerce websites", href: "/services/web/ecommerce-websites/" },
      { label: "WordPress development", href: "/services/web/wordpress-development/" },
      { label: "Redesign & maintenance", href: "/services/web/redesign-maintenance/" },
    ],
  },
  {
    title: "Custom software",
    href: "/services/software/",
    links: [
      { label: "Custom software development", href: "/services/software/" },
      { label: "CRM development", href: "/services/software/crm-development/" },
      { label: "Web apps & SaaS", href: "/services/software/web-apps/" },
      { label: "Mobile app development", href: "/services/software/mobile-apps/" },
      { label: "Automation & integrations", href: "/services/software/automation-integrations/" },
    ],
  },
  {
    title: "CRM marketing & automation",
    href: "/services/marketing/",
    links: [
      { label: "WhatsApp marketing", href: "/services/marketing/whatsapp-marketing/" },
      { label: "Email marketing", href: "/services/marketing/email-marketing/" },
      { label: "Marketing automation", href: "/services/marketing/" },
    ],
  },
];

/** Free tools dropdown (handoff §6). */
export const toolLinks: NavLink[] = [
  { label: "Free SEO audit", href: "/tools/seo-audit/" },
  { label: "Meta tag & SERP preview", href: "/tools/serp-preview/" },
  { label: "Schema markup generator", href: "/tools/schema-generator/" },
  { label: "Sitemap & robots.txt generator", href: "/tools/sitemap-generator/" },
  { label: "Google Business Profile checker", href: "/tools/gbp-checker/" },
  { label: "WhatsApp link & QR generator", href: "/tools/whatsapp-link/" },
];

/** Top-level header links between the two dropdowns' neighbours (handoff §3). */
export const mainNav: NavLink[] = [
  { label: "Nirman CRM", href: "/crm/" },
  { label: "Our work", href: "/work/" },
  { label: "About", href: "/about/" },
  { label: "Blog", href: "/blog/" },
];

/** Footer "Company" column (handoff §3). */
export const companyLinks: NavLink[] = [
  { label: "About", href: "/about/" },
  { label: "Our work", href: "/work/" },
  { label: "Industries", href: "/industries/" },
  { label: "Blog", href: "/blog/" },
  { label: "Careers", href: "/careers/" },
  { label: "Contact", href: "/contact/" },
  { label: "Get a quote", href: "/get-a-quote/" },
];

/** Footer bottom bar. */
export const legalLinks: NavLink[] = [
  { label: "Privacy policy", href: "/privacy-policy/" },
  { label: "Terms", href: "/terms/" },
  { label: "Sitemap", href: "/sitemap.xml" },
];

// ---------------------------------------------------------------------------
// Homepage-only anchors used by the current single-page header and footer.
// Phase 1 (P1.2/P1.3) replaces these with the multi-page navigation above.
// ---------------------------------------------------------------------------

export const nav = [
  { label: "Services", href: "#services" },
  { label: "Our Products", href: "#nirman-crm" },
  { label: "Our Work", href: "#work" },
  { label: "About Us", href: "#about" },
  { label: "Contact", href: "#contact" },
] as const;

export const services = [
  { id: "seo", label: "SEO & organic growth" },
  { id: "web", label: "Website design & development" },
  { id: "crm", label: "CRM & automation" },
  { id: "software", label: "Custom software" },
  { id: "apps", label: "Mobile apps" },
  { id: "marketing", label: "WhatsApp & email marketing" },
] as const;
