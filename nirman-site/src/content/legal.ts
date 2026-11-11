import { site } from "@/content/site";

/*
 * Privacy policy and terms (docs/sections/p7b-legal.md). General texts for a
 * digital agency (user request, 2026-11-11), written to match what this
 * site actually does. NOT reviewed by a lawyer: the client should have them
 * checked, and add the registered business name, address and the city whose
 * courts apply. Keep them true: if analytics, cookies, payments or accounts
 * are added to the site, update the matching section and the date.
 */

export type LegalSection = { id: string; title: string; text: (string | string[])[] };
export type LegalDoc = { slug: "privacy-policy" | "terms"; title: string; description: string; updated: string; intro: string; sections: LegalSection[] };

const UPDATED = "2026-11-11";

export const privacy: LegalDoc = {
  slug: "privacy-policy",
  title: "Privacy policy",
  description: `How ${site.name} collects, uses and protects personal information on ${site.url.replace(/^https?:\/\//, "")} and in its work for clients.`,
  updated: UPDATED,
  intro: `This policy explains what personal information ${site.name} collects through this website and in the course of its work, why we collect it, and the choices you have. We keep it short and in plain words.`,
  sections: [
    {
      id: "who-we-are",
      title: "Who we are",
      text: [
        `${site.name} is a digital agency based in India. We build websites, run search engine optimisation (SEO), develop custom software and mobile apps, and set up WhatsApp and email follow-ups with our own product, Nirman CRM.`,
        `For anything in this policy, write to ${site.email}.`,
      ],
    },
    {
      id: "what-we-collect",
      title: "What we collect",
      text: [
        "Information you give us. When you ask for a quote, book a demo, send a message or ask a question, we receive what you enter:",
        ["Your name, email address and phone number", "Your business name and website address, if you give them", "What you tell us about your project, timeline and needs"],
        "The free SEO audit. When you run an audit we read the public pages of the website address you enter (the page, its robots.txt and its sitemap) and send that address to Google's PageSpeed Insights service to measure its speed. To download the PDF report you give us your email address and phone number, and optionally your name; we receive these together with the address audited and its score.",
        "Information collected automatically. Like most websites, the servers that deliver this site record basic technical details of each visit, such as the IP address, browser and device type, the pages requested and the time. We use these records to keep the site secure and working.",
        "Cookies and measurement. This site uses Google Tag Manager to load measurement tools such as Google Analytics. With your agreement these tools set cookies and record how the site is used (for example which pages are viewed, roughly where visitors are and what device they use) so that we can understand and improve it. Nothing of this kind is stored until you choose in the cookie banner; you can accept everything, only what is necessary, or pick analytics and marketing separately. Your choice is remembered in your browser for six months and you can change it at any time with the Cookie settings link at the bottom of every page.",
      ],
    },
    {
      id: "how-we-use-it",
      title: "How we use it",
      text: [
        "We use personal information to:",
        ["Reply to your enquiry and prepare a proposal", "Contact you about an audit report you downloaded", "Arrange and run a demo of Nirman CRM", "Deliver the services you have engaged us for", "Keep the website secure and improve it", "Meet our legal and accounting duties"],
        "We do not sell personal information, and we do not use it for anything unrelated to these purposes.",
      ],
    },
    {
      id: "messages",
      title: "Email and WhatsApp messages",
      text: [
        "We contact you by email, phone or WhatsApp to answer an enquiry you made or to work on a project with you. We send updates or marketing messages only if you asked for them or agreed to them, and every such message tells you how to stop them. You can also write to us at any time and we will stop.",
      ],
    },
    {
      id: "sharing",
      title: "Who we share it with",
      text: [
        "We share personal information only where it is needed:",
        ["Service providers that run parts of our business for us, such as website hosting, email delivery, content management, measurement (Google Tag Manager and the tools it loads) and, for the SEO audit, Google's PageSpeed Insights, who may only use it to provide that service", "Professional advisers such as accountants and lawyers", "Authorities, where the law requires it"],
        "These providers may store information on servers outside your country. Where that happens we rely on providers that apply recognised security and data protection standards.",
      ],
    },
    {
      id: "client-data",
      title: "Information we handle for clients",
      text: [
        "When we build or run a website, an app, a CRM or a campaign for a client, we may handle personal information that belongs to that client's customers. We do this only on the client's instructions and under our agreement with them. If your question is about information held by one of our clients, please contact that business first; we will help them respond.",
      ],
    },
    {
      id: "how-long",
      title: "How long we keep it",
      text: [
        "We keep personal information only as long as we need it for the purposes above, or as long as the law requires us to keep records. When it is no longer needed we delete it or make it anonymous. You can ask us to delete your enquiry earlier.",
      ],
    },
    {
      id: "security",
      title: "How we protect it",
      text: [
        "We use reasonable technical and organisational measures to protect personal information, including encrypted connections to this site and limited access within our team. No method of sending or storing information is completely secure, so we cannot promise absolute security, but we will tell you and the relevant authority if a breach affects you and the law requires it.",
      ],
    },
    {
      id: "your-rights",
      title: "Your rights",
      text: [
        "Depending on where you live, laws such as India's Digital Personal Data Protection Act, 2023, the GDPR in the European Union and the UK GDPR give you rights over your personal information. These generally include the right to:",
        ["Ask what information we hold about you and get a copy", "Have it corrected or updated", "Have it deleted", "Withdraw a consent you gave", "Object to or limit certain uses", "Complain to the data protection authority in your country"],
        `To use any of these rights, write to ${site.email}. We will reply within the time the law allows and will not charge you for a reasonable request.`,
      ],
    },
    {
      id: "children",
      title: "Children",
      text: ["This website and our services are meant for businesses. We do not knowingly collect personal information from anyone under 18. If you believe a child has sent us information, tell us and we will delete it."],
    },
    {
      id: "other-sites",
      title: "Links to other websites",
      text: ["Our site may link to other websites. We are not responsible for how those sites handle your information; please read their own policies."],
    },
    {
      id: "changes",
      title: "Changes to this policy",
      text: ["We may update this policy when our services or the law change. The date at the top shows the latest version. If a change is significant we will say so clearly on this page."],
    },
    {
      id: "contact",
      title: "Contact",
      text: [`Questions about this policy or your information: ${site.email}.`],
    },
  ],
};

