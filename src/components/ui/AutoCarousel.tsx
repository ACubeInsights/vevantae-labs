'use client';

import { ReactNode } from 'react';

interface AutoCarouselProps {
  children: ReactNode;
  duration?: number;
}

export function AutoCarousel({ children, duration = 40 }: AutoCarouselProps) {
  return (
    <div className="relative overflow-hidden py-8">
      <div className="flex animate-scroll hover:pause gap-6 lg:gap-8">
        {/* Render children twice for seamless looping */}
        {children}
        {children}
      </div>

      <style jsx>{`
        @keyframes scroll {
          from {
            transform: translateX(0);
          }
          to {
            transform: translateX(-50%);
          }
        }
        .animate-scroll {
          animation: scroll ${duration}s linear infinite reverse;
          will-change: transform;
          width: max-content;
        }
        .animate-scroll:hover {
          animation-play-state: paused;
        }
      `}</style>
    </div>
  );
}
