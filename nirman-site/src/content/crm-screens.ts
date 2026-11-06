// Sample data for the Nirman CRM product screens built in code
// (src/components/crm/). ILLUSTRATIVE PRODUCT UI ONLY: every screen that uses
// it shows a "Sample data" label. People and businesses are made up; these
// are not clients and the figures are not results.

export type Channel = "whatsapp" | "email" | "form" | "call";

export const channelLabel: Record<Channel, string> = {
  whatsapp: "WhatsApp",
  email: "Email",
  form: "Website form",
  call: "Call",
};

export type Conversation = {
  initials: string;
  name: string;
  business: string;
  channel: Channel;
  preview: string;
  time: string;
  unread?: boolean;
  tone: string;
};

export const inbox: Conversation[] = [
  { initials: "RS", name: "Riya Sharma", business: "Clinic, Pune", channel: "whatsapp", preview: "Can you share a quote for a new website?", time: "10:02", unread: true, tone: "bg-[#dbe9fd] text-brand" },
  { initials: "JD", name: "James Dunn", business: "Retail, London", channel: "email", preview: "Following up on the SEO proposal", time: "09:48", unread: true, tone: "bg-[#ece6fc] text-[#6b4fd8]" },
  { initials: "AK", name: "Arjun Kapoor", business: "Café, Delhi", channel: "form", preview: "Need an app for online orders", time: "09:15", tone: "bg-[#fde6d9] text-accent" },
  { initials: "SN", name: "Sara Nasser", business: "Real estate, Dubai", channel: "whatsapp", preview: "Thanks! Tuesday 4 pm works.", time: "Yesterday", tone: "bg-[#fdf3d4] text-[#a06a00]" },
  { initials: "MP", name: "Meera Pillai", business: "School, Kochi", channel: "call", preview: "Missed call · call back today", time: "Yesterday", tone: "bg-[#ddf3e6] text-[#1f8a55]" },
];

export const thread = [
  { from: "lead", text: "Hi, I need a new website for my clinic. Can you share a quote?", time: "10:02" },
  { from: "auto", text: "Thanks Riya, we have your message. Priya will reply in a few minutes.", time: "10:02" },
  { from: "team", text: "Hi Riya, this is Priya from Nirman. Can we call you at 4 pm today?", time: "10:04" },
] as const;

export type Stage = { name: string; tone: string; cards: { title: string; who: string; value: string; tag: Channel; due?: string }[] };

export const pipeline: Stage[] = [
  {
    name: "New enquiry",
    tone: "bg-brand",
    cards: [
      { title: "Clinic website", who: "Riya Sharma", value: "₹1.2L", tag: "whatsapp", due: "Reply now" },
      { title: "Online orders app", who: "Arjun Kapoor", value: "₹3.4L", tag: "form" },
      { title: "Hotel booking site", who: "Neha Joshi", value: "₹1.8L", tag: "email" },
    ],
  },
  {
    name: "Contacted",
    tone: "bg-[#7c5cf0]",
    cards: [
      { title: "School admissions CRM", who: "Meera Pillai", value: "₹2.1L", tag: "call", due: "Call 4 pm" },
      { title: "Store SEO", who: "James Dunn", value: "£2.4k", tag: "email" },
      { title: "Gym member app", who: "Vikram Singh", value: "₹2.6L", tag: "whatsapp", due: "No reply in 3 days" },
    ],
  },
  {
    name: "Proposal sent",
    tone: "bg-accent",
    cards: [
      { title: "Property listings site", who: "Sara Nasser", value: "AED 18k", tag: "whatsapp", due: "Viewed twice" },
      { title: "Dental clinic SEO", who: "Dr. Anil Rao", value: "₹0.8L", tag: "form" },
    ],
  },
  {
    name: "Won",
    tone: "bg-[#1f8a55]",
    cards: [
      { title: "Bakery website", who: "Kabir Rao", value: "₹0.9L", tag: "form" },
      { title: "Lead follow-up setup", who: "Tara Mehta", value: "₹0.6L", tag: "call" },
    ],
  },
];

export const followups = [
  { done: true, text: "Send brochure to Arjun", meta: "WhatsApp · 9:30", channel: "whatsapp" as Channel },
  { done: false, text: "Call Riya about the clinic website", meta: "Call · 4:00 pm", channel: "call" as Channel },
  { done: false, text: "Share revised proposal with Sara", meta: "Email · 5:30 pm", channel: "email" as Channel },
  { done: false, text: "Demo for Meera's school", meta: "Tomorrow · 11:00", channel: "call" as Channel },
];

export const dashboard = {
  kpis: [
    { label: "New leads this week", value: "38", note: "12 from WhatsApp" },
    { label: "Avg. first reply", value: "2 min", note: "Auto-reply on" },
    { label: "Follow-ups due today", value: "6", note: "2 overdue" },
  ],
  bars: [32, 44, 38, 56, 49, 68, 61, 74],
  sources: [
    { label: "WhatsApp", pct: 42, tone: "bg-brand" },
    { label: "Website form", pct: 31, tone: "bg-[#7c5cf0]" },
    { label: "Email", pct: 18, tone: "bg-accent" },
    { label: "Calls", pct: 9, tone: "bg-[#1f8a55]" },
  ],
};
