import Script from 'next/script'

type GtagEventParams = Record<string, unknown>

declare global {
  interface Window {
    gtag: (command: 'config' | 'event' | 'js' | string, ...args: unknown[]) => void
    dataLayer: unknown[]
  }
}

// Only enable GA when an explicit measurement ID is provided
const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID ?? ''

export function GoogleAnalytics() {
  if (!GA_MEASUREMENT_ID) {
    return null
  }

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
        strategy="afterInteractive"
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${GA_MEASUREMENT_ID}');
        `}
      </Script>
    </>
  )
}

export const trackEvent = (eventName: string, parameters?: GtagEventParams) => {
  // Only run on client-side
  if (typeof window === 'undefined') {
    console.log('🔄 GA Event skipped (server-side):', eventName)
    return
  }
  
  // Check if GA_MEASUREMENT_ID is available
  const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID
  if (!GA_MEASUREMENT_ID) {
    if (process.env.NODE_ENV === 'development') {
      console.log('� GA Event skipped (no measurement ID in dev):', eventName, parameters)
    }
    return
  }
  
  console.log('�📊 GA Event Attempt:', eventName, parameters)
  
  if (window.gtag) {
    console.log('✅ Sending GA Event:', eventName, 'with parameters:', JSON.stringify(parameters, null, 2))
    window.gtag('event', eventName, parameters)
    
    // Confirm the event was sent
    setTimeout(() => {
      console.log('📄 GA Event confirmed sent:', eventName)
    }, 100)
  } else {
    console.log('⚠️ GA not ready, queuing event:', eventName)
    // Queue the event for when gtag loads - but only try a few times
    let retryCount = 0
    const maxRetries = 3
    
    const retryTracking = () => {
      setTimeout(() => {
        if (window.gtag) {
          console.log('🔄 Retry sending queued GA Event:', eventName, 'with parameters:', JSON.stringify(parameters, null, 2))
          window.gtag('event', eventName, parameters)
          console.log('📄 GA Queued event confirmed sent:', eventName)
        } else {
          retryCount++
          if (retryCount < maxRetries) {
            console.log(`⏳ GA still loading, retry ${retryCount}/${maxRetries} for event:`, eventName)
            retryTracking()
          } else {
            if (process.env.NODE_ENV === 'development') {
              console.warn('⚠️ GA not available in development after retries:', eventName)
            } else {
              console.error('❌ GA still not available after retry for event:', eventName)
            }
          }
        }
      }, 1000 * (retryCount + 1)) // Exponential backoff: 1s, 2s, 3s
    }
    
    retryTracking()
  }
}

export const trackPageVisit = (pageName: string, additionalData?: Record<string, string | number | boolean>) => {
  const eventName = `${pageName.toLowerCase()}_page_visit`
  
  // Add console logging for debugging
  console.log('🔍 Tracking page visit:', eventName, { pageName, additionalData })
  
  // Also send a standard page_view event for better GA4 compatibility
  trackEvent('page_view', {
    page_title: `${pageName} - Vevantae Labs`,
    page_location: typeof window !== 'undefined' ? window.location.href : '',
    page_name: pageName,
    ...additionalData
  })
  
  // Send custom page visit event
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
  if (typeof window === 'undefined' || typeof sessionStorage === 'undefined') return
  
  try {
    const sessionStartTime = Date.now()
    sessionStorage.setItem('session_start_time', sessionStartTime.toString())
    sessionStorage.setItem('session_page_count', '1')
    sessionStorage.setItem('session_interactions', '0')
    
    trackEvent('session_start', {
      session_id: `session_${sessionStartTime}`,
      start_time: new Date().toISOString(),
      user_agent: typeof navigator !== 'undefined' ? navigator.userAgent : 'unknown',
      screen_resolution: typeof screen !== 'undefined' ? `${screen.width}x${screen.height}` : 'unknown'
    })
  } catch (error) {
    console.warn('SessionStorage not available:', error)
  }
}

export const trackSessionEnd = () => {
  if (typeof window === 'undefined' || typeof sessionStorage === 'undefined') return
  
  try {
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
  } catch (error) {
    console.warn('SessionStorage not available:', error)
  }
}

export const updateSessionStats = (newPageView = false, newInteraction = false) => {
  if (typeof window === 'undefined' || typeof sessionStorage === 'undefined') return
  
  try {
    if (newPageView) {
      const currentCount = parseInt(sessionStorage.getItem('session_page_count') || '0')
      sessionStorage.setItem('session_page_count', (currentCount + 1).toString())
    }
    
    if (newInteraction) {
      const currentInteractions = parseInt(sessionStorage.getItem('session_interactions') || '0')
      sessionStorage.setItem('session_interactions', (currentInteractions + 1).toString())
    }
  } catch (error) {
    console.warn('SessionStorage not available:', error)
  }
}

export const getCurrentSessionDuration = (): number => {
  if (typeof window === 'undefined' || typeof sessionStorage === 'undefined') return 0
  
  try {
    const sessionStartTime = sessionStorage.getItem('session_start_time')
    if (sessionStartTime) {
      return Math.floor((Date.now() - parseInt(sessionStartTime)) / 1000)
    }
  } catch (error) {
    console.warn('SessionStorage not available:', error)
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
  if (typeof window === 'undefined' || typeof sessionStorage === 'undefined') return
  
  try {
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
  } catch (error) {
    console.warn('SessionStorage not available:', error)
  }
}