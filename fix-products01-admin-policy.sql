-- Proper RLS policy for products_01 table
-- This allows public READ access but restricts UPDATE/INSERT/DELETE to authenticated admin users only

-- First, drop the overly permissive policy if it exists
DROP POLICY IF EXISTS "Allow public UPDATE on products_01" ON "public"."products_01";

-- Allow public to SELECT (read) products
CREATE POLICY "Allow public SELECT on products_01" ON "public"."products_01"
AS PERMISSIVE FOR SELECT
TO public
USING (true);

-- Only allow authenticated users with admin role to INSERT
CREATE POLICY "Allow admin INSERT on products_01" ON "public"."products_01"
AS PERMISSIVE FOR INSERT
TO authenticated
WITH CHECK (auth.jwt() ->> 'role' = 'admin');

-- Only allow authenticated users with admin role to UPDATE
CREATE POLICY "Allow admin UPDATE on products_01" ON "public"."products_01"
AS PERMISSIVE FOR UPDATE
TO authenticated
USING (auth.jwt() ->> 'role' = 'admin')
WITH CHECK (auth.jwt() ->> 'role' = 'admin');

-- Only allow authenticated users with admin role to DELETE
CREATE POLICY "Allow admin DELETE on products_01" ON "public"."products_01"
AS PERMISSIVE FOR DELETE
TO authenticated
USING (auth.jwt() ->> 'role' = 'admin');

-- Alternative: If you don't have role-based auth, you can use user email or user ID
-- Replace the admin policies above with something like:
-- USING (auth.uid() = 'your-admin-user-id')
-- or
-- USING (auth.jwt() ->> 'email' = 'admin@yourdomain.com')