import type { Service } from "./types";

// SEO pillar: hub + 4 (P4.3, reworked in the 2026-10-21 redesign). Results
// and report figures are SAMPLE data until real client results are supplied.
// Never promise rankings or name a price.

export const seoServices: Service[] = [
  {
    path: "/services/seo/",
    kind: "hub",
    pillar: "seo",
    name: "SEO",
    serviceType: "Search engine optimization",
    visual: "seo",
    content: {
      outcome:
        "More of the right people find you on Google, in Maps and in AI answers, and you can see which pages bring enquiries.",
      segments: [
        {
          title: "Local shops, clinics and services",
          photo: "barber",
          search: "best men's salon near me",
          problem:
            "People nearby search for exactly what you do, and Google shows three competitors in the map before your name appears.",
          outcomes: [
            "Your profile shows in the map pack for your main services",
            "Reviews and photos that make people call",
            "Calls and direction requests tracked every month",
          ],
        },
        {
          title: "Online stores",
          photo: "packingLabel",
          search: "handmade ceramic mugs online",
          problem:
            "Most orders come through marketplaces that take a cut, and your own product pages rarely show up in Google.",
          outcomes: [
            "Category and product pages that rank for buying searches",
            "Ratings and stock shown in search results",
            "Revenue from search tracked to the order",
          ],
        },
        {
          title: "Service firms and B2B",
          photo: "consultant",
          search: "industrial automation consultant pune",
          problem:
            "Buyers research for weeks before they get in touch. If they never find you while researching, you never make the shortlist.",
          outcomes: [
            "Pages that answer what buyers actually ask",
            "Your name in AI answers and comparisons",
            "Enquiries from search, not only referrals",
          ],
        },
        {
          title: "Businesses selling abroad",
          photo: "videoCall",
          search: "software development company for startups",
          problem:
            "You serve clients in the US, UAE or UK, but your site only shows up, if at all, for searches made in India.",
          outcomes: [
            "Pages planned for buyers in each country you sell to",
            "Proof and examples that international clients look for",
            "Reports that split traffic and enquiries by country",
          ],
        },
      ],
      deliverables: [],
      process: [
        {
          title: "Audit",
          body: "We crawl the site, read Search Console and Analytics, and study the competitors ranking above you.",
          duration: "Week 1",
          photo: "analyticsLaptop",
          art: "seo-audit",
        },
        {
          title: "Plan",
          body: "A prioritised list: fixes first, then pages to improve, then new content. You approve it before we start.",
          duration: "Week 2",
          photo: "whiteboard",
          art: "seo-plan",
        },
        {
          title: "Fix the foundations",
          body: "Technical fixes, page titles, internal links and structured data, done or handed to your developer.",
          duration: "Weeks 2–6",
          photo: "codeScreen",
          art: "seo-schema",
        },
        {
          title: "Content and local",
          body: "New and improved pages, Google Business Profile work and listings, in the order the plan sets.",
          duration: "Month 2 onwards",
          photo: "writingNotes",
          art: "seo-content",
        },
        {
          title: "Report and adjust",
          body: "A plain-language report each month, and more effort on whatever is bringing enquiries.",
          duration: "Monthly",
          photo: "laptopDashboard",
          art: "seo-report",
        },
      ],
      reports: [
        {
          art: "seo-report",
          title: "Monthly report",
          body: "One report at the start of every month, in plain language. The first page is a summary you can read in two minutes.",
          points: [
            "Clicks, enquiries and calls from search",
            "Rankings for the searches you care about",
            "What we did this month, and why",
            "What we will do next month",
          ],
        },
        {
          art: "seo-plan",
          title: "Improvement plan",
          body: "A living list of every fix and new page, ranked by the difference it will make. You always see what is done, in progress and planned.",
          points: ["Each task with its impact and effort", "A month-by-month schedule", "Reviewed with you every month"],
        },
        {
          art: "seo-audit",
          title: "Site audit",
          body: "A full crawl of your site at the start and every quarter, with each issue explained and ranked by severity.",
          points: ["Health score and issues by severity", "Why each issue matters, in plain words", "How to fix it, or a ticket for your developer"],
        },
        {
          art: "seo-ranks",
          title: "Rank tracking",
          body: "Daily positions for the searches that bring you customers, so you can see progress between reports.",
          points: ["Position and change for every target search", "Clicks per search from Search Console", "Tracking by city or country"],
        },
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
      stack: [
        "Google Search Console",
        "Google Analytics 4",
        "Google Business Profile",
        "PageSpeed Insights",
        "Semrush",
        "Screaming Frog",
        "Bing Webmaster Tools",
        "Schema.org",
        "Perplexity",
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
    card: { art: "seo-local" },
    content: {
      outcome:
        "Show up in Google Maps and local results when people nearby search for what you offer, and turn those views into calls and visits.",
      segments: [
        {
          title: "Clinics and healthcare",
          photo: "doctor",
          search: "dentist near me",
          problem: "Patients search on their phone and book whichever clinic shows first in Maps with the best reviews.",
          outcomes: [
            "A complete, accurate and active Google profile",
            "A steady flow of genuine patient reviews",
            "A page for each treatment and branch",
          ],
        },
        {
          title: "Restaurants and cafés",
          photo: "restaurantOwner",
          search: "south indian restaurant baner",
          problem: "Hungry people decide in seconds from photos, hours and stars. Old photos or wrong hours send them next door.",
          outcomes: [
            "Fresh photos, menu and hours on Google",
            "A reply to every review, good or bad",
            "More calls and direction requests each month",
          ],
        },
        {
          title: "Salons and home services",
          photo: "electrician",
          search: "electrician near me",
          problem: "You do great work, but competitors with more reviews take the top three spots in Maps.",
          outcomes: [
            "A service area set up correctly, even without a shop",
            "Easy review requests by link or QR code",
            "Rankings checked across every part of your area",
          ],
        },
        {
          title: "Businesses with several branches",
          photo: "furnitureDisplay",
          search: "furniture showroom in pune",
          problem: "Each branch has its own listing, some duplicated or out of date, and none has its own page on your website.",
          outcomes: [
            "One accurate profile per branch",
            "A useful page for every location",
            "Calls and visits tracked branch by branch",
          ],
        },
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
          photo: "analyticsLaptop",
          art: "seo-audit",
        },
        {
          title: "Fix",
          body: "Profile details, verification problems, duplicate listings and mismatched addresses.",
          duration: "Weeks 2–3",
          photo: "phoneLaptop",
          art: "seo-local",
        },
        {
          title: "Build",
          body: "Location pages, structured data and links from your main pages to each branch.",
          duration: "Weeks 3–6",
          photo: "codeScreen",
          art: "seo-schema",
        },
        {
          title: "Grow",
          body: "Review requests, posts, photos and new listings, every month.",
          duration: "Monthly",
          photo: "restaurantOwner",
          art: "seo-ranks",
        },
        {
          title: "Report",
          body: "A short monthly report on calls, visits and rankings, area by area.",
          duration: "Monthly",
          photo: "laptopDashboard",
          art: "seo-report",
        },
      ],
      reports: [
        {
          art: "seo-local",
          title: "Profile insights",
          body: "What your Google profile did this month: how many people called, asked for directions or visited your website.",
          points: ["Calls, direction requests and website clicks", "New reviews and your replies", "Photo and post views"],
        },
        {
          art: "seo-ranks",
          title: "Local rank tracking",
          body: "Where you appear in Maps for your main searches, checked across your whole area rather than from one spot.",
          points: ["Position for each service and area", "Changes since last month", "Competitors above and below you"],
        },
        {
          art: "seo-report",
          title: "Monthly report",
          body: "Everything in one short report: results, what we did and what comes next month.",
          points: ["Calls and visits by branch", "Work done this month", "Plan for next month"],
        },
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
    card: { art: "seo-product" },
    content: {
      outcome:
        "More orders from people searching for the products you sell, through category and product pages that rank and convert.",
      segments: [
        {
          title: "Shopify and WooCommerce stores",
          photo: "packingLabel",
          search: "handmade ceramic mugs",
          problem: "Your products are lovely, but in Google your store shows up below marketplaces selling something similar.",
          outcomes: [
            "Category pages that rank for broad product searches",
            "Product pages with ratings and stock in Google",
            "Best sellers getting the most attention",
          ],
        },
        {
          title: "D2C brands",
          photo: "serum",
          search: "vitamin c serum for oily skin",
          problem: "Most of your orders come through marketplaces that take a cut and keep the customer relationship.",
          outcomes: [
            "More orders on your own store",
            "Customers who come back to you directly",
            "Revenue from search tracked in Analytics",
          ],
        },
        {
          title: "Large catalogues",
          photo: "warehouse",
          search: "nitrile safety gloves bulk",
          problem: "Thousands of products, filters creating duplicate pages, and Google indexing the wrong ones.",
          outcomes: [
            "Templates that fix every product page at once",
            "Filters and variants that stop creating duplicates",
            "Google spending its time on pages that sell",
          ],
        },
        {
          title: "Stores changing platform",
          photo: "shopOnline",
          search: "buy stoneware plates online",
          problem: "You're moving to a new platform and worried years of rankings will vanish overnight.",
          outcomes: [
            "A full redirect map before launch",
            "Checks on launch day",
            "Rankings watched closely for weeks after",
          ],
        },
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
          photo: "analyticsLaptop",
          art: "seo-audit",
        },
        {
          title: "Keyword map",
          body: "Searches matched to categories and products, with the best sellers first.",
          duration: "Weeks 2–3",
          photo: "whiteboard",
          art: "seo-plan",
        },
        {
          title: "Template fixes",
          body: "Structured data, duplicates, speed and on-page changes made once in the templates.",
          duration: "Weeks 3–6",
          photo: "codeScreen",
          art: "seo-product",
        },
        {
          title: "Content",
          body: "Category copy, buying guides and new collections, in order of the revenue they can bring.",
          duration: "Month 2 onwards",
          photo: "writingNotes",
          art: "seo-content",
        },
        {
          title: "Report",
          body: "Traffic, orders and revenue from search each month, by category.",
          duration: "Monthly",
          photo: "laptopDashboard",
          art: "seo-report",
        },
      ],
      reports: [
        {
          art: "seo-report",
          title: "Monthly report",
          body: "Orders and revenue from search, not only traffic, with what we did and what comes next.",
          points: ["Orders and revenue from search", "Best and worst performing categories", "Next month's priorities"],
        },
        {
          art: "seo-product",
          title: "Search appearance",
          body: "How your products look in Google: whether ratings and stock show, and how clicks change after each fix.",
          points: ["Product schema status", "Review stars and stock in results", "Clicks per product page"],
        },
        {
          art: "seo-plan",
          title: "Improvement plan",
          body: "Every template fix and content task, ranked by the revenue it can bring.",
          points: ["Impact and effort for each task", "Month-by-month schedule", "Done, in progress and planned"],
        },
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
      stack: [
        "Shopify",
        "WooCommerce",
        "Google Search Console",
        "Google Analytics 4",
        "Semrush",
        "Screaming Frog",
        "PageSpeed Insights",
        "Schema.org",
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
    card: { art: "seo-audit" },
    content: {
      outcome: "A site Google can crawl, index and load quickly, with a prioritised fix list and the fixes done.",
      segments: [
        {
          title: "Sites missing from Google",
          photo: "analyticsLaptop",
          search: "interior design firm mumbai",
          problem: "Important pages never show in Google, and Search Console is full of warnings nobody has time to read.",
          outcomes: [
            "Every important page indexed",
            "Warnings explained and fixed in order of impact",
            "One URL per page, without duplicates",
          ],
        },
        {
          title: "Sites that lost traffic after a redesign",
          photo: "dualMonitors",
          search: "corporate gifting company bangalore",
          problem: "Traffic dropped after the new site went live, and nobody is sure which old URLs were lost.",
          outcomes: [
            "Lost URLs found and redirected",
            "Broken links and redirect chains cleared",
            "Recovery tracked week by week",
          ],
        },
        {
          title: "React and Next.js products",
          photo: "devTeam",
          search: "project management software for agencies",
          problem: "Your product is built with JavaScript, and Google may be seeing half-empty pages.",
          outcomes: [
            "Content and links that Google can render",
            "Core Web Vitals passing on phones",
            "Structured data on every template",
          ],
        },
        {
          title: "Teams with their own developers",
          photo: "professional",
          search: "logistics company in chennai",
          problem: "Your developers get vague SEO requests and can't tell which ones actually matter.",
          outcomes: [
            "Clear tickets, ranked by impact",
            "Fixes checked after each release",
            "SEO review before big changes ship",
          ],
        },
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
          photo: "analyticsLaptop",
          art: "seo-audit",
        },
        {
          title: "Diagnose",
          body: "Issues ranked by impact and effort, so the biggest wins come first.",
          duration: "Week 2",
          photo: "whiteboard",
          art: "seo-plan",
        },
        {
          title: "Fix",
          body: "Fixes made by us or by your team from our tickets, highest impact first.",
          duration: "Weeks 3–6",
          photo: "codeScreen",
          art: "seo-schema",
        },
        {
          title: "Verify",
          body: "A second crawl and Search Console validation to confirm each fix worked.",
          duration: "Weeks 6–8",
          photo: "dualMonitors",
          art: "web-launch",
        },
        {
          title: "Monitor",
          body: "Ongoing checks so new releases don't break what was fixed.",
          duration: "Monthly",
          photo: "laptopDashboard",
          art: "seo-report",
        },
      ],
      reports: [
        {
          art: "seo-audit",
          title: "Site audit",
          body: "Every issue on your site, explained in plain words and ranked by how much traffic it costs you.",
          points: ["Health score and issues by severity", "Why each issue matters", "How to fix it, step by step"],
        },
        {
          art: "seo-plan",
          title: "Fix plan",
          body: "The audit turned into a schedule, with each fix sized so your team can plan around it.",
          points: ["Impact and effort for each fix", "Who does what, and when", "Status you can check any time"],
        },
        {
          art: "web-launch",
          title: "Speed report",
          body: "Lighthouse scores and real-user Core Web Vitals, before and after the fixes.",
          points: ["LCP, INP and CLS on phones", "Lighthouse scores by template", "What slowed each page down"],
        },
        {
          art: "seo-schema",
          title: "Structured data check",
          body: "The markup on your key templates, validated with Google's Rich Results Test.",
          points: ["Valid types and any errors", "Pages with rich results", "Markup to add next"],
        },
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
    card: { art: "seo-ai" },
    content: {
      outcome:
        "Get your business named and linked in Google AI Overviews, ChatGPT, Perplexity and Copilot answers about what you do.",
      segments: [
        {
          title: "B2B and service firms",
          photo: "consultant",
          search: "best ERP consultant for manufacturers in India",
          problem: "Buyers now ask AI assistants for a shortlist. If you are not in the answer, you are not on the list.",
          outcomes: [
            "Your firm named in answers about your field",
            "Pages written so AI tools can quote them",
            "Mentions on the sites AI tools trust",
          ],
        },
        {
          title: "Brands seeing fewer clicks",
          photo: "laptopDashboard",
          search: "how to choose a solar inverter",
          problem: "You still rank, but Google's AI Overview answers the question and fewer people click through to you.",
          outcomes: [
            "Your pages cited inside the AI Overview",
            "Content that earns the click for the next step",
            "Visits from AI assistants measured",
          ],
        },
        {
          title: "Experts and specialist firms",
          photo: "professional",
          search: "is a courtyard house good for indian climate",
          problem: "You know your field better than anyone, but AI tools quote other websites when they answer.",
          outcomes: [
            "Your expertise shown with authors and examples",
            "Clear answers to the questions you get asked",
            "Your site cited as a source",
          ],
        },
        {
          title: "Businesses checking their reputation",
          photo: "teamCollab",
          search: "is your company reliable",
          problem: "You have no idea what AI assistants tell customers when they ask about you.",
          outcomes: [
            "A baseline of what each AI tool says today",
            "Wrong or outdated facts corrected at the source",
            "Monthly checks on the same questions",
          ],
        },
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
          photo: "phoneLaptop",
          art: "seo-ai",
        },
        {
          title: "Access",
          body: "Crawler rules, llms.txt and structured data in place.",
          duration: "Week 2",
          photo: "codeScreen",
          art: "seo-schema",
        },
        {
          title: "Content",
          body: "Key pages rewritten into clear answers, with sources and examples.",
          duration: "Weeks 3–8",
          photo: "writingNotes",
          art: "seo-content",
        },
        {
          title: "Mentions",
          body: "Listings and mentions on the sites AI tools trust for your industry.",
          duration: "Ongoing",
          photo: "contractSign",
          art: "seo-ranks",
        },
        {
          title: "Track",
          body: "Monthly re-tests and AI referral visits in your report.",
          duration: "Monthly",
          photo: "laptopDashboard",
          art: "seo-report",
        },
      ],
      reports: [
        {
          art: "seo-ai",
          title: "AI visibility report",
          body: "A fixed set of buyer questions asked in each AI tool every month, with who gets cited and whether it is you.",
          points: ["Answers from ChatGPT, Perplexity, Gemini and Copilot", "Which sources each answer cites", "Change since last month"],
        },
        {
          art: "seo-content",
          title: "Content briefs",
          body: "For each page we rewrite: the questions it must answer and how to structure it so AI tools can quote it.",
          points: ["Target questions and search intent", "Outline and passage structure", "Sources and examples to include"],
        },
        {
          art: "seo-report",
          title: "Monthly report",
          body: "Citations, AI referral visits and search results together, with next month's plan.",
          points: ["Citations across AI tools", "Visits from AI assistants", "Work done and next steps"],
        },
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
      stack: [
        "ChatGPT",
        "Perplexity",
        "Google AI Overviews",
        "Gemini",
        "Claude",
        "Microsoft Copilot",
        "Google Search Console",
        "Google Analytics 4",
        "Schema.org",
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
