'use client';

import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import {
  trackPageVisit,
  trackFormSubmission,
  updateSessionStats,
} from '@/components/GoogleAnalytics';

interface SimplePageTrackingOptions {
  pageName: string;
  additionalData?: Record<string, string | number | boolean>;
}

export function usePageTracking(options: SimplePageTrackingOptions) {
  const { pageName, additionalData } = options;
  const pathname = usePathname();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (!isClient) return;
    updateSessionStats(true, false);
    const timeoutId = setTimeout(() => {
      trackPageVisit(pageName, {
        page_path: pathname,
        ...additionalData,
      });
    }, 1500);

    return () => clearTimeout(timeoutId);
  }, [pathname, pageName, additionalData, isClient]);

  return {
    trackFormSubmission: (
      formName: string,
      details?: Record<string, string | number | boolean>
    ) => {
      if (!isClient) return;

      updateSessionStats(false, true);
      trackFormSubmission(formName, {
        page_name: pageName,
        ...details,
      });
    },
  };
}
