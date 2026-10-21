"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowRight, Check, CircleCheck, Globe, Lock, Rocket, Search } from "lucide-react";
import { Stage } from "./stage";
import { LineChart } from "./mockups/charts";
import { Photo } from "./photo";
import type { PhotoKey } from "@/content/photos";

const steps: { name: string; body: string; get: string[]; photo: PhotoKey; color: string }[] = [
  {
    name: "Discover",
    body: "We understand the business, audience, objectives, and challenges.",
    get: ["Stakeholder and customer interviews", "Competitor and search landscape review", "Audit of current site, tools and data"],
    photo: "stickyWall",
    color: "bg-cobalt text-white",
  },
  {
    name: "Strategize",
    body: "We define the solution, priorities, and project roadmap.",
    get: ["Scope with clear priorities", "Timeline and milestones", "Success measures agreed up front"],
    photo: "tableTopDown",
    color: "bg-marigold text-ink",
  },
  {
    name: "Design",
    body: "We develop the visual direction, user experience, and interfaces.",
    get: ["Wireframes for key journeys", "Visual design for desktop and mobile", "Clickable prototype for review"],
    photo: "sketching",
    color: "bg-coral text-white",
  },
  {
    name: "Build",
    body: "We develop, integrate, test, and refine the solution.",
    get: ["Weekly working builds to review", "Integrations with your tools", "Automated and manual testing"],
    photo: "coding",
    color: "bg-peacock text-white",
  },
  {
    name: "Launch",
    body: "We deploy the project and ensure everything works as intended.",
    get: ["Launch checklist and redirects", "Analytics and tracking verified", "Team training and handover"],
    photo: "celebrate",
    color: "bg-forest-2 text-mint",
  },
  {
    name: "Improve",
    body: "We measure performance, gather feedback, and make improvements.",
    get: ["Monthly performance review", "Prioritised improvement backlog", "Ongoing support and updates"],
    photo: "womanSofa",
    color: "bg-[#d9668f] text-white",
  },
];

const arts = [DiscoverArt, RoadmapArt, DesignArt, BuildArt, LaunchArt, ImproveArt];

/**
 * Pinned horizontal journey: the section is tall, its inner frame sticks to
 * the viewport, and vertical scrolling slides the stages sideways so every
 * stage passes through view. The rail jumps to a stage's scroll position.
 */
