"use client";

import { useEffect, useId, useState, useSyncExternalStore } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";

/*
 * Cookie consent (docs/sections/s5-consent.md). Google Consent Mode v2:
 * the layout sets every measurement and advertising signal to "denied"
 * before Tag Manager loads (app/layout.tsx), so nothing stores cookies until
 * the visitor chooses here. The choice is kept in this browser
 * (localStorage "nirman-consent") for six months and applied on every page
 * load; "Cookie settings" in the footer opens the banner again.
 */
export const CONSENT_KEY = "nirman-consent";
const OPEN_EVENT = "nirman:cookie-settings";
const CHANGE_EVENT = "nirman:consent-changed";
const SIX_MONTHS = 180 * 86_400_000;
type Choice = { analytics: boolean; ads: boolean; t: number };

function read(): Choice | null {
  try {
    const c = JSON.parse(localStorage.getItem(CONSENT_KEY) || "null") as Choice | null;
    return c && typeof c.t === "number" && Date.now() - c.t < SIX_MONTHS ? c : null;
  } catch {
    return null;
  }
}

function save(analytics: boolean, ads: boolean) {
  try {
    localStorage.setItem(CONSENT_KEY, JSON.stringify({ analytics, ads, t: Date.now() } satisfies Choice));
  } catch {}
  const w = window as unknown as { dataLayer?: unknown[]; gtag?: (...a: unknown[]) => void };
  w.dataLayer = w.dataLayer || [];
  const gtag = w.gtag || ((...a: unknown[]) => void w.dataLayer!.push(a));
  const state = (on: boolean) => (on ? "granted" : "denied");
  gtag("consent", "update", { analytics_storage: state(analytics), ad_storage: state(ads), ad_user_data: state(ads), ad_personalization: state(ads) });
  w.dataLayer.push({ event: "consent_update" });
  window.dispatchEvent(new Event(CHANGE_EVENT));
}

// "decided" comes from localStorage; on the server (and before hydration) the banner is not shown.
const subscribe = (cb: () => void) => {
  window.addEventListener(CHANGE_EVENT, cb);
  window.addEventListener("storage", cb);
  return () => {
    window.removeEventListener(CHANGE_EVENT, cb);
    window.removeEventListener("storage", cb);
  };
};

export function CookieSettingsButton({ className = "" }: { className?: string }) {
  return (
    <button type="button" onClick={() => window.dispatchEvent(new Event(OPEN_EVENT))} className={className}>
      Cookie settings
    </button>
  );
}

function Toggle({ label, text, checked, onChange, locked = false }: { label: string; text: string; checked: boolean; onChange?: (v: boolean) => void; locked?: boolean }) {
  const id = useId();
  return (
    <div className="flex items-start justify-between gap-4 border-t border-line py-3">
      <label htmlFor={id} className="min-w-0">
        <span className="block text-[0.9rem] font-medium">{label}</span>
        <span className="block text-[0.8rem] leading-snug text-muted">{text}</span>
      </label>
      <button id={id} type="button" role="switch" aria-checked={checked} disabled={locked} onClick={() => onChange?.(!checked)} className={`relative mt-0.5 h-7 w-12 shrink-0 rounded-full transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand ${checked ? "bg-brand" : "bg-ink/20"} ${locked ? "opacity-60" : ""}`}>
        <span className={`absolute top-1 left-1 size-5 rounded-full bg-white shadow transition-transform ${checked ? "translate-x-5" : ""}`} />
      </button>
    </div>
  );
}

export function CookieConsent() {
  const reduce = useReducedMotion();
  const pathname = usePathname();
  const decided = useSyncExternalStore(subscribe, () => read() !== null, () => true);
  const [reopened, setReopened] = useState(false);
  const [choosing, setChoosing] = useState(false);
  const [analytics, setAnalytics] = useState(true);
  const [ads, setAds] = useState(false);

  useEffect(() => {
    const open = () => {
      const c = read();
      setAnalytics(c ? c.analytics : true);
      setAds(c ? c.ads : false);
      setChoosing(true);
      setReopened(true);
    };
    window.addEventListener(OPEN_EVENT, open);
    return () => window.removeEventListener(OPEN_EVENT, open);
  }, []);

  const done = (a: boolean, b: boolean) => {
    save(a, b);
    setReopened(false);
    setChoosing(false);
  };
  const show = (!decided || reopened) && !pathname.startsWith("/studio");
  const btn = "inline-flex h-11 items-center justify-center rounded-full px-5 text-[0.88rem] font-medium transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand";

  return (
    <AnimatePresence>
      {show && (
        <motion.div role="dialog" aria-label="Cookies on this site" className="fixed inset-x-3 bottom-3 z-[80] mx-auto max-w-[27rem] rounded-[1.5rem] bg-white p-6 text-ink shadow-[0_2rem_4rem_-1rem_rgba(18,20,24,0.45)] ring-1 ring-line sm:inset-x-auto sm:bottom-5 sm:left-5 sm:mx-0" initial={reduce ? false : { y: 40, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={reduce ? undefined : { y: 30, opacity: 0 }} transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}>
          <p className="text-[1.05rem] font-semibold tracking-[-0.01em]">Cookies on this site</p>
          <p className="mt-1.5 text-[0.86rem] leading-relaxed text-muted">
            We would like to use cookies to measure how the site is used, so we can improve it. Nothing is stored until you choose. See our <Link href="/privacy-policy/#what-we-collect" className="font-medium text-ink underline underline-offset-2 hover:text-brand">privacy policy</Link>.
          </p>
          {choosing && (
            <div className="mt-4">
              <Toggle label="Necessary" text="Needed for the site to work. Always on." checked locked />
              <Toggle label="Analytics" text="Counts visits and shows which pages are used." checked={analytics} onChange={setAnalytics} />
              <Toggle label="Marketing" text="Lets us measure advertising and show relevant ads." checked={ads} onChange={setAds} />
            </div>
          )}
          <div className="mt-5 flex flex-wrap gap-2">
            {choosing ? (
              <button type="button" onClick={() => done(analytics, ads)} className={`${btn} bg-ink-2 text-white hover:bg-brand`}>Save choices</button>
            ) : (
              <button type="button" onClick={() => done(true, true)} className={`${btn} bg-ink-2 text-white hover:bg-brand`}>Accept all</button>
            )}
            <button type="button" onClick={() => done(false, false)} className={`${btn} border border-ink-2/80 hover:border-brand hover:text-brand`}>Only necessary</button>
            {!choosing && <button type="button" onClick={() => setChoosing(true)} className={`${btn} px-3 text-muted underline-offset-4 hover:text-ink hover:underline`}>Choose</button>}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
