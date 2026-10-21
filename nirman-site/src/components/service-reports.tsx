"use client";

import { useState, type ReactNode } from "react";
import { Check } from "lucide-react";

type Report = { title: string; body: string; points: string[]; visual: ReactNode };

/**
 * "What you get": the reports and documents a client receives, one tab each,
 * with the mockup large on the left. `visual` is rendered on the server.
 * Sample results and the tool logos sit underneath (`footer`).
 */
export function ServiceReports({
  reports,
  accent,
  footer,
}: {
  reports: Report[];
  accent: { text: string; soft: string; check: string; bar: string };
  footer: ReactNode;
}) {
  const [active, setActive] = useState(0);
  const r = reports[active];

  return (
    <section aria-labelledby="reports-title" className="py-20 lg:py-28">
      <div className="container-site">
        <div className="grid gap-x-12 gap-y-4 lg:grid-cols-12 lg:items-end">
          <h2 id="reports-title" className="display text-[clamp(2.4rem,5vw,4.4rem)] lg:col-span-7">
            What you get
          </h2>
          <p className="max-w-[30rem] text-[1.05rem] leading-[1.6] text-ink-2 lg:col-span-5">
            Clear reports and documents, so you always know what was done, what it achieved and what comes next.
          </p>
        </div>

        <div role="tablist" aria-label="Reports" className="-mx-4 mt-8 flex gap-2 overflow-x-auto px-4 pb-1 sm:mx-0 sm:flex-wrap sm:px-0">
          {reports.map((x, i) => {
            const on = i === active;
            return (
              <button
                key={x.title}
                type="button"
                role="tab"
                id={`rep-tab-${i}`}
                aria-selected={on}
                aria-controls="rep-panel"
                onClick={() => setActive(i)}
                className={`h-11 shrink-0 rounded-full px-5 text-[0.95rem] font-medium transition-colors ${
                  on ? "bg-ink text-paper" : "bg-surface text-ink-2 ring-1 ring-ink/12 hover:text-ink hover:ring-ink/30"
                }`}
              >
                {x.title}
              </button>
            );
          })}
        </div>

        <div id="rep-panel" role="tabpanel" aria-labelledby={`rep-tab-${active}`} className="mt-6 grid gap-6 lg:grid-cols-12 lg:gap-x-10">
          <div className={`relative overflow-hidden rounded-[2rem] p-5 sm:p-8 lg:col-span-8 lg:rounded-[2.5rem] lg:p-12 ${accent.soft}`}>
            <div key={active} className="anim-pop">
              {r.visual}
            </div>
          </div>
          <div key={active} className="anim-pop lg:col-span-4 lg:py-6">
            <span className={`block h-1 w-12 rounded-full ${accent.bar}`} aria-hidden />
            <h3 className="heading mt-5 text-[clamp(1.7rem,2.4vw,2.4rem)] leading-tight">{r.title}</h3>
            <p className="mt-4 text-[1.05rem] leading-[1.6] text-ink-2">{r.body}</p>
            <p className="mt-6 text-[0.85rem] text-ink-3">What&rsquo;s inside</p>
            <ul className="mt-3 space-y-2.5">
              {r.points.map((p) => (
                <li key={p} className="flex items-start gap-3 leading-snug">
                  <span className={`mt-0.5 grid size-5 shrink-0 place-items-center rounded-full ${accent.check}`}>
                    <Check className="size-3" strokeWidth={3} aria-hidden />
                  </span>
                  {p}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {footer}
      </div>
    </section>
  );
}
