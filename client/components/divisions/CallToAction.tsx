import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Link } from "react-router-dom";

interface CallToActionDivisionsProps {
  className?: string;
}

function Section({
  className,
  children,
}: React.PropsWithChildren<{ className?: string }>) {
  return <section className={cn("py-16 md:py-24", className)}>{children}</section>;
}

export default function CallToActionDivisions({ className }: CallToActionDivisionsProps) {
  return (
    <Section className={cn("relative bg-gradient-to-b from-background to-muted/30", className)}>
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(60%_50%_at_50%_0%,hsl(var(--accent)/0.08),transparent_70%)]" />
      <div className="container text-center max-w-3xl">
        <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight">
          Siap Gabung & Buat Perubahan?
        </h2>
        <p className="mt-3 text-muted-foreground">
          Bergabunglah dengan tim dinamis BEM FILKOM pilih divisi sesuai passion dan skill kamu
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