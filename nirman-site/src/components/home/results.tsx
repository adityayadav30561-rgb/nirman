import { ResultsSpotlight } from "@/components/home/results-spotlight";
import { ResultsMotion } from "@/components/motion/results-motion";
import { resultsIntro, sampleQuotes } from "@/content/results";

/*
 * Results (docs/sections/06-results.md, variant B chosen per the design
 * protocol): sample testimonials as a spotlight with business-type tabs.
 * Every card carries a SAMPLE chip until real quotes exist (client rule).
 * Motion: GSAP entrance in components/motion/results-motion.tsx; quote
 * switching is Framer Motion inside ResultsSpotlight.
 */
export function Results() {
  return (
    <ResultsMotion aria-labelledby="results-title" className="py-20 lg:py-28">
      <div className="container-page">
        <div className="max-w-[34rem]">
          <svg viewBox="0 0 24 24" aria-hidden className="r-spark draw mb-2 size-6 text-[#3b82f6]" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round">
            <path pathLength={1} d="M5 9 L10 14" />
            <path pathLength={1} d="M12 4 L13 12" />
          </svg>
          <h2
            id="results-title"
            className="r-title text-[clamp(1.7rem,2.8vw,2.5rem)] leading-[1.25] font-semibold tracking-[-0.02em] text-ink"
          >
            {resultsIntro.title}
          </h2>
          <p className="r-sub mt-3 text-[0.9rem] text-muted">{resultsIntro.line}</p>
        </div>
        <div className="mt-10">
          <ResultsSpotlight quotes={sampleQuotes} />
        </div>
      </div>
    </ResultsMotion>
  );
}
