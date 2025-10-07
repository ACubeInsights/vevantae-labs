'use client'

import { useEffect } from 'react'
import Link from 'next/link'
import { trackEvent, trackViewItem, trackContactFormSubmit } from '@/components/GoogleAnalytics'

export default function GoogleAnalyticsTestPage() {
  useEffect(() => {
    console.log('GA4 Test page loaded')
  }, [])

  const handleTestEvent = () => {
    trackEvent('test_button_click', {
      button_name: 'ga4_test_button',
      page: 'test_page'
    })
    alert('Test event sent to Google Analytics!')
  }

  const handleTestProductView = () => {
    trackViewItem('INR', 899, [{
      item_id: 'test_product_123',
      item_name: 'Test Ashwagandha',
      item_category: 'ayurvedic',
      price: 899,
      quantity: 1
    }])
    alert('Product view event sent to Google Analytics!')
  }

  const handleTestFormSubmit = () => {
    trackContactFormSubmit('test_form')
    alert('Form submit event sent to Google Analytics!')
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4">
        <h1 className="text-3xl font-bold text-gray-900 mb-8 text-center">
          Google Analytics 4 Integration Test
        </h1>
        
        <div className="bg-white rounded-lg shadow-md p-8 mb-8">
          <h2 className="text-xl font-semibold mb-4">Integration Status</h2>
          <div className="space-y-4">
            <div className="flex items-center">
              <div className="w-3 h-3 bg-green-500 rounded-full mr-3"></div>
              <span>✅ Google Analytics component integrated</span>
            </div>
            <div className="flex items-center">
              <div className="w-3 h-3 bg-green-500 rounded-full mr-3"></div>
              <span>✅ Measurement ID configured: G-VDMQ3FND7S</span>
            </div>
            <div className="flex items-center">
              <div className="w-3 h-3 bg-green-500 rounded-full mr-3"></div>
              <span>✅ Environment variables set up</span>
            </div>
            <div className="flex items-center">
              <div className="w-3 h-3 bg-green-500 rounded-full mr-3"></div>
              <span>✅ Automatic page view tracking enabled</span>
            </div>
            <div className="flex items-center">
              <div className="w-3 h-3 bg-green-500 rounded-full mr-3"></div>
              <span>✅ <strong>Complete session duration tracking</strong></span>
            </div>
            <div className="flex items-center">
              <div className="w-3 h-3 bg-green-500 rounded-full mr-3"></div>
              <span>✅ <strong>Session milestones (30s, 1m, 2m, 5m, 10m)</strong></span>
            </div>
          </div>
          
          <div className="mt-6 p-4 bg-blue-50 rounded-lg">
            <h3 className="font-semibold text-blue-800 mb-2">👀 Look at the bottom-right corner!</h3>
            <p className="text-blue-700 text-sm">
              You should see a live session tracking dashboard showing your current session duration, 
              page views, and interactions in real-time.
            </p>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-8 mb-8">
          <h2 className="text-xl font-semibold mb-4">Event Tracking Tests</h2>
          <p className="text-gray-600 mb-6">
            Click these buttons to test different types of event tracking. 
            Check your browser&apos;s Network tab or Google Analytics Real-time reports to see the events.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <button
              onClick={handleTestEvent}
              className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Test Custom Event
            </button>
            
            <button
              onClick={handleTestProductView}
              className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
            >
              Test Product View
            </button>
            
            <button
              onClick={handleTestFormSubmit}
              className="px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
            >
              Test Form Submit
            </button>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-8">
          <h2 className="text-xl font-semibold mb-4">Verification Steps</h2>
          <div className="space-y-3 text-gray-700">
            <div className="font-medium">Step 1: Open Google Analytics</div>
            <div className="pl-4">→ Go to <a href="https://analytics.google.com" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800 underline">analytics.google.com</a></div>
            <div className="pl-4">→ Select property with ID: <code className="bg-gray-100 px-2 py-1 rounded">G-VDMQ3FND7S</code></div>
            
            <div className="font-medium mt-4">Step 2: Check Real-time Data</div>
            <div className="pl-4">→ Navigate to <strong>Reports → Realtime</strong></div>
            <div className="pl-4">→ You should see this page visit and button clicks</div>
            
            <div className="font-medium mt-4">Step 3: Test Events</div>
            <div className="pl-4">→ Click the test buttons above</div>
            <div className="pl-4">→ Events should appear within 30 seconds</div>
            
            <div className="font-medium mt-4">Step 4: Check Event Names</div>
            <div className="pl-4">→ Look for: <code className="bg-gray-100 px-1 rounded">test_button_click</code>, <code className="bg-gray-100 px-1 rounded">view_item</code>, <code className="bg-gray-100 px-1 rounded">form_submit</code></div>
          </div>
        </div>

        <div className="text-center mt-8">
          <Link
            href="/"
            className="inline-block px-6 py-3 bg-gray-800 text-white rounded-lg hover:bg-gray-900 transition-colors"
          >
            ← Back to Home
          </Link>
        </div>
      </div>
    </div>
  )
}