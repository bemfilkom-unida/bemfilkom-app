import { cn } from "@/lib/utils";
import Reveal from "@/components/effects/Reveal";

interface VisionMissionProps {
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

export default function VisionMission({ className }: VisionMissionProps) {
  const missionPoints: string[] = [
    "Meneruskan dan menyempurnakan program-program kerja BEM sebelumnya dengan penguatan sistem, evaluasi rutin, dan keberlanjutan dampak.",
    "Mengembangkan lingkungan organisasi yang kolaboratif dan profesional, baik secara internal antar bidang maupun eksternal dengan organisasi lain di dalam dan luar kampus.",
    "Mendorong lahirnya kegiatan kreatif dan inovatif yang relevan dengan kebutuhan mahasiswa dan perkembangan dunia teknologi.",
    "Menjadi jembatan aspirasi mahasiswa Fakultas Ilmu Komputer secara aktif dan responsif melalui sistem komunikasi yang terbuka dan terstruktur.",
    "Membumikan nilai-nilai keilmuan dan 21 karakter bertauhid dalam setiap program kerja, baik dalam kegiatan akademik, sosial, maupun pengembangan diri.",
  ];

  return (
    <Section className={cn("pt-6 md:pt-8", className)}>
      <div className="container">
        <div className="text-center max-w-3xl mx-auto">
          <Reveal y={12}>
            <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight">
              Arah Strategis Kabinet Neogenesis
            </h2>
          </Reveal>
        </div>
        <div className="mt-6 space-y-4"> {/* Rapikan: mt-6 & space-y-4 */}
          <Reveal y={14}>
            <div className="rounded-xl border bg-card p-5 md:p-6"> {/* Rapikan padding */}
              <div className="flex items-center gap-3 mb-3">
                <div className="size-8 rounded-full bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center">
                  <svg
                    viewBox="0 0 24 24"
                    className="size-3.5" // Rapikan svg size
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                    <circle cx="12" cy="12" r="3" />
                  </svg>
                </div>
                <h3 className="text-xl md:text-2xl font-bold tracking-tight"> {/* Rapikan h3 size */}
                  Visi
                </h3>
              </div>
              <p className="text-sm md:text-base text-muted-foreground leading-relaxed"> {/* Rapikan text size */}
                Mewujudkan BEM Fakultas Ilmu Komputer yang berkelanjutan,
                progresif, dan berdaya guna sebagai wadah pengembangan potensi,
                inovasi, serta penguatan karakter mahasiswa yang berlandaskan
                nilai-nilai keilmuan dan 21 karakter bertauhid.
              </p>
            </div>
          </Reveal>
          <Reveal y={14} delay={120}>
            <div className="rounded-xl border bg-card p-5 md:p-6"> {/* Sama padding */}
              <div className="flex items-center gap-3 mb-3">
                <div className="size-8 rounded-full bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center">
                  <svg
                    viewBox="0 0 24 24"
                    className="size-3.5" // Rapikan svg size
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                  </svg>
                </div>
                <h3 className="text-xl md:text-2xl font-bold tracking-tight"> {/* Rapikan h3 size */}
                  Misi
                </h3>
              </div>
              <ul className="space-y-2 text-sm md:text-base text-muted-foreground"> {/* Rapikan text & space-y-2 */}
                {missionPoints.map((point, idx) => (
                  <li key={idx} className="flex gap-2">
                    <span className="text-primary">•</span>
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>
      </div>
    </Section>
  );
}