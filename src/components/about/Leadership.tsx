import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import Link from "next/link";
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
      image: "/about/ketu.webp",
      quote: "Bersama organisasi, kita belajar bertanggung jawab, berkolaborasi, dan berkontribusi untuk sesuatu yang lebih besar dari diri sendiri.",
    },
    {
      name: "Aulia Alhafidz",
      position: "Wakil Ketua BEM FILKOM",
      division: "Kabinet Neogenesis",
      image: "/about/watum.jpeg",
      quote: "Disini saya belajar bahwa menjadi nomor dua itu lebih santai. Karena kalau ada masalah, yang disalahkan pasti nomor satu (Ketua).",
    },
  ];

  return (
    <Section className={className}>
      <div className="container">
        <FadeIn delay={0}>
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight">Ketua Umum BEM FILKOM 2025</h2>
            <p className="mt-3 text-muted-foreground max-w-2xl mx-auto">
              Ketua dan Wakil Ketua Kabinet Neogenesis memimpin BEM FILKOM sebagai organisasi mahasiswa, dengan fokus membawa perubahan positif melalui program yang berkelanjutan.
            </p>
          </div>
        </FadeIn>
        <div className="grid gap-8 md:grid-cols-2 max-w-4xl mx-auto">
          {leaders.map((leader, index) => (
            <ScaleIn key={leader.name} delay={index * 200}>
              <Card className="h-full">
                <CardHeader className="flex justify-center p-6">
                  <div className="max-w-xs w-full mx-auto">
                    <img
                      src={leader.image}
                      alt={`${leader.name}, ${leader.position}`}
                      className="w-full h-auto object-contain rounded-lg shadow-md"
                      style={{ aspectRatio: "1/1" }}
                    />
                  </div>
                </CardHeader>
                <CardContent className="text-center space-y-3">
                  <CardTitle className="text-lg">{leader.name}</CardTitle>
                  <CardDescription className="font-medium text-primary">{leader.position}</CardDescription>
                  <Badge variant="secondary" className="w-fit mx-auto">{leader.division}</Badge>
                  <blockquote className="border-l-4 border-primary pl-4 italic text-sm text-foreground">
                    "{leader.quote}"
                    <footer className="mt-2 text-xs text-muted-foreground">— {leader.name}</footer>
                  </blockquote>
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
                </CardContent>
              </Card>
            </ScaleIn>
          ))}
        </div>
      </div>
    </Section>
  );
}