'use client';

import { useEffect, useRef } from "react";
import BlurText from "@/components/effects/BlurText";
import { FadeIn, SlideInLeft, SlideInRight, RotateIn } from "@/components/effects";
import { motion } from "framer-motion";

const KAB_PHOTO = "/kabinet25.jpeg";

export default function Hero() {
  const bgRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const img = new Image();
    img.onload = () => bgRef.current && (bgRef.current.style.opacity = "1");
    img.src = KAB_PHOTO;
  }, []);

  return (
    <section className="relative w-full overflow-hidden" role="banner">
      <div className="relative w-full">
        <div
          ref={bgRef}
          className="min-h-screen w-full bg-cover bg-center bg-no-repeat opacity-0 transition-opacity duration-1800 ease-out"
          style={{ backgroundImage: `url(${KAB_PHOTO})` }}
        >
          <div className="absolute inset-0 bg-black/40" />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />

          <div className="relative z-10 flex min-h-screen flex-col items-center justify-center px-4 sm:px-6 max-w-[100vw] mx-auto">
            <div className="w-full max-w-7xl text-center space-y-6 sm:space-y-8 md:space-y-12">

              {/* Logo LDKM */}
              <FadeIn delay={400}>
                <div className="relative my-8 md:my-12">
                  <motion.img
                    src="/logo/ldkm-25.png"
                    alt="LDKM FILKOM 2025"
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 1, ease: "easeOut" }}
                    className="h-16 w-auto mx-auto sm:h-20 md:h-24 lg:h-28 xl:h-32 2xl:h-36 drop-shadow-2xl object-contain filter brightness-110"
                    loading="eager"
                  />
                  <div className="absolute -inset-6 bg-gradient-to-r from-cyan-500/20 via-teal-500/20 to-orange-500/20 rounded-full blur-3xl animate-pulse -z-10" />
                </div>
              </FadeIn>

              {/* Coming Soon */}
              <div className="w-full overflow-visible pt-10">
                <SlideInLeft delay={200}>
                  <BlurText
                    text="Coming Soon"
                    className="inline-block text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-black tracking-tighter text-white drop-shadow-2xl leading-[0.9]"
                  />
                </SlideInLeft>
              </div>

              {/* LDKM FILKOM */}
              <div className="w-full overflow-visible">
                <SlideInRight delay={600}>
                  <div className="inline-block max-w-full px-4">
                    <BlurText
                      text="LDKM FILKOM"
                      className="inline-block text-5xl sm:text-7xl md:text-9xl lg:text-[10rem] xl:text-[11.5rem] 2xl:text-[12rem] font-black leading-[0.9] tracking-normal drop-shadow-2xl text-white/95 whitespace-nowrap"
                    />
                  </div>
                </SlideInRight>
              </div>

              {/* 2025 */}
              <div className="w-full overflow-visible -mt-2 sm:-mt-4 md:-mt-10">
                <SlideInRight delay={800}>
                  <div className="inline-block max-w-full">
                    <BlurText
                      text="AKT25"
                      className="inline-block text-7xl sm:text-9xl md:text-[12rem] lg:text-[14.5rem] xl:text-[16.5rem] 2xl:text-[18rem] 
                   font-black leading-[0.84] tracking-wider drop-shadow-2xl
                   gradient-animation bg-clip-text text-transparent
                   bg-gradient-to-r from-cyan-300 via-teal-400 to-orange-500"
                    />
                  </div>
                </SlideInRight>
              </div>

              {/* Kutipan Tan Malaka */}
              <FadeIn delay={1000}>
                <p className="mx-auto max-w-4xl text-base sm:text-lg md:text-2xl lg:text-3xl font-medium text-white/90 leading-relaxed drop-shadow-xl">
                  "Terbentur, Terbentur, Terbentur, Terbentuk!" — Tan Malaka
                </p>
              </FadeIn>

              {/* SCROLL BUTTON — TEPAT DI BAWAH TAN MALAKA */}
              <RotateIn delay={1200}>
                <button
                  onClick={() => document.getElementById("main-programs")?.scrollIntoView({ behavior: "smooth" })}
                  className="mt-8 rounded-full p-3 bg-white/10 backdrop-blur-xl border border-white/30 hover:bg-white/20 hover:scale-110 transition-all duration-300 shadow-2xl"
                  aria-label="Scroll ke bawah"
                >
                  <svg className="w-5 h-5 animate-bounce text-white" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                  </svg>
                </button>
              </RotateIn>

            </div>
          </div>

          {/* Glow */}
          <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] sm:w-[1000px] sm:h-[1000px] md:w-[1400px] md:h-[1400px] bg-primary/25 rounded-full blur-3xl animate-pulse" />
          </div>
        </div>
      </div>

      <TechMarquee />
    </section>
  );
}
function TechMarquee() {
  const items = [
    "Coming Soon LDKM FILKOM 25",
    "Coming Soon LDKM FILKOM 25",
    "Coming Soon LDKM FILKOM 25",
    "Coming Soon LDKM FILKOM 25",
    "Coming Soon LDKM FILKOM 25",
    "Coming Soon LDKM FILKOM 25",
    "Coming Soon LDKM FILKOM 25",
    "Coming Soon LDKM FILKOM 25",
    "Coming Soon LDKM FILKOM 25",
  ];

  return (
    <div className="w-full border-t border-white/10 bg-background/50 backdrop-blur-2xl overflow-hidden">
      <div className="relative w-full py-4">
        <div className="w-full overflow-hidden">
          <div className="flex animate-fastMarquee">
            {[...items, ...items].map((text, i) => (
              <span
                key={i}
                className="mx-3 sm:mx-4 inline-flex items-center rounded-full bg-white/10 border border-white/20 px-4 sm:px-6 py-1 sm:py-2 text-xs sm:text-sm md:text-base font-bold tracking-wider text-white/80 whitespace-nowrap"
              >
                {text}
              </span>
            ))}
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes fastMarquee {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }

        .animate-fastMarquee {
          display: flex;
          width: max-content;
          animation: fastMarquee 20s linear infinite;
          will-change: transform;
        }

        @media (max-width: 640px) {
          .animate-fastMarquee {
            animation-duration: 15s;
          }
        }
      `}</style>
    </div>
  );
}
