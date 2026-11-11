import type { MetadataRoute } from "next";
import { site } from "@/content/site";

// robots.txt: everything public is open; the editor, the server functions and
// the thank-you page are not for search engines.
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [{ userAgent: "*", allow: "/", disallow: ["/studio/", "/api/", "/thank-you/"] }],
    sitemap: `${site.url}/sitemap.xml`,
  };
}
