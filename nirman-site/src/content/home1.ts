// Copy and data for the v3 homepage design (/homepage1/). See docs/REDESIGN.md §6.
// Every claim here is either a policy from docs/handoff.md or marked as sample.
// Links point only at pages that exist today; new URLs from the sitemap plan
// replace them as those pages are built.

export const heroCopy = {
  headline: ["Build better.", "Grow smarter."],
  // AEO: the entity definition sits directly under the headline.
  definition:
    "Nirman is a digital agency and software company in India. We build websites, run SEO, develop custom software and mobile apps, and automate WhatsApp and email marketing with our own product, Nirman CRM.",
  note: "Free 15-minute call. No obligation.",
} as const;

export const promises = [
  { icon: "clock", title: "Replies in 2 working hours", body: "A real person, during Indian working hours (IST)." },
  { icon: "file", title: "Written proposal in 48 hours", body: "Scope, timeline and how we would work together." },
  { icon: "key", title: "You own it all", body: "Code, content, domain and CRM data are yours." },
  { icon: "chart", title: "Reports you can read", body: "Plain-language updates, every month." },
] as const;

export type PillarTone = "cobalt" | "coral" | "ink" | "rose";

export const pillarCards = [
  {
    id: "seo",
    tone: "cobalt" as PillarTone,
    title: "SEO",
    outcome: "Be found on Google, in Maps and in AI answers, with a monthly report you can read.",
    children: [
      { label: "Local SEO", href: "/services/seo/local-seo/" },
      { label: "E-commerce SEO", href: "/services/seo/ecommerce-seo/" },
      { label: "AI search optimization", href: "/services/seo/ai-search-optimization/" },
    ],
    hub: { label: "Explore SEO services", href: "/services/seo/" },
  },
  {
    id: "web",
    tone: "coral" as PillarTone,
    title: "Websites",
    outcome: "Fast, clear websites and online stores that explain what you do in five seconds.",
    children: [
      { label: "Website design", href: "/services/web/website-design/" },
      { label: "E-commerce websites", href: "/services/web/ecommerce-websites/" },
      { label: "WordPress", href: "/services/web/wordpress-development/" },
    ],
    hub: { label: "Explore website services", href: "/services/web/" },
  },
  {
    id: "software",
    tone: "ink" as PillarTone,
    title: "Custom software",
    outcome: "CRMs, web apps and mobile apps built around how your business actually runs.",
    children: [
      { label: "CRM development", href: "/services/software/crm-development/" },
      { label: "Web apps and SaaS", href: "/services/software/web-apps/" },
      { label: "Mobile apps", href: "/services/software/mobile-apps/" },
    ],
    hub: { label: "Explore software services", href: "/services/software/" },
  },
  {
    id: "marketing",
    tone: "rose" as PillarTone,
    title: "Marketing automation",
    outcome: "WhatsApp and email campaigns and follow-ups that run themselves from Nirman CRM.",
    children: [
      { label: "WhatsApp marketing", href: "/services/marketing/whatsapp-marketing/" },
      { label: "Email marketing", href: "/services/marketing/email-marketing/" },
      { label: "Nirman CRM", href: "/crm/" },
    ],
    hub: { label: "Explore marketing services", href: "/services/marketing/" },
  },
] as const;

export const band = {
  lines: ["Fast websites.", "SEO that answers questions.", "Software that fits the way you work."],
} as const;

