'use client'

import { useEffect, useRef, useState } from 'react'
import { usePathname } from 'next/navigation'
import { 
  trackTimeOnPage, 
  trackScrollDepth, 
  trackUserEngagement, 
  trackBounceIntention,
  trackSessionStart,
  trackSessionEnd,
  updateSessionStats,
  getCurrentSessionDuration,
  trackSessionMilestone
} from './GoogleAnalytics'

export function useSessionTracking() {
  const pathname = usePathname()
  const startTime = useRef<number>(Date.now())
  const scrollPercentages = useRef<Set<number>>(new Set())
  const interactions = useRef<number>(0)
  const [isVisible, setIsVisible] = useState(true)
  const sessionMilestones = useRef<Set<number>>(new Set())
  const isFirstLoad = useRef<boolean>(true)

  // Initialize session tracking on first load
  useEffect(() => {
    if (isFirstLoad.current && typeof window !== 'undefined') {
      // Check if this is a new session or continuing session
      const existingSession = sessionStorage.getItem('session_start_time')
      
      if (!existingSession) {
        trackSessionStart()
      }
      
      updateSessionStats(true, false) // New page view
      isFirstLoad.current = false
    }
  }, [])

  // Track session milestones (30s, 60s, 2min, 5min, 10min)
  useEffect(() => {
    const checkMilestones = () => {
      const sessionDuration = getCurrentSessionDuration()
      const milestones = [30, 60, 120, 300, 600] // seconds
      
      milestones.forEach(milestone => {
        if (sessionDuration >= milestone && !sessionMilestones.current.has(milestone)) {
          sessionMilestones.current.add(milestone)
          const minutes = Math.floor(milestone / 60)
          const seconds = milestone % 60
          const label = minutes > 0 ? `${minutes}min${seconds > 0 ? ` ${seconds}s` : ''}` : `${seconds}s`
          trackSessionMilestone(label)
        }
      })
    }

    const interval = setInterval(checkMilestones, 5000) // Check every 5 seconds
    return () => clearInterval(interval)
  }, [])

  // Track page changes within session
  useEffect(() => {
    if (!isFirstLoad.current) {
      updateSessionStats(true, false) // New page view
    }
  }, [pathname])

  // Track page visibility
  useEffect(() => {
    const handleVisibilityChange = () => {
      setIsVisible(!document.hidden)
      
      if (document.hidden) {
        // User switched tabs or minimized window
        const timeSpent = Math.floor((Date.now() - startTime.current) / 1000)
        const sessionDuration = getCurrentSessionDuration()
        trackUserEngagement('page_hidden', {
          time_before_hide: timeSpent,
          page: pathname,
          total_session_duration: sessionDuration
        })
      } else {
        // User came back
        startTime.current = Date.now() // Reset timer
        const sessionDuration = getCurrentSessionDuration()
        trackUserEngagement('page_visible', {
          page: pathname,
          total_session_duration: sessionDuration
        })
      }
    }

    document.addEventListener('visibilitychange', handleVisibilityChange)
    return () => document.removeEventListener('visibilitychange', handleVisibilityChange)
  }, [pathname])

  // Track scroll depth
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.pageYOffset
      const docHeight = document.documentElement.scrollHeight - window.innerHeight
      const scrollPercent = Math.round((scrollTop / docHeight) * 100)

      // Track milestone percentages: 25%, 50%, 75%, 90%
      const milestones = [25, 50, 75, 90]
      milestones.forEach(milestone => {
        if (scrollPercent >= milestone && !scrollPercentages.current.has(milestone)) {
          scrollPercentages.current.add(milestone)
          trackScrollDepth(milestone, pathname)
        }
      })
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [pathname])

  // Track user interactions (clicks, form inputs, etc.)
  useEffect(() => {
    const handleInteraction = (event: Event) => {
      interactions.current += 1
      updateSessionStats(false, true) // New interaction
      
      // Track specific interaction types
      const target = event.target as HTMLElement
      const interactionType = target.tagName.toLowerCase()
      
      if (['button', 'a', 'input', 'textarea', 'select'].includes(interactionType)) {
        const sessionDuration = getCurrentSessionDuration()
        trackUserEngagement('interaction', {
          element_type: interactionType,
          element_text: target.textContent?.slice(0, 50) || '',
          page: pathname,
          total_interactions: interactions.current,
          session_duration: sessionDuration
        })
      }
    }

    // Track various interaction events
    const events = ['click', 'input', 'change', 'submit']
    events.forEach(event => {
      document.addEventListener(event, handleInteraction)
    })

    return () => {
      events.forEach(event => {
        document.removeEventListener(event, handleInteraction)
      })
    }
  }, [pathname])

  // Track session end on page unload
  useEffect(() => {
    const handleBeforeUnload = () => {
      trackSessionEnd()
    }

    const handleUnload = () => {
      trackSessionEnd()
    }

    window.addEventListener('beforeunload', handleBeforeUnload)
    window.addEventListener('unload', handleUnload)

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload)
      window.removeEventListener('unload', handleUnload)
    }
  }, [])

  // Track time on page when component unmounts or page changes
  useEffect(() => {
    return () => {
      const timeSpent = Math.floor((Date.now() - startTime.current) / 1000)
      const sessionDuration = getCurrentSessionDuration()
      
      // Only track if user spent meaningful time (more than 3 seconds)
      if (timeSpent > 3) {
        trackTimeOnPage(pathname, timeSpent)
        
        // Track potential bounce
        if (timeSpent < 10 && interactions.current === 0 && sessionDuration < 30) {
          trackBounceIntention(timeSpent, interactions.current)
        }
      }
    }
  }, [pathname])

  // Reset tracking data when page changes
  useEffect(() => {
    startTime.current = Date.now()
    scrollPercentages.current.clear()
    interactions.current = 0
  }, [pathname])

  return {
    timeSpent: Math.floor((Date.now() - startTime.current) / 1000),
    sessionDuration: typeof window !== 'undefined' ? getCurrentSessionDuration() : 0,
    interactions: interactions.current,
    isVisible
  }
}