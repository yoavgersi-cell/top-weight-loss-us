import type { Metadata } from "next";
import { Geist } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { GoogleAnalytics } from "@/components/google-analytics";
import { TaboolaPixel } from "@/components/taboola-pixel";
import { hreflangLanguages } from "@/lib/regions";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.topweightloss.us"),
  // Inner pages set their own absolute titles; the homepage keeps the brand.
  title: {
    default: "Top Weight Loss - Best Online GLP-1 Weight Loss Providers 2026",
    template: "%s",
  },
  description:
    "Independent rankings of the best online GLP-1 weight loss providers in the US - verified semaglutide and tirzepatide prices, real Trustpilot reviews and side-by-side comparisons.",
  keywords: [
    "best GLP-1 providers",
    "online weight loss programs",
    "compounded semaglutide",
    "compounded tirzepatide",
    "telehealth weight loss",
    "weight loss injections online",
  ],
  openGraph: {
    title: "Top Weight Loss - Best Online GLP-1 Weight Loss Providers 2026",
    description:
      "Independent, side-by-side comparisons of the top online GLP-1 weight loss providers - verified prices, real reviews.",
    type: "website",
    siteName: "Top Weight Loss",
    locale: "en_US",
    url: "https://www.topweightloss.us",
  },
  twitter: {
    card: "summary_large_image",
    title: "Top Weight Loss - Best Online GLP-1 Weight Loss Providers 2026",
    description:
      "Independent, side-by-side comparisons of the top online GLP-1 weight loss providers - verified prices, real reviews.",
  },
  other: {
    "geo.region": "US",
    "geo.position": "37.0902;-95.7129",
    ICBM: "37.0902, -95.7129",
    "content-language": "en-US",
  },
  alternates: {
    canonical: "https://www.topweightloss.us",
    languages: hreflangLanguages("https://www.topweightloss.us", "/"),
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en-US" className={`${geistSans.variable} h-full antialiased`}>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        {/* og:site_name on every page. Page-level `openGraph` metadata replaces
            the layout's openGraph object wholesale (no deep merge), which
            silently dropped siteName from most pages - so it is emitted here
            directly, where no page can override it. */}
        <meta property="og:site_name" content="Top Weight Loss" />
        {/* Feed autodiscovery: the RSS feed of every published guide (see
            app/feed.xml). Emitted here rather than via metadata.alternates,
            which pages replace wholesale when they set their own canonical. */}
        <link rel="alternate" type="application/rss+xml" title="Top Weight Loss - Guides" href="https://www.topweightloss.us/feed.xml" />
      </head>
      <body className="min-h-full flex flex-col overflow-x-hidden">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: "Top Weight Loss",
              alternateName: ["TopWeightLoss"],
              url: "https://www.topweightloss.us",
              areaServed: { "@type": "Country", name: "United States" },
              email: "contact@topweightloss.us",
              contactPoint: { "@type": "ContactPoint", email: "contact@topweightloss.us", contactType: "customer support", availableLanguage: "English" },
              logo: "https://www.topweightloss.us/logo.png",
              description: "Independent research and comparisons of online GLP-1 weight loss providers in the US - verified pricing, real customer reviews and side-by-side comparisons.",
              knowsAbout: ["GLP-1 medications", "Semaglutide", "Tirzepatide", "Telehealth weight loss", "Compounded medications"],
              foundingDate: "2026",
            }),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              name: "Top Weight Loss",
              alternateName: ["TopWeightLoss"],
              url: "https://www.topweightloss.us",
              description: "Compare the best online GLP-1 weight loss providers side by side",
              inLanguage: "en-US",
              publisher: { "@type": "Organization", name: "Top Weight Loss", url: "https://www.topweightloss.us" },
            }),
          }}
        />
        <GoogleAnalytics />
        <TaboolaPixel />
        <Analytics />
        <SpeedInsights />
        {children}
      </body>
    </html>
  );
}
