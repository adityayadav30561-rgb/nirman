"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Suspense, useEffect, useRef, useState } from "react";
import { ChevronDown, Menu, X } from "lucide-react";
import { Logo } from "@/components/logo";
import { ButtonLink } from "@/components/ui/button";
import { headerCtas, mainNav, serviceLinks } from "@/content/nav";
import { gsap, MOTION_OK, useGSAP } from "@/components/motion/gsap";

function isActive(pathname: string, href: string) {
  return href === "/" ? pathname === "/" : pathname.startsWith(href);
}

function ServicesMenu({ active }: { active: boolean }) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    const onClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("mousedown", onClick);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("mousedown", onClick);
    };
  }, [open]);

  return (
    <div ref={ref} className="hd-item gs-hide relative" onMouseEnter={() => setOpen(true)} onMouseLeave={() => setOpen(false)}>
      <button
        type="button"
        aria-expanded={open}
        aria-controls="services-menu"
        onClick={() => setOpen((v) => !v)}
        className="nav-item inline-flex items-center gap-1"
        data-active={active || undefined}
      >
        Services
        <ChevronDown aria-hidden className={`size-3.5 transition-transform duration-200 ${open ? "rotate-180" : ""}`} />
      </button>
      <div
        id="services-menu"
        className={`absolute top-full left-1/2 w-[22rem] -translate-x-1/2 pt-4 transition-[opacity,translate] duration-200 ${
          open ? "visible translate-y-0 opacity-100" : "invisible -translate-y-1 opacity-0"
        }`}
      >
        <ul className="rounded-2xl bg-white p-2 shadow-[0_24px_48px_-20px_rgb(5_7_12/0.25),0_2px_6px_rgb(5_7_12/0.05)]">
          {serviceLinks.map((s) => (
            <li key={s.href}>
              <Link
                href={s.href}
                onClick={() => setOpen(false)}
                className="block rounded-xl px-4 py-3 transition-colors hover:bg-wash focus-visible:bg-wash focus-visible:outline-none"
              >
                <span className="block text-[0.85rem] font-medium text-ink">{s.label}</span>
                <span className="mt-0.5 block text-[0.75rem] text-muted">{s.description}</span>
              </Link>
            </li>
          ))}
          <li className="mt-1 border-t border-line pt-1">
            <Link
              href="/services/"
              onClick={() => setOpen(false)}
              className="block rounded-xl px-4 py-3 text-[0.8rem] font-medium text-brand transition-colors hover:bg-wash"
            >
              All services
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
}

/*
 * usePathname cannot be resolved while Next prerenders the shell of a page
 * whose address is not known at build time (a blog article published after
 * the build; ARCHITECTURE gotcha 47), so it must sit inside Suspense. The
 * fallback is the same header with no menu item marked.
 */
export function SiteHeader() {
  return (
    <Suspense fallback={<Header pathname="" />}>
      <HeaderAtPath />
    </Suspense>
  );
}

function HeaderAtPath() {
  return <Header pathname={usePathname()} />;
}

function Header({ pathname }: { pathname: string }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const headerRef = useRef<HTMLElement>(null);

  // Load entrance (GSAP, the calm first version): logo, nav items 0.1 s apart,
  // then the dark button (grey to dark) and the outline button. Start states
  // (gs-hide) are in globals.css. Runs once per page load (the header persists).
  useGSAP(
    () => {
      gsap.matchMedia().add(MOTION_OK, () => {
        const q = gsap.utils.selector(headerRef);
        const tl = gsap.timeline({ defaults: { ease: "power2.out" } });
        tl.fromTo(q(".hd-logo"), { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.4 }, 0);
        tl.fromTo(q(".hd-item"), { autoAlpha: 0, y: 6 }, { autoAlpha: 1, y: 0, duration: 0.4, stagger: 0.1 }, 0.2);
        tl.fromTo(q(".hd-menu"), { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.4 }, 0.3);
        tl.fromTo(q(".hd-cta-dark"), { autoAlpha: 0, y: 6, backgroundColor: "#c9ced6" }, { autoAlpha: 1, y: 0, duration: 0.4 }, 0.4);
        tl.to(q(".hd-cta-dark"), { backgroundColor: "#1b1f27", duration: 0.4, clearProps: "backgroundColor" }, 0.5);
        tl.fromTo(q(".hd-cta"), { autoAlpha: 0, y: 6 }, { autoAlpha: 1, y: 0, duration: 0.4 }, 0.7);
      });
    },
    { scope: headerRef },
  );

  return (
    <header ref={headerRef} className="relative z-30">
      <div className="container-page flex h-[5.5rem] items-center justify-between gap-6">
        <Link href="/" aria-label="Nirman home" className="hd-logo gs-hide shrink-0">
          <Logo priority />
        </Link>

        <nav aria-label="Main" className="hidden lg:block">
          <ul className="flex items-center gap-9 text-[0.82rem] text-ink-2">
            {mainNav.map((item) => (
              <li key={item.href}>
                {item.children ? (
                  <ServicesMenu active={isActive(pathname, item.href)} />
                ) : (
                  <Link
                    href={item.href}
                    className="hd-item gs-hide nav-item"
                    aria-current={isActive(pathname, item.href) ? "page" : undefined}
                    data-active={isActive(pathname, item.href) || undefined}
                  >
                    {item.label}
                  </Link>
                )}
              </li>
            ))}
          </ul>
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          <ButtonLink href={headerCtas.primary.href} size="sm" className="hd-cta-dark gs-hide">
            {headerCtas.primary.label}
          </ButtonLink>
          <ButtonLink href={headerCtas.secondary.href} size="sm" variant="outline" className="hd-cta gs-hide">
            {headerCtas.secondary.label}
          </ButtonLink>
        </div>

        <button
          type="button"
          className="hd-menu gs-hide grid size-11 place-items-center rounded-full bg-white text-ink shadow-[0_2px_8px_rgb(5_7_12/0.08)] lg:hidden"
          aria-expanded={mobileOpen}
          aria-controls="mobile-menu"
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
          onClick={() => setMobileOpen((v) => !v)}
        >
          {mobileOpen ? <X className="size-5" aria-hidden /> : <Menu className="size-5" aria-hidden />}
        </button>
      </div>

      <div
        id="mobile-menu"
        hidden={!mobileOpen}
        className="absolute inset-x-0 top-full border-t border-line bg-white px-6 pb-8 pt-4 shadow-[0_24px_48px_-24px_rgb(5_7_12/0.3)] lg:hidden"
      >
        <nav aria-label="Mobile">
          <ul className="divide-y divide-line">
            {mainNav.map((item) => (
              <li key={item.href}>
                <Link href={item.href} onClick={() => setMobileOpen(false)} className="block py-3.5 text-[1rem] font-medium text-ink">
                  {item.label}
                </Link>
                {item.children && (
                  <ul className="-mt-1 grid grid-cols-2 gap-x-4 pb-3">
                    {item.children.map((c) => (
                      <li key={c.href}>
                        <Link href={c.href} onClick={() => setMobileOpen(false)} className="block py-1.5 text-[0.85rem] text-muted">
                          {c.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            ))}
          </ul>
        </nav>
        <div className="mt-5 flex flex-wrap gap-3">
          <ButtonLink href={headerCtas.primary.href} onClick={() => setMobileOpen(false)}>
            {headerCtas.primary.label}
          </ButtonLink>
          <ButtonLink href={headerCtas.secondary.href} variant="outline" onClick={() => setMobileOpen(false)}>
            {headerCtas.secondary.label}
          </ButtonLink>
        </div>
      </div>
    </header>
  );
}
