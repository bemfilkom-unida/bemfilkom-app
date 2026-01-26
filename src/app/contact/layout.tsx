import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "BEM FILKOM UNIDA",
  description: "Hubungi BEM FILKOM UNIDA untuk kolaborasi, informasi, dan pertanyaan.",
};

export default function ContactLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return children;
}
