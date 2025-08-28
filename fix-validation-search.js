// fix-validation-search.js
// Fixes email validation and adds search functionality
// Run: node fix-validation-search.js

const fs = require('fs');
const path = require('path');

function createFile(filePath, content) {
  fs.writeFileSync(filePath, content);
  console.log(`✅ Fixed: ${filePath}`);
}

function createDir(dirPath) {
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
    console.log(`✅ Created directory: ${dirPath}`);
  }
}

console.log('🚀 Fixing email validation and adding search functionality...\n');

// Create necessary directories
createDir('app/search');
createDir('components/search');

// Fixed Checkout Page with better email validation
createFile('app/checkout/page.js', `'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useCart } from '@/hooks/useCart'
import { useAuth } from '@/hooks/useAuth'
import { calculateCartTotal, generateOrderNumber } from '@/lib/utils'
import { supabase } from '@/lib/supabase'
import { CreditCard, Truck, Shield, ChevronRight } from 'lucide-react'
import toast from 'react-hot-toast'

export default function CheckoutPage() {
  const router = useRouter()
  const { items, clearCart } = useCart()
  const { user } = useAuth()
  const [loading, setLoading] = useState(false)
  const [step, setStep] = useState(1)
  
  const [formData, setFormData] = useState({
    // Customer Info
    email: user?.email || '',
    name: '',
    phone: '',
    
    // Shipping Address
    shippingStreet: '',
    shippingCity: '',
    shippingState: '',
    shippingZip: '',
    shippingCountry: 'United States',
    
    // Billing Address
    sameAsShipping: true,
    billingStreet: '',
    billingCity: '',
    billingState: '',
    billingZip: '',
    billingCountry: 'United States',
    
    // Payment
    cardNumber: '',
    cardName: '',
    cardExpiry: '',
    cardCvv: '',
    
    // Additional
    notes: ''
  })

  const { subtotal, shipping, tax, total } = calculateCartTotal(items)

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    })
  }

  // Fixed email validation function
  const validateEmail = (email) => {
    // More permissive email regex that handles most valid emails
    const emailRegex = /^[a-zA-Z0-9][a-zA-Z0-9._-]*@[a-zA-Z0-9][a-zA-Z0-9.-]*\\.[a-zA-Z]{2,}$/
    
    // Basic validation - just check for @ and .
    // This is more permissive and handles edge cases better
    if (!email || email.length < 3) return false
    if (!email.includes('@')) return false
    
    const parts = email.split('@')
    if (parts.length !== 2) return false
    
    const [localPart, domain] = parts
    if (!localPart || !domain) return false
    
    // Check domain has at least one dot
    if (!domain.includes('.')) return false
    
    // Check domain doesn't start or end with dot
    if (domain.startsWith('.') || domain.endsWith('.')) return false
    
    return true
  }

  const validateStep = (stepNumber) => {
    switch (stepNumber) {
      case 1:
        if (!formData.email || !formData.name || !formData.phone) {
          toast.error('Please fill in all customer information')
          return false
        }
        if (!validateEmail(formData.email)) {
          toast.error('Please enter a valid email address')
          return false
        }
        return true
      
      case 2:
        if (!formData.shippingStreet || !formData.shippingCity || 
            !formData.shippingState || !formData.shippingZip) {
          toast.error('Please fill in all shipping address fields')
          return false
        }
        if (!formData.sameAsShipping) {
          if (!formData.billingStreet || !formData.billingCity || 
              !formData.billingState || !formData.billingZip) {
            toast.error('Please fill in all billing address fields')
            return false
          }
        }
        return true
      
      case 3:
        if (!formData.cardNumber || !formData.cardName || 
            !formData.cardExpiry || !formData.cardCvv) {
          toast.error('Please fill in all payment information')
          return false
        }
        return true
      
      default:
        return true
    }
  }

  const nextStep = () => {
    if (validateStep(step)) {
      setStep(step + 1)
    }
  }

  const prevStep = () => {
    setStep(step - 1)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (!validateStep(3)) return
    
    setLoading(true)

    try {
      const orderData = {
        order_number: generateOrderNumber(),
        customer_email: formData.email,
        customer_name: formData.name,
        customer_phone: formData.phone,
        shipping_address: {
          street: formData.shippingStreet,
          city: formData.shippingCity,
          state: formData.shippingState,
          zip: formData.shippingZip,
          country: formData.shippingCountry
        },
        billing_address: formData.sameAsShipping ? null : {
          street: formData.billingStreet,
          city: formData.billingCity,
          state: formData.billingState,
          zip: formData.billingZip,
          country: formData.billingCountry
        },
        items: items.map(item => ({
          product_id: item.product.id,
          product_name: item.product.name,
          price: item.product.sale_price || item.product.price,
          quantity: item.quantity,
          total: (item.product.sale_price || item.product.price) * item.quantity
        })),
        subtotal,
        shipping_cost: shipping,
        tax,
        total,
        status: 'pending',
        payment_method: 'credit_card',
        payment_status: 'paid',
        notes: formData.notes
      }

      const { data, error } = await supabase
        .from('orders')
        .insert([orderData])
        .select()
        .single()

      if (error) throw error

      clearCart()
      toast.success('Order placed successfully!')
      router.push(\`/orders/\${data.id}/confirmation\`)
    } catch (error) {
      console.error('Error placing order:', error)
      toast.error('Failed to place order. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  if (items.length === 0) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Your cart is empty</h1>
        <p className="text-gray-600 mb-8">Add some items to your cart before checkout</p>
        <a href="/products" className="btn-primary">Continue Shopping</a>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Checkout</h1>
        
        {/* Progress Steps */}
        <div className="flex items-center justify-center mb-8">
          <div className="flex items-center space-x-4">
            <div className={\`flex items-center justify-center w-10 h-10 rounded-full \${
              step >= 1 ? 'bg-purple-600 text-white' : 'bg-gray-300 text-gray-600'
            }\`}>
              1
            </div>
            <ChevronRight className="w-5 h-5 text-gray-400" />
            <div className={\`flex items-center justify-center w-10 h-10 rounded-full \${
              step >= 2 ? 'bg-purple-600 text-white' : 'bg-gray-300 text-gray-600'
            }\`}>
              2
            </div>
            <ChevronRight className="w-5 h-5 text-gray-400" />
            <div className={\`flex items-center justify-center w-10 h-10 rounded-full \${
              step >= 3 ? 'bg-purple-600 text-white' : 'bg-gray-300 text-gray-600'
            }\`}>
              3
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <form onSubmit={handleSubmit}>
              {/* Step 1: Customer Information */}
              {step === 1 && (
                <div className="bg-white rounded-lg p-6 shadow-sm">
                  <h2 className="text-xl font-semibold mb-6">Customer Information</h2>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="input"
                        placeholder="you@example.com"
                      />
                    </div>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Full Name *
                        </label>
                        <input
                          type="text"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          required
                          className="input"
                          placeholder="John Doe"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Phone Number *
                        </label>
                        <input
                          type="tel"
                          name="phone"
                          value={formData.phone}
                          onChange={handleChange}
                          required
                          className="input"
                          placeholder="+1 (555) 123-4567"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="mt-6 flex justify-end">
                    <button
                      type="button"
                      onClick={nextStep}
                      className="btn-primary"
                    >
                      Continue to Shipping
                    </button>
                  </div>
                </div>
              )}

              {/* Step 2: Shipping & Billing - Same as before */}
              {step === 2 && (
                <div className="bg-white rounded-lg p-6 shadow-sm">
                  <h2 className="text-xl font-semibold mb-6">Shipping Address</h2>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Street Address
                      </label>
                      <input
                        type="text"
                        name="shippingStreet"
                        value={formData.shippingStreet}
                        onChange={handleChange}
                        required
                        className="input"
                        placeholder="123 Main Street"
                      />
                    </div>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          City
                        </label>
                        <input
                          type="text"
                          name="shippingCity"
                          value={formData.shippingCity}
                          onChange={handleChange}
                          required
                          className="input"
                          placeholder="New York"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          State
                        </label>
                        <input
                          type="text"
                          name="shippingState"
                          value={formData.shippingState}
                          onChange={handleChange}
                          required
                          className="input"
                          placeholder="NY"
                        />
                      </div>
                    </div>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          ZIP Code
                        </label>
                        <input
                          type="text"
                          name="shippingZip"
                          value={formData.shippingZip}
                          onChange={handleChange}
                          required
                          className="input"
                          placeholder="10001"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Country
                        </label>
                        <select
                          name="shippingCountry"
                          value={formData.shippingCountry}
                          onChange={handleChange}
                          className="input"
                        >
                          <option>United States</option>
                          <option>Canada</option>
                          <option>Mexico</option>
                        </select>
                      </div>
                    </div>
                    
                    <div className="pt-4">
                      <label className="flex items-center">
                        <input
                          type="checkbox"
                          name="sameAsShipping"
                          checked={formData.sameAsShipping}
                          onChange={handleChange}
                          className="h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-300 rounded"
                        />
                        <span className="ml-2 text-sm text-gray-700">
                          Billing address same as shipping
                        </span>
                      </label>
                    </div>
                  </div>
                  
                  <div className="mt-6 flex justify-between">
                    <button
                      type="button"
                      onClick={prevStep}
                      className="btn-secondary"
                    >
                      Back
                    </button>
                    <button
                      type="button"
                      onClick={nextStep}
                      className="btn-primary"
                    >
                      Continue to Payment
                    </button>
                  </div>
                </div>
              )}

              {/* Step 3: Payment - Same as before */}
              {step === 3 && (
                <div className="bg-white rounded-lg p-6 shadow-sm">
                  <h2 className="text-xl font-semibold mb-6">Payment Information</h2>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Card Number
                      </label>
                      <input
                        type="text"
                        name="cardNumber"
                        value={formData.cardNumber}
                        onChange={handleChange}
                        required
                        className="input"
                        placeholder="1234 5678 9012 3456"
                        maxLength="19"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Cardholder Name
                      </label>
                      <input
                        type="text"
                        name="cardName"
                        value={formData.cardName}
                        onChange={handleChange}
                        required
                        className="input"
                        placeholder="John Doe"
                      />
                    </div>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Expiry Date
                        </label>
                        <input
                          type="text"
                          name="cardExpiry"
                          value={formData.cardExpiry}
                          onChange={handleChange}
                          required
                          className="input"
                          placeholder="MM/YY"
                          maxLength="5"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          CVV
                        </label>
                        <input
                          type="text"
                          name="cardCvv"
                          value={formData.cardCvv}
                          onChange={handleChange}
                          required
                          className="input"
                          placeholder="123"
                          maxLength="4"
                        />
                      </div>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Order Notes (Optional)
                      </label>
                      <textarea
                        name="notes"
                        value={formData.notes}
                        onChange={handleChange}
                        rows="3"
                        className="input"
                        placeholder="Special instructions for your order..."
                      />
                    </div>
                  </div>
                  
                  <div className="mt-6 flex items-center justify-center space-x-6 py-4 border-t border-gray-200">
                    <div className="flex items-center text-sm text-gray-600">
                      <Shield className="w-4 h-4 mr-1 text-green-600" />
                      SSL Secured
                    </div>
                    <div className="flex items-center text-sm text-gray-600">
                      <CreditCard className="w-4 h-4 mr-1 text-blue-600" />
                      PCI Compliant
                    </div>
                  </div>
                  
                  <div className="mt-6 flex justify-between">
                    <button
                      type="button"
                      onClick={prevStep}
                      className="btn-secondary"
                    >
                      Back
                    </button>
                    <button
                      type="submit"
                      disabled={loading}
                      className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {loading ? 'Processing...' : \`Place Order ($\${total.toFixed(2)})\`}
                    </button>
                  </div>
                </div>
              )}
            </form>
          </div>

          {/* Order Summary Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg p-6 shadow-sm sticky top-4">
              <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
              
              <div className="space-y-3 mb-6">
                {items.map((item) => (
                  <div key={item.id} className="flex justify-between text-sm">
                    <div className="flex-1">
                      <p className="font-medium text-gray-900">{item.product.name}</p>
                      <p className="text-gray-600">Qty: {item.quantity}</p>
                    </div>
                    <div className="text-gray-900">
                      $\{((item.product.sale_price || item.product.price) * item.quantity).toFixed(2)}
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="space-y-2 py-4 border-t border-gray-200">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="text-gray-900">$\{subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Shipping</span>
                  <span className="text-gray-900">
                    {shipping === 0 ? 'FREE' : \`$\${shipping.toFixed(2)}\`}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Tax</span>
                  <span className="text-gray-900">$\{tax.toFixed(2)}</span>
                </div>
              </div>
              
              <div className="py-4 border-t border-gray-200">
                <div className="flex justify-between text-lg font-semibold">
                  <span>Total</span>
                  <span>$\{total.toFixed(2)}</span>
                </div>
              </div>

              <div className="mt-6 p-4 bg-green-50 rounded-lg">
                <div className="flex items-center text-green-800">
                  <Truck className="w-5 h-5 mr-2" />
                  <p className="text-sm font-medium">Free shipping on orders over $50!</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}`);

