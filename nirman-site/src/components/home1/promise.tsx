import { ChartColumn, Clock, FileText, KeyRound, type LucideIcon } from "lucide-react";
import { promises } from "@/content/home1";

const icons: Record<(typeof promises)[number]["icon"], LucideIcon> = {
  clock: Clock,
  file: FileText,
  key: KeyRound,
  chart: ChartColumn,
};
const tones = ["bg-cobalt-soft text-cobalt", "bg-coral-soft text-coral-2", "bg-mint-soft text-forest", "bg-marigold-soft text-[#9a6510]"];

/** Section 2: four commitments that answer the usual doubts. Plain facts from docs/handoff.md. */
export function Promise1() {
  return (
    <section aria-label="What you can count on" className="pb-20 lg:pb-28">
      <div className="container-site">
        <ul className="grid gap-px overflow-hidden rounded-[2rem] bg-ink/10 ring-1 ring-ink/10 sm:grid-cols-2 lg:grid-cols-4">
          {promises.map((p, i) => {
            const Icon = icons[p.icon];
            return (
              <li key={p.title} className="flex items-start gap-4 bg-surface p-6 sm:p-7">
                <span className={`grid size-11 shrink-0 place-items-center rounded-2xl ${tones[i]}`}>
                  <Icon className="size-5" strokeWidth={1.8} aria-hidden />
                </span>
                <span>
                  <span className="title block text-[1.1rem]">{p.title}</span>
                  <span className="mt-1 block text-[0.95rem] leading-[1.5] text-ink-2">{p.body}</span>
                </span>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
