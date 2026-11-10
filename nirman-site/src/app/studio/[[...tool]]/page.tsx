import type { Metadata } from "next";
import { Suspense } from "react";
import { sanityReady } from "@/sanity/env";
import { Studio } from "./studio";

/*
 * /studio/: where articles are written and published (docs/sections/p7-blog.md).
 * Not for search engines. Until the Sanity project is connected it says what
 * is missing instead of showing a broken editor.
 */
export const metadata: Metadata = { title: "Blog editor", robots: { index: false, follow: false } };

export function generateStaticParams() {
  return [{ tool: [] }];
}

export default function StudioPage() {
  if (!sanityReady) {
    return (
      <section className="container-page py-28">
        <h1 className="text-[clamp(1.8rem,3vw,2.6rem)] font-semibold tracking-[-0.03em]">The blog editor is not connected yet</h1>
        <p className="mt-4 max-w-[38rem] text-muted">Set NEXT_PUBLIC_SANITY_PROJECT_ID and NEXT_PUBLIC_SANITY_DATASET for this site, then open this page again. The steps are in docs/sections/p7-blog.md.</p>
      </section>
    );
  }
  // The editor renders in the browser only, so it sits behind Suspense.
  return (
    <Suspense fallback={<p className="container-page py-28 text-muted">Opening the editor…</p>}>
      <Studio />
    </Suspense>
  );
}
