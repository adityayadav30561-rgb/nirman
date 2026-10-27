import { method } from "@/content/home1";
import type { PhotoKey } from "@/content/photos";
import type { ArtefactId } from "@/content/services";
import { Photo } from "../photo";
import { Artefact } from "../service-art";
import { ServiceProcess } from "../service-process";

/** A step's picture: a photo with a mockup of what the step produces on top (same pattern as the service pages). */
function StepVisual({ photo, art }: { photo: PhotoKey; art: ArtefactId }) {
  return (
    <div className="absolute inset-0">
      <Photo name={photo} sizes="(min-width: 1024px) 55vw, 90vw" />
      <div className="absolute inset-0 bg-gradient-to-t from-ink/45 via-ink/10 to-transparent" aria-hidden />
      <div className="absolute inset-x-5 bottom-5 sm:inset-x-auto sm:right-6 sm:w-[72%] lg:bottom-8 lg:right-8 lg:w-[78%]">
        <Artefact id={art} />
      </div>
    </div>
  );
}

/** Section 6: the process as a scroll story. The picture panel is pinned and changes with the step. */
export function Method1() {
  return (
    <ServiceProcess
      check="bg-ink text-paper"
      steps={method.map((s) => ({
        title: s.title,
        body: s.body,
        duration: s.duration,
        visual: <StepVisual photo={s.photo} art={s.art} />,
      }))}
    />
  );
}
