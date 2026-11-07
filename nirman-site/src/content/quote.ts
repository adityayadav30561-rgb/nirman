// /get-a-quote/ (PAGE-PLAN section 3; docs/sections/p3-get-a-quote.md).
// Rules: no prices or budget figures from us (the visitor types a budget if
// they want); Nirman CRM is a demo product, custom CRM is a service; the
// "what happens next" promises are only the approved facts (2 h reply,
// 48 h written proposal, you own everything: DECISIONS 2026-11-06).

export const quoteIntro = {
  title: "Get a quote",
  line: "Tell us what you need in four short steps. We reply within 2 working hours (IST) and send a written proposal within 48 hours of our call.",
};

export type ServiceKey = "website" | "store" | "seo" | "software" | "app" | "nirman-crm" | "custom-crm" | "marketing" | "unsure";

export const serviceOptions: { key: ServiceKey; label: string; line: string }[] = [
  { key: "website", label: "Website", line: "A new site or a redesign" },
  { key: "store", label: "Online store", line: "Sell products online" },
  { key: "seo", label: "SEO", line: "Rank higher on Google and AI search" },
  { key: "software", label: "Custom software", line: "Web apps, portals, automation" },
  { key: "app", label: "Mobile app", line: "Android and iPhone" },
  { key: "nirman-crm", label: "Nirman CRM", line: "Our ready CRM, set up for you" },
  { key: "custom-crm", label: "Custom CRM", line: "A CRM built around your process" },
  { key: "marketing", label: "WhatsApp and email marketing", line: "Campaigns and follow-ups" },
  { key: "unsure", label: "Not sure yet", line: "We will help you decide" },
];

/** Values sent by the homepage quote bar (content/map.ts) mapped to the options above. */
export const fromQuoteBar: Record<string, ServiceKey> = {
  Websites: "website",
  SEO: "seo",
  "Custom software": "software",
  "Marketing automation": "marketing",
  "Not sure yet": "unsure",
};

export const timelines = ["As soon as possible", "1 to 3 months", "3 to 6 months", "Just exploring"];
export const locations = ["India", "United Arab Emirates", "United Kingdom", "United States", "Somewhere else"];
export const contactWays = ["WhatsApp", "Email", "Phone call"];

export const steps = [
  { key: "need", label: "What you need", title: "What can we help you with?", line: "Choose one or more." },
  { key: "details", label: "Details", title: "Tell us about the project", line: "A few lines are enough. We will ask the rest on the call." },
  { key: "budget", label: "Budget", title: "Do you have a budget in mind?", line: "Optional. It helps us suggest the right scope; you can also discuss it on the call." },
  { key: "contact", label: "Contact", title: "Where should we reply?", line: "We reply within 2 working hours (IST)." },
] as const;

export const nextSteps = [
  { title: "We reply within 2 working hours", line: "Working hours in India (IST), on WhatsApp, email or a call." },
  { title: "A short call", line: "We understand your business, goals and timeline." },
  { title: "A written proposal within 48 hours", line: "Scope, plan and cost in writing, after our call." },
  { title: "You own everything", line: "Your code, content and data are yours." },
];
