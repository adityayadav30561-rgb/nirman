import type { Metadata, Viewport } from "next";
import { Funnel_Sans, Mona_Sans } from "next/font/google";
import { Suspense } from "react";
import { site } from "@/content/site";
import { HeaderWithPathname, SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { SiteWidgets } from "@/components/site-widgets";
import "./globals.css";

const mona = Mona_Sans({
  variable: "--font-mona",
  subsets: ["latin"],
  axes: ["wdth"],
  display: "swap",
});

const funnel = Funnel_Sans({
  variable: "--font-funnel",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name}: SEO, websites, custom software and Nirman CRM`,
    template: `%s | ${site.name}`,
  },
  description: site.description,
  openGraph: {
    title: site.name,
    description: site.description,
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: "#f6f2ea",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${mona.variable} ${funnel.variable} antialiased`}>
      <body>
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-full focus:bg-ink focus:px-4 focus:py-2 focus:text-paper"
        >
          Skip to content
        </a>
        {/* usePathname can suspend on dynamic routes under cacheComponents; the fallback is the same header without active states. */}
        <Suspense fallback={<SiteHeader pathname={null} />}>
          <HeaderWithPathname />
        </Suspense>
        <main id="main">{children}</main>
        <SiteFooter />
        <SiteWidgets />
      </body>
    </html>
  );
}
