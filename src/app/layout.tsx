import type { Metadata, Viewport } from "next";
import { Inter, JetBrains_Mono, Poppins } from "next/font/google";
import type { ReactNode } from "react";
import { Footer } from "@/components/layout/Footer";
import { Navbar } from "@/components/layout/Navbar";
import { getProfile } from "@/lib/content";
import { siteName, siteUrl } from "@/lib/site";
import { Providers } from "./providers";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" });
const poppins = Poppins({ subsets: ["latin"], weight: ["500", "600", "700"], variable: "--font-poppins", display: "swap" });
const jetbrains = JetBrains_Mono({ subsets: ["latin"], variable: "--font-jetbrains", display: "swap" });

export async function generateMetadata(): Promise<Metadata> {
  const profile = await getProfile();
  const description = `${profile.name} — ${profile.role}. ${profile.summary}`;
  return {
    metadataBase: new URL(siteUrl),
    title: { default: `${siteName} · ${profile.role}`, template: `%s · ${siteName}` },
    description,
    applicationName: siteName,
    authors: [{ name: profile.name, url: siteUrl }],
    creator: profile.name,
    keywords: ["data analyst", "machine learning", "python", "sql", "power bi", "portfolio", profile.name],
    alternates: { canonical: "/" },
    openGraph: { type: "website", siteName, locale: "en_IN", url: "/", title: siteName, description },
    twitter: { card: "summary_large_image", title: siteName, description },
    robots: { index: true, follow: true },
  };
}

export const viewport: Viewport = {
  themeColor: "#0b0b16",
  colorScheme: "dark",
};

export default async function RootLayout({ children }: { children: ReactNode }) {
  const profile = await getProfile();
  const [firstName, ...rest] = profile.name.split(" ");

  const personJsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: profile.name,
    jobTitle: profile.role,
    url: siteUrl,
    image: `${siteUrl}${profile.image}`,
    email: `mailto:${profile.email}`,
    address: { "@type": "PostalAddress", addressRegion: profile.location },
    sameAs: profile.socials.map((s) => s.url),
  };

  return (
    <html lang="en" className={`${inter.variable} ${poppins.variable} ${jetbrains.variable}`}>
      <body className="min-h-dvh">
        <a
          href="#main"
          className="sr-only z-[100] rounded-full bg-primary px-4 py-2 text-sm font-medium text-white focus:not-sr-only focus:fixed focus:top-3 focus:left-3"
        >
          Skip to content
        </a>
        <Providers>
          <Navbar firstName={firstName} lastName={rest.join(" ")} resume={profile.resume} />
          <main id="main" tabIndex={-1} className="outline-none">
            {children}
          </main>
          <Footer />
        </Providers>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }} />
      </body>
    </html>
  );
}
