// Google Analytics utility functions for production reliability

/**
 * Checks if Google Analytics is properly loaded and initialized
 */
export const isGAReady = (): boolean => {
  if (typeof window === 'undefined') return false
  
  return (
    typeof window.gtag === 'function' && 
    window.gaInitialized === true &&
    Array.isArray(window.dataLayer)
  )
}

/**
 * Gets the GA Measurement ID with fallbacks for production reliability
 */
export const getGAMeasurementId = (): string => {
  // Primary: Environment variable
  let gaId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID
  
  if (!gaId && typeof window !== 'undefined') {
    // Fallback 1: Meta tag
    const metaGA = document.querySelector('meta[name="ga-measurement-id"]')?.getAttribute('content')
    if (metaGA) gaId = metaGA
    
    // Fallback 2: Check if GA script is loaded with ID in URL
    const gaScript = document.querySelector('script[src*="googletagmanager.com/gtag/js"]') as HTMLScriptElement
    if (gaScript?.src) {
      const match = gaScript.src.match(/id=([^&]+)/)
      if (match) gaId = match[1]
    }
  }
  
  return gaId || ''
}

/**
 * Validates if a GA Measurement ID has the correct format
 */
export const isValidGAId = (id: string): boolean => {
  return /^G-[A-Z0-9]{10}$/.test(id)
}

/**
 * Wait for GA to be ready with timeout
 */
export const waitForGA = (timeout = 10000): Promise<boolean> => {
  return new Promise((resolve) => {
    const startTime = Date.now()
    
    const checkGA = () => {
      if (isGAReady()) {
        resolve(true)
        return
      }
      
      if (Date.now() - startTime > timeout) {
        resolve(false)
        return
      }
      
      setTimeout(checkGA, 100)
    }
    
    checkGA()
  })
}

/**
 * Debug function to check GA status
 */
export const debugGAStatus = (): void => {
  if (typeof window === 'undefined') {
    console.log('🔍 GA Debug: Running on server-side')
    return
  }
  
  const gaId = getGAMeasurementId()
  const ready = isGAReady()
  
  console.group('🔍 Google Analytics Debug Status')
  console.log('GA Measurement ID:', gaId || '❌ Not found')
  console.log('GA ID Valid:', gaId ? isValidGAId(gaId) : false)
  console.log('gtag function:', typeof window.gtag === 'function' ? '✅ Loaded' : '❌ Not loaded')
  console.log('gaInitialized flag:', window.gaInitialized ? '✅ True' : '❌ False')
  console.log('dataLayer exists:', Array.isArray(window.dataLayer) ? '✅ Yes' : '❌ No')
  console.log('dataLayer length:', window.dataLayer?.length || 0)
  console.log('Overall Ready:', ready ? '✅ Ready' : '❌ Not Ready')
  console.log('Environment:', process.env.NODE_ENV)
  console.groupEnd()
  
  if (!ready && process.env.NODE_ENV === 'production') {
    console.warn('⚠️ Google Analytics is not ready in production!')
  }
}

/**
 * Safe event tracking with enhanced error handling
 */
export const safeTrackEvent = async (
  eventName: string, 
  parameters?: Record<string, unknown>,
  options?: { waitForGA?: boolean; timeout?: number }
): Promise<boolean> => {
  if (typeof window === 'undefined') return false
  
  const { waitForGA: shouldWait = false, timeout = 5000 } = options || {}
  
  // If requested, wait for GA to be ready
  if (shouldWait && !isGAReady()) {
    const gaReady = await waitForGA(timeout)
    if (!gaReady) {
      console.warn(`⚠️ GA not ready after ${timeout}ms for event:`, eventName)
      return false
    }
  }
  
  if (!isGAReady()) {
    if (process.env.NODE_ENV === 'development') {
      console.log('🔧 GA not ready, skipping event:', eventName)
    }
    return false
  }
  
  try {
    window.gtag('event', eventName, {
      custom_parameter_eventName: eventName,
      timestamp: new Date().toISOString(),
      ...parameters
    })
    
    if (process.env.NODE_ENV === 'development') {
      console.log('✅ GA Event sent successfully:', eventName)
    }
    
    return true
  } catch (error) {
    console.error('❌ GA Event failed:', eventName, error)
    return false
  }
}