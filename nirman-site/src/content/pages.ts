// Every static page from handoff §2, in one list. Feeds app/sitemap.ts,
// app/llms.txt and the stub routes (P3.4), so a page added here shows up in all three.
// `title` is the meta title (the root template adds " | Nirman") and the stub H1.
// CMS pages (/work/[slug]/, /blog/[slug]/) are added to the sitemap in Phase 9.

export type PageSection = "core" | "product" | "services" | "tools" | "legal";

export type PageEntry = {
  path: string;
  title: string;
  description: string;
  section: PageSection;
  /** Kept out of the sitemap and llms.txt, and served with noindex. */
  noindex?: boolean;
};

export const pages: PageEntry[] = [
  // Core
  {
    path: "/",
    title: "Nirman: SEO, websites, custom software and Nirman CRM",
    description:
      "Nirman builds websites, runs SEO, develops custom software and mobile apps, and automates WhatsApp and email marketing with Nirman CRM, for businesses in India and worldwide.",
    section: "core",
  },
  {
    path: "/about/",
    title: "About Nirman",
    description: "Who we are, how we work and the team behind Nirman's websites, SEO, custom software and Nirman CRM.",
    section: "core",
  },
  {
    path: "/contact/",
    title: "Contact us",
    description: "Write to Nirman, call us or book a short call to talk about your website, SEO, software or CRM project.",
    section: "core",
  },
  {
    path: "/get-a-quote/",
    title: "Get a quote",
    description: "Tell us what you need and get a written proposal for your website, SEO, software or marketing automation project.",
    section: "core",
  },
  {
    path: "/work/",
    title: "Our work",
    description: "Case studies from Nirman: websites, SEO, custom software and CRM projects, with the problem, the work and the outcome.",
    section: "core",
  },
  {
    path: "/industries/",
    title: "Industries we work with",
    description: "How Nirman helps businesses across eight industries with websites, SEO, custom software and CRM automation.",
    section: "core",
  },
  {
    path: "/blog/",
    title: "Blog",
    description: "Practical guides on SEO, websites, custom software, CRM and WhatsApp and email marketing from the Nirman team.",
    section: "core",
  },
  {
    path: "/book-a-call/",
    title: "Book a call",
    description: "Pick a time for a free call with Nirman about your project, or book a demo of Nirman CRM.",
    section: "core",
  },
  {
    path: "/careers/",
    title: "Careers",
    description: "Work at Nirman: how we work, how we hire and the roles we are looking for.",
    section: "core",
  },
  {
    path: "/thank-you/",
    title: "Thank you",
    description: "Thanks for getting in touch. We have your message and will get back to you soon.",
    section: "core",
    noindex: true,
  },

  // Product
  {
    path: "/crm/",
    title: "Nirman CRM",
    description:
      "Nirman CRM brings leads, contacts, WhatsApp and email campaigns and follow-ups into one place. Book a demo to see it with your own data.",
    section: "product",
  },

  // Services: SEO
  {
    path: "/services/seo/",
    title: "SEO services",
    description: "SEO services from Nirman: technical fixes, content and local SEO that bring more qualified visitors from Google and AI search.",
    section: "services",
  },
  {
    path: "/services/seo/local-seo/",
    title: "Local SEO and Google Business Profile",
    description: "Rank in local results and Google Maps with an optimised Google Business Profile, local pages and consistent listings.",
    section: "services",
  },
  {
    path: "/services/seo/ecommerce-seo/",
    title: "E-commerce SEO",
    description: "SEO for online stores: category and product pages, structured data and site speed that turn search traffic into orders.",
    section: "services",
  },
  {
    path: "/services/seo/technical-seo/",
    title: "Technical SEO and site audit",
    description: "A full technical SEO audit and the fixes that follow: crawling, indexing, Core Web Vitals, structured data and redirects.",
    section: "services",
  },
  {
    path: "/services/seo/ai-search-optimization/",
    title: "AI search optimization (GEO and AEO)",
    description: "Get your business cited in Google AI Overviews, ChatGPT and Perplexity with content and structure that AI search can quote.",
    section: "services",
  },

  // Services: Web
  {
    path: "/services/web/",
    title: "Website design and development",
    description: "Fast, search-ready websites designed and built by Nirman, from business sites to online stores and WordPress.",
    section: "services",
  },
  {
    path: "/services/web/website-design/",
    title: "Website design",
    description: "Website design that makes your offer clear and turns visitors into enquiries, on every screen size.",
    section: "services",
  },
  {
    path: "/services/web/website-development/",
    title: "Website development",
    description: "Website development on modern frameworks: fast pages, clean code, built-in SEO and easy content editing.",
    section: "services",
  },
  {
    path: "/services/web/ecommerce-websites/",
    title: "E-commerce websites (Shopify and WooCommerce)",
    description: "Online stores on Shopify or WooCommerce, set up for payments, shipping, search and repeat orders.",
    section: "services",
  },
  {
    path: "/services/web/wordpress-development/",
    title: "WordPress development",
    description: "Custom WordPress themes, plugins and speed fixes for sites your team can update without a developer.",
    section: "services",
  },
  {
    path: "/services/web/redesign-maintenance/",
    title: "Website redesign and maintenance",
    description: "Redesign an ageing website without losing rankings, then keep it updated, secure and fast with ongoing maintenance.",
    section: "services",
  },

  // Services: Software
  {
    path: "/services/software/",
    title: "Custom software development",
    description: "Custom software, CRMs, web apps and mobile apps built around how your business actually works.",
    section: "services",
  },
  {
    path: "/services/software/crm-development/",
    title: "CRM development",
    description: "A custom CRM built for your sales process, or Nirman CRM extended and integrated with the tools you already use.",
    section: "services",
  },
  {
    path: "/services/software/web-apps/",
    title: "Web apps and SaaS development",
    description: "Web applications and SaaS products, from first version to scale: dashboards, portals, booking and billing systems.",
    section: "services",
  },
  {
    path: "/services/software/mobile-apps/",
    title: "Mobile app development",
    description: "Android and iOS apps for customers and teams, designed, built and published by Nirman.",
    section: "services",
  },
  {
    path: "/services/software/automation-integrations/",
    title: "Automation and integrations",
    description: "Connect your apps and automate repeat work: API integrations, data sync, workflows and reports.",
    section: "services",
  },

  // Services: Marketing
  {
    path: "/services/marketing/",
    title: "Marketing automation via CRM",
    description: "WhatsApp and email marketing run from Nirman CRM: segmented campaigns, automated follow-ups and clear reporting.",
    section: "services",
  },
  {
    path: "/services/marketing/whatsapp-marketing/",
    title: "WhatsApp marketing",
    description: "WhatsApp Business API campaigns, broadcasts and automated replies, sent and tracked from Nirman CRM.",
    section: "services",
  },
  {
    path: "/services/marketing/email-marketing/",
    title: "Email marketing",
    description: "Email newsletters, drip sequences and transactional emails that reach the inbox, managed from Nirman CRM.",
    section: "services",
  },

  // Free tools
  {
    path: "/tools/",
    title: "Free SEO and marketing tools",
    description: "Free tools from Nirman: SEO audit, SERP preview, schema and sitemap generators, Google Business Profile checker and WhatsApp links.",
    section: "tools",
  },
  {
    path: "/tools/seo-audit/",
    title: "Free SEO audit",
    description: "Run a free SEO audit of any page: technical checks, on-page SEO, speed and structured data, with a clear fix list.",
    section: "tools",
  },
  {
    path: "/tools/serp-preview/",
    title: "Meta tag and SERP preview",
    description: "Preview how your title and meta description look in Google search results on desktop and mobile.",
    section: "tools",
  },
  {
    path: "/tools/schema-generator/",
    title: "Schema markup generator",
    description: "Generate JSON-LD structured data for Organization, LocalBusiness, FAQ, Product and Article pages.",
    section: "tools",
  },
  {
    path: "/tools/sitemap-generator/",
    title: "Sitemap and robots.txt generator",
    description: "Create an XML sitemap and a robots.txt file for your website in a few clicks.",
    section: "tools",
  },
  {
    path: "/tools/gbp-checker/",
    title: "Google Business Profile checker",
    description: "Check how complete your Google Business Profile is and what to fix to show up in local results.",
    section: "tools",
  },
  {
    path: "/tools/whatsapp-link/",
    title: "WhatsApp link and QR code generator",
    description: "Create a click-to-chat WhatsApp link and QR code with a pre-filled message for your business number.",
    section: "tools",
  },

  // Legal
  {
    path: "/privacy-policy/",
    title: "Privacy policy",
    description: "How Nirman collects, uses and protects personal data from this website and our forms.",
    section: "legal",
  },
  {
    path: "/terms/",
    title: "Terms of use",
    description: "Terms for using the Nirman website and its free tools.",
    section: "legal",
  },
];

export const indexedPages = pages.filter((p) => !p.noindex);

export function pageByPath(path: string) {
  return pages.find((p) => p.path === path);
}
