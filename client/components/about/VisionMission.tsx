import { useState } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Reveal from "@/components/effects/Reveal";
import { motion, AnimatePresence } from "framer-motion";

interface VisionMissionAboutProps {
  className?: string;
}

function Section({
  className,
  children,
}: React.PropsWithChildren<{ className?: string }>) {
  return <section className={cn("py-16 md:py-24", className)}>{children}</section>;
}

export default function VisionMissionAbout({ className }: VisionMissionAboutProps) {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    // Slide 1: Dekan
    {
      name: "Dr. Ir. H. Himmatul Miftah, M.Si., MPM",
      position: "Dekan Fakultas Ilmu Komputer",
      image: "/assets/about/dekan-filkom.jpeg",
      quote: "FILKOM UNIDA adalah tempat penuh potensi tak terbatas—kami tekankan pendidikan ilmu komputer di dunia yang terhubung teknologi, untuk ciptakan lulusan unggul yang bersatu dalam Tauhid dan standar internasional.",
      description: "Sejak resmi berdiri 2023, FILKOM kelola S1 Ilmu Komputer dengan amanah visi: bangun fakultas unggul yang edukasi bangsa via tech inovatif. Dengan kepercayaan masyarakat yang melonjak, kami siap tambah prodi baru—mari wujudkan kemajuan bersama!",
    },
    // Slide 2: Wakil Dekan
    {
      name: "Muhammad Encep, S.Kom., M.T.I., MTA",
      position: "Wakil Dekan Bidang Akademik",
      image: "/assets/about/wakil-dekan.webp",
      quote: "ORMAWA FILKOM bukan sekadar organisasi ini ruang untuk mengasah kepemimpinan, tanggung jawab, dan integritas. Mahasiswa diharapkan menjadi agen perubahan yang berpikir kritis, kreatif, dan berakhlak mulia, selaras dengan nilai Tauhid sebagai landasan ilmu dan pengabdian.",
      description: "Melalui sinergi BEM, DPM, dan HIMASTER, mahasiswa FILKOM belajar berkolaborasi, membangun program berdampak nyata, dan menumbuhkan budaya kekeluargaan. Dengan pengalaman ini, mereka siap berkontribusi pada kampus dan masyarakat, sekaligus menjadi lulusan unggul yang mampu berprestasi di tingkat global.",
    },
  ];

  const nextSlide = () => setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  const prevSlide = () => setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1));

  return (
    <Section className={className}>
      <div className="container">
        <div className="text-center mb-12">
          <Reveal y={16}>
            <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight">Kata Pengantar</h2>
          </Reveal>
          <Reveal y={16} delay={100}>
            <p className="mt-3 text-muted-foreground max-w-2xl mx-auto">
              Sambutan dari Pimpinan Fakultas Ilmu Komputer Universitas Djuanda
            </p>
          </Reveal>
        </div>
        {/* Slider Container */}
        <div className="relative max-w-4xl mx-auto mb-8">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentSlide}
              initial={{ x: currentSlide === 0 ? "100%" : "-100%", opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: currentSlide === 0 ? "-100%" : "100%", opacity: 0 }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
              className="flex flex-col md:flex-row items-center gap-8"
            >
              <div className="w-full md:w-1/2">
                <img
                  src={slides[currentSlide].image}
                  alt={`${slides[currentSlide].name}, ${slides[currentSlide].position}`}
                  className="w-full h-auto object-contain rounded-lg shadow-md"
                  style={{ aspectRatio: "3/4" }}
                />
              </div>
              <div className="w-full md:w-1/2 space-y-4">
                <blockquote className="border-l-4 border-primary pl-4 italic text-lg text-foreground">
                  "{slides[currentSlide].quote}"
                  <footer className="mt-2 text-sm text-muted-foreground">— {slides[currentSlide].name}</footer>
                </blockquote>
                <p className="text-base text-muted-foreground leading-relaxed">
                  {slides[currentSlide].description}
                </p>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Navigation Arrows */}
          <div className="flex justify-center gap-4 mt-6">
            <Button
              variant="outline"
              size="sm"
              onClick={prevSlide}
              aria-label="Slide sebelumnya"
              className="p-2"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="size-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
              </svg>
            </Button>
            <div className="flex items-center gap-2">
              {slides.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentSlide(index)}
                  className={cn(
                    "size-3 rounded-full transition-colors",
                    currentSlide === index ? "bg-primary" : "bg-muted hover:bg-primary/50"
                  )}
                  aria-label={`Pilih slide ${index + 1}`}
                />
              ))}
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={nextSlide}
              aria-label="Slide selanjutnya"
              className="p-2"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="size-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
              </svg>
            </Button>
          </div>

          {/* Indicators Text */}
          <p className="text-center text-sm text-muted-foreground mt-4">
            Slide {currentSlide + 1} dari {slides.length}
          </p>
        </div>
      </div>
    </Section>
  );
}