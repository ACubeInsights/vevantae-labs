'use client'

import { useSessionTracking } from './SessionTracker'
import { SessionDashboard } from './SessionDashboard'

export function SessionTrackerWrapper({ children }: { children: React.ReactNode }) {
  // This hook automatically tracks user sessions
  useSessionTracking()
  
  return (
    <>
      {children}
      {/* Show session dashboard in development */}
      {process.env.NODE_ENV === 'development' && <SessionDashboard />}
    </>
  )
}