// add-missing-pages.js
// Run this script to add all missing pages and fix category navigation
// node add-missing-pages.js

const fs = require('fs');
const path = require('path');

// Create directory if it doesn't exist
function createDir(dirPath) {
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
    console.log(`✅ Created directory: ${dirPath}`);
  }
}

// Write file with content
function createFile(filePath, content) {
  fs.writeFileSync(filePath, content);
  console.log(`✅ Created file: ${filePath}`);
}

console.log('🚀 Adding Missing Pages & Fixing Navigation...\n');

// Create directories
const directories = [
  'app/wishlist',
  'app/contact',
  'app/shipping',
  'app/returns',
  'app/faq',
  'app/api/wishlist',
  'app/api/contact',
  'contexts'
];

directories.forEach(createDir);

// All the missing pages and fixes
const files = {
  // Wishlist Context
  'contexts/WishlistContext.js': `'use client'

import { createContext, useContext, useState, useEffect } from 'react'
import toast from 'react-hot-toast'

const WishlistContext = createContext()

export function WishlistProvider({ children }) {
  const [wishlist, setWishlist] = useState([])

  // Load wishlist from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem('wishlist')
    if (saved) {
      setWishlist(JSON.parse(saved))
    }
  }, [])

  // Save wishlist to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('wishlist', JSON.stringify(wishlist))
  }, [wishlist])

  const addToWishlist = (product) => {
    setWishlist(current => {
      const exists = current.find(item => item.id === product.id)
      if (exists) {
        toast.error('Already in wishlist!')
        return current
      }
      toast.success('Added to wishlist!')
      return [...current, product]
    })
  }

  const removeFromWishlist = (productId) => {
    setWishlist(current => current.filter(item => item.id !== productId))
    toast.success('Removed from wishlist')
  }

  const isInWishlist = (productId) => {
    return wishlist.some(item => item.id === productId)
  }

  const clearWishlist = () => {
    setWishlist([])
  }

  return (
    <WishlistContext.Provider value={{
      wishlist,
      addToWishlist,
      removeFromWishlist,
      isInWishlist,
      clearWishlist,
      itemCount: wishlist.length
    }}>
      {children}
    </WishlistContext.Provider>
  )
}

export const useWishlist = () => {
  const context = useContext(WishlistContext)
  if (context === undefined) {
    throw new Error('useWishlist must be used within a WishlistProvider')
  }
  return context
}`,

  // Update layout.js to include WishlistProvider
  'app/layout.js': `import { Inter } from 'next/font/google'
import './globals.css'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import { CartProvider } from '@/contexts/CartContext'
import { AuthProvider } from '@/contexts/AuthContext'
import { WishlistProvider } from '@/contexts/WishlistContext'
import { Toaster } from 'react-hot-toast'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'BabyBloom - Premium Baby Products for Your Little One',
  description: 'Shop the finest collection of baby products including clothing, toys, nursery essentials, and more.',
  keywords: 'baby products, baby clothes, baby toys, nursery, strollers, car seats, baby care',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthProvider>
          <WishlistProvider>
            <CartProvider>
              <div className="min-h-screen flex flex-col">
                <Header />
                <main className="flex-1">
                  {children}
                </main>
                <Footer />
              </div>
              <Toaster
                position="bottom-right"
                toastOptions={{
                  duration: 4000,
                  style: {
                    background: '#363636',
                    color: '#fff',
                  },
                }}
              />
            </CartProvider>
          </WishlistProvider>
        </AuthProvider>
      </body>
    </html>
  )
}`,

  // Wishlist Page
  'app/wishlist/page.js': `'use client'

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
    toast.success(\`\${product.name} added to cart!\`)
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
              <Link href={\`/products/\${product.id}\`}>
                <h3 className="font-semibold text-gray-900 mb-1 hover:text-purple-600">
                  {product.name}
                </h3>
              </Link>
              <p className="text-sm text-gray-500 mb-3">{product.brand}</p>
              
              <div className="flex items-center justify-between">
                <span className="text-lg font-bold text-gray-900">
                  $\{(product.sale_price || product.price).toFixed(2)}
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
}`,

  // Contact Page
  'app/contact/page.js': `'use client'

import { useState } from 'react'
import { Phone, Mail, MapPin, Clock, Send } from 'lucide-react'
import toast from 'react-hot-toast'

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  })
  const [loading, setLoading] = useState(false)

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      if (response.ok) {
        toast.success('Message sent successfully! We\\'ll get back to you soon.')
        setFormData({
          name: '',
          email: '',
          subject: '',
          message: ''
        })
      } else {
        throw new Error('Failed to send message')
      }
    } catch (error) {
      toast.error('Failed to send message. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-8 text-center">Contact Us</h1>
      
      <div className="max-w-6xl mx-auto">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Contact Information */}
          <div className="lg:col-span-1">
            <div className="bg-purple-50 rounded-lg p-6">
              <h2 className="text-xl font-semibold mb-6">Get in Touch</h2>
              
              <div className="space-y-4">
                <div className="flex items-start">
                  <Phone className="w-5 h-5 text-purple-600 mt-1 mr-3" />
                  <div>
                    <p className="font-medium">Phone</p>
                    <p className="text-gray-600">+1 (555) 123-4567</p>
                    <p className="text-gray-600">Mon-Fri 9AM-6PM EST</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <Mail className="w-5 h-5 text-purple-600 mt-1 mr-3" />
                  <div>
                    <p className="font-medium">Email</p>
                    <p className="text-gray-600">support@babybloom.com</p>
                    <p className="text-gray-600">sales@babybloom.com</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <MapPin className="w-5 h-5 text-purple-600 mt-1 mr-3" />
                  <div>
                    <p className="font-medium">Address</p>
                    <p className="text-gray-600">
                      123 Baby Street<br />
                      New York, NY 10001<br />
                      United States
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <Clock className="w-5 h-5 text-purple-600 mt-1 mr-3" />
                  <div>
                    <p className="font-medium">Business Hours</p>
                    <p className="text-gray-600">Monday - Friday: 9AM - 6PM</p>
                    <p className="text-gray-600">Saturday: 10AM - 4PM</p>
                    <p className="text-gray-600">Sunday: Closed</p>
                  </div>
                </div>
              </div>

              <div className="mt-8">
                <h3 className="font-semibold mb-3">Follow Us</h3>
                <div className="flex space-x-4">
                  <a href="#" className="text-purple-600 hover:text-purple-700">Facebook</a>
                  <a href="#" className="text-purple-600 hover:text-purple-700">Instagram</a>
                  <a href="#" className="text-purple-600 hover:text-purple-700">Twitter</a>
                </div>
              </div>
            </div>
          </div>
          
          {/* Contact Form */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-xl font-semibold mb-6">Send us a Message</h2>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Your Name *
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
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Subject *
                  </label>
                  <input
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    className="input"
                    placeholder="How can we help you?"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Message *
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows="6"
                    className="input"
                    placeholder="Tell us more about your inquiry..."
                  />
                </div>
                
                <button
                  type="submit"
                  disabled={loading}
                  className="btn-primary flex items-center justify-center disabled:opacity-50"
                >
                  {loading ? (
                    'Sending...'
                  ) : (
                    <>
                      <Send className="w-4 h-4 mr-2" />
                      Send Message
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}`,

  // Shipping Info Page
  'app/shipping/page.js': `import { Truck, Clock, Globe, Shield } from 'lucide-react'

export default function ShippingPage() {
  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Shipping Information</h1>
      
      <div className="grid md:grid-cols-2 gap-6 mb-12">
        <div className="bg-purple-50 rounded-lg p-6">
          <Truck className="w-8 h-8 text-purple-600 mb-3" />
          <h3 className="text-lg font-semibold mb-2">Free Shipping</h3>
          <p className="text-gray-600">On all orders over $50 within the United States</p>
        </div>
        
        <div className="bg-blue-50 rounded-lg p-6">
          <Clock className="w-8 h-8 text-blue-600 mb-3" />
          <h3 className="text-lg font-semibold mb-2">Fast Delivery</h3>
          <p className="text-gray-600">2-5 business days for standard shipping</p>
        </div>
        
        <div className="bg-green-50 rounded-lg p-6">
          <Globe className="w-8 h-8 text-green-600 mb-3" />
          <h3 className="text-lg font-semibold mb-2">International Shipping</h3>
          <p className="text-gray-600">We ship to over 50 countries worldwide</p>
        </div>
        
        <div className="bg-pink-50 rounded-lg p-6">
          <Shield className="w-8 h-8 text-pink-600 mb-3" />
          <h3 className="text-lg font-semibold mb-2">Secure Packaging</h3>
          <p className="text-gray-600">All items are carefully packaged for safe delivery</p>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
        <h2 className="text-2xl font-semibold mb-6">Shipping Rates & Delivery Times</h2>
        
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b">
                <th className="text-left py-3">Shipping Method</th>
                <th className="text-left py-3">Delivery Time</th>
                <th className="text-left py-3">Cost</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              <tr>
                <td className="py-3 font-medium">Standard Shipping</td>
                <td className="py-3">3-5 business days</td>
                <td className="py-3">$9.99 (Free over $50)</td>
              </tr>
              <tr>
                <td className="py-3 font-medium">Express Shipping</td>
                <td className="py-3">2-3 business days</td>
                <td className="py-3">$19.99</td>
              </tr>
              <tr>
                <td className="py-3 font-medium">Next Day Delivery</td>
                <td className="py-3">1 business day</td>
                <td className="py-3">$39.99</td>
              </tr>
              <tr>
                <td className="py-3 font-medium">International Standard</td>
                <td className="py-3">7-14 business days</td>
                <td className="py-3">$29.99+</td>
              </tr>
              <tr>
                <td className="py-3 font-medium">International Express</td>
                <td className="py-3">3-7 business days</td>
                <td className="py-3">$59.99+</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div className="prose prose-gray max-w-none">
        <h2 className="text-2xl font-semibold mb-4">Shipping Policies</h2>
        
        <h3 className="text-xl font-semibold mt-6 mb-3">Order Processing</h3>
        <ul className="list-disc pl-6 space-y-2 text-gray-600">
          <li>Orders placed before 2 PM EST on business days are processed the same day</li>
          <li>Orders placed after 2 PM EST or on weekends are processed the next business day</li>
          <li>You will receive a confirmation email with tracking information once your order ships</li>
          <li>During peak seasons, processing may take an additional 1-2 business days</li>
        </ul>
        
        <h3 className="text-xl font-semibold mt-6 mb-3">Shipping Restrictions</h3>
        <ul className="list-disc pl-6 space-y-2 text-gray-600">
          <li>We currently ship to all 50 US states and select international countries</li>
          <li>Some products may have shipping restrictions due to size or regulations</li>
          <li>P.O. Box delivery is available for standard shipping only</li>
          <li>Signature may be required for high-value orders</li>
        </ul>
        
        <h3 className="text-xl font-semibold mt-6 mb-3">International Shipping</h3>
        <ul className="list-disc pl-6 space-y-2 text-gray-600">
          <li>International customers are responsible for any customs duties and taxes</li>
          <li>Delivery times may vary based on customs processing</li>
          <li>Some products may not be available for international shipping</li>
          <li>Contact us for shipping quotes to countries not listed</li>
        </ul>
        
        <h3 className="text-xl font-semibold mt-6 mb-3">Tracking Your Order</h3>
        <p className="text-gray-600 mb-4">
          Once your order ships, you'll receive an email with your tracking number. 
          You can also track your order by logging into your account and viewing your order history.
        </p>
        
        <h3 className="text-xl font-semibold mt-6 mb-3">Contact Us</h3>
        <p className="text-gray-600">
          If you have any questions about shipping, please contact our customer service team at 
          <a href="mailto:shipping@babybloom.com" className="text-purple-600"> shipping@babybloom.com</a> or 
          call us at <span className="text-purple-600">1-800-BABY-BLOOM</span>.
        </p>
      </div>
    </div>
  )
}`,

  // Returns Page
  'app/returns/page.js': `import { Package, Clock, CreditCard, Shield } from 'lucide-react'

export default function ReturnsPage() {
  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Returns & Exchanges</h1>
      
      <div className="bg-green-50 border-l-4 border-green-500 p-6 mb-8">
        <h2 className="text-xl font-semibold text-green-900 mb-2">30-Day Satisfaction Guarantee</h2>
        <p className="text-green-800">
          We want you to love your BabyBloom products! If you're not completely satisfied, 
          you can return most items within 30 days for a full refund or exchange.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-6 mb-12">
        <div className="bg-white rounded-lg shadow-sm p-6">
          <Package className="w-8 h-8 text-purple-600 mb-3" />
          <h3 className="text-lg font-semibold mb-2">Easy Returns</h3>
          <p className="text-gray-600">Free return shipping on all orders with prepaid label</p>
        </div>
        
        <div className="bg-white rounded-lg shadow-sm p-6">
          <Clock className="w-8 h-8 text-blue-600 mb-3" />
          <h3 className="text-lg font-semibold mb-2">Quick Processing</h3>
          <p className="text-gray-600">Refunds processed within 5-7 business days</p>
        </div>
        
        <div className="bg-white rounded-lg shadow-sm p-6">
          <CreditCard className="w-8 h-8 text-green-600 mb-3" />
          <h3 className="text-lg font-semibold mb-2">Flexible Refunds</h3>
          <p className="text-gray-600">Original payment method or store credit available</p>
        </div>
        
        <div className="bg-white rounded-lg shadow-sm p-6">
          <Shield className="w-8 h-8 text-pink-600 mb-3" />
          <h3 className="text-lg font-semibold mb-2">Quality Guarantee</h3>
          <p className="text-gray-600">Defective items replaced immediately at no cost</p>
        </div>
      </div>

      <div className="prose prose-gray max-w-none">
        <h2 className="text-2xl font-semibold mb-4">Return Policy Details</h2>
        
        <h3 className="text-xl font-semibold mt-6 mb-3">Eligible Items</h3>
        <ul className="list-disc pl-6 space-y-2 text-gray-600">
          <li>Unused items in original packaging with all tags attached</li>
          <li>Items purchased within the last 30 days</li>
          <li>Products with original receipt or proof of purchase</li>
          <li>Items not marked as final sale or clearance</li>
        </ul>
        
        <h3 className="text-xl font-semibold mt-6 mb-3">Non-Returnable Items</h3>
        <ul className="list-disc pl-6 space-y-2 text-gray-600">
          <li>Opened feeding bottles and pacifiers (for hygiene reasons)</li>
          <li>Personalized or custom-made items</li>
          <li>Intimate items such as breast pumps (unless defective)</li>
          <li>Items marked as "Final Sale"</li>
          <li>Gift cards</li>
        </ul>
        
        <h3 className="text-xl font-semibold mt-6 mb-3">How to Return an Item</h3>
        <ol className="list-decimal pl-6 space-y-3 text-gray-600">
          <li>
            <strong>Initiate Return:</strong> Log into your account and go to "My Orders" 
            to start a return request, or contact customer service
          </li>
          <li>
            <strong>Print Label:</strong> Once approved, we'll email you a prepaid return 
            shipping label
          </li>
          <li>
            <strong>Pack Items:</strong> Securely pack the items in their original packaging 
            with all accessories and documentation
          </li>
          <li>
            <strong>Ship Return:</strong> Drop off the package at any authorized shipping 
            location
          </li>
          <li>
            <strong>Receive Refund:</strong> Once we receive and inspect the items, we'll 
            process your refund within 5-7 business days
          </li>
        </ol>
        
        <h3 className="text-xl font-semibold mt-6 mb-3">Exchanges</h3>
        <p className="text-gray-600 mb-4">
          Want a different size, color, or product? We're happy to exchange items that meet 
          our return criteria. Simply indicate you'd like an exchange when initiating your 
          return, and we'll ship the replacement item as soon as we receive your return.
        </p>
        
        <h3 className="text-xl font-semibold mt-6 mb-3">Damaged or Defective Items</h3>
        <p className="text-gray-600 mb-4">
          If you receive a damaged or defective item, please contact us immediately at 
          <a href="mailto:quality@babybloom.com" className="text-purple-600"> quality@babybloom.com</a> with 
          photos of the issue. We'll arrange for a replacement to be sent right away at no 
          additional cost to you.
        </p>
        
        <h3 className="text-xl font-semibold mt-6 mb-3">Refund Timeline</h3>
        <ul className="list-disc pl-6 space-y-2 text-gray-600">
          <li>Credit cards: 5-7 business days after we receive your return</li>
          <li>PayPal: 3-5 business days after we receive your return</li>
          <li>Store credit: Available immediately after return is processed</li>
          <li>Original shipping costs are non-refundable unless the return is due to our error</li>
        </ul>
        
        <h3 className="text-xl font-semibold mt-6 mb-3">Questions?</h3>
        <p className="text-gray-600">
          If you have any questions about returns or exchanges, our customer service team is 
          here to help! Contact us at <a href="mailto:returns@babybloom.com" className="text-purple-600">returns@babybloom.com</a> or 
          call <span className="text-purple-600">1-800-BABY-BLOOM</span>.
        </p>
      </div>
    </div>
  )
}`,

  // FAQ Page
  'app/faq/page.js': `'use client'

import { useState } from 'react'
import { ChevronDown, ChevronUp, Search } from 'lucide-react'

const faqCategories = [
  {
    category: 'Orders & Shipping',
    questions: [
      {
        q: 'How long does shipping take?',
        a: 'Standard shipping takes 3-5 business days within the US. Express shipping (2-3 days) and Next Day delivery are also available. International shipping typically takes 7-14 business days.'
      },
      {
        q: 'Do you offer free shipping?',
        a: 'Yes! We offer free standard shipping on all orders over $50 within the United States. No promo code needed - the discount is automatically applied at checkout.'
      },
      {
        q: 'Can I track my order?',
        a: 'Absolutely! Once your order ships, you\\'ll receive an email with tracking information. You can also track your order by logging into your account and viewing your order history.'
      },
      {
        q: 'Do you ship internationally?',
        a: 'Yes, we ship to over 50 countries worldwide. International shipping rates and delivery times vary by location. Note that international customers are responsible for any customs duties and taxes.'
      },
      {
        q: 'Can I change or cancel my order?',
        a: 'You can modify or cancel your order within 1 hour of placing it. After that, the order enters our fulfillment process and cannot be changed. Please contact customer service immediately if you need assistance.'
      }
    ]
  },
  {
    category: 'Returns & Exchanges',
    questions: [
      {
        q: 'What is your return policy?',
        a: 'We offer a 30-day satisfaction guarantee. Most items can be returned within 30 days of delivery for a full refund or exchange, as long as they\\'re unused and in original packaging with tags attached.'
      },
      {
        q: 'How do I return an item?',
        a: 'Log into your account, go to "My Orders," and select the item you want to return. We\\'ll email you a prepaid shipping label. Pack the item securely and drop it off at any authorized shipping location.'
      },
      {
        q: 'Are there items that cannot be returned?',
        a: 'For hygiene reasons, opened feeding bottles, pacifiers, and breast pumps cannot be returned unless defective. Personalized items, final sale items, and gift cards are also non-returnable.'
      },
      {
        q: 'How long do refunds take?',
        a: 'Once we receive your return, refunds are processed within 5-7 business days for credit cards, 3-5 days for PayPal, and immediately for store credit.'
      }
    ]
  },
  {
    category: 'Products & Safety',
    questions: [
      {
        q: 'Are your products safe for babies?',
        a: 'Absolutely! All our products meet or exceed safety standards set by the CPSC (Consumer Product Safety Commission). We only work with certified manufacturers and conduct regular quality checks.'
      },
      {
        q: 'Are your products organic?',
        a: 'Many of our clothing and textile products are made from certified organic materials. Look for the "Organic" label on product pages. We also offer a dedicated organic collection.'
      },
      {
        q: 'What age ranges do you cater to?',
        a: 'We offer products for newborns through toddlers (0-4 years). Each product page clearly indicates the recommended age range and sizing information.'
      },
      {
        q: 'How do I choose the right size?',
        a: 'Each product page includes a detailed size chart. We recommend measuring your baby and comparing to our charts. When in doubt, size up - babies grow quickly!'
      },
      {
        q: 'Do you test products for harmful chemicals?',
        a: 'Yes, all products are tested for harmful chemicals and meet strict safety standards. We ensure products are free from lead, phthalates, BPA, and other harmful substances.'
      }
    ]
  },
  {
    category: 'Account & Payment',
    questions: [
      {
        q: 'Do I need an account to place an order?',
        a: 'No, you can checkout as a guest. However, creating an account allows you to track orders, save addresses, view order history, and create wishlists.'
      },
      {
        q: 'What payment methods do you accept?',
        a: 'We accept all major credit cards (Visa, Mastercard, American Express, Discover), PayPal, Apple Pay, Google Pay, and BabyBloom gift cards.'
      },
      {
        q: 'Is my payment information secure?',
        a: 'Yes! We use industry-standard SSL encryption and are PCI compliant. Your payment information is encrypted and never stored on our servers.'
      },
      {
        q: 'Can I save multiple addresses?',
        a: 'Yes, account holders can save multiple shipping and billing addresses for faster checkout. You can manage your addresses in your account settings.'
      },
      {
        q: 'Do you offer payment plans?',
        a: 'Yes, we partner with Afterpay and Klarna to offer interest-free payment plans on orders over $100. You can split your purchase into 4 equal payments.'
      }
    ]
  },
  {
    category: 'Promotions & Rewards',
    questions: [
      {
        q: 'How do I use a promo code?',
        a: 'Enter your promo code in the "Discount Code" field at checkout and click "Apply." The discount will be reflected in your order total. Note that only one promo code can be used per order.'
      },
      {
        q: 'Do you have a rewards program?',
        a: 'Yes! Our BabyBloom Rewards program lets you earn points on every purchase. Points can be redeemed for discounts on future orders. Sign up for free in your account dashboard.'
      },
      {
        q: 'Do you offer a registry service?',
        a: 'Yes, we offer baby registry services with a 10% completion discount. Create your registry online and share it with friends and family. You\\'ll also get a welcome gift!'
      },
      {
        q: 'Are there discounts for first-time customers?',
        a: 'Yes! Sign up for our newsletter and receive 15% off your first order. The discount code will be emailed to you immediately after signing up.'
      }
    ]
  }
]

export default function FAQPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [openItems, setOpenItems] = useState({})

  const toggleItem = (categoryIndex, questionIndex) => {
    const key = \`\${categoryIndex}-\${questionIndex}\`
    setOpenItems(prev => ({
      ...prev,
      [key]: !prev[key]
    }))
  }

  const filteredCategories = faqCategories.map(category => ({
    ...category,
    questions: category.questions.filter(
      item => 
        item.q.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.a.toLowerCase().includes(searchTerm.toLowerCase())
    )
  })).filter(category => category.questions.length > 0)

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <h1 className="text-3xl font-bold text-gray-900 mb-8 text-center">
        Frequently Asked Questions
      </h1>
      
      <div className="relative mb-8">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
        <input
          type="text"
          placeholder="Search FAQs..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
        />
      </div>

      {filteredCategories.length === 0 ? (
        <div className="text-center py-8">
          <p className="text-gray-600">No FAQs found matching your search.</p>
        </div>
      ) : (
        <div className="space-y-8">
          {filteredCategories.map((category, categoryIndex) => (
            <div key={categoryIndex}>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                {category.category}
              </h2>
              <div className="space-y-3">
                {category.questions.map((item, questionIndex) => {
                  const isOpen = openItems[\`\${categoryIndex}-\${questionIndex}\`]
                  return (
                    <div
                      key={questionIndex}
                      className="bg-white rounded-lg shadow-sm border border-gray-200"
                    >
                      <button
                        onClick={() => toggleItem(categoryIndex, questionIndex)}
                        className="w-full px-6 py-4 text-left flex justify-between items-center hover:bg-gray-50"
                      >
                        <span className="font-medium text-gray-900">{item.q}</span>
                        {isOpen ? (
                          <ChevronUp className="w-5 h-5 text-gray-500 flex-shrink-0" />
                        ) : (
                          <ChevronDown className="w-5 h-5 text-gray-500 flex-shrink-0" />
                        )}
                      </button>
                      {isOpen && (
                        <div className="px-6 pb-4">
                          <p className="text-gray-600">{item.a}</p>
                        </div>
                      )}
                    </div>
                  )
                })}
              </div>
            </div>
          ))}
        </div>
      )}

      <div className="mt-12 bg-purple-50 rounded-lg p-6 text-center">
        <h3 className="text-lg font-semibold mb-2">Still have questions?</h3>
        <p className="text-gray-600 mb-4">
          Our customer service team is here to help!
        </p>
        <div className="flex justify-center gap-4">
          <a href="/contact" className="btn-primary">
            Contact Us
          </a>
          <a href="tel:1-800-BABY-BLOOM" className="btn-secondary">
            Call Us
          </a>
        </div>
      </div>
    </div>
  )
}`,

  // Fixed Products Page with Category Filter
  'app/products/page.js': `import { supabase } from '@/lib/supabase'
import ProductGrid from '@/components/products/ProductGrid'
import ProductFilters from '@/components/products/ProductFilters'

async function getProducts(searchParams) {
  let query = supabase
    .from('products')
    .select('*')
    .eq('is_active', true)

  // Apply category filter if provided
  if (searchParams?.category) {
    query = query.eq('category', searchParams.category)
  }

  // Apply sale filter if provided
  if (searchParams?.sale === 'true') {
    query = query.not('sale_price', 'is', null)
  }

  // Apply sorting
  if (searchParams?.sort) {
    switch (searchParams.sort) {
      case 'price-asc':
        query = query.order('price', { ascending: true })
        break
      case 'price-desc':
        query = query.order('price', { ascending: false })
        break
      case 'name':
        query = query.order('name', { ascending: true })
        break
      default:
        query = query.order('created_at', { ascending: false })
    }
  } else {
    query = query.order('created_at', { ascending: false })
  }

  const { data, error } = await query

  if (error) {
    console.error('Error fetching products:', error)
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

  if (error) {
    console.error('Error fetching categories:', error)
    return []
  }

  return data || []
}

export default async function ProductsPage({ searchParams }) {
  const [products, categories] = await Promise.all([
    getProducts(searchParams),
    getCategories()
  ])

  const currentCategory = searchParams?.category || 'all'

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          {currentCategory === 'all' 
            ? 'All Products' 
            : categories.find(c => c.slug === currentCategory)?.name || 'Products'}
        </h1>
        <p className="text-gray-600">
          {searchParams?.sale === 'true'
            ? 'Special offers and discounted items'
            : \`Showing \${products.length} products\${currentCategory !== 'all' ? ' in ' + currentCategory : ''}\`}
        </p>
      </div>
      
      <div className="grid lg:grid-cols-4 gap-8">
        <div className="lg:col-span-1">
          <ProductFilters categories={categories} currentCategory={currentCategory} />
        </div>
        
        <div className="lg:col-span-3">
          {products.length > 0 ? (
            <ProductGrid products={products} />
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-600 mb-4">No products found in this category.</p>
              <a href="/products" className="btn-primary">View All Products</a>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}`,

  // Product Filters Component
  'components/products/ProductFilters.js': `'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import { Filter } from 'lucide-react'

export default function ProductFilters({ categories, currentCategory }) {
  const router = useRouter()
  const searchParams = useSearchParams()

  const handleCategoryChange = (category) => {
    const params = new URLSearchParams(searchParams)
    if (category === 'all') {
      params.delete('category')
    } else {
      params.set('category', category)
    }
    router.push(\`/products?\${params.toString()}\`)
  }

  const handleSortChange = (sort) => {
    const params = new URLSearchParams(searchParams)
    if (sort) {
      params.set('sort', sort)
    } else {
      params.delete('sort')
    }
    router.push(\`/products?\${params.toString()}\`)
  }

  return (
    <div className="bg-white rounded-lg p-6 sticky top-20">
      <div className="flex items-center mb-6">
        <Filter className="w-5 h-5 mr-2" />
        <h2 className="text-lg font-semibold">Filters</h2>
      </div>

      <div className="mb-6">
        <h3 className="font-medium mb-3">Categories</h3>
        <div className="space-y-2">
          <label className="flex items-center cursor-pointer hover:text-purple-600">
            <input
              type="radio"
              name="category"
              checked={currentCategory === 'all'}
              onChange={() => handleCategoryChange('all')}
              className="mr-2 text-purple-600 focus:ring-purple-500"
            />
            <span>All Products</span>
          </label>
          {categories.map((category) => (
            <label key={category.id} className="flex items-center cursor-pointer hover:text-purple-600">
              <input
                type="radio"
                name="category"
                checked={currentCategory === category.slug}
                onChange={() => handleCategoryChange(category.slug)}
                className="mr-2 text-purple-600 focus:ring-purple-500"
              />
              <span>{category.name}</span>
            </label>
          ))}
        </div>
      </div>

      <div className="mb-6">
        <h3 className="font-medium mb-3">Sort By</h3>
        <select
          onChange={(e) => handleSortChange(e.target.value)}
          value={searchParams.get('sort') || ''}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
        >
          <option value="">Newest First</option>
          <option value="name">Name: A-Z</option>
          <option value="price-asc">Price: Low to High</option>
          <option value="price-desc">Price: High to Low</option>
        </select>
      </div>

      <div className="mb-6">
        <h3 className="font-medium mb-3">Special Offers</h3>
        <label className="flex items-center cursor-pointer">
          <input
            type="checkbox"
            checked={searchParams.get('sale') === 'true'}
            onChange={(e) => {
              const params = new URLSearchParams(searchParams)
              if (e.target.checked) {
                params.set('sale', 'true')
              } else {
                params.delete('sale')
              }
              router.push(\`/products?\${params.toString()}\`)
            }}
            className="mr-2 text-purple-600 focus:ring-purple-500 rounded"
          />
          <span>On Sale</span>
        </label>
      </div>

      <button
        onClick={() => router.push('/products')}
        className="w-full btn-secondary text-center"
      >
        Clear All Filters
      </button>
    </div>
  )
}`,

  // Updated Product Card with Wishlist
  'components/products/ProductCard.js': `'use client'

import Link from 'next/link'
import { useCart } from '@/hooks/useCart'
import { useWishlist } from '@/contexts/WishlistContext'
import { ShoppingCart, Heart } from 'lucide-react'
import toast from 'react-hot-toast'

export default function ProductCard({ product }) {
  const { addItem } = useCart()
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist()
  
  const handleAddToCart = (e) => {
    e.preventDefault()
    addItem(product)
    toast.success(\`\${product.name} added to cart!\`)
  }

  const handleWishlistToggle = (e) => {
    e.preventDefault()
    if (isInWishlist(product.id)) {
      removeFromWishlist(product.id)
    } else {
      addToWishlist(product)
    }
  }

  const discountPercentage = product.sale_price
    ? Math.round((1 - product.sale_price / product.price) * 100)
    : 0

  return (
    <Link href={\`/products/\${product.id}\`}>
      <div className="card group cursor-pointer h-full flex flex-col">
        <div className="relative aspect-square overflow-hidden bg-gray-50">
          {product.sale_price && (
            <div className="absolute top-2 left-2 z-10 bg-red-500 text-white px-2 py-1 rounded-md text-sm font-semibold">
              -{discountPercentage}%
            </div>
          )}
          <button
            className={\`absolute top-2 right-2 z-10 p-2 bg-white rounded-full shadow-md transition-colors \${
              isInWishlist(product.id) ? 'text-red-500' : 'text-gray-400 hover:text-red-500'
            }\`}
            onClick={handleWishlistToggle}
          >
            <Heart className={\`w-4 h-4 \${isInWishlist(product.id) ? 'fill-current' : ''}\`} />
          </button>
          <img
            src={product.images?.[0] || '/api/placeholder/400/400'}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
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
}`,

  // Updated Header with Wishlist Count
  'components/layout/Header.js': `'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useCart } from '@/hooks/useCart'
import { useAuth } from '@/hooks/useAuth'
import { useWishlist } from '@/contexts/WishlistContext'
import { ShoppingCart, Menu, X, User, Search, Heart } from 'lucide-react'

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [showUserMenu, setShowUserMenu] = useState(false)
  const { itemCount } = useCart()
  const { user, isAdmin, logout } = useAuth()
  const { itemCount: wishlistCount } = useWishlist()

  const handleLogout = async () => {
    await logout()
    setShowUserMenu(false)
  }

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-gray-100">
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
            <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
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
  )
}`,

  // Contact API Route
  'app/api/contact/route.js': `import { NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

export async function POST(request) {
  try {
    const body = await request.json()
    const { name, email, subject, message } = body

    // Here you would typically:
    // 1. Save to database
    // 2. Send email notification
    // 3. Send confirmation email to user

    // For now, we'll just log and return success
    console.log('Contact form submission:', { name, email, subject, message })

    // Optional: Save to a contact_messages table if you create one
    // const { data, error } = await supabase
    //   .from('contact_messages')
    //   .insert([{ name, email, subject, message }])

    return NextResponse.json({ success: true, message: 'Message sent successfully' })
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to send message' },
      { status: 500 }
    )
  }
}`,
};

// Create all files
Object.entries(files).forEach(([filePath, content]) => {
  createFile(filePath, content);
});

console.log('\n✨ All missing pages and features added successfully!');
console.log('\n📋 Features Added:');
console.log('✅ Wishlist functionality with localStorage');
console.log('✅ Contact page with form');
console.log('✅ Shipping information page');
console.log('✅ Returns & exchanges policy');
console.log('✅ Comprehensive FAQ page');
console.log('✅ Fixed category navigation');
console.log('✅ Product filters component');
console.log('✅ Sort and filter functionality');
console.log('✅ Updated header with wishlist count');
console.log('\n🎉 Your e-commerce site is now complete!');