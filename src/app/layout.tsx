import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ErrorBoundary } from "@/components/ErrorBoundary";
import SiteHeader from "@/components/layout/SiteHeader";
import ScrollToTop from "@/components/layout/ScrollToTop";
import StickySidebar from "@/components/layout/StickySidebar";

// Optimize font loading with display swap strategy
const inter = Inter({ 
  subsets: ["latin"],
  display: 'swap',
  variable: '--font-inter',
  preload: false,
  fallback: ['system-ui', 'arial'],
});

export const metadata: Metadata = {
  title: "BEM FILKOM UNIDA",
  description: "Badan Eksekutif Mahasiswa Fakultas Ilmu Komputer Universitas Djuanda",
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://bemfilkom-unida.my.id'),
  icons: {
    icon: [
      { url: '/logo/icon-bem.svg', type: 'image/svg+xml' },
    ],
    apple: '/logo/icon-bem.png',
  },
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
  minimumScale: 1,
  maximumScale: 5,
  userScalable: true,
  themeColor: '#1E40AF',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" suppressHydrationWarning className={inter.variable} data-scroll-behavior="smooth">
      <head>
        {/* Preconnect to Google Fonts origins for faster font loading */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
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