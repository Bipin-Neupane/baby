'use client'

import Link from 'next/link'
import { useState } from 'react'
import { useCart } from '@/hooks/useCart'
import { ShoppingCart, Heart } from 'lucide-react'
import ImageWithFallback from '@/components/ui/ImageWithFallback'
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
      toast.success('Added to wishlist!')
    }
  }

  const discountPercentage = product.sale_price
    ? Math.round((1 - product.sale_price / product.price) * 100)
    : 0

  // Get the primary product image
  const getProductImage = () => {
    if (product.images && product.images.length > 0) {
      const primaryImage = product.images[0]
      if (primaryImage && typeof primaryImage === 'string' && primaryImage.trim() && primaryImage.startsWith('http')) {
        return primaryImage
      }
    }
    return null
  }

  const imageUrl = getProductImage()

  return (
    <Link href={`/products/${product.id}`}>
      <div className="card group cursor-pointer h-full flex flex-col">
        <div className="relative aspect-square overflow-hidden bg-gray-100 rounded-t-xl">
          {product.sale_price && (
            <div className="absolute top-2 left-2 z-10 bg-red-500 text-white px-2 py-1 rounded-md text-sm font-semibold">
              -{discountPercentage}%
            </div>
          )}
          
          <button
            className="absolute top-2 right-2 z-10 p-2 bg-white rounded-full shadow-md opacity-0 group-hover:opacity-100 transition-opacity hover:bg-gray-50"
            onClick={handleWishlistToggle}
          >
            <Heart className="w-4 h-4 text-gray-600 hover:text-red-500 transition-colors" />
          </button>
          
          <ImageWithFallback
            src={imageUrl}
            alt={product.name || 'Product image'}
            category={product.category}
            className="object-cover group-hover:scale-105 transition-all duration-300"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
            priority={product.is_featured}
            fill
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
              className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white py-2 rounded-lg font-medium hover:shadow-lg transition-all duration-200 flex items-center justify-center gap-2 hover:from-purple-700 hover:to-pink-700"
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