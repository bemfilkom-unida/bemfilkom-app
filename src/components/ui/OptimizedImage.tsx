'use client';

import Image from 'next/image';
import { useState } from 'react';
import { cn } from '@/lib/utils';

interface OptimizedImageProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  priority?: boolean;
  className?: string;
  sizes?: string;
  placeholder?: 'blur' | 'empty';
  objectFit?: 'cover' | 'contain' | 'fill' | 'none' | 'scale-down';
}

export default function OptimizedImage({
  src,
  alt,
  width = 800,
  height = 600,
  priority = false,
  className,
  sizes = "(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw",
  placeholder = 'blur',
  objectFit = 'cover'
}: OptimizedImageProps) {
  // Validate src and alt props
  if (!src || !alt || src.trim() === '' || alt.trim() === '') {
    return null; // Don't render if essential props are missing
  }

  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);

  // Blur data URI untuk placeholder
  const blurDataURL = "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCdABmX/9k=";

  if (error) {
    return (
      <div
        className={cn(
          "bg-muted flex flex-col items-center justify-center text-muted-foreground",
          className
        )}
        style={{ aspectRatio: `${width}/${height}` }}
      >
        <span className="text-sm mb-2">Failed to load image</span>
        {src.includes('drive.google.com') && (
          <a
            href={src}
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary underline text-xs hover:text-primary/80"
          >
            Open in Google Drive
          </a>
        )}
      </div>
    );
  }

  return (
    <div className={cn("relative overflow-hidden", className)}>
      <Image
        src={src}
        alt={alt}
        width={width}
        height={height}
        priority={priority}
        sizes={sizes}
        placeholder={placeholder}
        blurDataURL={placeholder === 'blur' ? blurDataURL : undefined}
        className={cn(
          "transition-all duration-300",
          isLoading ? "scale-110 blur-sm" : "scale-100 blur-0"
        )}
        onLoad={() => setIsLoading(false)}
        onError={() => setError(true)}
        style={{
          objectFit: objectFit,
          width: '100%',
          height: '100%',
        }}
      />

      {isLoading && (
        <div className="absolute inset-0 bg-muted/20 animate-pulse" />
      )}
    </div>
  );
}