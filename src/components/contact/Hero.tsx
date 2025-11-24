import { cn } from "@/lib/utils";
import Reveal from "@/components/effects/Reveal";
import { MapPin } from "lucide-react";

export default function Hero() {
  return (
    <>
      <Reveal y={10}>
        <div className="inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs text-foreground/70 bg-background/60 backdrop-blur">
          <span className="size-2 rounded-full bg-primary" />
          Contact BEM FILKOM
        </div>
      </Reveal>
      <Reveal y={18} delay={100}>
        <h1 className="mt-4 text-4xl md:text-6xl font-extrabold leading-tight tracking-tight">
          Let's Connect
        </h1>
      </Reveal>
      <Reveal y={18} delay={160}>
        <p className="mt-4 text-muted-foreground">
          Punya pertanyaan, ide, atau masukan? Silahkan hubungi kami. Terima kasih.&#128588;
        </p>
      </Reveal>
    </>
  );
}