'use client';

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import Link from "next/link";
import Image from "next/image";
import Reveal from "@/components/effects/Reveal";
import { FadeIn, ScaleIn, SlideInLeft, SlideInRight } from "@/components/effects";

interface ExecutiveBoardProps {
  className?: string;
}

function Section({
  className,
  children,
}: React.PropsWithChildren<{ className?: string }>) {
  return <section className={cn("py-16 md:py-24", className)}>{children}</section>;
}

export default function ExecutiveBoard({ className }: ExecutiveBoardProps) {
  const leadershipPairs = [
    {
      group: "Gubernur BEM",
      names: ["Muhammad Sahrullah Nursa'ban", "Aulia Alhafidz"],
      positions: ["Ketua Umum & Wakil"],
      roles: ["Pemimpin Visi", "Pendukung Operasional"],
      images: ["/divisions/piwpiw.webp"],
      color: "from-blue-500/20 to-cyan-500/20",
    },
    {
      group: "Sekretariat",
      names: ["Nayla Awalia Syafitri", "Arinda Setyo Rini"],
      positions: ["Sekretaris 1 & 2"],
      roles: ["Pengelola Dokumentasi"],
      images: ["/divisions/sekre-bem.jpeg"],
      color: "from-green-500/20 to-emerald-500/20",
    },
    {
      group: "Bendahara",
      names: ["Abilpa Siti Kholifah"],
      positions: ["Bendahara"],
      roles: ["Pengelola Keuangan"],
      images: ["/divisions/bendahara.jpeg"],
      color: "from-orange-500/20 to-red-500/20",
    },
  ];

  return (
    <Section className={className}>
      <div className="container">
        {/* Judul section */}
        <FadeIn delay={0}>
          <div className="text-center mb-12">
            <Reveal y={18} delay={100}>
              <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight">
                Dewan Eksekutif
              </h2>
            </Reveal>
            <Reveal y={18} delay={180}>
              <p className="mt-3 text-muted-foreground max-w-2xl mx-auto">
                Tim eksekutif yang mengelola operasional harian untuk mendukung program BEM FILKOM.
              </p>
            </Reveal>
          </div>
        </FadeIn>

        {/* Grid card */}
        <div className="grid gap-8 sm:grid-cols-1 md:grid-cols-3">
          {leadershipPairs.map((pair, index) => (
            <Reveal y={30} delay={index * 250 + 300} key={pair.group}>
              <ScaleIn delay={index * 250 + 400}>
                <Card className="h-full overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-2">
                  <CardHeader className="text-center pb-4">
                    {/* Foto */}
                    <SlideInLeft delay={index * 250 + 500}>
                      <div className="flex flex-col items-center md:flex-row gap-4 mb-4 justify-center">
                        {pair.images.map((imgSrc, imgIdx) => (
                          <div
                            key={imgIdx}
                            className={cn(
                              "aspect-[3/3] w-64 md:w-52 h-auto overflow-hidden rounded-lg bg-gradient-to-br",
                              pair.color,
                              "flex-shrink-0 border border-border/50 relative shadow-md"
                            )}
                            aria-label={`Foto ${pair.names[imgIdx]}`}
                          >
                            <Image
                              src={imgSrc}
                              alt={`${pair.names[imgIdx]} - ${pair.positions[imgIdx] || pair.positions[0]}`}
                              fill
                              className="object-cover transition-transform duration-500 hover:scale-110"
                              sizes="(max-width: 768px) 100vw, 33vw"
                            />
                          </div>
                        ))}
                      </div>
                    </SlideInLeft>

                    {/* Nama & Jabatan */}
                    <div className="space-y-2">
                      <SlideInRight delay={index * 250 + 600}>
                        <div className="space-y-1">
                          {pair.names.map((name, idx) => (
                            <CardTitle key={idx} className="text-lg leading-tight font-bold">
                              {name}
                            </CardTitle>
                          ))}
                        </div>
                      </SlideInRight>

                      <SlideInLeft delay={index * 250 + 650}>
                        <div className="space-y-1">
                          {pair.positions.map((position, idx) => (
                            <CardDescription key={idx} className="font-medium text-primary">
                              {position}
                            </CardDescription>
                          ))}
                        </div>
                      </SlideInLeft>

                      <FadeIn delay={index * 250 + 700}>
                        <Badge variant="secondary" className="w-fit mx-auto text-xs mt-2">
                          {pair.roles.join(" & ")}
                        </Badge>
                      </FadeIn>
                    </div>
                  </CardHeader>

                  <CardContent className="space-y-4 text-center">
                    {/* Deskripsi (kosong di kode asli, bisa diisi kalau perlu) */}
                    <Reveal y={15} delay={index * 250 + 750}>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        {/* Tambahkan deskripsi kalau ada, misal: */}
                        {/* "Tim ini bertanggung jawab atas koordinasi dan eksekusi program harian." */}
                      </p>
                    </Reveal>

                    {/* Tombol (tambahan opsional kalau mau kolaborasi) */}
                    <Reveal y={10} delay={index * 250 + 850}>
                      <Button
                        asChild
                        variant="outline"
                        size="sm"
                        className="w-full mt-4"
                      >
                        <Link href="/contact?role=executive">
                          Kolaborasi dengan Tim
                        </Link>
                      </Button>
                    </Reveal>
                  </CardContent>
                </Card>
              </ScaleIn>
            </Reveal>
          ))}
        </div>
      </div>
    </Section>
  );
}