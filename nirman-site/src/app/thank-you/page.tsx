import type { Metadata } from "next";
import { CircleCheck } from "lucide-react";
import { ButtonLink } from "@/components/ui/button";
import { site } from "@/content/site";

// /thank-you/ after a form (PAGE-PLAN; not indexed). Until the lead API exists
// (BUILD-PLAN S1) forms open the visitor's email app, so this page asks them to
// press Send rather than claiming the request has arrived.
export const metadata: Metadata = {
  title: "Thank you",
  robots: { index: false, follow: false },
  alternates: { canonical: "/thank-you/" },
};

export default function ThankYouPage() {
  return (
    <section aria-labelledby="ty-title" className="py-20 lg:py-28">
      <div className="container-page flex flex-col items-center text-center">
        <span className="grid size-16 place-items-center rounded-full bg-[#fbe9df] text-brand">
          <CircleCheck className="size-8" aria-hidden />
        </span>
        <h1 id="ty-title" className="mt-6 text-[clamp(2rem,3.6vw,3rem)] leading-tight font-semibold tracking-[-0.03em]">
          Thank you. One last step.
        </h1>
        <p className="mt-4 max-w-[34rem] text-[1.02rem] text-muted">
          Your email app should have opened with your answers filled in. Press <b className="font-semibold text-ink">Send</b> and we will reply within 2 working hours (IST).
        </p>
        <p className="mt-3 max-w-[34rem] text-[0.9rem] text-muted">
          Nothing opened? Email us at{" "}
          <a href={`mailto:${site.email}`} className="font-medium text-brand underline-offset-4 hover:underline">
            {site.email}
          </a>
          .
        </p>
        <ButtonLink href="/" variant="outline" className="mt-8">
          Back to the homepage
        </ButtonLink>
      </div>
    </section>
  );
}
