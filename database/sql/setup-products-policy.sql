-- Add INSERT policy for products03 table to allow public inserts
-- Run this in your Supabase SQL Editor

-- First, let's check if the products03 table exists and has RLS enabled
SELECT schemaname, tablename, rowsecurity 
FROM pg_tables 
WHERE tablename = 'products03';

-- Add INSERT policy for products03 table
CREATE POLICY "Allow public insert on products03" ON products03
  FOR INSERT WITH CHECK (true);

-- Add UPDATE policy for products03 table (optional, for future use)
CREATE POLICY "Allow public update on products03" ON products03
  FOR UPDATE USING (true) WITH CHECK (true);

-- Verify the policies were created
SELECT schemaname, tablename, policyname, permissive, roles, cmd, qual, with_check
FROM pg_policies 
WHERE tablename = 'products03';

-- Now insert sample products
INSERT INTO products03 (
  name, 
  description, 
  images, 
  product_ml, 
  category, 
  quantity, 
  status, 
  is_featured, 
  detailed_info, 
  key_ingredients, 
  benefits, 
  usage_instructions, 
  lifestyle_problems
) VALUES 
(
  'Premium Vitamin C Serum',
  'A powerful antioxidant serum that brightens skin and reduces signs of aging with 20% Vitamin C.',
  ARRAY[
    'https://images.unsplash.com/photo-1556228720-195a672e8a03?w=400',
    'https://images.unsplash.com/photo-1556228720-195a672e8a03?w=400&h=400&fit=crop',
    'https://images.unsplash.com/photo-1556228720-195a672e8a03?w=400&h=600&fit=crop'
  ],
  30,
  'Skincare',
  100,
  'Active',
  true,
  'This premium vitamin C serum is formulated with 20% L-Ascorbic Acid, the most potent form of Vitamin C. It helps to brighten skin tone, reduce dark spots, and protect against environmental damage.',
  ARRAY['20% L-Ascorbic Acid', 'Hyaluronic Acid', 'Vitamin E', 'Ferulic Acid'],
  ARRAY['Brightens skin tone', 'Reduces dark spots', 'Anti-aging properties', 'Antioxidant protection'],
  ARRAY['Apply 2-3 drops to clean skin in the morning', 'Follow with moisturizer and SPF', 'Start with every other day and gradually increase to daily use'],
  ARRAY['Dull skin', 'Dark spots', 'Signs of aging']
),
(
  'Hydrating Face Moisturizer',
  'A lightweight, non-greasy moisturizer that provides 24-hour hydration for all skin types.',
  ARRAY[
    'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400',
    'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=400&fit=crop'
  ],
  50,
  'Skincare',
  75,
  'Active',
  true,
  'Our hydrating face moisturizer is enriched with ceramides and hyaluronic acid to restore and maintain the skin barrier while providing long-lasting moisture.',
  ARRAY['Ceramides', 'Hyaluronic Acid', 'Niacinamide', 'Glycerin'],
  ARRAY['24-hour hydration', 'Strengthens skin barrier', 'Non-comedogenic', 'Suitable for sensitive skin'],
  ARRAY['Apply to clean face and neck morning and evening', 'Gently massage until fully absorbed'],
  ARRAY['Dry skin', 'Dehydrated skin', 'Sensitive skin']
),
(
  'Gentle Cleansing Foam',
  'A mild, sulfate-free cleanser that removes impurities without stripping the skin of its natural oils.',
  ARRAY[
    'https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=400',
    'https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=400&h=400&fit=crop'
  ],
  150,
  'Skincare',
  50,
  'Active',
  false,
  'This gentle cleansing foam is perfect for daily use. It effectively removes makeup, dirt, and excess oil while maintaining the skin natural pH balance.',
  ARRAY['Coconut-derived surfactants', 'Aloe Vera', 'Chamomile Extract', 'Panthenol'],
  ARRAY['Gentle cleansing', 'Maintains pH balance', 'Removes makeup', 'Soothes skin'],
  ARRAY['Wet face with lukewarm water', 'Apply a small amount to hands and create a lather', 'Gently massage onto face', 'Rinse thoroughly'],
  ARRAY['Oily skin', 'Makeup removal', 'Daily cleansing']
),
(
  'Retinol Night Treatment',
  'A potent anti-aging treatment with 0.5% retinol to reduce fine lines and improve skin texture.',
  ARRAY['https://images.unsplash.com/photo-1556228453-efd6c1ff04f6?w=400'],
  30,
  'Skincare',
  25,
  'Active',
  true,
  'Our retinol night treatment contains 0.5% pure retinol encapsulated in a time-release system to minimize irritation while maximizing effectiveness.',
  ARRAY['0.5% Retinol', 'Squalane', 'Vitamin E', 'Bisabolol'],
  ARRAY['Reduces fine lines', 'Improves skin texture', 'Increases cell turnover', 'Anti-aging'],
  ARRAY['Use only at night', 'Start with 2-3 times per week and gradually increase', 'Apply a pea-sized amount to clean, dry skin', 'Always use SPF during the day'],
  ARRAY['Fine lines', 'Wrinkles', 'Uneven skin texture', 'Signs of aging']
);

-- Verify the data was inserted
SELECT id, name, status, is_featured, array_length(images, 1) as image_count
FROM products03
ORDER BY created_at DESC;