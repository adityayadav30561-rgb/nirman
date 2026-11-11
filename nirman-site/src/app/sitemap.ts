import type { MetadataRoute } from "next";
import { fixedPages, workPages } from "@/content/pages-index";
import { site } from "@/content/site";
import { getCategories, getPosts } from "@/sanity/blog";

/*
 * sitemap.xml: the fixed pages (content/pages-index.ts), every work project,
 * and every published blog article and category from Sanity. /blog/ itself
 * is listed only once there is an article (an empty blog is noindex), and
 * articles marked "hide from Google" are left out. It refreshes with the
 * blog's cache, so a newly published article appears on its own.
 */
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [posts, categories] = await Promise.all([getPosts(), getCategories()]);
  const visible = posts.filter((p) => !p.hidden);
  const url = (path: string) => `${site.url}${path}`;
  return [
    ...[...fixedPages, ...workPages].filter((p) => p.path !== "/blog/" || visible.length > 0).map((p) => ({ url: url(p.path), priority: p.priority })),
    ...categories.map((c) => ({ url: url(`/blog/category/${c.slug}/`), priority: 0.4 })),
    ...visible.map((p) => ({ url: url(`/blog/${p.slug}/`), lastModified: p.updatedAt || p.publishedAt, priority: 0.6 })),
  ];
}
