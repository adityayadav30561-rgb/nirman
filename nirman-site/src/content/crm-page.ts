// /nirman-crm/ page copy (docs/sections/p2-crm-page.md). Features follow the
// handoff (lead capture, WhatsApp inbox, email campaigns, pipeline,
// automations, reports; WhatsApp Business Platform; integrations: website
// forms, Meta lead ads, payment links, IndiaMART / JustDial). Items the
// client must confirm are listed in docs/STATUS.md. Rules: no prices, every
// call to action is "Book a demo", no WhatsApp / Facebook / Instagram logos.

import type { CrmView } from "@/components/crm/app-frame";

export const demoHref = "#book-a-demo";

export const crmHero = {
  eyebrow: "Nirman CRM",
  title: "The CRM that answers every lead on WhatsApp, email and your website.",
  line: "Nirman CRM brings website forms, WhatsApp, email, calls and ad leads into one inbox, replies in seconds, and reminds your team to follow up, so no enquiry goes cold.",
  cta: "Book a demo",
  facts: ["One inbox for every channel", "Instant first reply", "Set up with you, in your process"],
};

export const problems = {
  title: "What changes when your leads live in one place",
  items: [
    { before: "Enquiries scattered across phones, inboxes and forms", after: "Every enquiry in one shared inbox, with its full history" },
    { before: "Replies come hours later, after the lead has called someone else", after: "An instant first reply on WhatsApp or email, day and night" },
    { before: "Follow-ups depend on someone remembering", after: "Reminders and automatic follow-ups until the lead answers" },
    { before: "No clear view of what brings business", after: "Reports on sources, reply times, team and deals won" },
  ],
};

export type Feature = { key: CrmView; label: string; title: string; line: string; points: string[] };

export const features: Feature[] = [
  { key: "leads", label: "Lead capture", title: "Every lead captured, scored and assigned", line: "Website forms, WhatsApp, email, calls and ad forms create leads on their own, with source, service and a score that shows who is ready to buy.", points: ["Leads from every channel", "Lead score and tags", "Assigned by service or city"] },
  { key: "inbox", label: "WhatsApp inbox", title: "One team inbox for WhatsApp and email", line: "Your whole team answers from one shared number and inbox. Every message sits on the lead's record, so anyone can pick up where a colleague left off.", points: ["Shared WhatsApp number", "Quick replies and templates", "Notes and mentions"] },
  { key: "pipeline", label: "Sales pipeline", title: "See every deal, stage by stage", line: "Drag deals from new enquiry to won. Values, owners and next steps stay visible, so nothing waits without a reason.", points: ["Custom stages", "Deal value and owner", "Stuck-deal alerts"] },
  { key: "followups", label: "Follow-ups", title: "Follow-ups that happen on time", line: "Each person sees today's calls, messages and meetings. Nirman CRM suggests the next message when a lead goes quiet.", points: ["Daily follow-up list", "Overdue alerts", "Suggested messages"] },
  { key: "campaigns", label: "Campaigns", title: "WhatsApp and email campaigns from the same place", line: "Send offers, reminders and newsletters to the right contacts, then see who read, clicked and replied.", points: ["Broadcasts and drips", "Approved WhatsApp templates", "Read, click and reply stats"] },
  { key: "automations", label: "Automations", title: "Automations without code", line: "Reply to new leads, assign them, wait, and follow up, all on rules you set once. Start from ready-made flows.", points: ["Instant replies", "Wait and follow-up steps", "Ready-made flows"] },
  { key: "reports", label: "Reports", title: "Reports that show what brings business", line: "Leads by source and month, conversion at each stage, reply times and each person's results, ready to export.", points: ["Source and funnel reports", "Team performance", "PDF export"] },
];

export const channels = {
  title: "WhatsApp and email, built in",
  line: "No extra tools to connect. Nirman CRM works with the official WhatsApp Business Platform and your email, so every conversation is saved to the right lead.",
  whatsapp: ["Shared team inbox on one number", "Approved message templates", "Broadcasts with read and reply stats", "Quick replies and buttons"],
  email: ["Campaigns and welcome series", "Open and click tracking", "Templates with your branding", "Replies land on the lead's record"],
};

export const integrations = {
  title: "Connects to where your leads come from",
  line: "Leads arrive in Nirman CRM on their own, with the source recorded.",
  items: [
    { name: "Website forms", line: "Any form on your site, including ones we build", icon: "form" },
    { name: "WhatsApp Business", line: "Official WhatsApp Business Platform", icon: "chat" },
    { name: "Email", line: "Your business email for sending and replies", icon: "mail" },
    { name: "Meta lead ads", line: "Lead forms from Facebook and Instagram ads", icon: "ads" },
    { name: "IndiaMART and JustDial", line: "Marketplace enquiries straight into the CRM", icon: "market" },
    { name: "Payment links", line: "Send payment links and see who has paid", icon: "pay" },
    { name: "API and webhooks", line: "Connect your own systems", icon: "api" },
  ],
} as const;

export const audiences = {
  title: "Made for businesses that sell through conversations",
  items: [
    { name: "Real estate", line: "Site-visit requests, follow-ups and broker leads in one pipeline." },
    { name: "Clinics and healthcare", line: "Appointment enquiries answered at once, reminders sent on time." },
    { name: "Education", line: "Admission enquiries tracked from first call to enrolment." },
    { name: "Retail and e-commerce", line: "Order questions, offers and repeat customers on WhatsApp." },
    { name: "Manufacturing and B2B", line: "Long deals with quotes, follow-ups and several decision makers." },
    { name: "Local services", line: "Quotes, bookings and reviews for service businesses." },
  ],
};

export const customisation = {
  title: "Need it to work your way?",
  line: "We set Nirman CRM up around your stages, fields and team. If your process needs more, our software team customises it or builds a CRM from scratch.",
  points: ["Your stages, fields and reports", "Connections to your own systems", "A fully custom CRM when you need one"],
  link: { label: "About CRM development", href: "/services/software/" },
};

export const crmFaqs = [
  { q: "Is there a free trial?", a: "We set Nirman CRM up with you after a short demo, so there is no self-signup or free trial. In the demo we show it working with your own process." },
  { q: "How much does Nirman CRM cost?", a: "It depends on your team size and setup. We share a written proposal after the demo." },
  { q: "Does it work with WhatsApp?", a: "Yes. Nirman CRM uses the official WhatsApp Business Platform, so your team can reply, send templates and run campaigns from one shared number." },
  { q: "Can I bring my existing leads?", a: "Yes. We import your current contacts and leads as part of the setup." },
  { q: "Can it be customised for my business?", a: "Yes. Stages, fields, automations and reports are set up for your process, and our software team can build anything more you need." },
  { q: "Who owns the data?", a: "You do. Your leads, messages and reports stay yours, and you can export them at any time." },
];

export const demo = {
  title: "Book a demo of Nirman CRM",
  line: "A short call with our team. We look at how you handle leads today and show you Nirman CRM set up for it.",
  steps: ["Tell us about your business", "We reply within 2 working hours (IST)", "A demo at a time that suits you"],
};
