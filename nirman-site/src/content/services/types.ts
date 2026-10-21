import type { PillarId } from "@/content/home";

// Content model for the 18 service pages (handoff §5). One file per pillar
// holds its hub and children. The page title and H1 come from
// content/pages.ts (gotcha 24), so they are not repeated here.

export type Link = { label: string; href: string };

/** Homepage card mockup reused as the hero visual (P4.2). */
export type ServiceVisual = "seo" | "web" | "automation" | "software" | "apps" | "marketing";

export type EngagementId = "fixed-scope" | "retainer" | "dedicated-team";

export type ServiceContent = {
  /** One line under the H1: what the client gets, not what we do. */
  outcome: string;
  /** "Who it's for": the businesses this suits. */
  audience: string[];
  /** "What changes": the situation after the work, one point each. */
  changes: string[];
  /** 6–9 items. Hubs leave this empty: they show child-service cards instead. */
  deliverables: { title: string; body: string }[];
  /** 4–6 steps, each with a rough duration ("Week 1", "2–3 weeks"). */
  process: { title: string; body: string; duration: string }[];
  /** Platforms and tools, as plain names (no Meta/WhatsApp logos, C2). */
  stack: string[];
  /** 1–2 snippets. `sample: true` until real results are supplied. */
  results: { sample: boolean; metric: string; label: string; context: string }[];
  /** Which engagement models fit and why. Never a price (client rule). */
  engagement: { model: EngagementId; fit: string }[];
  /** "What affects cost": drivers of scope, no figures. */
  costFactors: string[];
  /** 6–8 questions; rendered as FAQPage JSON-LD. */
  faqs: { q: string; a: string }[];
};

export type Service = {
  /** Must match an entry in content/pages.ts. */
  path: string;
  kind: "hub" | "detail";
  pillar: PillarId;
  /** Short label for cards, menus and related links ("Local SEO"). */
  name: string;
  /** schema.org serviceType. */
  serviceType: string;
  visual: ServiceVisual;
  /** Paths of other services to cross-link (siblings or other pillars). */
  related: string[];
  /** Paths of related free tools (/tools/...). */
  tools: string[];
  /** Filled in P4.3–P4.6. Until then the route keeps its stub. */
  content?: ServiceContent;
};
