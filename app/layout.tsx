import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import "./globals.css";

export const metadata: Metadata = {
  title: "Lhiam Andrei Lingco — Full Stack Web Developer",
  description:
    "Full Stack Web Developer & Open-Source Contributor based in Bacolod, Philippines. Architecting scalable web ecosystems with Next.js, TypeScript, and Supabase.",
  metadataBase: new URL("https://github.com/seolyam"),
  openGraph: {
    title: "Lhiam Andrei Lingco — Full Stack Web Developer",
    description:
      "Full Stack Web Developer & Open-Source Contributor based in Bacolod, Philippines.",
    type: "website",
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${GeistSans.variable} ${GeistMono.variable}`}>
      <body className="min-h-dvh font-sans text-zinc-300 antialiased">
        {children}
      </body>
    </html>
  );
}
