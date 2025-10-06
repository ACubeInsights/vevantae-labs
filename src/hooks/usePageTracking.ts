'use client'

import { useEffect } from 'react'
import { usePathname } from 'next/navigation'
import { trackPageVisit, trackFormSubmission } from '@/components/GoogleAnalyticsSimple'

interface SimplePageTrackingOptions {
  pageName: string
  additionalData?: Record<string, string | number | boolean>
}

export function usePageTracking(options: SimplePageTrackingOptions) {
  const { pageName, additionalData } = options
  const pathname = usePathname()

  useEffect(() => {
    trackPageVisit(pageName, {
      page_path: pathname,
      ...additionalData
    })
  }, [pathname, pageName, additionalData])

  return {
    trackFormSubmission: (formName: string, details?: Record<string, string | number | boolean>) => {
      trackFormSubmission(formName, {
        page_name: pageName,
        ...details
      })
    }
  }
}