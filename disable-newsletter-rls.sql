-- Simplest fix: Disable RLS for newsletter table
-- Run this single line in your Supabase SQL Editor:

ALTER TABLE newsletter_subscribers DISABLE ROW LEVEL SECURITY;