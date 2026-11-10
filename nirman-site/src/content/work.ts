// Our work (/work/; docs/sections/p5-work.md). Everything here is real and
// was supplied by the user on 2026-11-10: seven live websites (screenshots
// taken from the live sites that day), SEO figures read from the client's
// Google Analytics and Search Console screenshots (Seo_Portfolio.docx), and
// three apps (portfolio-screenshots.zip with its README).
// Rule: do not round up, rename or add figures. Each number keeps its source
// and period. Business descriptions come from each site's own title.

export type Site = { key: string; name: string; kind: string; place: string; url: string; domain: string };

export const sites: Site[] = [
  { key: "ashville", name: "AshVille Homes", kind: "Pool villas", place: "North Goa, India", url: "https://ashvillebaga.com/", domain: "ashvillebaga.com" },
  { key: "guru", name: "Guru's Indian Cuisine", kind: "Indian restaurant", place: "Coffs Harbour, Australia", url: "https://guruindiancuisine.vercel.app/", domain: "guruindiancuisine.vercel.app" },
  { key: "sitco", name: "SITCO India", kind: "Export house for handcrafted and natural products", place: "Uttar Pradesh, India", url: "https://sitcobusiness.com/", domain: "sitcobusiness.com" },
  { key: "aarika", name: "Aarika Fabric Care", kind: "Laundry and dry cleaning", place: "Lucknow, India", url: "https://aarikafabriccare.com/", domain: "aarikafabriccare.com" },
  { key: "vana", name: "Vana", kind: "Digital studio", place: "", url: "https://vana-blond.vercel.app/", domain: "vana-blond.vercel.app" },
  { key: "easyweb", name: "EasyWebSolns", kind: "Web and app studio", place: "", url: "https://www.easywebsolns.com/", domain: "easywebsolns.com" },
  { key: "blueorbit", name: "Blue Orbit Digi", kind: "Small-business marketing agency", place: "", url: "https://blueorbitdigi.com/", domain: "blueorbitdigi.com" },
];

export type Stat = { value: string; label: string };
export type SeoCase = {
  key: string;
  name: string;
  domain: string;
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
    key: "badowl",
    name: "Badowl",
    domain: "badowl.in",
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
    key: "kama",
    name: "Kama Health India",
    domain: "kamahealthindia.com",
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
    key: "khadi",
    name: "Khadi Organique",
    domain: "khadiorganique.com",
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
    key: "7seas",
    name: "7 Seas Matrix",
    domain: "7seasmatrix.com",
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
    key: "freshlight",
    name: "Fresh Light Photography",
    domain: "fresh-light-photography.com",
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

export type AppCase = { key: string; name: string; kind: string; line: string; points: string[]; built: string[]; url: string; dark?: boolean };

export const apps: AppCase[] = [
  {
    key: "ayurveda",
    name: "Maharishi Ayurveda",
    kind: "Wellness shopping app",
    line: "An Ayurvedic wellness app with a personal wellness profile, daily rituals, a product catalogue, order tracking and paid consultations with a Vaidya (doctor).",
    points: ["Personal profile and daily ritual tracker", "Product pages, cart and order tracking", "Book a paid doctor consultation"],
    built: ["Expo", "React Native", "Web app"],
    url: "https://maharishi-ayurveda.expo.app",
  },
  {
    key: "events",
    name: "Event Intelligence India",
    kind: "Internal tool for a team",
    line: "An app for a small team to find professional events across India, judge how relevant each one is, track them and plan visits. Works in light and dark.",
    points: ["Search in plain words, turned into filters", "Map of India with event counts", "Calendar and an Event Day mode"],
    built: ["Expo", "React Native", "Installable web app", "Node and PostgreSQL"],
    url: "https://event-intelligence-india.expo.app",
    dark: true,
  },
  {
    key: "toys",
    name: "Toys Cartel",
    kind: "Online store app",
    line: "A toy shopping app for India: shop by age and category, deals, wishlist, and a cart that applies offers on its own.",
    points: ["Shop by age and category", "Search with sort and filters", "Cart with automatic offers"],
    built: ["Expo", "React Native", "Web app"],
    url: "https://toyscartel.expo.app",
  },
];

export const workIntro = {
  title: "Websites, SEO and apps we have shipped",
  accent: "shipped",
  line: "Real projects, shown as they are: live sites you can open, search figures straight from Google's own tools, and apps you can try.",
};
