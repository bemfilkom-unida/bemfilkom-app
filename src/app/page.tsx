'use client';

import { useEffect, useState } from 'react';
import Layout from '@/components/layout/Layout';
import LoadingScreen from '@/components/LoadingScreen';
import {
  Hero,
  ProgramsIntro,
  VisionMission,
  Timeline,
  ProgramTabs,
  FinalCTA,
} from '@/components/home';

export default function HomePage() {
  const [showLoading, setShowLoading] = useState(true);

  useEffect(() => {
    // Check if user has already visited before
    const hasVisited = sessionStorage.getItem('hasVisitedBEM');

    // If user has already visited, don't show loading screen
    if (hasVisited) {
      setShowLoading(false);
      return;
    }

    // Add loading class to body
    document.body.classList.add('loading-active');

    // Minimum loading time for better UX
    const timer = setTimeout(() => {
      setShowLoading(false);
      document.body.classList.remove('loading-active');
      // Mark as visited
      sessionStorage.setItem('hasVisitedBEM', 'true');
    }, 2500);

    // Cleanup timer on unmount
    return () => {
      clearTimeout(timer);
      document.body.classList.remove('loading-active');
    };
  }, []);

  return (
    <>
      {showLoading && <LoadingScreen />}
      <Layout>
        <div className="relative">
          <div className="relative z-10">
            <Hero />
            <ProgramsIntro />
            <VisionMission />
            <Timeline />
            <ProgramTabs />
            <FinalCTA />
          </div>
        </div>
      </Layout>
    </>
  );
}