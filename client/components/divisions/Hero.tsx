import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Link } from "react-router-dom";

interface HeroDivisionsProps {
  className?: string;
}

function Section({
  className,
  children,
}: React.PropsWithChildren<{ className?: string }>) {
  return <section className={cn("py-16 md:py-24", className)}>{children}</section>;
}

export default function HeroDivisions({ className }: HeroDivisionsProps) {
  return (
    <Section className={cn("relative overflow-hidden", className)}>
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-transparent to-transparent" />
        <div className="absolute -top-32 left-1/2 size-[550px] -translate-x-1/2 rounded-full bg-[radial-gradient(circle_at_center,hsl(var(--accent)/0.25),transparent_60%)] blur-3xl" />
      </div>
      <div className="container max-w-4xl text-center">
        <div className="inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs text-foreground/70 bg-background/60 backdrop-blur">
          <span className="size-2 rounded-full bg-primary" /> Struktur Organisasi
        </div>
        <h1 className="mt-4 text-4xl md:text-6xl font-extrabold leading-tight tracking-tight">
        Profil Kepengurusan
        </h1>
        <p className="mt-4 text-lg text-muted-foreground max-w-3xl mx-auto">
        Di balik setiap inovasi dan program BEM FILKOM, ada tim kolaboratif yang mewujudkan visi Neogenesis untuk kemajuan FILKOM UNIDA. Setiap divisi menjadi pilar kuat, mendorong kesejahteraan mahasiswa melalui teknologi inovatif.
        </p>
        <div className="mt-8 flex flex-wrap gap-3 justify-center">
          <Button asChild className="shadow bg-accent text-accent-foreground hover:bg-accent/90">
            <Link to="/contact">Mari Berkolaborasi</Link>
          </Button>
          <Button asChild variant="outline">
            <Link to="/gallery">Lihat Keseruan Kami</Link>
          </Button>
        </div>
      </div>
    </Section>
  );
}