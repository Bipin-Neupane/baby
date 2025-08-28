'use client'

import Link from 'next/link'
import { useState } from 'react'
import { useCart } from '@/hooks/useCart'
import { ShoppingCart, Heart } from 'lucide-react'
import toast from 'react-hot-toast'

// Default fallback images for each category
const categoryFallbacks = {
  'clothing': 'https://images.unsplash.com/photo-1522771930-78848d9293e8?w=800&h=800&fit=crop',
  'toys': 'https://images.unsplash.com/photo-1596461404969-9ae70f2830c1?w=800&h=800&fit=crop',
  'nursery': 'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?w=800&h=800&fit=crop',
  'feeding': 'https://images.unsplash.com/photo-1570544820881-4fe8b8e5da06?w=800&h=800&fit=crop',
  'bath-care': 'https://images.unsplash.com/photo-1540221652346-e5dd6b50f3e7?w=800&h=800&fit=crop',
  'travel': 'https://images.unsplash.com/photo-1533499966477-9333968a4e28?w=800&h=800&fit=crop',
  'safety': 'https://images.unsplash.com/photo-1503516509570-a0d605c5de96?w=800&h=800&fit=crop',
  'gifts': 'https://images.unsplash.com/photo-1515192650392-45c8ad7b8fdc?w=800&h=800&fit=crop',
  'default': 'https://images.unsplash.com/photo-1519689680058-324335c77eba?w=800&h=800&fit=crop'
}

export default function ProductCard({ product }) {
  const { addItem } = useCart()
  const [imageError, setImageError] = useState(false)
  const [imageLoading, setImageLoading] = useState(true)
  
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
    toast.success(`${product.name} added to cart!`)
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

  // Get the product image with multiple fallbacks
  const getProductImage = () => {
    if (!imageError && product.images && product.images.length > 0 && product.images[0]) {
      const image = product.images[0]
      // Check if it's a valid URL
      if (image.startsWith('http') && !image.includes('placeholder')) {
        return image
      }
    }
    // Return category-specific fallback or default
    return categoryFallbacks[product.category] || categoryFallbacks.default
  }

  const imageUrl = getProductImage()

  return (
    <Link href={`/products/${product.id}`}>
      <div className="card group cursor-pointer h-full flex flex-col">
        <div className="relative aspect-square overflow-hidden bg-gray-50">
          {product.sale_price && (
            <div className="absolute top-2 left-2 z-10 bg-red-500 text-white px-2 py-1 rounded-md text-sm font-semibold">
              -{discountPercentage}%
            </div>
          )}
          {wishlistFunctions && (
            <button
              className={`absolute top-2 right-2 z-10 p-2 bg-white rounded-full shadow-md transition-colors ${
                wishlistFunctions.isInWishlist(product.id) ? 'text-red-500' : 'text-gray-400 hover:text-red-500'
              }`}
              onClick={handleWishlistToggle}
            >
              <Heart className={`w-4 h-4 ${wishlistFunctions.isInWishlist(product.id) ? 'fill-current' : ''}`} />
            </button>
          )}
          
          {/* Loading skeleton */}
          {imageLoading && (
            <div className="absolute inset-0 bg-gray-200 animate-pulse" />
          )}
          
          <img
            src={imageUrl}
            alt={product.name}
            className={`w-full h-full object-cover group-hover:scale-105 transition-transform duration-300 ${
              imageLoading ? 'opacity-0' : 'opacity-100'
            }`}
            onLoad={() => setImageLoading(false)}
            onError={(e) => {
              setImageError(true)
              setImageLoading(false)
              // Use fallback image
              e.target.src = categoryFallbacks[product.category] || categoryFallbacks.default
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
                    ${product.sale_price.toFixed(2)}
                  </span>
                  <span className="text-sm text-gray-400 line-through">
                    ${product.price.toFixed(2)}
                  </span>
                </>
              ) : (
                <span className="text-lg font-bold text-gray-900">
                  ${product.price.toFixed(2)}
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
}