import { Building2, Globe2 } from "lucide-react";
import { WorldMap } from "@/components/home/world-map";
import { QuoteBar } from "@/components/home/quote-bar";
import { MapMotion } from "@/components/motion/map-motion";
import { mapIntro, places } from "@/content/map";

/*
 * "Where we work" (docs/sections/04-map.md, variant A chosen per the design
 * protocol): flat dotted world map with India (our office) and the markets
 * we serve, heading, sentence and a quick quote bar. On phones the pins lose
 * their name chips and a place list with time differences sits under the
 * map. Motion: GSAP in components/motion/map-motion.tsx; mp-* and m-* classes
 * are its targets.
 */
export function WhereWeWork() {
  return (
    <MapMotion aria-labelledby="map-title" className="py-20 lg:py-28">
      <div className="container-page grid items-center gap-10 lg:grid-cols-2 lg:gap-12">
        <div className="order-2 lg:order-1">
          <WorldMap className="-mx-2 lg:-ml-10" maskId="home-map-reveal" />
          <ul className="mt-6 grid gap-2 sm:hidden">
            {places.map((p) => (
              <li key={p.key} className="mp-place flex items-center gap-3 rounded-2xl bg-white px-3 py-2.5 shadow-[0_6px_18px_-12px_rgb(5_7_12/0.25)]">
                <span
                  className={`grid size-7 shrink-0 place-items-center rounded-full ${p.role === "office" ? "bg-accent/10 text-accent" : "bg-brand/10 text-brand"}`}
                >
                  {p.role === "office" ? <Building2 className="size-3.5" aria-hidden /> : <Globe2 className="size-3.5" aria-hidden />}
                </span>
                <span className="text-[0.82rem] leading-snug">
                  <span className="font-medium text-ink">{p.name}</span>
                  <span className="text-muted"> · {p.role === "office" ? "our office" : "market we serve"}</span>
                  <span className="block text-[0.72rem] text-muted">{p.diff}</span>
                </span>
              </li>
            ))}
          </ul>
        </div>
        <div className="order-1 lg:order-2">
          <h2
            id="map-title"
            className="mp-title text-[clamp(1.7rem,2.8vw,2.5rem)] leading-[1.25] font-semibold tracking-[-0.02em] text-ink"
          >
            {mapIntro.title}
          </h2>
          <p className="mp-sub mt-4 max-w-[30rem] text-[0.95rem] leading-[1.7] text-muted">{mapIntro.line}</p>
          <QuoteBar className="mt-8" />
        </div>
      </div>
    </MapMotion>
  );
}
