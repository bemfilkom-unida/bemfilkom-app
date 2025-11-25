import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

// Optimize font loading with display swap
const inter = Inter({ 
  subsets: ["latin"],
  display: 'swap',
  variable: '--font-inter'
});

export const metadata: Metadata = {
  title: "BEM FILKOM UNIDA",
  description: "Badan Eksekutif Mahasiswa Fakultas Ilmu Komputer Universitas Djuanda",
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://bemfilkom.unida.ac.id'),
  icons: {
    icon: [
      { url: '/logo/icon-bem.svg', type: 'image/svg+xml' },
      { url: '/logo/favicon.ico', sizes: 'any' }
    ],
    apple: '/logo/icon-bem.png',
  },
  manifest: '/manifest.json',
  openGraph: {
    title: 'BEM FILKOM UNIDA',
    description: 'Badan Eksekutif Mahasiswa Fakultas Ilmu Komputer Universitas Djuanda',
    url: process.env.NEXT_PUBLIC_SITE_URL,
    siteName: 'BEM FILKOM UNIDA',
    locale: 'id_ID',
    type: 'website',
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  themeColor: '#1E40AF',
};

import SiteHeader from "@/components/layout/SiteHeader";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" suppressHydrationWarning className={inter.variable}>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="preload" as="image" href="/logo/icon-bem.svg" />
      </head>
      <body className={`font-sans antialiased ${inter.className}`}>
        <SiteHeader />
        <main className="min-h-[calc(100vh-4rem)]">
          {children}
        </main>
      </body>
    </html>
  );
}