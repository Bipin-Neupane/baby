-- Run this SQL in Supabase to update product images with real Unsplash photos

-- Update existing products with real baby product images
UPDATE products SET images = '["https://images.unsplash.com/photo-1522771930-78848d9293e8?w=800"]'
WHERE slug = 'organic-cotton-onesie-set';

UPDATE products SET images = '["https://images.unsplash.com/photo-1519689680058-324335c77eba?w=800"]'
WHERE slug = 'baby-girl-dress-headband';

UPDATE products SET images = '["https://images.unsplash.com/photo-1596461404969-9ae70f2830c1?w=800"]'
WHERE slug = 'wooden-rainbow-stacker';

UPDATE products SET images = '["https://images.unsplash.com/photo-1567098260267-7083e0e93e1c?w=800"]'
WHERE slug = 'musical-baby-mobile';

UPDATE products SET images = '["https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?w=800"]'
WHERE slug = 'silicone-feeding-set';

UPDATE products SET images = '["https://images.unsplash.com/photo-1544642899-f0d6e5f6ed6f?w=800"]'
WHERE slug = 'bottle-starter-set';

UPDATE products SET images = '["https://images.unsplash.com/photo-1492725764893-90b379c2b6e7?w=800"]'
WHERE slug = 'luxury-bath-set';

UPDATE products SET images = '["https://images.unsplash.com/photo-1622290291468-a28f7a7dc6a8?w=800"]'
WHERE slug = 'convertible-car-seat';

UPDATE products SET images = '["https://images.unsplash.com/photo-1533499966477-9e50e2d0b9e7?w=800"]'
WHERE slug = 'lightweight-stroller';

UPDATE products SET images = '["https://images.unsplash.com/photo-1491553895911-0055eca6402d?w=800"]'
WHERE slug = 'white-noise-machine';

UPDATE products SET images = '["https://images.unsplash.com/photo-1515210209600-f91e4e5a3ea3?w=800"]'
WHERE slug = 'baby-monitor-camera';

-- If you want to add more sample products with images, here are some examples:

-- Add some new products with real images
INSERT INTO products (name, slug, description, price, sale_price, category, brand, stock_quantity, is_featured, is_active, images, features, age_range) 
VALUES
    ('Soft Cotton Baby Blanket', 'soft-cotton-blanket', 'Ultra-soft organic cotton blanket perfect for swaddling and keeping baby warm', 24.99, NULL, 'nursery', 'CozyBaby', 45, false, true, 
     '["https://images.unsplash.com/photo-1584839401450-0dcaf212a6a7?w=800"]', 
     '["100% organic cotton", "Machine washable", "Breathable fabric", "30x40 inches"]',
     '0-12 months'),
     
    ('Natural Teething Ring', 'natural-teething-ring', 'Safe wooden teething ring made from untreated beech wood', 12.99, 9.99, 'toys', 'NaturalBaby', 60, true, true,
     '["https://images.unsplash.com/photo-1618842676088-c4d48a6a7c9d?w=800"]',
     '["Natural beech wood", "BPA free", "Easy to grip", "Soothes sore gums"]',
     '3-12 months'),
     
    ('Baby Sleep Sack', 'baby-sleep-sack', 'Wearable blanket for safe sleeping, made from breathable cotton', 29.99, NULL, 'nursery', 'SleepTight', 35, false, true,
     '["https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800"]',
     '["TOG rating 1.0", "Two-way zipper", "100% cotton", "Machine washable"]',
     '0-18 months'),
     
    ('Bamboo Baby Wipes', 'bamboo-baby-wipes', 'Eco-friendly, biodegradable bamboo baby wipes. Pack of 6', 19.99, 16.99, 'bath-care', 'EcoClean', 100, true, true,
     '["https://images.unsplash.com/photo-1583947215259-38e31be8751a?w=800"]',
     '["99% water", "Hypoallergenic", "Fragrance free", "Biodegradable"]',
     '0+ months'),
     
    ('Baby Food Maker', 'baby-food-maker', 'All-in-one baby food processor - steam, blend, reheat and defrost', 89.99, NULL, 'feeding', 'FreshStart', 20, true, true,
     '["https://images.unsplash.com/photo-1617768587482-0dc525a01bf9?w=800"]',
     '["Steam and blend", "BPA free", "Dishwasher safe", "Compact design"]',
     '4+ months');