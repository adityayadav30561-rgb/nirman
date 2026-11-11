import type { Metadata } from "next";
import { Suspense } from "react";
import { CircleCheck } from "lucide-react";
import { ButtonLink } from "@/components/ui/button";
import { ThankYouText } from "@/components/pages/thank-you-text";
import { site } from "@/content/site";

// /thank-you/ after the quote and contact forms (not indexed). The words
// depend on how the form went out: see components/pages/thank-you-text.tsx.
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
        <Suspense fallback={<h1 id="ty-title" className="mt-6 text-[clamp(2rem,3.6vw,3rem)] leading-tight font-semibold tracking-[-0.03em]">Thank you.</h1>}>
          <ThankYouText />
        </Suspense>
        <p className="mt-3 max-w-[34rem] text-[0.9rem] text-muted">
          Prefer email? Write to us at{" "}
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
