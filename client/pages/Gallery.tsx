import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";
import Reveal from "@/components/effects/Reveal";
import Hero from "@/components/gallery/Hero";
import MediaGallery from "@/components/gallery/MediaGallery"
import BackNavigation from "@/components/gallery/BackNavigation";

interface MediaItem {
  src: string;
  alt: string;
  date: string;
  category: string;
  type?: "video";
  poster?: string; 
}

export default function Gallery() {
  const media: { [key: string]: MediaItem[] } = {
    "penyambutan-mahasiswa-baru": [
      {
        src: "/assets/img/asset1.webp",
        alt: "Penyambutan Mahasiswa Baru 2025",
        date: "10 Sep 2025",
        category: "Penyambutan Mahasiswa Baru",
      },
      {
        src: "/assets/img/asset3.webp",
        alt: "Penyambutan Mahasiswa Baru 2025",
        date: "10 Sep 2025",
        category: "Penyambutan Mahasiswa Baru",
      },
      {
        src: "/assets/img/asset4.webp",
        alt: "Penyambutan Mahasiswa Baru 2025",
        date: "10 Sep 2025",
        category: "Penyambutan Mahasiswa Baru",
      },
      {
        src: "/assets/video/as-vid1.mp4",
        alt: "Penyambutan Mahasiswa Baru 2025",
        date: "10 Sep 2025",
        category: "Penyambutan Mahasiswa Baru",
        type: "video",
      },
      {
        src: "/assets/video/as-vid2.mp4",
        alt: "Penyambutan Mahasiswa Baru 2025",
        date: "10 Sep 2025",
        category: "Penyambutan Mahasiswa Baru",
        type: "video",
      },
    ],
    "kaderisasi-filkom": [
      {
        src: "/assets/img/asset5.JPG",
        alt: "Kaderisasi FILKOM 2024 ",
        date: "14 Des 2024",
        category: "Kaderisasi Filkom",
      },
      {
        src: "/assets/img/asset6.JPG",
        alt: "Kaderisasi FILKOM 2024 ",
        date: "14 Des 2024",
        category: "Kaderisasi Filkom",
      },
    ],
    ldkm: [
      {
        src: "/assets/img/asset7.webp",
        alt: "LDKM FILKOM 2024",
        date: "21-22 Des 2024",
        category: "LDKM",
      },
      {
        src: "/assets/img/asset8.webp",
        alt: "LDKM FILKOM 2024",
        date: "21-22 Des 2024",
        category: "LDKM",
      },
      {
        src: "/assets/video/as-vid3.mp4",
        alt: "LDKM FILKOM 2024",
        date: "21-22 Des 2024",
        category: "LDKM",
        type: "video",
      },
      {
        src: "/assets/img/asset9.JPG",
        alt: "LDKM FILKOM 2024",
        date: "21-22 Des 2024",
        category: "LDKM",
      },
      {
        src: "/assets/video/as-vid4.mp4",
        alt: "LDKM FILKOM 2024",
        date: "21-22 Des 2024",
        category: "LDKM",
        type: "video",
      },
      {
        src: "/assets/img/asset10.JPG",
        alt: "LDKM FILKOM 2024",
        date: "21-22 Des 2024",
        category: "LDKM",
      },
      {
        src: "/assets/img/asset11.JPG",
        alt: "LDKM FILKOM 2024",
        date: "21-22 Des 2024",
        category: "LDKM",
      },
    ],
    "pendaftaran-bem": [
      {
        src: "/assets/img/asset12.webp",
        alt: "Pendaftaran BEM FILKOM 2024",
        date: "26 Jun 2025",
        category: "Pendaftaran BEM",
      },
      {
        src: "/assets/img/asset13.jpg",
        alt: "Pendaftaran BEM FILKOM 2024",
        date: "26 Jun 2025",
        category: "Pendaftaran BEM",
      },
    ],
  };

  const allMedia: MediaItem[] = Object.values(media)
    .flat()
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  return (
    <div className="py-10 md:py-16">
      <div className="container">
        <article className="prose prose-slate dark:prose-invert max-w-none">
          <Hero />
          <MediaGallery allMedia={allMedia} />
          <BackNavigation />
        </article>
      </div>
    </div>
  );
}