import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { ButtonLink } from "@/components/ui/button";
import { PhoneScreen } from "@/components/home/phone-screen";
import { Cloud } from "@/components/home/cloud";
import { HeroMotion } from "@/components/motion/hero-motion";

/**
 * Homepage hero (docs/sections/01-hero.md). Layout follows the reference
 * video. Motion is GSAP in components/motion/hero-motion.tsx (calm load
 * entrance + scroll parallax); the h-* class names below are its targets,
 * gs-* classes are the static start states in globals.css.
 */

function Sparks({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 64 40"
      aria-hidden
      className={`draw gs-draw h-spark pointer-events-none absolute -top-[0.55em] left-full ml-[0.1em] h-[0.7em] w-[1.1em] text-[#ea580c] ${className}`}
      fill="none"
      stroke="currentColor"
      strokeWidth="2.6"
      strokeLinecap="round"
    >
      <path pathLength={1} d="M5 20 L12 29" />
      <path pathLength={1} d="M14 8 L17 24" />
      <path pathLength={1} d="M26 3 L23 21" />
      <path pathLength={1} d="M27 30 C 34 12, 46 10, 43 21 C 41 28, 33 24, 38 17 C 43 10, 53 13, 61 19" />
    </svg>
  );
}

function Underline() {
  return (
    <svg
      viewBox="0 0 300 14"
      preserveAspectRatio="none"
      aria-hidden
      className="draw gs-draw h-under pointer-events-none absolute -bottom-[0.12em] left-0 h-[0.22em] w-full text-accent"
      fill="none"
      stroke="currentColor"
      strokeWidth="3"
      strokeLinecap="round"
    >
      <path pathLength={1} d="M3 9 C 60 4, 115 12, 175 7 S 265 4, 297 8" />
    </svg>
  );
}

/*
 * Hand + phone. The hand is a greyscale cut-out (public/images/hero, made by
 * scripts/cut-hand.py). The phone is HTML laid exactly over the photo's phone
 * (percent box below); hand-front.webp puts the photo's right bezel and the
 * fingertips back on top. The bezel is 4.8% of the phone width so the
 * fingertip strip always lands on bezel (see the script).
 *
 * The screen is designed once at the xl size (phone 17rem wide, screen
 * 15.37 x 32.22rem) and scaled by --s = hand width / 28.75rem.
 */

/* Clouds around the phone: a far one, some behind and some in front; they
   fade in with the phone, drift slowly, and move at different speeds on
   scroll (parallax). Positions are % of the hand box. */
type CloudSpec = { key: string; left: number; top: number; width: number; dx: number; t: number; opacity?: number };
const cloudsBack: CloudSpec[] = [
  { key: "b1", left: 83, top: 3, width: 19, dx: -12, t: 10 },
  { key: "b2", left: -7, top: 25, width: 17, dx: 12, t: 11 },
  { key: "far1", left: 99, top: -7, width: 13, dx: -10, t: 12, opacity: 0.85 },
];
const cloudsFront: CloudSpec[] = [
  { key: "f1", left: 27, top: 3, width: 24, dx: 10, t: 8 },
  { key: "f2", left: 91, top: 24, width: 16, dx: 8, t: 9 },
];
function CloudLayer({ clouds, className }: { clouds: CloudSpec[]; className: string }) {
  return (
    <div aria-hidden className={`gs-hide pointer-events-none absolute inset-0 ${className}`}>
      {clouds.map((c) => (
        <Cloud
          key={c.key}
          className="h-drift absolute"
          data-dx={c.dx}
          data-t={c.t}
          style={{ left: `${c.left}%`, top: `${c.top}%`, width: `${c.width}%`, opacity: c.opacity }}
        />
      ))}
    </div>
  );
}

const handSizes =
  "w-[18.5rem] [--s:0.6435] sm:w-[20rem] sm:[--s:0.6957] lg:w-[25rem] lg:[--s:0.8696] xl:w-[28.75rem] xl:[--s:1]";

