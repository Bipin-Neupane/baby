-- Migration script to remove unnecessary columns from existing Dcube Store database
-- Run this in Supabase SQL Editor if you have an existing database

-- Remove unnecessary columns from products table
ALTER TABLE products DROP COLUMN IF EXISTS sale_price;
ALTER TABLE products DROP COLUMN IF EXISTS sku;
ALTER TABLE products DROP COLUMN IF EXISTS subcategory;
ALTER TABLE products DROP COLUMN IF EXISTS features;
ALTER TABLE products DROP COLUMN IF EXISTS specifications;
ALTER TABLE products DROP COLUMN IF EXISTS weight;
ALTER TABLE products DROP COLUMN IF EXISTS dimensions;
ALTER TABLE products DROP COLUMN IF EXISTS age_range;
ALTER TABLE products DROP COLUMN IF EXISTS safety_standards;

-- Update existing sample data brand names to Dcube Store (optional)
-- UPDATE products SET brand = 'Dcube Store' WHERE brand = 'BabyBloom';

-- Add any missing columns that should exist (in case of partial schema)
-- These will only run if the columns don't already exist
DO $$
BEGIN
    -- Add missing columns if they don't exist
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'products' AND column_name = 'stock_quantity') THEN
        ALTER TABLE products ADD COLUMN stock_quantity INTEGER DEFAULT 0;
    END IF;
    
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'products' AND column_name = 'is_featured') THEN
        ALTER TABLE products ADD COLUMN is_featured BOOLEAN DEFAULT false;
    END IF;
    
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'products' AND column_name = 'is_active') THEN
        ALTER TABLE products ADD COLUMN is_active BOOLEAN DEFAULT true;
    END IF;
END $$;


-- Update images to include proper width parameters for better loading
UPDATE products 
SET images = (
    SELECT jsonb_agg(
        CASE 
            WHEN value::text LIKE '%unsplash.com%' AND value::text NOT LIKE '%?w=%'
            THEN (value::text || '?w=400')::jsonb
            ELSE value
        END
    )
    FROM jsonb_array_elements(images)
)
WHERE images IS NOT NULL;