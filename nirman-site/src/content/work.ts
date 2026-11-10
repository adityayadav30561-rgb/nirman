// Our work (/work/; docs/sections/p5-work.md). Everything here is real and
// was supplied by the user on 2026-11-10: seven live websites (screenshots
// taken from the live sites that day), SEO figures read from the client's
// Google Analytics and Search Console screenshots (Seo_Portfolio.docx), and
// three apps (portfolio-screenshots.zip with its README).
// Rule: do not round up, rename or add figures. Each number keeps its source
// and period. Business descriptions come from each site's own title.

/**
 * `tour`: the walk through the site on its project page, in order. `shot` 0 is
 * the homepage (site-<key>.webp), any other number is site-<key>-N.webp. Every
 * line describes what the screenshot shows; nothing about the client's goals or
 * results is invented. Shots that show a client's own prices or services we do
 * not offer are left out.
 */
export type TourStop = { shot: number; title: string; text: string };
export type Site = { slug: string; key: string; name: string; kind: string; place: string; intro: string; tour: TourStop[]; phone: string; has: string[] };

export const sites: Site[] = [
  {
    slug: "ashville-homes", key: "ashville", name: "AshVille Homes", kind: "Pool villas", place: "North Goa, India",
    intro: "AshVille Homes rents four three-bedroom pool villas in Arpora, North Goa. The website we designed and built shows the villas, the neighbourhood and what guests say, and every part of it leads to an enquiry.",
    tour: [
      { shot: 0, title: "A first screen that sells the place", text: "One wide photo of the Goa coast, a single promise and two buttons: Enquire now and Explore the villas. The owners' phone numbers sit in a slim bar above the menu." },
      { shot: 2, title: "What every villa includes", text: "A short note on who the villas suit, then the amenities as a plain list a guest can scan in seconds: three bedrooms, private pool, kitchen, Wi-Fi, parking, housekeeping." },
      { shot: 3, title: "The neighbourhood, in minutes", text: "Beaches, nightlife and things to do around Arpora, each with its travel time, so a guest can judge the location without opening a map." },
      { shot: 4, title: "Four villas, each with its own card", text: "Mandovi, Sal, Chapora and Zuari each get a photo, a line about their character and a link to a page of their own." },
      { shot: 5, title: "Reviews before the enquiry", text: "The villa cards close with their key features, and guest reviews follow straight after, just before the visitor is asked to get in touch." },
    ],
    phone: "On a phone the menu folds away, the enquiry button spans the screen and the villa cards stack one under another.",
    has: ["Home, Villas, Gallery, Experience and Contact", "A page for each of the four villas", "Enquiry button on the first screen", "Travel times to beaches and markets", "Guest reviews"],
  },
  {
    slug: "gurus-indian-cuisine", key: "guru", name: "Guru's Indian Cuisine", kind: "Indian restaurant", place: "Coffs Harbour, Australia",
    intro: "Guru's Indian Cuisine is a family-run Indian restaurant in Coffs Harbour, Australia. The website we designed and built puts the food first and keeps three actions within reach on every screen: see the menu, order, and book a table.",
    tour: [
      { shot: 0, title: "Bold colour and three clear actions", text: "A thali photo on bright bands of colour, with View menu, Order now and Book a table side by side. A small note says whether the kitchen is open and when it opens next." },
      { shot: 2, title: "The menu as a wall of dishes", text: "Each dish has a photo, a two-line description and tags for gluten free, dairy free and nut free. Chef's picks carry a ribbon." },
      { shot: 3, title: "Dietary needs up front", text: "Vegan, gluten free, nut free, dairy free and halal are shown as five icons, so a guest with a restriction has an answer before reading the menu." },
      { shot: 4, title: "The family behind the kitchen", text: "A short story about the couple who run the restaurant and the chef's years in five-star hotels, with a button to read more." },
      { shot: 5, title: "The sister grocery store", text: "A section for Om Namah Indian Grocery, the family's shop, so a diner who liked the food can find the ingredients." },
    ],
    phone: "On a phone a bar stays at the bottom of the screen with four buttons: Call, Order, Book and Directions.",
    has: ["Home, Menu, Order, Our Story, Grocery and Contact", "Book a table button in the menu bar", "Open or closed note with the next opening time", "Dietary tags on every dish", "Call, Order, Book and Directions bar on phones"],
  },
  {
    slug: "sitco-india", key: "sitco", name: "SITCO India", kind: "Export house for handcrafted and natural products", place: "Uttar Pradesh, India",
    intro: "SITCO India exports handcrafted and natural products from Uttar Pradesh. The website we designed and built reads like a catalogue for buyers abroad: the products, where they come from and how they are shipped, with an inquiry button always in view.",
    tour: [
      { shot: 0, title: "Craft on one side, shipping on the other", text: "The headline sits over a container port while a card shows the product itself. Send inquiry and Explore catalog are the two buttons, with the company's own figures underneath." },
      { shot: 3, title: "A catalogue edited like a magazine", text: "Moonj craft, banana fibre and handmade carpets as large picture tiles, each with its minimum order quantity, plus buttons for the full catalogue and for samples." },
      { shot: 4, title: "Where the products come from", text: "A field journal in photographs: the wild grass on the riverbeds, the women who gather and weave it, step by step." },
      { shot: 2, title: "From inspection to dispatch", text: "The journal ends with goods inspected, signed and loaded into containers, then turns to the reasons buyers choose the company." },
      { shot: 5, title: "Reasons and buyer voices", text: "Numbered reasons on the left and a buyer's words on the right, on a dark band that sets this part apart from the catalogue." },
    ],
    phone: "On a phone the product card moves under the headline and the journal photos run full width.",
    has: ["Home, About, Products, Certifications, Blog and Contact", "Send inquiry button in the menu bar", "Catalogue with minimum order quantities", "Photo journal of sourcing and dispatch", "Email and phone in a bar at the top"],
  },
  {
    slug: "aarika-fabric-care", key: "aarika", name: "Aarika Fabric Care", kind: "Laundry and dry cleaning", place: "Lucknow, India",
    intro: "Aarika Fabric Care is a laundry and dry cleaner in Daliganj, Lucknow, that collects from the customer's door. The website we designed and built is organised around one action, booking a pickup, with a call button always beside it.",
    tour: [
      { shot: 0, title: "The promise and the booking, together", text: "Clothes back in 24 to 48 hours is the headline. Book a free pickup and the phone number sit right under it, with a line in Hindi for local customers." },
      { shot: 2, title: "Why trust them with your clothes", text: "Three plain promises (no colour bleed, on-time delivery, free pickup) beside a photo of the folded result, then the list of services begins." },
      { shot: 3, title: "Eight services, one card each", text: "From blankets to sarees to sofas, every service says what is cleaned and how it is handled, on cards of equal size." },
      { shot: 4, title: "Packages side by side", text: "Three opening offers in a row, the most popular one in a darker card so it is the first thing the eye lands on." },
      { shot: 5, title: "Reviews, then the shop itself", text: "Customer reviews, followed by the address, opening hours and pickup slots, with a button for directions." },
    ],
    phone: "On a phone, Call now and Book pickup stay fixed at the bottom of the screen, so booking never needs a scroll.",
    has: ["Home, About, Services, Price and Packages, Contact", "Book a pickup button in the menu bar", "A line in Hindi on the first screen", "Address, hours and directions", "Call and Book pickup bar on phones"],
  },
  {
    slug: "vana", key: "vana", name: "Vana", kind: "Digital studio", place: "",
    intro: "Vana is a digital studio for search, web and mobile. The website we designed and built is one long scroll through an illustrated forest: each section is a new scene, and the text arrives as the visitor moves through it.",
    tour: [
      { shot: 0, title: "An opening scene, not a banner", text: "A painted forest at dawn, a peacock feather drifting across it and one line of serif type. Two buttons: Explore our work and Begin the journey." },
      { shot: 2, title: "Principles on a glass panel", text: "The studio's three principles sit on a frosted panel over the trees, with its founding year, project count and countries below." },
      { shot: 3, title: "Work, sorted by kind", text: "Tabs for SEO, Websites, Apps and Custom switch a slider of projects, each led by a figure from the client's own dashboards." },
      { shot: 5, title: "A closing scene with the numbers", text: "The forest darkens to evening for a single statement and a row of four results." },
    ],
    phone: "On a phone the scenes are recomposed for a tall screen and the menu becomes a single Menu button.",
    has: ["Home, About, Experience, Services, Work, Journey and Contact", "Illustrated scenes that change as you scroll", "Project slider with tabs", "Start a project button in the menu bar"],
  },
  {
    slug: "easywebsolns", key: "easyweb", name: "EasyWebSolns", kind: "Web and app studio", place: "",
    intro: "EasyWebSolns is a web and app studio. The website we designed and built explains what the studio makes, shows its work and walks a visitor through its process, one step at a time.",
    tour: [
      { shot: 0, title: "The offer and a picture of it", text: "A large headline beside a drawn browser window, with tabs for Websites, Apps and SEO that change the picture. Start a project is the main button." },
      { shot: 3, title: "Work in a sliding row", text: "Project cards slide sideways, each with a picture, a name and a line about the result, and a bar that shows how far along the row you are." },
      { shot: 4, title: "The process, step by step", text: "Discover, then Design: the steps run down the right while a picture on the left keeps count, here two of five." },
      { shot: 2, title: "Through to launch and care", text: "The same layout carries on to Launch and Care, each step with a short list of what it covers." },
    ],
    phone: "On a phone the process steps become a single column, each picture above its step.",
    has: ["Websites, Care Plans, Work and About", "Tabs that switch the first-screen picture", "Sliding row of projects", "Five-step process with pictures", "Start a project button in the menu bar"],
  },
  {
    slug: "blue-orbit-digi", key: "blueorbit", name: "Blue Orbit Digi", kind: "Small-business marketing agency", place: "",
    intro: "Blue Orbit Digi is a marketing agency for small businesses. The website we designed and built is light and direct: what the agency does, how to reach it and what its clients say.",
    tour: [
      { shot: 0, title: "Three ways to get in touch, straight away", text: "The headline is followed by three buttons (plans, call, email) and four tiles with the agency's own figures. The phone number also sits in the menu bar." },
      { shot: 5, title: "What clients say, in their words", text: "Three client reviews on soft glass cards, each with a heading that sums it up, so the section can be read in a glance." },
    ],
    phone: "On a phone the buttons stack to full width and the four figures form a two-by-two grid.",
    has: ["Home, Services, Pricing, About and Contact", "Phone number and quote button in the menu bar", "Client reviews", "Soft glass cards on a light blue page"],
  },
];

