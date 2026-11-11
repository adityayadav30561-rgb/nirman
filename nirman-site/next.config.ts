import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // /tools/ has one tool for now (docs/sections/p6-seo-audit.md).
  async redirects() {
    return [{ source: "/tools", destination: "/tools/seo-audit/", permanent: false }];
  },
  /* config options here */
  // Handoff URL rule: lowercase, hyphens, trailing slash (/about -> /about/).
  trailingSlash: true,
  cacheComponents: true,
  // The PDF library for the SEO audit report runs on the server only and must not be bundled.
  serverExternalPackages: ["@react-pdf/renderer"],
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
