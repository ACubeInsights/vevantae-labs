-- Fix RLS policies for products03 table to allow public SELECT

-- Check current RLS status for products03
SELECT schemaname, tablename, rowsecurity 
FROM pg_tables 
WHERE tablename = 'products03';

-- Add SELECT policy for products03 table to allow public reads
CREATE POLICY "Allow public select on products03" ON products03
  FOR SELECT USING (true);

-- Verify the policy was created
SELECT schemaname, tablename, policyname, cmd, qual 
FROM pg_policies 
WHERE tablename = 'products03';

-- Test query to verify we can now read data
SELECT COUNT(*) as total_products FROM products03;
SELECT name, status FROM products03 LIMIT 5;