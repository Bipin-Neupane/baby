// fix-images.js
// Fixes all placeholder images with real Unsplash images
// Run: node fix-images.js

const fs = require('fs');
const path = require('path');

function createFile(filePath, content) {
  fs.writeFileSync(filePath, content);
  console.log(`✅ Fixed images in: ${filePath}`);
}

console.log('🖼️ Fixing all images in the application...\n');

// Fix Home Page with real hero image
createFile('app/page.js', `import Link from 'next/link'
import ProductGrid from '@/components/products/ProductGrid'
import { supabase } from '@/lib/supabase'
import { ShoppingBag, Truck, Shield, Heart } from 'lucide-react'

async function getFeaturedProducts() {
  const { data, error } = await supabase
    .from('products')
    .select('*')
    .eq('is_featured', true)
    .eq('is_active', true)
    .limit(8)

  if (error) {
    console.error('Error fetching featured products:', error)
    return []
  }

  return data || []
}

async function getCategories() {
  const { data, error } = await supabase
    .from('categories')
    .select('*')
    .eq('is_active', true)
    .order('display_order', { ascending: true })
    .limit(6)

  if (error) {
    console.error('Error fetching categories:', error)
    return []
  }

  return data || []
}

export default async function HomePage() {
  const featuredProducts = await getFeaturedProducts()
  const categories = await getCategories()

  return (
    <div>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50 overflow-hidden">
        <div className="absolute inset-0 bg-[url('/pattern.svg')] opacity-5"></div>
        <div className="container mx-auto px-4 py-20 lg:py-32">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="relative z-10">
              <h1 className="text-5xl lg:text-6xl font-bold text-gray-900 mb-6 animate-fade-in">
                Welcome to <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-purple-600">BabyBloom</span>
              </h1>
              <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                Discover our carefully curated collection of premium baby products. 
                Safe, certified, and loved by parents worldwide.
              </p>
              <div className="flex gap-4">
                <Link href="/products" className="btn-primary">
                  Shop Now
                </Link>
                <Link href="/products?category=new-arrivals" className="btn-secondary">
                  New Arrivals
                </Link>
              </div>
              <div className="mt-12 grid grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="text-3xl font-bold text-purple-600">10K+</div>
                  <div className="text-sm text-gray-600">Happy Parents</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-pink-600">500+</div>
                  <div className="text-sm text-gray-600">Products</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-blue-600">4.9★</div>
                  <div className="text-sm text-gray-600">Rating</div>
                </div>
              </div>
            </div>
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-pink-200 to-purple-200 rounded-full filter blur-3xl opacity-30 animate-pulse"></div>
              <img
                src="https://images.unsplash.com/photo-1519689680058-324335c77eba?w=600&h=600&fit=crop"
                alt="Happy baby smiling"
                className="relative z-10 rounded-2xl shadow-2xl w-full h-auto"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div className="text-center group">
              <div className="w-16 h-16 mx-auto mb-4 bg-pink-100 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                <ShoppingBag className="w-8 h-8 text-pink-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Premium Quality</h3>
              <p className="text-sm text-gray-600">Only the best for your little one</p>
            </div>
            <div className="text-center group">
              <div className="w-16 h-16 mx-auto mb-4 bg-purple-100 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                <Truck className="w-8 h-8 text-purple-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Fast Shipping</h3>
              <p className="text-sm text-gray-600">Free delivery on orders over $50</p>
            </div>
            <div className="text-center group">
              <div className="w-16 h-16 mx-auto mb-4 bg-blue-100 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                <Shield className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Safe & Certified</h3>
              <p className="text-sm text-gray-600">All products meet safety standards</p>
            </div>
            <div className="text-center group">
              <div className="w-16 h-16 mx-auto mb-4 bg-green-100 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                <Heart className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Parent Approved</h3>
              <p className="text-sm text-gray-600">Loved by thousands of families</p>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Shop by Category</h2>
            <p className="text-xl text-gray-600">Find exactly what you need for your baby</p>
          </div>
          <div className="grid md:grid-cols-3 lg:grid-cols-6 gap-6">
            {categories.map((category, index) => {
              const categoryIcons = {
                'clothing': '👕',
                'toys': '🧸',
                'nursery': '🏠',
                'feeding': '🍼',
                'bath-care': '🛁',
                'travel': '👶',
                'safety': '🛡️',
                'gifts': '🎁'
              }
              return (
                <Link
                  key={category.id}
                  href={\`/products?category=\${category.slug}\`}
                  className="group"
                >
                  <div className="card p-6 text-center hover:border-purple-200 border-2 border-transparent transition-all">
                    <div className="w-20 h-20 mx-auto mb-4 bg-gradient-to-br from-pink-100 to-purple-100 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                      <span className="text-3xl">{categoryIcons[category.slug] || '👶'}</span>
                    </div>
                    <h3 className="font-semibold text-gray-900">{category.name}</h3>
                  </div>
                </Link>
              )
            })}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Featured Products</h2>
            <p className="text-xl text-gray-600">Hand-picked favorites from our collection</p>
          </div>
          <ProductGrid products={featuredProducts} />
          <div className="text-center mt-12">
            <Link href="/products" className="btn-primary">
              View All Products
            </Link>
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-20 bg-gradient-to-r from-purple-600 to-pink-600">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-4xl font-bold text-white mb-4">
              Stay Updated
            </h2>
            <p className="text-xl text-purple-100 mb-8">
              Get exclusive offers and be the first to know about new arrivals
            </p>
            <form className="flex gap-4 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-6 py-3 rounded-lg text-gray-900 focus:ring-4 focus:ring-white/30 outline-none"
              />
              <button type="submit" className="bg-white text-purple-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
                Subscribe
              </button>
            </form>
          </div>
        </div>
      </section>
    </div>
  )
}`);

