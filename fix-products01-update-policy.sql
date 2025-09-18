-- Add UPDATE policy for products_01 table
-- This allows updating product data including images

CREATE POLICY "Allow public UPDATE on products_01" ON "public"."products_01"
AS PERMISSIVE FOR UPDATE
TO public
USING (true)
WITH CHECK (true);