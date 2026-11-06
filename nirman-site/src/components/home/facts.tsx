import { facts } from "@/content/facts";
import { FactsMotion } from "@/components/motion/facts-motion";

/*
 * Facts band (docs/sections/02-facts.md, variant B chosen per the design
 * protocol): the reference's full-bleed blue band with a lead-in heading,
 * light figures stacked over their labels. Motion: GSAP in
 * components/motion/facts-motion.tsx (band wipes open, figures rise out of a
 * mask, labels fade); f-* classes are its targets.
 */

/** Left dividers: items 2 and 4 on phones (2 x 2 grid), items 2 to 4 from 768px (one row). */
const dividers = (i: number) =>
  `${i % 2 === 1 ? "border-l pl-4" : ""} ${i > 0 ? "md:border-l md:pl-[clamp(1rem,2.5vw,2.5rem)]" : ""}`;

export function Facts() {
  return (
    <FactsMotion aria-labelledby="facts-title" className="gs-clip-x bg-band text-white">
      {/* heading above the figures until 1024px, beside them from there */}
      <div className="container-page grid gap-6 py-10 lg:min-h-[10.5rem] lg:grid-cols-[15rem_1fr] lg:items-center lg:gap-10 lg:py-0">
        <div className="f-head">
          <h2 id="facts-title" className="text-[1.15rem] leading-snug font-semibold">
            What you can count on
          </h2>
          <p className="mt-1 text-[0.8rem] text-white/80">Promises we keep on every project.</p>
        </div>
        <ul className="grid grid-cols-2 gap-y-6 md:grid-cols-4">
          {facts.map((f, i) => (
            <li key={f.label} className={`border-white/25 ${dividers(i)}`}>
              <span className="block overflow-hidden pb-[0.06em]">
                <span className="f-num block text-[clamp(2.2rem,3.2vw,3.1rem)] leading-none font-light tracking-[-0.03em] whitespace-nowrap">
                  {f.value}
                  <span className="ml-0.5 text-[0.5em] font-normal tracking-normal">{f.unit}</span>
                </span>
              </span>
              <span className="f-label mt-2 block max-w-[10rem] text-[0.8rem] leading-snug text-white/85">{f.label}</span>
            </li>
          ))}
        </ul>
      </div>
    </FactsMotion>
  );
}
