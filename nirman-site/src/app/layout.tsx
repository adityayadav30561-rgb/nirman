import type { Metadata, Viewport } from "next";
import { Poppins } from "next/font/google";
import Script from "next/script";
import { Suspense } from "react";
import { site } from "@/content/site";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { CookieConsent } from "@/components/cookie-consent";
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
 * Google Tag Manager with Consent Mode v2 (docs/sections/s5-consent.md).
 * Order matters and everything is in one script so it cannot be reordered:
 * 1. the data layer and gtag;
 * 2. the consent default: measurement and advertising are "denied" unless
 *    this browser has a saved choice (components/cookie-consent.tsx), so no
 *    such cookie is set before the visitor agrees;
 * 3. Google's standard container start (the gtm.js event that "All Pages"
 *    tags wait for) and the container itself.
 * Loaded after the page is interactive so it does not slow the first paint.
 */
const gtm = `window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}var c=null;try{c=JSON.parse(localStorage.getItem('nirman-consent'));if(!c||Date.now()-c.t>15552000000)c=null}catch(e){}var g=function(v){return v?'granted':'denied'};gtag('consent','default',{analytics_storage:g(c&&c.analytics),ad_storage:g(c&&c.ads),ad_user_data:g(c&&c.ads),ad_personalization:g(c&&c.ads),functionality_storage:'granted',security_storage:'granted',wait_for_update:c?0:500});gtag('js',new Date());dataLayer.push({'gtm.start':new Date().getTime(),event:'gtm.js'});var s=document.createElement('script');s.async=true;s.src='https://www.googletagmanager.com/gtm.js?id=${site.gtmId}';document.head.appendChild(s);`;

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
        {/* usePathname inside: Suspense for pages whose address is not known at build time (ARCHITECTURE gotcha 47) */}
        {site.gtmId && (
          <Suspense fallback={null}>
            <CookieConsent />
          </Suspense>
        )}
      </body>
    </html>
  );
}
