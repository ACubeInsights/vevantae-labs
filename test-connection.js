const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = 'https://rdeaaedtrsxgygcyhjcb.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJkZWFhZWR0cnN4Z3lnY3loamNiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTgwMjUwNTIsImV4cCI6MjA3MzYwMTA1Mn0.lcr5ULUJLE1wTzo3jMlJ8Y5WVjURKqNbtI9K5B_vaXQ';

const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function testConnection() {
  try {
    console.log('=== COMPREHENSIVE SUPABASE DATABASE TEST ===');
    console.log('Supabase URL:', supabaseUrl);
    console.log('');
    
    // Test all possible table variations
    const tables = [
      'products03', 'blogs', 'blog_posts', 'testimonials', 'contact_forms',
      'Products03', 'Blogs', 'BlogPosts', 'Testimonials', 'ContactForms'
    ];
    
    for (const table of tables) {
      console.log(`\n🔍 Testing table: "${table}"`);
      
      try {
        const { data, error, count } = await supabase
          .from(table)
          .select('*', { count: 'exact' })
          .limit(10);
        
        if (error) {
          console.log(`   ❌ Error: ${error.message}`);
        } else {
          console.log(`   ✅ SUCCESS: Found ${count || 0} rows`);
          if (data && data.length > 0) {
            console.log(`   📄 First row keys:`, Object.keys(data[0]));
            console.log(`   📄 Sample data:`);
            console.log(JSON.stringify(data[0], null, 4));
            console.log(`   📄 All ${data.length} rows:`);
            data.forEach((row, i) => {
              console.log(`      Row ${i + 1}:`, JSON.stringify(row, null, 2));
            });
          } else {
            console.log(`   📭 Table exists but is empty`);
          }
        }
      } catch (err) {
        console.log(`   💥 Exception:`, err.message);
      }
    }
    
    console.log('\n=== TEST COMPLETE ===');
    
  } catch (error) {
    console.error('❌ FATAL ERROR:', error);
  }
}

testConnection();