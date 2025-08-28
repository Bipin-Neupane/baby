'use client'

import { useWishlist } from '@/contexts/WishlistContext'
import { useCart } from '@/hooks/useCart'
import Link from 'next/link'
import { Heart, ShoppingCart, Trash2 } from 'lucide-react'
import toast from 'react-hot-toast'

export default function WishlistPage() {
  const { wishlist, removeFromWishlist, clearWishlist } = useWishlist()
  const { addItem } = useCart()

  const handleAddToCart = (product) => {
    addItem(product)
    toast.success(`${product.name} added to cart!`)
  }

  const handleAddAllToCart = () => {
    wishlist.forEach(product => addItem(product))
    toast.success('All items added to cart!')
  }

  if (wishlist.length === 0) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <div className="max-w-md mx-auto">
          <Heart className="w-24 h-24 text-gray-300 mx-auto mb-6" />
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Your Wishlist is Empty</h1>
          <p className="text-gray-600 mb-8">
            Save items you love to your wishlist and come back to them anytime!
          </p>
          <Link href="/products" className="btn-primary inline-block">
            Start Shopping
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900">
          My Wishlist ({wishlist.length} items)
        </h1>
        <div className="flex gap-4">
          <button
            onClick={handleAddAllToCart}
            className="btn-primary"
          >
            Add All to Cart
          </button>
          <button
            onClick={clearWishlist}
            className="btn-secondary"
          >
            Clear Wishlist
          </button>
        </div>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        {wishlist.map((product) => (
          <div key={product.id} className="card group">
            <div className="relative aspect-square overflow-hidden bg-gray-50">
              <button
                onClick={() => removeFromWishlist(product.id)}
                className="absolute top-2 right-2 z-10 p-2 bg-white rounded-full shadow-md hover:bg-red-50"
              >
                <Trash2 className="w-4 h-4 text-red-500" />
              </button>
              <img
                src={product.images?.[0] || '/api/placeholder/400/400'}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </div>
            
            <div className="p-4">
              <Link href={`/products/${product.id}`}>
                <h3 className="font-semibold text-gray-900 mb-1 hover:text-purple-600">
                  {product.name}
                </h3>
              </Link>
              <p className="text-sm text-gray-500 mb-3">{product.brand}</p>
              
              <div className="flex items-center justify-between">
                <span className="text-lg font-bold text-gray-900">
                  ${(product.sale_price || product.price).toFixed(2)}
                </span>
                <button
                  onClick={() => handleAddToCart(product)}
                  className="p-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
                >
                  <ShoppingCart className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}