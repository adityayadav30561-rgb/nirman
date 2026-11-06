// Homepage Questions section (docs/sections/07-questions.md).
// Answers follow the client rules: no prices, no PPC or social media
// marketing, CRM = "Book a demo". Figures used here are only the approved
// facts (2 h reply, 48 h proposal, 3 to 6 wk website; DECISIONS 2026-11-06).
// The same list feeds the FAQPage JSON-LD, so keep answers as plain text.

export type Faq = { q: string; a: string; link?: { label: string; href: string } };

export const faqIntro = {
  title: "Got a question for Nirman?",
  line: "Leave your email and we will write back within 2 working hours (IST).",
  listLine: "Short answers to what people ask before they start.",
};

export const faqs: Faq[] = [
  {
    q: "How much does a project cost?",
    a: "Scope decides the cost, so we quote every project after a short call. You get a written proposal within 48 hours of that call.",
    link: { label: "Get a quote", href: "/get-a-quote/" },
  },
  {
    q: "How long does a website take?",
    a: "A typical business website goes live in 3 to 6 weeks. Online stores, apps and custom software take longer; you get a week-by-week plan before work starts.",
  },
  {
    q: "When will SEO start to show results?",
    a: "Technical fixes help within weeks. Rankings for competitive searches take longer and depend on your market. Every month you get a plain report of what changed.",
  },
  {
    q: "Is Nirman CRM ready to use, or built for me?",
    a: "Nirman CRM is our own ready product, with WhatsApp and email follow-ups built in. If your process needs more, we customise it for you.",
    link: { label: "Book a demo", href: "/nirman-crm/#book-a-demo" },
  },
  {
    q: "Do you work with businesses outside India?",
    a: "Yes. We work with businesses in India and abroad, in English, and book calls in your time zone.",
  },
  {
    q: "Do I own my website and data?",
    a: "Yes. Your code, content, domain and CRM data are yours, and we hand over every login at launch.",
  },
];
