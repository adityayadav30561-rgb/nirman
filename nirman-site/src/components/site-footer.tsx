import Link from "next/link";
import { BottomBar, Columns, Socials } from "@/components/footer-parts";
import { Logo } from "@/components/logo";
import { FooterMotion } from "@/components/motion/footer-motion";
import { footerBlurb } from "@/content/footer";

/*
 * Site footer (docs/sections/08-footer.md, variant A chosen per the design
 * protocol): the reference's rounded blue panel with logo, blurb and round
 * social icons on the left, Company / Services / Resources / Contact info
 * columns, a thin rule and the copyright line. Social profiles are
 * placeholders with generic icons (content/footer.ts). Motion: GSAP in
 * components/motion/footer-motion.tsx; ft-* classes are its targets.
 */
export function SiteFooter() {
  return (
    <FooterMotion className="overflow-hidden px-3 pt-6 pb-3 sm:px-4">
      <div className="ft-panel rounded-[2rem] bg-[linear-gradient(160deg,var(--color-band-2)_0%,var(--color-band)_100%)] text-white">
        <div className="container-page py-16 lg:py-20">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-[minmax(0,4fr)_minmax(0,8fr)] lg:gap-16">
            <div>
              <Link href="/" aria-label="Nirman home" className="ft-in inline-flex min-h-11 items-center rounded-lg focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white">
                <Logo tone="light" className="h-[4.5rem]" />
              </Link>
              <p className="ft-in mt-5 max-w-[22rem] text-[0.95rem] leading-relaxed text-white/85">{footerBlurb}</p>
              <Socials className="mt-7" />
            </div>
            <div className="grid grid-cols-2 gap-x-6 gap-y-10 md:grid-cols-4">
              <Columns />
            </div>
          </div>
          <BottomBar />
        </div>
      </div>
    </FooterMotion>
  );
}
