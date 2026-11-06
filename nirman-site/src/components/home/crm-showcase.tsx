"use client";

import { useRef, useState, type KeyboardEvent } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { CalendarClock, Columns3, Inbox, LayoutDashboard } from "lucide-react";
import { AppFrame } from "@/components/crm/app-frame";
import { DashboardScreen, FollowupsScreen, InboxScreen, PhoneInbox, PipelineScreen } from "@/components/crm/screens";
import { crmViews, type CrmViewKey } from "@/content/crm";

/*
 * Nirman CRM showcase (docs/sections/05-crm.md, redo variant C + A's tabs):
 * WAI-ARIA tabs (arrows, Home, End) switch the desktop window between
 * Inbox, Pipeline, Follow-ups and Dashboard (Framer Motion cross-fade); the
 * phone shows the same conversation in the mobile app. The windows are
 * pictures of the product (aria-hidden); each tab panel carries a text
 * description. On phones the window is shown as a crop at a readable size,
 * without its sidebar, and the phone is left out (it would cover the crop). Parallax targets: .c-window, .c-phone (crm-motion).
 */
const screens = { inbox: InboxScreen, pipeline: PipelineScreen, followups: FollowupsScreen, reports: DashboardScreen };
const icons = { inbox: Inbox, pipeline: Columns3, followups: CalendarClock, reports: LayoutDashboard };

export function CrmShowcase() {
  const [i, setI] = useState(0);
  const reduce = useReducedMotion();
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);
  const v = crmViews[i];
  const key = v.key as CrmViewKey;
  const Screen = screens[key];

  const onKey = (e: KeyboardEvent<HTMLButtonElement>) => {
    const last = crmViews.length - 1;
    const to = { ArrowRight: i === last ? 0 : i + 1, ArrowLeft: i === 0 ? last : i - 1, Home: 0, End: last }[e.key];
    if (to === undefined) return;
    e.preventDefault();
    setI(to);
    tabs.current[to]?.focus();
  };

  const fade = { initial: reduce ? false : { opacity: 0, y: 8 }, animate: { opacity: 1, y: 0 }, exit: { opacity: 0 }, transition: { duration: reduce ? 0 : 0.25 } } as const;

  return (
    <div className="c-in relative min-w-0">
      <div role="tablist" aria-label="Nirman CRM screens" className="-mx-1 flex gap-1 overflow-x-auto px-1 pb-1">
        {crmViews.map((t, k) => {
          const Icon = icons[t.key as CrmViewKey];
          return (
            <button
              key={t.key}
              ref={(el) => {
                tabs.current[k] = el;
              }}
              id={`crm-tab-${t.key}`}
              role="tab"
              type="button"
              aria-selected={k === i}
              aria-controls="crm-panel"
              tabIndex={k === i ? 0 : -1}
              onClick={() => setI(k)}
              onKeyDown={onKey}
              className={`flex min-h-11 shrink-0 items-center gap-2 rounded-full px-4 text-[0.85rem] font-medium whitespace-nowrap transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white ${
                k === i ? "bg-white text-brand" : "text-white/90 hover:bg-white/10"
              }`}
            >
              <Icon className="size-4" aria-hidden />
              {t.label}
            </button>
          );
        })}
      </div>

      <div id="crm-panel" role="tabpanel" aria-labelledby={`crm-tab-${key}`} className="relative mt-5">
        <p className="sr-only">
          Nirman CRM {v.label} screen: {v.point}
        </p>
        {/* tablet and up: the whole window */}
        <div className="c-window hidden md:block">
          <AppFrame active={key}>
            <AnimatePresence mode="wait" initial={false}>
              <motion.div key={key} className="h-full" {...fade}>
                <Screen />
              </motion.div>
            </AnimatePresence>
          </AppFrame>
        </div>
        {/* phones: a readable crop, sidebar left out */}
        <div className="overflow-hidden rounded-[1rem] shadow-[0_1.5rem_3rem_-1rem_rgba(0,0,0,0.45)] md:hidden" style={{ height: 300 }}>
          <div style={{ width: 760, marginLeft: -112 }}>
            <AppFrame active={key}>
              <AnimatePresence mode="wait" initial={false}>
                <motion.div key={key} className="h-full" {...fade}>
                  <Screen />
                </motion.div>
              </AnimatePresence>
            </AppFrame>
          </div>
        </div>
        <PhoneInbox className="c-phone absolute -right-3 -bottom-20 z-10 hidden w-[10rem] md:block lg:-right-6 lg:-bottom-28 lg:w-[11rem] xl:-right-10 xl:w-[12rem]" />
      </div>
    </div>
  );
}
