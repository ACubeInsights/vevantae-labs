const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');
const path = require('path');

// Load environment variables manually
function loadEnvFile() {
  try {
    const envContent = fs.readFileSync('.env.local', 'utf8');
    const envVars = {};
    
    envContent.split('\n').forEach(line => {
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
    const sqlContent = fs.readFileSync('fix-products01-admin-policy.sql', 'utf8');
    
    // Create Supabase client with service role key
    const supabase = createClient(
      env.NEXT_PUBLIC_SUPABASE_URL,
      env.SUPABASE_SERVICE_ROLE_KEY
    );

    console.log('🔧 Applying RLS policy to products_01 table...');
    
    // Split SQL into individual statements
    const statements = sqlContent
      .split(';')
      .map(stmt => stmt.trim())
      .filter(stmt => stmt.length > 0);
    
    // Execute each statement
    for (const statement of statements) {
      console.log(`Executing: ${statement.substring(0, 50)}...`);
      
      const { error } = await supabase.rpc('exec_sql', {
        sql: statement
      });
      
      if (error) {
        console.error('❌ Error executing statement:', error);
        console.error('Statement:', statement);
      } else {
        console.log('✅ Statement executed successfully');
      }
    }
    
    console.log('🎉 RLS policy application completed!');
    
  } catch (error) {
    console.error('❌ Error applying RLS policy:', error);
    process.exit(1);
  }
}

applyRLSPolicy();