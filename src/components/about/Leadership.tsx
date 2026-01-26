'use client';

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import Link from "next/link";
import Image from "next/image";
import Reveal from "@/components/effects/Reveal";
import { FadeIn, ScaleIn, SlideInLeft, SlideInRight } from "@/components/effects";

interface LeadershipAboutProps {
  className?: string;
}

function Section({
  className,
  children,
}: React.PropsWithChildren<{ className?: string }>) {
  return <section className={cn("py-16 md:py-24", className)}>{children}</section>;
}

export default function LeadershipAbout({ className }: LeadershipAboutProps) {
  const leaders = [
    {
      name: "Muhammad Sahrulloh Nursa'ban",
      position: "Ketua BEM FILKOM",
      division: "Kabinet Neogenesis",
      image: "/about/gub-filkom.webp",
      quote: "Bersama organisasi, kita belajar bertanggung jawab, berkolaborasi, dan berkontribusi untuk sesuatu yang lebih besar dari diri sendiri.",
    },
    {
      name: "Aulia Alhafidz",
      position: "Wakil Ketua BEM FILKOM",
      division: "Kabinet Neogenesis",
      image: "/about/wagub-filkom.webp",
      quote: "Disini saya belajar bahwa menjadi nomor dua itu lebih santai. Karena kalau ada masalah, yang disalahkan pasti nomor satu (Ketua).",
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
                Ketua Umum BEM FILKOM 2025
              </h2>
            </Reveal>
            <Reveal y={18} delay={180}>
              <p className="mt-3 text-muted-foreground max-w-2xl mx-auto">
                Ketua dan Wakil Ketua Kabinet Neogenesis memimpin BEM FILKOM sebagai organisasi mahasiswa, dengan fokus membawa perubahan positif melalui program yang berkelanjutan.
              </p>
            </Reveal>
          </div>
        </FadeIn>

        {/* Grid card leadership */}
        <div className="grid gap-8 md:grid-cols-2 max-w-4xl mx-auto">
          {leaders.map((leader, index) => (
            <Reveal y={25} delay={index * 200 + 300} key={leader.name}>
              <ScaleIn delay={index * 200 + 400}> {/* ← hapus scaleFrom biar error hilang */}
                <Card className="h-full overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
                  <CardHeader className="flex justify-center p-6 pb-4">
                    <div className="max-w-xs w-full mx-auto">
                      <SlideInLeft delay={index * 200 + 500}>
                        <Image
                          src={leader.image}
                          alt={`${leader.name}, ${leader.position}`}
                          width={500}
                          height={500}
                          className="w-full h-auto object-contain rounded-lg shadow-md transition-transform duration-500 hover:scale-105"
                          style={{ aspectRatio: "1/1" }}
                        />
                      </SlideInLeft>
                    </div>
                  </CardHeader>

                  <CardContent className="text-center space-y-4">
                    <SlideInRight delay={index * 200 + 600}>
                      <CardTitle className="text-lg font-bold">{leader.name}</CardTitle>
                    </SlideInRight>

                    <SlideInLeft delay={index * 200 + 650}>
                      <CardDescription className="font-medium text-primary">
                        {leader.position}
                      </CardDescription>
                    </SlideInLeft>

                    <FadeIn delay={index * 200 + 700}>
                      <Badge variant="secondary" className="w-fit mx-auto">
                        {leader.division}
                      </Badge>
                    </FadeIn>

                    <Reveal y={15} delay={index * 200 + 750}>
                      <blockquote className="border-l-4 border-primary pl-4 italic text-sm text-foreground">
                        "{leader.quote}"
                        <footer className="mt-2 text-xs text-muted-foreground">— {leader.name}</footer>
                      </blockquote>
                    </Reveal>

                    <Reveal y={10} delay={index * 200 + 850}>
                      <Button
                        asChild
                        variant="outline"
                        size="sm"
                        className="w-full mt-2"
                      >
                        <Link href="/contact?role=leadership">
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