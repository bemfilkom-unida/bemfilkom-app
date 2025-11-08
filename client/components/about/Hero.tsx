import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Link } from "react-router-dom";
import Reveal from "@/components/effects/Reveal";

interface HeroAboutProps {
  className?: string;
}

function Section({
  className,
  children,
}: React.PropsWithChildren<{ className?: string }>) {
  return <section className={cn("py-16 md:py-24", className)}>{children}</section>;
}

export default function HeroAbout({ className }: HeroAboutProps) {
  return (
    <Section className={cn("relative overflow-hidden", className)}>
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-transparent to-transparent" />
        <div className="absolute -top-32 left-1/2 size-[550px] -translate-x-1/2 rounded-full bg-[radial-gradient(circle_at_center,hsl(var(--accent)/0.25),transparent_60%)] blur-3xl" />
      </div>
      <div className="container max-w-4xl text-center">
        <Reveal y={10} delay={50}>
          <div className="inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs text-foreground/70 bg-background/60 backdrop-blur">
            <span className="size-2 rounded-full bg-primary" /> Tentang BEM FILKOM
          </div>
        </Reveal>
        <Reveal y={18} delay={120}>
          <h1 className="mt-4 text-4xl md:text-6xl font-extrabold leading-tight tracking-tight">
            Bangkit Bersama <br/>BEM FILKOM UNIDA <br /> di Era Digital Tauhid
          </h1>
        </Reveal>
        <Reveal y={18} delay={200}>
          <p className="mt-4 text-lg text-muted-foreground max-w-3xl mx-auto">
          BEM FILKOM adalah organisasi mahasiswa Fakultas Ilmu Komputer Universitas Djuanda (UNIDA).Organisasi ini mewakili mahasiswa program Ilmu Komputer dan mendukung pengembangan inovasi yang mengintegrasikan teknologi dengan nilai-nilai Pancadarma.
          </p>
        </Reveal>
        <Reveal y={18} delay={260}>
          <div className="mt-8 flex flex-wrap gap-3 justify-center">
            <Button asChild className="shadow bg-accent text-accent-foreground hover:bg-accent/90" aria-label="Gabung Tim Kami">
              <Link to="/divisions">Lihat Divisi Kami</Link>
            </Button>
            <Button asChild variant="outline" aria-label="Hubungi Kami">
              <Link to="/contact">Mari Berkolaborasi</Link>
            </Button>
          </div>
        </Reveal>
      </div>
    </Section>
  );
}