import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { serviceGroups, toolLinks } from "@/content/site";
import { button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Page not found",
  robots: { index: false },
};

const pillarDots = ["bg-cobalt", "bg-coral", "bg-peacock", "bg-[#d9668f]"];

export default function NotFound() {
  return (
    <div className="container-site pb-16 pt-32 lg:pb-24 lg:pt-40">
      <div className="grid gap-x-14 gap-y-12 lg:grid-cols-12">
        <div className="lg:col-span-6">
          <p className="text-[0.95rem] text-ink-3">Error 404</p>
          <h1 className="display mt-3 text-[clamp(2.8rem,7vw,6rem)]">This page isn&apos;t here.</h1>
          <p className="mt-6 max-w-[32rem] text-[1.125rem] leading-[1.6] text-ink-2">
            The link may be old or mistyped. Start from the homepage, or jump to one of the pages below.
          </p>
          <div className="mt-9 flex flex-wrap gap-3">
            <Link href="/" className={button("primary", "lg")}>
              Go to the homepage
            </Link>
            <Link href="/contact/" className={button("secondary", "lg")}>
              Contact us
            </Link>
          </div>
        </div>
        <div className="grid gap-3 sm:grid-cols-2 lg:col-span-6">
          {serviceGroups.map((g, i) => (
            <Link
              key={g.href}
              href={g.href}
              className="group flex items-center justify-between rounded-[1.75rem] bg-surface p-6 shadow-panel transition-colors hover:bg-paper-2"
            >
              <span className="title flex items-center gap-3 text-[1.15rem]">
                <span className={`size-2.5 rounded-full ${pillarDots[i]}`} aria-hidden />
                {g.title}
              </span>
              <ArrowRight className="size-5 transition-transform group-hover:translate-x-1" aria-hidden />
            </Link>
          ))}
          <Link
            href={toolLinks[0].href}
            className="group flex items-center justify-between rounded-[1.75rem] bg-cobalt p-6 text-white sm:col-span-2"
          >
            <span className="title text-[1.15rem]">Run a free SEO audit</span>
            <ArrowRight className="size-5 transition-transform group-hover:translate-x-1" aria-hidden />
          </Link>
        </div>
      </div>
    </div>
  );
}