function PhoneStage() {
  return (
    <div className="relative flex justify-center md:self-stretch md:items-end md:justify-end lg:justify-center">
      <div className={`relative ${handSizes}`}>
        {/* soft rings centred on the phone, and a loose drawn line */}
        <div aria-hidden className="absolute top-[44%] left-[62%] aspect-square w-[118%] -translate-1/2 rounded-full border border-brand/[0.07]" />
        <div aria-hidden className="absolute top-[44%] left-[62%] aspect-square w-[160%] -translate-1/2 rounded-full border border-brand/[0.05]" />
        <div aria-hidden className="absolute top-[44%] left-[62%] aspect-square w-[105%] -translate-1/2 rounded-full bg-[radial-gradient(closest-side,#fbe7da,transparent)]" />
        <svg
          viewBox="0 0 120 220"
          aria-hidden
          className="draw gs-draw h-loop pointer-events-none absolute top-[10%] -right-[18%] h-[40%] text-[#ea580c]/45"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.4"
          strokeLinecap="round"
        >
          <path pathLength={1} d="M10 6 C 70 20, 110 60, 96 110 C 86 146, 40 150, 52 120 C 62 96, 104 120, 100 170 C 98 192, 86 208, 70 216" />
        </svg>

        <CloudLayer clouds={cloudsBack} className="h-clouds-back" />

        {/* h-par: scroll parallax; h-phone: entrance (rests at 8deg); h-float: gentle float */}
        <div className="h-par relative">
          <div className="h-phone gs-hide relative origin-[50%_85%] [transform:rotate(8deg)]">
            <div className="h-float relative aspect-[960/1311] [mask-image:linear-gradient(to_bottom,#000_80%,transparent_99%)]">
              <Image
                src="/images/hero/hand-back.webp"
                alt=""
                fill
                preload
                quality={80}
                sizes="(min-width: 1280px) 29rem, (min-width: 1024px) 25rem, 20rem"
                className="object-contain"
              />
              <div className="absolute top-[0.94%] left-[32.63%] h-[86.21%] w-[59.14%] rounded-[15%/7.4%] bg-ink p-[2.84%] shadow-[0_0_0_1.5px_#2b303a_inset]">
                <div className="relative h-full overflow-hidden rounded-[11.3%/5.4%] bg-[#f4f6f9]">
                  <div className="h-screen absolute top-0 left-0 h-[32.22rem] w-[15.37rem] origin-top-left [scale:var(--s)]">
                    <PhoneScreen />
                    <div aria-hidden className="absolute top-2 left-1/2 h-[1.1rem] w-[34%] -translate-x-1/2 rounded-full bg-ink" />
                  </div>
                </div>
              </div>
              <Image
                src="/images/hero/hand-front.webp"
                alt=""
                fill
                quality={80}
                sizes="(min-width: 1280px) 29rem, (min-width: 1024px) 25rem, 20rem"
                className="pointer-events-none object-contain"
              />
            </div>
          </div>
        </div>

        <CloudLayer clouds={cloudsFront} className="h-clouds-front" />
      </div>
    </div>
  );
}

export function Hero() {
  return (
    <HeroMotion aria-labelledby="hero-title" className="relative overflow-hidden">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -top-[5.5rem] bg-[radial-gradient(48rem_32rem_at_0%_0%,#f8ece3,transparent_70%),radial-gradient(40rem_34rem_at_80%_45%,#fbf1ea,transparent_70%)]"
      />
      <div className="container-page relative grid gap-8 pt-4 md:min-h-[32rem] md:grid-cols-[1.15fr_0.85fr] md:gap-6 md:pt-0 lg:min-h-[min(calc(100svh-5.5rem),46rem)]">
        <div className="h-text max-w-[44rem] self-center md:py-14 lg:py-10">
          <h1
            id="hero-title"
            className="h-h1 gs-ghost text-[clamp(2rem,8.6vw,3rem)] leading-[1.25] font-semibold tracking-[-0.025em] text-balance text-ink md:text-[clamp(2rem,4.6vw,3rem)] md:leading-[1.3] lg:text-[clamp(3.2rem,4.9vw,4.25rem)]"
          >
            <span className="md:block md:whitespace-nowrap">
              {/* Phones: line 1 ends at "SEO" (sparks there); 768px up: after "and". */}
              Websites,{" "}
              <span className="relative inline-block">
                SEO
                <Sparks className="md:hidden" />
              </span>
              <br className="md:hidden" />{" "}
              <span className="relative inline-block">
                and
                <Sparks className="hidden md:block" />
              </span>
            </span>{" "}
            <span className="md:block md:whitespace-nowrap">software that grow</span>{" "}
            <span className="relative inline-block whitespace-nowrap">
              your business.
              <Underline />
            </span>
          </h1>
          <p className="h-sub gs-hide mt-5 max-w-[29rem] text-[0.95rem] leading-[1.75] text-muted md:mt-6">
            Nirman is a digital agency in India. We build websites, run SEO, develop custom software and automate
            follow-ups with Nirman CRM, for businesses in India and abroad.
          </p>
          <div className="relative z-10 mt-8 flex flex-wrap items-center gap-3 md:mt-10">
            <ButtonLink href="/get-a-quote/" className="h-btn gs-hide">
              Get a quote
            </ButtonLink>
            <ButtonLink href="/work/" variant="outline" className="h-btn2 gs-hide group">
              See our work
              <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" aria-hidden />
            </ButtonLink>
          </div>
        </div>

        <PhoneStage />
      </div>
    </HeroMotion>
  );
}
