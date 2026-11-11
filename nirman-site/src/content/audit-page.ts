// Words of the free SEO audit page (docs/sections/p6-seo-audit.md, round 2:
// written for people searching "free SEO audit tool", "SEO audit tool no
// signup", "no login", "website SEO checker"). Every claim here must stay
// true of the tool: no account is needed to run an audit and see the score;
// the PDF report asks for an email and a phone number; it audits one page;
// it measures and does not guarantee rankings. The check names below match
// lib/audit/checks.ts: change them together.

export const auditPage = {
  metaTitle: "Free SEO Audit Tool: No Signup, No Login",
  description: "Free SEO audit tool with no signup and no login. Enter a website and get an instant SEO score from around 40 checks and Google Lighthouse, plus a PDF report.",
  h1: "Free SEO audit tool. No signup, no login.",
  intro: "Enter any website address. In about a minute you get an SEO score out of 100 across six areas, from around 40 checks and Google's own Lighthouse speed test on a phone.",
  note: "No account needed. Your score is free; the PDF report asks for your email and phone number.",

  checksTitle: "What the free SEO audit tool checks",
  checksLine: "Around 40 checks in six areas. The tool reads your page the way a search engine does, then asks Google's own testing service how fast it loads on a phone.",
  checks: {
    index: ["The page loads (status code)", "HTTPS and the redirect from HTTP", "www and non-www on one address", "Redirect chain", "noindex rules", "robots.txt", "XML sitemap", "Canonical address", "Content present in the HTML"],
    content: ["Page title and its length", "Meta description and its length", "One main heading (H1)", "Heading structure", "Amount of visible text", "Image alt text", "Page language", "Internal links and link text"],
    speed: ["Google Lighthouse performance score", "Largest Contentful Paint (LCP)", "Cumulative Layout Shift (CLS)", "Total Blocking Time (TBT)", "Core Web Vitals of real visitors", "Page weight and requests", "Text compression", "Server response time"],
    mobile: ["Mobile viewport", "Accessibility score", "Best-practices score", "Insecure (mixed) content", "Favicon", "Character encoding", "Lighthouse's own SEO checks"],
    rich: ["JSON-LD structured data and whether it is valid", "Organization or LocalBusiness data", "Open Graph title and description", "Link preview picture", "Large preview card"],
    ai: ["GPTBot, ClaudeBot, PerplexityBot and Google-Extended access", "Text readable without JavaScript", "llms.txt", "Question-and-answer content", "Clear business description"],
  } as Record<string, string[]>,

  freeTitle: "No signup, no login: what you get free",
  freeLine: "Many SEO audit tools ask you to create an account before they show anything. This one runs first and asks later, and only if you want the full report.",
  free: {
    title: "Free, with no details at all",
    points: ["Run an audit on any public website", "Overall SEO score out of 100", "A score for each of the six areas", "How many checks passed, need improving or need fixing", "Audit as many sites as you like (up to six every ten minutes)"],
  },
  gated: {
    title: "Free, for your email and phone number",
    points: ["The full PDF report for the site", "Every check: what we found on your page", "Why each one matters", "How to fix each problem", "What to fix first, in order"],
  },

  stepsTitle: "How to run a free SEO audit",
  steps: [
    { title: "Enter your website address", text: "Any public website: yours, a client's or a competitor's. No account and nothing to install." },
    { title: "Watch it being audited", text: "The tool reads the page, its redirects, robots.txt and sitemap, while Google loads it on a simulated phone. About a minute." },
    { title: "Get your SEO score and report", text: "The score and the score by area appear at once. The PDF explains every check and what to fix first." },
  ],

  scoreTitle: "How the SEO score is worked out",
  scoreText: [
    "Each check is marked passed, to improve or to fix. A pass earns full marks, an improvement half and a fix none, and each check is weighted by how much it matters inside its area.",
    "The six areas are then combined: crawling and indexing 25%, speed and Core Web Vitals 25%, on-page content 20%, and mobile, structured data and AI search readiness 10% each. The thresholds are Google's published ones: 2.5 seconds for LCP, 0.1 for CLS, and Lighthouse's 90 and 50 score bands.",
    "If Google's speed test cannot be run, speed is left out of the score and the report says so, instead of guessing.",
  ],

  faqTitle: "Questions about the free SEO audit tool",
  faqs: [
    { q: "Is this SEO audit tool really free?", a: "Yes. Running an audit and seeing the SEO score costs nothing, and you can audit as many websites as you like. The full PDF report is free too; we ask for your email and phone number before you download it." },
    { q: "Do I need to sign up or log in?", a: "No. There is no account, no login and no password. Type a website address and the audit starts. Only the PDF report asks for contact details, and even that does not create an account." },
    { q: "What is an SEO audit?", a: "An SEO audit checks whether search engines can reach, read and understand a website, and how good the experience is for visitors: can Google index the page, are the title and headings in order, how fast does it load on a phone, and what can search results and AI assistants show about it." },
    { q: "How accurate is the audit?", a: "Every finding is read from the live site at the moment of the audit, and the report quotes what was found: the actual title, the number of images without descriptions, the exact redirect chain. Speed and Core Web Vitals come from Google PageSpeed Insights (Lighthouse), the same test Google gives site owners." },
    { q: "Which websites can it audit?", a: "Any public website, whatever it is built with: WordPress, Shopify, Wix, Webflow, Squarespace, or custom code. It cannot audit pages behind a login or on a private network." },
    { q: "Does it check Core Web Vitals?", a: "Yes. It reports LCP, CLS and blocking time from Google Lighthouse on a simulated phone, and the Core Web Vitals of your real visitors over the last 28 days when Google has enough data for the page." },
    { q: "Does it check readiness for AI search?", a: "Yes. It checks whether ChatGPT, Claude, Perplexity and Google's AI crawlers are allowed to read the site, whether the text is available without JavaScript (AI crawlers do not run it), and whether the page has question-and-answer content and clear business details for assistants to quote." },
    { q: "Does the audit change anything on my website?", a: "No. It only reads public pages, the way a search engine or a visitor does. It needs no access, no plugin and no code on your site." },
    { q: "What does it not check?", a: "It audits one page, the address you enter. It does not look at your other pages, your competitors, your backlinks, or how well your text matches what people search for. Those need a person, and they are part of our SEO service." },
    { q: "Why does it take about a minute?", a: "Reading the site takes a few seconds. The rest is Google loading the page on a simulated mid-range phone and measuring it, which cannot be rushed." },
    { q: "What do you do with my email and phone number?", a: "We use them to contact you about your audit. We do not sell them. Our privacy policy has the details." },
    { q: "My score is low. What now?", a: "Start with the report's 'What to fix first' list; many items are small changes. If you would rather have it done for you, ask us for a quote." },
  ],
};