/** Durations match the website timings on the service pages (3 to 6 weeks for a business site). */
export const method = [
  {
    title: "Consultation and discovery",
    body: "Real conversations about your goals, customers and problems, before any plan. You get a written scope you approve.",
    duration: "Week 1",
    photo: "stickyWall",
    art: "sw-scope",
  },
  {
    title: "Architecture and design",
    body: "The structure, screens and technical roadmap, for desktop and phone, approved by you before we build.",
    duration: "Weeks 2–3",
    photo: "designerTablet",
    art: "web-design",
  },
  {
    title: "Code and build",
    body: "Built in weekly pieces you can click through on a test link, with a demo at the end of every sprint.",
    duration: "Weeks 3–5",
    photo: "codeScreen",
    art: "sw-sprint",
  },
  {
    title: "Quality check and launch",
    body: "Speed, SEO, forms and tracking tested on real phones, then a planned go-live and a handover session.",
    duration: "Week 6",
    photo: "dualMonitors",
    art: "web-launch",
  },
  {
    title: "Support and growth",
    body: "Fixes, updates and a monthly report on what is working, so your site and software keep earning.",
    duration: "Monthly",
    photo: "laptopDashboard",
    art: "seo-report",
  },
] as const;

export const industries = [
  { slug: "real-estate", icon: "building", title: "Real estate", need: "Capture every enquiry and book site visits." },
  { slug: "healthcare-clinics", icon: "stethoscope", title: "Healthcare and clinics", need: "Fill appointment slots and cut no-shows." },
  { slug: "education", icon: "graduation", title: "Education and coaching", need: "Turn admission enquiries into enrolments." },
  { slug: "ecommerce-retail", icon: "bag", title: "E-commerce and retail", need: "Rank for products and recover abandoned carts." },
  { slug: "manufacturing-b2b", icon: "factory", title: "Manufacturing and B2B", need: "Win bulk enquiries and track every quote." },
  { slug: "hospitality-travel", icon: "hotel", title: "Hospitality and travel", need: "Get direct bookings, not only listings." },
  { slug: "finance-insurance", icon: "landmark", title: "Finance and insurance", need: "Follow up leads and renewals on time." },
  { slug: "local-services", icon: "wrench", title: "Local services", need: "Show up in Maps and get more calls." },
] as const;

/** Answers are plain text on purpose: the same strings feed the visible FAQ and the FAQPage JSON-LD. */
export const quickAnswers = [
  {
    q: "What does Nirman do?",
    a: "Nirman is a digital agency and software company in India. We build and redesign websites, run SEO, develop custom software and mobile apps, and run WhatsApp and email marketing through our own product, Nirman CRM.",
  },
  {
    q: "Who do you work with?",
    a: "Small and mid-sized businesses and growing teams in India, the US, the UAE, the UK and elsewhere, in sectors such as real estate, healthcare, education, e-commerce, manufacturing, hospitality, finance and local services. We work remotely and book calls in your time zone.",
  },
  {
    q: "What is Nirman CRM?",
    a: "Nirman CRM is our own ready-to-use CRM with WhatsApp and email built in. It captures leads from your website and other sources, tracks every deal in a pipeline and automates follow-ups. Book a demo to see it. If your process is unusual, we customise it or build a CRM from scratch.",
  },
  {
    q: "How long does a project take?",
    a: "A business website usually takes 3 to 6 weeks. Online stores take longer, and the first version of custom software or a mobile app usually takes 8 to 16 weeks. We share a week-by-week plan before we start.",
  },
  {
    q: "How much does a website, SEO or software project cost?",
    a: "It depends on scope, so we quote every project after a short call. Tell us what you need on the quote form and you will get a written proposal within 48 hours.",
  },
  {
    q: "When will I see results from SEO?",
    a: "Technical fixes show up within weeks. Rankings for competitive searches usually take 3 to 6 months. You get a monthly report either way, so you can see what is moving.",
  },
  {
    q: "What is AI search optimization (GEO and AEO)?",
    a: "It means making your business easy for AI tools such as ChatGPT, Perplexity and Google AI Overviews to find, understand and cite. It builds on SEO and adds clear answers, consistent business facts and structured data. Nobody can guarantee a mention, so we measure it every month.",
  },
  {
    q: "Do I own my website, code and data?",
    a: "Yes. The code, content, domain and CRM data are yours, and we hand over every login at launch.",
  },
] as const;

export const finalCta = {
  title: "Tell us what you want to achieve",
  intro: "Share a few details and we will come back with questions, ideas and a written quote.",
} as const;
