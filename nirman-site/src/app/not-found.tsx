import type { Metadata } from "next";
import { ButtonLink } from "@/components/ui/button";

// Shown for any address that has no page (and answers 404).
export const metadata: Metadata = { title: "Page not found", robots: { index: false, follow: true } };

const links = [
  ["Services", "/services/"],
  ["Our work", "/work/"],
  ["Nirman CRM", "/nirman-crm/"],
  ["Contact", "/contact/"],
] as const;

export default function NotFound() {
  return (
    <section aria-labelledby="nf-title" className="py-24 lg:py-36">
      <div className="container-page">
        <p className="text-[clamp(4rem,12vw,8rem)] leading-none font-light tracking-[-0.06em] text-brand">404</p>
        <h1 id="nf-title" className="mt-4 text-[clamp(2rem,4vw,3.2rem)] leading-[1.08] font-semibold tracking-[-0.035em]">This page does not exist.</h1>
        <p className="mt-4 max-w-[34rem] text-[1.05rem] text-muted">The address may be mistyped, or the page may have moved. These will get you back on track.</p>
        <div className="mt-8 flex flex-wrap gap-3">
          <ButtonLink href="/">Go to the homepage</ButtonLink>
          {links.map(([label, href]) => <ButtonLink key={href} href={href} variant="outline">{label}</ButtonLink>)}
        </div>
      </div>
    </section>
  );
}
