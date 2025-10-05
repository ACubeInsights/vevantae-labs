const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');
const path = require('path');

// Load environment variables manually
function loadEnvFile() {
  try {
    const envContent = fs.readFileSync('.env.local', 'utf8');
    const envVars = {};

    envContent.split('\n').forEach((line) => {
      const [key, value] = line.split('=');
      if (key && value) {
        envVars[key.trim()] = value.trim();
      }
    });

    return envVars;
  } catch (error) {
    console.error('Could not read .env.local file');
    process.exit(1);
  }
}

const env = loadEnvFile();

async function applyRLSPolicy() {
  try {
    // Read the SQL file
    // Use products03 admin policy file
    const sqlPath = 'fix-products01-admin-policy.sql';
    const sqlContent = fs.readFileSync(sqlPath, 'utf8');

    // Create Supabase client with service role key
    const supabase = createClient(env.NEXT_PUBLIC_SUPABASE_URL, env.SUPABASE_SERVICE_ROLE_KEY);

    console.log('🔧 Applying RLS policy to products03 table...');

    // Split SQL into individual statements
    const statements = sqlContent
      .split(';')
      .map((stmt) => stmt.trim())
      .filter((stmt) => stmt.length > 0);

    // Execute each statement via RPC function if available
    // Note: Some projects don't have the helper Postgres function `exec_sql(sql text)` installed.
    // If missing, we will log guidance to run the SQL file manually in Supabase.
    let missingExecSql = false;
    for (const statement of statements) {
      console.log(`Executing: ${statement.substring(0, 50)}...`);
      const { error } = await supabase.rpc('exec_sql', { sql: statement });
      if (error) {
        console.error('❌ Error executing statement:', error);
        console.error('Statement:', statement);
        if ((error.message || '').includes('Could not find the function public.exec_sql')) {
          missingExecSql = true;
          break;
        }
      } else {
        console.log('✅ Statement executed successfully');
      }
    }

    if (missingExecSql) {
      console.log('\n⚠️ exec_sql RPC function missing.');
      console.log('Please apply the SQL manually:');
      console.log(`1) Open Supabase SQL Editor for your project`);
      console.log(`2) Paste the contents of ${sqlPath}`);
      console.log('3) Run to create policies on products03');
    }

    console.log('🎉 RLS policy application completed!');
  } catch (error) {
    console.error('❌ Error applying RLS policy:', error);
    process.exit(1);
  }
}

applyRLSPolicy();
