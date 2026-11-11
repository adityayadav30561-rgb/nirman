// Sanity connection (docs/sections/p7-blog.md). Both values are public (they
// are visible in every request the browser makes to Sanity), so the project
// ID is written here as the default (user's project "Nirman", 2026-11-11) and
// every host and session works without setup. The NEXT_PUBLIC_ variables
// override it, for example to point a test site at another project.
export const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "iymga1c7";
export const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";
export const apiVersion = "2025-02-19";
export const sanityReady = /^[a-z0-9]+$/.test(projectId);
