import { pageByPath } from "@/content/pages";
import type { PillarId } from "@/content/home";
import { seoServices } from "./seo";
import { webServices } from "./web";
import { softwareServices } from "./software";
import { marketingServices } from "./marketing";
import type { Service } from "./types";

export type { Service, ServiceContent, ServiceVisual, EngagementId } from "./types";
export { engagementModels } from "./shared";

export const services: Service[] = [...seoServices, ...webServices, ...softwareServices, ...marketingServices];

export function serviceByPath(path: string) {
  return services.find((s) => s.path === path);
}

export function pillarHub(pillar: PillarId) {
  return services.find((s) => s.pillar === pillar && s.kind === "hub");
}

/** A hub's children, in file order. */
export function pillarChildren(pillar: PillarId) {
  return services.filter((s) => s.pillar === pillar && s.kind === "detail");
}

// Fail the build on a broken link rather than ship one: every service, related
// service and tool must exist in content/pages.ts, and each pillar has one hub.
for (const s of services) {
  if (!pageByPath(s.path)) throw new Error(`services: ${s.path} is not in content/pages.ts`);
  if (s.related.includes(s.path)) throw new Error(`services: ${s.path} links to itself`);
  for (const p of [...s.related, ...s.tools]) {
    if (!pageByPath(p)) throw new Error(`services: ${s.path} links to ${p}, which is not in content/pages.ts`);
  }
  if (services.filter((o) => o.pillar === s.pillar && o.kind === "hub").length !== 1) {
    throw new Error(`services: pillar ${s.pillar} needs exactly one hub`);
  }
}
