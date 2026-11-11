// Single source of truth for brand and contact details.
// Still a placeholder: the office address.

export const site = {
  name: "Nirman",
  tagline: "Websites, SEO, custom software and CRM automation",
  description:
    "Nirman builds websites, runs SEO, develops custom software and mobile apps, and automates WhatsApp and email marketing with Nirman CRM, for businesses in India and worldwide.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.nirmandigital.com", // live since 2026-11-11
  email: "contact@nirmandigital.com", // user, 2026-11-11; receives every form
  phone: "+91 88583 49017", // user, 2026-11-11
  whatsapp: "918858349017", // digits only, for wa.me links; same number as the phone (user, 2026-11-11). Empty hides the WhatsApp row on Contact
  address: "India", // placeholder: the full office address comes from the client
  copyrightYear: 2026,
} as const;
