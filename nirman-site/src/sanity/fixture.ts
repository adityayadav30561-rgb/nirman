import type { BlogCategory, BodyBlock, Post } from "@/sanity/types";

/*
 * SAMPLE ARTICLES FOR DESIGN WORK ONLY. Never shown on the live site: the
 * blog reads them only when BLOG_FIXTURE=1 is set (lab screenshots and
 * checks; docs/sections/p7-blog.md). Real articles come from Sanity.
 */

export const fixtureCategories: BlogCategory[] = [
  { title: "SEO", slug: "seo", description: "How search works today and what moves a site up, in plain words." },
  { title: "Websites", slug: "websites", description: "Planning, building and looking after a business website." },
  { title: "Custom software", slug: "custom-software", description: "When to build your own tool, and how to do it without waste." },
  { title: "Marketing automation", slug: "marketing-automation", description: "Follow-ups on WhatsApp and email that run by themselves." },
];

let k = 0;
const key = () => `k${k++}`;
const p = (text: string): BodyBlock => ({ _type: "block", _key: key(), style: "normal", markDefs: [], children: [{ _type: "span", _key: key(), text, marks: [] }] });
const h = (text: string, style = "h2"): BodyBlock => ({ ...p(text), style });
const li = (text: string, listItem = "bullet"): BodyBlock => ({ ...p(text), listItem, level: 1 });

const body: BodyBlock[] = [
  p("Sample text for layout only. A good article opens by answering the question in its title in two or three sentences, so a reader in a hurry, and a search engine, get the point straight away."),
  h("Start with the answer"),
  p("Then it explains. Each section has one idea and a heading that says what the idea is. Paragraphs stay short: three or four sentences, with the important one first."),
  {
    _type: "block", _key: key(), style: "normal",
    markDefs: [{ _type: "link", _key: "l1", href: "/services/seo/" }],
    children: [
      { _type: "span", _key: key(), text: "Links point to pages that help, such as ", marks: [] },
      { _type: "span", _key: key(), text: "our SEO service", marks: ["l1"] },
      { _type: "span", _key: key(), text: ", and ", marks: [] },
      { _type: "span", _key: key(), text: "important words", marks: ["strong"] },
      { _type: "span", _key: key(), text: " can be bold.", marks: [] },
    ],
  },
  h("What to check first"),
  li("The page loads fast on a phone"),
  li("Every page has one clear title"),
  li("The business name, address and phone match everywhere"),
  { _type: "figure", _key: key(), url: "/images/work/site-aarika-2.webp", w: 1600, h: 1000, alt: "Sample picture inside an article", caption: "A caption sits under the picture." },
  h("How long it takes"),
  p("Longer sections can be broken up with a smaller heading."),
  h("In the first month", "h3"),
  p("Sample text. Technical fixes come first because everything else builds on them."),
  { _type: "note", _key: key(), title: "Good to know", text: "A highlighted note is for the one thing a reader must not miss." },
  h("After three months", "h3"),
  li("Review what changed", "number"),
  li("Keep what worked", "number"),
  li("Plan the next quarter", "number"),
  { ...p("A quote stands apart from the text around it, for a line worth remembering."), style: "blockquote" },
  h("What to do next"),
  p("The article ends with one clear next step for the reader."),
];

const make = (i: number, title: string, cat: number, img: string, date: string): Post => ({
  slug: title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, ""),
  title,
  excerpt: "Sample summary for layout only: two sentences that answer the question the article asks, written so a reader can decide in a moment whether to open it.",
  publishedAt: date,
  category: fixtureCategories[cat],
  author: { name: "Sample Author", role: "Nirman", bio: "Sample line about the author." },
  image: { url: img, w: 1600, h: 1000, alt: "Sample picture" },
  minutes: 4 + (i % 4),
  body,
  faq: [
    { question: "Is this a real article?", answer: "No. It is sample text used while designing the blog." },
    { question: "Where do real articles come from?", answer: "They are written and published in the blog editor." },
  ],
});

export const fixturePosts: Post[] = [
  make(0, "How long does SEO take to show results?", 0, "/images/work/site-ashville.webp", "2026-11-08T06:00:00Z"),
  make(1, "What a small business website needs on day one", 1, "/images/work/site-guru.webp", "2026-11-04T06:00:00Z"),
  make(2, "When a spreadsheet stops being enough", 2, "/images/work/site-sitco.webp", "2026-10-29T06:00:00Z"),
  make(3, "Follow-up messages that customers do not mind", 3, "/images/work/site-aarika.webp", "2026-10-22T06:00:00Z"),
  make(4, "How to read a Search Console report", 0, "/images/work/site-vana.webp", "2026-10-15T06:00:00Z"),
  make(5, "Five questions to ask before a redesign", 1, "/images/work/site-easyweb.webp", "2026-10-08T06:00:00Z"),
  make(6, "Appearing in AI answers: what we know so far", 0, "/images/work/site-ashville-3.webp", "2026-10-01T06:00:00Z"),
];
