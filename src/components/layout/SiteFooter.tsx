import Link from "next/link";

const footerLinks = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About" },
  { to: "/divisions", label: "Structure" },
  { to: "/gallery", label: "Gallery" },
  { to: "/contact", label: "Contact" },
];

function SocialIcon({ type }: { type: "instagram" | "linkedin" | "github" }) {
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
    case "github":
      return (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 16 16"
          fill="currentColor"
          className={common}
        >
          <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27s1.36.09 2 .27c1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.01 8.01 0 0 0 16 8c0-4.42-3.58-8-8-8" />
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
            <img
              src="/logo/logo-unida.png"
              alt="Logo Universitas Djuanda"
              className="h-9 w-auto"
            />
            <img
              src="/logo/logo-fakultas.png"
              alt="Logo Fakultas Ilmu Komputer"
              className="size-9 rounded-full object-cover"
            />
            <img
              src="/logo/logo-bem-footer.png"
              alt="Logo BEM FILKOM UNIDA"
              className="size-9 rounded-full object-cover"
            />
            <img
              src="/logo/logo-ldkm.png"
              alt="Logo LDKM DNSI"
              className="h-12 w-auto"
            />
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
            {/* ICON GITHUB BARU */}
            <a
              href="https://github.com/bemfilkom-unida" // GANTI DENGAN URL REPO KALIAN KALAU ADA
              aria-label="GitHub BEM FILKOM"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-foreground transition-colors"
            >
              <SocialIcon type="github" />
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