import { Link, NavLink, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ShoppingCart } from "lucide-react";
import { cn } from "@/lib/utils";
import { useEffect, useRef, useState } from "react";

const navLinks = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About" },
  { to: "/divisions", label: "Divisions" },
  { to: "/gallery", label: "Gallery" },
  { to: "/contact", label: "Contact" },
];

function BemLogo({ className, onClick }: { className?: string; onClick?: () => void }) {
  return (
    <Link to="/" className={cn("flex items-center gap-2 group", className)} onClick={onClick}>
      <img
        src="/assets/logo/logo-bem-header.png"
        alt="BEM FILKOM Logo"
        width={32}
        height={32}
        className="shrink-0 rounded-md"
      />
      <div className="flex flex-col leading-none">
        <span className="text-base font-extrabold tracking-tight text-foreground">
          BEM FILKOM
        </span>
        <span className="text-[10px] uppercase tracking-widest text-muted-foreground">
         Universitas Djuanda
        </span>
      </div>
    </Link>
  );
}

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [progress, setProgress] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const rafRef = useRef<number>(0);
  const pending = useRef<{ y: number; h: number } | null>(null);
  const audioRef = useRef<HTMLAudioElement>(null);

  const location = useLocation();
  useEffect(() => {
    setOpen(false);
    window.scrollTo(0, 0);
  }, [location.pathname]);

  useEffect(() => {
    audioRef.current = new Audio('/assets/song/music1.mp3');
    audioRef.current.preload = 'auto';

    const handleEnded = () => {
      setIsPlaying(false);
    };

    audioRef.current.addEventListener('ended', handleEnded);
    return () => {
      audioRef.current?.removeEventListener('ended', handleEnded);
    };
  }, []);

  const handleLogoClick = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.pause();
      setIsPlaying(false);
    } else {
      audio.play().then(() => {
        setIsPlaying(true);
      }).catch(e => {
        console.log('Audio play failed:', e);
        setIsPlaying(false);
      });
    }
  };

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY || window.pageYOffset;
      const dh = document.documentElement.scrollHeight - window.innerHeight;
      pending.current = { y, h: dh > 0 ? dh : 1 };
      if (!rafRef.current) {
        rafRef.current = requestAnimationFrame(() => {
          const p = pending.current!;
          setScrolled(p.y > 8);
          setProgress(Math.min(100, Math.max(0, (p.y / p.h) * 100)));
          rafRef.current && cancelAnimationFrame(rafRef.current);
          rafRef.current = 0;
        });
      }
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll as any);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full border-b backdrop-blur transition-all duration-300",
        scrolled
          ? "bg-background/85 supports-[backdrop-filter]:bg-background/65 shadow-lg"
          : "bg-background/40 supports-[backdrop-filter]:bg-background/30",
      )}
    >
      {/* Blue gradient tint under content */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 opacity-60"
        style={{
          background:
            "linear-gradient(90deg, rgba(87,153,165,0.35), rgba(34,79,112,0.35))",
        }}
      />
      {/* Scroll progress bar */}
      <div
        className="absolute left-0 top-0 h-[2px] bg-accent/90"
        style={{ width: `${progress}%` }}
      />

      <div className={cn("container flex items-center justify-between", scrolled ? "h-14" : "h-16")}>        
        <BemLogo onClick={handleLogoClick} />
        <nav className="hidden md:flex items-center gap-1">
          {navLinks.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              className={({ isActive }) =>
                cn(
                  "relative px-3 py-2 text-sm font-medium rounded-md transition-colors",
                  "after:absolute after:left-3 after:right-3 after:-bottom-0.5 after:h-0.5 after:rounded-full after:scale-x-0 after:origin-left after:transition-transform after:bg-accent hover:after:scale-x-100",
                  isActive
                    ? "text-foreground bg-secondary/30 after:scale-x-100"
                    : "text-foreground/80 hover:text-foreground hover:bg-secondary/20",
                )
              }
            >
              {l.label}
            </NavLink>
          ))}
        </nav>
        <div className="hidden md:block">
          <Button asChild className="group relative overflow-hidden shadow-sm bg-accent text-accent-foreground hover:bg-accent/90">
            <a href="https://www.instagram.com/filkomstore?igsh=MWdzb292c2Uyanc0" target="_blank" rel="noopener noreferrer">
              <div className="flex items-center gap-2 relative z-10">
                <ShoppingCart className="h-4 w-4" />
                <span>Visit Store</span>
              </div>
              <span
                aria-hidden
                className="pointer-events-none absolute inset-0 -translate-x-full bg-[linear-gradient(110deg,transparent,rgba(255,255,255,.35),transparent)] transition-transform duration-700 ease-out group-hover:translate-x-full"
              />
            </a>
          </Button>
        </div>

        <button
          aria-label="Open menu"
          className={cn(
            "md:hidden inline-flex h-10 w-10 items-center justify-center rounded-md border transition-colors",
            open ? "bg-secondary/30" : "bg-background/60",
          )}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? (
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="size-5">
              <path d="M18 6 6 18M6 6l12 12" />
            </svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="size-5">
              <path d="M3 6h18M3 12h18M3 18h18" />
            </svg>
          )}
        </button>
      </div>
      {open && (
        <div className="md:hidden border-t bg-background/95 backdrop-blur-sm transition-all">
          <div className="container py-2 grid">
            {navLinks.map((l) => (
              <Link
                key={l.to}
                to={l.to}
                className="px-1 py-2 text-sm text-foreground/90 hover:bg-secondary/20 rounded-md transition-colors"
              >
                {l.label}
              </Link>
            ))}
            <Button asChild className="group mt-2 w-full relative overflow-hidden bg-accent text-accent-foreground hover:bg-accent/90">
              <a href="#" target="_blank" rel="noopener noreferrer">
                <div className="flex items-center justify-center gap-2 relative z-10">
                  <ShoppingCart className="h-4 w-4" />
                  <span>Visit Store</span>
                </div>
                <span aria-hidden className="pointer-events-none absolute inset-0 -translate-x-full bg-[linear-gradient(110deg,transparent,rgba(255,255,255,.35),transparent)] transition-transform duration-700 ease-out group-hover:translate-x-full" />
              </a>
            </Button>
          </div>
        </div>
      )}
    </header>
  );
}

export default SiteHeader;