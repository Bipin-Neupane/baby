'use client'

import { useCart } from '@/hooks/useCart'
import { calculateCartTotal } from '@/lib/utils'
import Link from 'next/link'

export default function CartSummary() {
  const { items } = useCart()
  const { subtotal, shipping, tax, total } = calculateCartTotal(items)

  return (
    <div className="bg-gray-50 rounded-lg p-4 sm:p-6">
      <h2 className="text-lg sm:text-xl font-semibold mb-4">Order Summary</h2>
      
      <div className="space-y-2 mb-4">
        <div className="flex justify-between">
          <span>Subtotal</span>
          <span>${subtotal.toFixed(2)}</span>
        </div>
        <div className="flex justify-between">
          <span>Shipping</span>
          <span className="text-green-600 font-medium">FREE</span>
        </div>
        <div className="flex justify-between">
          <span>Tax</span>
          <span className="text-green-600 font-medium">$0.00</span>
        </div>
      </div>
      
      <div className="border-t pt-4 mb-6">
        <div className="flex justify-between text-lg font-semibold">
          <span>Total</span>
          <span>${total.toFixed(2)}</span>
        </div>
      </div>
      
      <Link href="/checkout" className="w-full btn-primary block text-center">
        Proceed to Checkout
      </Link>
      
      <p className="text-sm text-green-600 mt-4 text-center font-medium">
        🎉 Always free shipping & no taxes on all orders!
      </p>
    </div>
  )
}