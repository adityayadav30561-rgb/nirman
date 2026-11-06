import { Building2, Globe2 } from "lucide-react";
import world from "@/content/world-dots.json";
import { places, type Place } from "@/content/map";

/*
 * Flat dotted world map (hex grid of land dots from Natural Earth, see
 * scripts/make-world-dots.mjs), equirectangular, cropped to latitudes
 * 78N..56S. SVG units are degrees: x = lon + 180, y = 78 - lat.
 * Pins are HTML laid over it at percent positions, so they stay crisp and
 * readable at any size. Targets for GSAP (components/motion/map-motion.tsx):
 * .m-reveal (mask circle centred on India), .m-arc (pathLength 1), .m-pin.
 * On phones the name chips hide; the section shows a place list instead.
 */

const W = 360;
const H = world.latTop - world.latBottom; // 134

export const toX = (lon: number) => lon + 180;
export const toY = (lat: number) => world.latTop - lat;
const pct = (p: Place) => ({ left: `${(toX(p.lon) / W) * 100}%`, top: `${(toY(p.lat) / H) * 100}%` });

/** Arc from India to a market, bowed upwards. */
function arcPath(a: Place, b: Place) {
  const x1 = toX(a.lon), y1 = toY(a.lat), x2 = toX(b.lon), y2 = toY(b.lat);
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
  dotClass = "fill-[#c9dcf6]",
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
    <div className={`relative aspect-[360/134] ${className}`}>
      <svg viewBox={`0 0 ${W} ${H}`} className="absolute inset-0 size-full" aria-hidden>
        <defs>
          <mask id={maskId}>
            <circle className="m-reveal" cx={toX(office.lon)} cy={toY(office.lat)} r={400} fill="white" />
          </mask>
        </defs>
        <g className={`m-dots ${dotClass}`} mask={`url(#${maskId})`}>
          {world.dots.map(([lon, lat], i) => (
            <circle key={i} cx={toX(lon)} cy={toY(lat)} r={0.95} />
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
              stroke="#025dde"
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
