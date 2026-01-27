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
    // IMPORTANT: Never show loading screen on first page load
    // This delays LCP significantly. Only show on client-side navigation.
    // LoadingScreen is disabled to optimize Core Web Vitals (LCP < 2.5s)
    setShowLoading(false);
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