import { timingSafeEqual } from "node:crypto";
import { revalidateTag } from "next/cache";
import { BLOG_TAG } from "@/sanity/blog";

/*
 * Called by a Sanity webhook when an article, category or author is
 * published, changed or removed (docs/sections/p7-blog.md): it marks the
 * cached blog data as old, so the next visit loads the new content.
 * Sanity sends the header "Authorization: Bearer <SANITY_REVALIDATE_SECRET>".
 * The address must end in a slash: /api/revalidate/
 */
export async function POST(request: Request) {
  const secret = process.env.SANITY_REVALIDATE_SECRET || "";
  const given = (request.headers.get("authorization") || "").replace(/^Bearer\s+/i, "");
  const a = Buffer.from(given);
  const b = Buffer.from(secret);
  if (!secret || a.length !== b.length || !timingSafeEqual(a, b)) return Response.json({ ok: false }, { status: 401 });
  revalidateTag(BLOG_TAG, "max");
  return Response.json({ ok: true, revalidated: BLOG_TAG });
}
