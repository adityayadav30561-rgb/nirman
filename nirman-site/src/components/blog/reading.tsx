"use client";

import { useEffect, useRef, useState } from "react";
import { gsap, MOTION_OK, useGSAP } from "@/components/motion/gsap";

/*
 * Reading aids on an article page (docs/sections/p7-blog.md).
 * ReadProgress: a thin line under the header that fills as the article is
 * read (GSAP, scrubbed to the article's scroll; off under reduced motion).
 * Contents: the list of main headings; the one being read is marked.
 */
export function ReadProgress({ target }: { target: string }) {
  const bar = useRef<HTMLDivElement>(null);
  useGSAP(() => {
    gsap.matchMedia().add(MOTION_OK, () => {
      const el = document.getElementById(target);
      if (!el || !bar.current) return;
      gsap.set(bar.current.parentElement, { autoAlpha: 1 });
      gsap.fromTo(bar.current, { scaleX: 0 }, { scaleX: 1, ease: "none", scrollTrigger: { trigger: el, start: "top 20%", end: "bottom 80%", scrub: 0.3 } });
    });
  });
  return (
    <div aria-hidden className="invisible fixed inset-x-0 top-0 z-40 h-[3px] bg-transparent">
      <div ref={bar} className="h-full origin-left bg-brand" />
    </div>
  );
}

export function Contents({ items }: { items: { id: string; title: string }[] }) {
  const [active, setActive] = useState(items[0]?.id);
  useEffect(() => {
    const heads = items.map((i) => document.getElementById(i.id)).filter((el): el is HTMLElement => !!el);
    if (!heads.length) return;
    // the heading nearest above a line a third of the way down the screen is the one being read
    const onScroll = () => {
      const line = window.innerHeight * 0.33;
      let current = heads[0].id;
      for (const h of heads) if (h.getBoundingClientRect().top <= line) current = h.id;
      setActive(current);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [items]);
  if (items.length < 2) return null;
  return (
    <nav aria-label="In this article">
      <p className="text-[0.75rem] font-semibold tracking-[0.08em] text-muted uppercase">In this article</p>
      <ol className="mt-3 flex flex-col border-l border-line">
        {items.map((t) => (
          <li key={t.id}>
            <a href={`#${t.id}`} aria-current={active === t.id ? "location" : undefined} className={`-ml-px flex min-h-9 items-center border-l-2 py-1 pl-4 text-[0.9rem] leading-snug transition-colors ${active === t.id ? "border-brand font-medium text-ink" : "border-transparent text-muted hover:text-ink"}`}>
              {t.title}
            </a>
          </li>
        ))}
      </ol>
    </nav>
  );
}

/** Shows twelve cards, then twelve more on each press. Every card is in the page from the start, so search engines see all links. */
export function MoreGrid({ children, step = 12 }: { children: React.ReactNode[]; step?: number }) {
  const [shown, setShown] = useState(step);
  return (
    <>
      <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {children.map((c, i) => <li key={i} className={i < shown ? "" : "hidden"}>{c}</li>)}
      </ul>
      {shown < children.length && (
        <div className="mt-10 flex justify-center">
          <button type="button" onClick={() => setShown((n) => n + step)} className="inline-flex h-12 items-center rounded-full border border-ink-2/80 bg-white/70 px-7 text-[0.9rem] font-medium transition-colors hover:border-brand hover:text-brand focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand">
            Show more articles
          </button>
        </div>
      )}
    </>
  );
}
