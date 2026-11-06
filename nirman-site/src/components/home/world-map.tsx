import { Building2, Globe2 } from "lucide-react";
import { geoNaturalEarth1 } from "d3-geo";
import world from "@/content/world-dots.json";
import { places, type Place } from "@/content/map";

/*
 * Flat dotted world map: land dots from Natural Earth on an even hex grid in
 * the Natural Earth projection (scripts/make-world-dots.mjs), north pole down
 * to 56S. Pins and arcs use the same projection (rebuilt here from the
 * scale and translate saved in the JSON). Server component: d3-geo never
 * reaches the browser.
 * Pins are HTML laid over it at percent positions, so they stay crisp and
 * readable at any size. Targets for GSAP (components/motion/map-motion.tsx):
 * .m-reveal (mask circle centred on India), .m-arc (pathLength 1), .m-pin.
 * On phones the name chips hide; the section shows a place list instead.
 */

const W = world.width;
const H = world.height;
const projection = geoNaturalEarth1()
  .scale(world.scale)
  .translate(world.translate as [number, number]);
const xy = (p: Place) => projection([p.lon, p.lat]) ?? [0, 0];
const pct = (p: Place) => {
  const [x, y] = xy(p);
  return { left: `${(x / W) * 100}%`, top: `${(y / H) * 100}%` };
};
const DOT_R = world.step * 0.32;

/** Arc from India to a market, bowed upwards. */
function arcPath(a: Place, b: Place) {
  const [x1, y1] = xy(a);
  const [x2, y2] = xy(b);
  const mx = (x1 + x2) / 2, my = (y1 + y2) / 2 - Math.abs(x2 - x1) * 0.28;
  return `M${x1} ${y1} Q${mx} ${my} ${x2} ${y2}`;
}

export function MapPin({ place, size = "md" }: { place: Place; size?: "md" | "lg" }) {
  const office = place.role === "office";
  return (
    <div className="m-pin absolute -translate-x-1/2 -translate-y-full" style={pct(place)}>
      <div className="relative flex flex-col items-center">
        <span
          className={`grid place-items-center rounded-full bg-white shadow-[0_10px_24px_-10px_rgb(2_93_222/0.55),0_0_0_4px_rgb(255_255_255/0.9)] ${
            office ? (size === "lg" ? "size-14" : "size-11") : "size-9"
          }`}
        >
          {office ? (
            <Building2 className={`text-accent ${size === "lg" ? "size-6" : "size-5"}`} aria-hidden />
          ) : (
            <Globe2 className="size-4 text-brand" aria-hidden />
          )}
        </span>
        <span aria-hidden className={`-mt-1 h-3 w-0.5 ${office ? "bg-accent" : "bg-brand"}`} />
        <span aria-hidden className={`size-2 rounded-full ${office ? "bg-accent shadow-[0_0_0_5px_rgb(242_107_43/0.18)]" : "bg-brand shadow-[0_0_0_5px_rgb(2_93_222/0.15)]"}`} />
        <span
          className={`rounded-full bg-white/95 px-2.5 py-1 text-[0.66rem] leading-none font-medium whitespace-nowrap text-ink shadow-[0_4px_12px_-6px_rgb(5_7_12/0.25)] ${
            place.label === "below"
              ? "mt-1.5"
              : `absolute top-1/2 -translate-y-1/2 ${place.label === "left" ? "right-full mr-2" : "left-full ml-2"}`
          } max-sm:hidden`}
        >
          {place.name}
          <span className="ml-1 font-normal text-muted">{office ? "· our office" : "· market we serve"}</span>
        </span>
      </div>
    </div>
  );
}

export function WorldMap({
  className = "",
  arcs = true,
  pins = true,
  dotClass = "fill-[#dcd6d0]",
  maskId = "world-reveal",
}: {
  className?: string;
  arcs?: boolean;
  pins?: boolean;
  dotClass?: string;
  /** Page-unique id for the reveal mask (SVG ids are global). */
  maskId?: string;
}) {
  const office = places[0];
  return (
    <div className={`relative ${className}`} style={{ aspectRatio: `${W} / ${H}` }}>
      <svg viewBox={`0 0 ${W} ${H}`} className="absolute inset-0 size-full" aria-hidden>
        <defs>
          <mask id={maskId}>
            <circle className="m-reveal" cx={xy(office)[0]} cy={xy(office)[1]} r={400} fill="white" />
          </mask>
        </defs>
        <g className={`m-dots ${dotClass}`} mask={`url(#${maskId})`}>
          {world.dots.map(([x, y], i) => (
            <circle key={i} cx={x} cy={y} r={DOT_R} />
          ))}
        </g>
        {arcs &&
          places.slice(1).map((p) => (
            <path
              key={p.key}
              className="m-arc"
              d={arcPath(office, p)}
              pathLength={1}
              fill="none"
              stroke="#c2410c"
              strokeOpacity="0.6"
              strokeWidth="0.5"
              strokeDasharray="1 2"
              strokeLinecap="round"
            />
          ))}
      </svg>
      {pins && places.map((p) => <MapPin key={p.key} place={p} size={p.role === "office" ? "lg" : "md"} />)}
    </div>
  );
}
