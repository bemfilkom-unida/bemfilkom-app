import Link from "next/link";

const footerLinks = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About" },
  { to: "/divisions", label: "Structure" },
  { to: "/gallery", label: "Gallery" },
  { to: "/contact", label: "Contact" },
];

function SocialIcon({ type }: { type: "instagram" | "linkedin" }) {
  const common = "size-5";
  switch (type) {
    case "instagram":
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" className={common}>
          <rect x="3" y="3" width="18" height="18" rx="5" />
          <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
          <circle cx="17.5" cy="6.5" r="1.5" fill="currentColor" stroke="none" />
        </svg>
      );
    case "linkedin":
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" className={common}>
          <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
          <rect x="2" y="9" width="4" height="12" />
          <circle cx="4" cy="4" r="2" />
        </svg>
      );
  }
}

export default function SiteFooter() {
  return (
    <footer className="border-t bg-background">
      <div className="container grid gap-8 py-10 md:grid-cols-2 lg:grid-cols-3">
        {/* KOLOM LOGO & DESKRIPSI */}
        <div className="flex flex-col">
          {/* SEMUA LOGO DIATAS TULISAN */}
          <div className="flex flex-wrap items-center gap-4 mb-4">
            {/* 1. Logo Universitas Djuanda */}
            <img
              src="/logo/logo-unida.png"
              alt="Logo Universitas Djuanda"
              className="h-9 w-auto"
            />

            {/* 2. Logo Fakultas Ilmu Komputer */}
            <img
              src="/logo/logo-fakultas.png"
              alt="Logo Fakultas Ilmu Komputer"
              className="size-9 rounded-full object-cover"
            />

            {/* 3. Logo BEM FILKOM */}
            <img
              src="/logo/logo-bem-footer.png"
              alt="Logo BEM FILKOM UNIDA"
              className="size-9 rounded-full object-cover"
            />

            {/* 4. Logo LDKM DNSI */}
            <img
              src="/logo/logo-ldkm.png"
              alt="Logo LDKM DNSI"
              className="h-12 w-auto"
            />

            {/* 5. LOGO BARU – contoh: HMJ Informatika (atau logo lain yang kamu mau) */}
            <img
              src="/logo/kpu-filkom.png"
              alt="Logo HMJ Informatika UNIDA"
              className="size-10 rounded-lg object-contain bg-white p-1 shadow-sm"
            />
          </div>

          {/* Teks di bawah logo */}
          <div className="font-extrabold tracking-tight text-lg">
            BEM FILKOM UNIDA
          </div>
          <p className="mt-2 text-sm text-muted-foreground max-w-sm">
            Mari mulai langkah baru untuk membawa perubahan positif bagi kampus dan sesama
          </p>
        </div>

        {/* KOLOM NAVIGASI */}
        <nav className="grid grid-cols-2 gap-4 md:grid-cols-1 lg:grid-cols-2">
          {footerLinks.map((l) => (
            <Link
              key={l.to}
              href={l.to}
              className="text-sm text-foreground/80 hover:text-foreground transition-colors"
            >
              {l.label}
            </Link>
          ))}
        </nav>

        {/* KOLOM SOSIAL MEDIA */}
        <div className="flex flex-col gap-3">
          <div className="text-sm font-semibold">Follow us</div>
          <div className="flex items-center gap-4 text-foreground/80">
            <a
              href="https://www.instagram.com/bemfilkom.unida/"
              aria-label="Instagram BEM FILKOM"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-foreground transition-colors"
            >
              <SocialIcon type="instagram" />
            </a>
            <a
              href="https://www.linkedin.com/in/bem-fakultas-ilmu-komputer-universitas-djuanda-990b17387"
              aria-label="LinkedIn BEM FILKOM"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-foreground transition-colors"
            >
              <SocialIcon type="linkedin" />
            </a>
          </div>
        </div>
      </div>

      {/* COPYRIGHT */}
      <div className="border-t py-4 text-center text-xs text-muted-foreground">
        © {new Date().getFullYear()} BEM FILKOM Universitas Djuanda. All rights reserved.
      </div>
    </footer>
  );
}