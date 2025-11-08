import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";
import Reveal from "@/components/effects/Reveal";
import BlurText from "@/components/effects/BlurText";

const KAB_PHOTO = "/assets/kabinet25.jpeg?v=3";

interface HeroProps {
  className?: string;
}


export default function Hero({ className }: HeroProps) {
  const bgRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const img = new Image();
    img.onload = () => {
      if (bgRef.current) {
        bgRef.current.style.opacity = "1";
      }
    };
    img.onerror = () => {
      if (bgRef.current) {
        bgRef.current.style.opacity = "1";
      }
    };
    img.src = KAB_PHOTO;
    return () => {
      img.onload = null;
      img.onerror = null;
    };
  }, []);

  return (
    <section
      className={cn("relative", className)}
      role="banner"
      aria-label="Hero section for BEM FILKOM Kabinet Neogenesis"
    >
      <div className="container py-10 md:py-14">
        <div
          ref={bgRef}
          className="relative overflow-hidden rounded-3xl border shadow-sm min-h-[50vh] md:min-h-[70vh] lg:min-h-[80vh] grid place-items-start pt-4 md:pt-6 opacity-0 transition-opacity duration-1000 ease-out bg-cover bg-no-repeat bg-center-top md:bg-center"
          style={{
            backgroundImage: `url(${KAB_PHOTO})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
          }}
          aria-label="Foto Kabinet Neogenesis"
        >
          <div className="absolute inset-0 bg-[linear-gradient(to_top,rgba(0,0,0,0.3),transparent_70%)]" />
          <div className="relative z-10 w-full px-4 md:px-8 text-center">
            <Reveal y={10} delay={50}>
              <div className="inline-flex items-center gap-2 rounded-full border border-white/10 px-3 py-1 text-[11px] md:text-xs text-white/95 bg-white/5">
                <span className="size-2 rounded-full bg-primary" /> Badan
                Eksekutif Mahasiswa
              </div>
            </Reveal>
            <Reveal y={18} delay={120}>
              <div className="flex flex-col md:flex-row items-center justify-center space-y-1 md:space-y-0 md:gap-2">
                <BlurText
                  text="Kabinet"
                  className="text-5xl md:text-6xl font-extrabold tracking-tight drop-shadow-2xl"
                />
                <BlurText
                  text="Neogenesis"
                  className="text-5xl md:text-7xl font-extrabold leading-[1.08] tracking-tight drop-shadow-2xl"
                />
              </div>
            </Reveal>
            <Reveal y={18} delay={200}>
              <p className="mt-4 md:mt-5 text-base md:text-xl text-white/95 max-w-2xl mx-auto leading-relaxed drop-shadow-lg">
                Menumbuhkan Generasi Baru, Mewujudkan Inovasi Nyata.
              </p>
            </Reveal>
            <Reveal y={18} delay={260}>
              <div className="mt-8 flex items-center justify-center text-white/95">
                <button
                  type="button"
                  aria-label="Scroll down to main programs"
                  className="rounded-full p-2 hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-white/40 focus-visible:outline-none transition"
                  onClick={() => {
                    document
                      .getElementById("main-programs")
                      ?.scrollIntoView({ behavior: "smooth", block: "start" });
                  }}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault();
                      document.getElementById("main-programs")?.scrollIntoView({
                        behavior: "smooth",
                        block: "start",
                      });
                    }
                  }}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    className="size-7 animate-bounce"
                    aria-hidden
                  >
                    <path d="M6 9l6 6 6-6" />
                  </svg>
                </button>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}