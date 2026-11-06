import { ArrowRight, CalendarClock, LayoutGrid } from "lucide-react";
import { Select } from "@/components/ui/select";
import { quoteBar } from "@/content/map";

/*
 * Pill "search bar" from the reference, as a quick quote starter: two
 * choices and a round button. A GET form to /get-a-quote/ (the quote page
 * reads ?service= and ?timeline=). The choices use the site's own Select
 * (components/ui/select.tsx), not the browser's native dropdown; each
 * carries its value in a hidden input, so the form submits as usual.
 */
export function QuoteBar({ className = "" }: { className?: string }) {
  return (
    <form
      action="/get-a-quote/"
      method="get"
      className={`m-bar flex flex-col gap-3 rounded-[1.4rem] bg-white p-3 pl-4 shadow-[0_18px_40px_-22px_rgb(5_7_12/0.35),0_1px_2px_rgb(5_7_12/0.05)] sm:flex-row sm:items-center sm:gap-2 sm:rounded-full sm:p-2 sm:pl-4 ${className}`}
    >
      <div className="grid flex-1 gap-3 py-1 sm:grid-cols-2 sm:gap-0">
        <div className="flex min-w-0 items-center gap-2.5 sm:pr-3">
          <LayoutGrid className="size-4 shrink-0 text-accent" aria-hidden />
          <Select name="service" label="Service" options={quoteBar.services} className="min-w-0 flex-1" />
        </div>
        <div className="flex min-w-0 items-center gap-2.5 sm:border-l sm:border-line sm:pl-3">
          <CalendarClock className="size-4 shrink-0 text-accent" aria-hidden />
          <Select
            name="timeline"
            label="Timeline"
            options={quoteBar.timelines}
            defaultValue={quoteBar.timelines[1]}
            className="min-w-0 flex-1"
          />
        </div>
      </div>
      <button
        type="submit"
        className="inline-flex h-12 shrink-0 items-center justify-center gap-1.5 rounded-full bg-ink-2 px-4 text-[0.85rem] font-medium text-white transition-colors hover:bg-brand focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand"
      >
        Get a quote
        <ArrowRight className="size-4" aria-hidden />
      </button>
    </form>
  );
}
