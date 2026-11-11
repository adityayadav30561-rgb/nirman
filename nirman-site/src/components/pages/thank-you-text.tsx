"use client";

import { useSearchParams } from "next/navigation";

/*
 * The words on /thank-you/. Normally the form has been sent. With ?via=email
 * the site could not send it and opened the visitor's email app instead, so
 * the page asks them to press Send there. Read in the browser (inside
 * Suspense) so the page stays static.
 */
export function ThankYouText() {
  const viaEmail = useSearchParams().get("via") === "email";
  return (
    <>
      <h1 id="ty-title" className="mt-6 text-[clamp(2rem,3.6vw,3rem)] leading-tight font-semibold tracking-[-0.03em]">
        {viaEmail ? "Thank you. One last step." : "Thank you. We have your message."}
      </h1>
      <p className="mt-4 max-w-[34rem] text-[1.02rem] text-muted">
        {viaEmail ? (
          <>Your email app should have opened with your answers filled in. Press <b className="font-semibold text-ink">Send</b> and we will reply within 2 working hours (IST).</>
        ) : (
          <>We reply within 2 working hours (IST), and send a written proposal within 48 hours of our call.</>
        )}
      </p>
    </>
  );
}
