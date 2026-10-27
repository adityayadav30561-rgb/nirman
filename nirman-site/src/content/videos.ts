/*
 * Ambient video clips, self-hosted in public/videos. Both are free to use
 * (Pexels licence, https://www.pexels.com/license/, no attribution required).
 * They are atmosphere only, muted and looping; see docs/REDESIGN.md §3.5.
 * Keep each clip under 6 MB and add a poster of the same name (.jpg).
 */
export const videos = {
  heroAnalytics: {
    src: "/videos/hero-analytics.mp4",
    poster: "/videos/hero-analytics.jpg",
    pexels: 36435736,
    mb: 1.8,
    note: "A hand working with bar charts on a tablet.",
  },
  bandPlanning: {
    src: "/videos/band-planning.mp4",
    poster: "/videos/band-planning.jpg",
    pexels: 5582829,
    mb: 4.8,
    note: "Hands planning at a desk with a laptop and printed material.",
  },
} as const;

export type VideoKey = keyof typeof videos;
