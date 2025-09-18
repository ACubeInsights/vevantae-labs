// Script to fix invalid image URLs in the database
const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');

// Read environment variables from .env.local manually
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

async function fixImageUrls() {
  try {
    console.log('🔧 Fixing invalid image URLs in database...');
    
    // Get all products with images
    const { data: products, error: fetchError } = await supabase
      .from('products_01')
      .select('id, name, images')
      .not('images', 'is', null);

    if (fetchError) {
      console.error('Error fetching products:', fetchError);
      return;
    }

    console.log(`Found ${products.length} products with images`);
    
    let updatedCount = 0;
    
    for (const product of products) {
      if (product.images && Array.isArray(product.images)) {
        let needsUpdate = false;
        const updatedImages = product.images.map((img, index) => {
          // Check if image is invalid (doesn't start with http/https)
          if (img && !img.startsWith('http')) {
            needsUpdate = true;
            return `https://via.placeholder.com/400x500/F8F6F3/8B7355?text=Product+${index + 1}`;
          }
          return img;
        });
        
        if (needsUpdate) {
          const { error: updateError } = await supabase
            .from('products_01')
            .update({ images: updatedImages })
            .eq('id', product.id);
            
          if (updateError) {
            console.error(`Error updating product ${product.name}:`, updateError);
          } else {
            console.log(`✅ Updated images for: ${product.name}`);
            updatedCount++;
          }
        }
      }
    }
    
    console.log(`\n🎉 Successfully updated ${updatedCount} products with valid image URLs`);
    
  } catch (error) {
    console.error('Error:', error);
  }
}

fixImageUrls();