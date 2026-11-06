import { ArrowRight, CalendarClock, ChevronDown, LayoutGrid } from "lucide-react";
import { quoteBar } from "@/content/map";

/*
 * Pill "search bar" from the reference, as a quick quote starter: two
 * choices and a round button. A plain GET form to /get-a-quote/, so it works
 * without JS; the quote page reads ?service= and ?timeline=.
 */
export function QuoteBar({ className = "" }: { className?: string }) {
  const field =
    "w-full appearance-none bg-transparent pr-5 text-[0.82rem] font-medium text-ink outline-none focus-visible:underline";
  return (
    <form
      action="/get-a-quote/"
      method="get"
      className={`m-bar flex items-center gap-2 rounded-[1.4rem] bg-white p-2 pl-4 shadow-[0_18px_40px_-22px_rgb(5_7_12/0.35),0_1px_2px_rgb(5_7_12/0.05)] sm:rounded-full ${className}`}
    >
      <div className="grid flex-1 gap-3 py-1 sm:grid-cols-2 sm:gap-0">
        <label className="flex min-w-0 items-center gap-2.5 sm:pr-3">
          <LayoutGrid className="size-4 shrink-0 text-accent" aria-hidden />
          <span className="relative min-w-0 flex-1">
            <span className="block text-[0.7rem] text-muted">Service</span>
            <select name="service" className={field} defaultValue={quoteBar.services[0]}>
              {quoteBar.services.map((s) => (
                <option key={s}>{s}</option>
              ))}
            </select>
            <ChevronDown className="pointer-events-none absolute right-0 bottom-1 size-3.5 text-muted" aria-hidden />
          </span>
        </label>
        <label className="flex min-w-0 items-center gap-2.5 sm:border-l sm:border-line sm:pl-3">
          <CalendarClock className="size-4 shrink-0 text-accent" aria-hidden />
          <span className="relative min-w-0 flex-1">
            <span className="block text-[0.7rem] text-muted">Timeline</span>
            <select name="timeline" className={field} defaultValue={quoteBar.timelines[1]}>
              {quoteBar.timelines.map((t) => (
                <option key={t}>{t}</option>
              ))}
            </select>
            <ChevronDown className="pointer-events-none absolute right-0 bottom-1 size-3.5 text-muted" aria-hidden />
          </span>
        </label>
      </div>
      <button
        type="submit"
        className="inline-flex h-12 shrink-0 items-center gap-1.5 rounded-full bg-ink-2 px-4 text-[0.85rem] font-medium text-white transition-colors hover:bg-brand focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand"
      >
        Get a quote
        <ArrowRight className="size-4" aria-hidden />
      </button>
    </form>
  );
}
