// "Where we work" content (docs/sections/04-map.md). Copy is a draft.
// Pins: India is our office; the others are markets we serve, never "our
// clients in" (no client list yet).

export type Place = {
  key: "in" | "us" | "ae" | "uk";
  name: string;
  role: "office" | "market";
  lon: number;
  lat: number;
  /** IANA time zone for live clocks. */
  tz: string;
  /** Plain-language time difference to India. */
  diff: string;
  /** Where the name chip sits next to the pin on the flat map (UAE is close to India). */
  label: "below" | "left" | "right";
};

export const places: Place[] = [
  { key: "in", name: "India", role: "office", lon: 78.5, lat: 22.5, tz: "Asia/Kolkata", diff: "Our office, IST (UTC+5:30)", label: "right" },
  { key: "ae", name: "UAE", role: "market", lon: 54.4, lat: 24.5, tz: "Asia/Dubai", diff: "1 h 30 m behind India", label: "left" },
  { key: "uk", name: "United Kingdom", role: "market", lon: -1.5, lat: 52.5, tz: "Europe/London", diff: "4 h 30 m to 5 h 30 m behind India", label: "right" },
  { key: "us", name: "United States", role: "market", lon: -96, lat: 39, tz: "America/New_York", diff: "9 h 30 m to 10 h 30 m behind India (Eastern)", label: "right" },
];

export const mapIntro = {
  title: "A team in India, working in your time zone.",
  line: "We serve businesses in India, the US, the UAE and the UK remotely, with calls in your working hours and a written plan before we start.",
};

export const quoteBar = {
  services: ["Websites", "SEO", "Custom software", "Marketing automation", "Not sure yet"],
  timelines: ["As soon as possible", "1 to 3 months", "3 to 6 months", "Just exploring"],
};
