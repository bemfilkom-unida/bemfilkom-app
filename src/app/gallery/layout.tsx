import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Showup | BEM FILKOM UNIDA",
  description: "Galeri karya mahasiswa dan showcase proyek LDKM FILKOM UNIDA.",
};

export default function GalleryLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return children;
}
