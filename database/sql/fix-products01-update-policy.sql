-- Add UPDATE policy for products03 table
-- This allows updating product data including images

CREATE POLICY "Allow public UPDATE on products03" ON "public"."products03"
AS PERMISSIVE FOR UPDATE
TO public
USING (true)
WITH CHECK (true);