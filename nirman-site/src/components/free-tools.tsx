import Link from "next/link";
import { ArrowRight, Braces, FileCode, Gauge, MapPin, MessageCircle, ScanSearch } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { toolLinks } from "@/content/site";
import { button } from "./ui/button";

// One line per tool for the strip; labels and URLs come from site.ts.
const toolInfo: Record<string, { icon: LucideIcon; body: string; tone: string }> = {
  "/tools/serp-preview/": { icon: ScanSearch, body: "See how a page will look in Google results.", tone: "bg-cobalt text-white" },
  "/tools/schema-generator/": { icon: Braces, body: "Make JSON-LD for your business, products and FAQs.", tone: "bg-coral text-white" },
  "/tools/sitemap-generator/": { icon: FileCode, body: "Create a sitemap.xml and robots.txt in seconds.", tone: "bg-peacock text-white" },
  "/tools/gbp-checker/": { icon: MapPin, body: "Check how complete your Google Business Profile is.", tone: "bg-forest-2 text-mint" },
  "/tools/whatsapp-link/": { icon: MessageCircle, body: "A click-to-chat link and QR code for your number.", tone: "bg-[#d9668f] text-white" },
};

const [audit, ...others] = toolLinks;

/** Free tools strip (handoff §4 and §6): the SEO audit up front, the other tools beside it. */
export function FreeTools() {
  return (
    <section id="free-tools" aria-labelledby="tools-title" className="scroll-mt-20 pb-24 lg:pb-32">
      <div className="container-site">
        <div className="grid gap-x-12 gap-y-10 overflow-hidden rounded-[2.5rem] bg-marigold-soft px-6 py-10 sm:px-10 sm:py-12 lg:grid-cols-12 lg:px-16 lg:py-16">
          <div className="lg:col-span-6">
            <p className="inline-flex items-center gap-2 rounded-full bg-surface/70 px-3.5 py-1.5 text-[0.9rem] font-medium">
              <Gauge className="size-4 text-[#9a6a00]" />
              {audit.label}
            </p>
            <h2 id="tools-title" className="display mt-5 text-[clamp(2.4rem,5vw,4.4rem)]">
              Check your website for free.
            </h2>
            <p className="mt-5 max-w-[32rem] text-[1.075rem] leading-[1.65] text-ink-2">
              Enter your address and get an SEO score out of 100 with a list of fixes, in under a minute. No sign-up needed
              to see the result.
            </p>
            <form action={audit.href} method="get" className="mt-8 flex max-w-[34rem] flex-col gap-3 sm:flex-row">
              <label htmlFor="audit-url" className="sr-only">
                Website address
              </label>
              <input
                id="audit-url"
                name="url"
                type="text"
                inputMode="url"
                autoComplete="url"
                required
                placeholder="yourwebsite.com"
                className="h-14 w-full min-w-0 shrink-0 rounded-full sm:w-auto sm:flex-1 bg-surface px-6 text-[1.05rem] ring-1 ring-ink/12 placeholder:text-ink-3 focus:outline-none focus-visible:ring-2 focus-visible:ring-ink"
              />
              <button type="submit" className={`${button("primary", "lg")} h-14`}>
                Run free audit
                <ArrowRight className="size-4.5" />
              </button>
            </form>
            <p className="mt-4 text-[0.9rem] text-ink-3">Checks speed, mobile, titles, schema and whether AI search can read your site.</p>
          </div>

          <div className="lg:col-span-6">
            <p className="text-[0.9rem] text-ink-3">More free tools</p>
            <ul className="mt-3 divide-y divide-ink/8 overflow-hidden rounded-[1.75rem] bg-surface">
              {others.map((t) => {
                const info = toolInfo[t.href];
                const Icon = info?.icon ?? Gauge;
                return (
                  <li key={t.href}>
                    <Link href={t.href} className="group flex items-center gap-4 px-5 py-4 transition-colors hover:bg-paper sm:px-6">
                      <span className={`grid size-10 shrink-0 place-items-center rounded-xl ${info?.tone ?? "bg-ink text-white"}`}>
                        <Icon className="size-4.5" strokeWidth={1.9} />
                      </span>
                      <span className="min-w-0 flex-1">
                        <span className="title block text-[1.05rem] leading-tight">{t.label}</span>
                        {info && <span className="mt-0.5 block text-[0.9rem] text-ink-2">{info.body}</span>}
                      </span>
                      <ArrowRight className="size-4 shrink-0 text-ink-3 transition-transform group-hover:translate-x-0.5 group-hover:text-ink" />
                    </Link>
                  </li>
                );
              })}
            </ul>
            <Link href="/tools/" className="mt-5 inline-flex items-center gap-2 font-medium underline decoration-ink/30 underline-offset-4 hover:decoration-ink">
              All free tools
              <ArrowRight className="size-4" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
