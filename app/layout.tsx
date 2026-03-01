import type { Metadata } from "next";
// import { Manrope } from "next/font/google";
import "./globals.css";
import "bootstrap-icons/font/bootstrap-icons.min.css";

import Footer from "@/components/ui/footer";
import Dragon from "@/components/ui/dragon/dragon";
import Navbar from "@/components/ui/navbar";
import site from "@/config/site";
import SearchModal from "@/components/modals/search";
// import Banner from "@/components/ui/banner/banner";

// const manrope = Manrope({ subsets: ["latin"] });

const BASE_URL = site.url;

export const metadata: Metadata = {
  title: {
    default: "NEAR Catalog - Explore NEAR Projects",
    template: "%s - NEAR Catalog",
  },
  description:
    "NEAR Catalog is #1 ecosystem directory for NEAR Protocol, showcasing NEAR projects, teams, people and contributors.",
  metadataBase: new URL(BASE_URL),
  alternates: {
    canonical: './'
  },
  keywords: [
    "NEAR",
    "NEAR Protocol",
    "NEAR Catalog",
    "NEAR Projects",
    "NEAR Ecosystem",
    "NEAR dApps",
    "NEAR DeFi",
    "NEAR AI",
    "NEAR Intents",
    "NEAR Chain Abstraction",
    "blockchain directory",
    "crypto projects",
    "Web3 applications",
    "NEAR Community",
    "NEAR People",
    ],
  authors: [
    {
      name: "NEAR Catalog",
      url: BASE_URL,
    },
  ],
  creator: "@nearcatalog",
  manifest: "/manifest.webmanifest",
  twitter: {
    card: "summary_large_image",
    site: "@nearcatalog",
    creator: "@nearcatalog",
    title: "NEAR Catalog - Explore NEAR Projects, People and mores",
    description: "NEAR Catalog is #1 ecosystem directory for NEAR Protocol, showcasing NEAR projects, teams, people and contributors.",
    images: [
      {
        url: `${BASE_URL}/og-image.webp`,
        width: 1200,
        height: 630,
        alt: "NEAR Catalog - NEAR Ecosystem Directory"
      }
    ]
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: BASE_URL,
    title: "NEAR Catalog - Discover NEAR Projects, People and mores",
    description: "NEAR Catalog is #1 ecosystem directory for NEAR Protocol, showcasing NEAR projects, teams, people and contributors.",
    siteName: "NEAR Catalog",
    images: [
      {
        url: `${BASE_URL}/og-image.webp`,
        width: 1200,
        height: 630,
        alt: "NEAR Catalog - NEAR Ecosystem Directory"
      }
    ]
  }
};

interface RootLayoutProps {
  children: React.ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "NEAR Catalog",
    "url": BASE_URL,
    "logo": `${BASE_URL}/favicon.ico`,
    "sameAs": [
      "https://x.com/nearcatalog",
      "https://github.com/nearcatalog",
      "https://t.me/nearcatalogchat"
    ],
    "description": "NEAR Catalog is #1 ecosystem directory for NEAR Protocol, showcasing NEAR projects, teams, people and contributors.",
    "contact": {
      "@type": "ContactPoint",
      "url": BASE_URL,
      "contactType": "Customer Service"
    }
  };

  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
      </head>
      <body className={` min-h-screen bg-black font-sans antialiased`}
      >
        <div className="bg-background relative flex min-h-screen flex-col">
          <Navbar />
          <div className="flex-grow">{children}</div>
          <SearchModal />
          <Footer />
          <Dragon/>
        </div>
        {/* <Banner/> */}
      </body>
    </html>
  );
}
