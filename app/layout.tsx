import type { Metadata, Viewport } from "next";

import "./globals.css";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { Toaster } from "@/components/ui/sonner";
import { siteConfig } from "@/config/site";
import { poppins, surgena } from "@/lib/fonts";

const title = `${siteConfig.name} | Cabinet de conseil en ressources humaines à ${siteConfig.contact.city}`;
const description =
  "azurya accompagne les TPE, PME et directions RH : stratégie RH, entretiens professionnels, compétences et formation, conformité, rémunération et appui RH externalisé.";

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: { default: title, template: `%s | ${siteConfig.name}` },
  description,
  applicationName: siteConfig.name,
  authors: [{ name: siteConfig.consultant.fullName }],
  creator: siteConfig.consultant.fullName,
  keywords: [
    "conseil RH",
    "consultante RH Rouen",
    "cabinet RH Normandie",
    "entretiens professionnels",
    "gestion des compétences",
    "RH externalisée",
    "conformité RH",
    "politique de rémunération",
  ],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: siteConfig.locale,
    url: "/",
    siteName: siteConfig.name,
    title,
    description,
    images: [{ url: "/og.png", width: 1200, height: 630, alt: "azurya, consulting ressources humaines" }],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: ["/og.png"],
  },
  robots: { index: true, follow: true },
  formatDetection: { telephone: false, email: false, address: false },
};

export const viewport: Viewport = {
  themeColor: "#74569C",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="fr" className={`${poppins.variable} ${surgena.variable}`}>
      <body className="min-h-dvh overflow-x-clip">
        <a
          href="#contenu"
          className="fixed top-3 left-3 z-[60] -translate-y-24 rounded-full bg-ink px-5 py-3 text-sm text-white transition-transform focus-visible:translate-y-0"
        >
          Aller au contenu
        </a>
        <SiteHeader />
        <div id="contenu" tabIndex={-1} className="outline-none">
          {children}
        </div>
        <SiteFooter />
        <Toaster />
      </body>
    </html>
  );
}
