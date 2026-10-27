import { videos } from "@/content/videos";
import { band } from "@/content/home1";
import { ButtonLink } from "../ui/button-link";
import { AmbientVideo } from "./ambient-video";

/**
 * Section 4: a statement band that sets the page's pace. The second (and last)
 * ambient video sits behind it, under a dark tint so the text keeps its contrast.
 */
export function Band1() {
  const v = videos.bandPlanning;
  return (
    <section aria-labelledby="band-title" className="relative isolate overflow-hidden bg-forest-deep py-20 text-paper lg:py-28">
      <AmbientVideo src={v.src} poster={v.poster} sizes="100vw" className="opacity-60" />
      <div className="absolute inset-0 bg-[linear-gradient(90deg,rgb(11_38_32/0.92),rgb(11_38_32/0.6)_60%,rgb(11_38_32/0.35))]" aria-hidden />
      <div className="container-site relative">
        <h2 id="band-title" className="display max-w-[72rem] text-[clamp(2.2rem,4.6vw,4.4rem)]">
          {band.lines.map((l) => (
            <span key={l} className="block">
              {l}
            </span>
          ))}
        </h2>
        <div className="mt-8 flex flex-wrap gap-3">
          <ButtonLink href="/work/" variant="light" size="lg">
            See our work
          </ButtonLink>
          <ButtonLink href="/get-a-quote/" variant="ghostLight" size="lg">
            Talk to us
          </ButtonLink>
        </div>
      </div>
    </section>
  );
}
