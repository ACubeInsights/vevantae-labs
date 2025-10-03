const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = 'https://rdeaaedtrsxgygcyhjcb.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJkZWFhZWR0cnN4Z3lnY3loamNiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTgwMjUwNTIsImV4cCI6MjA3MzYwMTA1Mn0.lcr5ULUJLE1wTzo3jMlJ8Y5WVjURKqNbtI9K5B_vaXQ';

const supabase = createClient(supabaseUrl, supabaseKey);

const sampleProducts = [
  {
    name: 'Premium Vitamin C Serum',
    description: 'A powerful antioxidant serum that brightens skin and reduces signs of aging with 20% Vitamin C.',
    images: [
      'https://images.unsplash.com/photo-1556228720-195a672e8a03?w=400',
      'https://images.unsplash.com/photo-1556228720-195a672e8a03?w=400&h=400&fit=crop',
      'https://images.unsplash.com/photo-1556228720-195a672e8a03?w=400&h=600&fit=crop'
    ],
    product_ml: 30,
    category: 'Skincare',
    quantity: 100,
    status: 'Active',
    is_featured: true,
    detailed_info: 'This premium vitamin C serum is formulated with 20% L-Ascorbic Acid, the most potent form of Vitamin C. It helps to brighten skin tone, reduce dark spots, and protect against environmental damage.',
    key_ingredients: ['20% L-Ascorbic Acid', 'Hyaluronic Acid', 'Vitamin E', 'Ferulic Acid'],
    benefits: ['Brightens skin tone', 'Reduces dark spots', 'Anti-aging properties', 'Antioxidant protection'],
    usage_instructions: ['Apply 2-3 drops to clean skin in the morning', 'Follow with moisturizer and SPF', 'Start with every other day and gradually increase to daily use'],
    lifestyle_problems: ['Dull skin', 'Dark spots', 'Signs of aging']
  },
  {
    name: 'Hydrating Face Moisturizer',
    description: 'A lightweight, non-greasy moisturizer that provides 24-hour hydration for all skin types.',
    images: [
      'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400',
      'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=400&fit=crop'
    ],
    product_ml: 50,
    category: 'Skincare',
    quantity: 75,
    status: 'Active',
    is_featured: true,
    detailed_info: 'Our hydrating face moisturizer is enriched with ceramides and hyaluronic acid to restore and maintain the skin barrier while providing long-lasting moisture.',
    key_ingredients: ['Ceramides', 'Hyaluronic Acid', 'Niacinamide', 'Glycerin'],
    benefits: ['24-hour hydration', 'Strengthens skin barrier', 'Non-comedogenic', 'Suitable for sensitive skin'],
    usage_instructions: ['Apply to clean face and neck morning and evening', 'Gently massage until fully absorbed'],
    lifestyle_problems: ['Dry skin', 'Dehydrated skin', 'Sensitive skin']
  },
  {
    name: 'Gentle Cleansing Foam',
    description: 'A mild, sulfate-free cleanser that removes impurities without stripping the skin of its natural oils.',
    images: [
      'https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=400',
      'https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=400&h=400&fit=crop'
    ],
    product_ml: 150,
    category: 'Skincare',
    quantity: 50,
    status: 'Active',
    is_featured: false,
    detailed_info: 'This gentle cleansing foam is perfect for daily use. It effectively removes makeup, dirt, and excess oil while maintaining the skin natural pH balance.',
    key_ingredients: ['Coconut-derived surfactants', 'Aloe Vera', 'Chamomile Extract', 'Panthenol'],
    benefits: ['Gentle cleansing', 'Maintains pH balance', 'Removes makeup', 'Soothes skin'],
    usage_instructions: ['Wet face with lukewarm water', 'Apply a small amount to hands and create a lather', 'Gently massage onto face', 'Rinse thoroughly'],
    lifestyle_problems: ['Oily skin', 'Makeup removal', 'Daily cleansing']
  },
  {
    name: 'Retinol Night Treatment',
    description: 'A potent anti-aging treatment with 0.5% retinol to reduce fine lines and improve skin texture.',
    images: [
      'https://images.unsplash.com/photo-1556228453-efd6c1ff04f6?w=400'
    ],
    product_ml: 30,
    category: 'Skincare',
    quantity: 25,
    status: 'Active',
    is_featured: true,
    detailed_info: 'Our retinol night treatment contains 0.5% pure retinol encapsulated in a time-release system to minimize irritation while maximizing effectiveness.',
    key_ingredients: ['0.5% Retinol', 'Squalane', 'Vitamin E', 'Bisabolol'],
    benefits: ['Reduces fine lines', 'Improves skin texture', 'Increases cell turnover', 'Anti-aging'],
    usage_instructions: ['Use only at night', 'Start with 2-3 times per week and gradually increase', 'Apply a pea-sized amount to clean, dry skin', 'Always use SPF during the day'],
    lifestyle_problems: ['Fine lines', 'Wrinkles', 'Uneven skin texture', 'Signs of aging']
  }
];

async function insertSampleProducts() {
  console.log('🚀 Inserting sample products into products03 table...');
  
  try {
    const { data, error } = await supabase
      .from('products03')
      .insert(sampleProducts)
      .select();
    
    if (error) {
      console.error('❌ Error inserting products:', error.message);
      console.error('Error details:', error);
      return;
    }
    
    console.log(`✅ Successfully inserted ${data.length} products!`);
    console.log('\n📦 Inserted products:');
    data.forEach((product, index) => {
      console.log(`${index + 1}. ${product.name} (ID: ${product.id})`);
    });
    
    console.log('\n🎉 You can now view products at:');
    console.log('- Homepage: http://localhost:3000');
    console.log('- Products page: http://localhost:3000/products');
    console.log('- Test page: http://localhost:3000/test-supabase');
    
  } catch (error) {
    console.error('❌ Unexpected error:', error.message);
  }
}

insertSampleProducts();