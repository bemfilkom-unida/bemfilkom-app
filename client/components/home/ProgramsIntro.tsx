import { cn } from "@/lib/utils";
import Reveal from "@/components/effects/Reveal";
import { Users, Rocket, Lightbulb, Sprout, LucideProps } from "lucide-react";
import { ComponentProps } from "react";

interface ProgramsIntroProps {
  className?: string;
}

interface IntroPoint {
  text: string;
  Icon: React.ComponentType<LucideProps>;
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
  const introPoints: IntroPoint[] = [
    {
      text: "BEM FILKOM UNIDA merupakan organisasi mahasiswa yang menjalankan fungsi eksekutif di lingkungan Fakultas Ilmu Komputer Universitas Djuanda.",
      Icon: Users,
    },
    {
      text: "Kami berkomitmen untuk menjadi wadah yang aktif, solutif, dan progresif dalam mengembangkan potensi serta keterampilan mahasiswa di FILKOM.",
      Icon: Rocket,
    },
    {
      text: "Menciptakan dampak positif bagi lingkungan kampus dan masyarakat luas melalui inisiatif-inisiatif inovatif yang berdampak nyata dan berkelanjutan.",
      Icon: Lightbulb,
    },
    {
      text: "Memulai era baru bersama Kabinet Neogenesis dengan fokus utama pada kolaborasi, pemanfaatan teknologi, dan pengembangan diri mahasiswa.",
      Icon: Sprout,
    },
  ];

  return (
    <Section id="main-programs" className={cn("pt-10 md:pt-14 bg-gradient-to-b from-background to-muted/10 pb-20", className)}>
      <div className="container">
        <div className="text-center max-w-4xl mx-auto mb-12 md:mb-16">
          <Reveal y={12}>
            <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4">
              Awal dari Sebuah Perubahan
            </h2>
          </Reveal>
          <Reveal y={12} delay={100}>
            <h3 className="text-3xl md:text-4xl font-bold tracking-tight text-primary">
              {title}
            </h3>
          </Reveal>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 max-w-5xl mx-auto">
          {introPoints.map((point, idx) => (
            <Reveal key={idx} y={16} delay={idx * 100}>
              <div className="bg-card/80 backdrop-blur-sm rounded-xl border border-border/50 p-6 md:p-8 shadow-sm hover:shadow-md transition-shadow min-h-48 md:min-h-56 flex flex-col justify-between">
                <div className="flex items-start gap-4 mb-3">
                  <point.Icon className="text-3xl md:text-4xl flex-shrink-0 mt-0.5 text-primary h-8 w-8 md:h-10 md:w-10" />
                  <p className="text-lg md:text-xl text-foreground leading-relaxed line-clamp-3 md:line-clamp-none flex-1">
                    {point.text}
                  </p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
        <div className="mt-12 pt-8 border-t border-muted/30" />
      </div>
    </Section>
  );
}