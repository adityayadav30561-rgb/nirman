"use client";

import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { nav, site } from "@/content/site";
import { Logo } from "./logo";
import { button } from "./ui/button";

export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState<string | null>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Highlight the nav item whose section is crossing the upper third of the viewport.
  useEffect(() => {
    const ids = nav.map((n) => n.href.slice(1));
    const sections = ids.map((id) => document.getElementById(id)).filter(Boolean) as HTMLElement[];
    const observer = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) setActive(e.target.id);
        }
      },
      { rootMargin: "-30% 0px -65% 0px" },
    );
    sections.forEach((s) => observer.observe(s));
    const clearAtTop = () => window.scrollY < 300 && setActive(null);
    window.addEventListener("scroll", clearAtTop, { passive: true });
    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", clearAtTop);
    };
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <div className={`container-site transition-[padding] duration-300 ${scrolled ? "pt-2.5" : "pt-4"}`}>
        <div
          className={`flex h-15 items-center justify-between gap-4 rounded-full pl-5 pr-2 transition-[background-color,box-shadow] duration-300 ${
            scrolled || open
              ? "bg-surface/80 shadow-[0_8px_30px_-12px_rgb(22_24_27/0.25)] ring-1 ring-ink/8 backdrop-blur-xl backdrop-saturate-150"
              : "bg-surface/0"
          }`}
        >
          <a href="#top" className="shrink-0 rounded-md" aria-label={`${site.name} ${site.descriptor}, back to top`}>
            <Logo />
          </a>

          <nav aria-label="Primary" className="hidden lg:block">
            <ul className="flex items-center gap-1 rounded-full bg-ink/[0.045] p-1">
              {nav.map((item) => {
                const isActive = active === item.href.slice(1);
                return (
                  <li key={item.href}>
                    <a
                      href={item.href}
                      aria-current={isActive ? "location" : undefined}
                      className={`inline-flex h-10 items-center rounded-full px-4 text-[0.95rem] transition-colors ${
                        isActive ? "bg-ink text-paper" : "text-ink-2 hover:bg-surface hover:text-ink"
                      }`}
                    >
                      {item.label}
                    </a>
                  </li>
                );
              })}
            </ul>
          </nav>

          <div className="flex items-center gap-1.5">
            <a href={site.bookingUrl} className={`${button("accent", "sm")} h-11 max-sm:hidden`}>
              Book a discovery call
            </a>
            <button
              type="button"
              className="inline-flex size-11 items-center justify-center rounded-full bg-ink text-paper lg:hidden"
              aria-expanded={open}
              aria-controls="mobile-nav"
              aria-label={open ? "Close menu" : "Open menu"}
              onClick={() => setOpen((o) => !o)}
            >
              {open ? <X className="size-5" /> : <Menu className="size-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile navigation sheet */}
      <div id="mobile-nav" hidden={!open} className="fixed inset-0 -z-10 overflow-y-auto bg-paper pt-24 lg:hidden">
        <nav aria-label="Mobile" className="container-site flex min-h-full flex-col pb-8">
          <ul>
            {nav.map((item, i) => (
              <li key={item.href} className="border-b border-ink/10">
                <a href={item.href} onClick={() => setOpen(false)} className="heading flex items-center gap-4 py-5 text-[2rem] text-ink">
                  <span className={`size-3 rounded-full ${["bg-cobalt", "bg-forest", "bg-coral", "bg-peacock", "bg-marigold"][i]}`} aria-hidden />
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
          <div className="mt-auto space-y-4 pt-10">
            <a href={site.bookingUrl} onClick={() => setOpen(false)} className={`${button("accent", "lg")} w-full`}>
              Book a discovery call
            </a>
            <p className="text-center text-sm text-ink-3">
              Or write to us at{" "}
              <a className="text-ink underline decoration-ink/25 underline-offset-4" href={`mailto:${site.email}`}>
                {site.email}
              </a>
            </p>
          </div>
        </nav>
      </div>
    </header>
  );
}
