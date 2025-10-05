const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = 'https://rdeaaedtrsxgygcyhjcb.supabase.co';
const supabaseKey =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJkZWFhZWR0cnN4Z3lnY3loamNiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTgwMjUwNTIsImV4cCI6MjA3MzYwMTA1Mn0.lcr5ULUJLE1wTzo3jMlJ8Y5WVjURKqNbtI9K5B_vaXQ';

const supabase = createClient(supabaseUrl, supabaseKey);

async function checkAllProducts() {
  try {
    console.log('🔍 Checking ALL products in products03 table (no filters)...');

    // Get ALL products without any filters
    const { data: allProducts, error } = await supabase.from('products03').select('*');

    if (error) {
      console.error('❌ Error:', error.message);
      console.error('Error details:', error);
      return;
    }

    console.log(`📊 Total products found: ${allProducts?.length || 0}`);

    if (allProducts && allProducts.length > 0) {
      console.log('\n📦 Product details:');
      allProducts.forEach((product, index) => {
        console.log(`${index + 1}. ${product.name || 'Unnamed'}`);
        console.log(`   Status: ${product.status || 'No status'}`);
        console.log(`   ID: ${product.id}`);
        console.log(
          `   Description: ${product.description ? product.description.substring(0, 50) + '...' : 'No description'}`
        );
        console.log('');
      });

      // Check status distribution
      const statusCounts = {};
      allProducts.forEach((product) => {
        const status = product.status || 'null';
        statusCounts[status] = (statusCounts[status] || 0) + 1;
      });

      console.log('📈 Status distribution:');
      Object.entries(statusCounts).forEach(([status, count]) => {
        console.log(`   ${status}: ${count} products`);
      });
    } else {
      console.log('⚠️  No products found at all!');
    }
  } catch (error) {
    console.error('❌ Unexpected error:', error.message);
  }
}

checkAllProducts();