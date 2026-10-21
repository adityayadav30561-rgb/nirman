import type { Service } from "./types";

// SEO pillar: hub + 4 (P4.3). Results are SAMPLE figures until real client
// results are supplied. Never promise rankings or name a price.

export const seoServices: Service[] = [
  {
    path: "/services/seo/",
    kind: "hub",
    pillar: "seo",
    name: "SEO",
    serviceType: "Search engine optimization",
    visual: "seo",
    related: ["/services/web/", "/services/marketing/"],
    tools: ["/tools/seo-audit/", "/tools/serp-preview/"],
    content: {
      outcome:
        "More of the right people find you on Google, in Maps and in AI answers, and you can see which pages bring enquiries.",
      audience: [
        "Businesses whose website gets visits but few enquiries",
        "Local businesses that want to show up in Google Maps",
        "Online stores that depend on product and category searches",
        "Companies selling in India and abroad from one English site",
      ],
      changes: [
        "Your pages rank for the searches customers actually type",
        "Google can crawl and index every page that matters",
        "Your business appears in Maps and in AI answers",
        "A monthly report ties rankings to calls and enquiries",
      ],
      deliverables: [],
      process: [
        {
          title: "Audit",
          body: "We crawl the site, read Search Console and Analytics, and study the competitors ranking above you.",
          duration: "Week 1",
        },
        {
          title: "Plan",
          body: "A prioritised list: fixes first, then pages to improve, then new content. You approve it before we start.",
          duration: "Week 2",
        },
        {
          title: "Fix the foundations",
          body: "Technical fixes, page titles, internal links and structured data, done or handed to your developer.",
          duration: "Weeks 2–6",
        },
        {
          title: "Content and local",
          body: "New and improved pages, Google Business Profile work and listings, in the order the plan sets.",
          duration: "Month 2 onwards",
        },
        {
          title: "Report and adjust",
          body: "A plain-language report each month, and more effort on whatever is bringing enquiries.",
          duration: "Monthly",
        },
      ],
      stack: [
        "Google Search Console",
        "Google Analytics 4",
        "Google Business Profile",
        "Bing Webmaster Tools",
        "PageSpeed Insights",
        "Screaming Frog",
        "Schema.org",
      ],
      results: [
        {
          sample: true,
          metric: "3.2×",
          label: "organic traffic in 6 months",
          context: "Sample figure for an online store. Not a real client yet.",
        },
        {
          sample: true,
          metric: "2.1×",
          label: "calls from Google Maps",
          context: "Sample figure for a clinic with three branches. Not a real client yet.",
        },
      ],
      engagement: [
        { model: "fixed-scope", fit: "Good for a one-off audit and fixes, or moving a site without losing rankings." },
        { model: "retainer", fit: "How most SEO runs: steady fixes, content and a report every month." },
        { model: "dedicated-team", fit: "Good for large sites, or groups of sites, that need SEO in every release." },
      ],
      costFactors: [
        "Size of the site and how many pages need work",
        "The technical state of the site today",
        "How competitive your searches are",
        "How many cities, branches or countries you target",
        "Whether we write the content or your team does",
      ],
      faqs: [
        {
          q: "When will I see results from SEO?",
          a: "Technical fixes usually show within a few weeks. Rankings for competitive searches usually take 3 to 6 months. You get a monthly report from the first month, so you can see what is moving.",
        },
        {
          q: "Do you guarantee first-page rankings?",
          a: "No. Nobody controls how Google ranks pages, so a guarantee is a warning sign. We commit to a clear plan, the work in it, and honest reports on what it achieves.",
        },
        {
          q: "What is in the monthly report?",
          a: "What we did that month, rankings for the searches you care about, traffic and enquiries from search, and what we will do next. The summary fits on one page.",
        },
        {
          q: "Can you do SEO on a site you did not build?",
          a: "Yes. We work on WordPress, Shopify, WooCommerce and custom sites. If a fix needs code we cannot reach, we write a clear ticket for your developer.",
        },
        {
          q: "What access do you need to start?",
          a: "Read access to Google Search Console and Analytics is enough for the audit. For fixes we need access to your CMS or code, or we work through your developer.",
        },
        {
          q: "Do you do SEO for businesses outside India?",
          a: "Yes. We work with clients in the US, UAE, UK and elsewhere, remotely from India. We plan keywords and pages for each country you sell in.",
        },
        {
          q: "How is AI search optimization different from SEO?",
          a: "It builds on SEO. AI answers mostly quote pages that already rank, so the basics come first. AI search work adds quotable passages, consistent business facts and mentions on sites AI tools trust.",
        },
      ],
    },
  },
  {
    path: "/services/seo/local-seo/",
    kind: "detail",
    pillar: "seo",
    name: "Local SEO",
    serviceType: "Local SEO and Google Business Profile management",
    visual: "seo",
    related: ["/services/seo/technical-seo/", "/services/web/website-design/"],
    tools: ["/tools/gbp-checker/", "/tools/seo-audit/"],
    content: {
      outcome:
        "Show up in Google Maps and local results when people nearby search for what you offer, and turn those views into calls and visits.",
      audience: [
        "Clinics, restaurants, salons, showrooms and coaching centres",
        "Service businesses covering a city or region",
        "Businesses with several branches or franchise outlets",
        "Businesses that moved or rebranded and have messy listings",
      ],
      changes: [
        "Your Google Business Profile is complete, accurate and active",
        "You appear in the map pack for your main services",
        "Name, address and phone match everywhere online",
        "Reviews arrive steadily and each one gets a reply",
        "Each branch has its own useful page on your website",
        "You see calls, direction requests and clicks by month",
      ],
      deliverables: [
        {
          title: "Google Business Profile optimisation",
          body: "Categories, services, hours, attributes, photos and a description written for customers, not for keywords.",
        },
        {
          title: "Location pages",
          body: "One useful page per branch or service area, with directions, local details and real photos, not copies with the city name swapped.",
        },
        {
          title: "Listings clean-up",
          body: "Consistent details on Justdial, Bing Places, Apple Business Connect and the directories in your industry. Duplicates merged or removed.",
        },
        {
          title: "Review requests",
          body: "A simple way to ask happy customers for a review, by link or QR code, plus reply templates for good and bad reviews.",
        },
        {
          title: "Local structured data",
          body: "LocalBusiness markup with hours, location and services, so search engines read your details correctly.",
        },
        {
          title: "Posts and photos",
          body: "Regular Google posts for offers, events and updates, and fresh photos of your place and work.",
        },
        {
          title: "Local rank tracking",
          body: "Map rankings checked across your area, not only from one spot, so you see where you show up and where you don't.",
        },
        {
          title: "Monthly report",
          body: "Calls, direction requests, website clicks, reviews and rankings, with what we will do next month.",
        },
      ],
      process: [
        {
          title: "Audit",
          body: "Your profile, listings, reviews and the competitors in the map pack for your main searches.",
          duration: "Week 1",
        },
        {
          title: "Fix",
          body: "Profile details, verification problems, duplicate listings and mismatched addresses.",
          duration: "Weeks 2–3",
        },
        {
          title: "Build",
          body: "Location pages, structured data and links from your main pages to each branch.",
          duration: "Weeks 3–6",
        },
        {
          title: "Grow",
          body: "Review requests, posts, photos and new listings, every month.",
          duration: "Monthly",
        },
        {
          title: "Report",
          body: "A short monthly report on calls, visits and rankings, area by area.",
          duration: "Monthly",
        },
      ],
      stack: [
        "Google Business Profile",
        "Google Search Console",
        "Google Analytics 4",
        "Bing Places",
        "Apple Business Connect",
        "Justdial",
        "Schema.org",
        "Nirman CRM",
      ],
      results: [
        {
          sample: true,
          metric: "2.1×",
          label: "calls from Google Maps",
          context: "Sample figure for a clinic with three branches. Not a real client yet.",
        },
        {
          sample: true,
          metric: "Top 3",
          label: "in the map pack for the main service",
          context: "Sample figure for a salon in one city. Not a real client yet.",
        },
      ],
      engagement: [
        { model: "fixed-scope", fit: "Good for setting up or repairing your profile and listings in one go." },
        { model: "retainer", fit: "Good for steady reviews, posts and tracking, month after month." },
        { model: "dedicated-team", fit: "Good for chains and franchises with many locations." },
      ],
      costFactors: [
        "Number of locations",
        "The state of your listings (duplicates, wrong addresses, suspended profile)",
        "Competition in your area and category",
        "How many location pages you need",
        "How many posts and review requests each month",
      ],
      faqs: [
        {
          q: "What is the Google map pack?",
          a: "It is the box of three businesses with a map that Google shows for local searches such as 'dentist near me'. Most local calls and direction requests come from it.",
        },
        {
          q: "How long does local SEO take?",
          a: "Profile and listing fixes often show within a few weeks. A place in the map pack for competitive searches usually takes 2 to 4 months, depending on your area.",
        },
        {
          q: "Can you fix a suspended or unverified profile?",
          a: "Often, yes. We find the likely cause, such as the business name, address format or category, fix it and go through Google's reinstatement process. Google makes the final decision.",
        },
        {
          q: "Will you post reviews for us?",
          a: "No. Fake reviews break Google's rules and can get a profile suspended. We make it easy for real customers to leave one, and help you reply to every review.",
        },
        {
          q: "We have several branches. Do we need a page for each?",
          a: "Yes. Each branch needs its own profile and its own page on your website, with details that are true for that branch. That is what lets each one rank in its own area.",
        },
        {
          q: "Do I need a shop or office to rank locally?",
          a: "No. Businesses that visit customers can set a service area and hide their address. Ranking is harder without an address, but it works.",
        },
        {
          q: "Can I check my profile myself first?",
          a: "Yes. Our free Google Business Profile checker scores your profile and lists what to fix. Run it before a call and we can start from the results.",
        },
      ],
    },
  },
  {
    path: "/services/seo/ecommerce-seo/",
    kind: "detail",
    pillar: "seo",
    name: "E-commerce SEO",
    serviceType: "E-commerce SEO",
    visual: "seo",
    related: ["/services/web/ecommerce-websites/", "/services/seo/technical-seo/"],
    tools: ["/tools/seo-audit/", "/tools/schema-generator/"],
    content: {
      outcome:
        "More orders from people searching for the products you sell, through category and product pages that rank and convert.",
      audience: [
        "Shopify and WooCommerce stores",
        "D2C brands selling in India and abroad",
        "Catalogues with hundreds or thousands of products",
        "Stores moving to a new platform or theme",
      ],
      changes: [
        "Category pages rank for broad product searches",
        "Product pages show ratings and stock in Google",
        "Filters and variants stop creating duplicate pages",
        "Product and category pages load fast on phones",
        "Search traffic is tracked through to orders",
        "Best sellers get the most search attention",
      ],
      deliverables: [
        {
          title: "Keyword and category map",
          body: "Which search each category and product page should win, so pages stop competing with each other.",
        },
        {
          title: "Category page content",
          body: "Short, useful copy and buying guidance on the category pages that matter most, placed so it doesn't push products down.",
        },
        {
          title: "Product page templates",
          body: "Titles, descriptions, headings and image alt text set up once in the template and applied across the catalogue.",
        },
        {
          title: "Product structured data",
          body: "Product, review and breadcrumb markup, so products can show ratings and availability in search results.",
        },
        {
          title: "Filters and duplicates",
          body: "Rules for filter, sort and variant URLs: canonicals and noindex where needed, so Google spends its time on real pages.",
        },
        {
          title: "Speed on key templates",
          body: "Image sizes, apps and scripts trimmed on product and category pages until Core Web Vitals pass on phones.",
        },
        {
          title: "Internal linking",
          body: "Breadcrumbs, related products and collection links that pass search value to the pages that sell.",
        },
        {
          title: "Migration support",
          body: "A full redirect map and checks before and after launch when you move platform or change URLs.",
        },
        {
          title: "Revenue tracking",
          body: "Google Analytics 4 e-commerce events, so the monthly report shows orders and revenue from search.",
        },
      ],
      process: [
        {
          title: "Audit",
          body: "A full crawl, Search Console coverage, and a review of your product and category templates.",
          duration: "Weeks 1–2",
        },
        {
          title: "Keyword map",
          body: "Searches matched to categories and products, with the best sellers first.",
          duration: "Weeks 2–3",
        },
        {
          title: "Template fixes",
          body: "Structured data, duplicates, speed and on-page changes made once in the templates.",
          duration: "Weeks 3–6",
        },
        {
          title: "Content",
          body: "Category copy, buying guides and new collections, in order of the revenue they can bring.",
          duration: "Month 2 onwards",
        },
        {
          title: "Report",
          body: "Traffic, orders and revenue from search each month, by category.",
          duration: "Monthly",
        },
      ],
      stack: [
        "Shopify",
        "WooCommerce",
        "Google Search Console",
        "Google Analytics 4",
        "Screaming Frog",
        "PageSpeed Insights",
        "Schema.org",
      ],
      results: [
        {
          sample: true,
          metric: "3.2×",
          label: "organic traffic in 6 months",
          context: "Sample figure for a handmade ceramics store. Not a real client yet.",
        },
        {
          sample: true,
          metric: "41%",
          label: "of sales now from search",
          context: "Sample figure for the same store. Not a real client yet.",
        },
      ],
      engagement: [
        { model: "fixed-scope", fit: "Good for a technical clean-up, template fixes or a platform migration." },
        { model: "retainer", fit: "Good for category content and reporting as the catalogue grows." },
        { model: "dedicated-team", fit: "Good for large catalogues that need SEO in every product launch." },
      ],
      costFactors: [
        "Number of products and categories",
        "Your platform, theme and installed apps",
        "How much product content already exists",
        "How many countries you sell to",
        "Whether a platform migration is involved",
      ],
      faqs: [
        {
          q: "Is Shopify or WooCommerce better for SEO?",
          a: "Both can rank well. Shopify is simpler to run but less flexible with URLs. WooCommerce gives more control but needs more care with speed and plugins. The bigger difference is how the store is set up.",
        },
        {
          q: "Will moving to a new platform hurt our rankings?",
          a: "It can, if old URLs are lost. With a full redirect map, checks before launch and monitoring after, most stores keep their rankings. Bring us in before the move, not after.",
        },
        {
          q: "We have thousands of products. How do you write for all of them?",
          a: "We fix the template so every product page gets sound titles, headings and markup at once. Then we write by hand for the best sellers and the categories that bring the most revenue.",
        },
        {
          q: "Can our products show star ratings in Google?",
          a: "Yes, if you collect genuine reviews and the pages have the right structured data. Google decides when to show them, but without the markup they cannot appear.",
        },
        {
          q: "What should we do with out-of-stock products?",
          a: "If the product will come back, keep the page live and say when. If it is gone for good, redirect it to the closest product or category so the search value is kept.",
        },
        {
          q: "How soon will sales from search grow?",
          a: "Template and technical fixes often show within 4 to 8 weeks. Category rankings for competitive products usually take 3 to 6 months. The monthly report tracks orders, not only traffic.",
        },
      ],
    },
  },
  {
    path: "/services/seo/technical-seo/",
    kind: "detail",
    pillar: "seo",
    name: "Technical SEO",
    serviceType: "Technical SEO and site audit",
    visual: "seo",
    related: ["/services/web/website-development/", "/services/seo/ai-search-optimization/"],
    tools: ["/tools/seo-audit/", "/tools/sitemap-generator/"],
    content: {
      outcome: "A site Google can crawl, index and load quickly, with a prioritised fix list and the fixes done.",
      audience: [
        "Sites with important pages missing from Google",
        "Sites that lost traffic after a redesign or migration",
        "Large or JavaScript-heavy sites built with React or Next.js",
        "Development teams that want clear, prioritised tickets",
      ],
      changes: [
        "Every important page is indexed",
        "Each page has one URL, without duplicates",
        "Core Web Vitals pass on phones",
        "Old URLs redirect cleanly, with no broken links",
        "Structured data is valid and complete",
        "Your developers know exactly what to fix first",
      ],
      deliverables: [
        {
          title: "Full crawl and audit",
          body: "Every page crawled the way Google sees it, with issues ranked by how much traffic they cost you.",
        },
        {
          title: "Indexing and crawling",
          body: "robots.txt, XML sitemaps, noindex tags and Search Console coverage reports checked and fixed.",
        },
        {
          title: "Core Web Vitals",
          body: "Loading (LCP), responsiveness (INP) and layout shift (CLS) measured on real users' phones, then improved.",
        },
        {
          title: "Redirects and broken links",
          body: "Redirect chains shortened, 404s fixed or redirected, and internal links pointed at the right pages.",
        },
        {
          title: "Canonicals and duplicates",
          body: "One URL per page: trailing slashes, parameters, http and www variants all resolved.",
        },
        {
          title: "Structured data",
          body: "Schema.org markup for your business, services, products, articles and FAQs, validated with Google's tools.",
        },
        {
          title: "JavaScript rendering",
          body: "Checks that Google sees your content and links on sites built with React, Next.js or other frameworks.",
        },
        {
          title: "Migration planning",
          body: "URL mapping, redirects and launch-day checks for a new site, domain or platform.",
        },
        {
          title: "Fixes or tickets",
          body: "We make the fixes ourselves, or write tickets your developers can pick up without a meeting.",
        },
      ],
      process: [
        {
          title: "Crawl",
          body: "A full crawl plus Search Console, Analytics and speed data from real users.",
          duration: "Week 1",
        },
        {
          title: "Diagnose",
          body: "Issues ranked by impact and effort, so the biggest wins come first.",
          duration: "Week 2",
        },
        {
          title: "Fix",
          body: "Fixes made by us or by your team from our tickets, highest impact first.",
          duration: "Weeks 3–6",
        },
        {
          title: "Verify",
          body: "A second crawl and Search Console validation to confirm each fix worked.",
          duration: "Weeks 6–8",
        },
        {
          title: "Monitor",
          body: "Ongoing checks so new releases don't break what was fixed.",
          duration: "Monthly",
        },
      ],
      stack: [
        "Google Search Console",
        "Screaming Frog",
        "PageSpeed Insights",
        "Lighthouse",
        "Rich Results Test",
        "Bing Webmaster Tools",
        "Next.js",
        "WordPress",
        "Shopify",
      ],
      results: [
        {
          sample: true,
          metric: "96%",
          label: "of key pages indexed, up from 61%",
          context: "Sample figure for a services site after a migration. Not a real client yet.",
        },
        {
          sample: true,
          metric: "1.8 s",
          label: "mobile LCP, down from 4.2 s",
          context: "Sample figure for a WordPress site. Not a real client yet.",
        },
      ],
      engagement: [
        { model: "fixed-scope", fit: "Good for an audit with fixes, or a migration with a redirect plan." },
        { model: "retainer", fit: "Good for sites that change often and need regular checks." },
        { model: "dedicated-team", fit: "Good for product teams that want SEO review before every release." },
      ],
      costFactors: [
        "Number of pages and page templates",
        "Your platform, and whether we or your developers make the fixes",
        "How serious the current issues are",
        "Whether a migration is involved",
        "How often the site changes",
      ],
      faqs: [
        {
          q: "How is this different from your free SEO audit?",
          a: "The free tool checks one page automatically in about a minute. A technical audit crawls the whole site, uses your Search Console and Analytics data, and a person reviews every finding and plans the fixes.",
        },
        {
          q: "Do you fix the issues or only report them?",
          a: "Either. We can make the fixes ourselves on most platforms, or write tickets for your developers and check their work afterwards.",
        },
        {
          q: "Will you need access to our code?",
          a: "Not for the audit. For fixes we need CMS access, or access to your code repository if the site is custom built. We can also work only through your developers.",
        },
        {
          q: "We are moving to a new site. When should we involve you?",
          a: "Before the new site is built. URL decisions made early are easy to get right and expensive to fix after launch.",
        },
        {
          q: "Our site is built with React. Can Google read it?",
          a: "Usually, but not always fully. We check what Google actually renders. Server-side rendering, as in Next.js, removes most of the risk.",
        },
        {
          q: "How do you measure Core Web Vitals?",
          a: "From real-user data in Search Console and the Chrome UX Report, backed by lab tests in PageSpeed Insights to find the cause of each problem.",
        },
        {
          q: "How often should a technical audit be done?",
          a: "Once a year for most sites, and before and after any big change such as a redesign, migration or new platform.",
        },
      ],
    },
  },
  {
    path: "/services/seo/ai-search-optimization/",
    kind: "detail",
    pillar: "seo",
    name: "AI search optimization",
    serviceType: "Generative engine optimization (GEO) and answer engine optimization (AEO)",
    visual: "seo",
    related: ["/services/seo/technical-seo/", "/services/seo/local-seo/"],
    tools: ["/tools/schema-generator/", "/tools/seo-audit/"],
    content: {
      outcome:
        "Get your business named and linked in Google AI Overviews, ChatGPT, Perplexity and Copilot answers about what you do.",
      audience: [
        "B2B and service businesses whose buyers research with AI assistants",
        "Brands that rank well but see fewer clicks from Google",
        "Experts and firms with knowledge worth quoting",
        "Businesses that want to know what AI tools say about them",
      ],
      changes: [
        "AI search crawlers can reach your site",
        "Key pages answer real questions in quotable passages",
        "Your business details match everywhere online",
        "Structured data describes who you are and what you offer",
        "You know which AI answers mention you, and which don't",
      ],
      deliverables: [
        {
          title: "AI visibility check",
          body: "The questions your buyers ask, tested in ChatGPT, Perplexity, Gemini, Copilot and Google AI Overviews, with who gets cited today.",
        },
        {
          title: "Crawler access",
          body: "robots.txt rules for AI search crawlers such as OAI-SearchBot, PerplexityBot and ClaudeBot, plus an llms.txt file.",
        },
        {
          title: "Answer-ready pages",
          body: "Key pages restructured so each section answers one question in a short, self-contained passage that is easy to quote.",
        },
        {
          title: "Entity and schema",
          body: "Organization, Service, Person and FAQ markup, and the same name, address and description everywhere.",
        },
        {
          title: "Mentions on trusted sites",
          body: "Getting your business listed and mentioned in the directories, publications and comparison pages AI tools read.",
        },
        {
          title: "Expertise signals",
          body: "Author pages, credentials and first-hand examples that show real people with real experience wrote your content.",
        },
        {
          title: "Monthly tracking",
          body: "The same set of questions re-tested each month, plus visits from AI assistants measured in Analytics.",
        },
      ],
      process: [
        {
          title: "Baseline",
          body: "Your buyers' questions tested across AI tools, and who they cite today.",
          duration: "Weeks 1–2",
        },
        {
          title: "Access",
          body: "Crawler rules, llms.txt and structured data in place.",
          duration: "Week 2",
        },
        {
          title: "Content",
          body: "Key pages rewritten into clear answers, with sources and examples.",
          duration: "Weeks 3–8",
        },
        {
          title: "Mentions",
          body: "Listings and mentions on the sites AI tools trust for your industry.",
          duration: "Ongoing",
        },
        {
          title: "Track",
          body: "Monthly re-tests and AI referral visits in your report.",
          duration: "Monthly",
        },
      ],
      stack: [
        "ChatGPT",
        "Perplexity",
        "Google AI Overviews",
        "Gemini",
        "Microsoft Copilot",
        "Google Search Console",
        "Google Analytics 4",
        "Schema.org",
        "llms.txt",
      ],
      results: [
        {
          sample: true,
          metric: "9 of 20",
          label: "test questions now cite the site, up from 2",
          context: "Sample figure for a B2B services firm. Not a real client yet.",
        },
        {
          sample: true,
          metric: "4×",
          label: "visits from AI assistants",
          context: "Sample figure for the same firm over 6 months. Not a real client yet.",
        },
      ],
      engagement: [
        { model: "fixed-scope", fit: "Good for a visibility check and a one-off fix of access, schema and key pages." },
        { model: "retainer", fit: "Good for monthly content, mentions and tracking." },
      ],
      costFactors: [
        "How many services or topics you want to be cited for",
        "The state of your current content",
        "How crowded AI answers are in your field",
        "How many AI tools and countries we track",
      ],
      faqs: [
        {
          q: "What are GEO and AEO?",
          a: "Generative engine optimization and answer engine optimization. Both mean making your business easy for AI tools to find, understand and cite when they answer a question.",
        },
        {
          q: "Is this different from normal SEO?",
          a: "It builds on it. AI answers mostly draw on pages that already rank, so SEO comes first. AI search work adds quotable passages, consistent business facts and mentions on trusted sites.",
        },
        {
          q: "Can you guarantee ChatGPT will mention us?",
          a: "No. No one controls what AI tools say. We improve the signals they rely on and track the results every month, so you can see whether it is working.",
        },
        {
          q: "Should we block AI crawlers?",
          a: "Usually not. Blocking AI search crawlers keeps you out of AI answers. Some businesses block crawlers used only for training while allowing search crawlers, and we can set that up.",
        },
        {
          q: "What is llms.txt?",
          a: "A proposed file that gives AI tools a short guide to your site. It is quick to add, but it is not a ranking factor and not every AI tool reads it yet.",
        },
        {
          q: "How do you measure results?",
          a: "We re-test a fixed set of buyer questions in each AI tool every month, and measure visits from ChatGPT, Perplexity and others in Google Analytics.",
        },
      ],
    },
  },
];
