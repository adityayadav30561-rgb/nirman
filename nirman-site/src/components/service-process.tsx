"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

type Step = { title: string; body: string; duration: string; visual: ReactNode };

/**
 * "How it works" as a scroll story. On desktop the visual column is pinned
 * while the steps scroll past; the step nearest the middle of the screen
 * becomes active and its photo and mockup slide in. Phones stack each step
 * with its own visual. `visual` is rendered on the server (photo + mockup).
 */
export function ServiceProcess({ steps, check }: { steps: Step[]; check: string }) {
  const [active, setActive] = useState(0);
  const refs = useRef<(HTMLLIElement | null)[]>([]);
  const n = steps.length;

  useEffect(() => {
    const els = refs.current.filter(Boolean) as HTMLLIElement[];
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) if (e.isIntersecting) setActive(Number((e.target as HTMLElement).dataset.i));
      },
      // a thin band across the middle of the viewport
      { rootMargin: "-45% 0px -45% 0px" },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [n]);

  return (
    <section aria-labelledby="process-title" className="bg-lilac-soft py-20 lg:py-28">
      <div className="container-site">
        <div className="grid gap-x-12 gap-y-4 lg:grid-cols-12 lg:items-end">
          <h2 id="process-title" className="display text-[clamp(2.4rem,5vw,4.4rem)] lg:col-span-7">
            How it works
          </h2>
          <p className="max-w-[30rem] text-[1.05rem] leading-[1.6] text-ink-2 lg:col-span-5">
            {n} steps. Each one ends with something you can see and approve before the next starts.
          </p>
        </div>

        <div className="mt-10 lg:mt-14 lg:grid lg:grid-cols-12 lg:gap-x-12">
          {/* Pinned visual (desktop) */}
          <div className="max-lg:hidden lg:col-span-7">
            <div className="sticky top-24 h-[calc(100svh-8rem)] max-h-[46rem]">
              <div className="relative h-full overflow-hidden rounded-[2.5rem] bg-ink">
                {steps.map((s, i) => (
                  <div
                    key={s.title}
                    aria-hidden={i !== active}
                    className={`absolute inset-0 transition-[opacity,transform] duration-700 ease-out motion-reduce:transition-none ${
                      i === active ? "translate-y-0 opacity-100" : i < active ? "-translate-y-6 opacity-0" : "translate-y-6 opacity-0"
                    }`}
                  >
                    {s.visual}
                  </div>
                ))}
                <div className="absolute left-6 top-6 flex items-center gap-3 rounded-full bg-surface/95 px-4 py-2 text-[0.85rem] font-medium shadow-panel backdrop-blur tnum">
                  Step {active + 1} of {n}
                  <span className="flex gap-1" aria-hidden>
                    {steps.map((s, i) => (
                      <span key={s.title} className={`h-1.5 rounded-full transition-[width,background-color] duration-300 ${i === active ? "w-5 bg-ink" : "w-1.5 bg-ink/20"}`} />
                    ))}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Steps */}
          <ol className="relative space-y-6 lg:col-span-5 lg:space-y-0">
            <span className="absolute bottom-[25svh] left-[1.1rem] top-[25svh] w-[2px] bg-ink/10 max-lg:hidden" aria-hidden />
            {steps.map((s, i) => {
              const on = i === active;
              return (
                <li
                  key={s.title}
                  ref={(el) => {
                    refs.current[i] = el;
                  }}
                  data-i={i}
                  className="lg:flex lg:min-h-[62svh] lg:items-center"
                >
                  <div className="overflow-hidden rounded-[2rem] bg-surface lg:overflow-visible lg:rounded-none lg:bg-transparent">
                    <div className="relative aspect-[4/3] lg:hidden">{s.visual}</div>
                    <div className={`p-6 transition-opacity duration-500 sm:p-8 lg:p-0 ${on ? "lg:opacity-100" : "lg:opacity-35"}`}>
                      <div className="flex items-center gap-4">
                        <span
                          className={`relative z-10 grid size-9 shrink-0 place-items-center rounded-full title text-[0.95rem] tnum transition-colors ${
                            on ? check : `${check} lg:bg-surface lg:text-ink-2 lg:ring-1 lg:ring-ink/15`
                          }`}
                        >
                          {i + 1}
                        </span>
                        <span className="rounded-full bg-paper px-3 py-1 text-[0.85rem] text-ink-2 lg:bg-surface">{s.duration}</span>
                      </div>
                      <h3 className="heading mt-5 text-[clamp(1.6rem,2.4vw,2.4rem)] leading-tight lg:pl-[3.25rem]">{s.title}</h3>
                      <p className="mt-3 max-w-[30rem] text-[1.05rem] leading-[1.6] text-ink-2 lg:pl-[3.25rem]">{s.body}</p>
                    </div>
                  </div>
                </li>
              );
            })}
          </ol>
        </div>
      </div>
    </section>
  );
}
