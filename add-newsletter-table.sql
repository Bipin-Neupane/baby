-- Add newsletter functionality to existing database
-- Run this in your Supabase SQL Editor

-- Create newsletter subscribers table
CREATE TABLE IF NOT EXISTS newsletter_subscribers (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    is_active BOOLEAN DEFAULT true,
    subscribed_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    unsubscribed_at TIMESTAMP WITH TIME ZONE,
    source VARCHAR(50) DEFAULT 'website',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE newsletter_subscribers ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if they exist (in case of re-run)
DROP POLICY IF EXISTS "Allow public newsletter subscriptions" ON newsletter_subscribers;
DROP POLICY IF EXISTS "Allow service role to read newsletter_subscribers" ON newsletter_subscribers;

-- Create policies that allow public subscriptions
CREATE POLICY "Allow public newsletter subscriptions" ON newsletter_subscribers
    FOR INSERT WITH CHECK (true);

-- Allow service role to read for admin dashboard
CREATE POLICY "Allow service role to read newsletter_subscribers" ON newsletter_subscribers
    FOR SELECT USING (auth.role() = 'service_role');

-- Verify table creation
SELECT 'Newsletter table created successfully!' as status;

-- Show table structure
SELECT column_name, data_type, is_nullable, column_default 
FROM information_schema.columns 
WHERE table_name = 'newsletter_subscribers' 
ORDER BY ordinal_position;