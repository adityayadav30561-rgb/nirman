import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { formatDate } from "@/sanity/blog";
import { BlogPicture } from "@/components/blog/picture";
import type { BlogCategory, PostCard } from "@/sanity/types";

/*
 * Shared pieces of the blog pages (docs/sections/p7-blog.md): pictures from
 * Sanity, the line of small facts under a title, article cards and the
 * category chips.
 */

export function Meta({ post, tone = "dark" }: { post: PostCard; tone?: "dark" | "light" }) {
  return (
    <p className={`flex flex-wrap items-center gap-x-2 gap-y-1 text-[0.8rem] ${tone === "light" ? "text-white/65" : "text-muted"}`}>
      <time dateTime={post.publishedAt}>{formatDate(post.publishedAt)}</time>
      <span aria-hidden>·</span>
      <span>{post.minutes} min read</span>
    </p>
  );
}

export const tag = "inline-flex rounded-full bg-wash px-3 py-1 text-[0.72rem] font-semibold tracking-[0.06em] text-brand uppercase";

/** One article in a grid: picture, category, title, summary, date. The whole card is the link. */
export function ArticleCard({ post, sizes = "(min-width: 64rem) 26rem, (min-width: 40rem) 50vw, 100vw" }: { post: PostCard; sizes?: string }) {
  return (
    <article className="rv group relative flex h-full flex-col overflow-hidden rounded-[1.5rem] bg-white ring-1 ring-line transition-shadow duration-300 hover:shadow-[0_2rem_3.5rem_-2rem_rgba(18,20,24,0.3)]">
      <div className="overflow-hidden">
        <BlogPicture image={post.image} sizes={sizes} className="aspect-[16/10] w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]" />
      </div>
      <div className="flex flex-1 flex-col p-6">
        <span className={`${tag} self-start`}>{post.category.title}</span>
        <h3 className="mt-3 text-[1.2rem] leading-snug font-semibold tracking-[-0.015em]">
          <Link href={`/blog/${post.slug}/`} className="after:absolute after:inset-0 focus-visible:outline-none focus-visible:after:rounded-[1.5rem] focus-visible:after:outline-2 focus-visible:after:outline-brand">
            {post.title}
          </Link>
        </h3>
        <p className="mt-2 line-clamp-3 text-[0.92rem] leading-relaxed text-muted">{post.excerpt}</p>
        <div className="mt-auto flex items-center justify-between pt-5">
          <Meta post={post} />
          <span aria-hidden className="flex size-9 items-center justify-center rounded-full bg-page ring-1 ring-line transition-colors group-hover:bg-brand group-hover:text-white group-hover:ring-brand"><ArrowRight className="size-4" /></span>
        </div>
      </div>
    </article>
  );
}

/** Category chips: links, so each category is its own page for search engines. */
export function Chips({ categories, active, tone = "dark", center = false }: { categories: BlogCategory[]; active?: string; tone?: "dark" | "light"; center?: boolean }) {
  const base = "inline-flex h-11 items-center rounded-full px-5 text-[0.88rem] font-medium transition-colors focus-visible:outline-2 focus-visible:outline-offset-2";
  const on = tone === "light" ? "bg-white text-ink focus-visible:outline-white" : "bg-ink-2 text-white focus-visible:outline-brand";
  const off = tone === "light" ? "bg-white/8 text-white ring-1 ring-white/12 hover:bg-white/14 focus-visible:outline-white" : "bg-white ring-1 ring-line hover:ring-brand hover:text-brand focus-visible:outline-brand";
  return (
    <nav aria-label="Categories">
      <ul className={`flex flex-wrap gap-2 ${center ? "justify-center" : ""}`}>
        <li><Link href="/blog/" aria-current={active ? undefined : "page"} className={`${base} ${active ? off : on}`}>All</Link></li>
        {categories.map((c) => (
          <li key={c.slug}><Link href={`/blog/category/${c.slug}/`} aria-current={active === c.slug ? "page" : undefined} className={`${base} ${active === c.slug ? on : off}`}>{c.title}</Link></li>
        ))}
      </ul>
    </nav>
  );
}
