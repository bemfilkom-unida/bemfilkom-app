'use client';

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { ShoppingCart, Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/divisions", label: "Divisions" },
  { href: "/gallery", label: "Showup" },
  { href: "/contact", label: "Contact" },
] as const;

export function SiteHeader() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [progress, setProgress] = useState(0);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const pathname = usePathname();

  // Reset mobile menu + scroll to top saat ganti halaman
  useEffect(() => {
    setIsMobileMenuOpen(false);
    window.scrollTo(0, 0);
  }, [pathname]);

  // Scroll progress + header blur (tetap dipertahankan)
  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const scrollY = window.scrollY;
          const height = document.documentElement.scrollHeight - window.innerHeight;
          const scrolled = scrollY > 10;

          setIsScrolled(scrolled);
          setProgress(height > 0 ? (scrollY / height) * 100 : 0);
          ticking = false;
        });
        ticking = true;
      }
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
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
        {/* Logo – sekarang link biasa tanpa music trigger */}
        <Link href="/" className="flex items-center gap-3 group">
          <Image
            src="/logo/header-bem.webp"
            alt="BEM FILKOM"
            width={36}
            height={44}
            priority
            className="shrink-0"
            style={{ width: 36, height: 44 }}
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

        {/* Right Side: Hanya Store Button (desktop) */}
        <div className="hidden md:flex items-center gap-4">
          <Button asChild className="bg-accent hover:bg-accent/80 text-white font-medium">
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
          aria-label={isMobileMenuOpen ? "Close navigation menu" : "Open navigation menu"}
          aria-expanded={isMobileMenuOpen}
        >
          {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {/* Mobile Menu – tanpa music player */}
      {isMobileMenuOpen && (
        <div className="md:hidden border-t bg-background/95 backdrop-blur-xl">
          <div className="container py-5 space-y-4">
            {navLinks.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                className="block py-3 text-lg font-medium hover:text-accent transition"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {label}
              </Link>
            ))}

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
  );
}

export default SiteHeader;