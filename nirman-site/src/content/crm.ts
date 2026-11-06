// Nirman CRM section on the homepage (docs/sections/05-crm.md). Copy is a
// draft. Events are illustrative product UI, labelled "Sample data" on the
// page; they are not client results. Every CRM call to action: "Book a demo".

export const crmIntro = {
  title: "Every lead, answered and followed up.",
  line: "Nirman CRM brings your website forms, WhatsApp and email into one inbox, replies in minutes and reminds your team to follow up, so no enquiry goes cold.",
  cta: { label: "Book a demo", href: "/nirman-crm/#book-a-demo" },
};

export const crmPoints = [
  { key: "inbox", title: "One inbox", line: "Website forms, WhatsApp and email in one place." },
  { key: "reply", title: "Instant reply", line: "An automatic first reply the moment a lead arrives." },
  { key: "assign", title: "Right person", line: "Each lead assigned to the right team member." },
  { key: "follow", title: "Follow-ups", line: "Reminders, so no enquiry goes cold." },
] as const;

export type Lead = { initials: string; name: string; channel: "form" | "chat" | "mail" | "call"; tone: string };

export const sampleLeads: Lead[] = [
  { initials: "RS", name: "Riya S.", channel: "form", tone: "bg-[#dbe9fd] text-brand" },
  { initials: "AK", name: "Arjun K.", channel: "chat", tone: "bg-[#fde6d9] text-accent" },
  { initials: "MP", name: "Meera P.", channel: "mail", tone: "bg-[#ddf3e6] text-[#1f8a55]" },
  { initials: "JD", name: "James D.", channel: "call", tone: "bg-[#ece6fc] text-[#6b4fd8]" },
  { initials: "SN", name: "Sara N.", channel: "chat", tone: "bg-[#fdf3d4] text-[#a06a00]" },
];

export const sampleEvents = ["New lead: website form", "Auto-reply sent", "Assigned to Priya", "Replied in 2 min", "Follow-up at 4 pm"];
