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
  /** Google Tag Manager containers and Search Console verification, from the user (2026-11-11): GTM-5H9HWP85 from their SEO person, GTM-5PBWGV8Z added the same day. All containers share one data layer and the consent banner. An empty list or string turns either off. */
  gtmIds: ["GTM-5H9HWP85", "GTM-5PBWGV8Z"] as readonly string[],
  googleVerification: "yo7NVCj8c66j_BmCXgnJmVF5DRIpN-8sRqruqbikKe0",
} as const;
