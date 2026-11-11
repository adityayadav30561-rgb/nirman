import { apps, seoCases, sites } from "@/content/work";

/*
 * Every fixed public page of the site, for sitemap.xml and llms.txt. Add a
 * page here when you add its folder under src/app (blog articles and
 * categories come from Sanity and are added by the sitemap itself; work
 * project pages come from content/work.ts). Not listed on purpose:
 * /thank-you/, /studio/, /api/.
 */
export type PageEntry = { path: string; title: string; line: string; priority: number };

export const fixedPages: PageEntry[] = [
  { path: "/", title: "Nirman", line: "Websites, SEO, custom software and Nirman CRM for businesses in India and abroad.", priority: 1 },
  { path: "/services/", title: "Services", line: "The four services: websites, SEO, custom software and marketing automation.", priority: 0.9 },
  { path: "/services/websites/", title: "Websites", line: "Design, development, online stores and website care.", priority: 0.9 },
  { path: "/services/seo/", title: "SEO", line: "Local, technical, e-commerce and AI-search SEO.", priority: 0.9 },
  { path: "/services/software/", title: "Custom software", line: "CRMs, web apps, mobile apps and automation built around a team.", priority: 0.9 },
  { path: "/services/marketing/", title: "Marketing automation", line: "WhatsApp and email follow-ups that run through Nirman CRM.", priority: 0.9 },
  { path: "/nirman-crm/", title: "Nirman CRM", line: "Nirman's own CRM: every lead in one inbox, with reminders and reports. Book a demo.", priority: 0.9 },
  { path: "/work/", title: "Our work", line: "Selected websites, SEO projects and apps, shown as screenshots and figures.", priority: 0.8 },
  { path: "/work/websites/", title: "Websites we built", line: "Every website project.", priority: 0.7 },
  { path: "/work/seo/", title: "SEO projects", line: "Every SEO project, with figures from Google's own tools.", priority: 0.7 },
  { path: "/work/apps/", title: "Apps we built", line: "Every app project.", priority: 0.7 },
  { path: "/tools/seo-audit/", title: "Free SEO audit", line: "Audit any website free: a score out of 100 across six areas and a PDF report of what to fix.", priority: 0.8 },
  { path: "/about/", title: "About", line: "Who Nirman is and how it works.", priority: 0.6 },
  { path: "/contact/", title: "Contact", line: "Email, phone and a message form.", priority: 0.6 },
  { path: "/get-a-quote/", title: "Get a quote", line: "Tell us about a project; a written proposal follows within 48 hours of a call.", priority: 0.8 },
  { path: "/blog/", title: "Blog", line: "Articles on websites, SEO, software and follow-ups.", priority: 0.6 },
  { path: "/privacy-policy/", title: "Privacy policy", line: "How personal information is handled.", priority: 0.2 },
  { path: "/terms/", title: "Terms of use", line: "Terms for using the website.", priority: 0.2 },
];

export const workPages: PageEntry[] = [
  ...sites.map((s) => ({ path: `/work/websites/${s.slug}/`, title: `${s.name} website`, line: s.kind, priority: 0.5 })),
  ...seoCases.map((c) => ({ path: `/work/seo/${c.slug}/`, title: `${c.name}: SEO results`, line: `${c.headline.value} ${c.headline.label}`, priority: 0.5 })),
  ...apps.map((a) => ({ path: `/work/apps/${a.slug}/`, title: `${a.name} app`, line: a.kind, priority: 0.5 })),
];
