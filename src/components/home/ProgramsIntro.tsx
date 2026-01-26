'use client';

import { cn } from "@/lib/utils";
import { FadeIn } from "@/components/effects";
import { ComponentProps } from "react";

interface ProgramsIntroProps {
  className?: string;
}

function Section({
  className,
  id,
  children,
}: React.PropsWithChildren<{ className?: string; id?: string }>) {
  return (
    <section id={id} className={cn("py-16 md:py-24", className)} role="main">
      {children}
    </section>
  );
}

export default function ProgramsIntro({ className }: ProgramsIntroProps) {
  const title =
    "Badan Eksekutif Mahasiswa Fakultas Ilmu Komputer Universitas Djuanda";

  return (
    <Section 
      id="main-programs" 
      className={cn(
        "pt-10 md:pt-14 bg-gradient-to-b from-background to-muted/10 pb-20",
        className
      )}
    >
      <div className="container">
        <div className="text-center max-w-4xl mx-auto mb-12 md:mb-16">
          <FadeIn delay={0}>
            <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4">
              Awal dari Sebuah Perubahan
            </h2>
          </FadeIn>
          <FadeIn delay={200}>
            <h3 className="text-3xl md:text-4xl font-bold tracking-tight text-primary">
              {title}
            </h3>
          </FadeIn>
        </div>

        {/* Kamu bisa tambahkan konten lain di sini nanti kalau mau, misal paragraf deskripsi, gambar, atau call-to-action */}
        {/* Contoh placeholder sementara: */}
        

        <div className="mt-12 pt-8 border-t border-muted/30" />
      </div>
    </Section>
  );
}