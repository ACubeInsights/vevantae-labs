// Simple script to check database images using direct Supabase client
const { createClient } = require('@supabase/supabase-js');

// Read environment variables from .env.local manually
const fs = require('fs');
const path = require('path');

let supabaseUrl, supabaseAnonKey;

try {
  const envContent = fs.readFileSync('.env.local', 'utf8');
  const lines = envContent.split('\n');
  
  lines.forEach(line => {
    if (line.startsWith('NEXT_PUBLIC_SUPABASE_URL=')) {
      supabaseUrl = line.split('=')[1];
    }
    if (line.startsWith('NEXT_PUBLIC_SUPABASE_ANON_KEY=')) {
      supabaseAnonKey = line.split('=')[1];
    }
  });
} catch (error) {
  console.error('Could not read .env.local file');
  process.exit(1);
}

if (!supabaseUrl || !supabaseAnonKey) {
  console.error('Missing Supabase environment variables in .env.local');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function checkImages() {
  try {
    const { data: products, error } = await supabase
      .from('products_01')
      .select('id, name, images')
      .eq('status', 'Active')
      .limit(5); // Just check first 5 products

    if (error) {
      console.error('Error fetching products:', error);
      return;
    }

    console.log(`\n🔍 Checking images for ${products.length} active products:\n`);
    
    products.forEach((product, index) => {
      console.log(`${index + 1}. ${product.name}`);
      console.log(`   ID: ${product.id}`);
      console.log(`   Images: ${JSON.stringify(product.images)}`);
      console.log('');
    });

  } catch (error) {
    console.error('Error:', error);
  }
}

checkImages();