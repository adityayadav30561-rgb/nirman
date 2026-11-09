// Service pages (PAGE-PLAN section 3; docs/sections/p1-services.md). One
// template, four services. Sub-services from the handoff become "What is
// included" cards (option B: no separate sub-pages). Rules: no prices, every
// page ends in Get a quote, no PPC or social media marketing, no invented
// results or stats (only the approved facts: 2 h reply, 48 h proposal,
// 3 to 6 weeks for a typical business website, you own everything).

import type { ServiceKey as QuoteKey } from "@/content/quote";

export type ServiceSlug = "websites" | "seo" | "software" | "marketing";

export type ServicePage = {
  slug: ServiceSlug;
  quoteKey: QuoteKey;
  name: string;
  metaTitle: string;
  metaDescription: string;
  eyebrow: string;
  title: string;
  /** part of the title drawn in the accent colour */
  accent: string;
  line: string;
  points: string[];
  /** heading of the "What is included" section */
  includedTitle: string;
  audiences: { name: string; line: string }[];
  included: { title: string; line: string }[];
  steps: { title: string; line: string; receive: string }[];
  deliverables: { title: string; line: string }[];
  tools: string[];
  faqs: { q: string; a: string }[];
};

const call = { title: "A short call", line: "We learn about your business, customers and goals.", receive: "A clear list of what you need" };
const proposal = { title: "Written proposal", line: "Scope, plan, timeline and cost in writing.", receive: "Your proposal within 48 hours of the call" };

