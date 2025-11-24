import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import Reveal from "@/components/effects/Reveal";

interface ValuesAboutProps {
  className?: string;
}

function Section({
  className,
  children,
}: React.PropsWithChildren<{ className?: string }>) {
  return <section className={cn("py-16 md:py-24", className)}>{children}</section>;
}

export default function ValuesAbout({ className }: ValuesAboutProps) {
  const values = [
    {
      title: "Local Wisdom",
      description: "Kami hormati & integrasikan budaya lokal, tradisi, dan pengetahuan daerah untuk kuatkan identitas komunitas FILKOM yang berakar kuat.",
      icon: (
        <svg viewBox="0 0 24 24" className="size-6" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M3 7l9-4 9 4-9 4-9-4z" />
          <path d="M21 10v6" />
          <path d="M3 10v6l9 4 9-4" />
        </svg>
      ),
    },
    {
      title: "National Wisdom",
      description: "Junjung nilai persatuan bangsa, bangun kebanggaan & tanggung jawab untuk kemajuan Indonesia melalui inovasi tech berkelanjutan.",
      icon: (
        <svg viewBox="0 0 24 24" className="size-6" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
        </svg>
      ),
    },
    {
      title: "Global Wisdom",
      description: "Peluk perspektif internasional & adaptasi standar dunia, kontribusi pada kemajuan global sambil jaga esensi Tauhid.",
      icon: (
        <svg viewBox="0 0 24 24" className="size-6" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-13h2v6h-2zm0 8h2v2h-2z" />
        </svg>
      ),
    },
    {
      title: "Spiritual Wisdom",
      description: "Tanam nilai Siddiq, Amanah, Tabligh, Fathonah—promosikan etika, empati, & istiqomah dalam setiap aksi tech kami.",
      icon: (
        <svg viewBox="0 0 24 24" className="size-6" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="12" cy="12" r="10" />
          <line x1="12" y1="2" x2="12" y2="22" />
          <line x1="4.93" y1="4.93" x2="19.07" y2="19.07" />
          <line x1="19.07" y1="4.93" x2="4.93" y2="19.07" />
          <line x1="2" y1="12" x2="22" y2="12" />
        </svg>
      ),
    },
  ];

  return (
    <Section className={cn("relative", className)}>
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(60%_50%_at_50%_0%,hsl(var(--accent)/0.08),transparent_70%)]" />
      <div className="container">
        <div className="text-center mb-12">
          <Reveal y={16}>
            <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight">Nilai-Nilai yang Harus Dijunjung Tinggi</h2>
          </Reveal>
          <Reveal y={16} delay={100}>
            <p className="mt-3 text-muted-foreground max-w-2xl mx-auto">
              Prinsip dasar yang membimbing tindakan kami dan membentuk budaya organisasi.
            </p>
          </Reveal>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-2">
          {values.map((value, index) => (
            <Reveal key={value.title} y={20} delay={150 + index * 50}>
              <Card className="h-full group hover:shadow-md transition-shadow">
                <CardHeader>
                  <div className="flex size-12 items-center justify-center rounded-lg bg-gradient-to-br from-primary/10 to-accent/10 text-primary group-hover:scale-110 transition-transform">
                    {value.icon}
                  </div>
                  <CardTitle className="text-xl">{value.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground leading-relaxed">{value.description}</p>
                </CardContent>
              </Card>
            </Reveal>
          ))}
        </div>
      </div>
    </Section>
  );
}