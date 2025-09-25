'use client'

import { useCart } from '@/hooks/useCart'
import { Trash2 } from 'lucide-react'
import { getEbookIconAndColor } from '@/lib/ebookUtils'

export default function CartItem({ item }) {
  const { updateQuantity, removeItem } = useCart()
  const { icon: IconComponent, color } = getEbookIconAndColor(item.product.id)

  return (
    <div className="flex flex-col sm:flex-row sm:items-center gap-4 p-4 bg-white rounded-lg shadow-sm mb-4">
      <div className="flex-shrink-0">
        <div className={`w-16 h-16 bg-gradient-to-r ${color} rounded-lg flex items-center justify-center shadow-lg`}>
          <IconComponent className="w-8 h-8 text-white" />
        </div>
      </div>
      
      <div className="flex-1">
        <h3 className="font-semibold text-gray-900">{item.product.name}</h3>
        <p className="text-sm text-gray-600">{item.product.brand}</p>
        <div className="mt-2 flex items-center justify-between sm:justify-start gap-4">
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
      
      <div className="text-right sm:text-right flex-shrink-0">
        <p className="font-semibold text-lg">
          ${(item.product.price * item.quantity).toFixed(2)}
        </p>
        {item.quantity > 1 && (
          <p className="text-sm text-gray-600">
            ${item.product.price.toFixed(2)} each
          </p>
        )}
      </div>
    </div>
  )
}