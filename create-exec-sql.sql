-- Helper RPC to execute arbitrary SQL statements via Supabase service role
-- Usage: call via Supabase client with the Service Role key
-- Security: Only JWTs with role = 'service_role' can execute

CREATE OR REPLACE FUNCTION public.exec_sql(sql text)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  claims jsonb;
  role text;
BEGIN
  -- Read JWT claims provided by PostgREST
  claims := current_setting('request.jwt.claims', true)::jsonb;
  role := coalesce(claims ->> 'role', '');

  -- Restrict execution to service_role tokens only
  IF role <> 'service_role' THEN
    RAISE EXCEPTION 'Forbidden: exec_sql requires service_role';
  END IF;

  -- Execute the provided SQL statement
  EXECUTE sql;
END;
$$;

-- Lock down function permissions
REVOKE ALL ON FUNCTION public.exec_sql(text) FROM PUBLIC, anon, authenticated;
GRANT EXECUTE ON FUNCTION public.exec_sql(text) TO service_role;

-- Notes:
-- - Run this in Supabase SQL Editor.
-- - After creating, scripts like apply-rls-policy.js can call supabase.rpc('exec_sql', { sql })
-- - Keep this function restricted; do not grant to anon/authenticated roles.