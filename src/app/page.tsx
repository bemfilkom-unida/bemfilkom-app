'use client';

import { useEffect, useState, lazy, Suspense } from 'react';
import Layout from '@/components/layout/Layout';
import LoadingScreen from '@/components/LoadingScreen';
import Hero from '@/components/home/Hero';

// Lazy load non-critical components
const ProgramsIntro = lazy(() => import('@/components/home/ProgramsIntro').then(m => ({ default: m.default })));
const VisionMission = lazy(() => import('@/components/home/VisionMission').then(m => ({ default: m.default })));
const Timeline = lazy(() => import('@/components/home/Timeline').then(m => ({ default: m.default })));
const ProgramTabs = lazy(() => import('@/components/home/ProgramTabs').then(m => ({ default: m.default })));
const FinalCTA = lazy(() => import('@/components/home/FinalCTA').then(m => ({ default: m.default })));

// Loading fallback for lazy components
const ComponentLoader = () => (
  <div className="min-h-[200px] flex items-center justify-center">
    <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
  </div>
);

export default function HomePage() {
  const [showLoading, setShowLoading] = useState(false);

  useEffect(() => {
    // Check if user has already seen loading screen in this session
    const hasSeenLoading = sessionStorage.getItem('hasSeenLoadingScreen');

    // Only show loading screen once per session
    if (!hasSeenLoading) {
      setShowLoading(true);
      document.body.classList.add('loading-active');

      // Show loading screen for 600ms (reduced from 800ms)
      const timer = setTimeout(() => {
        setShowLoading(false);
        document.body.classList.remove('loading-active');
        // Mark as seen
        sessionStorage.setItem('hasSeenLoadingScreen', 'true');
      }, 600);

      // Cleanup timer on unmount
      return () => {
        clearTimeout(timer);
        document.body.classList.remove('loading-active');
      };
    }
  }, []);

  return (
    <>
      {showLoading && <LoadingScreen />}
      <Layout>
        <div className="relative">
          <div className="relative z-10">
            <Hero />
            <Suspense fallback={<ComponentLoader />}>
              <ProgramsIntro />
            </Suspense>
            <Suspense fallback={<ComponentLoader />}>
              <VisionMission />
            </Suspense>
            <Suspense fallback={<ComponentLoader />}>
              <Timeline />
            </Suspense>
            <Suspense fallback={<ComponentLoader />}>
              <ProgramTabs />
            </Suspense>
            <Suspense fallback={<ComponentLoader />}>
              <FinalCTA />
            </Suspense>
          </div>
        </div>
      </Layout>
    </>
  );
}