import { cn } from "@/lib/utils";
import Reveal from "@/components/effects/Reveal";
import MediaItem, { MediaItem as MediaItemType } from "./MediaItem";

interface MediaGalleryProps {
  allMedia: MediaItemType[];
}

export default function MediaGallery({ allMedia }: MediaGalleryProps) {
  return (
    <section className="mt-10">
      <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-4 space-y-4">
        {allMedia.map((item, idx) => (
          <Reveal key={idx} y={16} delay={idx * 50}>
            <MediaItem item={item} />
          </Reveal>
        ))}
      </div>
    </section>
  );
}