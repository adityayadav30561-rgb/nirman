// Our work (/work/; docs/sections/p5-work.md). Everything here is real and
// was supplied by the user on 2026-11-10: seven live websites (screenshots
// taken from the live sites that day), SEO figures read from the client's
// Google Analytics and Search Console screenshots (Seo_Portfolio.docx), and
// three apps (portfolio-screenshots.zip with its README).
// Rule: do not round up, rename or add figures. Each number keeps its source
// and period. Business descriptions come from each site's own title.

/** `more`: numbers of the extra desktop screenshots (site-<key>-N.webp). Shots that show a client's own prices or services we do not offer are left out. */
export type Site = { slug: string; key: string; name: string; kind: string; place: string; more: number[] };

export const sites: Site[] = [
  { slug: "ashville-homes", key: "ashville", name: "AshVille Homes", kind: "Pool villas", place: "North Goa, India", more: [2, 3, 4, 5] },
  { slug: "gurus-indian-cuisine", key: "guru", name: "Guru's Indian Cuisine", kind: "Indian restaurant", place: "Coffs Harbour, Australia", more: [2, 3, 4, 5] },
  { slug: "sitco-india", key: "sitco", name: "SITCO India", kind: "Export house for handcrafted and natural products", place: "Uttar Pradesh, India", more: [2, 3, 4, 5] },
  { slug: "aarika-fabric-care", key: "aarika", name: "Aarika Fabric Care", kind: "Laundry and dry cleaning", place: "Lucknow, India", more: [2, 3, 4, 5] },
  { slug: "vana", key: "vana", name: "Vana", kind: "Digital studio", place: "", more: [2, 3, 5] },
  { slug: "easywebsolns", key: "easyweb", name: "EasyWebSolns", kind: "Web and app studio", place: "", more: [2, 3, 4] },
  { slug: "blue-orbit-digi", key: "blueorbit", name: "Blue Orbit Digi", kind: "Small-business marketing agency", place: "", more: [5] },
];

export type Stat = { value: string; label: string };
export type SeoShot = { file: "ga" | "gsc" | "ai"; size: [number, number]; period: string; stats: Stat[] };

const shotTitle = { ga: "Google Analytics: visitors", gsc: "Google Search Console: clicks and impressions", ai: "Google Search Console: appearances in AI answers" } as const;
export const seoShotTitle = (f: SeoShot["file"]) => shotTitle[f];
export type SeoCase = {
  slug: string;
  key: string;
  /** full screenshots on the project page, in order */
  shots: SeoShot[];
  name: string;
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

export type AppCase = { slug: string; key: string; name: string; kind: string; line: string; points: string[]; built: string[]; dark?: boolean; /** [file, label] in the order a user meets them */ screens: [string, string][] };

export const apps: AppCase[] = [
  {
    slug: "maharishi-ayurveda",
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
