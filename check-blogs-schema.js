const { createClient } = require('@supabase/supabase-js');

// Load environment variables
const fs = require('fs');
const path = require('path');

// Try to read .env.local
let envVars = {};
try {
  const envContent = fs.readFileSync('.env.local', 'utf8');
  envContent.split('\n').forEach((line) => {
    const [key, value] = line.split('=');
    if (key && value) {
      envVars[key.trim()] = value.trim();
    }
  });
} catch (error) {
  console.log('Could not read .env.local, using environment variables');
}

const supabaseUrl = envVars.NEXT_PUBLIC_SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey =
  envVars.NEXT_PUBLIC_SUPABASE_ANON_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error('Missing Supabase credentials');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function checkBlogsSchema() {
  try {
    console.log('🔍 Checking blogs table schema...\n');

    // Get a sample blog to see the structure
    const { data: blogs, error } = await supabase.from('blogs').select('*').limit(3);

    if (error) {
      console.error('❌ Error fetching blogs:', error.message);
      return;
    }

    if (!blogs || blogs.length === 0) {
      console.log('📝 No blogs found in the table');
      return;
    }

    console.log('📊 Current blogs table structure:');
    console.log('=====================================\n');

    // Show the structure of the first blog
    const firstBlog = blogs[0];
    console.log('🔹 Sample blog fields and types:');
    Object.keys(firstBlog).forEach((key) => {
      const value = firstBlog[key];
      const type = Array.isArray(value) ? 'array' : typeof value;
      console.log(`  ${key}: ${type} ${Array.isArray(value) ? `(${value.length} items)` : ''}`);
    });

    console.log('\n🔹 Sample blog data:');
    blogs.forEach((blog, index) => {
      console.log(`\nBlog ${index + 1}:`);
      console.log(`  ID: ${blog.id}`);
      console.log(`  Title: ${blog.title || 'N/A'}`);
      console.log(`  Slug: ${blog.slug || 'N/A'}`);
      console.log(`  Status: ${blog.status || 'N/A'}`);
      console.log(`  Created: ${blog.created_at || 'N/A'}`);
      console.log(`  Updated: ${blog.updated_at || 'N/A'}`);

      // Show other fields
      Object.keys(blog).forEach((key) => {
        if (!['id', 'title', 'slug', 'status', 'created_at', 'updated_at'].includes(key)) {
          let value = blog[key];
          if (typeof value === 'string' && value.length > 100) {
            value = value.substring(0, 100) + '...';
          }
          console.log(`  ${key}: ${value}`);
        }
      });
    });
  } catch (error) {
    console.error('❌ Error:', error.message);
  }
}

checkBlogsSchema();
