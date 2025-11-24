module.exports = [
"[next]/internal/font/google/inter_5972bc34.module.css [app-rsc] (css module)", ((__turbopack_context__) => {

__turbopack_context__.v({
  "className": "inter_5972bc34-module__OU16Qa__className",
});
}),
"[next]/internal/font/google/inter_5972bc34.js [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$next$5d2f$internal$2f$font$2f$google$2f$inter_5972bc34$2e$module$2e$css__$5b$app$2d$rsc$5d$__$28$css__module$29$__ = __turbopack_context__.i("[next]/internal/font/google/inter_5972bc34.module.css [app-rsc] (css module)");
;
const fontData = {
    className: __TURBOPACK__imported__module__$5b$next$5d2f$internal$2f$font$2f$google$2f$inter_5972bc34$2e$module$2e$css__$5b$app$2d$rsc$5d$__$28$css__module$29$__["default"].className,
    style: {
        fontFamily: "'Inter', 'Inter Fallback'",
        fontStyle: "normal"
    }
};
if (__TURBOPACK__imported__module__$5b$next$5d2f$internal$2f$font$2f$google$2f$inter_5972bc34$2e$module$2e$css__$5b$app$2d$rsc$5d$__$28$css__module$29$__["default"].variable != null) {
    fontData.variable = __TURBOPACK__imported__module__$5b$next$5d2f$internal$2f$font$2f$google$2f$inter_5972bc34$2e$module$2e$css__$5b$app$2d$rsc$5d$__$28$css__module$29$__["default"].variable;
}
const __TURBOPACK__default__export__ = fontData;
}),
"[project]/src/components/layout/SiteHeader.tsx [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

