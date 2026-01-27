'use client';

import { useState } from "react";
import Image from "next/image";
import BlurText from "@/components/effects/BlurText";
import { SlideInLeft, SlideInRight } from "@/components/effects";
import { Reveal } from "@/components/effects"; // pastikan Reveal sudah di-import

const KAB_PHOTO = "/kabinet25.webp";

export default function Hero() {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);

  return (
    <section className="relative w-full overflow-hidden" role="banner">
      <div className="relative w-full min-h-screen">
        {/* Background Image dengan Next.js Image */}
        <div className="absolute inset-0 min-h-screen">
          {!imageError ? (
            <Image
              src={KAB_PHOTO}
              alt="Kabinet Neogenesis 2025"
              fill
              priority
              quality={65}
              sizes="100vw"
              fetchPriority="high"
              loading="eager"
              className={`object-cover object-center ${
                imageLoaded ? "opacity-100" : "opacity-0"
              } transition-opacity duration-1000 ease-out`}
              onLoad={() => setImageLoaded(true)}
              onError={() => setImageError(true)}
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-primary/20 via-secondary/20 to-accent/20" />
          )}
        </div>

        {/* Gradient overlay (transisi bawah) */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent pointer-events-none z-10" />

        {/* Konten teks */}
        <div className="relative z-20 flex min-h-screen flex-col items-center justify-start pt-16 md:pt-20 lg:pt-24 px-4 sm:px-6 text-center">
          <div className="mt-4 md:mt-8 w-full max-w-5xl space-y-6 md:space-y-8">
            {/* Badge "Tentang BEM FILKOM" di atas */}
            <Reveal y={10} delay={50}>
              <div className="inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs text-foreground/70 bg-background/60 backdrop-blur">
                <span className="size-2 rounded-full bg-primary" /> BEM FILKOM Universitas Djuanda
              </div>
            </Reveal>

            {/* Teks utama KABINET NEOGENESIS */}
            <div className="flex flex-col md:flex-row md:items-baseline md:justify-center gap-3 md:gap-6">
              <SlideInLeft delay={300}>
                <BlurText
                  text="KABINET"
                  className="inline-block text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-tight text-white drop-shadow-2xl leading-tight whitespace-nowrap"
                />
              </SlideInLeft>

              <SlideInRight delay={600}>
                <BlurText
                  text="PLENGERTOPIA"
                  className="inline-block text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-tight text-white drop-shadow-2xl leading-tight whitespace-nowrap"
                />
              </SlideInRight>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
