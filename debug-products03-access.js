#!/usr/bin/env node
/**
 * Debug anonymous read access to products03.
 * Uses public anon key to mimic client-side access and checks RLS.
 */
const { createClient } = require('@supabase/supabase-js')
const fs = require('fs')

function loadEnv() {
  const env = { ...process.env }
  try {
    const content = fs.readFileSync('.env.local', 'utf8')
    content.split('\n').forEach(line => {
      const idx = line.indexOf('=')
      if (idx > 0) {
        const key = line.slice(0, idx).trim()
        const val = line.slice(idx + 1).trim()
        if (key) env[key] = val
      }
    })
  } catch (e) {
    // ignore if not present
  }
  return env
}

async function main() {
  const env = loadEnv()
  const url = env.NEXT_PUBLIC_SUPABASE_URL
  const anonKey = env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  if (!url || !anonKey) {
    console.error('Missing NEXT_PUBLIC_SUPABASE_URL or NEXT_PUBLIC_SUPABASE_ANON_KEY in environment/.env.local')
    process.exit(1)
  }
  const supabase = createClient(url, anonKey)

  console.log('Querying public products03 with anon key...')
  const { data, error, count } = await supabase
    .from('products03')
    .select('*', { count: 'exact' })
    .eq('status', 'Active')
    .limit(20)

  if (error) {
    console.error('❌ Error querying products03:', error)
    process.exit(2)
  }

  console.log(`✅ Fetched ${data?.length || 0} rows (count=${count})`)
  for (const row of data || []) {
    console.log(`- id=${row.id} slug=${row.slug} status=${row.status} in_stock=${row.in_stock}`)
  }
}

main().catch((err) => {
  console.error('Unhandled error:', err)
  process.exit(3)
})