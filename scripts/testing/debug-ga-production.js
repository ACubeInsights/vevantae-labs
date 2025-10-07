#!/usr/bin/env node

/**
 * Debug Google Analytics Production Setup
 * This script helps debug GA setup issues in production
 */

console.log('🔍 Google Analytics Production Debug\n');

// Check environment variables
console.log('📊 Environment Variables:');
console.log('NEXT_PUBLIC_GA_MEASUREMENT_ID:', process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID || '❌ NOT SET');
console.log('NODE_ENV:', process.env.NODE_ENV || 'development');
console.log('VERCEL_ENV:', process.env.VERCEL_ENV || '❌ NOT SET (local)');
console.log();

// Check if we're in production
const isProduction = process.env.NODE_ENV === 'production';
const isVercel = process.env.VERCEL_ENV;
const gaId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;

console.log('🚀 Environment Status:');
console.log('Is Production:', isProduction ? '✅' : '❌');
console.log('Is Vercel:', isVercel ? '✅ (' + isVercel + ')' : '❌');
console.log('GA ID Present:', gaId ? '✅ ' + gaId : '❌');
console.log();

// Validate GA ID format
if (gaId) {
  const isValidGAFormat = /^G-[A-Z0-9]{10}$/.test(gaId);
  console.log('📝 GA ID Validation:');
  console.log('Format Valid:', isValidGAFormat ? '✅' : '❌ (Should be G-XXXXXXXXXX)');
  console.log('Expected Format: G-VDMQ3FND7S');
  console.log('Current Value:', gaId);
  console.log();
}

// Production readiness check
console.log('✅ Production Readiness Checklist:');
console.log('1. Environment Variable Set:', gaId ? '✅' : '❌');
console.log('2. Correct GA Format:', gaId && /^G-[A-Z0-9]{10}$/.test(gaId) ? '✅' : '❌');
console.log('3. Production Environment:', isProduction ? '✅' : '❌');
console.log();

// Recommendations
console.log('💡 Recommendations:');
if (!gaId) {
  console.log('- Set NEXT_PUBLIC_GA_MEASUREMENT_ID in Vercel environment variables');
}
if (gaId && !/^G-[A-Z0-9]{10}$/.test(gaId)) {
  console.log('- Check GA ID format (should be G-XXXXXXXXXX)');
}
if (!isProduction) {
  console.log('- This is running in development mode');
}

console.log('\n🔗 Useful Links:');
console.log('- Vercel Environment Variables: https://vercel.com/dashboard/[project]/settings/environment-variables');
console.log('- Google Analytics Dashboard: https://analytics.google.com/');
console.log('- GA4 Measurement ID: Should start with G- (not UA-)');