export type Stat = { value: string; label: string };
export type SeoShot = { file: "ga" | "gsc" | "ai"; size: [number, number]; period: string; stats: Stat[] };

const shotTitle = { ga: "Google Analytics: visitors", gsc: "Google Search Console: clicks and impressions", ai: "Google Search Console: appearances in AI answers" } as const;
export const seoShotTitle = (f: SeoShot["file"]) => shotTitle[f];
/** What each kind of screenshot is, in plain words (the same for every client). */
export const seoShotAbout: Record<SeoShot["file"], string> = {
  ga: "Google Analytics counts everyone who visits the site, whether they came from search or from anywhere else. The green percentages on the screenshot compare this period with the one before it.",
  gsc: "Search Console is Google's own record of the site in search: how often it was shown, how often it was clicked and where it ranked on average. The two lines on the chart are clicks and impressions, day by day.",
  ai: "This Search Console report counts how often the site appeared inside Google's AI-written answers, the summaries now shown above the usual results.",
};
/** How to read the figures; shown on every SEO project page. */
export const seoTerms: [string, string][] = [
  ["Active users", "People who visited the site and did something on it, counted by Google Analytics. It includes visitors from every source."],
  ["Impressions", "How many times a page of the site was shown to someone in Google's results."],
  ["Clicks", "How many times someone chose the site from those results and opened it."],
  ["Average click rate", "Clicks divided by impressions: of every 100 times the site was shown, how many led to a visit."],
  ["Average position", "Where the site ranked on average across all the searches it appeared for. 1 is the top result; 10 is usually the end of the first page."],
  ["AI answers", "Appearances in the AI-written summaries Google shows above the normal results."],
];
export type SeoCase = {
  slug: string;
  key: string;
  /** full screenshots on the project page, in order */
  shots: SeoShot[];
  name: string;
  /** what happened, in one or two sentences made only of the figures below */
  summary: string;
  /** headline figure, with exactly what it measures */
  headline: Stat;
  /** source and period of the headline */
  source: string;
  stats: Stat[];
  /** caption of the chart picture (a crop of the client's Search Console) */
  chart: string;
  chartSize: [number, number];
};

