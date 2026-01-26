'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';
import { 
  Home, 
  Info, 
  Users, 
  Image as ImageIcon, 
  Mail,
  ChevronRight
} from 'lucide-react';

const navItems = [
  { href: '/', label: 'Home', icon: Home },
  { href: '/about', label: 'About', icon: Info },
  { href: '/divisions', label: 'Divisions', icon: Users },
  { href: '/gallery', label: 'Showup', icon: ImageIcon },
  { href: '/contact', label: 'Contact', icon: Mail },
];

export default function StickySidebar() {
  const [isVisible, setIsVisible] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      // Show sidebar when scrolled down 200px
      if (window.scrollY > 200) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (!isVisible) return null;

  return (
    <motion.aside
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ duration: 0.3 }}
      className="fixed left-4 xl:left-6 top-1/2 -translate-y-1/2 z-40 hidden lg:block"
    >
      <nav className="bg-card/80 backdrop-blur-xl border border-border/50 rounded-2xl p-3 shadow-xl">
        <ul className="flex flex-col gap-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;
            
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={cn(
                    "flex items-center gap-3 px-4 py-3 rounded-xl",
                    "transition-all duration-200",
                    "group relative overflow-hidden",
                    isActive
                      ? "bg-primary text-primary-foreground shadow-md"
                      : "text-foreground/70 hover:text-foreground hover:bg-secondary/50"
                  )}
                  aria-label={item.label}
                >
                  <Icon className={cn(
                    "h-5 w-5 shrink-0 transition-transform",
                    "group-hover:scale-110",
                    isActive && "text-primary-foreground"
                  )} />
                  <span className={cn(
                    "font-medium text-sm whitespace-nowrap",
                    "transition-all duration-200",
                    isActive && "text-primary-foreground"
                  )}>
                    {item.label}
                  </span>
                  {isActive && (
                    <ChevronRight className="h-4 w-4 ml-auto text-primary-foreground" />
                  )}
                  
                  {/* Hover effect */}
                  <div className={cn(
                    "absolute inset-0 bg-gradient-to-r from-primary/10 to-transparent",
                    "opacity-0 group-hover:opacity-100 transition-opacity",
                    isActive && "hidden"
                  )} />
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </motion.aside>
  );
}
