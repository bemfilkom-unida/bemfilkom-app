import { cn } from "@/lib/utils";

export interface MediaItem {
  src: string;
  alt: string;
  date: string;
  category: string;
  type?: "video";
  poster?: string; // Tambah buat thumbnail video
}

interface MediaItemProps {
  item: MediaItem;
}

export default function MediaItem({ item }: MediaItemProps) {
  return (
    <div className="group relative overflow-hidden rounded-xl border bg-card shadow-md hover:shadow-xl transition-all duration-500 cursor-pointer break-inside-avoid mb-4">
      <div className="relative w-full h-auto max-h-[80vh] overflow-hidden">
        {item.type === "video" ? (
          <video
            className="w-full h-full object-cover"
            controls
            preload="metadata"
            playsInline // Buat mobile (iOS)
            poster={item.poster} // Thumbnail preview
            width="1920"
            height="1080"
            onError={(e) => {
              console.error("Video load error:", item.src, e); // Log error di console buat debug
            }}
            aria-label={item.alt}
          >
            <source src={item.src} type="video/mp4" />
            Browser Anda tidak mendukung video.{" "}
            <a href={item.src}>Download di sini</a>.
          </video>
        ) : (
          <img
            src={item.src}
            alt={item.alt}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            onError={(e) =>
              console.error("Image load error:", item.src, e)
            } // Debug buat foto juga
          />
        )}
      </div>
      {/* Overlay hanya untuk foto, hilangkan untuk video biar gak block controls */}
      {item.type !== "video" && (
        <>
          <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-all duration-500 z-10" />
          <div className="absolute bottom-0 left-0 right-0 p-3 text-white bg-gradient-to-t from-black/80 to-transparent z-20">
            <h3 className="font-semibold text-xs md:text-sm truncate">
              {item.alt}
            </h3>
            <div className="flex justify-between items-center mt-1">
              <p className="text-xs opacity-90">{item.date}</p>
              <span className="text-xs bg-primary/20 text-primary px-2 py-1 rounded-full">
                {item.category}
              </span>
            </div>
          </div>
        </>
      )}
      {/* Untuk video, caption sederhana tanpa overlay, dan tanpa badge icon */}
      {item.type === "video" && (
        <div className="absolute bottom-0 left-0 right-0 p-3 text-white bg-gradient-to-t from-black/80 to-transparent z-20 pointer-events-none">
          <h3 className="font-semibold text-xs md:text-sm truncate">
            {item.alt}
          </h3>
          <p className="text-xs opacity-90 mt-1">{item.date}</p>
          {/* FIXED: Tambah badge category untuk video juga, biar konsisten */}
          <span className="text-xs bg-primary/20 text-primary px-2 py-1 rounded-full mt-1 inline-block">
            {item.category}
          </span>
        </div>
      )}
    </div>
  );
}