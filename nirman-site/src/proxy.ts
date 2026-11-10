import { NextResponse, type NextRequest } from "next/server";
import { apiVersion, dataset, projectId, sanityReady } from "@/sanity/env";
import { fixtureCategories, fixturePosts } from "@/sanity/fixture";

/*
 * Real 404s for blog addresses that have no article or category
 * (docs/sections/p7-blog.md; ARCHITECTURE gotcha 44: a page under Cache
 * Components cannot answer 404 once its shell is being served). Before the
 * page renders, this asks Sanity whether the address exists. If not, the
 * request is shown the placeholder address, which is built as a 404 page.
 * If Sanity cannot be reached in time the request goes through untouched.
 * Answers are remembered for a short while on a server that keeps memory;
 * Sanity's own CDN answers repeat questions quickly in any case.
 */
export const config = { matcher: ["/blog/:path+"] };

const PLACEHOLDER = "none-yet";
const known = new Map<string, { yes: boolean; until: number }>();

async function exists(kind: "post" | "category", slug: string): Promise<boolean | null> {
  if (process.env.BLOG_FIXTURE === "1") return kind === "post" ? fixturePosts.some((p) => p.slug === slug) : fixtureCategories.some((c) => c.slug === slug);
  if (!sanityReady) return false;
  const id = `${kind}:${slug}`;
  const hit = known.get(id);
  if (hit && hit.until > Date.now()) return hit.yes;
  try {
    const url = new URL(`https://${projectId}.apicdn.sanity.io/v${apiVersion}/data/query/${dataset}`);
    url.searchParams.set("query", `count(*[_type == $kind && slug.current == $slug]) > 0`);
    url.searchParams.set("$kind", JSON.stringify(kind));
    url.searchParams.set("$slug", JSON.stringify(slug));
    url.searchParams.set("perspective", "published");
    const res = await fetch(url, { signal: AbortSignal.timeout(1500) });
    if (!res.ok) return null;
    const yes = ((await res.json()) as { result: boolean }).result === true;
    known.set(id, { yes, until: Date.now() + (yes ? 600_000 : 30_000) });
    if (known.size > 2000) known.clear();
    return yes;
  } catch {
    return null;
  }
}

export async function proxy(request: NextRequest) {
  const parts = request.nextUrl.pathname.split("/").filter(Boolean); // ["blog", ...]
  const isCategory = parts[1] === "category";
  const slug = isCategory ? parts[2] : parts[1];
  const depthOk = isCategory ? parts.length === 3 : parts.length === 2;
  if (!depthOk || !slug || slug === PLACEHOLDER) return NextResponse.next();
  const ok = /^[a-z0-9]+(-[a-z0-9]+)*$/.test(slug) ? await exists(isCategory ? "category" : "post", slug) : false;
  if (ok !== false) return NextResponse.next();
  const to = request.nextUrl.clone();
  to.pathname = isCategory ? `/blog/category/${PLACEHOLDER}/` : `/blog/${PLACEHOLDER}/`;
  return NextResponse.rewrite(to);
}
