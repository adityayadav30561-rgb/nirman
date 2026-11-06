import { Logo } from "@/components/logo";

// Blank start for the 2026-11-06 rebuild. The homepage is built section by
// section from docs/PAGE-PLAN.md and docs/REFERENCE-VIDEO.md.
export default function Home() {
  return (
    <div className="grid min-h-svh place-items-center">
      <h1 className="sr-only">Nirman</h1>
      <Logo />
    </div>
  );
}
