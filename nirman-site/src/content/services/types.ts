import type { PillarId } from "@/content/home";
import type { PhotoKey } from "@/content/photos";

// Content model for the 19 service pages (handoff §5, redesigned with the
// user on 2026-10-21: no engagement models or related links). One file per
// pillar holds its hub and children. The page title and H1 come from
// content/pages.ts (gotcha 24), so they are not repeated here.

/** Homepage card mockup reused as the hero visual. */
export type ServiceVisual = "seo" | "web" | "automation" | "software" | "apps" | "marketing";

/** UI mockups in components/service-art.tsx, used by process steps and reports. */
export type ArtefactId =
  | "seo-audit"
  | "seo-plan"
  | "seo-report"
  | "seo-ranks"
  | "seo-local"
  | "seo-content"
  | "seo-schema"
  | "seo-ai"
  | "seo-product"
  | "web-sitemap"
  | "web-design"
  | "web-cms"
  | "web-code"
  | "web-launch"
  | "web-maintain"
  | "web-store"
  | "sw-scope"
  | "sw-flow"
  | "sw-sprint"
  | "sw-pipeline"
  | "sw-dashboard"
  | "sw-app"
  | "sw-workflow"
  | "sw-integrations"
  | "sw-qa"
  | "sw-support"
  | "mk-broadcast"
  | "mk-email"
  | "mk-journey"
  | "mk-segments"
  | "mk-report"
  | "mk-templates"
  | "mk-deliverability"
  | "mk-calendar";

export type ServiceContent = {
  /** One line under the H1: what the client gets, not what we do. */
  outcome: string;
  /** "Who it's for": 3–4 kinds of business, each with its own photo. */
  segments: {
    title: string;
    photo: PhotoKey;
    /** What a customer of theirs types into Google (shown as a search bar). */
    search: string;
    /** Their situation today, in plain words. */
    problem: string;
    /** What changes after working with us: 3 points. */
    outcomes: string[];
  }[];
  /** 6–9 items. Hubs leave this empty: they show child-service cards instead. */
  deliverables: { title: string; body: string }[];
  /** 4–6 steps, each with a rough duration, a photo and a mockup of its output. */
  process: { title: string; body: string; duration: string; photo: PhotoKey; art: ArtefactId }[];
  /** Reports and documents the client receives, each shown as a mockup. */
  reports: { art: ArtefactId; title: string; body: string; points: string[] }[];
  /** 1–2 snippets. `sample: true` until real results are supplied. */
  results: { sample: boolean; metric: string; label: string; context: string }[];
  /** Platforms and tools, as names in content/tool-logos.ts (no Meta/WhatsApp logos, C2). */
  stack: string[];
  /** 6–8 questions; rendered as FAQPage JSON-LD. */
  faqs: { q: string; a: string }[];
};

export type Service = {
  /** Must match an entry in content/pages.ts. */
  path: string;
  kind: "hub" | "detail";
  pillar: PillarId;
  /** Short label for cards and headings ("Local SEO"). */
  name: string;
  /** schema.org serviceType. */
  serviceType: string;
  visual: ServiceVisual;
  /** Card on the hub page (children only): a mockup of the service, not a photo of people. */
  card?: { art: ArtefactId };
  /** Until it is written the route keeps its stub. */
  content?: ServiceContent;
};