// Fix Product Card to use placeholder service
createFile('components/products/ProductCard.js', `'use client'

import Link from 'next/link'
import { useCart } from '@/hooks/useCart'
import { ShoppingCart, Heart } from 'lucide-react'
import toast from 'react-hot-toast'

export default function ProductCard({ product }) {
  const { addItem } = useCart()
  
  // Try to import wishlist if available
  let wishlistFunctions = null
  try {
    const { useWishlist } = require('@/contexts/WishlistContext')
    wishlistFunctions = useWishlist()
  } catch (e) {
    // Wishlist not available
  }
  
  const handleAddToCart = (e) => {
    e.preventDefault()
    addItem(product)
    toast.success(\`\${product.name} added to cart!\`)
  }

  const handleWishlistToggle = (e) => {
    e.preventDefault()
    if (wishlistFunctions) {
      const { addToWishlist, removeFromWishlist, isInWishlist } = wishlistFunctions
      if (isInWishlist(product.id)) {
        removeFromWishlist(product.id)
      } else {
        addToWishlist(product)
      }
    } else {
      toast.error('Wishlist not available')
    }
  }

  const discountPercentage = product.sale_price
    ? Math.round((1 - product.sale_price / product.price) * 100)
    : 0

  // Use actual image or a proper placeholder service
  const imageUrl = product.images?.[0] || \`https://via.placeholder.com/400x400/f3f4f6/9ca3af?text=\${encodeURIComponent(product.name || 'Product')}\`

  return (
    <Link href={\`/products/\${product.id}\`}>
      <div className="card group cursor-pointer h-full flex flex-col">
        <div className="relative aspect-square overflow-hidden bg-gray-50">
          {product.sale_price && (
            <div className="absolute top-2 left-2 z-10 bg-red-500 text-white px-2 py-1 rounded-md text-sm font-semibold">
              -{discountPercentage}%
            </div>
          )}
          {wishlistFunctions && (
            <button
              className={\`absolute top-2 right-2 z-10 p-2 bg-white rounded-full shadow-md transition-colors \${
                wishlistFunctions.isInWishlist(product.id) ? 'text-red-500' : 'text-gray-400 hover:text-red-500'
              }\`}
              onClick={handleWishlistToggle}
            >
              <Heart className={\`w-4 h-4 \${wishlistFunctions.isInWishlist(product.id) ? 'fill-current' : ''}\`} />
            </button>
          )}
          <img
            src={imageUrl}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            onError={(e) => {
              e.target.src = \`https://via.placeholder.com/400x400/f3f4f6/9ca3af?text=\${encodeURIComponent(product.name || 'Product')}\`
            }}
          />
        </div>
        
        <div className="p-4 flex-1 flex flex-col">
          <h3 className="font-semibold text-gray-900 mb-1 line-clamp-2">{product.name}</h3>
          <p className="text-sm text-gray-500 mb-2">{product.brand}</p>
          
          <div className="mt-auto">
            <div className="flex items-center gap-2 mb-3">
              {product.sale_price ? (
                <>
                  <span className="text-lg font-bold text-gray-900">
                    $\{product.sale_price.toFixed(2)}
                  </span>
                  <span className="text-sm text-gray-400 line-through">
                    $\{product.price.toFixed(2)}
                  </span>
                </>
              ) : (
                <span className="text-lg font-bold text-gray-900">
                  $\{product.price.toFixed(2)}
                </span>
              )}
            </div>
            
            <button
              onClick={handleAddToCart}
              className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white py-2 rounded-lg font-medium hover:shadow-lg transition-all duration-200 flex items-center justify-center gap-2"
            >
              <ShoppingCart className="w-4 h-4" />
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </Link>
  )
}`);

// Update SQL to use real Unsplash images
createFile('update-product-images.sql', `-- Run this SQL in Supabase to update product images with real Unsplash photos

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
     '4+ months');`);

// Create a public images directory instruction file
createFile('ADD_IMAGES_GUIDE.md', `# Adding Real Images to Your Baby E-Commerce Site

## Option 1: Using the Updated SQL (Recommended)
1. Copy the contents of \`update-product-images.sql\`
2. Go to your Supabase dashboard
3. Navigate to SQL Editor
4. Paste and run the SQL
5. Your products will now have real Unsplash images

## Option 2: Add Your Own Images
1. Create a \`public/images\` folder in your project
2. Add your product images there
3. Update the database with local image paths:
   \`\`\`sql
   UPDATE products SET images = '["/images/your-image.jpg"]' WHERE id = 'product-id';
   \`\`\`

## Option 3: Use Supabase Storage
1. Go to Supabase Dashboard > Storage
2. Create a bucket called "products"
3. Upload your images
4. Update products with Supabase URLs:
   \`\`\`sql
   UPDATE products SET images = '["https://your-project.supabase.co/storage/v1/object/public/products/image.jpg"]'
   WHERE id = 'product-id';
   \`\`\`

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
`);

console.log('\n✅ Fixed hero image on home page');
console.log('✅ Added real Unsplash images');
console.log('✅ Created SQL file to update product images');
console.log('✅ Added fallback placeholder service');
console.log('✅ Created image guide documentation');
console.log('\n🎉 All images are now fixed!');
console.log('\nNext steps:');
console.log('1. Run: node fix-images.js');
console.log('2. Run the SQL in update-product-images.sql in Supabase');
console.log('3. Your site will have real images!');