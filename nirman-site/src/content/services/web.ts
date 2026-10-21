import type { Service } from "./types";

// Web pillar: hub + 5 (P4.4, reworked in the 2026-10-21 redesign). Results
// and report figures are SAMPLE data until real client results are supplied.
// Never name a price.

export const webServices: Service[] = [
  {
    path: "/services/web/",
    kind: "hub",
    pillar: "web",
    name: "Website",
    serviceType: "Website design and development",
    visual: "web",
    content: {
      outcome:
        "A fast, clear website that explains what you do in seconds, works on every phone, and turns visitors into enquiries.",
      segments: [
        {
          title: "Businesses with an outdated site",
          photo: "ownerDesk",
          search: "interior designer in pune",
          problem: "Your site was built years ago. It looks dated on phones and no longer says what you do today.",
          outcomes: [
            "A site that explains what you do in one line",
            "Designed for phones first, then desktop",
            "Every enquiry form tracked to your inbox or CRM",
          ],
        },
        {
          title: "New businesses",
          photo: "laptopTeam",
          search: "boutique travel agency for rajasthan tours",
          problem: "You need to look credible from day one, and a template site makes you look like everyone else.",
          outcomes: [
            "A site that looks like your brand, not a theme",
            "Copy written with you, in your customers' words",
            "Built for search from the first day",
          ],
        },
        {
          title: "Online stores",
          photo: "shopperPhone",
          search: "handloom cotton sarees online",
          problem: "Shoppers arrive on their phones, struggle with a slow store and leave before checking out.",
          outcomes: [
            "A store that is quick to shop on a phone",
            "Payments that work in India and abroad",
            "Order updates sent automatically",
          ],
        },
        {
          title: "Teams that update their own site",
          photo: "womanSofa",
          search: "corporate training company india",
          problem: "Every small text change means emailing a developer and waiting a week.",
          outcomes: [
            "A simple editor your team can use",
            "Page sections that always look right",
            "A short training session at handover",
          ],
        },
      ],
      deliverables: [],
      process: [
        {
          title: "Discovery",
          body: "Your goals, customers and competitors, and the questions visitors need answered before they get in touch.",
          duration: "Week 1",
          photo: "teamCollab",
          art: "web-sitemap",
        },
        {
          title: "Structure and copy",
          body: "Sitemap, page outlines and wording, agreed before any design starts.",
          duration: "Weeks 1–2",
          photo: "writingNotes",
          art: "seo-content",
        },
        {
          title: "Design",
          body: "Desktop and phone layouts designed separately, reviewed with you in Figma.",
          duration: "Weeks 2–3",
          photo: "designerTablet",
          art: "web-design",
        },
        {
          title: "Build",
          body: "Development, CMS set-up, forms, tracking and on-page SEO.",
          duration: "Weeks 3–5",
          photo: "codeScreen",
          art: "web-cms",
        },
        {
          title: "Test and launch",
          body: "Speed, accessibility, forms and redirects checked on real phones, then a planned launch.",
          duration: "Weeks 5–6",
          photo: "celebrate",
          art: "web-launch",
        },
      ],
      reports: [
        {
          art: "web-sitemap",
          title: "Sitemap and page plan",
          body: "Every page on the new site and the question it answers for your visitors, agreed before design starts.",
          points: ["Pages and how they link", "The job of each page", "Content you need to supply"],
        },
        {
          art: "web-design",
          title: "Design system",
          body: "Your colours, type, buttons and page layouts in one Figma file, so new pages always match.",
          points: ["Desktop and phone layouts", "Reusable components", "Accessibility checked"],
        },
        {
          art: "web-launch",
          title: "Launch report",
          body: "Proof the site is ready: speed, accessibility and SEO scores, plus every launch check ticked.",
          points: ["Lighthouse and Core Web Vitals", "Redirects, forms and analytics tested", "Handover and training done"],
        },
        {
          art: "web-maintain",
          title: "Maintenance report",
          body: "If we look after the site after launch, a short report every month on uptime, backups, updates and changes.",
          points: ["Uptime and response time", "Backups and security", "Updates and content changes made"],
        },
      ],
      results: [
        {
          sample: true,
          metric: "2.4×",
          label: "direct bookings after the new site",
          context: "Sample figure for a hill resort. Not a real client yet.",
        },
        {
          sample: true,
          metric: "1.6 s",
          label: "load time on a mid-range phone",
          context: "Sample figure for a services website. Not a real client yet.",
        },
      ],
      stack: ["Figma", "Next.js", "React", "WordPress", "Shopify", "WooCommerce", "Sanity", "Vercel", "Google Analytics 4"],
      faqs: [
        {
          q: "How long does it take to build a website?",
          a: "A business website usually takes 3 to 6 weeks. Online stores and sites with custom features take longer. You get a week-by-week plan before we start.",
        },
        {
          q: "Do I own the website?",
          a: "Yes. The code, content, domain and accounts are yours, and we hand over every login at launch.",
        },
        {
          q: "Can my team update the site after launch?",
          a: "Yes. We set up a CMS your team can use to change text, images, pages and blog posts, and we show them how in a short handover session.",
        },
        {
          q: "Should we use WordPress, Shopify or a custom build?",
          a: "It depends on what the site has to do. WordPress suits content-heavy sites, Shopify suits most online stores, and a custom Next.js build suits sites that need top speed or custom features. We recommend one after discovery.",
        },
        {
          q: "Do you write the content?",
          a: "We can. We write the copy from a short interview with you, or edit what you have. Either way, the wording is agreed before design starts.",
        },
        {
          q: "Is SEO included?",
          a: "On-page SEO is part of every build: page titles, headings, structured data, sitemaps, redirects from your old site and fast loading. Ongoing SEO is a separate service.",
        },
        {
          q: "Do you work with clients outside India?",
          a: "Yes. We build sites for clients in the US, UAE, UK and elsewhere, working remotely from India, with calls booked in your time zone.",
        },
      ],
    },
  },
  {
    path: "/services/web/website-design/",
    kind: "detail",
    pillar: "web",
    name: "Website design",
    serviceType: "Website design",
    visual: "web",
    card: { art: "web-design" },
    content: {
      outcome:
        "A website design built around your customers' questions, so visitors understand what you do and know what to do next.",
      segments: [
        {
          title: "Sites that look dated or unclear",
          photo: "furnitureDisplay",
          search: "modular kitchen showroom near me",
          problem: "Visitors land on your homepage and can't tell within a few seconds what you sell or why you're different.",
          outcomes: ["A homepage that says what you do in one line", "Each page leading to one clear next step", "A look that matches the quality of your work"],
        },
        {
          title: "New brands",
          photo: "colorSwatches",
          search: "organic skincare brand india",
          problem: "You have a name and maybe a logo, but no visual language for a full website.",
          outcomes: ["Colours, type and components that fit your brand", "Photography direction you can follow", "A design system that grows with you"],
        },
        {
          title: "Teams with their own developer",
          photo: "devTeam",
          search: "saas for clinic management",
          problem: "Your developer can build anything, but needs designs that are complete, consistent and ready to hand over.",
          outcomes: ["Every page for desktop and phone", "States, spacing and components specified", "A walkthrough and answers during the build"],
        },
        {
          title: "Sites with traffic but few enquiries",
          photo: "laptopDashboard",
          search: "chartered accountant for startups",
          problem: "Analytics shows plenty of visitors, but very few fill in the form or call.",
          outcomes: ["Pages that answer the questions people have", "Forms that are short and easy on phones", "Proof placed where doubts come up"],
        },
      ],
      deliverables: [
        {
          title: "Discovery workshop",
          body: "Your customers, their questions and objections, and what makes you different, in one working session.",
        },
        {
          title: "Sitemap and page outlines",
          body: "Which pages you need and what each one must answer, agreed before any visual design.",
        },
        {
          title: "Copywriting",
          body: "Clear headlines and page copy written with you, or editing of the text you already have.",
        },
        {
          title: "Desktop and phone layouts",
          body: "Each page designed for desktop and for phone separately, so neither feels like an afterthought.",
        },
        {
          title: "Design system",
          body: "Colours, type, buttons, forms and components in Figma, so new pages stay consistent.",
        },
        {
          title: "Accessibility",
          body: "Contrast, font sizes, focus states and tap targets designed to meet WCAG 2.2 AA.",
        },
        {
          title: "Photography direction",
          body: "A shot list and style guide for your photos, or a selection of suitable stock images.",
        },
        {
          title: "Clickable prototype",
          body: "A prototype you can click through on your phone and share with your team before anything is built.",
        },
        {
          title: "Developer handover",
          body: "Specs, assets and a walkthrough for our developers or yours.",
        },
      ],
      process: [
        { title: "Discovery", body: "Workshop, competitor review and goals for the site.", duration: "Week 1", photo: "whiteboard", art: "web-sitemap" },
        { title: "Structure", body: "Sitemap, page outlines and copy agreed.", duration: "Weeks 1–2", photo: "writingNotes", art: "seo-content" },
        { title: "Visual direction", body: "Key pages designed in one style for you to react to.", duration: "Week 2", photo: "colorSwatches", art: "web-design" },
        { title: "Full design", body: "All pages for desktop and phone, plus the design system.", duration: "Weeks 3–4", photo: "designerTablet", art: "web-design" },
        { title: "Prototype and handover", body: "Clickable prototype, final changes and developer handover.", duration: "Week 4", photo: "wireframes", art: "web-cms" },
      ],
      reports: [
        {
          art: "web-sitemap",
          title: "Sitemap and page plan",
          body: "The structure of your site and the question each page answers, agreed with you before design starts.",
          points: ["Pages and how they link", "What each page must answer", "Content checklist"],
        },
        {
          art: "web-design",
          title: "Design system",
          body: "One Figma file with your colours, type, components and every page for desktop and phone.",
          points: ["Desktop and phone layouts", "Reusable components with states", "Accessibility notes"],
        },
      ],
      results: [
        {
          sample: true,
          metric: "2.4×",
          label: "direct bookings after the redesign",
          context: "Sample figure for a hill resort. Not a real client yet.",
        },
        {
          sample: true,
          metric: "3×",
          label: "enquiry form completions",
          context: "Sample figure for an architecture studio. Not a real client yet.",
        },
      ],
      stack: ["Figma", "FigJam", "Google Fonts", "Unsplash", "WCAG 2.2"],
      faqs: [
        {
          q: "Do you design from a template?",
          a: "No. Every layout is designed for your content and customers. We reuse proven patterns, such as how forms and menus behave, but not someone else's theme.",
        },
        {
          q: "Can you design a site that our own developer builds?",
          a: "Yes. You get the Figma files, a design system and a walkthrough, and we answer your developer's questions during the build.",
        },
        {
          q: "How many rounds of changes do we get?",
          a: "Two rounds on the visual direction and two on the full design are usual. We agree the number before we start, so there are no surprises.",
        },
        {
          q: "Do you create logos and brand identity?",
          a: "We design websites, not logos. If you have no brand yet, we set up a simple visual style for the site, or work with your brand designer.",
        },
        {
          q: "Why design desktop and phone separately?",
          a: "Most visitors arrive on a phone, and a phone is not a small desktop. Designing both means each one gets the right layout, text size and order of content.",
        },
        {
          q: "Is the design accessible?",
          a: "Yes. We design to WCAG 2.2 AA: readable contrast, clear focus states, sensible font sizes and tap targets that are easy to hit.",
        },
      ],
    },
  },
  {
    path: "/services/web/website-development/",
    kind: "detail",
    pillar: "web",
    name: "Website development",
    serviceType: "Website development",
    visual: "web",
    card: { art: "web-code" },
    content: {
      outcome:
        "A fast, secure website built from your design, with a CMS your team can use and the SEO basics done properly.",
      segments: [
        {
          title: "A finished design that needs building",
          photo: "designerTablet",
          search: "architecture firm in ahmedabad",
          problem: "Your design is approved, and now you need developers who will build it exactly, on desktop and phone.",
          outcomes: ["Built to match the design closely", "A CMS set up around your content", "Clear progress you can review each week"],
        },
        {
          title: "Sites that are slow or fragile",
          photo: "dualMonitors",
          search: "solar panel installers in jaipur",
          problem: "Pages take ages to load on phones and something breaks every time anyone touches the site.",
          outcomes: ["Pages that pass Core Web Vitals", "A clean build that is safe to edit", "Hosting, SSL and backups set up properly"],
        },
        {
          title: "Sites that need forms and integrations",
          photo: "phoneLaptop",
          search: "home tuition for class 10 near me",
          problem: "Enquiries arrive by email, WhatsApp and phone, and some get lost before anyone replies.",
          outcomes: ["Forms that send leads straight to your CRM", "Booking and payment flows that work", "Every lead tagged with where it came from"],
        },
        {
          title: "Teams outgrowing a page builder",
          photo: "womanSofa",
          search: "event management company in goa",
          problem: "Your site was put together with a page builder. It's heavy, hard to keep consistent and slow to change.",
          outcomes: ["A lean build without the page builder weight", "Editable sections that stay on-brand", "Content moved across without losses"],
        },
      ],
      deliverables: [
        {
          title: "Front-end build",
          body: "Your design built in Next.js or WordPress, matched closely on desktop and phone.",
        },
        {
          title: "Content management",
          body: "A CMS such as Sanity or WordPress, set up so your team can edit pages without breaking the layout.",
        },
        {
          title: "Forms and integrations",
          body: "Enquiry, booking and quote forms connected to email, Nirman CRM or the tools you use.",
        },
        {
          title: "On-page SEO",
          body: "Titles, meta descriptions, headings, structured data, XML sitemap and clean URLs on every page.",
        },
        {
          title: "Performance budget",
          body: "Image optimisation, lazy loading and lean scripts, tested against Core Web Vitals on real phones.",
        },
        {
          title: "Accessibility",
          body: "Semantic HTML, keyboard navigation and screen reader checks to WCAG 2.2 AA.",
        },
        {
          title: "Analytics and tracking",
          body: "Google Analytics 4 and conversion events for forms, calls and WhatsApp clicks, with a cookie banner.",
        },
        {
          title: "Hosting and launch",
          body: "Hosting, SSL, backups, redirects from your old site and a launch checklist.",
        },
      ],
      process: [
        { title: "Technical plan", body: "Platform, CMS, integrations and hosting agreed.", duration: "Week 1", photo: "whiteboard", art: "web-sitemap" },
        { title: "Build", body: "Templates, components and CMS set up from the design.", duration: "Weeks 2–4", photo: "codeScreen", art: "web-design" },
        { title: "Content", body: "Content entered or migrated, and forms connected.", duration: "Weeks 4–5", photo: "writingNotes", art: "web-cms" },
        { title: "Testing", body: "Speed, accessibility, browsers, phones and forms tested.", duration: "Week 5", photo: "dualMonitors", art: "web-launch" },
        { title: "Launch", body: "Redirects, Search Console, analytics and go-live.", duration: "Week 6", photo: "celebrate", art: "web-maintain" },
      ],
      reports: [
        {
          art: "web-launch",
          title: "Launch report",
          body: "Lighthouse scores, Core Web Vitals and every launch check, so you know the site is ready.",
          points: ["Performance, accessibility and SEO scores", "Forms, redirects and analytics tested", "Hosting, SSL and backups confirmed"],
        },
        {
          art: "web-cms",
          title: "Content editor",
          body: "The editor your team uses after launch, set up around your pages and sections.",
          points: ["Edit text, images and sections", "Preview before publishing", "Roles for each team member"],
        },
        {
          art: "web-maintain",
          title: "Maintenance report",
          body: "If we look after the site after launch, a short monthly report on uptime, backups and updates.",
          points: ["Uptime and response time", "Backups and security scans", "Updates and changes made"],
        },
      ],
      results: [
        {
          sample: true,
          metric: "98",
          label: "Lighthouse performance score on mobile",
          context: "Sample figure for a Next.js business site. Not a real client yet.",
        },
        {
          sample: true,
          metric: "45%",
          label: "more enquiries in the first 3 months",
          context: "Sample figure for a services firm. Not a real client yet.",
        },
      ],
      stack: ["Next.js", "React", "TypeScript", "Tailwind CSS", "WordPress", "Sanity", "Vercel", "Cloudflare", "Google Analytics 4"],
      faqs: [
        {
          q: "Which platform will you build on?",
          a: "Usually Next.js with a headless CMS for speed and flexibility, or WordPress when your team already knows it or needs its plugins. We recommend one after the technical plan.",
        },
        {
          q: "Can you build from a design made by someone else?",
          a: "Yes. Send us the Figma or Adobe XD files. We review them for gaps, such as missing phone layouts or states, before we start.",
        },
        {
          q: "Who hosts the website?",
          a: "We set up hosting in your name, usually on Vercel or a managed WordPress host, so you own the account. We can manage it for you if you prefer.",
        },
        {
          q: "Will the site be fast?",
          a: "Yes. We set a performance budget at the start and test against Core Web Vitals on real mid-range phones before launch.",
        },
        {
          q: "Can the site connect to our CRM?",
          a: "Yes. Forms can send leads to Nirman CRM, HubSpot, Zoho or most tools with an API, with the source page and campaign attached.",
        },
        {
          q: "What happens after launch?",
          a: "We fix launch bugs as part of the project. After that, you can maintain the site yourself or move to a monthly maintenance plan.",
        },
      ],
    },
  },
  {
    path: "/services/web/ecommerce-websites/",
    kind: "detail",
    pillar: "web",
    name: "E-commerce websites",
    serviceType: "E-commerce website development (Shopify and WooCommerce)",
    visual: "web",
    card: { art: "web-store" },
    content: {
      outcome:
        "An online store on Shopify or WooCommerce that is easy to shop on a phone, easy to manage, and ready to sell in India and abroad.",
      segments: [
        {
          title: "Brands selling online for the first time",
          photo: "potter",
          search: "handmade ceramic dinner set",
          problem: "You sell at markets, by phone or over WhatsApp, and want a proper store that takes payments.",
          outcomes: ["A store set up and ready to take orders", "UPI, cards and cash on delivery", "Training so you can run it yourselves"],
        },
        {
          title: "Stores outgrowing their theme",
          photo: "packingBox",
          search: "organic tea gift box",
          problem: "Orders are growing, but the store is slow, the theme is limiting and every change needs a workaround.",
          outcomes: ["A faster store designed for phones", "Apps trimmed to the ones you need", "Collections and offers you can manage alone"],
        },
        {
          title: "D2C brands selling abroad",
          photo: "amberBottle",
          search: "natural face oil for dry skin",
          problem: "Customers in the US, UAE and UK want to buy, but payments, shipping and currencies are a tangle.",
          outcomes: ["Payments for Indian and international cards", "Shipping zones and rates set up correctly", "Order updates by email and WhatsApp"],
        },
        {
          title: "Large catalogues",
          photo: "warehouse",
          search: "industrial fasteners online",
          problem: "Hundreds or thousands of products, variants and price lists that are hard to manage and hard to search.",
          outcomes: ["Bulk import from your spreadsheets", "Filters and search that help buyers", "Stock synced with your systems"],
        },
      ],
      deliverables: [
        {
          title: "Store design",
          body: "Home, category, product, cart and checkout pages designed for phones first, in your brand.",
        },
        {
          title: "Platform set-up",
          body: "Shopify or WooCommerce configured: products, variants, collections, taxes and shipping zones.",
        },
        {
          title: "Payments",
          body: "Razorpay, Stripe, PayPal or your preferred gateway, with UPI, cards and cash on delivery where needed.",
        },
        {
          title: "Shipping and fulfilment",
          body: "Shipping rates, courier integrations such as Shiprocket, and order tracking pages.",
        },
        {
          title: "Product import",
          body: "Products, images and descriptions imported from a spreadsheet or your old store.",
        },
        {
          title: "Order notifications",
          body: "Order, shipping and abandoned-cart messages by email and WhatsApp through Nirman CRM.",
        },
        {
          title: "E-commerce SEO basics",
          body: "Product structured data, clean URLs, fast pages and redirects from your old store.",
        },
        {
          title: "Analytics",
          body: "Google Analytics 4 e-commerce tracking, from product views through to purchases.",
        },
        {
          title: "Training",
          body: "A handover session on adding products, running offers and handling orders.",
        },
      ],
      process: [
        { title: "Discovery", body: "Catalogue, payments, shipping, markets and platform choice.", duration: "Week 1", photo: "whiteboard", art: "web-sitemap" },
        { title: "Design", body: "Key store pages designed for phone and desktop.", duration: "Weeks 2–3", photo: "designerTablet", art: "web-design" },
        { title: "Build", body: "Theme, apps, payments, shipping and integrations.", duration: "Weeks 3–6", photo: "codeScreen", art: "web-store" },
        { title: "Products", body: "Catalogue imported and checked.", duration: "Weeks 5–6", photo: "packingLabel", art: "seo-product" },
        { title: "Test and launch", body: "Test orders, payments and notifications, then launch.", duration: "Weeks 7–8", photo: "celebrate", art: "web-launch" },
      ],
      reports: [
        {
          art: "web-store",
          title: "Store and order flow",
          body: "Your store as shoppers see it, with order updates and abandoned-cart reminders running automatically.",
          points: ["Product pages built for phones", "Order and shipping updates by WhatsApp and email", "Abandoned-cart reminders"],
        },
        {
          art: "web-launch",
          title: "Launch report",
          body: "Speed scores, test orders and every payment and notification checked before launch.",
          points: ["Lighthouse and Core Web Vitals", "Test orders on every payment method", "Redirects from your old store"],
        },
        {
          art: "seo-product",
          title: "Search appearance",
          body: "How your products look in Google once product markup and reviews are in place.",
          points: ["Product schema checked", "Ratings and stock in results", "Clicks per product page"],
        },
      ],
      results: [
        {
          sample: true,
          metric: "41%",
          label: "of sales from search within a year",
          context: "Sample figure for a handmade ceramics store. Not a real client yet.",
        },
        {
          sample: true,
          metric: "18%",
          label: "of abandoned carts recovered",
          context: "Sample figure for the same store. Not a real client yet.",
        },
      ],
      stack: ["Shopify", "WooCommerce", "Razorpay", "Stripe", "PayPal", "Shiprocket", "Nirman CRM", "Google Analytics 4"],
      faqs: [
        {
          q: "Shopify or WooCommerce: which should we choose?",
          a: "Shopify is easier to run and very reliable, with a monthly platform fee. WooCommerce runs on WordPress, gives more control and suits content-heavy stores, but needs more upkeep. We recommend one after discovery.",
        },
        {
          q: "Can customers pay by UPI and from abroad?",
          a: "Yes. Indian gateways such as Razorpay support UPI, cards and net banking, and Stripe or PayPal handle international cards. Many stores use both.",
        },
        {
          q: "Can you move our store from another platform?",
          a: "Yes. We move products, customers and order history where the platforms allow, and redirect old URLs so you keep your search rankings.",
        },
        {
          q: "Can customers get order updates on WhatsApp?",
          a: "Yes. With Nirman CRM, order confirmations, shipping updates and abandoned-cart reminders can go out by WhatsApp and email automatically.",
        },
        {
          q: "Do we own the store?",
          a: "Yes. The store account, domain, theme and customer data are yours. We work in your account, not ours.",
        },
        {
          q: "How long does a store take?",
          a: "A typical store takes 6 to 8 weeks. Large catalogues, custom features and migrations add time, and you get a week-by-week plan before we start.",
        },
      ],
    },
  },
  {
    path: "/services/web/wordpress-development/",
    kind: "detail",
    pillar: "web",
    name: "WordPress",
    serviceType: "WordPress development",
    visual: "web",
    card: { art: "web-cms" },
    content: {
      outcome:
        "A WordPress site that is fast, secure and easy for your team to edit, without a pile of plugins holding it together.",
      segments: [
        {
          title: "Teams that know and like WordPress",
          photo: "womanSofa",
          search: "ngo for girls education",
          problem: "Your team is used to WordPress and doesn't want to learn something new, but the current site is a mess.",
          outcomes: ["The editor your team already knows", "Custom blocks that keep pages on-brand", "Training on the new set-up"],
        },
        {
          title: "Content-heavy sites",
          photo: "writingNotes",
          search: "how to prepare for upsc prelims",
          problem: "Hundreds of articles and guides, and the site gets slower and harder to navigate with each one.",
          outcomes: ["Fast pages even with lots of content", "Categories and search that help readers", "SEO settings that are easy to manage"],
        },
        {
          title: "Slow, plugin-heavy sites",
          photo: "dualMonitors",
          search: "coaching institute in kota",
          problem: "Thirty-odd plugins, a heavy theme and a site that takes forever to load and breaks after updates.",
          outcomes: ["Only the plugins you need", "Speed fixed at the source", "Updates tested before they go live"],
        },
        {
          title: "Agencies needing a WordPress partner",
          photo: "teamCollab",
          search: "digital agency in london",
          problem: "You win WordPress projects but don't have enough reliable developers to deliver them on time.",
          outcomes: ["Developers who work to your process", "Clean code your team can maintain", "Builds delivered under your brand"],
        },
      ],
      deliverables: [
        {
          title: "Custom block theme",
          body: "A lightweight theme built for your design, with no heavy page builder underneath.",
        },
        {
          title: "Custom blocks",
          body: "Gutenberg blocks for your sections, so editors can build pages that stay on-brand.",
        },
        {
          title: "Plugin audit",
          body: "Plugins reviewed and trimmed to the ones you need, with safer or faster replacements where it helps.",
        },
        {
          title: "Speed optimisation",
          body: "Caching, image optimisation and script clean-up until Core Web Vitals pass.",
        },
        {
          title: "Security hardening",
          body: "Login protection, a firewall, safe user roles and automatic updates for minor releases.",
        },
        {
          title: "SEO set-up",
          body: "An SEO plugin configured, structured data, sitemaps and clean permalinks.",
        },
        {
          title: "WooCommerce",
          body: "Online store features on WordPress when you need to sell products.",
        },
        {
          title: "Hosting and backups",
          body: "Managed WordPress hosting, daily backups and a staging site for safe changes.",
        },
      ],
      process: [
        { title: "Review", body: "Your current site or design, content and plugins.", duration: "Week 1", photo: "analyticsLaptop", art: "seo-audit" },
        { title: "Theme build", body: "Custom block theme and blocks from the design.", duration: "Weeks 2–4", photo: "codeScreen", art: "web-design" },
        { title: "Content", body: "Content entered or migrated, plugins configured.", duration: "Weeks 4–5", photo: "writingNotes", art: "web-cms" },
        { title: "Hardening", body: "Speed, security, backups and SEO set-up.", duration: "Week 5", photo: "dualMonitors", art: "web-maintain" },
        { title: "Launch and training", body: "Go-live and an editor training session.", duration: "Week 6", photo: "celebrate", art: "web-launch" },
      ],
      reports: [
        {
          art: "web-cms",
          title: "Block editor",
          body: "Custom blocks for each of your sections, so editors build pages that always look right.",
          points: ["Blocks for every section type", "Preview before publishing", "Safe user roles"],
        },
        {
          art: "web-launch",
          title: "Launch report",
          body: "Speed and accessibility scores and every launch check, before and after the rebuild.",
          points: ["Lighthouse and Core Web Vitals", "Plugins removed or replaced", "Security and backups confirmed"],
        },
        {
          art: "web-maintain",
          title: "Maintenance report",
          body: "A short monthly report on updates, backups, security and changes made.",
          points: ["Updates tested on staging", "Backups and threats blocked", "Content changes done"],
        },
      ],
      results: [
        {
          sample: true,
          metric: "1.7 s",
          label: "mobile load time, down from 4.9 s",
          context: "Sample figure for a coaching institute's site. Not a real client yet.",
        },
        {
          sample: true,
          metric: "9",
          label: "active plugins, down from 32",
          context: "Sample figure for the same site. Not a real client yet.",
        },
      ],
      stack: ["WordPress", "Gutenberg blocks", "WooCommerce", "Advanced Custom Fields", "Yoast SEO", "Cloudflare", "PHP", "MySQL"],
      faqs: [
        {
          q: "Do you use page builders like Elementor?",
          a: "We prefer custom Gutenberg blocks, which are faster and harder to break. If your team depends on a page builder, we can work with it and keep it lean.",
        },
        {
          q: "Can you speed up our existing WordPress site?",
          a: "Usually, yes. We audit plugins, theme, hosting and images, then fix the biggest causes first. Sometimes a rebuild is the better option, and we will say so.",
        },
        {
          q: "Our site was hacked. Can you help?",
          a: "Yes. We clean the site, close the way in, change credentials and set up a firewall and backups so it is much harder to happen again.",
        },
        {
          q: "Will updates break our site?",
          a: "Not if they are tested first. On a maintenance plan we test updates on a staging copy before applying them to the live site.",
        },
        {
          q: "Is WordPress good for SEO?",
          a: "Yes, when it is fast and well set up. Most SEO problems on WordPress come from slow themes, too many plugins and duplicate pages, which we fix.",
        },
        {
          q: "Can you work on a site another agency built?",
          a: "Yes. We start with a review so we know what we are taking on, then take over maintenance or improvements.",
        },
      ],
    },
  },
  {
    path: "/services/web/redesign-maintenance/",
    kind: "detail",
    pillar: "web",
    name: "Redesign and maintenance",
    serviceType: "Website redesign and maintenance",
    visual: "web",
    card: { art: "web-maintain" },
    content: {
      outcome:
        "Redesign your website without losing its search rankings, then keep it fast, secure and up to date every month.",
      segments: [
        {
          title: "Sites that no longer fit the business",
          photo: "interior",
          search: "luxury interior designer delhi",
          problem: "The business has moved on, but the website still shows old services, old photos and an old look.",
          outcomes: ["A site that reflects what you do today", "Pages that already rank kept and improved", "Fresh photos and proof of recent work"],
        },
        {
          title: "Sites that are slow or broken",
          photo: "dualMonitors",
          search: "physiotherapy clinic in hyderabad",
          problem: "Forms stop working, pages load slowly and nobody notices until a customer complains.",
          outcomes: ["Uptime monitoring with instant alerts", "Speed checked every month", "Broken forms found before customers do"],
        },
        {
          title: "Businesses worried about rankings",
          photo: "laptopDashboard",
          search: "wedding photographer udaipur",
          problem: "You want a new site but have heard redesigns can wipe out years of Google rankings.",
          outcomes: ["Every old URL mapped to a new one", "Content that ranks carried over", "Search Console watched after launch"],
        },
        {
          title: "Owners who want it looked after",
          photo: "ownerDesk",
          search: "ayurvedic clinic in kerala",
          problem: "You don't have time to think about updates, backups and security, and you just want the site to work.",
          outcomes: ["Updates, backups and security handled", "Small changes done when you ask", "One short report every month"],
        },
      ],
      deliverables: [
        {
          title: "Site and content audit",
          body: "What works, what doesn't, and which pages bring traffic and enquiries, so nothing valuable is lost.",
        },
        {
          title: "Redesign",
          body: "New structure, copy and design for desktop and phone, keeping the pages that already perform.",
        },
        {
          title: "Rankings-safe migration",
          body: "A full redirect map, preserved URLs where possible, and checks in Search Console after launch.",
        },
        {
          title: "Software and plugin updates",
          body: "Core, theme and plugin updates tested on staging before they go live.",
        },
        {
          title: "Security and backups",
          body: "Daily backups, malware scans, firewall and uptime monitoring with alerts.",
        },
        {
          title: "Speed checks",
          body: "Monthly Core Web Vitals checks, and fixes when something slows down.",
        },
        {
          title: "Content changes",
          body: "Text, image and page updates sent by email or WhatsApp, done within an agreed time.",
        },
        {
          title: "Monthly report",
          body: "Uptime, speed, updates, backups and changes made, in one short report.",
        },
      ],
      process: [
        { title: "Audit", body: "Traffic, rankings, content and technical health of the current site.", duration: "Week 1", photo: "analyticsLaptop", art: "seo-audit" },
        { title: "Plan", body: "What to keep, change and remove, and the URL map.", duration: "Week 2", photo: "whiteboard", art: "web-sitemap" },
        { title: "Redesign and build", body: "New design and build, with content carried over.", duration: "Weeks 3–6", photo: "designerTablet", art: "web-design" },
        { title: "Launch", body: "Redirects, checks and Search Console monitoring.", duration: "Week 7", photo: "celebrate", art: "web-launch" },
        { title: "Maintain", body: "Updates, backups, security, speed and changes every month.", duration: "Monthly", photo: "laptopDashboard", art: "web-maintain" },
      ],
      reports: [
        {
          art: "web-maintain",
          title: "Maintenance report",
          body: "Every month: uptime, backups, security, updates and the changes we made for you.",
          points: ["Uptime and response time", "Backups and threats blocked", "Updates and changes made"],
        },
        {
          art: "seo-audit",
          title: "Pre-redesign audit",
          body: "Before anything changes, a record of what ranks, what converts and what is broken.",
          points: ["Pages that bring traffic and enquiries", "Technical issues to fix", "URLs to keep or redirect"],
        },
        {
          art: "web-launch",
          title: "Launch report",
          body: "Speed, accessibility and SEO scores for the new site, with every launch check ticked.",
          points: ["Lighthouse and Core Web Vitals", "Redirects tested", "Search Console monitored"],
        },
      ],
      results: [
        {
          sample: true,
          metric: "100%",
          label: "of organic traffic kept through the redesign",
          context: "Sample figure for a manufacturing company's site. Not a real client yet.",
        },
        {
          sample: true,
          metric: "99.9%",
          label: "uptime over 12 months of maintenance",
          context: "Sample figure for a clinic group's site. Not a real client yet.",
        },
      ],
      stack: ["WordPress", "Next.js", "Shopify", "Google Search Console", "Cloudflare", "UptimeRobot", "Screaming Frog"],
      faqs: [
        {
          q: "Will a redesign hurt our Google rankings?",
          a: "It can if URLs and content are lost. We map every old URL to a new one, keep the content that ranks, and watch Search Console closely after launch.",
        },
        {
          q: "Do we have to change platform to redesign?",
          a: "No. We can redesign on your current platform. If the platform itself is the problem, we will explain the options and the trade-offs.",
        },
        {
          q: "What does monthly maintenance include?",
          a: "Updates tested on staging, daily backups, security scans, uptime monitoring, speed checks, a set amount of content changes and a monthly report.",
        },
        {
          q: "How fast do you fix problems?",
          a: "Response times are agreed in your plan. Site-down issues always come first, and we are alerted automatically when the site goes down.",
        },
        {
          q: "Can you maintain a site you did not build?",
          a: "Yes. We start with a review to understand the site, fix anything urgent, then move it onto a regular maintenance routine.",
        },
        {
          q: "Can we cancel maintenance later?",
          a: "Yes. You own the site and every login, so you can take it in-house or move to another provider whenever you like.",
        },
      ],
    },
  },
];
