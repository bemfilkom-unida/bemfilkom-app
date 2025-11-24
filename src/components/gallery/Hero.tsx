import { cn } from "@/lib/utils";
import Reveal from "@/components/effects/Reveal";

export default function Hero() {
  return (
    <>
      <Reveal y={12}>
        <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight">
          Galeri Media
        </h1>
        <p className="mt-3 text-muted-foreground">
          Galeri ini menyajikan rangkaian kegiatan BEM FILKOM Universitas Djuanda yang mencerminkan semangat dan dedikasi mahasiswa.
        </p>
      </Reveal>
    </>
  );
}