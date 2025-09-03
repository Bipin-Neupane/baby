'use client'

import { useCart } from '@/hooks/useCart'
import { Trash2 } from 'lucide-react'
import ImageWithFallback from '@/components/ui/ImageWithFallback'

export default function CartItem({ item }) {
  const { updateQuantity, removeItem } = useCart()

  return (
    <div className="flex items-center gap-4 p-4 bg-white rounded-lg shadow-sm mb-4">
      <div className="relative w-24 h-24 rounded-lg overflow-hidden">
        <ImageWithFallback
          src={item.product.images?.[0]}
          alt={item.product.name}
          category={item.product.category}
          className="object-cover"
          sizes="96px"
          fill
        />
      </div>
      
      <div className="flex-1">
        <h3 className="font-semibold text-gray-900">{item.product.name}</h3>
        <p className="text-sm text-gray-600">{item.product.brand}</p>
        <div className="mt-2 flex items-center gap-4">
          <div className="flex items-center border border-gray-300 rounded">
            <button
              onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
              className="px-3 py-1 hover:bg-gray-100"
            >
              -
            </button>
            <span className="px-4 py-1 border-x border-gray-300">{item.quantity}</span>
            <button
              onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
              className="px-3 py-1 hover:bg-gray-100"
            >
              +
            </button>
          </div>
          <button
            onClick={() => removeItem(item.product.id)}
            className="text-red-500 hover:text-red-600"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>
      
      <div className="text-right">
        <p className="font-semibold text-lg">
          ${((item.product.sale_price || item.product.price) * item.quantity).toFixed(2)}
        </p>
        {item.quantity > 1 && (
          <p className="text-sm text-gray-600">
            ${(item.product.sale_price || item.product.price).toFixed(2)} each
          </p>
        )}
      </div>
    </div>
  )
}