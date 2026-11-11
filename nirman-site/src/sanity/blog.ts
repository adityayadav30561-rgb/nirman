import { cacheLife, cacheTag } from "next/cache";
import { apiVersion, dataset, projectId, sanityReady } from "@/sanity/env";
import { fixtureCategories, fixturePosts } from "@/sanity/fixture";
import type { BlogCategory, Post, PostCard } from "@/sanity/types";

/*
 * Reading the blog from Sanity (docs/sections/p7-blog.md).
 * - Plain HTTPS requests to Sanity's query API (GROQ); no client library.
 * - Results are cached with the tag "blog" and refreshed every 10 minutes.
 *   Publishing in the editor can also call /api/revalidate/ (a Sanity
 *   webhook), which clears the tag at once. Without the webhook a new
 *   article shows within about 10 minutes (a day was too long: the first
 *   article stayed hidden, 2026-11-11).
 * - If Sanity cannot be reached the blog shows as empty for about a minute
 *   and tries again; the site and its build never fail because of it.
 * - BLOG_FIXTURE=1 returns the sample articles (design work and checks).
 */
export const BLOG_TAG = "blog";
// How long a good answer from Sanity is kept: refreshed in the background
// after 10 minutes, dropped after a day.
const fresh = { stale: 300, revalidate: 600, expire: 86400 };
const useFixture = process.env.BLOG_FIXTURE === "1";

async function groq<T>(query: string, params: Record<string, string> = {}): Promise<T> {
  const url = new URL(`https://${projectId}.apicdn.sanity.io/v${apiVersion}/data/query/${dataset}`);
  url.searchParams.set("query", query);
  url.searchParams.set("perspective", "published");
  for (const [name, value] of Object.entries(params)) url.searchParams.set(`$${name}`, JSON.stringify(value));
  const res = await fetch(url);
  if (!res.ok) throw new Error(`Sanity answered ${res.status}`);
  return ((await res.json()) as { result: T }).result;
}

const image = `{ alt, "url": asset->url, "w": asset->metadata.dimensions.width, "h": asset->metadata.dimensions.height, "lqip": asset->metadata.lqip }`;
const card = `
  "slug": slug.current, title, excerpt, publishedAt, updatedAt, hidden,
  "category": category->{ title, "slug": slug.current, description },
  "author": author->{ name, role, bio, "photo": photo.asset->url },
  "image": mainImage${image},
  "minutes": round(length(pt::text(body)) / 5 / 200) + 1`;
// Only articles that have everything a page needs, dated today or earlier.
const live = `_type == "post" && defined(slug.current) && defined(category) && defined(mainImage.asset) && publishedAt <= now()`;

/*
 * Each cached read returns { ok, data }. An error must not leave the cached
 * function (under Cache Components it would fail the page, and the build),
 * so a failure is returned as ok: false and kept for about a minute (shorter lifetimes cannot be prerendered), while a
 * good answer is kept for a day.
 */
type Read<T> = { ok: true; data: T } | { ok: false };
async function read<T>(query: string, params?: Record<string, string>): Promise<Read<T>> {
  try {
    return { ok: true, data: await groq<T>(query, params) };
  } catch (e) {
    console.error("Blog: could not read from Sanity.", e instanceof Error ? e.message : e);
    return { ok: false };
  }
}

async function cachedPosts(): Promise<Read<PostCard[]>> {
  "use cache";
  cacheTag(BLOG_TAG);
  const result = await read<PostCard[]>(`*[${live}] | order(publishedAt desc) { ${card} }`);
  if (result.ok) cacheLife(fresh);
  else cacheLife("minutes");
  return result;
}
async function cachedCategories(): Promise<Read<BlogCategory[]>> {
  "use cache";
  cacheTag(BLOG_TAG);
  const result = await read<BlogCategory[]>(`*[_type == "category" && defined(slug.current)] | order(order asc, title asc) { title, "slug": slug.current, description }`);
  if (result.ok) cacheLife(fresh);
  else cacheLife("minutes");
  return result;
}
async function cachedPost(slug: string): Promise<Read<Post | null>> {
  "use cache";
  cacheTag(BLOG_TAG);
  const result = await read<Post | null>(
    `*[${live} && slug.current == $slug][0] { ${card}, seoTitle, seoDescription, faq[]{ question, answer },
      body[]{ ..., _type == "figure" => { ..., "url": asset->url, "w": asset->metadata.dimensions.width, "h": asset->metadata.dimensions.height, "lqip": asset->metadata.lqip } } }`,
    { slug },
  );
  if (result.ok) cacheLife(fresh);
  else cacheLife("minutes");
  return result;
}

async function safe<T>(load: () => Promise<Read<T>>, empty: T): Promise<T> {
  if (!sanityReady) return empty;
  const result = await load();
  return result.ok ? result.data : empty;
}

/** Every published article, newest first. */
export async function getPosts(): Promise<PostCard[]> {
  if (useFixture) return fixturePosts;
  return safe(cachedPosts, []);
}

/** Categories that have at least one article, in the editor's order. */
export async function getCategories(): Promise<BlogCategory[]> {
  const posts = await getPosts();
  const all = useFixture ? fixtureCategories : await safe(cachedCategories, []);
  return all.filter((c) => posts.some((p) => p.category.slug === c.slug));
}

export async function getPost(slug: string): Promise<Post | null> {
  if (!/^[a-z0-9]+(-[a-z0-9]+)*$/.test(slug)) return null;
  if (useFixture) return fixturePosts.find((p) => p.slug === slug) ?? null;
  return safe(() => cachedPost(slug), null);
}

/** Up to three more articles: same category first, then the newest others. */
export async function getRelated(post: PostCard): Promise<PostCard[]> {
  const others = (await getPosts()).filter((p) => p.slug !== post.slug);
  return [...others.filter((p) => p.category.slug === post.category.slug), ...others.filter((p) => p.category.slug !== post.category.slug)].slice(0, 3);
}

const dateFormat = new Intl.DateTimeFormat("en-GB", { day: "numeric", month: "short", year: "numeric", timeZone: "Asia/Kolkata" });
export const formatDate = (iso: string) => dateFormat.format(new Date(iso));
