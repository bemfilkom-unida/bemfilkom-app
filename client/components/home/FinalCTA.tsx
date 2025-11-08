import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Link } from "react-router-dom";
import Reveal from "@/components/effects/Reveal";

interface FinalCTAProps {
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

export default function FinalCTA({ className }: FinalCTAProps) {
  return (
    <Section className={cn("relative bg-gradient-to-b from-background via-background to-muted/20", className)}>
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(60%_50%_at_50%_0%,hsl(var(--accent)/0.05),transparent_80%)]" />
      <div className="container text-center max-w-3xl">
        <Reveal y={16}>
          <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight">
            Mari berkolaborasi dalam gerakan mahasiswa FILKOM untuk mewujudkan
            inovasi dan kemajuan bersama
          </h2>
        </Reveal>
        <Reveal y={16} delay={100}>
          <p className="mt-3 text-muted-foreground leading-relaxed">
            Bersama kita wujudkan ruang kolaborasi yang terbuka bagi ide dan
            kreativitas. Setiap langkah kecil akan menjadi bagian dari perubahan
            besar bagi kampus dan masyarakat
          </p>
        </Reveal>
        <Reveal y={18} delay={200}>
          <div className="mt-8 flex items-center justify-center gap-3">
            <Button
              asChild
              className="shadow bg-accent text-accent-foreground hover:bg-accent/90"
            >
              <Link to="/divisions">Lihat Divisi Kami</Link>
            </Button>
            <Button asChild variant="outline">
              <Link to="/contact">Mari Berkolaborasi</Link>
            </Button>
          </div>
        </Reveal>
      </div>
    </Section>
  );
}