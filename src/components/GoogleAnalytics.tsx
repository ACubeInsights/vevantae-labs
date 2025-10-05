'use client'

import Script from 'next/script'
import { usePathname, useSearchParams } from 'next/navigation'
import { useEffect } from 'react'

type GtagEventParams = Record<string, unknown>
type GtagConfigParams = Record<string, unknown>

declare global {
  interface Window {
    gtag: (command: 'config' | 'event' | 'js' | string, ...args: unknown[]) => void
  }
}

// Only enable GA when an explicit measurement ID is provided
const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID ?? ''

export function GoogleAnalytics() {
  const pathname = usePathname()
  const searchParams = useSearchParams()

  useEffect(() => {
    if (!GA_MEASUREMENT_ID) return

    const query = searchParams.size ? `?${searchParams.toString()}` : ''
    // Use full URL (origin + path + query) for accurate GA page_location
    const origin = typeof window !== 'undefined' ? window.location.origin : ''
    const url = `${origin}${pathname}${query}`
    
    // Track page views (guard for browser and gtag availability)
    if (typeof window !== 'undefined' && typeof window.gtag === 'function') {
      window.gtag('config', GA_MEASUREMENT_ID, {
        page_location: url,
      } as GtagConfigParams)
    }
  }, [pathname, searchParams])

  // In absence of a valid measurement ID, or in non-production environments,
  // do not load GA to avoid noisy console/network errors during local testing.
  if (!GA_MEASUREMENT_ID || process.env.NODE_ENV !== 'production') {
    return null
  }

  return (
    <>
      <Script
        strategy="afterInteractive"
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
      />
      <Script
        id="google-analytics"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${GA_MEASUREMENT_ID}', {
              // Keep debug_mode off in production builds to avoid type narrowing issues
              debug_mode: false,
              send_page_view: true,
              // Enhanced session tracking
              engagement_time_msec: 1000, // Track engagement every 1 second
              session_timeout: 1800, // 30 minutes session timeout
              // Enhanced measurement for better user behavior tracking
              enhanced_measurement: {
                scrolls: true,
                outbound_clicks: true,
                site_search: true,
                video_engagement: true,
                file_downloads: true
              }
            });
          `,
        }}
      />
    </>
  )
}

export const trackEvent = (eventName: string, parameters?: GtagEventParams) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', eventName, parameters)
  }
}

export const trackPageVisit = (pageName: string, additionalData?: Record<string, string | number | boolean>) => {
  const eventName = `${pageName.toLowerCase()}_page_visit`
  
  trackEvent(eventName, {
    page_name: pageName,
    timestamp: new Date().toISOString(),
    ...additionalData
  })
}

export const trackFormSubmission = (formName: string, additionalData?: Record<string, string | number | boolean>) => {
  const eventName = `${formName.toLowerCase()}_form_submission`
  
  trackEvent(eventName, {
    form_name: formName,
    timestamp: new Date().toISOString(),
    ...additionalData
  })
}

// Common tracking functions for e-commerce and user interactions
type GAItem = {
  item_id?: string
  item_name?: string
  item_brand?: string
  item_category?: string
  item_variant?: string
  price?: number
  quantity?: number
  [key: string]: string | number | boolean | null | undefined
}

export const trackPurchase = (transactionId: string, value: number, currency: string = 'INR', items: GAItem[]) => {
  trackEvent('purchase', {
    transaction_id: transactionId,
    value,
    currency,
    items
  })
}

export const trackAddToCart = (currency: string = 'INR', value: number, items: GAItem[]) => {
  trackEvent('add_to_cart', {
    currency,
    value,
    items
  })
}

export const trackViewItem = (currency: string = 'INR', value: number, items: GAItem[]) => {
  trackEvent('view_item', {
    currency,
    value,
    items
  })
}

export const trackSignUp = (method?: string) => {
  trackEvent('sign_up', {
    method
  })
}

export const trackLogin = (method?: string) => {
  trackEvent('login', {
    method
  })
}

export const trackSearch = (searchTerm: string) => {
  trackEvent('search', {
    search_term: searchTerm
  })
}

export const trackShare = (contentType: string, itemId: string) => {
  trackEvent('share', {
    content_type: contentType,
    item_id: itemId
  })
}

export const trackContactFormSubmit = (formName: string) => {
  trackEvent('form_submit', {
    form_name: formName
  })
}

export const trackNewsletterSignup = (method: string = 'website') => {
  trackEvent('newsletter_signup', {
    method
  })
}

// Advanced session tracking functions
export const trackTimeOnPage = (pageName: string, timeSpent: number) => {
  trackEvent('time_on_page', {
    page_name: pageName,
    time_spent_seconds: timeSpent,
    engagement_level: timeSpent > 30 ? 'high' : timeSpent > 10 ? 'medium' : 'low'
  })
}

export const trackScrollDepth = (scrollPercent: number, pageName: string) => {
  trackEvent('scroll_depth', {
    scroll_percent: scrollPercent,
    page_name: pageName,
    milestone: scrollPercent >= 90 ? 'complete' : scrollPercent >= 50 ? 'halfway' : 'started'
  })
}

export const trackUserEngagement = (engagementType: string, details?: GtagEventParams) => {
  trackEvent('user_engagement', {
    engagement_type: engagementType,
    timestamp: new Date().toISOString(),
    ...details
  })
}

export const trackSessionQuality = (actions: number, timeSpent: number, pagesViewed: number) => {
  const quality = actions > 3 && timeSpent > 60 ? 'high' : 
                 actions > 1 && timeSpent > 30 ? 'medium' : 'low'
  
  trackEvent('session_quality', {
    quality_score: quality,
    total_actions: actions,
    session_duration: timeSpent,
    pages_viewed: pagesViewed
  })
}

export const trackBounceIntention = (timeBeforeLeave: number, interactions: number) => {
  trackEvent('bounce_intention', {
    time_before_leave: timeBeforeLeave,
    interaction_count: interactions,
    likely_bounce: timeBeforeLeave < 10 && interactions === 0
  })
}

// Session duration tracking
export const trackSessionStart = () => {
  if (typeof window === 'undefined') return // Server-side check
  
  const sessionStartTime = Date.now()
  sessionStorage.setItem('session_start_time', sessionStartTime.toString())
  sessionStorage.setItem('session_page_count', '1')
  sessionStorage.setItem('session_interactions', '0')
  
  trackEvent('session_start', {
    session_id: `session_${sessionStartTime}`,
    start_time: new Date().toISOString(),
    user_agent: navigator.userAgent,
    screen_resolution: `${screen.width}x${screen.height}`
  })
}

export const trackSessionEnd = () => {
  if (typeof window === 'undefined') return // Server-side check
  
  const sessionStartTime = sessionStorage.getItem('session_start_time')
  const pageCount = sessionStorage.getItem('session_page_count') || '0'
  const interactions = sessionStorage.getItem('session_interactions') || '0'
  
  if (sessionStartTime) {
    const sessionDuration = Math.floor((Date.now() - parseInt(sessionStartTime)) / 1000)
    const sessionId = `session_${sessionStartTime}`
    
    trackEvent('session_end', {
      session_id: sessionId,
      session_duration_seconds: sessionDuration,
      session_duration_minutes: Math.round(sessionDuration / 60 * 100) / 100,
      pages_viewed: parseInt(pageCount),
      total_interactions: parseInt(interactions),
      end_time: new Date().toISOString(),
      session_quality: getSessionQuality(sessionDuration, parseInt(interactions), parseInt(pageCount))
    })
    
    // Clear session data
    sessionStorage.removeItem('session_start_time')
    sessionStorage.removeItem('session_page_count')
    sessionStorage.removeItem('session_interactions')
  }
}

export const updateSessionStats = (newPageView = false, newInteraction = false) => {
  if (typeof window === 'undefined') return // Server-side check
  
  if (newPageView) {
    const currentCount = parseInt(sessionStorage.getItem('session_page_count') || '0')
    sessionStorage.setItem('session_page_count', (currentCount + 1).toString())
  }
  
  if (newInteraction) {
    const currentInteractions = parseInt(sessionStorage.getItem('session_interactions') || '0')
    sessionStorage.setItem('session_interactions', (currentInteractions + 1).toString())
  }
}

export const getCurrentSessionDuration = (): number => {
  if (typeof window === 'undefined') return 0 // Server-side check
  
  const sessionStartTime = sessionStorage.getItem('session_start_time')
  if (sessionStartTime) {
    return Math.floor((Date.now() - parseInt(sessionStartTime)) / 1000)
  }
  return 0
}

export const getSessionQuality = (duration: number, interactions: number, pages: number): string => {
  const score = (duration * 0.1) + (interactions * 2) + (pages * 1.5)
  
  if (score >= 20) return 'high'
  if (score >= 10) return 'medium'
  return 'low'
}

// Track session milestones
export const trackSessionMilestone = (milestone: string) => {
  if (typeof window === 'undefined') return // Server-side check
  
  const sessionDuration = getCurrentSessionDuration()
  const sessionStartTime = sessionStorage.getItem('session_start_time')
  
  if (sessionStartTime) {
    trackEvent('session_milestone', {
      session_id: `session_${sessionStartTime}`,
      milestone,
      session_duration_at_milestone: sessionDuration,
      timestamp: new Date().toISOString()
    })
  }
}