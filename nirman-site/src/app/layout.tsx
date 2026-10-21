import type { Metadata, Viewport } from "next";
import { Funnel_Sans, Mona_Sans } from "next/font/google";
import { site } from "@/content/site";
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
  title: `${site.name} ${site.descriptor}: SEO, websites, CRM and custom software`,
  description: site.description,
  openGraph: {
    title: `${site.name} ${site.descriptor}`,
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
      <body>{children}</body>
    </html>
  );
}
