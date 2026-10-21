import type { MetadataRoute } from "next";
import { absoluteUrl } from "@/lib/seo";

// AI search and assistant crawlers are welcome (handoff §9). They are named
// explicitly so the intent is clear to anyone reading robots.txt. A crawler
// that matches a named group ignores "*", so both groups carry the same rules.
const aiCrawlers = [
  "GPTBot",
  "OAI-SearchBot",
  "ChatGPT-User",
  "ClaudeBot",
  "Claude-SearchBot",
  "Claude-User",
  "PerplexityBot",
  "Perplexity-User",
  "Google-Extended",
  "Applebot-Extended",
  "Bingbot",
  "CCBot",
];

const disallow = ["/api/"];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: "*", allow: "/", disallow },
      { userAgent: aiCrawlers, allow: "/", disallow },
    ],
    sitemap: absoluteUrl("/sitemap.xml"),
  };
}
