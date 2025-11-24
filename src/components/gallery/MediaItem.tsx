'use client';

import OptimizedImage from '@/components/ui/OptimizedImage';

export interface MediaItem {
  src: string;
  alt: string;
  date: string;
  category: string;
  type?: "video" | "youtube";
  poster?: string;
  thumbnail?: string;
  priority?: "high" | "medium" | "low";
  lazy?: boolean;
  aspectRatio?: "square" | "portrait" | "landscape" | "auto";
}

interface MediaItemProps {
  item: MediaItem;
}

export default function MediaItem({ item }: MediaItemProps) {
  // Validate item data
  if (!item.src || !item.alt) {
    return null;
  }

  // Get Google Drive file ID and create multiple URL options
  const getFileId = (url: string) => {
    if (url.includes('drive.google.com/uc?id=')) {
      return url.split('id=')[1]?.split('&')[0];
    }
    return null;
  };

  const fileId = getFileId(item.src);

  
  
  // Dynamic aspect ratio untuk video
  const getVideoAspectRatio = () => {
    switch (item.aspectRatio) {
      case "portrait":
        return "aspect-[9/16]";
      case "square":
        return "aspect-square";
      case "landscape":
        return "aspect-video";
      case "auto":
      default:
        return "aspect-video";
    }
  };

  // Dynamic aspect ratio untuk gambar
  const getImageAspectRatio = () => {
    switch (item.aspectRatio) {
      case "portrait":
        return "aspect-[9/16]";
      case "square":
        return "aspect-square";
      case "landscape":
        return "aspect-video";
      case "auto":
      default:
        return "aspect-auto";
    }
  };

  // Get dimensions untuk OptimizedImage
  const getImageDimensions = () => {
    switch (item.aspectRatio) {
      case "portrait":
        return { width: 1080, height: 1920 };
      case "square":
        return { width: 1080, height: 1080 };
      case "landscape":
        return { width: 1920, height: 1080 };
      case "auto":
      default:
        return { width: 800, height: 600 };
    }
  };

  const isGoogleDrive = item.type === "video" && item.src.includes('drive.google.com');
  const isYouTube = item.type === "youtube";

  return (
    <div className="group relative overflow-hidden rounded-xl cursor-pointer break-inside-avoid mb-4">
      <div className="relative w-full h-auto max-h-[80vh] overflow-hidden">
        {item.type === "video" || item.type === "youtube" ? (
          <div className={`w-full ${getVideoAspectRatio()}`}>
            {isGoogleDrive ? (
              <div className="relative w-full h-full">
                {/* Full video play in container */}
                <iframe
                  src={`https://drive.google.com/file/d/${fileId}/preview`}
                  className="absolute inset-0 w-full h-full"
                  style={{
                    border: 'none',
                    position: 'absolute',
                    top: '-100px',
                    left: '0',
                    width: '100%',
                    height: 'calc(100% + 200px)',
                    transform: 'scale(1.1)',
                    transformOrigin: 'center center'
                  }}
                  allow="autoplay; fullscreen; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  title={item.alt}
                />
              </div>
            ) : isYouTube ? (
              <iframe
                src={item.src}
                className="w-full h-full"
                allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                title={item.alt}
              />
            ) : (
              <video
                className="w-full h-full object-cover"
                controls
                playsInline
                preload="metadata"
                width="1920"
                height="1080"
                aria-label={item.alt}
              >
                <source src={item.src} type="video/mp4" />
                <source src={item.src} type="video/webm" />
                Browser Anda tidak mendukung video.{" "}
                <a href={item.src} target="_blank" rel="noopener noreferrer">Buka video</a>.
              </video>
            )}
          </div>
        ) : (
          <div className={getImageAspectRatio()}>
            <OptimizedImage
              src={item.src}
              alt={item.alt}
              className="group-hover:scale-110"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              width={getImageDimensions().width}
              height={getImageDimensions().height}
              objectFit={item.aspectRatio === 'portrait' ? 'contain' : 'cover'}
            />
            {/* Overlay dan caption hanya untuk foto */}
           
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
          </div>
        )}

        {/* Caption untuk video */}
        {(item.type === "video" || item.type === "youtube") && (
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
        )}
      </div>

      </div>
  );
}