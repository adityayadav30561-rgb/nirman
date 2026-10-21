"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { ArrowRight, Cookie, MessageCircle, Phone, X } from "lucide-react";
import { site } from "@/content/site";
import { CONSENT_KEY, useStored } from "@/lib/stored";
import { button } from "./ui/button";

/*
 * Everything that floats over the page, coordinated in one place so items
 * never stack on top of each other (handoff §7):
 * - cookie consent banner (first visit until a choice is made)
 * - consult pop-up (after scrolling past the first screen, never on entry,
 *   hidden while the cookie banner is open, dismissal remembered)
 * - floating WhatsApp button (tablet/desktop)
 * - sticky Call / WhatsApp / Get a quote bar (phones)
 * The WhatsApp controls use a generic chat icon, not the WhatsApp logo.
 */

const CONSULT_KEY = "nirman-consult-dismissed";

export function SiteWidgets() {
  const [consent, setConsent] = useStored(CONSENT_KEY);
  const [consultDismissed, dismissConsult] = useStored(CONSULT_KEY);
  const [pastHero, setPastHero] = useState(false);

  useEffect(() => {
    const onScroll = () => setPastHero(window.scrollY > window.innerHeight * 0.9);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const hydrated = consent !== undefined;
  const showCookies = hydrated && consent === null;
  const showConsult = hydrated && !showCookies && pastHero && consultDismissed !== "1";

  return (
    <>
      {/* Bottom stack, right side: consult card above the WhatsApp button */}
      <div className="pointer-events-none fixed bottom-[5.5rem] right-3 z-40 flex flex-col items-end gap-3 sm:right-5 md:bottom-5">
        {showConsult && (
          <aside
            aria-label="Book a free consultation"
            className="anim-settle-up pointer-events-auto w-[min(21rem,calc(100vw-1.5rem))] rounded-[1.75rem] bg-surface p-5 shadow-scene ring-1 ring-ink/8"
          >
            <div className="flex items-start justify-between gap-3">
              <p className="title text-[1.15rem]">Not sure where to start?</p>
              <button
                type="button"
                onClick={() => dismissConsult("1")}
                className="-mr-1 -mt-1 grid size-9 shrink-0 place-items-center rounded-full text-ink-3 hover:bg-paper hover:text-ink"
                aria-label="Close"
              >
                <X className="size-4" />
              </button>
            </div>
            <p className="mt-1.5 text-[0.95rem] leading-relaxed text-ink-2">
              Book a free 15-minute call and we&apos;ll point you to the right next step. No obligation.
            </p>
            <div className="mt-4 flex flex-wrap gap-2">
              <Link href="/book-a-call/" className={button("primary", "sm")}>
                Book a call
                <ArrowRight className="size-4" aria-hidden />
              </Link>
              <Link href="/tools/seo-audit/" className={button("secondary", "sm")}>
                Free SEO audit
              </Link>
            </div>
          </aside>
        )}
        <a
          href={site.whatsappHref}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Chat with us on WhatsApp"
          className="pointer-events-auto hidden size-14 place-items-center rounded-full bg-forest text-mint shadow-[0_12px_30px_-10px_rgb(18_59_50/0.7)] transition-transform hover:scale-105 md:grid"
        >
          <MessageCircle className="size-6" aria-hidden />
        </a>
      </div>

      {/* Cookie consent */}
      {showCookies && (
        <div
          role="dialog"
          aria-label="Cookie preferences"
          className="fixed inset-x-3 bottom-[5.5rem] z-50 rounded-[1.75rem] bg-ink p-5 text-paper shadow-scene sm:inset-x-auto sm:left-5 sm:w-[26rem] md:bottom-5"
        >
          <p className="flex items-center gap-2.5 font-medium">
            <Cookie className="size-5 text-marigold" aria-hidden />
            Cookies
          </p>
          <p className="mt-2 text-[0.925rem] leading-relaxed text-paper/75">
            We use necessary cookies to run this site. With your permission we also use analytics cookies to understand
            which pages help visitors.{" "}
            <Link href="/privacy-policy/" className="underline decoration-paper/40 underline-offset-4 hover:decoration-paper">
              Privacy policy
            </Link>
          </p>
          <div className="mt-4 flex flex-wrap gap-2">
            <button type="button" onClick={() => setConsent("all")} className={button("accent", "sm")}>
              Accept all
            </button>
            <button type="button" onClick={() => setConsent("necessary")} className={button("ghostLight", "sm")}>
              Only necessary
            </button>
          </div>
        </div>
      )}

      {/* Phones: sticky action bar, with a spacer so it never covers the footer */}
      <div className="h-[4.75rem] md:hidden" aria-hidden />
      <nav
        aria-label="Quick contact"
        className="fixed inset-x-0 bottom-0 z-40 grid grid-cols-3 gap-1.5 border-t border-ink/8 bg-surface/95 px-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] pt-2.5 backdrop-blur md:hidden"
      >
        <a href={site.phoneHref} className="flex h-12 items-center justify-center gap-2 rounded-full bg-paper text-[0.95rem] font-medium">
          <Phone className="size-4" aria-hidden />
          Call
        </a>
        <a
          href={site.whatsappHref}
          target="_blank"
          rel="noopener noreferrer"
          className="flex h-12 items-center justify-center gap-2 rounded-full bg-forest text-[0.95rem] font-medium text-mint"
        >
          <MessageCircle className="size-4" aria-hidden />
          WhatsApp
        </a>
        <Link href="/get-a-quote/" className="flex h-12 items-center justify-center rounded-full bg-marigold text-[0.95rem] font-medium text-ink">
          Get a quote
        </Link>
      </nav>
    </>
  );
}