export const seoCases: SeoCase[] = [
  {
    slug: "badowl",
    summary: "From 1 February to 25 September 2026, Badowl's Google Analytics recorded 311K active users, 7,245.2% more than in the period before, and 6.2K purchases. Search Console shows 5.33K clicks from Google search in the last six months, at an average position of 7.5.",
    key: "badowl",
    shots: [
      { file: "ga", size: [1600, 642], period: "1 Feb to 25 Sep 2026", stats: [{ value: "311K", label: "active users (+7,245.2%)" }, { value: "3.5M", label: "events" }, { value: "1.6M", label: "views" }, { value: "6.2K", label: "purchases (+6,537.2%)" }] },
      { file: "gsc", size: [1600, 731], period: "Last 6 months", stats: [{ value: "5.33K", label: "clicks" }, { value: "61.3K", label: "impressions" }, { value: "8.7%", label: "average click rate" }, { value: "7.5", label: "average position" }] },
      { file: "ai", size: [1600, 621], period: "Last 6 months", stats: [{ value: "3.64K", label: "impressions in AI answers" }] },
    ],
    name: "Badowl",
    headline: { value: "+7,245%", label: "active users" },
    source: "Google Analytics, 1 Feb to 25 Sep 2026, against the period before",
    stats: [
      { value: "311K", label: "active users" },
      { value: "6.2K", label: "purchases" },
      { value: "5.33K", label: "clicks from Google search, 6 months" },
      { value: "7.5", label: "average position" },
    ],
    chart: "Google Search Console, last 6 months: clicks and impressions",
    chartSize: [1455, 470],
  },
  {
    slug: "kama-health-india",
    summary: "From 1 March to 25 September 2026, Kama Health India's Google Analytics recorded 104K active users, 1,483.8% more than in the period before, across 115K sessions. Search Console shows 3.87K clicks from Google search in the last six months, at an average position of 7.8.",
    key: "kama",
    shots: [
      { file: "ga", size: [1600, 715], period: "1 Mar to 25 Sep 2026", stats: [{ value: "104K", label: "active users (+1,483.8%)" }, { value: "828K", label: "events" }, { value: "50K", label: "engaged sessions" }, { value: "115K", label: "sessions (+1,356.0%)" }] },
      { file: "gsc", size: [1600, 674], period: "Last 6 months", stats: [{ value: "3.87K", label: "clicks" }, { value: "66.9K", label: "impressions" }, { value: "5.8%", label: "average click rate" }, { value: "7.8", label: "average position" }] },
      { file: "ai", size: [1600, 572], period: "Last 6 months", stats: [{ value: "10.3K", label: "impressions in AI answers" }] },
    ],
    name: "Kama Health India",
    headline: { value: "+1,484%", label: "active users" },
    source: "Google Analytics, 1 Mar to 25 Sep 2026, against the period before",
    stats: [
      { value: "104K", label: "active users" },
      { value: "115K", label: "sessions" },
      { value: "3.87K", label: "clicks from Google search, 6 months" },
      { value: "10.3K", label: "impressions in Google's AI answers" },
    ],
    chart: "Google Search Console, last 6 months: clicks and impressions",
    chartSize: [1532, 514],
  },
  {
    slug: "khadi-organique",
    summary: "In the last six months, Khadi Organique was shown 1.19M times on Google search and clicked 10.3K times, at an average position of 9.5. It also appeared 59.4K times in Google's AI answers, the most of any project on this page.",
    key: "khadi",
    shots: [
      { file: "gsc", size: [1600, 746], period: "Last 6 months", stats: [{ value: "10.3K", label: "clicks" }, { value: "1.19M", label: "impressions" }, { value: "0.9%", label: "average click rate" }, { value: "9.5", label: "average position" }] },
      { file: "ai", size: [1600, 610], period: "Last 6 months", stats: [{ value: "59.4K", label: "impressions in AI answers" }] },
      { file: "ga", size: [1600, 671], period: "1 Mar to 31 Jul 2026", stats: [{ value: "73.5%", label: "engagement rate (+182.3%)" }, { value: "284K", label: "events" }, { value: "63K", label: "key events (+9,517.3%)" }, { value: "116K", label: "views (+46.4%)" }] },
    ],
    name: "Khadi Organique",
    headline: { value: "1.19M", label: "impressions on Google search" },
    source: "Google Search Console, last 6 months (to September 2026)",
    stats: [
      { value: "10.3K", label: "clicks from Google search" },
      { value: "9.5", label: "average position" },
      { value: "59.4K", label: "impressions in Google's AI answers" },
      { value: "73.5%", label: "engagement rate (Analytics, Mar to Jul 2026)" },
    ],
    chart: "Google Search Console, last 6 months: clicks and impressions",
    chartSize: [1439, 474],
  },
  {
    slug: "7-seas-matrix",
    summary: "From 1 January to 25 September 2026, 7 Seas Matrix's Google Analytics recorded 5.6K active users, 417.9% more than in the period before. Search Console shows 161K impressions and 2.38K clicks from Google search in the last twelve months.",
    key: "7seas",
    shots: [
      { file: "ga", size: [1600, 684], period: "1 Jan to 25 Sep 2026", stats: [{ value: "7K", label: "sessions (+292.4%)" }, { value: "5.8K", label: "new users (+413.6%)" }, { value: "5.6K", label: "active users (+417.9%)" }] },
      { file: "gsc", size: [1600, 729], period: "Last 12 months", stats: [{ value: "2.38K", label: "clicks" }, { value: "161K", label: "impressions" }, { value: "1.5%", label: "average click rate" }, { value: "19.2", label: "average position" }] },
      { file: "ai", size: [1600, 616], period: "Last 12 months", stats: [{ value: "7.37K", label: "impressions in AI answers" }] },
    ],
    name: "7 Seas Matrix",
    headline: { value: "+418%", label: "active users" },
    source: "Google Analytics, 1 Jan to 25 Sep 2026, against the period before",
    stats: [
      { value: "7K", label: "sessions" },
      { value: "161K", label: "impressions on Google search, 12 months" },
      { value: "2.38K", label: "clicks from Google search, 12 months" },
      { value: "7.37K", label: "impressions in Google's AI answers" },
    ],
    chart: "Google Search Console, last 12 months: clicks and impressions",
    chartSize: [1454, 507],
  },
  {
    slug: "fresh-light-photography",
    summary: "In the last twelve months, Fresh Light Photography was shown 503K times on Google search and clicked 1.76K times. It also appeared 19.3K times in Google's AI answers.",
    key: "freshlight",
    shots: [
      { file: "gsc", size: [1600, 677], period: "Last 12 months", stats: [{ value: "1.76K", label: "clicks" }, { value: "503K", label: "impressions" }, { value: "0.3%", label: "average click rate" }, { value: "14.3", label: "average position" }] },
      { file: "ai", size: [1600, 565], period: "Last 12 months", stats: [{ value: "19.3K", label: "impressions in AI answers" }] },
    ],
    name: "Fresh Light Photography",
    headline: { value: "503K", label: "impressions on Google search" },
    source: "Google Search Console, last 12 months (to September 2026)",
    stats: [
      { value: "1.76K", label: "clicks from Google search" },
      { value: "14.3", label: "average position" },
      { value: "19.3K", label: "impressions in Google's AI answers" },
    ],
    chart: "Google Search Console, last 12 months: clicks and impressions",
    chartSize: [1512, 479],
  },
];

