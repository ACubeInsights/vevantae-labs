-- Fix RLS policies for products_01 table to allow public SELECT

-- Check current RLS status for products_01
SELECT schemaname, tablename, rowsecurity 
FROM pg_tables 
WHERE tablename = 'products_01';

-- Add SELECT policy for products_01 table to allow public reads
CREATE POLICY "Allow public select on products_01" ON products_01
  FOR SELECT USING (true);

-- Verify the policy was created
SELECT schemaname, tablename, policyname, cmd, qual 
FROM pg_policies 
WHERE tablename = 'products_01';

-- Test query to verify we can now read data
SELECT COUNT(*) as total_products FROM products_01;
SELECT name, status FROM products_01 LIMIT 5;