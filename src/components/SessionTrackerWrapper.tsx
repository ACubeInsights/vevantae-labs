'use client'

import { useSessionTracking } from './SessionTracker'
import { SessionDashboard } from './SessionDashboard'

export function SessionTrackerWrapper({ children }: { children: React.ReactNode }) {
  useSessionTracking()
  
  return (
    <>
      {children}
      
      {process.env.NODE_ENV === 'development' && <SessionDashboard />}
    </>
  )
}