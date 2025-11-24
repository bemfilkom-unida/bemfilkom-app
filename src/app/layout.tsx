import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "BEM FILKOM UNIDA",
  description: "Badan Eksekutif Mahasiswa Fakultas Ilmu Komputer Universitas Djuanda",
  icons: {
    icon: '/logo/icon-bem.svg',
    shortcut: '/logo/icon-bem.svg',
    apple: '/logo/icon-bem.svg',
  },
  manifest: '/manifest.json',
};

import SiteHeader from "@/components/layout/SiteHeader";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" suppressHydrationWarning>
      <body className={inter.className}>
        <SiteHeader />
        {children}
      </body>
    </html>
  );
}