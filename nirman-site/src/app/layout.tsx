import type { Metadata, Viewport } from "next";
import { Poppins } from "next/font/google";
import Script from "next/script";
import { site } from "@/content/site";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import "./globals.css";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name}: websites, SEO, custom software and Nirman CRM`,
    template: `%s | ${site.name}`,
  },
  description: site.description,
  applicationName: site.name,
  openGraph: {
    type: "website",
    siteName: site.name,
    locale: "en_IN",
    title: `${site.name}: websites, SEO, custom software and Nirman CRM`,
    description: site.description,
  },
  twitter: { card: "summary_large_image" },
  // Google Search Console ownership: renders <meta name="google-site-verification">.
  verification: site.googleVerification ? { google: site.googleVerification } : undefined,
};

/*
 * Google Tag Manager, Google's standard install for the container in
 * content/site.ts: the data layer with its start event (the event that
 * "All Pages" tags in the container wait for), then gtm.js. `gtag` is
 * defined too, as in the snippet the SEO person sent. Loaded after the page
 * is interactive so it does not slow the first paint.
 */
const gtm = `window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());dataLayer.push({'gtm.start':new Date().getTime(),event:'gtm.js'});var s=document.createElement('script');s.async=true;s.src='https://www.googletagmanager.com/gtm.js?id=${site.gtmId}';document.head.appendChild(s);`;

export const viewport: Viewport = {
  themeColor: "#f5f7f9",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    // suppressHydrationWarning: the inline script adds the "js" class before React hydrates.
    <html lang="en" className={`${poppins.variable} antialiased`} suppressHydrationWarning>
      <body>
        {/* Marks JS as available before hydration; GSAP start states (gs-*) apply only under html.js. */}
        <Script id="js-flag" strategy="beforeInteractive">
          {"document.documentElement.classList.add('js')"}
        </Script>
        {site.gtmId && (
          <>
            <Script id="gtm" strategy="afterInteractive">
              {gtm}
            </Script>
            <noscript>
              <iframe src={`https://www.googletagmanager.com/ns.html?id=${site.gtmId}`} height="0" width="0" style={{ display: "none", visibility: "hidden" }} title="Google Tag Manager" />
            </noscript>
          </>
        )}
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:rounded-full focus:bg-ink focus:px-4 focus:py-2 focus:text-white"
        >
          Skip to content
        </a>
        <SiteHeader />
        <main id="main">{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}
