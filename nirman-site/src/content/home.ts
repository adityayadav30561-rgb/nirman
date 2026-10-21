// Homepage copy and data, ported from the handoff project
// (E:/nirman/website/src/content/home.ts) without the old design's art and
// layout fields. Components switch to this file in Phase 2.
//
// Anything with `sample: true` is a placeholder: replace it with real clients,
// numbers and people before launch, and never present it as real.

export const hero = {
  // Decision C4: keep this headline, use the handoff's CTAs and note.
  headline: ["Build better.", "Grow smarter."],
  intro: "Websites, SEO, CRM systems and digital products designed to move your business forward.",
  primary: { label: "Get a free SEO audit", href: "/tools/seo-audit/" },
  secondary: { label: "Book a consultation", href: "/book-a-call/" },
  note: "Free 15-minute call. No obligation.",
} as const;

/** The 4 service pillars (handoff §4). The homepage grid shows 6 cards (decision C3), each tagged with one of these. */
export const servicePillars = [
  {
    id: "seo",
    title: "SEO",
    body: "Get found on Google, in maps and in AI answers, with monthly reports you can read.",
    href: "/services/seo/",
    links: [
      { label: "Local SEO", href: "/services/seo/local-seo/" },
      { label: "E-commerce SEO", href: "/services/seo/ecommerce-seo/" },
      { label: "AI search", href: "/services/seo/ai-search-optimization/" },
    ],
  },
  {
    id: "web",
    title: "Website design & development",
    body: "Fast, mobile-first websites and online stores that are built to rank from day one.",
    href: "/services/web/",
    links: [
      { label: "Website design", href: "/services/web/website-design/" },
      { label: "E-commerce", href: "/services/web/ecommerce-websites/" },
      { label: "WordPress", href: "/services/web/wordpress-development/" },
    ],
  },
  {
    id: "software",
    title: "Custom software & apps",
    body: "CRMs, web apps and mobile apps shaped around how your team already works.",
    href: "/services/software/",
    links: [
      { label: "CRM development", href: "/services/software/crm-development/" },
      { label: "Web apps", href: "/services/software/web-apps/" },
      { label: "Mobile apps", href: "/services/software/mobile-apps/" },
    ],
  },
  {
    id: "marketing",
    title: "WhatsApp & email marketing",
    body: "Broadcasts, drip campaigns and automatic follow-ups, sent from your own CRM.",
    href: "/services/marketing/",
    links: [
      { label: "WhatsApp marketing", href: "/services/marketing/whatsapp-marketing/" },
      { label: "Email marketing", href: "/services/marketing/email-marketing/" },
      { label: "Automation", href: "/services/marketing/" },
    ],
  },
] as const;

export type PillarId = (typeof servicePillars)[number]["id"];

/** Which pillar each of the 6 homepage cards belongs to (decision C3). */
export const cardPillar: Record<"seo" | "web" | "crm" | "software" | "apps" | "marketing", PillarId> = {
  seo: "seo",
  web: "web",
  crm: "software",
  software: "software",
  apps: "software",
  marketing: "marketing",
};

export const crm = {
  title: "Customer relationships. Without the chaos.",
  subtitle:
    "Nirman CRM helps businesses organise leads, manage customer relationships, streamline sales activities, and bring greater visibility to their sales pipeline.",
  // Decision C5: every CRM CTA is "Book a demo".
  primary: { label: "Book a demo", href: "/book-a-call/?type=crm-demo" },
  secondary: { label: "Need a custom CRM?", href: "/services/software/crm-development/" },
} as const;

export const crmFeatures = [
  { icon: "leads", title: "Lead capture", body: "Every form, call and WhatsApp chat lands in one list." },
  { icon: "whatsapp", title: "WhatsApp inbox", body: "Your whole team replies from one shared number." },
  { icon: "email", title: "Email campaigns", body: "Newsletters and drip sequences, no extra tool." },
  { icon: "pipeline", title: "Sales pipeline", body: "See every deal by stage and who owns it." },
  { icon: "automation", title: "Automations", body: "Follow up on day 1, 3 and 7 without remembering to." },
  { icon: "reports", title: "Reports", body: "Which channel brings leads, and which ones close." },
] as const;

export const crmCallouts = [
  { title: "WhatsApp-first", body: "Built for how India sells: chats, not forms." },
  { title: "Fits your process", body: "We tailor stages, fields and automations to you." },
] as const;

