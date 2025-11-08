import { cn } from "@/lib/utils";
import Reveal from "@/components/effects/Reveal";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

interface TimelineProps {
  className?: string;
}

interface TimelineEvent {
  date: string;
  title: string;
  desc: string;
  image: string;
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

export default function Timeline({ className }: TimelineProps) {
  const events: TimelineEvent[] = [
    {
      date: "Sep 2025",
      title: "Penyambutan Mahasiswa Baru 2025",
      desc: "Kegiatan menyambut dan memperkenalkan mahasiswa baru pada lingkungan Fakultas Ilmu Komputer.",
      image: "/assets/time-line/maba.JPG",
    },
    {
      date: "Nov 2025",
      title: "Kaderisasi Fakultas Ilmu Komputer",
      desc: "Memberikan wawasan IT serta menumbuhkan awareness dan kesiapan mahasiswa untuk jenjang selanjutnya.",
      image: "/assets/time-line/dekan.webp",
    },
    {
      date: "Des 2025",
      title: "LDKM Fakultas Ilmu Komputer",
      desc: "Memberikan pemahaman dasar organisasi serta menumbuhkan kepercayaan diri, tanggung jawab, dan inisiatif mahasiswa dalam berorganisasi.",
      image: "/assets/time-line/ldkm1.jpeg",
    },
    {
      date: "Feb 2026",
      title: "Pembukaan Pendaftaran BEM FILKOM",
      desc: "Membuka peluang bagi mahasiswa berbakat untuk berkontribusi dalam kemajuan organisasi.",
      image: "/assets/time-line/kpu.jpeg",
    },
  ];

  const handleImageError = (
    e: React.SyntheticEvent<HTMLImageElement, Event>,
  ) => {
    e.currentTarget.src = "/assets/placeholder-event.jpg";
  };

  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["0 1", "1 0"],
  });
  const lineProgress = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <Section id="timeline" className={cn("pt-10 md:pt-14 relative", className)}>
      <div className="container">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <Reveal y={12}>
            <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight">
              Timeline Program <br /> BEM FILKOM UNIDA 2025
            </h2>
          </Reveal>
        </div>
        <motion.div
          ref={ref}
          className="max-w-7xl mx-auto space-y-6 md:space-y-12 relative"
          initial={false}
        >
          <motion.div
            className="absolute left-1/2 -translate-x-1/2 w-0.5 bg-primary/50 -z-10 hidden md:block origin-top"
            style={{
              top: "0",
              height: "100%",
              scaleY: lineProgress,
            }}
          />
          {events.map((event, idx) => (
            <Reveal key={idx} y={16} delay={idx * 80}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 items-start relative">
                <div className="relative z-10 shadow-lg rounded-lg overflow-hidden">
                  <img
                    src={event.image}
                    alt={`${event.title} - ${event.date}`}
                    className={cn(
                      "w-full h-48 md:h-64 object-cover",
                      (idx === 2 || idx === 3) &&
                        "object-bottom md:object-[center_bottom]",
                    )}
                    loading="lazy"
                    onError={handleImageError}
                  />
                </div>
                <div className="bg-card rounded-xl border p-4 md:p-6 lg:p-8 space-y-2 md:space-y-3">
                  <h3 className="text-lg md:text-xl lg:text-2xl font-bold tracking-tight">
                    {event.title}
                  </h3>
                  <p className="text-sm md:text-base lg:text-lg text-muted-foreground leading-relaxed">
                    {event.desc}
                  </p>
                </div>
              </div>
            </Reveal>
          ))}
        </motion.div>
      </div>
    </Section>
  );
}