// Sanity connection (docs/sections/p7-blog.md). Both values are public (they
// are visible in every request the browser makes to Sanity), so they are
// NEXT_PUBLIC_ variables. Until they are set the blog shows its empty state
// and /studio/ explains what is missing.
export const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "";
export const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";
export const apiVersion = "2025-02-19";
export const sanityReady = /^[a-z0-9]+$/.test(projectId);
