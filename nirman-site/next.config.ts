import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  // Handoff URL rule: lowercase, hyphens, trailing slash (/about -> /about/).
  trailingSlash: true,
  cacheComponents: true,
  partialPrefetching: true,
  images: {
    qualities: [70, 80],
  },
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