export type AppCase = { slug: string; key: string; name: string; kind: string; line: string; points: string[]; built: string[]; dark?: boolean; /** [file, label] in the order a user meets them */ screens: [string, string][]; /** the walk through the app: screens grouped by what the user is doing */ flow: { title: string; text: string; screens: string[] }[] };

export const apps: AppCase[] = [
  {
    slug: "maharishi-ayurveda",
    flow: [
      { title: "A welcome that asks what you need", text: "After a short introduction the user picks up to three wellness goals. Sign-in is a mobile number and a one-time code, or they can carry on as a guest.", screens: ["01-onboarding-1", "04-onboarding-interests", "05-login"] },
      { title: "A home screen built around the person", text: "It greets the user by name, shows the order on its way and their Ayurvedic profile with today's ritual, then offers products by the goals they chose.", screens: ["07-home", "08-home-profile-ritual", "09-home-recommended"] },
      { title: "Finding and choosing a product", text: "Browse by wellness need or search by ingredient. A product page gives the pack sizes, how to use it, safety notes and reviews, with Add to cart always at the bottom.", screens: ["11-explore", "19-search", "13-product-detail", "14-product-detail-more"] },
      { title: "Orders and consultations", text: "Each order has a timeline from placed to delivered with the courier's tracking number. A paid video or phone consultation with a Vaidya is booked from its own tab.", screens: ["10-order-tracking", "15-consult"] },
      { title: "My wellness and account", text: "The profile, the daily routine with a tick for each small step, and the account with orders, wishlist, consultations and addresses.", screens: ["16-my-wellness", "17-my-wellness-more", "18-account"] },
    ],
    key: "ayurveda",
    screens: [["01-onboarding-1", "Welcome"], ["04-onboarding-interests", "Choose your goals"], ["05-login", "Sign in"], ["07-home", "Home"], ["08-home-profile-ritual", "Profile and today's ritual"], ["09-home-recommended", "Shop by need"], ["11-explore", "Explore"], ["13-product-detail", "Product"], ["14-product-detail-more", "How to use"], ["10-order-tracking", "Order tracking"], ["15-consult", "Book a consultation"], ["16-my-wellness", "My wellness"], ["17-my-wellness-more", "Daily routine"], ["19-search", "Search"], ["18-account", "Account"]],
    name: "Maharishi Ayurveda",
    kind: "Wellness shopping app",
    line: "An Ayurvedic wellness app with a personal wellness profile, daily rituals, a product catalogue, order tracking and paid consultations with a Vaidya (doctor).",
    points: ["Personal profile and daily ritual tracker", "Product pages, cart and order tracking", "Book a paid doctor consultation"],
    built: ["Expo", "React Native", "Web app"],
  },
  {
    slug: "event-intelligence-india",
    flow: [
      { title: "Sign in and choose interests", text: "Accounts are created by the team's admin. On first use each person ticks the technologies and topics they follow, and the app uses them to rate every event.", screens: ["00a-sign-in", "00c-onboarding-interests"] },
      { title: "A home screen for this week", text: "What is coming up, what is happening this week and what was newly found, followed by events picked for the person's interests.", screens: ["01-home", "02-home-for-you"] },
      { title: "Three ways to explore", text: "A filtered list, a search typed in plain words that the app turns into filter chips, and a map of India with the number of events in each city.", screens: ["03-explore", "04-explore-natural-search", "04b-explore-map"] },
      { title: "Judging one event", text: "Dates, venue, organiser and cost at the top; below, a 'Why it matches you' list, and rows to plan the visit, add notes and keep the event for offline use.", screens: ["05-event-detail", "05b-event-detail-why"] },
      { title: "Planning and the day itself", text: "Saved events, a month calendar, and an Event Day screen with directions, a checklist, notes and the agenda, saved on the phone so it works without signal.", screens: ["06-my-events", "07-calendar", "08-event-day", "09-more"] },
    ],
    key: "events",
    screens: [["00a-sign-in", "Sign in"], ["00c-onboarding-interests", "Pick your interests"], ["01-home", "Home"], ["02-home-for-you", "For you"], ["03-explore", "Explore"], ["04-explore-natural-search", "Search in plain words"], ["04b-explore-map", "Map of India"], ["05-event-detail", "Event detail"], ["05b-event-detail-why", "Why it matches you"], ["06-my-events", "My events"], ["07-calendar", "Calendar"], ["08-event-day", "Event Day"], ["09-more", "Settings"]],
    name: "Event Intelligence India",
    kind: "Internal tool for a team",
    line: "An app for a small team to find professional events across India, judge how relevant each one is, track them and plan visits. Works in light and dark.",
    points: ["Search in plain words, turned into filters", "Map of India with event counts", "Calendar and an Event Day mode"],
    built: ["Expo", "React Native", "Installable web app", "Node and PostgreSQL"],
    dark: true,
  },
  {
    slug: "toys-cartel",
    flow: [
      { title: "Welcome and a busy home screen", text: "One welcome screen, then a home with the current deal, shop by age, categories, bestsellers, new arrivals and what is trending.", screens: ["01-onboarding-1", "04-home", "05-home-bestsellers", "06-home-more"] },
      { title: "Search and browse", text: "Search remembers recent terms and suggests trending ones. Results and category pages share the same grid with sort and filter at the top.", screens: ["07-search", "08-search-results", "09-categories", "10-category-listing"] },
      { title: "The product page", text: "Photos, price and offers first; delivery check, highlights, specifications and reviews below. Add to cart and Buy now stay fixed at the bottom.", screens: ["11-product-detail", "12-product-detail-more"] },
      { title: "Wishlist, cart and account", text: "The cart applies eligible offers by itself and shows how much more to spend for the next one. The account screen works for a guest and offers sign-in by mobile number.", screens: ["13-wishlist", "14-cart", "15-account"] },
    ],
    key: "toys",
    screens: [["01-onboarding-1", "Welcome"], ["04-home", "Home"], ["05-home-bestsellers", "Bestsellers"], ["06-home-more", "New and trending"], ["07-search", "Search"], ["08-search-results", "Search results"], ["09-categories", "Categories"], ["10-category-listing", "Category"], ["11-product-detail", "Product"], ["12-product-detail-more", "Offers and reviews"], ["13-wishlist", "Wishlist"], ["14-cart", "Cart"], ["15-account", "Account"]],
    name: "Toys Cartel",
    kind: "Online store app",
    line: "A toy shopping app for India: shop by age and category, deals, wishlist, and a cart that applies offers on its own.",
    points: ["Shop by age and category", "Search with sort and filters", "Cart with automatic offers"],
    built: ["Expo", "React Native", "Web app"],
  },
];

export const workIntro = {
  title: "Selected work: websites, SEO and apps",
  accent: "Selected work",
  line: "A selection of what we have built and grown, shown as it is: screenshots of the sites and apps, and search figures straight from Google's own tools.",
};

export const categories = {
  websites: { label: "Websites", title: "Websites we have designed and built", line: "Screenshots of the real sites, on desktop and on phones." },
  seo: { label: "SEO", title: "SEO projects, in Google's own numbers", line: "Figures and screenshots from each client's Google Analytics and Search Console." },
  apps: { label: "Apps", title: "Apps for Android, iPhone and the web", line: "Screens from the apps themselves, running with demo data." },
} as const;
export type WorkCategory = keyof typeof categories;
