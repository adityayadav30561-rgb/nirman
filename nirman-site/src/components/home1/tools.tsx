import Link from "next/link";
import { ArrowRight, Braces, FileCode, Gauge, MapPin, MessageCircle, ScanSearch, type LucideIcon } from "lucide-react";
import { toolLinks } from "@/content/site";
import { ButtonLink } from "../ui/button-link";

const info: Record<string, { icon: LucideIcon; body: string; tone: string }> = {
  "/tools/serp-preview/": { icon: ScanSearch, body: "See how a page looks in Google results.", tone: "bg-cobalt text-white" },
  "/tools/schema-generator/": { icon: Braces, body: "Make JSON-LD for your business and FAQs.", tone: "bg-coral text-white" },
  "/tools/sitemap-generator/": { icon: FileCode, body: "Create a sitemap.xml and robots.txt.", tone: "bg-peacock text-white" },
  "/tools/gbp-checker/": { icon: MapPin, body: "Check how complete your Google profile is.", tone: "bg-forest-2 text-mint" },
  "/tools/whatsapp-link/": { icon: MessageCircle, body: "A click-to-chat link and QR code.", tone: "bg-[#d9668f] text-white" },
};
const [audit, ...others] = toolLinks;

/** Section 9: the free SEO audit up front, the other tools as buttons beside it. */
export function Tools1() {
  return (
    <section id="free-tools" aria-labelledby="tools-title" className="scroll-mt-20 pb-20 lg:pb-28">
      <div className="container-site">
        <div className="grid gap-x-12 gap-y-10 overflow-hidden rounded-[2.5rem] bg-marigold-soft px-6 py-10 sm:px-10 sm:py-12 lg:grid-cols-12 lg:px-14 lg:py-16">
          <div className="lg:col-span-6">
            <p className="inline-flex items-center gap-2 rounded-full bg-surface/70 px-3.5 py-1.5 text-[0.9rem] font-medium">
              <Gauge className="size-4 text-[#9a6a00]" aria-hidden />
              {audit.label}
            </p>
            <h2 id="tools-title" className="display mt-5 text-[clamp(2.4rem,4.6vw,4.2rem)]">
              Check your website for free.
            </h2>
            <p className="mt-5 max-w-[32rem] text-[1.075rem] leading-[1.65] text-ink-2">
              Enter your address and get an SEO score out of 100 with a ranked list of fixes, in under a minute. The score
              shows without an email.
            </p>
            <form action="/tools/seo-audit/" method="get" className="mt-8 flex max-w-[34rem] flex-col gap-3 sm:flex-row">
              <label htmlFor="home1-audit-url" className="sr-only">
                Website address
              </label>
              <input
                id="home1-audit-url"
                name="url"
                type="text"
                inputMode="url"
                autoComplete="url"
                placeholder="yourwebsite.com"
                className="h-14 min-w-0 flex-1 rounded-full bg-surface px-6 text-[1rem] text-ink outline-none ring-1 ring-ink/12 placeholder:text-ink-3 focus-visible:ring-2 focus-visible:ring-ink"
              />
              <button
                type="submit"
                className="inline-flex h-14 items-center justify-center gap-2 whitespace-nowrap rounded-full bg-ink px-7 text-[1.05rem] font-medium text-paper transition-colors hover:bg-cobalt"
              >
                Run the free audit
                <ArrowRight className="size-4.5" aria-hidden />
              </button>
            </form>
          </div>

          <div className="lg:col-span-6">
            <p className="text-[0.9rem] text-ink-2">More free tools. No signup.</p>
            <ul className="mt-4 grid gap-3 sm:grid-cols-2">
              {others.map((t) => {
                const d = info[t.href];
                const Icon = d.icon;
                return (
                  <li key={t.href}>
                    <Link
                      href={t.href}
                      className="group flex h-full items-start gap-3.5 rounded-[1.5rem] bg-surface/85 p-4 ring-1 ring-ink/8 transition-[background-color,box-shadow] hover:bg-surface hover:shadow-panel"
                    >
                      <span className={`grid size-11 shrink-0 place-items-center rounded-2xl ${d.tone}`}>
                        <Icon className="size-5" strokeWidth={1.8} aria-hidden />
                      </span>
                      <span className="min-w-0">
                        <span className="title block text-[1.02rem] leading-tight">{t.label}</span>
                        <span className="mt-1 block text-[0.88rem] leading-[1.45] text-ink-2">{d.body}</span>
                      </span>
                    </Link>
                  </li>
                );
              })}
              <li className="flex items-center">
                <ButtonLink href="/tools/" variant="primary" size="md" className="w-full">
                  All free tools
                  <ArrowRight className="size-4" aria-hidden />
                </ButtonLink>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
