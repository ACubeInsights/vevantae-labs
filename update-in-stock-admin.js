// Admin script to set in_stock=true for all products in products03
// Uses the Supabase service role key to bypass RLS for administrative updates
const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');

function loadEnv() {
  try {
    const env = fs.readFileSync('.env.local', 'utf8');
    const vars = {};
    env.split('\n').forEach((line) => {
      const [k, v] = line.split('=');
      if (k && v) vars[k.trim()] = v.trim();
    });
    return vars;
  } catch (e) {
    console.error('❌ Could not read .env.local. Ensure it exists with required keys.');
    process.exit(1);
  }
}

async function main() {
  const env = loadEnv();
  const url = env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceKey = env.SUPABASE_SERVICE_ROLE_KEY;

  if (!url || !serviceKey) {
    console.error('❌ Missing NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY in .env.local');
    process.exit(1);
  }

  const supabase = createClient(url, serviceKey);

  console.log('🔧 Setting in_stock=true for all products in products03...');
  const { data, error } = await supabase
    .from('products03')
    .update({ in_stock: true })
    .neq('in_stock', true)
    .select('id, name, in_stock');

  if (error) {
    console.error('❌ Update error:', error.message);
    console.error('Error details:', error);
    process.exit(1);
  }

  console.log(`✅ Updated ${data?.length || 0} rows to in_stock=true.`);
  if (data && data.length) {
    console.log('\n📦 Examples:');
    data.slice(0, 5).forEach((row) => {
      console.log(`- ${row.name} (${row.id}) -> in_stock=${row.in_stock}`);
    });
  }

  // Verify distribution after update
  const { data: verify, error: verifyError } = await supabase
    .from('products03')
    .select('in_stock', { count: 'exact', head: false });

  if (verifyError) {
    console.error('❌ Verification error:', verifyError.message);
    process.exit(1);
  }

  const counts = verify.reduce((acc, r) => {
    const key = r.in_stock ? 'true' : r.in_stock === false ? 'false' : 'null';
    acc[key] = (acc[key] || 0) + 1;
    return acc;
  }, {});

  console.log('\n📈 in_stock distribution after update:');
  Object.entries(counts).forEach(([k, v]) => console.log(`  ${k}: ${v}`));
}

main().catch((err) => {
  console.error('❌ Unexpected error:', err?.message || err);
  process.exit(1);
});
