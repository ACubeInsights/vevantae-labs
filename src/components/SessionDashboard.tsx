'use client'

import { useEffect, useState } from 'react'
import { getCurrentSessionDuration } from './GoogleAnalytics'

export function SessionDashboard() {
  const [sessionData, setSessionData] = useState({
    duration: 0,
    pages: 0,
    interactions: 0,
    startTime: ''
  })

  useEffect(() => {
    // Only run on client side
    if (typeof window === 'undefined') return
    
    const updateSessionData = () => {
      const sessionStartTime = sessionStorage.getItem('session_start_time')
      const pages = sessionStorage.getItem('session_page_count') || '0'
      const interactions = sessionStorage.getItem('session_interactions') || '0'
      
      setSessionData({
        duration: getCurrentSessionDuration(),
        pages: parseInt(pages),
        interactions: parseInt(interactions),
        startTime: sessionStartTime ? new Date(parseInt(sessionStartTime)).toLocaleTimeString() : ''
      })
    }

    // Update every second
    const interval = setInterval(updateSessionData, 1000)
    updateSessionData() // Initial update

    return () => clearInterval(interval)
  }, [])

  const formatDuration = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }

  const getQualityColor = (duration: number, interactions: number, pages: number) => {
    const score = (duration * 0.1) + (interactions * 2) + (pages * 1.5)
    if (score >= 20) return 'text-green-600'
    if (score >= 10) return 'text-yellow-600'
    return 'text-red-600'
  }

  const getQualityLabel = (duration: number, interactions: number, pages: number) => {
    const score = (duration * 0.1) + (interactions * 2) + (pages * 1.5)
    if (score >= 20) return 'High Quality'
    if (score >= 10) return 'Medium Quality'
    return 'Low Quality'
  }

  if (sessionData.duration === 0) return null

  return (
    <div className="fixed bottom-4 right-4 bg-white border-2 border-gray-200 rounded-lg shadow-lg p-4 max-w-sm z-50">
      <div className="text-sm font-semibold text-gray-800 mb-2">
        🔍 Live Session Tracking
      </div>
      
      <div className="space-y-2 text-xs">
        <div className="flex justify-between">
          <span className="text-gray-600">Session Duration:</span>
          <span className="font-mono font-bold text-blue-600">
            {formatDuration(sessionData.duration)}
          </span>
        </div>
        
        <div className="flex justify-between">
          <span className="text-gray-600">Pages Viewed:</span>
          <span className="font-bold text-purple-600">{sessionData.pages}</span>
        </div>
        
        <div className="flex justify-between">
          <span className="text-gray-600">Interactions:</span>
          <span className="font-bold text-green-600">{sessionData.interactions}</span>
        </div>
        
        <div className="flex justify-between">
          <span className="text-gray-600">Started:</span>
          <span className="font-mono text-gray-800">{sessionData.startTime}</span>
        </div>
        
        <div className="flex justify-between pt-2 border-t border-gray-200">
          <span className="text-gray-600">Quality:</span>
          <span className={`font-bold ${getQualityColor(sessionData.duration, sessionData.interactions, sessionData.pages)}`}>
            {getQualityLabel(sessionData.duration, sessionData.interactions, sessionData.pages)}
          </span>
        </div>
      </div>
      
      <div className="mt-3 text-xs text-gray-500">
        💡 This data is being sent to GA4 in real-time
      </div>
    </div>
  )
}