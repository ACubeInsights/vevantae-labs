-- Update all products in products03 table to have status = 'Active'
-- Run this AFTER fixing the RLS policy with fix-products01-rls.sql

-- First, check current products and their status
SELECT id, name, status FROM products03 LIMIT 10;

-- Update all products to have 'Active' status
UPDATE products03 
SET status = 'Active' 
WHERE status IS NULL OR status != 'Active';

-- Verify the update
SELECT COUNT(*) as total_products, 
       COUNT(CASE WHEN status = 'Active' THEN 1 END) as active_products
FROM products03;

-- Show first few products with their new status
SELECT id, name, status FROM products03 LIMIT 5;