export const servicePages: Record<ServiceSlug, ServicePage> = {
  websites: {
    slug: "websites",
    quoteKey: "website",
    name: "Websites",
    metaTitle: "Website design and development for growing businesses",
    metaDescription: "Fast, mobile-first websites and online stores built by Nirman, designed to turn visitors into enquiries. A typical business website goes live in 3 to 6 weeks.",
    eyebrow: "Website design and development",
    title: "Websites that load fast and turn visitors into enquiries",
    accent: "turn visitors into enquiries",
    includedTitle: "Everything a website needs, from design to care",
    line: "We design and build mobile-first websites and online stores, with clear pages, fast loading and enquiry forms that go straight to your team.",
    points: ["A typical business website live in 3 to 6 weeks", "Built for phones first", "You own the code, content and domain"],
    audiences: [
      { name: "New businesses", line: "A professional site that explains what you do and brings the first enquiries." },
      { name: "Businesses with an old site", line: "A redesign that loads fast, works on phones and is easy to update." },
      { name: "Shops and brands", line: "An online store with payments, delivery options and order emails." },
      { name: "Clinics, schools and services", line: "Booking and enquiry forms that reach the right person at once." },
    ],
    included: [
      { title: "Website design", line: "Page layouts, look and copy structure planned around what your customers need to know." },
      { title: "Website development", line: "Fast, secure sites built with modern tools, ready for search engines from day one." },
      { title: "Online stores", line: "Shopify or WooCommerce stores with products, payments, shipping and order emails." },
      { title: "WordPress development", line: "WordPress sites you can edit yourself, built cleanly without heavy page builders." },
      { title: "Redesign and care", line: "A refresh of an existing site, then updates, backups and fixes every month." },
    ],
    steps: [
      call,
      proposal,
      { title: "Design", line: "Page layouts and the look of the site, shared for your feedback.", receive: "Designs for the main pages" },
      { title: "Build", line: "We build, connect forms and test on phones and computers.", receive: "A preview link to try everything" },
      { title: "Launch and care", line: "We go live, check speed and search setup, and hand over.", receive: "Your live site and every login" },
    ],
    deliverables: [
      { title: "A mobile-first website", line: "Every page designed for phones first, then larger screens." },
      { title: "Enquiry forms that reach you", line: "Forms send leads to your email, WhatsApp or Nirman CRM." },
      { title: "Search-ready setup", line: "Page titles, sitemap, speed and Google Search Console in place." },
      { title: "All logins handed over", line: "Domain, hosting, code and content are yours." },
    ],
    tools: ["Next.js", "WordPress", "Shopify", "WooCommerce", "Tailwind CSS", "Google Search Console", "Google Analytics"],
    faqs: [
      { q: "How long does a website take?", a: "A typical business website goes live in 3 to 6 weeks. Online stores and larger sites take longer; you get a week-by-week plan in the proposal." },
      { q: "How much does a website cost?", a: "It depends on the number of pages, features and content. We quote after a short call and send a written proposal within 48 hours." },
      { q: "Can I update the website myself?", a: "Yes. We build on tools you can edit, show you how, and can also handle updates for you every month." },
      { q: "Do I own the website?", a: "Yes. The code, content, domain and hosting accounts are yours, and we hand over every login at launch." },
    ],
  },
  seo: {
    slug: "seo",
    quoteKey: "seo",
    name: "SEO",
    metaTitle: "SEO services: local, technical, e-commerce and AI search",
    metaDescription: "Nirman's SEO services help customers find you on Google and in AI search: local SEO, technical audits, e-commerce SEO and AI search optimization, with plain monthly reports.",
    eyebrow: "SEO services",
    title: "SEO that helps customers find you before your competitors",
    accent: "find you",
    includedTitle: "Five kinds of SEO, one plan",
    line: "Local, technical, e-commerce and AI-search SEO, done in plain steps and reported every month in words you can follow.",
    points: ["A full audit to start", "Work you can see every month", "Plain monthly reports"],
    audiences: [
      { name: "Local businesses", line: "Show up in Google Maps and local searches in your area." },
      { name: "Online stores", line: "Product and category pages that rank and sell." },
      { name: "Service companies", line: "Pages that answer what buyers search for before they call." },
      { name: "Businesses abroad", line: "Rank in the UAE, the UK or the US with pages written for those markets." },
    ],
    included: [
      { title: "Local SEO and Google Business Profile", line: "Your profile, reviews, local pages and listings set up so nearby customers find you." },
      { title: "Technical SEO and site audit", line: "Speed, indexing, structure and errors checked and fixed, with a clear list of what changed." },
      { title: "E-commerce SEO", line: "Product and category pages, filters and structured data for online stores." },
      { title: "AI search optimization", line: "Clear answers, structured data and mentions so AI assistants can cite your business." },
      { title: "Content and on-page SEO", line: "Pages and articles planned around what your customers search for." },
    ],
    steps: [
      call,
      { title: "Audit", line: "We check your site, rankings, competitors and Google profile.", receive: "An audit with the issues in order of impact" },
      proposal,
      { title: "Fix and build", line: "Technical fixes first, then pages, content and local listings.", receive: "A list of every change, each month" },
      { title: "Report and improve", line: "We track rankings, traffic and enquiries and adjust the plan.", receive: "A plain monthly report" },
    ],
    deliverables: [
      { title: "Site audit", line: "Speed, indexing, structure and content issues in order of impact." },
      { title: "Keyword and page plan", line: "What to rank for, and which page answers each search." },
      { title: "Monthly report", line: "Rankings, traffic and enquiries, explained in plain words." },
      { title: "Google Business Profile setup", line: "Profile, categories, photos and review requests for local search." },
    ],
    tools: ["Google Search Console", "Google Analytics", "Google Business Profile", "PageSpeed Insights", "Ahrefs", "Screaming Frog", "Schema markup"],
    faqs: [
      { q: "When will SEO start to show results?", a: "Technical fixes help within weeks. Rankings for competitive searches take longer and depend on your market. Every month you get a plain report of what changed." },
      { q: "How much does SEO cost?", a: "It depends on your site, market and goals. We quote after an audit call and send a written proposal within 48 hours." },
      { q: "Do you guarantee first place on Google?", a: "No one can honestly guarantee rankings. We commit to clear work every month and report what it changed." },
      { q: "What is AI search optimization?", a: "Making your site easy for AI assistants to understand and quote: clear answers, structured data and consistent business details." },
    ],
  },
  software: {
    slug: "software",
    quoteKey: "software",
    name: "Custom software",
    metaTitle: "Custom software development: CRM, web apps and mobile apps",
    metaDescription: "Nirman builds custom CRMs, web apps, mobile apps and automations around the way your team works. Written plan and proposal within 48 hours of the call.",
    eyebrow: "Custom software development",
    title: "Software built around the way your team works",
    accent: "the way your team works",
    includedTitle: "Four kinds of software, built for your process",
    line: "Custom CRMs, web apps, mobile apps and automations that replace spreadsheets and copy-paste with one system your team actually uses.",
    points: ["Planned with your team", "Built in stages you can test", "You own the code and data"],
    audiences: [
      { name: "Teams on spreadsheets", line: "One system instead of files emailed back and forth." },
      { name: "Businesses with a unique process", line: "Software that follows your steps, not the other way round." },
      { name: "Founders with an idea", line: "A first version of your web or mobile app, ready to show users." },
      { name: "Companies with many tools", line: "Connections so data flows between them without retyping." },
    ],
    included: [
      { title: "CRM development", line: "A CRM built around your stages, fields and team, or Nirman CRM customised for you." },
      { title: "Web apps and SaaS", line: "Portals, dashboards and products that run in the browser." },
      { title: "Mobile apps", line: "Android and iPhone apps for your customers or your team." },
      { title: "Automation and integrations", line: "Connect forms, payments, WhatsApp, email and your other tools." },
    ],
    steps: [
      call,
      proposal,
      { title: "Plan and design", line: "Screens and flows mapped with your team before any code.", receive: "Clickable screens to review" },
      { title: "Build in stages", line: "We ship working parts every few weeks for you to test.", receive: "A test link after each stage" },
      { title: "Launch and support", line: "We go live, train your team and keep improving it.", receive: "The live system, code and documentation" },
    ],
    deliverables: [
      { title: "Working software", line: "Web, mobile or both, tested with your team." },
      { title: "Screens and flows", line: "Every screen designed and agreed before it is built." },
      { title: "Code and documentation", line: "The source code and notes on how it works, handed to you." },
      { title: "Training and support", line: "Your team shown how to use it, with help after launch." },
    ],
    tools: ["Next.js", "React", "React Native", "Node.js", "PostgreSQL", "WhatsApp Business Platform", "REST APIs"],
    faqs: [
      { q: "How long does custom software take?", a: "It depends on the size of the system. We plan it in stages and share a timeline in the written proposal, so you see working parts early." },
      { q: "How much does custom software cost?", a: "It depends on the features and integrations. We quote after a short call and send a written proposal within 48 hours." },
      { q: "Should I use Nirman CRM or a custom CRM?", a: "If your process is close to a typical sales process, Nirman CRM set up for you is faster. If it is unusual, we customise it or build one from scratch." },
      { q: "Do I own the code?", a: "Yes. The code, data and documentation are yours." },
    ],
  },
  marketing: {
    slug: "marketing",
    quoteKey: "marketing",
    name: "Marketing automation",
    metaTitle: "WhatsApp and email marketing automation with Nirman CRM",
    metaDescription: "WhatsApp and email campaigns and automatic follow-ups that run through Nirman CRM, so every enquiry is answered and every customer hears from you at the right time.",
    eyebrow: "WhatsApp and email marketing",
    title: "WhatsApp and email follow-ups that run on their own",
    accent: "run on their own",
    includedTitle: "Campaigns and follow-ups, set up for you",
    line: "We set up campaigns, welcome messages and follow-ups in Nirman CRM, so every enquiry gets an answer and every customer hears from you at the right time.",
    points: ["Official WhatsApp Business Platform", "Campaigns and automatic follow-ups", "Read, click and reply stats"],
    audiences: [
      { name: "Businesses that get many enquiries", line: "Instant replies and follow-ups so no lead goes cold." },
      { name: "Shops with repeat customers", line: "Offers and reminders that bring customers back." },
      { name: "Clinics and service businesses", line: "Appointment reminders and review requests on WhatsApp." },
      { name: "Teams that sell on WhatsApp", line: "Templates, broadcasts and one shared inbox." },
    ],
    included: [
      { title: "WhatsApp marketing", line: "Approved templates, broadcasts, quick replies and a shared team inbox." },
      { title: "Email marketing", line: "Campaigns, newsletters and welcome series with your branding." },
      { title: "Automatic follow-ups", line: "Messages that go out on their own when a lead goes quiet." },
      { title: "Lists and segments", line: "The right message to the right people, based on what they asked for." },
    ],
    steps: [
      call,
      proposal,
      { title: "Set up", line: "Nirman CRM, your WhatsApp number, email and templates connected.", receive: "A working setup on your number" },
      { title: "Launch campaigns", line: "First campaigns and follow-ups written and switched on.", receive: "Campaigns and flows running" },
      { title: "Report and improve", line: "We read the numbers and adjust messages and timing.", receive: "A monthly report on reads, replies and enquiries" },
    ],
    deliverables: [
      { title: "WhatsApp setup", line: "Your business number on the official WhatsApp Business Platform." },
      { title: "Message templates", line: "Welcome, reminder, offer and follow-up messages written for you." },
      { title: "Automations", line: "Follow-ups that run when a lead arrives or goes quiet." },
      { title: "Monthly report", line: "Reads, replies, clicks and enquiries in plain words." },
    ],
    tools: ["Nirman CRM", "WhatsApp Business Platform", "Email campaigns", "Website forms", "Google Sheets"],
    faqs: [
      { q: "Do I need Nirman CRM for this?", a: "Yes. Campaigns and follow-ups run through Nirman CRM, which we set up for you as part of the work." },
      { q: "Will my WhatsApp number get blocked?", a: "We use the official WhatsApp Business Platform, approved templates and opt-in lists, which is how businesses send messages safely." },
      { q: "How much does it cost?", a: "It depends on your setup and message volume. We quote after a short call and send a written proposal within 48 hours." },
      { q: "Do you run ads or social media?", a: "No. We focus on WhatsApp and email to the people who already contacted you or opted in." },
    ],
  },
};

export const serviceSlugs: ServiceSlug[] = ["websites", "seo", "software", "marketing"];

/** /services/ hub */
export const servicesHub = {
  title: "Services that grow your business online",
  accent: "grow your business",
  line: "Websites, SEO, custom software and WhatsApp and email marketing, from one team in India working with businesses in India and abroad.",
  steps: [
    { title: "A short call", line: "We learn about your business and goals." },
    { title: "Written proposal", line: "Scope, plan and cost within 48 hours of the call." },
    { title: "Plan and design", line: "Pages, screens or a campaign plan for your feedback." },
    { title: "Build and launch", line: "We build, test with you and go live." },
    { title: "Support and report", line: "Monthly care, reports and improvements." },
  ],
};
