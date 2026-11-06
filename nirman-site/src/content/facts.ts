// The four facts under the hero (docs/sections/02-facts.md).
// 2 h and 48 h come from the handoff; 3-6 weeks and 100% ownership were
// approved by the user on 2026-11-06 (confirm with the client before launch).

export type Fact = { value: string; unit: string; label: string; step: string };

export const facts: Fact[] = [
  { value: "2", unit: "h", label: "Reply time in working hours (IST)", step: "You message us" },
  { value: "48", unit: "h", label: "Written proposal after your call", step: "You get a plan" },
  { value: "3–6", unit: "wk", label: "A typical business website, live", step: "Your site goes live" },
  { value: "100", unit: "%", label: "Your code, content and data", step: "You own it all" },
];