// 'use client';
// import Link from "next/link";
// import { usePathname } from "next/navigation";
// import { Button } from "@/components/ui/button";
// import { ShoppingCart, Play, Pause, Volume2 } from "lucide-react";
// import { cn } from "@/lib/utils";
// import { useEffect, useRef, useState } from "react";
// const navLinks = [
//   { to: "/", label: "Home" },
//   { to: "/about", label: "About" },
//   { to: "/divisions", label: "Divisions" },
//   { to: "/gallery", label: "Gallery" },
//   { to: "/contact", label: "Contact" },
// ];
// function BemLogo({ className, onClick }: { className?: string; onClick?: () => void }) {
//   return (
//     <Link href="/" onClick={onClick} className={cn("flex items-center gap-2 group", className)}>
//       <img
//         src="/logo/logo-bem-header.png"
//         alt="BEM FILKOM Logo"
//         width={32}
//         height={32}
//         className="shrink-0 rounded-md"
//       />
//       <div className="flex flex-col leading-none">
//         <span className="text-base font-extrabold tracking-tight text-foreground">
//           BEM FILKOM
//         </span>
//         <span className="text-[10px] uppercase tracking-widest text-muted-foreground">
//           Universitas Djuanda
//         </span>
//       </div>
//     </Link>
//   );
// }
// export function SiteHeader() {
//   const [open, setOpen] = useState(false);
//   const [scrolled, setScrolled] = useState(false);
//   const [progress, setProgress] = useState(0);
//   const [isPlaying, setIsPlaying] = useState(false);
//   const [currentTime, setCurrentTime] = useState(0);
//   const [duration, setDuration] = useState(0);
//   const audioRef = useRef<HTMLAudioElement>(null);
//   const rafRef = useRef<number>(0);
//   const pending = useRef<{ y: number; h: number } | null>(null);
//   const pathname = usePathname();
//   // Ganti nama file musik di sini
//   const musicSrc = "/music/please.mp3";
//   useEffect(() => {
//     setOpen(false);
//     window.scrollTo(0, 0);
//   }, [pathname]);
//   // Scroll handler (progress bar atas)
//   useEffect(() => {
//     const onScroll = () => {
//       const y = window.scrollY;
//       const dh = document.documentElement.scrollHeight - window.innerHeight;
//       pending.current = { y, h: dh > 0 ? dh : 1 };
//       if (!rafRef.current) {
//         rafRef.current = requestAnimationFrame(() => {
//           const p = pending.current!;
//           setScrolled(p.y > 8);
//           setProgress(Math.min(100, Math.max(0, (p.y / p.h) * 100)));
//           rafRef.current = 0;
//         });
//       }
//     };
//     onScroll();
//     window.addEventListener("scroll", onScroll, { passive: true });
//     return () => {
//       window.removeEventListener("scroll", onScroll as any);
//       if (rafRef.current) cancelAnimationFrame(rafRef.current);
//     };
//   }, []);
//   // Audio controls
//   const togglePlayPause = () => {
//     const audio = audioRef.current;
//     if (!audio) return;
//     if (isPlaying) {
//       audio.pause();
//       setIsPlaying(false);
//     } else {
//       audio.play().then(() => {
//         setIsPlaying(true);
//       }).catch(e => {
//         console.log('Audio play failed:', e);
//         setIsPlaying(false);
//       });
//     }
//   };
//   useEffect(() => {
//     const audio = audioRef.current;
//     if (!audio) return;
//     const updateTime = () => {
//       setCurrentTime(audio.currentTime);
//       setDuration(audio.duration || 0);
//     };
//     const handleEnded = () => {
//       setIsPlaying(false);
//     };
//     audio.addEventListener("timeupdate", updateTime);
//     audio.addEventListener("loadedmetadata", updateTime);
//     audio.addEventListener("ended", handleEnded);
//     return () => {
//       audio.removeEventListener("timeupdate", updateTime);
//       audio.removeEventListener("loadedmetadata", updateTime);
//       audio.removeEventListener("ended", handleEnded);
//     };
//   }, []);
//   const formatTime = (seconds: number) => {
//     const mins = Math.floor(seconds / 60);
//     const secs = Math.floor(seconds % 60);
//     return `${mins}:${secs.toString().padStart(2, "0")}`;
//   };
//   return (
//     <>
//       {/* Audio element tersembunyi */}
//       <audio ref={audioRef} src={musicSrc} preload="metadata" />
//       <header
//         className={cn(
//           "sticky top-0 z-50 w-full transition-all duration-300",
//           scrolled ? "backdrop-blur-sm bg-background/20" : "bg-transparent"
//         )}
//       >
//         {/* Progress bar scroll */}
//         <div className="absolute left-0 top-0 h-[2px] bg-accent/90" style={{ width: `${progress}%` }} />
//         <div className={cn("container flex items-center justify-between", scrolled ? "h-14" : "h-16")}>
//           <BemLogo onClick={togglePlayPause} />
//           <nav className="hidden lg:flex items-center gap-1">
//             {navLinks.map((l) => {
//               const isActive = pathname === l.to;
//               return (
//                 <Link
//                   key={l.to}
//                   href={l.to}
//                   className={cn(
//                     "relative px-3 py-2 text-sm font-medium rounded-md transition-colors",
//                     "after:absolute after:left-3 after:right-3 after:-bottom-0.5 after:h-0.5 after:rounded-full after:scale-x-0 after:origin-left after:transition-transform after:bg-accent hover:after:scale-x-100",
//                     isActive
//                       ? "text-foreground bg-secondary/30 after:scale-x-100"
//                       : "text-foreground/80 hover:text-foreground hover:bg-secondary/20"
//                   )}
//                 >
//                   {l.label}
//                 </Link>
//               );
//             })}
//           </nav>
//           {/* Music Player + Store Button */}
//           <div className="hidden md:flex items-center gap-3">
//             {/* Mini Music Player */}
//             <div className="flex items-center gap-3 bg-secondary/40 backdrop-blur-sm rounded-full px-4 py-2 border">
//               <button
//                 onClick={togglePlayPause}
//                 className="text-foreground hover:text-foreground/80 transition"
//                 aria-label={isPlaying ? "Pause" : "Play"}
//               >
//                 {isPlaying ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5" />}
//               </button>
//               <div className="flex items-center gap-2 text-xs">
//                 <Volume2 className="h-4 w-4 text-muted-foreground" />
//                 <span className="text-muted-foreground">
//                   {formatTime(currentTime)} / {formatTime(duration) || "--:--"}
//                 </span>
//               </div>
//               <div className="w-20 h-1 bg-secondary rounded-full overflow-hidden">
//                 <div
//                   className="h-full bg-accent transition-all duration-300"
//                   style={{ width: `${duration ? (currentTime / duration) * 100 : 0}%` }}
//                 />
//               </div>
//             </div>
//             {/* Store Button */}
//             <Button asChild className="group relative overflow-hidden shadow-sm bg-accent text-accent-foreground hover:bg-accent/90">
//               <a href="https://www.instagram.com/filkomstore" target="_blank" rel="noopener noreferrer">
//                 <div className="flex items-center gap-2 relative z-10">
//                   <ShoppingCart className="h-4 w-4" />
//                   <span>Visit Store</span>
//                 </div>
//                 <span
//                   aria-hidden
//                   className="pointer-events-none absolute inset-0 -translate-x-full bg-[linear-gradient(110deg,transparent,rgba(255,255,255,.35),transparent)] transition-transform duration-700 ease-out group-hover:translate-x-full"
//                 />
//               </a>
//             </Button>
//           </div>
//           {/* Mobile menu */}
//           <button
//             aria-label="Open menu"
//             className={cn(
//               "md:hidden inline-flex h-10 w-10 items-center justify-center rounded-md border transition-colors",
//               open ? "bg-secondary/30" : "bg-background/60"
//             )}
//             onClick={() => setOpen((v) => !v)}
//           >
//             {open ? (
//               <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="size-5">
//                 <path d="M18 6 6 18M6 6l12 12" />
//               </svg>
//             ) : (
//               <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="size-5">
//                 <path d="M3 6h18M3 12h18M3 18h18" />
//               </svg>
//             )}
//           </button>
//         </div>
//         {/* Mobile menu dengan music control */}
//         {open && (
//           <div className="md:hidden border-t bg-background/95 backdrop-blur-sm">
//             <div className="container py-4 space-y-3">
//               {navLinks.map((l) => (
//                 <Link key={l.to} href={l.to} className="block px-3 py-2 text-sm font-medium hover:bg-secondary/20 rounded-md">
//                   {l.label}
//                 </Link>
//               ))}
//               {/* Mini player di mobile */}
//               <div className="flex items-center justify-between bg-secondary/30 rounded-lg p-3">
//                 <button onClick={togglePlayPause} className="flex items-center gap-3">
//                   {isPlaying ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5" />}
//                   <span className="text-sm">BEM Vibes</span>
//                 </button>
//                 <span className="text-xs text-muted-foreground">
//                   {formatTime(currentTime)} / {formatTime(duration) || "--:--"}
//                 </span>
//               </div>
//               <Button asChild className="w-full bg-accent text-accent-foreground hover:bg-accent/90">
//                 <a href="https://www.instagram.com/filkomstore" target="_blank" rel="noopener noreferrer">
//                   <ShoppingCart className="h-4 w-4 mr-2" />
//                   Visit Store
//                 </a>
//               </Button>
//             </div>
//           </div>
//         )}
//       </header>
//     </>
//   );
// }
// export default SiteHeader;
__turbopack_context__.s([]);
}),
"[project]/src/app/layout.tsx [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>RootLayout,
    "metadata",
    ()=>metadata
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/rsc/react-jsx-dev-runtime.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$next$5d2f$internal$2f$font$2f$google$2f$inter_5972bc34$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[next]/internal/font/google/inter_5972bc34.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$layout$2f$SiteHeader$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/layout/SiteHeader.tsx [app-rsc] (ecmascript)");
;
;
;
const metadata = {
    title: "BEM FILKOM UNIDA",
    description: "Badan Eksekutif Mahasiswa Fakultas Ilmu Komputer Universitas Djuanda",
    icons: {
        icon: '/logo/icon-bem.svg',
        shortcut: '/logo/icon-bem.svg',
        apple: '/logo/icon-bem.svg'
    },
    manifest: '/manifest.json'
};
;
function RootLayout({ children }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("html", {
        lang: "id",
        suppressHydrationWarning: true,
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("body", {
            className: __TURBOPACK__imported__module__$5b$next$5d2f$internal$2f$font$2f$google$2f$inter_5972bc34$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"].className,
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$layout$2f$SiteHeader$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"], {}, void 0, false, {
                    fileName: "[project]/src/app/layout.tsx",
                    lineNumber: 28,
                    columnNumber: 9
                }, this),
                children
            ]
        }, void 0, true, {
            fileName: "[project]/src/app/layout.tsx",
            lineNumber: 27,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/src/app/layout.tsx",
        lineNumber: 26,
        columnNumber: 5
    }, this);
}
}),
"[project]/node_modules/next/dist/server/route-modules/app-page/vendored/rsc/react-jsx-dev-runtime.js [app-rsc] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

module.exports = __turbopack_context__.r("[project]/node_modules/next/dist/server/route-modules/app-page/module.compiled.js [app-rsc] (ecmascript)").vendored['react-rsc'].ReactJsxDevRuntime; //# sourceMappingURL=react-jsx-dev-runtime.js.map
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__cc2d5f29._.js.map