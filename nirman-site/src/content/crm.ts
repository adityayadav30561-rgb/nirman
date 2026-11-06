// Nirman CRM section on the homepage (docs/sections/05-crm.md, redo
// 2026-11-06: screen-led, the product named in the heading). The screens are
// the real Nirman CRM design (user: the CRM will be updated to match), with
// demo data from content/crm-screens.ts and no labels. Every CRM
// call to action: "Book a demo".

export const crmIntro = {
  badge: "Nirman CRM · our own product",
  title: "Nirman CRM: every lead in one place, answered in minutes.",
  line: "Our own CRM. Website forms, WhatsApp, email and calls land in one inbox, every lead gets an instant reply, and your team is reminded to follow up.",
  cta: { label: "Book a demo", href: "/nirman-crm/#book-a-demo" },
};

/** One per screen tab; the same lines are the section's check points. */
export const crmViews = [
  { key: "inbox", label: "Inbox", point: "WhatsApp, email, website forms and calls in one inbox." },
  { key: "pipeline", label: "Pipeline", point: "Every enquiry on a board, from new to won." },
  { key: "followups", label: "Follow-ups", point: "Reminders and suggested messages, so no lead goes cold." },
  { key: "reports", label: "Dashboard", point: "Leads, reply times and sources at a glance." },
] as const;

export type CrmViewKey = (typeof crmViews)[number]["key"];