// Add Search Page
createFile('app/search/page.js', `'use client'

import { useState, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import { supabase } from '@/lib/supabase'
import ProductGrid from '@/components/products/ProductGrid'
import { Search } from 'lucide-react'

export default function SearchPage() {
  const searchParams = useSearchParams()
  const query = searchParams.get('q') || ''
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (query) {
      searchProducts()
    }
  }, [query])

  const searchProducts = async () => {
    setLoading(true)
    try {
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .or(\`name.ilike.%\${query}%,description.ilike.%\${query}%,brand.ilike.%\${query}%,category.ilike.%\${query}%\`)
        .eq('is_active', true)

      if (error) throw error
      setProducts(data || [])
    } catch (error) {
      console.error('Search error:', error)
      setProducts([])
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          Search Results
        </h1>
        {query && (
          <p className="text-gray-600">
            {loading ? 'Searching for' : \`\${products.length} results for\`} "{query}"
          </p>
        )}
      </div>

      {loading ? (
        <div className="text-center py-12">
          <div className="inline-flex items-center">
            <Search className="w-6 h-6 mr-2 animate-pulse" />
            <span>Searching...</span>
          </div>
        </div>
      ) : products.length > 0 ? (
        <ProductGrid products={products} />
      ) : query ? (
        <div className="text-center py-12">
          <Search className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <p className="text-gray-600 mb-4">No products found for "{query}"</p>
          <p className="text-sm text-gray-500">Try searching with different keywords</p>
        </div>
      ) : (
        <div className="text-center py-12">
          <Search className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <p className="text-gray-600">Enter a search term to find products</p>
        </div>
      )}
    </div>
  )
}`);

