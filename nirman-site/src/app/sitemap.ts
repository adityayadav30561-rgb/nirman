import type { MetadataRoute } from "next";
import { indexedPages } from "@/content/pages";
import { absoluteUrl } from "@/lib/seo";

// URLs only: Google ignores priority and changefreq, and lastmod must be real,
// so it arrives with the CMS dates in Phase 9 (case studies, blog posts).
export default function sitemap(): MetadataRoute.Sitemap {
  return indexedPages.map((p) => ({ url: absoluteUrl(p.path) }));
}
