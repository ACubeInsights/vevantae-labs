'use client';

import Script from 'next/script';

declare global {
  interface Window {
    gtag: (command: string, ...args: unknown[]) => void;
    dataLayer: unknown[];
  }
}

// Simple tracking functions that can be called from any component
export const trackEvent = (action: string, category: string, label?: string, value?: number) => {
  console.log('📊 GA Event:', { action, category, label, value });

  try {
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', action, {
        event_category: category,
        event_label: label,
        value: value,
      });
      console.log('✅ GA Event sent successfully');
    } else {
      console.log('⏳ gtag not ready, queuing event');
      // Queue the event for when gtag loads
      if (typeof window !== 'undefined') {
        window.dataLayer = window.dataLayer || [];
        window.dataLayer.push({
          event: 'custom_event',
          action,
          category,
          label,
          value,
        });
      }
    }
  } catch (error) {
    console.error('❌ GA Event error:', error);
  }
};

export const trackPageVisit = (path: string) => {
  console.log('📄 GA Page Visit:', path);

  try {
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('config', process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID!, {
        page_path: path,
      });
      console.log('✅ GA Page Visit sent successfully');
    } else {
      console.log('⏳ gtag not ready for page visit');
    }
  } catch (error) {
    console.error('❌ GA Page Visit error:', error);
  }
};

export const trackFormSubmission = (
  formName: string,
  additionalData?: Record<string, string | number | boolean>
) => {
  const eventName = `${formName.toLowerCase()}_form_submission`;

  trackEvent(eventName, 'form_interaction', formName, additionalData?.value as number);
};

export default function GoogleAnalyticsSimple() {
  const measurementId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;

  if (!measurementId) {
    console.warn('⚠️ GA Measurement ID not found');
    return null;
  }

  console.log('🔧 Loading Google Analytics:', measurementId);

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${measurementId}`}
        strategy="afterInteractive"
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${measurementId}');
          console.log('🚀 Google Analytics initialized with ID: ${measurementId}');
        `}
      </Script>
    </>
  );
}
