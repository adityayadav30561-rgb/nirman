// Single source for brand and contact details.
// Values marked "placeholder" must be replaced before launch.

export const site = {
  name: "Nirman",
  descriptor: "Digital",
  tagline: "Websites, growth and software for ambitious businesses.",
  description:
    "Nirman is a digital technology agency offering SEO, website design and development, Nirman CRM, custom software, mobile apps and digital marketing.",
  url: "https://www.example.com", // placeholder
  email: "hello@yourdomain.com", // placeholder
  phone: "+91 00000 00000", // placeholder
  whatsapp: "https://wa.me/910000000000", // placeholder
  address: "Office address, City, India", // placeholder
  bookingUrl: "#contact", // placeholder: link to your calendar tool
  social: [
    { label: "LinkedIn", href: "#" },
    { label: "Instagram", href: "#" },
    { label: "X", href: "#" },
    { label: "Behance", href: "#" },
  ],
} as const;

export const nav = [
  { label: "Services", href: "#services" },
  { label: "Our Products", href: "#nirman-crm" },
  { label: "Our Work", href: "#work" },
  { label: "About Us", href: "#about" },
  { label: "Contact", href: "#contact" },
] as const;

export const services = [
  { id: "seo", label: "SEO & organic growth" },
  { id: "web", label: "Website design & development" },
  { id: "crm", label: "CRM & automation" },
  { id: "software", label: "Custom software" },
  { id: "apps", label: "Mobile apps" },
  { id: "marketing", label: "Digital marketing" },
] as const;
