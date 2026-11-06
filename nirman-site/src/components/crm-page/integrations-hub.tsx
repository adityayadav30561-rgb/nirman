"use client";

import { useRef } from "react";
import { CreditCard, Globe, Mail, Megaphone, MessageCircle, Store, Webhook } from "lucide-react";
import { gsap, MOTION_OK, useGSAP } from "@/components/motion/gsap";
import { LogoMark } from "@/components/logo";
import { integrations } from "@/content/crm-page";

/*
 * Integrations hub (docs/sections/p2-crm-page.md, variant B): the Nirman CRM
 * mark in the middle, the lead sources around it, lines drawn in with GSAP
 * when it scrolls into view. Generic icons only (no brand logos). Phones get
 * a plain list with each source's description.
 */
const icons = { form: Globe, chat: MessageCircle, mail: Mail, ads: Megaphone, market: Store, pay: CreditCard, api: Webhook };

export function IntegrationsHub() {
  const ref = useRef<HTMLDivElement>(null);
  useGSAP(
    () => {
      gsap.matchMedia().add(MOTION_OK, () => {
        const q = gsap.utils.selector(ref);
        gsap.set(q(".ib-line"), { strokeDasharray: 1, strokeDashoffset: 1 });
        gsap.set(q(".ib-node"), { autoAlpha: 0, scale: 0.85 });
        const st = { trigger: ref.current, start: "top 70%", once: true };
        gsap.to(q(".ib-line"), { strokeDashoffset: 0, duration: 0.8, stagger: 0.08, ease: "power2.out", scrollTrigger: st });
        gsap.to(q(".ib-node"), { autoAlpha: 1, scale: 1, duration: 0.5, stagger: 0.08, delay: 0.3, ease: "back.out(1.6)", scrollTrigger: st });
      });
    },
    { scope: ref },
  );
  const n = integrations.items.length;
  const at = (i: number) => {
    const a = (i / n) * Math.PI * 2 - Math.PI / 2;
    return { x: 50 + 38 * Math.cos(a), y: 50 + 38 * Math.sin(a) };
  };
  return (
    <div ref={ref}>
      <div className="relative mx-auto hidden aspect-square w-full max-w-[34rem] md:block">
        <svg viewBox="0 0 100 100" className="absolute inset-0" aria-hidden>
          {integrations.items.map((it, i) => (
            <line key={it.name} className="ib-line" pathLength={1} x1="50" y1="50" x2={at(i).x} y2={at(i).y} stroke="#c2410c" strokeOpacity="0.35" strokeWidth="0.3" />
          ))}
        </svg>
        <span className="absolute top-1/2 left-1/2 grid size-24 -translate-1/2 place-items-center rounded-[1.75rem] bg-ink-2 shadow-xl">
          <LogoMark className="size-12" tone="light" />
          <span className="sr-only">Nirman CRM</span>
        </span>
        <ul>
          {integrations.items.map((it, i) => {
            const I = icons[it.icon];
            return (
              <li key={it.name} className="ib-node absolute flex w-[10rem] -translate-1/2 flex-col items-center gap-1.5 text-center" style={{ left: `${at(i).x}%`, top: `${at(i).y}%` }}>
                <span className="grid size-12 place-items-center rounded-2xl bg-white text-brand shadow-[0_0.5rem_1rem_-0.4rem_rgba(18,20,24,0.25)] ring-1 ring-line">
                  <I className="size-5" aria-hidden />
                </span>
                <span className="text-[0.82rem] leading-tight font-semibold">{it.name}</span>
                <span className="sr-only">{it.line}</span>
              </li>
            );
          })}
        </ul>
      </div>
      <ul className="flex flex-col gap-2 md:hidden">
        {integrations.items.map((it) => {
          const I = icons[it.icon];
          return (
            <li key={it.name} className="flex gap-3 rounded-xl bg-white p-4 ring-1 ring-line">
              <I className="mt-0.5 size-5 shrink-0 text-brand" aria-hidden />
              <span>
                <b className="block font-semibold">{it.name}</b>
                <span className="text-[0.85rem] text-muted">{it.line}</span>
              </span>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
