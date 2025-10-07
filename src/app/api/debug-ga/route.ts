import { NextResponse } from 'next/server'

export async function GET() {
  const gaId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID
  
  return NextResponse.json({
    gaId: gaId || 'NOT SET',
    allEnvVars: Object.keys(process.env).filter(key => key.includes('GA')),
    nodeEnv: process.env.NODE_ENV,
    message: gaId ? 'GA ID is set!' : 'GA ID is missing!'
  })
}