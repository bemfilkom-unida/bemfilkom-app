import { Link } from "react-router-dom";

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
      <div className="container grid gap-6 py-10 md:grid-cols-2 lg:grid-cols-3">
        <div>
          <div className="flex items-center gap-2">
            {/* Logo Universitas Djuanda di sebelah kiri paling */}
            <img
              src="/assets/logo/logo-unida.png" // Ganti dengan path logo Universitas Djuanda yang sebenarnya
              alt="Logo Universitas Djuanda"
              className="h-8 w-auto"
            />
            {/* Logo Fakultas Ilmu Komputer di sebelah kanan logo universitas */}
            <img
              src="/assets/logo/logo-fakultas.png" // Ganti dengan path logo Fakultas Ilmu Komputer yang sebenarnya
              alt="Logo Fakultas Ilmu Komputer"
              className="size-8 rounded-full object-cover"
            />
            {/* Logo BEM tetap di sebelah kanan */}
            <img
              src="assets/logo/logo-bem-footer.png"
              alt="Logo BEM FILKOM UNIDA"
              className="size-8 rounded-full object-cover"
            />
            {/* Tambah logo LDKM DNSI di sebelah kanan BEM */}
            <img
              src="/assets/logo/logo-ldkm.png" 
              alt="Logo LDKM DNSI"
              className="h-12 w-auto" // Ukuran disesuaikan: tinggi 12 (lebih besar dari size-8), lebar auto biar proporsional seperti logo asli (horizontal dengan teks & grafis)
            />
            <div className="font-extrabold tracking-tight">BEM FILKOM UNIDA</div>
          </div>
          <p className="mt-3 text-sm text-muted-foreground max-w-sm">
            Mari mulai langkah baru untuk membawa perubahan positif bagi kampus dan sesama
          </p>
        </div>
        <nav className="grid grid-cols-2 gap-4">
          {footerLinks.map((l) => (
            <Link key={l.to} to={l.to} className="text-sm text-foreground/80 hover:text-foreground">
              {l.label}
            </Link>
          ))}
        </nav>
        <div className="flex flex-col gap-3">
          <div className="text-sm font-semibold">Follow us</div>
          <div className="flex items-center gap-3 text-foreground/80">
            <a href="https://www.instagram.com/bemfilkom.unida/?utm_source=ig_web_button_share_sheet" aria-label="Instagram" className="hover:text-foreground" target="_blank" rel="noopener noreferrer">
              <SocialIcon type="instagram" />
            </a>
            <a href="https://www.linkedin.com/in/bem-fakultas-ilmu-komputer-universitas-djuanda-990b17387" aria-label="LinkedIn" className="hover:text-foreground" target="_blank" rel="noopener noreferrer">
              <SocialIcon type="linkedin" />
            </a>
          </div>
        </div>
      </div>
      <div className="border-t py-4 text-center text-xs text-muted-foreground">
        © {new Date().getFullYear()} BEM FILKOM Universitas Djuanda. All rights reserved.
      </div>
    </footer>
  );
}