import type { EngagementId } from "./types";

/**
 * The three ways to work with us, shown on every service page in place of
 * prices (client rule). Each page adds its own `fit` line per model.
 */
export const engagementModels: Record<EngagementId, { name: string; body: string }> = {
  "fixed-scope": {
    name: "Fixed scope",
    body: "A defined project with agreed deliverables and a timeline. You get a written quote before we start.",
  },
  retainer: {
    name: "Monthly retainer",
    body: "Ongoing work each month, with a set list of tasks and a report you can read.",
  },
  "dedicated-team": {
    name: "Dedicated team",
    body: "Our people working on your product full time or part time, reporting to you.",
  },
};
