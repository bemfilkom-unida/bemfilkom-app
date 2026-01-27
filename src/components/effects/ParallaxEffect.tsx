'use client';

import { useEffect, useRef, useState } from 'react';
import { cn } from '@/lib/utils';

interface ParallaxEffectProps {
  children: React.ReactNode;
  className?: string;
  speed?: number; // 0.1 = slow, 0.5 = medium, 1 = fast
  direction?: 'up' | 'down' | 'left' | 'right';
}

export default function ParallaxEffect({
  children,
  className,
  speed = 0.5,
  direction = 'up',
}: ParallaxEffectProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const rafId = useRef<number | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (rafId.current !== null) {
        cancelAnimationFrame(rafId.current);
      }

      rafId.current = requestAnimationFrame(() => {
        const scrolled = window.pageYOffset;
        const rate = scrolled * -speed;

        // Calculate parallax based on direction
        let xOffset = 0;
        let yOffset = 0;

        switch (direction) {
          case 'up':
            yOffset = rate;
            break;
          case 'down':
            yOffset = -rate;
            break;
          case 'left':
            xOffset = rate;
            break;
          case 'right':
            xOffset = -rate;
            break;
        }

        setOffset({ x: xOffset, y: yOffset });
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Initial call

    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (rafId.current !== null) {
        cancelAnimationFrame(rafId.current);
      }
    };
  }, [speed, direction]);

  return (
    <div
      ref={ref}
      className={cn('parallax-container', className)}
      style={{
        transform: `translate3d(${offset.x}px, ${offset.y}px, 0)`,
        willChange: 'transform',
      }}
    >
      {children}
    </div>
  );
}

// Specialized parallax components for common use cases
export function SlowParallax({ children, className }: Omit<ParallaxEffectProps, 'speed'>) {
  return (
    <ParallaxEffect className={cn('parallax-slow', className)} speed={0.2}>
      {children}
    </ParallaxEffect>
  );
}

export function MediumParallax({ children, className }: Omit<ParallaxEffectProps, 'speed'>) {
  return (
    <ParallaxEffect className={cn('parallax-medium', className)} speed={0.5}>
      {children}
    </ParallaxEffect>
  );
}

export function FastParallax({ children, className }: Omit<ParallaxEffectProps, 'speed'>) {
  return (
    <ParallaxEffect className={cn('parallax-fast', className)} speed={0.8}>
      {children}
    </ParallaxEffect>
  );
}