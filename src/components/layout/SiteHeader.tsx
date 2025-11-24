'use client';

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { ShoppingCart, Play, Pause, Volume2, Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { useEffect, useRef, useState } from "react";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/divisions", label: "Divisions" },
  { href: "/gallery", label: "Gallery" },
  { href: "/contact", label: "Contact" },
] as const;

const MUSIC_SRC = "/music/please.mp3";

export function SiteHeader() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [progress, setProgress] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const audioRef = useRef<HTMLAudioElement>(null);
  const pathname = usePathname();

  // Reset mobile menu + scroll to top saat ganti halaman
  useEffect(() => {
    setIsMobileMenuOpen(false);
    window.scrollTo(0, 0);
  }, [pathname]);

  // Scroll progress + header blur
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const height = document.documentElement.scrollHeight - window.innerHeight;
      const scrolled = scrollY > 10;

      setIsScrolled(scrolled);
      setProgress(height > 0 ? (scrollY / height) * 100 : 0);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Audio controls
  const togglePlay = async () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      try {
        await audioRef.current.play();
      } catch (err) {
        console.log("Play blocked:", err);
      }
    }
  };

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const update = () => {
      setCurrentTime(audio.currentTime);
      setDuration(audio.duration || 0);
    };

    audio.addEventListener("timeupdate", update);
    audio.addEventListener("loadedmetadata", update);
    audio.addEventListener("ended", () => setIsPlaying(false));
    audio.addEventListener("play", () => setIsPlaying(true));
    audio.addEventListener("pause", () => setIsPlaying(false));

    return () => {
      audio.removeEventListener("timeupdate", update);
      audio.removeEventListener("loadedmetadata", update);
      audio.removeEventListener("ended", () => setIsPlaying(false));
    };
  }, []);

  const formatTime = (sec: number) => {
    const m = Math.floor(sec / 60);
    const s = Math.floor(sec % 60);
    return `${m}:${s.toString().padStart(2, "0")}`;
  };

  return (
    <>
      <audio ref={audioRef} src={MUSIC_SRC} preload="metadata" />

      <header
        className={cn(
          "sticky top-0 z-50 w-full transition-all duration-500",
          "bg-background/70 backdrop-blur-xl border-b border-white/5",
          isScrolled && "bg-background/90 shadow-xl"
        )}
      >
        {/* Progress Bar */}
        <div
          className="absolute inset-x-0 top-0 h-0.5 bg-accent/90 origin-left transition-transform duration-300"
          style={{ transform: `scaleX(${progress / 100})` }}
        />

        <div className={cn("container flex h-16 items-center justify-between", isScrolled && "h-14")}>
          {/* Logo + Play/Pause Trigger */}
          <Link
            href="/"
            onClick={(e) => {
              e.preventDefault();
              togglePlay();
              window.location.href = "/";
            }}
            className="flex items-center gap-3 group"
          >
            <img
              src="/logo/logo-bem-header.png"
              alt="BEM FILKOM"
              width={36}
              height={36}
              className="rounded-md shrink-0"
            />
            <div className="flex flex-col leading-none">
              <span className="font-extrabold tracking-tighter">BEM FILKOM</span>
              <span className="text-[9px] uppercase tracking-widest text-muted-foreground">
                Universitas Djuanda
              </span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-1">
            {navLinks.map(({ href, label }) => {
              const active = pathname === href;
              return (
                <Link
                  key={href}
                  href={href}
                  className={cn(
                    "relative px-4 py-2 text-sm font-medium rounded-lg transition-all",
                    "after:absolute after:bottom-1 after:left-4 after:right-4 after:h-0.5 after:bg-accent after:origin-center after:scale-x-0 after:transition-transform",
                    active
                      ? "text-foreground bg-secondary/40 after:scale-x-100"
                      : "text-foreground/70 hover:text-foreground hover:bg-secondary/20 hover:after:scale-x-100"
                  )}
                >
                  {label}
                </Link>
              );
            })}
          </nav>

          {/* Right Side: Music + Store (Desktop) */}
          <div className="hidden md:flex items-center gap-4">
            {/* Mini Player */}
            <div className="flex items-center gap-3 bg-secondary/40 backdrop-blur-sm rounded-full px-4 py-2 border border-white/10">
              <button onClick={togglePlay} className="hover:text-foreground/80 transition">
                {isPlaying ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5" />}
              </button>
              <div className="flex items-center gap-2 text-xs">
                <Volume2 className="h-3.5 w-3.5 text-muted-foreground" />
                <span className="text-muted-foreground font-mono">
                  {formatTime(currentTime)} / {formatTime(duration) || "--:--"}
                </span>
              </div>
              <div className="w-20 h-1 bg-secondary/50 rounded-full overflow-hidden">
                <div
                  className="h-full bg-accent transition-all duration-300"
                  style={{ width: `${duration ? (currentTime / duration) * 100 : 0}%` }}
                />
              </div>
            </div>

            {/* Store Button */}
            <Button asChild className="bg-accent hover:bg-accent/90 text-accent-foreground font-medium">
              <a
                href="https://www.instagram.com/filkomstore"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2"
              >
                <ShoppingCart className="h-4 w-4" />
                Visit Store
              </a>
            </Button>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setIsMobileMenuOpen((v) => !v)}
            className={cn(
              "md:hidden p-2 rounded-lg border transition",
              isMobileMenuOpen ? "bg-secondary/30" : "bg-background/50"
            )}
          >
            {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden border-t bg-background/95 backdrop-blur-xl">
            <div className="container py-5 space-y-4">
              {navLinks.map(({ href, label }) => (
                <Link
                  key={href}
                  href={href}
                  className="block py-3 text-lg font-medium hover:text-accent transition"
                >
                  {label}
                </Link>
              ))}

              <div className="flex items-center justify-between bg-secondary/30 rounded-xl p-4">
                <button onClick={togglePlay} className="flex items-center gap-3">
                  {isPlaying ? <Pause className="h-6 w-6" /> : <Play className="h-6 w-6" />}
                  <span className="font-medium">BEM Vibes</span>
                </button>
                <span className="text-sm text-muted-foreground font-mono">
                  {formatTime(currentTime)}
                </span>
              </div>

              <Button asChild className="w-full bg-accent hover:bg-accent/90">
                <a href="https://www.instagram.com/filkomstore" target="_blank" rel="noopener noreferrer">
                  <ShoppingCart className="h-5 w-5 mr-2" />
                  Visit Store
                </a>
              </Button>
            </div>
          </div>
        )}
      </header>
    </>
  );
}

export default SiteHeader;