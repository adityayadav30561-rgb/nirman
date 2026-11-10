// Single source of truth for brand and contact details.
// Values marked "placeholder" must be replaced before launch.

export const site = {
  name: "Nirman",
  tagline: "Websites, SEO, custom software and CRM automation",
  description:
    "Nirman builds websites, runs SEO, develops custom software and mobile apps, and automates WhatsApp and email marketing with Nirman CRM, for businesses in India and worldwide.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.example.com", // placeholder until the domain is shared
  email: "hello@example.com", // placeholder
  phone: "+91 00000 00000", // placeholder
  whatsapp: "910000000000", // placeholder: digits only, for wa.me links
  address: "India", // placeholder: the full office address comes from the client
  copyrightYear: 2026,
} as const;
