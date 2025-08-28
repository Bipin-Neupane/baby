-- Create Newsletter Subscribers Table
CREATE TABLE IF NOT EXISTS newsletter_subscribers (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    subscribed_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE newsletter_subscribers ENABLE ROW LEVEL SECURITY;

-- Create policy for newsletter
CREATE POLICY "Anyone can subscribe to newsletter" ON newsletter_subscribers
    FOR INSERT WITH CHECK (true);

-- Add 17 More Diverse Baby Products with Real Images
INSERT INTO products (name, slug, description, price, sale_price, category, brand, stock_quantity, is_featured, is_active, images, features, age_range) 
VALUES
    -- Clothing Products
    ('Premium Baby Romper Set (3 Pack)', 'premium-baby-romper-set', 'Adorable and comfortable rompers made from organic bamboo fabric. Set includes 3 different designs.', 39.99, 32.99, 'clothing', 'LittleStyle', 40, true, true, 
     '["https://images.unsplash.com/photo-1522771930-78848d9293e8?w=800"]', 
     '["Organic bamboo fabric", "Snap closures for easy changing", "Temperature regulating", "Hypoallergenic", "3 unique designs per pack"]',
     '0-12 months'),
     
    ('Winter Baby Snowsuit', 'winter-baby-snowsuit', 'Warm and cozy snowsuit perfect for cold weather. Water-resistant with fleece lining.', 79.99, NULL, 'clothing', 'ArcticBaby', 25, false, true,
     '["https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800"]',
     '["Water-resistant outer layer", "Fleece lined", "Detachable mittens and booties", "Full-length zipper", "Machine washable"]',
     '3-24 months'),
     
    -- Toys Products
    ('Educational Activity Cube', 'educational-activity-cube', 'Multi-sided wooden activity cube with shape sorters, bead maze, and spinning gears.', 49.99, 44.99, 'toys', 'BrightMinds', 35, true, true,
     '["https://images.unsplash.com/photo-1618842676088-c4d48a6a7c9d?w=800"]',
     '["6 different activities", "Solid wood construction", "Lead-free paint", "Develops motor skills", "Educational and fun"]',
     '12-36 months'),
     
    ('Soft Plush Elephant', 'soft-plush-elephant', 'Cuddly elephant stuffed animal made with ultra-soft fabric. Perfect bedtime companion.', 22.99, NULL, 'toys', 'SnuggleFriends', 55, false, true,
     '["https://images.unsplash.com/photo-1559454403-b8fb88521f11?w=800"]',
     '["Ultra-soft plush material", "Machine washable", "Safety eyes", "12 inches tall", "Suitable from birth"]',
     '0+ months'),
     
    ('Musical Learning Piano', 'musical-learning-piano', 'Baby-safe piano with lights, sounds, and learning modes. Introduces music and colors.', 34.99, 29.99, 'toys', 'MusicStart', 42, true, true,
     '["https://images.unsplash.com/photo-1493225457124-a92f50e7f0e0?w=800"]',
     '["8 colorful keys", "3 learning modes", "Volume control", "Auto shut-off", "Requires 3 AA batteries"]',
     '6-36 months'),
     
    -- Nursery Products  
    ('Smart Baby Monitor Pro', 'smart-baby-monitor-pro', 'WiFi-enabled baby monitor with 2K video, night vision, and smartphone app integration.', 199.99, 179.99, 'nursery', 'SecureView', 18, true, true,
     '["https://images.unsplash.com/photo-1515210209600-f91e4e5a3ea3?w=800"]',
     '["2K HD video quality", "Two-way audio", "Room temperature sensor", "Lullaby player", "Works with Alexa"]',
     '0+ months'),
     
    ('Convertible Mini Crib', 'convertible-mini-crib', 'Space-saving mini crib that converts to toddler bed. Perfect for small nurseries.', 299.99, NULL, 'nursery', 'CompactComfort', 12, false, true,
     '["https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?w=800"]',
     '["4-in-1 convertible design", "Solid pine wood", "GREENGUARD Gold certified", "Adjustable mattress height", "Includes conversion kit"]',
     '0-5 years'),
     
    ('Baby Night Light Projector', 'baby-night-light-projector', 'Soothing star projector with multiple colors and rotation. Creates calming bedtime atmosphere.', 26.99, NULL, 'nursery', 'DreamyNights', 48, true, true,
     '["https://images.unsplash.com/photo-1489674267075-403c8e6627fb?w=800"]',
     '["360° rotation", "8 color modes", "Timer function", "Remote control", "USB rechargeable"]',
     '0+ months'),
     
    -- Feeding Products
    ('Glass Baby Bottle Set', 'glass-baby-bottle-set', 'Premium borosilicate glass bottles with silicone sleeves. Set of 4 with different sizes.', 54.99, 49.99, 'feeding', 'PureFlow', 38, true, true,
     '["https://images.unsplash.com/photo-1544642899-0148c97b7044?w=800"]',
     '["Borosilicate glass", "Silicone protective sleeves", "Anti-colic nipples", "4 bottles (2x4oz, 2x8oz)", "Dishwasher safe"]',
     '0-12 months'),
     
    ('Bamboo Suction Plate Set', 'bamboo-suction-plate-set', 'Eco-friendly bamboo plates with strong suction base. Includes spoon and fork.', 27.99, NULL, 'feeding', 'EcoMeals', 65, false, true,
     '["https://images.unsplash.com/photo-1617768587482-0dc525a01bf9?w=800"]',
     '["Natural bamboo", "BPA-free silicone base", "Strong suction", "Microwave safe", "Matching utensils included"]',
     '6+ months'),
     
    ('Baby Food Storage Containers', 'baby-food-storage-containers', 'Freezer-safe glass containers for homemade baby food. Set of 12 with measurement marks.', 32.99, 28.99, 'feeding', 'FreshKeep', 52, true, true,
     '["https://images.unsplash.com/photo-1584839610093-a5c9e6a6f0a3?w=800"]',
     '["Tempered glass", "Leak-proof lids", "Freezer to oven safe", "12 containers (4oz each)", "Date dial on lids"]',
     '4+ months'),
     
    -- Bath & Care Products
    ('Organic Baby Shampoo & Body Wash', 'organic-baby-shampoo-body-wash', 'Tear-free, organic formula with calendula and chamomile. Gentle for sensitive skin.', 16.99, NULL, 'bath-care', 'NatureBaby', 75, false, true,
     '["https://images.unsplash.com/photo-1527156231393-0b6c92f3c4e3?w=800"]',
     '["USDA certified organic", "Tear-free formula", "Pediatrician tested", "16 fl oz", "No harsh chemicals"]',
     '0+ months'),
     
    ('Hooded Baby Towel Set', 'hooded-baby-towel-set', 'Ultra-absorbent bamboo towels with cute animal hoods. Set includes 2 towels and 4 washcloths.', 36.99, 32.99, 'bath-care', 'SoftWrap', 44, true, true,
     '["https://images.unsplash.com/photo-1492725764893-90b379c2b6e7?w=800"]',
     '["Bamboo terry cloth", "Extra absorbent", "Animal hood designs", "Large 30x30 inch size", "Gets softer with each wash"]',
     '0+ months'),
     
    -- Travel Products
    ('Compact Travel System', 'compact-travel-system', 'Lightweight stroller with car seat adapter. Folds with one hand for easy travel.', 249.99, 219.99, 'travel', 'GoExplore', 15, true, true,
     '["https://images.unsplash.com/photo-1533499966477-9e50e2d0b9e7?w=800"]',
     '["One-hand fold", "Only 15 lbs", "Large storage basket", "All-terrain wheels", "5-point harness"]',
     '0-4 years'),
     
    ('Portable Baby Bed', 'portable-baby-bed', 'Foldable travel crib with breathable mesh sides. Perfect for trips and visits.', 89.99, NULL, 'travel', 'TravelNest', 28, false, true,
     '["https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?w=800"]',
     '["Lightweight design", "Sets up in seconds", "Breathable mesh", "Includes mattress", "Carrying bag included"]',
     '0-24 months'),
     
    -- Safety Products
    ('Baby Safety Gate Set', 'baby-safety-gate-set', 'Pressure-mounted safety gates for stairs and doorways. Set includes 2 gates.', 79.99, 69.99, 'safety', 'SafeGuard', 33, true, true,
     '["https://images.unsplash.com/photo-1503516509570-a0d605c5de96?w=800"]',
     '["No drilling required", "Auto-close feature", "One-hand operation", "Fits openings 29-39 inches", "JPMA certified"]',
     '6-24 months'),
     
    -- Gift Sets
    ('Newborn Essential Gift Basket', 'newborn-essential-gift-basket', 'Beautiful gift basket with all newborn essentials. Perfect for baby showers.', 99.99, 89.99, 'gifts', 'GiftJoy', 20, true, true,
     '["https://images.unsplash.com/photo-1584839401450-0dcaf212a6a7?w=800"]',
     '["Organic cotton onesies", "Soft blanket", "Baby care products", "Plush toy", "Keepsake box", "Beautifully wrapped"]',
     '0-3 months');

-- Update some existing products to have sale prices for variety
UPDATE products SET sale_price = 22.99 WHERE slug = 'organic-cotton-onesie-set' AND sale_price IS NULL;
UPDATE products SET sale_price = 13.99 WHERE slug = 'wooden-rattle-toy' AND sale_price IS NULL;
UPDATE products SET is_featured = true WHERE slug IN ('glass-baby-bottle-set', 'educational-activity-cube', 'hooded-baby-towel-set');

-- Add some variety to stock levels
UPDATE products SET stock_quantity = FLOOR(RANDOM() * 80 + 10) WHERE stock_quantity < 10;

-- Create indexes for better search performance
CREATE INDEX IF NOT EXISTS idx_products_name ON products(name);
CREATE INDEX IF NOT EXISTS idx_products_brand ON products(brand);
CREATE INDEX IF NOT EXISTS idx_newsletter_email ON newsletter_subscribers(email);