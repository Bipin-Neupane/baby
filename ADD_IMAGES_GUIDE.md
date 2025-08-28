# Adding Real Images to Your Baby E-Commerce Site

## Option 1: Using the Updated SQL (Recommended)
1. Copy the contents of `update-product-images.sql`
2. Go to your Supabase dashboard
3. Navigate to SQL Editor
4. Paste and run the SQL
5. Your products will now have real Unsplash images

## Option 2: Add Your Own Images
1. Create a `public/images` folder in your project
2. Add your product images there
3. Update the database with local image paths:
   ```sql
   UPDATE products SET images = '["/images/your-image.jpg"]' WHERE id = 'product-id';
   ```

## Option 3: Use Supabase Storage
1. Go to Supabase Dashboard > Storage
2. Create a bucket called "products"
3. Upload your images
4. Update products with Supabase URLs:
   ```sql
   UPDATE products SET images = '["https://your-project.supabase.co/storage/v1/object/public/products/image.jpg"]'
   WHERE id = 'product-id';
   ```

## Working Image URLs from Unsplash:
- Baby Clothing: https://images.unsplash.com/photo-1522771930-78848d9293e8?w=800
- Baby Toys: https://images.unsplash.com/photo-1596461404969-9ae70f2830c1?w=800  
- Baby Mobile: https://images.unsplash.com/photo-1567098260267-7083e0e93e1c?w=800
- Baby Bottles: https://images.unsplash.com/photo-1544642899-f0d6e5f6ed6f?w=800
- Baby Bath: https://images.unsplash.com/photo-1492725764893-90b379c2b6e7?w=800
- Car Seat: https://images.unsplash.com/photo-1622290291468-a28f7a7dc6a8?w=800
- Stroller: https://images.unsplash.com/photo-1533499966477-9e50e2d0b9e7?w=800
- Baby Blanket: https://images.unsplash.com/photo-1584839401450-0dcaf212a6a7?w=800

## Placeholder Service:
If an image fails to load, the app will automatically use: https://via.placeholder.com
