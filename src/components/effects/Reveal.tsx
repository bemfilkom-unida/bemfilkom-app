'use client';

import React, { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

export type RevealProps = {
  children: React.ReactNode;
  className?: string;
  as?: keyof JSX.IntrinsicElements;
  delay?: number; // ms
  y?: number; // px translateY distance
  x?: number; // px translateX distance (optional)
  scale?: number; // initial scale (e.g., 0.98)
  once?: boolean;
  threshold?: number;
};

export default function Reveal({
  children,
  className,
  as = "div",
  delay = 0,
  y = 16,
  x = 0,
  scale = 1,
  once = true,
  threshold = 0.12,
}: RevealProps) {
  const Comp: any = as;
  const ref = useRef<HTMLElement | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setVisible(true);
      return;
    }
    const el = ref.current as Element | null;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            setTimeout(() => setVisible(true), delay);
            if (once) io.unobserve(e.target);
          } else if (!once) {
            setVisible(false);
          }
        });
      },
      { threshold }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [delay, once, threshold]);

  const initial = {
    opacity: 0,
    transform: `translate3d(${x}px, ${y}px, 0) scale(${scale})`,
  } as React.CSSProperties;
  const final = {
    opacity: 1,
    transform: "translate3d(0, 0, 0) scale(1)",
  } as React.CSSProperties;

  return (
    <Comp
      ref={ref}
      className={cn(
        "transition-all duration-700 [transition-timing-function:cubic-bezier(0.22,1,0.36,1)] will-change-transform",
        className,
      )}
      style={visible ? final : initial}
    >
      {children}
    </Comp>
  );
}
