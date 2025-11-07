'use client';

import { useEffect, useRef, useState } from 'react';
import { usePathname } from 'next/navigation';
import {
  trackTimeOnPage,
  trackScrollDepth,
  trackUserEngagement,
  trackBounceIntention,
  trackSessionStart,
  trackSessionEnd,
  updateSessionStats,
  getCurrentSessionDuration,
  trackSessionMilestone,
} from './GoogleAnalytics';

export function useSessionTracking() {
  const pathname = usePathname();
  const startTime = useRef<number>(Date.now());
  const scrollPercentages = useRef<Set<number>>(new Set());
  const interactions = useRef<number>(0);
  const [isVisible, setIsVisible] = useState(true);
  const sessionMilestones = useRef<Set<number>>(new Set());
  const isFirstLoad = useRef<boolean>(true);

  useEffect(() => {
    if (isFirstLoad.current && typeof window !== 'undefined') {
      const existingSession = sessionStorage.getItem('session_start_time');

      if (!existingSession) {
        trackSessionStart();
      }

      updateSessionStats(true, false); // New page view
      isFirstLoad.current = false;
    }
  }, []);

  useEffect(() => {
    const checkMilestones = () => {
      const sessionDuration = getCurrentSessionDuration();
      const milestones = [30, 60, 120, 300, 600]; // seconds

      milestones.forEach((milestone) => {
        if (sessionDuration >= milestone && !sessionMilestones.current.has(milestone)) {
          sessionMilestones.current.add(milestone);
          const minutes = Math.floor(milestone / 60);
          const seconds = milestone % 60;
          const label =
            minutes > 0 ? `${minutes}min${seconds > 0 ? ` ${seconds}s` : ''}` : `${seconds}s`;
          trackSessionMilestone(label);
        }
      });
    };

    const interval = setInterval(checkMilestones, 5000); // Check every 5 seconds
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (!isFirstLoad.current) {
      updateSessionStats(true, false); // New page view
    }
  }, [pathname]);

  useEffect(() => {
    const handleVisibilityChange = () => {
      setIsVisible(!document.hidden);

      if (document.hidden) {
        const timeSpent = Math.floor((Date.now() - startTime.current) / 1000);
        const sessionDuration = getCurrentSessionDuration();
        trackUserEngagement('page_hidden', {
          time_before_hide: timeSpent,
          page: pathname,
          total_session_duration: sessionDuration,
        });
      } else {
        startTime.current = Date.now(); // Reset timer
        const sessionDuration = getCurrentSessionDuration();
        trackUserEngagement('page_visible', {
          page: pathname,
          total_session_duration: sessionDuration,
        });
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    return () => document.removeEventListener('visibilitychange', handleVisibilityChange);
  }, [pathname]);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.pageYOffset;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollPercent = Math.round((scrollTop / docHeight) * 100);

      const milestones = [25, 50, 75, 90];
      milestones.forEach((milestone) => {
        if (scrollPercent >= milestone && !scrollPercentages.current.has(milestone)) {
          scrollPercentages.current.add(milestone);
          trackScrollDepth(milestone, pathname);
        }
      });
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [pathname]);

  useEffect(() => {
    const handleInteraction = (event: Event) => {
      interactions.current += 1;
      updateSessionStats(false, true); // New interaction

      const target = event.target as HTMLElement;
      const interactionType = target.tagName.toLowerCase();

      if (['button', 'a', 'input', 'textarea', 'select'].includes(interactionType)) {
        const sessionDuration = getCurrentSessionDuration();
        trackUserEngagement('interaction', {
          element_type: interactionType,
          element_text: target.textContent?.slice(0, 50) || '',
          page: pathname,
          total_interactions: interactions.current,
          session_duration: sessionDuration,
        });
      }
    };

    const events = ['click', 'input', 'change', 'submit'];
    events.forEach((event) => {
      document.addEventListener(event, handleInteraction);
    });

    return () => {
      events.forEach((event) => {
        document.removeEventListener(event, handleInteraction);
      });
    };
  }, [pathname]);

  useEffect(() => {
    const handleBeforeUnload = () => {
      trackSessionEnd();
    };

    const handleUnload = () => {
      trackSessionEnd();
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    window.addEventListener('unload', handleUnload);

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
      window.removeEventListener('unload', handleUnload);
    };
  }, []);

  useEffect(() => {
    return () => {
      const timeSpent = Math.floor((Date.now() - startTime.current) / 1000);
      const sessionDuration = getCurrentSessionDuration();

      if (timeSpent > 3) {
        trackTimeOnPage(pathname, timeSpent);

        if (timeSpent < 10 && interactions.current === 0 && sessionDuration < 30) {
          trackBounceIntention(timeSpent, interactions.current);
        }
      }
    };
  }, [pathname]);

  useEffect(() => {
    startTime.current = Date.now();
    scrollPercentages.current.clear();
    interactions.current = 0;
  }, [pathname]);

  return {
    timeSpent: Math.floor((Date.now() - startTime.current) / 1000),
    sessionDuration: typeof window !== 'undefined' ? getCurrentSessionDuration() : 0,
    interactions: interactions.current,
    isVisible,
  };
}
