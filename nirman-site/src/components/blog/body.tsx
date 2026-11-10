import Link from "next/link";
import { PortableText, type PortableTextComponents } from "@portabletext/react";
import { Info } from "lucide-react";
import { BlogPicture } from "@/components/blog/picture";
import type { BodyBlock } from "@/sanity/types";

/*
 * The article text (docs/sections/p7-blog.md): Sanity's blocks turned into
 * the site's typography. Headings get ids so the contents list can link to
 * them. Links inside the site use next/link; outside links open in a new tab.
 */

const text = (b: BodyBlock) => ((b.children as { text?: string }[] | undefined) || []).map((c) => c.text || "").join("");
export const headingId = (b: BodyBlock) => `${text(b).toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "").slice(0, 60)}-${b._key}`;

/** The main headings of an article, for the contents list. */
export function outline(body: BodyBlock[]) {
  return body.filter((b) => b._type === "block" && b.style === "h2").map((b) => ({ id: headingId(b), title: text(b) }));
}

const components: PortableTextComponents = {
  block: {
    normal: ({ children }) => <p className="mt-5 text-[1.06rem] leading-[1.8] text-ink/85">{children}</p>,
    h2: ({ children, value }) => <h2 id={headingId(value as unknown as BodyBlock)} className="mt-12 scroll-mt-28 text-[clamp(1.5rem,2.4vw,1.9rem)] leading-tight font-semibold tracking-[-0.025em]">{children}</h2>,
    h3: ({ children }) => <h3 className="mt-8 text-[1.25rem] leading-snug font-semibold tracking-[-0.015em]">{children}</h3>,
    blockquote: ({ children }) => <blockquote className="mt-8 border-l-[3px] border-brand pl-6 text-[1.3rem] leading-snug font-medium tracking-[-0.01em]">{children}</blockquote>,
  },
  list: {
    bullet: ({ children }) => <ul className="mt-5 flex list-disc flex-col gap-2 pl-6 text-[1.06rem] leading-[1.7] text-ink/85 marker:text-brand">{children}</ul>,
    number: ({ children }) => <ol className="mt-5 flex list-decimal flex-col gap-2 pl-6 text-[1.06rem] leading-[1.7] text-ink/85 marker:font-semibold marker:text-brand">{children}</ol>,
  },
  marks: {
    strong: ({ children }) => <strong className="font-semibold text-ink">{children}</strong>,
    link: ({ children, value }) => {
      const href = String((value as { href?: string })?.href || "#");
      const cls = "font-medium text-brand underline decoration-brand/40 underline-offset-[3px] transition-colors hover:decoration-brand";
      return href.startsWith("/") ? <Link href={href} className={cls}>{children}</Link> : <a href={href} target="_blank" rel="noopener noreferrer" className={cls}>{children}</a>;
    },
  },
  types: {
    figure: ({ value }) => {
      const v = value as { url?: string; w?: number; h?: number; alt?: string; caption?: string; lqip?: string };
      if (!v.url || !v.w || !v.h) return null;
      return (
        <figure className="mt-10">
          <BlogPicture image={{ url: v.url, w: v.w, h: v.h, alt: v.alt || "", lqip: v.lqip }} sizes="(min-width: 64rem) 46rem, 100vw" className="w-full rounded-[1.25rem] ring-1 ring-black/5" />
          {v.caption && <figcaption className="mt-3 text-center text-[0.85rem] text-muted">{v.caption}</figcaption>}
        </figure>
      );
    },
    note: ({ value }) => {
      const v = value as { title?: string; text?: string };
      return (
        <aside className="mt-8 flex gap-4 rounded-[1.25rem] bg-wash p-6">
          <Info className="mt-0.5 size-5 shrink-0 text-brand" aria-hidden />
          <div>
            {v.title && <p className="font-semibold">{v.title}</p>}
            <p className="text-[1rem] leading-relaxed text-ink/85">{v.text}</p>
          </div>
        </aside>
      );
    },
  },
};

export function ArticleBody({ body }: { body: BodyBlock[] }) {
  return (
    <div className="[&>*:first-child]:mt-0">
      <PortableText value={body as never} components={components} />
    </div>
  );
}