export function Process() {
  const sectionRef = useRef<HTMLElement>(null);
  const viewportRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const n = steps.length;

  useEffect(() => {
    const section = sectionRef.current;
    const viewport = viewportRef.current;
    const track = trackRef.current;
    if (!section || !viewport || !track) return;
    let frame = 0;

    const update = () => {
      frame = 0;
      const rect = section.getBoundingClientRect();
      const travel = section.offsetHeight - window.innerHeight;
      const p = travel > 0 ? Math.min(1, Math.max(0, -rect.top / travel)) : 0;
      const max = track.scrollWidth - viewport.clientWidth;
      track.style.transform = `translate3d(${-p * max}px, 0, 0)`;
      setActive(Math.min(n - 1, Math.round(p * (n - 1))));
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      cancelAnimationFrame(frame);
    };
  }, [n]);

  const jumpTo = (i: number) => {
    const section = sectionRef.current;
    if (!section) return;
    const top = section.getBoundingClientRect().top + window.scrollY;
    const travel = section.offsetHeight - window.innerHeight;
    window.scrollTo({ top: top + (travel * i) / (n - 1) + 1, behavior: "smooth" });
  };

  return (
    <section
      ref={sectionRef}
      id="process"
      aria-labelledby="process-title"
      className="relative bg-lilac-soft"
      // one viewport to settle in, then roughly 70% of a viewport per stage
      style={{ height: `calc(100svh + ${(n - 1) * 70}svh)` }}
    >
      <div className="sticky top-0 flex h-svh flex-col overflow-hidden pb-6 pt-24 sm:pb-8 lg:pt-28">
        <div className="container-site">
          <div className="flex flex-col gap-x-12 gap-y-3 lg:flex-row lg:items-end lg:justify-between">
            <h2 id="process-title" className="heading text-[clamp(1.9rem,3.6vw,3.2rem)]">
              How a project moves from first call to steady growth.
            </h2>
            <p className="max-w-[26rem] text-[0.95rem] leading-[1.55] text-ink-2 max-sm:hidden">
              Six stages, each ending in something you can see and approve before the next one starts.
            </p>
          </div>

          {/* Rail */}
          <ol className="relative mt-6 grid grid-cols-6 lg:mt-8" aria-label="Project stages">
            <span className="absolute left-[8.33%] right-[8.33%] top-[1.125rem] h-[2px] bg-ink/12" aria-hidden />
            <span
              className="absolute left-[8.33%] top-[1.125rem] h-[2px] bg-ink transition-[width] duration-300"
              style={{ width: `${(active / (n - 1)) * 83.33}%` }}
              aria-hidden
            />
            {steps.map((s, i) => {
              const isActive = i === active;
              const passed = i < active;
              return (
                <li key={s.name} className="relative flex justify-center">
                  <button
                    type="button"
                    onClick={() => jumpTo(i)}
                    aria-current={isActive ? "step" : undefined}
                    className="group flex flex-col items-center gap-2 rounded-lg px-1"
                  >
                    <span
                      className={`relative z-10 grid size-9 place-items-center rounded-full text-[0.8rem] font-semibold tnum transition-[background-color,box-shadow] duration-300 ${
                        isActive
                          ? `${s.color} shadow-[0_0_0_5px_rgb(255_255_255/0.9)]`
                          : passed
                            ? "bg-ink text-paper"
                            : "bg-surface text-ink-2 ring-1 ring-ink/15 group-hover:ring-ink/50"
                      }`}
                    >
                      {passed ? <Check className="size-3.5" strokeWidth={2.5} /> : String(i + 1).padStart(2, "0")}
                    </span>
                    <span className={`text-[0.85rem] transition-colors max-sm:sr-only ${isActive ? "font-medium text-ink" : "text-ink-2 group-hover:text-ink"}`}>
                      {s.name}
                    </span>
                  </button>
                </li>
              );
            })}
          </ol>
        </div>

        {/* Track */}
        <div ref={viewportRef} className="container-site mt-6 min-h-0 flex-1 lg:mt-8">
          <div ref={trackRef} className="flex h-full gap-4 will-change-transform sm:gap-5">
            {steps.map((s, i) => {
              const Art = arts[i];
              return (
                <article
                  key={s.name}
                  aria-label={`Stage ${i + 1}: ${s.name}`}
                  className="flex h-full w-[88%] shrink-0 flex-col gap-4 rounded-[2rem] bg-surface p-4 shadow-panel sm:p-5 lg:w-[86%] lg:flex-row lg:gap-8 lg:rounded-[2.5rem] lg:p-6"
                >
                  <div className="shrink-0 px-1 lg:flex lg:w-[30%] lg:flex-col lg:justify-center lg:py-4 lg:pl-4">
                    <p className="text-[0.9rem] text-ink-3 tnum">
                      Stage {String(i + 1).padStart(2, "0")} of 06
                    </p>
                    <h3 className="display mt-1 text-[clamp(2rem,4vw,3.6rem)] lg:mt-3">{s.name}</h3>
                    <p className="mt-2 max-w-[26rem] text-[1rem] leading-[1.55] text-ink-2 lg:mt-4 lg:text-[1.05rem]">{s.body}</p>
                    <p className="mt-6 text-[0.85rem] text-ink-3 max-lg:hidden">What you receive</p>
                    <ul className="mt-3 space-y-2.5 max-lg:hidden">
                      {s.get.map((g) => (
                        <li key={g} className="flex gap-2.5 text-[0.95rem]">
                          <span className={`mt-0.5 grid size-5 shrink-0 place-items-center rounded-full ${s.color}`}>
                            <Check className="size-3" strokeWidth={3} />
                          </span>
                          {g}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="relative min-h-0 flex-1 overflow-hidden rounded-[1.5rem] lg:rounded-[2rem]">
                    <Photo name={s.photo} sizes="(min-width: 1024px) 55vw, 90vw" />
                    <div className="absolute bottom-4 right-4 w-[min(62%,34rem)] max-md:hidden">
                      <Stage w={640} h={420} label={`Example artefact from the ${s.name} stage`}>
                        <Art />
                      </Stage>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------------------------- artefacts ---------------------------- */

function Board({ children }: { children: React.ReactNode }) {
  return <div className="plan-grid absolute inset-0 overflow-hidden rounded-xl bg-paper-2 ring-1 ring-ink/8">{children}</div>;
}

function DiscoverArt() {
  const notes = [
    { t: "Most enquiries arrive on WhatsApp, not the form", c: "bg-brass-soft", x: "left-24 top-30 -rotate-2" },
    { t: "Customers ask about price before anything else", c: "bg-[#e1e8da]", x: "left-200 top-50 rotate-2" },
    { t: "Competitors rank for “villa architect pune”", c: "bg-surface", x: "left-110 top-170 rotate-1" },
    { t: "Sales team tracks leads in 3 spreadsheets", c: "bg-brass-soft", x: "left-24 top-280 -rotate-1 max-lg:hidden" },
  ];
  return (
    <Board>
      {notes.map((n) => (
        <div key={n.t} className={`absolute w-160 p-12 shadow-panel ${n.c} ${n.x}`}>
          <span className="absolute -top-5 left-1/2 size-9 -translate-x-1/2 rounded-full bg-signal-red/80 ring-2 ring-white/60" />
          <p className="fs-12 leading-snug">{n.t}</p>
        </div>
      ))}
      <div className="absolute right-20 top-24 w-210 rounded-md bg-surface p-14 shadow-scene ring-1 ring-ink/8 max-lg:left-290 max-lg:w-170">
        <p className="fs-10 text-ink-3">Customer profile</p>
        <div className="mt-8 flex items-center gap-8">
          <span className="grid size-30 place-items-center rounded-full bg-sage fs-11 font-semibold text-forest">FO</span>
          <span className="leading-tight">
            <span className="block fs-12 font-semibold">First-time owner</span>
            <span className="block fs-10 text-ink-3">Age 32–45, Pune</span>
          </span>
        </div>
        <ul className="mt-10 space-y-5 fs-10 text-ink-2">
          <li>Wants a clear budget early</li>
          <li>Researches for 2–3 months</li>
          <li>Trusts photos of finished homes</li>
        </ul>
      </div>
      <div className="absolute bottom-20 right-20 w-260 rounded-md bg-surface p-12 shadow-panel ring-1 ring-ink/8 max-lg:hidden">
        <p className="fs-10 text-ink-3">Interviews</p>
        {["Owner, 45 min", "Sales lead, 30 min", "3 recent customers"].map((r) => (
          <p key={r} className="mt-5 flex items-center gap-6 fs-11">
            <CircleCheck className="size-11 text-forest" />
            {r}
          </p>
        ))}
      </div>
    </Board>
  );
}

function RoadmapArt() {
  const rows = [
    { t: "Discovery", s: 0, e: 2, c: "bg-sage-3" },
    { t: "UX and design", s: 1.5, e: 4.5, c: "bg-moss" },
    { t: "Build", s: 4, e: 8.5, c: "bg-forest" },
    { t: "Content and SEO", s: 3, e: 9, c: "bg-brass-2" },
    { t: "Testing", s: 7.5, e: 9.5, c: "bg-signal-blue/70" },
    { t: "Launch", s: 9.5, e: 10, c: "bg-forest-ink" },
  ];
  return (
    <div className="absolute inset-0 overflow-hidden rounded-xl bg-surface p-18 shadow-panel ring-1 ring-ink/8">
      <div className="flex items-center justify-between">
        <p className="fs-14 font-semibold">Project roadmap</p>
        <p className="fs-10 text-ink-3">10 weeks</p>
      </div>
      <div className="mt-14 grid grid-cols-[calc(var(--spacing)*110)_1fr] fs-10">
        <span />
        <div className="grid grid-cols-10 text-center text-ink-3 tnum">
          {Array.from({ length: 10 }, (_, i) => (
            <span key={i}>W{i + 1}</span>
          ))}
        </div>
        {rows.map((r) => (
          <div key={r.t} className="contents">
            <span className="flex h-40 items-center text-ink-2">{r.t}</span>
            <div className="relative h-40 border-t border-ink/6">
              <div className="absolute inset-0 grid grid-cols-10">
                {Array.from({ length: 10 }, (_, i) => (
                  <span key={i} className="border-l border-ink/5" />
                ))}
              </div>
              <span
                className={`absolute top-10 h-20 rounded-[calc(var(--spacing)*5)] ${r.c}`}
                style={{ left: `${r.s * 10}%`, width: `${Math.max((r.e - r.s) * 10, 3)}%` }}
              />
            </div>
          </div>
        ))}
      </div>
      <div className="mt-12 flex gap-16 fs-10 text-ink-2">
        {["Design approved, W4", "First working build, W6", "Go-live, W10"].map((m) => (
          <span key={m} className="flex items-center gap-6">
            <span className="size-8 rotate-45 bg-brass" />
            {m}
          </span>
        ))}
      </div>
    </div>
  );
}

function DesignArt() {
  return (
    <Board>
      {/* wireframe */}
      <div className="absolute left-24 top-30 h-340 w-250 rounded-md bg-surface p-14 shadow-panel ring-1 ring-ink/8 max-lg:left-14 max-lg:h-320 max-lg:w-210">
        <p className="fs-9 text-ink-3">Wireframe</p>
        <div className="mt-8 flex justify-between">
          <span className="h-8 w-50 rounded-full bg-ink/15" />
          <span className="h-8 w-80 rounded-full bg-ink/10" />
        </div>
        <div className="mt-14 h-100 rounded-xs border border-dashed border-ink/25 bg-[repeating-linear-gradient(45deg,transparent,transparent_6px,rgb(29_35_33/0.04)_6px,rgb(29_35_33/0.04)_7px)]" />
        <span className="mt-12 block h-12 w-[80%] rounded-full bg-ink/20" />
        <span className="mt-6 block h-8 w-[60%] rounded-full bg-ink/10" />
        <span className="mt-12 block h-20 w-80 rounded-xs bg-ink/25" />
        <div className="mt-14 grid grid-cols-3 gap-6">
          {[0, 1, 2].map((i) => (
            <span key={i} className="h-40 rounded-xs border border-dashed border-ink/20" />
          ))}
        </div>
      </div>
      {/* arrow */}
      <div className="absolute left-290 top-190 flex items-center text-forest max-lg:left-232">
        <span className="h-px w-40 bg-current" />
        <ArrowRight className="-ml-4 size-14" />
      </div>
      {/* hi-fi */}
      <div className="absolute left-350 top-30 h-340 w-260 overflow-hidden rounded-md bg-[#f7f4ec] shadow-scene ring-1 ring-ink/8 max-lg:left-262 max-lg:h-320 max-lg:w-210">
        <div className="flex items-center justify-between px-14 py-10">
          <span className="mock-display fs-12">Terra Studio</span>
          <span className="rounded-full bg-[#22261f] px-8 py-3 fs-8 text-[#f7f4ec]">Start a project</span>
        </div>
        <div className="relative mx-14 h-110 overflow-hidden rounded-md">
          <Photo name="terracotta" sizes="300px" decorative />
        </div>
        <div className="px-14 pt-10">
          <p className="mock-display fs-18">Homes shaped by light and land.</p>
          <p className="mt-6 fs-9 leading-[1.5] text-ink-2">Quiet, climate-aware homes designed around how families live.</p>
          <span className="mt-10 inline-block rounded-full bg-[#2f4a3a] px-12 py-5 fs-9 text-white">View projects</span>
        </div>
      </div>
      <span className="absolute bottom-14 right-20 rounded-full bg-brass px-10 py-4 fs-10 text-white shadow-panel max-lg:hidden">2 comments</span>
    </Board>
  );
}

const K = ({ children }: { children: React.ReactNode }) => <span className="text-[#d6a96a]">{children}</span>;
const F = ({ children }: { children: React.ReactNode }) => <span className="text-[#9cc9a7]">{children}</span>;
const S = ({ children }: { children: React.ReactNode }) => <span className="text-[#e3c79b]">{children}</span>;

function BuildArt() {
  const lines = [
    <><K>export async function</K> <F>createLead</F>(form: EnquiryForm) {"{"}</>,
    <>{"  "}<K>const</K> lead = <K>await</K> crm.leads.<F>create</F>({"{"}</>,
    <>{"    "}name: form.name,</>,
    <>{"    "}phone: form.phone,</>,
    <>{"    "}source: <S>&quot;website&quot;</S>,</>,
    <>{"    "}owner: <K>await</K> <F>nextAvailableRep</F>(),</>,
    <>{"  "}{"}"});</>,
    <>{"  "}<K>await</K> whatsapp.<F>send</F>(lead.phone, templates.welcome);</>,
    <>{"  "}<K>return</K> lead;</>,
    <>{"}"}</>,
  ];
  return (
    <>
      <div className="absolute inset-y-0 left-0 w-[78%] overflow-hidden rounded-xl bg-[#18201d] shadow-scene ring-1 ring-black/30 max-lg:w-full">
        <div className="flex items-center gap-8 border-b border-white/8 px-14 py-9 fs-10 text-white/55">
          <span className="rounded-xs bg-white/8 px-8 py-3 text-white/85">leads.ts</span>
          <span>whatsapp.ts</span>
          <span>schema.prisma</span>
        </div>
        <pre className="px-14 py-14 fs-11 leading-[1.75] text-[#e8ece8]">
          {lines.map((l, i) => (
            <div key={i} className="flex">
              <span className="mr-14 w-14 select-none text-right text-white/25 tnum">{i + 12}</span>
              <code>{l}</code>
            </div>
          ))}
        </pre>
      </div>
      <div className="absolute bottom-24 right-0 w-230 rounded-md bg-surface p-14 shadow-scene ring-1 ring-ink/8 max-lg:bottom-14 max-lg:right-14">
        <p className="fs-11 font-semibold">Test run</p>
        <p className="fs-9 text-ink-3">On every change</p>
        <ul className="mt-10 space-y-6 fs-10">
          {["Lead is created from form", "Rep is assigned by rota", "WhatsApp welcome is queued", "Invalid phone is rejected"].map((t) => (
            <li key={t} className="flex items-center gap-6">
              <CircleCheck className="size-11 shrink-0 text-forest" />
              {t}
            </li>
          ))}
        </ul>
        <p className="mt-10 rounded-xs bg-sage px-8 py-5 fs-10 font-medium text-forest">24 passed, 0 failed</p>
      </div>
    </>
  );
}

function LaunchArt() {
  const items = ["Domain, DNS and SSL configured", "Old URLs redirected", "Analytics and Search Console connected", "Forms and payments tested", "Team trained on the CMS"];
  return (
    <Board>
      <div className="absolute left-24 top-24 w-300 rounded-md bg-surface p-16 shadow-panel ring-1 ring-ink/8 max-lg:left-14 max-lg:w-260">
        <p className="fs-13 font-semibold">Launch checklist</p>
        <ul className="mt-10 space-y-8">
          {items.map((t) => (
            <li key={t} className="flex items-center gap-8 fs-11">
              <span className="grid size-16 place-items-center rounded-[calc(var(--spacing)*4)] bg-forest text-paper">
                <Check className="size-10" strokeWidth={3} />
              </span>
              {t}
            </li>
          ))}
        </ul>
      </div>
      <div className="absolute bottom-24 right-24 w-280 rounded-md bg-forest-ink p-16 text-paper shadow-scene max-lg:right-14 max-lg:w-220">
        <div className="flex items-center justify-between">
          <span className="flex items-center gap-6 fs-11">
            <Rocket className="size-13 text-brass-2" />
            Production
          </span>
          <span className="flex items-center gap-5 rounded-full bg-white/10 px-8 py-2 fs-9">
            <span className="size-6 rounded-full bg-[#8fd19e]" />
            Live
          </span>
        </div>
        <p className="mt-12 flex items-center gap-6 fs-12">
          <Lock className="size-11 text-paper/60" />
          terrastudio.in
        </p>
        <div className="mt-12 grid grid-cols-3 gap-6 border-t border-white/10 pt-10 fs-9 text-paper/60">
          {[
            ["LCP", "Good"],
            ["INP", "Good"],
            ["CLS", "Good"],
          ].map(([k, v]) => (
            <span key={k}>
              {k}
              <span className="block fs-11 font-medium text-[#8fd19e]">{v}</span>
            </span>
          ))}
        </div>
      </div>
      <div className="absolute right-24 top-24 flex items-center gap-6 rounded-full bg-surface px-12 py-6 fs-10 shadow-panel ring-1 ring-ink/8 max-lg:hidden">
        <Globe className="size-11 text-forest" />
        Deployed 21 Oct, 10:42
      </div>
    </Board>
  );
}

function ImproveArt() {
  return (
    <div className="absolute inset-0 overflow-hidden rounded-xl bg-surface p-18 shadow-panel ring-1 ring-ink/8">
      <div className="flex items-center justify-between">
        <p className="fs-14 font-semibold">Enquiries per week</p>
        <p className="flex items-center gap-6 fs-10 text-ink-3">
          <Search className="size-11" />
          All sources
        </p>
      </div>
      <div className="relative mt-14 h-190 text-ink max-lg:h-160">
        <LineChart w={600} h={190} series={[{ values: [18, 21, 19, 24, 26, 25, 31, 34, 33, 38, 41, 44], color: "#1f4d3a", fill: true }]} />
        {[
          { at: 33, l: "New landing page" },
          { at: 66, l: "Shorter form" },
        ].map((a) => (
          <div key={a.l} className="absolute inset-y-0" style={{ left: `${a.at}%` }}>
            <div className="h-full border-l border-dashed border-ink/30" />
            <span className="absolute left-4 top-0 whitespace-nowrap rounded-[calc(var(--spacing)*3)] bg-ink px-6 py-2 fs-9 text-paper">{a.l}</span>
          </div>
        ))}
      </div>
      <div className="mt-14 grid grid-cols-2 gap-10">
        <div className="rounded-sm bg-paper-2/70 p-12">
          <p className="fs-10 text-ink-3">Running test</p>
          <p className="fs-12 font-medium">Call button above the fold</p>
          <div className="mt-8 h-5 rounded-full bg-surface">
            <div className="h-full w-[64%] rounded-full bg-brass" />
          </div>
          <p className="mt-4 fs-9 text-ink-3">Day 9 of 14</p>
        </div>
        <div className="rounded-sm bg-paper-2/70 p-12">
          <p className="fs-10 text-ink-3">Next in backlog</p>
          <ul className="mt-4 space-y-3 fs-11">
            <li>Add project cost guide</li>
            <li>WhatsApp chat on mobile</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
