'use client'

import { useEffect } from 'react'
import { trackPageVisit, trackEvent } from '@/components/GoogleAnalytics'

export default function GATestPage() {
  useEffect(() => {
    setTimeout(() => {
      console.log('🧪 Testing GA Events...')
      
      trackEvent('page_view', {
        page_title: 'GA Test Page',
        page_location: window.location.href
      })
      
      trackPageVisit('Benefits', {
        test_mode: true,
        timestamp: new Date().toISOString()
      })
      
      trackEvent('benefits_page_visit', {
        page_name: 'Benefits',
        test_mode: true
      })
      
      console.log('🧪 GA Test events sent!')
    }, 3000)
  }, [])

  return (
    <div className="min-h-screen bg-[#FAF9F6] py-20">
      <div className="container mx-auto px-6">
        <div className="max-w-2xl mx-auto text-center space-y-8">
          <h1 className="text-4xl font-light text-[#111111]">
            Google Analytics Test Page
          </h1>
          <p className="text-lg text-[#666666]">
            This page tests GA event tracking. Check the browser console for event logs.
          </p>
          <div className="bg-white p-8 rounded-sm">
            <h2 className="text-xl font-medium text-[#111111] mb-4">
              Expected Console Logs:
            </h2>
            <ul className="text-left space-y-2 text-sm text-[#666666]">
              <li>🧪 Testing GA Events...</li>
              <li>📊 GA Event Attempt: page_view</li>
              <li>✅ Sending GA Event: page_view</li>
              <li>📄 GA Event confirmed sent: page_view</li>
              <li>🔍 Tracking page visit: benefits_page_visit</li>
              <li>📊 GA Event Attempt: benefits_page_visit</li>
              <li>✅ Sending GA Event: benefits_page_visit</li>
              <li>📄 GA Event confirmed sent: benefits_page_visit</li>
            </ul>
          </div>
          <div className="bg-[#111111] text-white p-8 rounded-sm">
            <h2 className="text-xl font-medium mb-4">
              Check in GA4:
            </h2>
            <p className="text-sm text-gray-300">
              Go to Realtime → Events in your GA4 dashboard and look for:
            </p>
            <ul className="text-left mt-4 space-y-1 text-sm">
              <li>• page_view</li>
              <li>• benefits_page_visit</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}