// Add Search Modal Component
createFile('components/search/SearchModal.js', `'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Search, X } from 'lucide-react'

export default function SearchModal({ isOpen, onClose }) {
  const [searchQuery, setSearchQuery] = useState('')
  const router = useRouter()

  const handleSearch = (e) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      router.push(\`/search?q=\${encodeURIComponent(searchQuery.trim())}\`)
      onClose()
      setSearchQuery('')
    }
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4">
      <div className="fixed inset-0 bg-black bg-opacity-50" onClick={onClose} />
      
      <div className="relative bg-white rounded-lg shadow-xl w-full max-w-2xl">
        <form onSubmit={handleSearch} className="p-4">
          <div className="flex items-center">
            <Search className="w-5 h-5 text-gray-400 mr-3" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search for products..."
              className="flex-1 outline-none text-lg"
              autoFocus
            />
            <button
              type="button"
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-lg"
            >
              <X className="w-5 h-5 text-gray-500" />
            </button>
          </div>
        </form>
        
        {searchQuery && (
          <div className="px-4 pb-4">
            <p className="text-sm text-gray-500">
              Press Enter to search for "{searchQuery}"
            </p>
          </div>
        )}
      </div>
    </div>
  )
}`);

// Updated Header with Search Modal
createFile('components/layout/Header.js', `'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useCart } from '@/hooks/useCart'
import { useAuth } from '@/hooks/useAuth'
import { ShoppingCart, Menu, X, User, Search, Heart } from 'lucide-react'
import SearchModal from '@/components/search/SearchModal'

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [showUserMenu, setShowUserMenu] = useState(false)
  const [showSearch, setShowSearch] = useState(false)
  const { itemCount } = useCart()
  const { user, isAdmin, logout } = useAuth()
  
  // Check if WishlistContext exists
  let wishlistCount = 0
  try {
    const { useWishlist } = require('@/contexts/WishlistContext')
    const wishlistHook = useWishlist()
    wishlistCount = wishlistHook?.itemCount || 0
  } catch (error) {
    // Wishlist context not available
  }

  const handleLogout = async () => {
    await logout()
    setShowUserMenu(false)
  }

  return (
    <>
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-gray-100">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <Link href="/" className="flex items-center space-x-2">
              <span className="text-2xl font-bold bg-gradient-to-r from-pink-500 to-purple-600 text-transparent bg-clip-text">
                BabyBloom
              </span>
            </Link>

            <nav className="hidden md:flex items-center space-x-8">
              <Link href="/products" className="text-gray-700 hover:text-purple-600 transition-colors">
                All Products
              </Link>
              <Link href="/products?category=clothing" className="text-gray-700 hover:text-purple-600 transition-colors">
                Clothing
              </Link>
              <Link href="/products?category=toys" className="text-gray-700 hover:text-purple-600 transition-colors">
                Toys
              </Link>
              <Link href="/products?category=nursery" className="text-gray-700 hover:text-purple-600 transition-colors">
                Nursery
              </Link>
              <Link href="/products?category=feeding" className="text-gray-700 hover:text-purple-600 transition-colors">
                Feeding
              </Link>
              <Link href="/products?sale=true" className="text-red-500 font-semibold hover:text-red-600 transition-colors">
                Sale
              </Link>
            </nav>

            <div className="flex items-center space-x-4">
              {/* Search */}
              <button 
                onClick={() => setShowSearch(true)}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <Search className="w-5 h-5 text-gray-700" />
              </button>

              {/* Wishlist */}
              <Link href="/wishlist" className="p-2 hover:bg-gray-100 rounded-lg transition-colors relative">
                <Heart className="w-5 h-5 text-gray-700" />
                {wishlistCount > 0 && (
                  <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                    {wishlistCount}
                  </span>
                )}
              </Link>

              {/* User Account */}
              <div className="relative">
                <button 
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                  onClick={() => setShowUserMenu(!showUserMenu)}
                >
                  <User className="w-5 h-5 text-gray-700" />
                </button>
                
                {showUserMenu && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-2 z-50">
                    {user ? (
                      <>
                        <Link href="/account" className="block px-4 py-2 text-sm text-gray-700 hover:bg-purple-50">
                          My Account
                        </Link>
                        <Link href="/orders" className="block px-4 py-2 text-sm text-gray-700 hover:bg-purple-50">
                          My Orders
                        </Link>
                        <Link href="/wishlist" className="block px-4 py-2 text-sm text-gray-700 hover:bg-purple-50">
                          My Wishlist
                        </Link>
                        {isAdmin && (
                          <>
                            <hr className="my-2" />
                            <Link href="/admin" className="block px-4 py-2 text-sm text-purple-600 font-medium hover:bg-purple-50">
                              Admin Dashboard
                            </Link>
                          </>
                        )}
                        <hr className="my-2" />
                        <button 
                          onClick={handleLogout}
                          className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-purple-50"
                        >
                          Logout
                        </button>
                      </>
                    ) : (
                      <>
                        <Link href="/login" className="block px-4 py-2 text-sm text-gray-700 hover:bg-purple-50">
                          Login
                        </Link>
                        <Link href="/register" className="block px-4 py-2 text-sm text-gray-700 hover:bg-purple-50">
                          Create Account
                        </Link>
                      </>
                    )}
                  </div>
                )}
              </div>

              {/* Cart */}
              <Link href="/cart" className="p-2 hover:bg-gray-100 rounded-lg transition-colors relative">
                <ShoppingCart className="w-5 h-5 text-gray-700" />
                {itemCount > 0 && (
                  <span className="absolute -top-1 -right-1 w-5 h-5 bg-purple-600 text-white text-xs rounded-full flex items-center justify-center">
                    {itemCount}
                  </span>
                )}
              </Link>

              {/* Mobile Menu Toggle */}
              <button
                className="md:hidden p-2 hover:bg-gray-100 rounded-lg transition-colors"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>

          {/* Mobile Menu */}
          {isMenuOpen && (
            <nav className="md:hidden py-4 border-t border-gray-100">
              <Link href="/products" className="block py-2 text-gray-700 hover:text-purple-600">
                All Products
              </Link>
              <Link href="/products?category=clothing" className="block py-2 text-gray-700 hover:text-purple-600">
                Clothing
              </Link>
              <Link href="/products?category=toys" className="block py-2 text-gray-700 hover:text-purple-600">
                Toys
              </Link>
              <Link href="/products?category=nursery" className="block py-2 text-gray-700 hover:text-purple-600">
                Nursery
              </Link>
              <Link href="/products?category=feeding" className="block py-2 text-gray-700 hover:text-purple-600">
                Feeding
              </Link>
              <Link href="/products?sale=true" className="block py-2 text-red-500 font-semibold">
                Sale
              </Link>
              <hr className="my-2" />
              {user ? (
                <>
                  <Link href="/account" className="block py-2 text-gray-700 hover:text-purple-600">
                    My Account
                  </Link>
                  <Link href="/orders" className="block py-2 text-gray-700 hover:text-purple-600">
                    My Orders
                  </Link>
                  <Link href="/wishlist" className="block py-2 text-gray-700 hover:text-purple-600">
                    My Wishlist
                  </Link>
                  {isAdmin && (
                    <Link href="/admin" className="block py-2 text-purple-600 font-medium">
                      Admin Dashboard
                    </Link>
                  )}
                  <button 
                    onClick={handleLogout}
                    className="block w-full text-left py-2 text-gray-700 hover:text-purple-600"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <Link href="/login" className="block py-2 text-gray-700 hover:text-purple-600">
                    Login
                  </Link>
                  <Link href="/register" className="block py-2 text-gray-700 hover:text-purple-600">
                    Create Account
                  </Link>
                </>
              )}
            </nav>
          )}
        </div>
      </header>

      {/* Search Modal */}
      <SearchModal isOpen={showSearch} onClose={() => setShowSearch(false)} />
    </>
  )
}`);

console.log('\n✅ Fixed email validation in checkout');
console.log('✅ Added search functionality with modal');
console.log('✅ Created search results page');
console.log('\n🎉 All issues have been fixed!');
console.log('\nYou can now:');
console.log('1. Use any valid email (including sumaniwaram@gmail.com) in checkout');
console.log('2. Click the search icon to open search modal');
console.log('3. Search for products by name, brand, category, or description');