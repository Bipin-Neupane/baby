-- Simple fix for newsletter RLS policy
-- Run this in your Supabase SQL Editor

-- First, disable RLS temporarily to ensure table works
ALTER TABLE newsletter_subscribers DISABLE ROW LEVEL SECURITY;

-- Test insert (this should work now)
INSERT INTO newsletter_subscribers (email, source) VALUES ('test-rls@example.com', 'test');

-- Re-enable RLS
ALTER TABLE newsletter_subscribers ENABLE ROW LEVEL SECURITY;

-- Drop all existing policies
DROP POLICY IF EXISTS "Allow public newsletter subscriptions" ON newsletter_subscribers;
DROP POLICY IF EXISTS "Newsletter subscribers are viewable by admins only" ON newsletter_subscribers;
DROP POLICY IF EXISTS "Allow service role to read newsletter_subscribers" ON newsletter_subscribers;

-- Create a simple policy that allows anyone to insert (no authentication required)
CREATE POLICY "Public can insert newsletter subscriptions" ON newsletter_subscribers
    FOR INSERT TO public
    WITH CHECK (true);

-- Create a policy for reading (service role only for admin)
CREATE POLICY "Service role can read newsletter_subscribers" ON newsletter_subscribers
    FOR SELECT TO service_role
    USING (true);

-- Verify policies
SELECT schemaname, tablename, policyname, permissive, roles, cmd, qual, with_check
FROM pg_policies 
WHERE tablename = 'newsletter_subscribers';

SELECT 'Newsletter RLS policies fixed!' as status;