import { ImageResponse } from "next/og";
import { site } from "@/content/site";

// Default share image, served at /og.png and referenced from the root metadata.
// Not the opengraph-image file convention: that URL has no extension, so
// trailingSlash 308-redirects it. Paths with an extension are left alone.
// Satori needs a TTF/OTF and none of the brand fonts are bundled locally, so this
// uses ImageResponse's built-in font (Geist). Swap in Mona Sans when a TTF is added.

const services = ["SEO", "Websites", "Custom software", "Nirman CRM"];

export function GET() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 80,
          background: "#123b32",
          color: "#f6f2ea",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 24 }}>
          <svg width="88" height="88" viewBox="0 0 32 32">
            <rect width="32" height="32" rx="9" fill="#f6f2ea" />
            <path d="M9 24V11.5A3.5 3.5 0 0 1 12.5 8h7a3.5 3.5 0 0 1 3.5 3.5V24" fill="none" stroke="#16181b" strokeWidth="3" />
            <rect x="13" y="20" width="6" height="4" rx="1" fill="#f4b23e" />
          </svg>
          <div style={{ fontSize: 72, letterSpacing: "-0.04em" }}>{site.name.toLowerCase()}</div>
        </div>

        <div style={{ display: "flex", fontSize: 64, lineHeight: 1.1, letterSpacing: "-0.03em", maxWidth: 980 }}>
          {site.tagline}
        </div>

        <div style={{ display: "flex", gap: 16 }}>
          {services.map((s) => (
            <div
              key={s}
              style={{
                display: "flex",
                padding: "12px 24px",
                borderRadius: 999,
                background: "#1e5a4b",
                color: "#e0f1e6",
                fontSize: 28,
              }}
            >
              {s}
            </div>
          ))}
        </div>
      </div>
    ),
    { width: 1200, height: 630 },
  );
}
