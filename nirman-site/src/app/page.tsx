import { Hero } from "@/components/home/hero";
import { Facts } from "@/components/home/facts";

// Homepage, built section by section from docs/PAGE-PLAN.md section 2 and
// docs/REFERENCE-VIDEO.md, each section chosen per docs/DESIGN-PROTOCOL.md.
// Done so far: header (in layout), hero, facts band.
export default function Home() {
  return (
    <>
      <Hero />
      <Facts />
    </>
  );
}
