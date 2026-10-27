import type { ReactNode } from "react";
import { ArrowRight, MessageCircle, Search, UserPlus } from "lucide-react";
import { heroCopy } from "@/content/home1";
import { videos } from "@/content/videos";
import { Stage } from "../stage";
import { Donut, LineChart } from "../mockups/charts";
import { ButtonLink } from "../ui/button-link";
import { AmbientVideo } from "./ambient-video";

/**
 * v3 hero (docs/REDESIGN.md §6, section 1): the headline and an answer-first
 * definition on the left; on the right a looping video of analytics work with
 * three animated HTML cards on top. The cards live in a Stage, so they scale
 * with the panel and keep their proportions on every screen.
 */
export function Hero1() {
  const v = videos.heroAnalytics;
  return (
    <section id="top" aria-labelledby="home-title" className="relative pb-16 pt-28 lg:pb-24 lg:pt-36">
      <div className="container-site grid items-center gap-x-12 gap-y-10 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <h1 id="home-title" className="display text-[clamp(3rem,10vw,4.2rem)] lg:text-[clamp(3.4rem,4.7vw,5.4rem)]">
            {heroCopy.headline.map((line) => (
              <span key={line} className="block">
                {line}
              </span>
            ))}
          </h1>
          <p className="mt-6 max-w-[34rem] text-[1.1rem] leading-[1.6] text-ink-2 lg:text-[1.15rem]">{heroCopy.definition}</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <ButtonLink href="/get-a-quote/" variant="primary" size="lg">
              Get a quote
              <ArrowRight className="size-4.5" aria-hidden />
            </ButtonLink>
            <ButtonLink href="/tools/seo-audit/" variant="secondary" size="lg">
              <Search className="size-4.5" aria-hidden />
              Free SEO audit
            </ButtonLink>
          </div>
          <p className="mt-4 text-[0.95rem] text-ink-3">{heroCopy.note}</p>
        </div>

        <div className="lg:col-span-7">
          <div className="relative overflow-hidden rounded-[2rem] bg-forest-deep shadow-lift lg:rounded-[2.5rem]">
            <AmbientVideo src={v.src} poster={v.poster} priority sizes="(min-width: 1024px) 55vw, 100vw" />
            <div
              className="absolute inset-0 bg-[linear-gradient(135deg,rgb(11_38_32/0.62),rgb(11_38_32/0.18)_55%,rgb(11_38_32/0.4))]"
              aria-hidden
            />
            <Stage
              w={720}
              h={540}
              label="Sample cards: a new website lead assigned and answered within two minutes, organic clicks up 41 percent over six months, and a mobile speed score of 98"
            >
              <Pop className="left-36 top-40 w-310" delay={0.25}>
                <LeadCard />
              </Pop>
              <Pop className="right-30 top-118 w-336" delay={0.55}>
                <ClicksCard />
              </Pop>
              <Pop className="bottom-52 left-70 w-262" delay={0.85}>
                <SpeedCard />
              </Pop>
              <Pop className="bottom-86 right-56" delay={1.15}>
                <span className="flex items-center gap-8 rounded-full bg-cobalt px-14 py-8 fs-11 font-medium text-white shadow-scene">
                  <Search className="size-12" aria-hidden />
                  Position 1 · courtyard house design pune
                </span>
              </Pop>
              <p className="absolute bottom-16 right-22 fs-10 text-white/75">Sample data</p>
            </Stage>
          </div>
        </div>
      </div>
    </section>
  );
}

/** One card: enters once, then drifts. Two wrappers so the two animations do not collide. */
function Pop({ className, delay, children }: { className: string; delay: number; children: ReactNode }) {
  return (
    <div className={`absolute ${className}`}>
      <div className="anim-card" style={{ animationDelay: `${delay}s` }}>
        <div className="anim-float" style={{ animationDelay: `${delay + 1}s` }}>
          {children}
        </div>
      </div>
    </div>
  );
}

const card = "rounded-xl bg-surface p-14 text-ink shadow-scene ring-1 ring-ink/8";

function LeadCard() {
  return (
    <div className={card}>
      <div className="flex items-center justify-between fs-10 text-ink-3">
        <span className="flex items-center gap-6">
          <span className="grid size-18 place-items-center rounded-full bg-forest text-mint">
            <UserPlus className="size-10" aria-hidden />
          </span>
          New lead
        </span>
        <span>just now</span>
      </div>
      <p className="mt-10 fs-16 font-semibold tracking-[-0.01em]">Kavya Rao</p>
      <p className="fs-11 text-ink-2">3BHK enquiry, from the website form</p>
      <div className="mt-10 flex flex-wrap gap-6">
        <span className="rounded-full bg-mint-soft px-8 py-3 fs-9 font-medium text-forest">Assigned to Priya</span>
        <span className="flex items-center gap-4 rounded-full bg-paper px-8 py-3 fs-9 text-ink-2">
          <MessageCircle className="size-9" aria-hidden />
          Replied in 2 min
        </span>
      </div>
    </div>
  );
}

function ClicksCard() {
  return (
    <div className={card}>
      <p className="fs-10 text-ink-3">Organic clicks, last 6 months</p>
      <div className="mt-4 flex items-end justify-between">
        <p className="mock-display fs-28 tnum">28,460</p>
        <span className="rounded-full bg-mint-soft px-8 py-3 fs-9 font-medium text-forest">+41%</span>
      </div>
      <div className="mt-8 h-64 text-cobalt">
        <LineChart
          w={300}
          h={64}
          gridLines={0}
          series={[{ values: [12, 14, 13, 17, 19, 18, 23, 25, 24, 29, 33, 38], color: "#3346d3", fill: true }]}
        />
      </div>
    </div>
  );
}

function SpeedCard() {
  return (
    <div className={`${card} flex items-center gap-14`}>
      <div className="relative size-64 shrink-0">
        <Donut parts={[{ value: 98, color: "#4f9a74" }, { value: 2, color: "#e0f1e6" }]} size={64} thickness={8} />
        <span className="absolute inset-0 grid place-items-center fs-16 font-semibold text-forest tnum">98</span>
      </div>
      <div className="leading-tight">
        <p className="fs-12 font-semibold">Mobile speed</p>
        <p className="mt-3 fs-9 text-ink-3">LCP 1.6 s · INP 90 ms</p>
      </div>
    </div>
  );
}
