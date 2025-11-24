'use client';

import { useEffect, useState } from 'react';

export default function LoadingScreen() {
  const [isLoading, setIsLoading] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          setTimeout(() => setIsLoading(false), 500);
          return 100;
        }
        return prev + Math.random() * 15;
      });
    }, 150);

    return () => clearInterval(timer);
  }, []);

  if (!isLoading) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-background">
      {/* Animated Background Pattern */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-primary/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-accent/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-br from-primary/10 to-accent/10 rounded-full blur-3xl animate-pulse" />
      </div>

      <div className="relative z-10 flex flex-col items-center space-y-8">
        {/* Coding Icon Animation */}
        <div className="relative">
          <div className="w-20 h-20 rounded-lg bg-gradient-to-br from-primary to-accent flex items-center justify-center shadow-lg animate-bounce">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="w-10 h-10 text-white"
            >
              <polyline points="16 18 22 12 16 6" />
              <polyline points="8 6 2 12 8 18" />
            </svg>
          </div>

          {/* Rotating Code Brackets */}
          <div className="absolute -top-2 -right-2 w-6 h-6 text-primary animate-spin-slow">
            <svg viewBox="0 0 24 24" fill="currentColor">
              <path d="M4 3h16a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2m0 2v14h16V5H4" />
            </svg>
          </div>

          {/* Floating Code Dots */}
          <div className="absolute -bottom-1 -left-1 w-3 h-3 bg-accent rounded-full animate-ping" />
          <div className="absolute -top-3 left-3 w-2 h-2 bg-primary rounded-full animate-ping" />
          <div className="absolute -right-2 bottom-2 w-2 h-2 bg-accent rounded-full animate-ping" />
        </div>

        {/* Loading Text */}
        <div className="text-center space-y-4">
          <div className="space-y-2">
            <h1 className="text-2xl font-bold tracking-tight gradient-animation bg-clip-text text-transparent">
              BEM FILKOM
            </h1>
            <p className="text-muted-foreground text-sm">
              Kabinet Neogenesis 2025
            </p>
          </div>

          {/* Progress Bar */}
          <div className="w-64 h-2 bg-muted rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-primary to-accent transition-all duration-300 ease-out rounded-full"
              style={{ width: `${progress}%` }}
            />
          </div>

          {/* Loading Percentage */}
          <p className="text-xs text-muted-foreground font-mono">
            {Math.min(100, Math.round(progress))}%
          </p>

          {/* Loading Text Animation */}
          <div className="flex items-center justify-center space-x-1">
            <span className="text-xs text-muted-foreground">Initializing</span>
            <div className="flex space-x-1">
              <div className="w-1 h-1 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
              <div className="w-1 h-1 bg-primary rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
              <div className="w-1 h-1 bg-primary rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
            </div>
          </div>
        </div>

        {/* Floating Code Elements */}
        <div className="absolute top-20 left-10 text-primary/20 text-xs font-mono animate-pulse">
          {'const'} bem = {'{'}{' '}
        </div>
        <div className="absolute bottom-20 right-10 text-accent/20 text-xs font-mono animate-pulse">
          {'}'};{' '}
        </div>
        <div className="absolute top-32 right-16 text-primary/20 text-xs font-mono animate-pulse">
          {'neogenesis: true'}
        </div>
        <div className="absolute bottom-32 left-16 text-accent/20 text-xs font-mono animate-pulse">
          {'function init() {'}
        </div>
      </div>

      {/* Custom Animation Styles */}
      <style jsx>{`
        @keyframes spin-slow {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }
        .animate-spin-slow {
          animation: spin-slow 3s linear infinite;
        }
      `}</style>
    </div>
  );
}