import Layout from '@/components/layout/Layout';
import Hero from "@/components/gallery/Hero";
import MediaGallery from "@/components/gallery/MediaGallery";
import BackNavigation from "@/components/gallery/BackNavigation";
import { MediaItem } from "@/components/gallery/MediaItem";
import galleryData from "@/data/gallery.json";

export default function GalleryPage() {
  // Validate item data function
  const isValidItem = (item: any): boolean => {
    // Check if essential fields exist and are not empty
    if (!item || !item.src || !item.alt) {
      return false;
    }

    // Check if src is not empty string or whitespace
    if (typeof item.src !== 'string' || item.src.trim() === '') {
      return false;
    }

    // Check if alt is not empty string or whitespace
    if (typeof item.alt !== 'string' || item.alt.trim() === '') {
      return false;
    }

    // Filter OUT invalid/placeholder video IDs
    if (item.type === 'video' && item.src.includes('drive.google.com')) {
      const videoId = item.src.split('id=')[1]?.split('&')[0];
      return videoId && videoId !== 'CONTOH_VIDEO_PORTRAIT' && videoId !== 'CONTOH_VIDEO_SQUARE';
    }

    return true;
  };

  // Combine all media from JSON and filter out invalid items
  const allMedia: MediaItem[] = [
    ...Object.values(galleryData).flat().filter(item =>
      !Array.isArray(item) && typeof item === 'object'
    ) as MediaItem[]
  ]
    .filter(item => isValidItem(item)) // Filter out invalid items
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  
  
  return (
    <Layout>
      <div className="py-10 md:py-16">
        <div className="container">
          <article className="prose prose-slate dark:prose-invert max-w-none">
            <Hero />
            <MediaGallery allMedia={allMedia} />
            <BackNavigation />
          </article>
        </div>
      </div>
    </Layout>
  );
}