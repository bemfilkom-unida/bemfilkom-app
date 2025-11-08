import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Link } from "react-router-dom";
import Reveal from "@/components/effects/Reveal";

interface CallToActionAboutProps {
  className?: string;
}

function Section({
  className,
  children,
}: React.PropsWithChildren<{ className?: string }>) {
  return <section className={cn("py-16 md:py-24", className)}>{children}</section>;
}

export default function CallToActionAbout({ className }: CallToActionAboutProps) {
  return (
    <Section className={cn("relative bg-gradient-to-b from-background to-muted/50", className)}>
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(60%_50%_at_50%_0%,hsl(var(--primary)/0.08),transparent_70%)]" />
      <div className="container text-center max-w-3xl">
        <Reveal y={16}>
          <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight">
            Siap Ubah FILKOM Jadi Lebih Unggul?
          </h2>
        </Reveal>
        <Reveal y={16} delay={100}>
          <p className="mt-3 text-muted-foreground">
           Gabung BEM FILKOM sekarang: Dukung pengembangan karir di bidang teknologi dan ciptakan dampak melalui nilai-nilai Pancadarma.
          </p>
        </Reveal>
        <Reveal y={18} delay={200}>
          <div className="mt-8 flex flex-wrap gap-3 justify-center">
            <Button asChild className="shadow bg-accent text-accent-foreground hover:bg-accent/90" aria-label="Jelajahi Divisi">
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