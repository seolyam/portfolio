import type { Metadata } from "next";
import { Newsreader } from "next/font/google";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import { motionScript } from "@/lib/motion";
import { links, site } from "@/lib/site";
import { themeScript } from "@/lib/theme";
import "./globals.css";

const newsreader = Newsreader({
  subsets: ["latin"],
  style: ["normal", "italic"],
  axes: ["opsz"],
  variable: "--font-newsreader",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: `${site.name} | ${site.role}`,
    template: `%s | ${site.shortName}`,
  },
  description: site.description,
  metadataBase: new URL(site.url),
  alternates: { canonical: "/" },
  authors: [{ name: site.name, url: site.url }],
  creator: site.name,
  keywords: [
    "Lhiam Lingco",
    "software engineer",
    "full-stack developer",
    "game development",
    "Next.js",
    "TypeScript",
    "Supabase",
    "portfolio",
  ],
  openGraph: {
    title: `${site.name} | ${site.role}`,
    description: site.description,
    url: "/",
    siteName: site.name,
    locale: "en_PH",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.name} | ${site.role}`,
    description: site.description,
  },
  robots: { index: true, follow: true },
};

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: site.name,
  url: site.url,
  jobTitle: site.role,
  email: `mailto:${site.email}`,
  description: site.description,
  sameAs: links.filter((l) => l.id !== "resume").map((l) => l.href),
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${newsreader.variable} ${GeistSans.variable} ${GeistMono.variable}`}
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
        <script dangerouslySetInnerHTML={{ __html: motionScript }} />
      </head>
      <body className="min-h-dvh bg-paper font-sans text-ink antialiased">
        <a
          href="#main"
          className="sr-only z-50 bg-paper px-4 py-2 font-mono text-xs text-ink focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:border focus:border-hairline"
        >
          Skip to content
        </a>
        {children}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
      </body>
    </html>
  );
}
