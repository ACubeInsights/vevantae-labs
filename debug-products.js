const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = 'https://rdeaaedtrsxgygcyhjcb.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJkZWFhZWR0cnN4Z3lnY3loamNiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTgwMjUwNTIsImV4cCI6MjA3MzYwMTA1Mn0.lcr5ULUJLE1wTzo3jMlJ8Y5WVjURKqNbtI9K5B_vaXQ';

if (!supabaseUrl || !supabaseKey) {
  console.error('Missing Supabase environment variables');
  console.log('NEXT_PUBLIC_SUPABASE_URL:', supabaseUrl ? 'Set' : 'Missing');
  console.log('NEXT_PUBLIC_SUPABASE_ANON_KEY:', supabaseKey ? 'Set' : 'Missing');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function debugProducts() {
  console.log('🔍 Debugging products_01 table...');
  
  try {
    // Test connection
    const { data: connectionTest, error: connectionError } = await supabase
      .from('products_01')
      .select('count', { count: 'exact', head: true });
    
    if (connectionError) {
      console.error('❌ Connection error:', connectionError.message);
      return;
    }
    
    console.log('✅ Connected to Supabase successfully');
    console.log(`📊 Total rows in products_01: ${connectionTest?.length || 0}`);
    
    // Get all products
    const { data: allProducts, error: allError } = await supabase
      .from('products_01')
      .select('*');
    
    if (allError) {
      console.error('❌ Error fetching all products:', allError.message);
      return;
    }
    
    console.log(`\n📦 Found ${allProducts?.length || 0} products in total`);
    
    if (allProducts && allProducts.length > 0) {
      console.log('\n🔍 Sample product data:');
      console.log(JSON.stringify(allProducts[0], null, 2));
      
      // Check status distribution
      const statusCounts = {};
      allProducts.forEach(product => {
        const status = product.status || 'null';
        statusCounts[status] = (statusCounts[status] || 0) + 1;
      });
      
      console.log('\n📈 Status distribution:');
      Object.entries(statusCounts).forEach(([status, count]) => {
        console.log(`  ${status}: ${count}`);
      });
    } else {
      console.log('\n⚠️  No products found in products_01 table');
      console.log('\n💡 To add products:');
      console.log('1. Go to your Supabase dashboard');
      console.log('2. Navigate to the products_01 table');
      console.log('3. Insert some sample data');
      console.log('4. Make sure to set status = "Active" for products to appear');
    }
    
    // Test with Active filter
    const { data: activeProducts, error: activeError } = await supabase
      .from('products_01')
      .select('*')
      .eq('status', 'Active');
    
    if (activeError) {
      console.error('❌ Error fetching active products:', activeError.message);
    } else {
      console.log(`\n✅ Active products: ${activeProducts?.length || 0}`);
    }
    
  } catch (error) {
    console.error('❌ Unexpected error:', error.message);
  }
}

debugProducts();