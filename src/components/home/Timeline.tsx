'use client';

import { cn } from "@/lib/utils";
import { FadeIn, StaggerContainer, StaggerItem } from "@/components/effects";
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
      image: "/time-line/maba.JPG",
    },
    {
      date: "Des 2024",
      title: "Kaderisasi Fakultas Ilmu Komputer",
      desc: "Memberikan wawasan IT serta menumbuhkan awareness dan kesiapan mahasiswa untuk jenjang selanjutnya.",
      image: "/time-line/dekan.webp",
    },
    {
      date: "Des 2024",
      title: "LDKM Fakultas Ilmu Komputer",
      desc: "Memberikan pemahaman dasar organisasi serta menumbuhkan kepercayaan diri, tanggung jawab, dan inisiatif mahasiswa dalam berorganisasi.",
      image: "/time-line/ldkm1.jpeg",
    },
    {
      date: "Jun 2025",
      title: "Pembukaan Pendaftaran BEM FILKOM",
      desc: "Membuka peluang bagi mahasiswa berbakat untuk berkontribusi dalam kemajuan organisasi.",
      image: "/time-line/kpu.jpeg",
    },
  ];

  const handleImageError = (
    e: React.SyntheticEvent<HTMLImageElement, Event>,
  ) => {
    e.currentTarget.src = "/time-line/placeholder-event.jpg";
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
        <FadeIn delay={0}>
          <div className="text-center max-w-2xl md:max-w-3xl mx-auto mb-8 md:mb-12">
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-extrabold tracking-tight gradient-animation bg-clip-text text-transparent">
              Timeline Program <br /> BEM FILKOM UNIDA 2025
            </h2>
          </div>
        </FadeIn>
        <motion.div
          ref={ref}
          className="max-w-6xl md:max-w-7xl mx-auto space-y-8 md:space-y-12 relative"
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
          <StaggerContainer delay={200}>
            {events.map((event, idx) => (
              <StaggerItem key={idx}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8 items-start relative">
                  <div className="relative z-10 rounded-lg overflow-hidden order-2 md:order-1">
                    <img
                      src={event.image}
                      alt={`${event.title} - ${event.date}`}
                      className="w-full h-40 md:h-64 object-cover"
                      loading="lazy"
                      onError={handleImageError}
                    />
                  </div>
                  <div className="bg-card rounded-xl border p-4 md:p-6 space-y-2 order-1 md:order-2">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="size-2 rounded-full bg-primary animate-pulse" />
                      <span className="text-xs md:text-sm font-medium text-primary">{event.date}</span>
                    </div>
                    <h3 className="text-sm md:text-base lg:text-lg font-bold tracking-tight">
                      {event.title}
                    </h3>
                    <p className="text-xs md:text-sm text-muted-foreground leading-tight">
                      {event.desc}
                    </p>
                  </div>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </motion.div>
      </div>
    </Section>
  );
}