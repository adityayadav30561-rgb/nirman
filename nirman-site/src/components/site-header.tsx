"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useId, useRef, useState } from "react";
import { ArrowRight, ChevronDown, Menu, MessageCircle, Search, X } from "lucide-react";
import { mainNav, serviceGroups, site, toolLinks } from "@/content/site";
import { Logo } from "./logo";
import { button } from "./ui/button";

// One colour per pillar, in serviceGroups order (DESIGN.md service colours).
const pillarDots = ["bg-cobalt", "bg-coral", "bg-peacock", "bg-[#d9668f]"];

type OpenMenu = "services" | "tools" | null;

/** Header that knows the current path (for active links). Wrap in <Suspense>. */
export function HeaderWithPathname() {
  return <SiteHeader pathname={usePathname()} />;
}

export function SiteHeader({ pathname }: { pathname: string | null }) {
  const [scrolled, setScrolled] = useState(false);
  const [menu, setMenu] = useState<OpenMenu>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const headerRef = useRef<HTMLElement>(null);
  const hoverTimer = useRef<number | undefined>(undefined);
  const ids = useId();

  const close = useCallback(() => setMenu(null), []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close menus on navigation.
  const [lastPath, setLastPath] = useState(pathname);
  if (pathname !== lastPath) {
    setLastPath(pathname);
    setMenu(null);
    setMobileOpen(false);
  }

  // Escape and outside click close the desktop dropdowns.
  useEffect(() => {
    if (!menu) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        document.getElementById(`${ids}-${menu}-btn`)?.focus();
        close();
      }
    };
    const onDown = (e: PointerEvent) => {
      if (headerRef.current && !headerRef.current.contains(e.target as Node)) close();
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("pointerdown", onDown);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("pointerdown", onDown);
    };
  }, [menu, close, ids]);

  // Mobile sheet: lock scroll, Escape closes.
  useEffect(() => {
    if (!mobileOpen) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setMobileOpen(false);
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  const hoverOpen = (m: OpenMenu) => {
    window.clearTimeout(hoverTimer.current);
    hoverTimer.current = window.setTimeout(() => setMenu(m), 80);
  };
  const hoverClose = () => {
    window.clearTimeout(hoverTimer.current);
    hoverTimer.current = window.setTimeout(close, 180);
  };

  const isActive = (href: string) => !!pathname && pathname.startsWith(href);
  const solid = scrolled || menu !== null || mobileOpen;

  const navItem = (active: boolean) =>
    `inline-flex h-10 items-center gap-1.5 rounded-full px-3.5 text-[0.95rem] transition-colors ${
      active ? "bg-ink text-paper" : "text-ink-2 hover:bg-surface hover:text-ink"
    }`;

  return (
    <header ref={headerRef} className="fixed inset-x-0 top-0 z-50" onMouseLeave={hoverClose}>
      <div className={`container-site transition-[padding] duration-300 ${scrolled ? "pt-2.5" : "pt-4"}`}>
        <div
          className={`flex h-15 items-center justify-between gap-4 rounded-full pl-5 pr-2 transition-[background-color,box-shadow] duration-300 ${
            solid
              ? "bg-surface/85 shadow-[0_8px_30px_-12px_rgb(22_24_27/0.25)] ring-1 ring-ink/8 backdrop-blur-xl backdrop-saturate-150"
              : "bg-surface/0"
          }`}
        >
          <Link href="/" className="shrink-0 rounded-md" aria-label={`${site.name}, home`}>
            <Logo />
          </Link>

          {/* Desktop navigation */}
          <nav aria-label="Primary" className="hidden lg:block">
            <ul className="flex items-center gap-0.5 rounded-full bg-ink/[0.045] p-1">
              <li onMouseEnter={() => hoverOpen("services")}>
                <button
                  id={`${ids}-services-btn`}
                  type="button"
                  aria-expanded={menu === "services"}
                  aria-controls={`${ids}-services`}
                  onClick={() => setMenu(menu === "services" ? null : "services")}
                  className={navItem(isActive("/services/") || menu === "services")}
                >
                  Services
                  <ChevronDown className={`size-4 transition-transform ${menu === "services" ? "rotate-180" : ""}`} aria-hidden />
                </button>
              </li>
              <li onMouseEnter={() => hoverOpen(null)}>
                <Link href={mainNav[0].href} className={navItem(isActive(mainNav[0].href))}>
                  {mainNav[0].label}
                </Link>
              </li>
              <li className="relative" onMouseEnter={() => hoverOpen("tools")}>
                <button
                  id={`${ids}-tools-btn`}
                  type="button"
                  aria-expanded={menu === "tools"}
                  aria-controls={`${ids}-tools`}
                  onClick={() => setMenu(menu === "tools" ? null : "tools")}
                  className={navItem(isActive("/tools/") || menu === "tools")}
                >
                  Free tools
                  <ChevronDown className={`size-4 transition-transform ${menu === "tools" ? "rotate-180" : ""}`} aria-hidden />
                </button>
                {menu === "tools" && (
                  <div id={`${ids}-tools`} className="absolute left-1/2 top-full w-[22rem] -translate-x-1/2 pt-4">
                    <div className="anim-pop rounded-[1.75rem] bg-surface p-2 shadow-scene ring-1 ring-ink/8">
                      <ul>
                        {toolLinks.map((t) => (
                          <li key={t.href}>
                            <Link href={t.href} className="flex items-center justify-between rounded-2xl px-4 py-3 text-[0.95rem] hover:bg-paper">
                              {t.label}
                              {t.href === "/tools/seo-audit/" && (
                                <span className="rounded-full bg-cobalt-soft px-2 py-0.5 text-[0.75rem] font-medium text-cobalt">Popular</span>
                              )}
                            </Link>
                          </li>
                        ))}
                      </ul>
                      <Link href="/tools/" className="mt-1 flex items-center justify-between rounded-2xl bg-paper px-4 py-3 text-[0.95rem] font-medium hover:bg-paper-2">
                        All free tools
                        <ArrowRight className="size-4" aria-hidden />
                      </Link>
                    </div>
                  </div>
                )}
              </li>
              {mainNav.slice(1).map((item) => (
                <li key={item.href} onMouseEnter={() => hoverOpen(null)}>
                  <Link href={item.href} className={navItem(isActive(item.href))}>
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="flex items-center gap-1.5">
            <Link
              href="/tools/seo-audit/"
              className={`${button("secondary", "sm")} h-11 max-xl:hidden`}
            >
              <Search className="size-4" aria-hidden />
              Free SEO audit
            </Link>
            <Link href="/get-a-quote/" className={`${button("accent", "sm")} h-11 max-sm:hidden`}>
              Get a quote
            </Link>
            <button
              type="button"
              className="inline-flex size-11 items-center justify-center rounded-full bg-ink text-paper lg:hidden"
              aria-expanded={mobileOpen}
              aria-controls={`${ids}-mobile`}
              aria-label={mobileOpen ? "Close menu" : "Open menu"}
              onClick={() => setMobileOpen((o) => !o)}
            >
              {mobileOpen ? <X className="size-5" /> : <Menu className="size-5" />}
            </button>
          </div>
        </div>

        {/* Services mega menu */}
        {menu === "services" && (
          <div id={`${ids}-services`} className="hidden pt-3 lg:block" onMouseEnter={() => hoverOpen("services")}>
            <div className="anim-pop overflow-hidden rounded-[2rem] bg-surface shadow-scene ring-1 ring-ink/8">
              <div className="grid grid-cols-4 gap-2 p-3">
                {serviceGroups.map((g, i) => (
                  <div key={g.href} className="rounded-[1.5rem] p-4 hover:bg-paper/70">
                    <Link href={g.href} className="title flex items-center gap-2.5 text-[1.15rem] hover:text-cobalt">
                      <span className={`size-2.5 rounded-full ${pillarDots[i]}`} aria-hidden />
                      {g.title}
                    </Link>
                    <ul className="mt-3 space-y-0.5">
                      {g.links
                        .filter((l) => l.href !== g.href)
                        .map((l) => (
                          <li key={l.href}>
                            <Link
                              href={l.href}
                              className={`block rounded-xl px-2.5 py-2 text-[0.95rem] transition-colors hover:bg-surface hover:text-ink ${
                                pathname === l.href ? "font-medium text-ink" : "text-ink-2"
                              }`}
                            >
                              {l.label}
                            </Link>
                          </li>
                        ))}
                    </ul>
                  </div>
                ))}
              </div>
              <div className="flex flex-wrap items-center justify-between gap-3 bg-paper px-7 py-4 text-[0.95rem]">
                <p className="text-ink-2">Not sure what you need?</p>
                <p className="flex flex-wrap items-center gap-x-5 gap-y-2">
                  <Link href="/tools/seo-audit/" className="font-medium underline decoration-ink/25 underline-offset-4 hover:decoration-ink">
                    Run a free SEO audit
                  </Link>
                  <Link href="/book-a-call/" className="font-medium underline decoration-ink/25 underline-offset-4 hover:decoration-ink">
                    Book a 15-minute call
                  </Link>
                </p>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Mobile full-screen menu */}
      <div id={`${ids}-mobile`} hidden={!mobileOpen} className="fixed inset-0 -z-10 overflow-y-auto bg-paper pt-24 lg:hidden">
        <nav aria-label="Mobile" className="container-site flex min-h-full flex-col pb-8">
          <ul className="border-t border-ink/10">
            <MobileGroup title="Services">
              {serviceGroups.map((g, i) => (
                <MobileGroup key={g.href} title={g.title} dot={pillarDots[i]} nested>
                  {g.links.map((l) => (
                    <li key={l.href}>
                      <Link href={l.href} className="block py-2.5 pl-6 text-[1rem] text-ink-2">
                        {l.label}
                      </Link>
                    </li>
                  ))}
                </MobileGroup>
              ))}
            </MobileGroup>
            <MobileGroup title="Free tools">
              {toolLinks.map((t) => (
                <li key={t.href}>
                  <Link href={t.href} className="block py-2.5 text-[1rem] text-ink-2">
                    {t.label}
                  </Link>
                </li>
              ))}
              <li>
                <Link href="/tools/" className="block py-2.5 text-[1rem] font-medium">
                  All free tools
                </Link>
              </li>
            </MobileGroup>
            {mainNav.map((item) => (
              <li key={item.href} className="border-b border-ink/10">
                <Link href={item.href} className="heading block py-4 text-[1.6rem]">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
          <div className="mt-auto grid gap-3 pt-10">
            <Link href="/get-a-quote/" className={`${button("accent", "lg")} w-full`}>
              Get a quote
            </Link>
            <Link href="/tools/seo-audit/" className={`${button("secondary", "lg")} w-full`}>
              Free SEO audit
            </Link>
            <a href={site.whatsappHref} target="_blank" rel="noopener noreferrer" className={`${button("primary", "lg")} w-full`}>
              <MessageCircle className="size-5" aria-hidden />
              Chat on WhatsApp
            </a>
          </div>
        </nav>
      </div>
    </header>
  );
}

function MobileGroup({
  title,
  dot,
  nested = false,
  children,
}: {
  title: string;
  dot?: string;
  nested?: boolean;
  children: React.ReactNode;
}) {
  const [open, setOpen] = useState(false);
  const id = useId();
  return (
    <li className={nested ? "" : "border-b border-ink/10"}>
      <button
        type="button"
        aria-expanded={open}
        aria-controls={id}
        onClick={() => setOpen((o) => !o)}
        className={`flex w-full items-center justify-between text-left ${
          nested ? "py-3 text-[1.1rem] font-medium" : "heading py-4 text-[1.6rem]"
        }`}
      >
        <span className="flex items-center gap-3">
          {dot && <span className={`size-2.5 rounded-full ${dot}`} aria-hidden />}
          {title}
        </span>
        <ChevronDown className={`size-5 shrink-0 transition-transform ${open ? "rotate-180" : ""}`} aria-hidden />
      </button>
      <ul id={id} hidden={!open} className={nested ? "pb-2" : "pb-4"}>
        {children}
      </ul>
    </li>
  );
}
