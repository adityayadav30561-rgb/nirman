// Words of the free SEO audit page (docs/sections/p6-seo-audit.md). Nothing
// here promises a result: the tool measures, it does not guarantee rankings.

export const auditPage = {
  title: "Free SEO audit",
  description: "Audit any website free: a score out of 100 across six areas, from around 40 checks and Google's own Lighthouse speed test, with a PDF report of what to fix.",
  checksTitle: "Six areas, around 40 checks",
  checksLine: "The audit reads your page the way a search engine does, then asks Google's own testing service how fast it loads on a phone.",
  stepsTitle: "How it works",
  steps: [
    { title: "Enter your address", text: "Any public website. No account and nothing to install." },
    { title: "Watch it being audited", text: "We read the page, its redirects, robots.txt and sitemap, while Google loads it on a phone. About a minute." },
    { title: "Get your score and report", text: "The score and the score by area appear at once. The PDF explains every check and what to fix first." },
  ],
  faqTitle: "Questions about the audit",
  faqs: [
    { q: "Is the audit really free?", a: "Yes. Running the audit and seeing your score costs nothing and needs no account. To download the full PDF report we ask for your email and phone number." },
    { q: "How accurate is it?", a: "Every finding is read from your live site at the moment of the audit, and the report quotes what was found: your actual title, the number of images without descriptions, the exact redirect chain. Speed and Core Web Vitals come from Google PageSpeed Insights (Lighthouse), the same test Google publishes for site owners." },
    { q: "What does it not check?", a: "It audits one page, the address you enter. It does not look at your other pages, your competitors, your backlinks, or how well your text matches what people search for. Those need a person; they are part of our SEO service." },
    { q: "Why does it take about a minute?", a: "Reading your site takes a few seconds. The rest is Google loading the page on a simulated mid-range phone and measuring it, which cannot be rushed." },
    { q: "What do you do with my email and phone number?", a: "We use them to send you the report's follow-up and to contact you about your audit. We do not sell them. Our privacy policy has the details." },
    { q: "My score is low. What now?", a: "Start with the report's 'What to fix first' list; many items are small changes. If you would rather have it done for you, ask us for a quote." },
  ],
};