/** Decision C6: the handoff's 5 journey stages. */
export const journey = [
  { title: "Consultation & discovery", body: "Real conversations about your goals, customers and problems, before any plan." },
  { title: "Architecture & design", body: "The right structure, screens and technical roadmap, approved by you first." },
  { title: "Code & build", body: "Built in weekly pieces you can click through on a test link." },
  { title: "Quality check & launch", body: "Speed, SEO, forms and tracking tested on real phones, then a smooth launch." },
  { title: "Ongoing support & growth", body: "Fixes, updates and monthly reports, so your site keeps working for you." },
] as const;

/**
 * SAMPLE case studies: names and numbers are invented placeholders. Names
 * match the concept brands in the homepage visuals (mitti, Neelgiri).
 */
export const caseStudies = [
  {
    sample: true,
    client: "Mitti Ceramics",
    industry: "E-commerce, handmade ceramics",
    body: "A new Shopify store and product-page SEO for a family pottery studio selling across India and abroad.",
    metrics: [
      { value: "3.2×", label: "organic traffic in 6 months" },
      { value: "41%", label: "of sales now from search" },
    ],
  },
  {
    sample: true,
    client: "Neelgiri Retreat",
    industry: "Hospitality, hill resort",
    body: "Booking website, Google Business Profile and WhatsApp follow-ups for every enquiry.",
    metrics: [
      { value: "2.4×", label: "direct bookings" },
      { value: "4 min", label: "average reply time" },
    ],
  },
  {
    sample: true,
    client: "Sharma Builders",
    industry: "Real estate, residential projects",
    body: "Nirman CRM set up for site-visit bookings, with WhatsApp reminders and a sales pipeline.",
    metrics: [
      { value: "62%", label: "more site visits booked" },
      { value: "0", label: "leads lost in spreadsheets" },
    ],
  },
  {
    sample: true,
    client: "Kala Learning",
    industry: "Education, coaching institute",
    body: "Course website, local SEO for three branches and an email nurture for admissions season.",
    metrics: [
      { value: "#1", label: "on Maps in 3 cities" },
      { value: "2.1×", label: "admission enquiries" },
    ],
  },
] as const;

/** SAMPLE team: replace with the real team (names, roles, photos). */
export const team = [
  { sample: true, name: "Arjun Mehta", role: "Founder, strategy" },
  { sample: true, name: "Priya Nair", role: "Lead developer" },
  { sample: true, name: "Rohan Gupta", role: "SEO lead" },
  { sample: true, name: "Gurpreet Singh", role: "CRM engineer" },
  { sample: true, name: "Imran Khan", role: "Full-stack developer" },
  { sample: true, name: "Ananya Rao", role: "UI/UX designer" },
  { sample: true, name: "Meera Iyer", role: "Content strategist" },
  { sample: true, name: "Dev Patel", role: "Mobile developer" },
] as const;

/** SAMPLE testimonials: replace with real quotes, names and companies. */
export const testimonials = [
  {
    sample: true,
    quote:
      "They rebuilt our site and set up the CRM in one go. Enquiries come in on WhatsApp and nobody forgets to reply any more.",
    name: "Client name",
    role: "Owner, real estate firm",
  },
  {
    sample: true,
    quote:
      "The SEO reports are short and honest. We can see which pages bring calls, and what they are fixing next month.",
    name: "Client name",
    role: "Marketing head, clinic chain",
  },
  {
    sample: true,
    quote: "They told us what not to build. That saved us two months and a lot of money.",
    name: "Client name",
    role: "Founder, SaaS startup",
  },
] as const;

export const faqs = [
  {
    q: "How much does a website or SEO project cost?",
    a: "It depends on scope, so we quote every project after a short call. Tell us what you need on the quote form and you will get a written proposal within 48 hours.",
  },
  {
    q: "How long does it take to build a website?",
    a: "A business website usually takes 3 to 6 weeks. Online stores and custom software take longer; we share a week-by-week plan before we start.",
  },
  {
    q: "When will I see SEO results?",
    a: "Technical fixes show up within weeks. Rankings for competitive keywords usually take 3 to 6 months. You get a monthly report either way.",
  },
  {
    q: "Is Nirman CRM a product or something you build for me?",
    a: "Both. Nirman CRM is ready to use, with WhatsApp and email built in. If your process is unusual, we customise it or build a CRM from scratch.",
  },
  {
    q: "Do you work with clients outside India?",
    a: "Yes. We work with clients in India and abroad. Calls are booked in your time zone and we reply within 2 working hours.",
  },
  {
    q: "Do I own my website and data?",
    a: "Yes. The code, content, domain and CRM data are yours, and we hand over every login at launch.",
  },
] as const;