export const terms: LegalDoc = {
  slug: "terms",
  title: "Terms of use",
  description: `The terms that apply when you use the ${site.name} website and ask us for a quote or a demo.`,
  updated: UPDATED,
  intro: `These terms apply to your use of this website. By using the site you agree to them. If you engage ${site.name} for work, that work is governed by the written proposal or agreement we sign with you, which takes priority over these terms.`,
  sections: [
    {
      id: "about-the-site",
      title: "What this website is",
      text: [
        `This site describes the services ${site.name} offers: websites, SEO, custom software and mobile apps, marketing automation and Nirman CRM. It is information, not an offer that can be accepted. We do not publish prices; each project is quoted individually.`,
      ],
    },
    {
      id: "quotes",
      title: "Quotes, proposals and demos",
      text: [
        "Asking for a quote or a demo is free and puts you under no obligation. A quote or proposal is valid for the period stated in it. Work begins only after both sides have agreed the scope, timeline and fees in writing.",
        "The reply times shown on this site (for example a reply within 2 working hours, Indian Standard Time) describe how we normally work; they are not a contractual guarantee.",
      ],
    },
    {
      id: "results",
      title: "No guarantee of results",
      text: [
        "Search rankings, traffic, leads and sales depend on many things we do not control, including search engines' own systems, your market and your competitors. We do not guarantee any ranking, traffic level or business result.",
        "The figures on our work pages are the results of specific clients, taken from their own Google Analytics and Search Console accounts for the periods shown. They are examples of past work, not a promise of what another project will achieve.",
      ],
    },
    {
      id: "content",
      title: "Articles and general information",
      text: [
        "Articles and other material on this site are general information. They are not professional advice for your specific situation, and you should not rely on them as such. We try to keep them accurate and current but do not promise that they are complete or free of errors.",
      ],
    },
    {
      id: "intellectual-property",
      title: "Ownership of content",
      text: [
        `The text, design, code and graphics of this site belong to ${site.name} or are used with permission. You may view and share pages for your own reference; you may not copy, republish or sell the content without our written permission.`,
        "Client names, logos and screenshots shown in our work belong to their owners and appear here as examples of work we carried out.",
      ],
    },
    {
      id: "acceptable-use",
      title: "Using the site fairly",
      text: [
        "You agree not to:",
        ["Use the site for anything unlawful", "Try to gain access to parts of the site or its systems that are not public", "Disrupt the site, or send it automated traffic that places an unreasonable load on it", "Send false, misleading or abusive information through our forms"],
      ],
    },
    {
      id: "nirman-crm",
      title: "Nirman CRM",
      text: ["Nirman CRM is shown on this site by description and by demo. Use of the product itself is governed by a separate agreement between us and each customer."],
    },
    {
      id: "third-parties",
      title: "Other websites and services",
      text: ["The site may link to or mention other websites and services. We do not control them and are not responsible for their content or conduct."],
    },
    {
      id: "availability",
      title: "Availability",
      text: ["We aim to keep the site available and correct, but we provide it as it is, without warranties of any kind, and may change or withdraw any part of it without notice."],
    },
    {
      id: "liability",
      title: "Limit of liability",
      text: [
        `To the extent the law allows, ${site.name} is not liable for any indirect or consequential loss, or loss of profit, data or business, arising from your use of this website or reliance on its content. Nothing in these terms limits a liability that cannot be limited by law.`,
      ],
    },
    {
      id: "law",
      title: "Governing law",
      text: ["These terms are governed by the laws of India, and the courts in India have jurisdiction over any dispute about them or about this website."],
    },
    {
      id: "changes",
      title: "Changes to these terms",
      text: ["We may update these terms from time to time. The date at the top shows the latest version. Continuing to use the site after a change means you accept the updated terms."],
    },
    {
      id: "contact",
      title: "Contact",
      text: [`Questions about these terms: ${site.email}.`],
    },
  ],
};
