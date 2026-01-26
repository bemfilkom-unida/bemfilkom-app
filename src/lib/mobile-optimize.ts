/**
 * Mobile optimization utilities
 */

/**
 * Check if device is mobile
 */
export function isMobile(): boolean {
  if (typeof window === 'undefined') return false;
  return window.innerWidth < 768;
}

/**
 * Check if user prefers reduced motion
 */
export function prefersReducedMotion(): boolean {
  if (typeof window === 'undefined') return false;
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

/**
 * Get optimized image quality based on device
 */
export function getImageQuality(): number {
  if (isMobile()) {
    return 75; // Lower quality for mobile to save bandwidth
  }
  return 85; // Higher quality for desktop
}

/**
 * Should reduce animations
 */
export function shouldReduceAnimations(): boolean {
  return isMobile() || prefersReducedMotion();
}
