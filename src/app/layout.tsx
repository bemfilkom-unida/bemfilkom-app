import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ErrorBoundary } from "@/components/ErrorBoundary";

// Optimize font loading with display swap and preload
const inter = Inter({ 
  subsets: ["latin"],
  display: 'swap',
  variable: '--font-inter',
  preload: true,
  fallback: ['system-ui', 'arial'],
});

export const metadata: Metadata = {
  title: "BEM FILKOM UNIDA",
  description: "Badan Eksekutif Mahasiswa Fakultas Ilmu Komputer Universitas Djuanda",
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://bemfilkom-unida.my.id'),
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
    images: [
      {
        url: '/logo/icon-bem.png',
        width: 512,
        height: 512,
        alt: 'BEM FILKOM UNIDA',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'BEM FILKOM UNIDA',
    description: 'Badan Eksekutif Mahasiswa Fakultas Ilmu Komputer Universitas Djuanda',
    images: ['/logo/icon-bem.png'],
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
import ScrollToTop from "@/components/layout/ScrollToTop";
import StickySidebar from "@/components/layout/StickySidebar";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" suppressHydrationWarning className={inter.variable} data-scroll-behavior="smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://fonts.googleapis.com" />
        <link rel="dns-prefetch" href="https://fonts.gstatic.com" />
      </head>
      <body className={`font-sans antialiased ${inter.className}`}>
        <ErrorBoundary>
          <SiteHeader />
          <StickySidebar />
          <main className="min-h-[calc(100vh-4rem)]">
            {children}
          </main>
          <ScrollToTop />
        </ErrorBoundary>
      </body>
    </html>
  );
}