// setup-project.js - JavaScript only version (No TypeScript)
// Run with: node setup-project.js

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

console.log('🚀 Setting up BabyBloom E-Commerce Project (JavaScript Edition)...\n');

// Create all directories first
const directories = [
  'app',
  'app/products',
  'app/products/[id]',
  'app/cart',
  'app/checkout',
  'app/admin',
  'app/admin/products',
  'app/admin/products/new',
  'app/admin/products/[id]/edit',
  'app/admin/orders',
  'app/api/products',
  'app/api/products/[id]',
  'app/api/orders',
  'app/api/auth',
  'app/api/auth/login',
  'app/api/auth/logout',
  'app/api/admin',
  'app/privacy',
  'app/terms',
  'app/shipping',
  'app/returns',
  'app/contact',
  'components/layout',
  'components/products',
  'components/cart',
  'components/ui',
  'components/admin',
  'lib',
  'hooks',
  'contexts',
  'public/images'
];

directories.forEach(createDir);

// File contents
const files = {
  // Environment variables template
  '.env.local': `# Supabase
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url_here
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key_here
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key_here

# Stripe (optional for payments)
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=your_stripe_publishable_key_here
STRIPE_SECRET_KEY=your_stripe_secret_key_here

# Admin
ADMIN_EMAIL=admin@babybloom.com
ADMIN_PASSWORD=your_secure_password_here`,

  // Package.json - JavaScript version
  'package.json': `{
  "name": "baby-ecommerce",
  "version": "1.0.0",
  "private": true,
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint"
  },
  "dependencies": {
    "@supabase/auth-helpers-nextjs": "^0.10.0",
    "@supabase/supabase-js": "^2.45.0",
    "@stripe/stripe-js": "^4.0.0",
    "framer-motion": "^11.0.0",
    "lucide-react": "^0.400.0",
    "next": "14.2.0",
    "react": "^18.3.0",
    "react-dom": "^18.3.0",
    "react-hook-form": "^7.52.0",
    "react-hot-toast": "^2.4.1",
    "stripe": "^16.0.0"
  },
  "devDependencies": {
    "autoprefixer": "^10.4.19",
    "eslint": "^8.57.0",
    "eslint-config-next": "14.2.0",
    "postcss": "^8.4.38",
    "tailwindcss": "^3.4.0"
  }
}`,

  // Next.js config
  'next.config.js': `/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: '*.supabase.co',
      },
    ],
  },
  experimental: {
    serverActions: {
      bodySizeLimit: '2mb',
    },
  },
}

module.exports = nextConfig`,

  // jsconfig.json for path aliases (replaces tsconfig.json)
  'jsconfig.json': `{
  "compilerOptions": {
    "paths": {
      "@/*": ["./*"]
    }
  }
}`,

  // Tailwind config
  'tailwind.config.js': `/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,jsx}',
    './components/**/*.{js,jsx}',
    './app/**/*.{js,jsx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#fef2f2',
          100: '#fee2e2',
          200: '#fecaca',
          300: '#fca5a5',
          400: '#f87171',
          500: '#ef4444',
          600: '#dc2626',
          700: '#b91c1c',
          800: '#991b1b',
          900: '#7f1d1d',
        },
        secondary: {
          50: '#f0f9ff',
          100: '#e0f2fe',
          200: '#bae6fd',
          300: '#7dd3fc',
          400: '#38bdf8',
          500: '#0ea5e9',
          600: '#0284c7',
          700: '#0369a1',
          800: '#075985',
          900: '#0c4a6e',
        },
      },
    },
  },
  plugins: [],
}`,

  // PostCSS config
  'postcss.config.js': `module.exports = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
}`,

  // Global CSS
  'app/globals.css': `@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  :root {
    --background: 0 0% 100%;
    --foreground: 222.2 84% 4.9%;
  }

  * {
    @apply border-border;
  }
  
  body {
    @apply bg-background text-foreground;
  }
}

@layer components {
  .btn-primary {
    @apply bg-gradient-to-r from-pink-500 to-purple-500 text-white px-6 py-3 rounded-lg font-medium hover:shadow-lg transform hover:scale-105 transition-all duration-200;
  }

  .btn-secondary {
    @apply bg-white border-2 border-gray-200 text-gray-700 px-6 py-3 rounded-lg font-medium hover:border-gray-300 hover:shadow-md transition-all duration-200;
  }

  .card {
    @apply bg-white rounded-xl shadow-sm hover:shadow-xl transition-shadow duration-300 overflow-hidden;
  }

  .input {
    @apply w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all duration-200;
  }
}

/* Custom scrollbar */
::-webkit-scrollbar {
  width: 10px;
}

::-webkit-scrollbar-track {
  @apply bg-gray-100;
}

::-webkit-scrollbar-thumb {
  @apply bg-gray-400 rounded-full;
}

::-webkit-scrollbar-thumb:hover {
  @apply bg-gray-500;
}`,

  // Supabase client (JavaScript version)
  'lib/supabase.js': `import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

export const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false
  }
})`,

  // Utils (JavaScript version)
  'lib/utils.js': `export function formatPrice(price) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(price)
}

export function generateOrderNumber() {
  const timestamp = Date.now().toString(36)
  const random = Math.random().toString(36).substring(2, 7)
  return \`ORD-\${timestamp}-\${random}\`.toUpperCase()
}

export function calculateCartTotal(items) {
  const subtotal = items.reduce((sum, item) => sum + (item.product.price * item.quantity), 0)
  const shipping = subtotal > 50 ? 0 : 9.99
  const tax = subtotal * 0.08
  const total = subtotal + shipping + tax

  return { subtotal, shipping, tax, total }
}

export function cn(...classes) {
  return classes.filter(Boolean).join(' ')
}`,

  // Cart Context (JavaScript version)
  'contexts/CartContext.js': `'use client'

import { createContext, useContext, useState, useEffect } from 'react'
import toast from 'react-hot-toast'

const CartContext = createContext()

export function CartProvider({ children }) {
  const [items, setItems] = useState([])

  // Load cart from localStorage on mount
  useEffect(() => {
    const savedCart = localStorage.getItem('cart')
    if (savedCart) {
      setItems(JSON.parse(savedCart))
    }
  }, [])

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(items))
  }, [items])

  const addItem = (product, quantity = 1) => {
    setItems(current => {
      const existingItem = current.find(item => item.product.id === product.id)
      
      if (existingItem) {
        return current.map(item =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        )
      }
      
      return [...current, { id: crypto.randomUUID(), product, quantity }]
    })
  }

  const removeItem = (productId) => {
    setItems(current => current.filter(item => item.product.id !== productId))
  }

  const updateQuantity = (productId, quantity) => {
    if (quantity <= 0) {
      removeItem(productId)
      return
    }
    
    setItems(current =>
      current.map(item =>
        item.product.id === productId
          ? { ...item, quantity }
          : item
      )
    )
  }

  const clearCart = () => {
    setItems([])
  }

  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0)
  
  const totalPrice = items.reduce(
    (sum, item) => sum + (item.product.sale_price || item.product.price) * item.quantity,
    0
  )

  return (
    <CartContext.Provider value={{
      items,
      addItem,
      removeItem,
      updateQuantity,
      clearCart,
      itemCount,
      totalPrice
    }}>
      {children}
    </CartContext.Provider>
  )
}

export const useCart = () => {
  const context = useContext(CartContext)
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider')
  }
  return context
}`,

  // Auth Context (JavaScript version)
  'contexts/AuthContext.js': `'use client'

import { createContext, useContext, useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'

const AuthContext = createContext()

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [isAdmin, setIsAdmin] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    checkUser()
  }, [])

  const checkUser = async () => {
    try {
      const { data: { session } } = await supabase.auth.getSession()
      
      if (session?.user) {
        setUser({
          id: session.user.id,
          email: session.user.email,
        })
        
        // Check if user is admin
        const { data: adminData } = await supabase
          .from('admins')
          .select('*')
          .eq('email', session.user.email)
          .single()
        
        setIsAdmin(!!adminData)
      }
    } catch (error) {
      console.error('Error checking user:', error)
    } finally {
      setLoading(false)
    }
  }

  const login = async (email, password) => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })
    
    if (error) throw error
    
    if (data.user) {
      setUser({
        id: data.user.id,
        email: data.user.email,
      })
      
      // Check if admin
      const { data: adminData } = await supabase
        .from('admins')
        .select('*')
        .eq('email', data.user.email)
        .single()
      
      setIsAdmin(!!adminData)
    }
  }

  const logout = async () => {
    await supabase.auth.signOut()
    setUser(null)
    setIsAdmin(false)
  }

  return (
    <AuthContext.Provider value={{
      user,
      isAdmin,
      login,
      logout,
      loading
    }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}`,

  // Custom hooks
  'hooks/useCart.js': `export { useCart } from '@/contexts/CartContext'`,
  
  'hooks/useAuth.js': `export { useAuth } from '@/contexts/AuthContext'`,

  'hooks/useProducts.js': `import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'

export function useProducts(category, featured) {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    fetchProducts()
  }, [category, featured])

  const fetchProducts = async () => {
    try {
      let query = supabase
        .from('products')
        .select('*')
        .eq('is_active', true)

      if (category) {
        query = query.eq('category', category)
      }

      if (featured) {
        query = query.eq('is_featured', true)
      }

      const { data, error } = await query

      if (error) throw error
      setProducts(data || [])
    } catch (err) {
      setError(err)
    } finally {
      setLoading(false)
    }
  }

  return { products, loading, error, refetch: fetchProducts }
}`,

  // Layout (JavaScript version)
  'app/layout.js': `import { Inter } from 'next/font/google'
import './globals.css'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import { CartProvider } from '@/contexts/CartContext'
import { AuthProvider } from '@/contexts/AuthContext'
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
        </AuthProvider>
      </body>
    </html>
  )
}`,

  // Home page (JavaScript version)
  'app/page.js': `import Link from 'next/link'
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
        <div className="container mx-auto px-4 py-20 lg:py-32">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="relative z-10">
              <h1 className="text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
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
            </div>
            <div className="relative">
              <img
                src="/api/placeholder/600/600"
                alt="Happy baby"
                className="relative z-10 rounded-2xl shadow-2xl"
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
            {categories.map((category) => (
              <Link
                key={category.id}
                href={\`/products?category=\${category.slug}\`}
                className="group"
              >
                <div className="card p-6 text-center hover:border-purple-200 border-2 border-transparent transition-all">
                  <div className="w-20 h-20 mx-auto mb-4 bg-gradient-to-br from-pink-100 to-purple-100 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                    <span className="text-3xl">👶</span>
                  </div>
                  <h3 className="font-semibold text-gray-900">{category.name}</h3>
                </div>
              </Link>
            ))}
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
    </div>
  )
}`,

  // Products page
  'app/products/page.js': `import { supabase } from '@/lib/supabase'
import ProductGrid from '@/components/products/ProductGrid'

async function getProducts() {
  const { data, error } = await supabase
    .from('products')
    .select('*')
    .eq('is_active', true)

  if (error) {
    console.error('Error fetching products:', error)
    return []
  }

  return data || []
}

export default async function ProductsPage() {
  const products = await getProducts()

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">All Products</h1>
      <ProductGrid products={products} />
    </div>
  )
}`,

  // Product detail page
  'app/products/[id]/page.js': `import { supabase } from '@/lib/supabase'
import { notFound } from 'next/navigation'
import ProductDetail from '@/components/products/ProductDetail'

async function getProduct(id) {
  const { data, error } = await supabase
    .from('products')
    .select('*')
    .eq('id', id)
    .single()

  if (error || !data) {
    notFound()
  }

  return data
}

export default async function ProductPage({ params }) {
  const product = await getProduct(params.id)

  return <ProductDetail product={product} />
}`,

  // Cart page
  'app/cart/page.js': `'use client'

import { useCart } from '@/hooks/useCart'
import CartItem from '@/components/cart/CartItem'
import CartSummary from '@/components/cart/CartSummary'
import Link from 'next/link'

export default function CartPage() {
  const { items, itemCount } = useCart()

  if (itemCount === 0) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Your Cart is Empty</h1>
        <p className="text-gray-600 mb-8">Looks like you haven't added anything yet!</p>
        <Link href="/products" className="btn-primary">
          Continue Shopping
        </Link>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Shopping Cart</h1>
      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          {items.map((item) => (
            <CartItem key={item.id} item={item} />
          ))}
        </div>
        <div>
          <CartSummary />
        </div>
      </div>
    </div>
  )
}`,

  // Admin dashboard
  'app/admin/page.js': `'use client'

import { useEffect, useState } from 'react'
import { useAuth } from '@/hooks/useAuth'
import { supabase } from '@/lib/supabase'
import { Package, ShoppingBag, Users, TrendingUp } from 'lucide-react'
import Link from 'next/link'

export default function AdminDashboard() {
  const { isAdmin } = useAuth()
  const [stats, setStats] = useState({
    totalProducts: 0,
    totalOrders: 0,
    totalRevenue: 0,
    pendingOrders: 0
  })

  useEffect(() => {
    if (isAdmin) {
      fetchDashboardStats()
    }
  }, [isAdmin])

  const fetchDashboardStats = async () => {
    // Fetch products count
    const { count: productCount } = await supabase
      .from('products')
      .select('*', { count: 'exact', head: true })

    // Fetch orders stats
    const { data: orders } = await supabase
      .from('orders')
      .select('total, status')

    const totalRevenue = orders?.reduce((sum, order) => sum + order.total, 0) || 0
    const pendingOrders = orders?.filter(order => order.status === 'pending').length || 0

    setStats({
      totalProducts: productCount || 0,
      totalOrders: orders?.length || 0,
      totalRevenue,
      pendingOrders
    })
  }

  if (!isAdmin) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Access Denied</h1>
          <p className="text-gray-600">You must be an admin to access this page.</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Admin Dashboard</h1>
        
        {/* Stats Grid */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <div className="card p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Products</p>
                <p className="text-2xl font-bold text-gray-900">{stats.totalProducts}</p>
              </div>
              <Package className="w-8 h-8 text-purple-600" />
            </div>
          </div>
          
          <div className="card p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Orders</p>
                <p className="text-2xl font-bold text-gray-900">{stats.totalOrders}</p>
              </div>
              <ShoppingBag className="w-8 h-8 text-blue-600" />
            </div>
          </div>
          
          <div className="card p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Revenue</p>
                <p className="text-2xl font-bold text-gray-900">
                  $\{stats.totalRevenue.toFixed(2)}
                </p>
              </div>
              <TrendingUp className="w-8 h-8 text-green-600" />
            </div>
          </div>
          
          <div className="card p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Pending Orders</p>
                <p className="text-2xl font-bold text-gray-900">{stats.pendingOrders}</p>
              </div>
              <Users className="w-8 h-8 text-orange-600" />
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid md:grid-cols-3 gap-6">
          <Link href="/admin/products" className="card p-6 hover:shadow-lg transition-shadow">
            <h2 className="text-xl font-semibold text-gray-900 mb-2">Manage Products</h2>
            <p className="text-gray-600">Add, edit, or remove products from your catalog</p>
          </Link>
          
          <Link href="/admin/orders" className="card p-6 hover:shadow-lg transition-shadow">
            <h2 className="text-xl font-semibold text-gray-900 mb-2">View Orders</h2>
            <p className="text-gray-600">Process and manage customer orders</p>
          </Link>
          
          <Link href="/admin/products/new" className="card p-6 hover:shadow-lg transition-shadow">
            <h2 className="text-xl font-semibold text-gray-900 mb-2">Add New Product</h2>
            <p className="text-gray-600">List a new product in your store</p>
          </Link>
        </div>
      </div>
    </div>
  )
}`,

  // API route: products
  'app/api/products/route.js': `import { NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

export async function GET(request) {
  const { searchParams } = new URL(request.url)
  const category = searchParams.get('category')
  const featured = searchParams.get('featured')

  try {
    let query = supabase
      .from('products')
      .select('*')
      .eq('is_active', true)

    if (category) {
      query = query.eq('category', category)
    }

    if (featured === 'true') {
      query = query.eq('is_featured', true)
    }

    const { data, error } = await query

    if (error) throw error

    return NextResponse.json(data)
  } catch (error) {
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    )
  }
}

export async function POST(request) {
  try {
    const body = await request.json()
    
    const { data, error } = await supabase
      .from('products')
      .insert([body])
      .select()
      .single()

    if (error) throw error

    return NextResponse.json(data)
  } catch (error) {
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    )
  }
}`,

  // API route: product by ID
  'app/api/products/[id]/route.js': `import { NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

export async function GET(request, { params }) {
  try {
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .eq('id', params.id)
      .single()

    if (error) throw error

    return NextResponse.json(data)
  } catch (error) {
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    )
  }
}

export async function PUT(request, { params }) {
  try {
    const body = await request.json()
    
    const { data, error } = await supabase
      .from('products')
      .update(body)
      .eq('id', params.id)
      .select()
      .single()

    if (error) throw error

    return NextResponse.json(data)
  } catch (error) {
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    )
  }
}

export async function DELETE(request, { params }) {
  try {
    const { error } = await supabase
      .from('products')
      .delete()
      .eq('id', params.id)

    if (error) throw error

    return NextResponse.json({ success: true })
  } catch (error) {
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    )
  }
}`,

  // Supabase SQL schema (same for both versions)
  'supabase-schema.sql': `-- BabyBloom E-Commerce Database Schema
-- Run this in Supabase SQL Editor

-- Create products table
CREATE TABLE products (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    slug VARCHAR(255) UNIQUE NOT NULL,
    description TEXT,
    price DECIMAL(10, 2) NOT NULL,
    sale_price DECIMAL(10, 2),
    sku VARCHAR(100) UNIQUE,
    category VARCHAR(100),
    subcategory VARCHAR(100),
    brand VARCHAR(100),
    images JSONB DEFAULT '[]',
    features JSONB DEFAULT '[]',
    specifications JSONB DEFAULT '{}',
    stock_quantity INTEGER DEFAULT 0,
    is_featured BOOLEAN DEFAULT false,
    is_active BOOLEAN DEFAULT true,
    weight DECIMAL(10, 2),
    dimensions JSONB,
    age_range VARCHAR(50),
    safety_standards TEXT[],
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create orders table
CREATE TABLE orders (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    order_number VARCHAR(50) UNIQUE NOT NULL,
    customer_email VARCHAR(255) NOT NULL,
    customer_name VARCHAR(255) NOT NULL,
    customer_phone VARCHAR(50),
    shipping_address JSONB NOT NULL,
    billing_address JSONB,
    items JSONB NOT NULL,
    subtotal DECIMAL(10, 2) NOT NULL,
    shipping_cost DECIMAL(10, 2) DEFAULT 0,
    tax DECIMAL(10, 2) DEFAULT 0,
    total DECIMAL(10, 2) NOT NULL,
    status VARCHAR(50) DEFAULT 'pending',
    payment_method VARCHAR(50),
    payment_status VARCHAR(50) DEFAULT 'pending',
    tracking_number VARCHAR(100),
    notes TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create categories table
CREATE TABLE categories (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name VARCHAR(100) NOT NULL UNIQUE,
    slug VARCHAR(100) NOT NULL UNIQUE,
    description TEXT,
    image_url TEXT,
    parent_id UUID REFERENCES categories(id),
    display_order INTEGER DEFAULT 0,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create admins table
CREATE TABLE admins (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    name VARCHAR(255),
    role VARCHAR(50) DEFAULT 'admin',
    is_active BOOLEAN DEFAULT true,
    last_login TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE admins ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Products are viewable by everyone" ON products
    FOR SELECT USING (is_active = true);

CREATE POLICY "Orders are viewable by customer" ON orders
    FOR SELECT USING (customer_email = auth.email());

-- Insert sample categories
INSERT INTO categories (name, slug, display_order) VALUES
    ('Clothing', 'clothing', 1),
    ('Toys', 'toys', 2),
    ('Nursery', 'nursery', 3),
    ('Feeding', 'feeding', 4),
    ('Bath & Care', 'bath-care', 5),
    ('Travel', 'travel', 6);

-- Insert sample products
INSERT INTO products (name, slug, description, price, category, brand, stock_quantity, is_featured, is_active, images) VALUES
    ('Organic Cotton Onesie Set', 'organic-cotton-onesie-set', 'Soft and comfortable organic cotton onesies perfect for newborns', 29.99, 'clothing', 'BabyBloom', 50, true, true, '["https://images.unsplash.com/photo-1522771930-78848d9293e8"]'),
    ('Wooden Rattle Toy', 'wooden-rattle-toy', 'Handcrafted wooden rattle toy, safe and eco-friendly', 15.99, 'toys', 'EcoBaby', 30, true, true, '["https://images.unsplash.com/photo-1596461404969-9ae70f2830c1"]'),
    ('Baby Crib Mobile', 'baby-crib-mobile', 'Musical crib mobile with soft hanging toys', 39.99, 'nursery', 'DreamyNights', 20, true, true, '["https://images.unsplash.com/photo-1519689680058-324335c77eba"]');`,
};

// Create all files
Object.entries(files).forEach(([filePath, content]) => {
  createFile(filePath, content);
});

// Component files (JavaScript versions)
const componentFiles = {
  // Header Component
  'components/layout/Header.js': `'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useCart } from '@/hooks/useCart'
import { useAuth } from '@/hooks/useAuth'
import { ShoppingCart, Menu, X, User, Search, Heart } from 'lucide-react'

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const { itemCount } = useCart()
  const { user, isAdmin } = useAuth()

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
          </nav>

          <div className="flex items-center space-x-4">
            <Link href="/cart" className="p-2 hover:bg-gray-100 rounded-lg transition-colors relative">
              <ShoppingCart className="w-5 h-5 text-gray-700" />
              {itemCount > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-purple-600 text-white text-xs rounded-full flex items-center justify-center">
                  {itemCount}
                </span>
              )}
            </Link>
            {isAdmin && (
              <Link href="/admin" className="text-sm text-purple-600 font-medium">
                Admin
              </Link>
            )}
            <button
              className="md:hidden p-2 hover:bg-gray-100 rounded-lg transition-colors"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

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
          </nav>
        )}
      </div>
    </header>
  )
}`,

  // Footer Component
  'components/layout/Footer.js': `export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-4">About BabyBloom</h3>
            <p className="text-gray-400 text-sm">
              Your trusted partner for premium baby products. Quality, safety, and comfort for your little ones.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Customer Service</h3>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><a href="/contact" className="hover:text-white">Contact Us</a></li>
              <li><a href="/shipping" className="hover:text-white">Shipping Info</a></li>
              <li><a href="/returns" className="hover:text-white">Returns</a></li>
              <li><a href="/faq" className="hover:text-white">FAQ</a></li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Legal</h3>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><a href="/privacy" className="hover:text-white">Privacy Policy</a></li>
              <li><a href="/terms" className="hover:text-white">Terms of Service</a></li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Connect</h3>
            <p className="text-gray-400 text-sm mb-4">
              Follow us for updates and parenting tips
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-white">Facebook</a>
              <a href="#" className="text-gray-400 hover:text-white">Instagram</a>
              <a href="#" className="text-gray-400 hover:text-white">Twitter</a>
            </div>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-gray-800 text-center text-sm text-gray-400">
          © 2025 BabyBloom. All rights reserved.
        </div>
      </div>
    </footer>
  )
}`,

  // ProductGrid Component
  'components/products/ProductGrid.js': `import ProductCard from './ProductCard'

export default function ProductGrid({ products }) {
  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  )
}`,

  // ProductCard Component
  'components/products/ProductCard.js': `'use client'

import Link from 'next/link'
import { useCart } from '@/hooks/useCart'
import { ShoppingCart, Heart } from 'lucide-react'
import toast from 'react-hot-toast'

export default function ProductCard({ product }) {
  const { addItem } = useCart()
  
  const handleAddToCart = (e) => {
    e.preventDefault()
    addItem(product)
    toast.success(\`\${product.name} added to cart!\`)
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
            className="absolute top-2 right-2 z-10 p-2 bg-white rounded-full shadow-md opacity-0 group-hover:opacity-100 transition-opacity"
            onClick={(e) => {
              e.preventDefault()
              toast.success('Added to wishlist!')
            }}
          >
            <Heart className="w-4 h-4 text-gray-600 hover:text-red-500 transition-colors" />
          </button>
          <img
            src={product.images[0] || '/api/placeholder/400/400'}
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

  // ProductDetail Component
  'components/products/ProductDetail.js': `'use client'

import { useState } from 'react'
import { useCart } from '@/hooks/useCart'
import { ShoppingCart, Heart, Shield, Truck, Star } from 'lucide-react'
import toast from 'react-hot-toast'

export default function ProductDetail({ product }) {
  const [selectedImage, setSelectedImage] = useState(0)
  const [quantity, setQuantity] = useState(1)
  const { addItem } = useCart()

  const handleAddToCart = () => {
    addItem(product, quantity)
    toast.success(\`Added \${quantity} x \${product.name} to cart!\`)
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid lg:grid-cols-2 gap-12">
        {/* Images */}
        <div className="space-y-4">
          <div className="aspect-square overflow-hidden rounded-lg bg-gray-50">
            <img
              src={product.images[selectedImage] || '/api/placeholder/600/600'}
              alt={product.name}
              className="w-full h-full object-cover"
            />
          </div>
          {product.images.length > 1 && (
            <div className="grid grid-cols-4 gap-2">
              {product.images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={\`aspect-square overflow-hidden rounded-lg border-2 \${
                    selectedImage === index ? 'border-purple-600' : 'border-gray-200'
                  }\`}
                >
                  <img
                    src={image}
                    alt={\`\${product.name} \${index + 1}\`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Details */}
        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">{product.name}</h1>
            <p className="text-lg text-gray-600">{product.brand}</p>
          </div>

          <div className="flex items-center gap-4">
            {product.sale_price ? (
              <>
                <span className="text-3xl font-bold text-gray-900">
                  $\{product.sale_price.toFixed(2)}
                </span>
                <span className="text-xl text-gray-400 line-through">
                  $\{product.price.toFixed(2)}
                </span>
                <span className="bg-red-500 text-white px-2 py-1 rounded-md text-sm font-semibold">
                  Save \{Math.round((1 - product.sale_price / product.price) * 100)}%
                </span>
              </>
            ) : (
              <span className="text-3xl font-bold text-gray-900">
                $\{product.price.toFixed(2)}
              </span>
            )}
          </div>

          <div className="flex items-center gap-2">
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className="w-5 h-5 fill-yellow-400 text-yellow-400"
                />
              ))}
            </div>
            <span className="text-gray-600">(4.8 out of 5)</span>
          </div>

          <p className="text-gray-600 leading-relaxed">
            {product.description}
          </p>

          {/* Quantity and Add to Cart */}
          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <label htmlFor="quantity" className="font-medium">Quantity:</label>
              <div className="flex items-center border border-gray-300 rounded-lg">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="px-4 py-2 hover:bg-gray-100"
                >
                  -
                </button>
                <input
                  type="number"
                  id="quantity"
                  value={quantity}
                  onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                  className="w-16 text-center border-x border-gray-300"
                />
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="px-4 py-2 hover:bg-gray-100"
                >
                  +
                </button>
              </div>
            </div>

            <div className="flex gap-4">
              <button
                onClick={handleAddToCart}
                className="flex-1 btn-primary flex items-center justify-center gap-2"
              >
                <ShoppingCart className="w-5 h-5" />
                Add to Cart
              </button>
              <button className="p-3 border-2 border-gray-300 rounded-lg hover:border-gray-400">
                <Heart className="w-5 h-5 text-gray-600" />
              </button>
            </div>
          </div>

          {/* Features */}
          <div className="grid grid-cols-3 gap-4 py-6 border-y border-gray-200">
            <div className="flex items-center gap-2">
              <Shield className="w-5 h-5 text-green-600" />
              <span className="text-sm">Safe & Certified</span>
            </div>
            <div className="flex items-center gap-2">
              <Truck className="w-5 h-5 text-blue-600" />
              <span className="text-sm">Free Shipping</span>
            </div>
            <div className="flex items-center gap-2">
              <Star className="w-5 h-5 text-yellow-600" />
              <span className="text-sm">Top Rated</span>
            </div>
          </div>

          {/* Product Info */}
          {product.features && product.features.length > 0 && (
            <div>
              <h3 className="font-semibold text-lg mb-3">Features</h3>
              <ul className="space-y-2">
                {product.features.map((feature, index) => (
                  <li key={index} className="flex items-start">
                    <span className="text-purple-600 mr-2">•</span>
                    <span className="text-gray-600">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}`,

  // CartItem Component
  'components/cart/CartItem.js': `'use client'

import { useCart } from '@/hooks/useCart'
import { Trash2 } from 'lucide-react'

export default function CartItem({ item }) {
  const { updateQuantity, removeItem } = useCart()

  return (
    <div className="flex items-center gap-4 p-4 bg-white rounded-lg shadow-sm mb-4">
      <img
        src={item.product.images[0] || '/api/placeholder/100/100'}
        alt={item.product.name}
        className="w-24 h-24 object-cover rounded-lg"
      />
      
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
          $\{((item.product.sale_price || item.product.price) * item.quantity).toFixed(2)}
        </p>
        {item.quantity > 1 && (
          <p className="text-sm text-gray-600">
            $\{(item.product.sale_price || item.product.price).toFixed(2)} each
          </p>
        )}
      </div>
    </div>
  )
}`,

  // CartSummary Component
  'components/cart/CartSummary.js': `'use client'

import { useCart } from '@/hooks/useCart'
import { calculateCartTotal } from '@/lib/utils'
import Link from 'next/link'

export default function CartSummary() {
  const { items } = useCart()
  const { subtotal, shipping, tax, total } = calculateCartTotal(items)

  return (
    <div className="bg-gray-50 rounded-lg p-6">
      <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
      
      <div className="space-y-2 mb-4">
        <div className="flex justify-between">
          <span>Subtotal</span>
          <span>$\{subtotal.toFixed(2)}</span>
        </div>
        <div className="flex justify-between">
          <span>Shipping</span>
          <span>{shipping === 0 ? 'FREE' : \`$\${shipping.toFixed(2)}\`}</span>
        </div>
        <div className="flex justify-between">
          <span>Tax</span>
          <span>$\{tax.toFixed(2)}</span>
        </div>
      </div>
      
      <div className="border-t pt-4 mb-6">
        <div className="flex justify-between text-lg font-semibold">
          <span>Total</span>
          <span>$\{total.toFixed(2)}</span>
        </div>
      </div>
      
      <Link href="/checkout" className="w-full btn-primary block text-center">
        Proceed to Checkout
      </Link>
      
      <p className="text-sm text-gray-600 mt-4 text-center">
        Free shipping on orders over $50
      </p>
    </div>
  )
}`,

  // Privacy Policy page
  'app/privacy/page.js': `export default function PrivacyPage() {
  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Privacy Policy</h1>
      <div className="prose prose-gray max-w-none">
        <p className="mb-4">Last updated: January 2025</p>
        
        <h2 className="text-2xl font-semibold mt-6 mb-4">Information We Collect</h2>
        <p className="mb-4">
          We collect information you provide directly to us, such as when you create an account,
          make a purchase, or contact us for support.
        </p>
        
        <h2 className="text-2xl font-semibold mt-6 mb-4">How We Use Your Information</h2>
        <p className="mb-4">
          We use the information we collect to provide, maintain, and improve our services,
          process transactions, and communicate with you.
        </p>
        
        <h2 className="text-2xl font-semibold mt-6 mb-4">Information Sharing</h2>
        <p className="mb-4">
          We do not sell, trade, or otherwise transfer your personal information to third parties
          without your consent, except as described in this policy.
        </p>
        
        <h2 className="text-2xl font-semibold mt-6 mb-4">Contact Us</h2>
        <p>
          If you have any questions about this Privacy Policy, please contact us at
          privacy@babybloom.com
        </p>
      </div>
    </div>
  )
}`,

  // Terms of Service page
  'app/terms/page.js': `export default function TermsPage() {
  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Terms of Service</h1>
      <div className="prose prose-gray max-w-none">
        <p className="mb-4">Last updated: January 2025</p>
        
        <h2 className="text-2xl font-semibold mt-6 mb-4">Acceptance of Terms</h2>
        <p className="mb-4">
          By accessing and using this website, you accept and agree to be bound by the terms
          and provision of this agreement.
        </p>
        
        <h2 className="text-2xl font-semibold mt-6 mb-4">Use of the Site</h2>
        <p className="mb-4">
          You may use our site for lawful purposes only. You must be at least 18 years old
          to make purchases on our site.
        </p>
        
        <h2 className="text-2xl font-semibold mt-6 mb-4">Product Information</h2>
        <p className="mb-4">
          We strive to provide accurate product descriptions and pricing. However, we do not
          warrant that product descriptions or other content is error-free.
        </p>
        
        <h2 className="text-2xl font-semibold mt-6 mb-4">Contact Us</h2>
        <p>
          If you have any questions about these Terms, please contact us at
          legal@babybloom.com
        </p>
      </div>
    </div>
  )
}`,
};

// Create all component files
Object.entries(componentFiles).forEach(([filePath, content]) => {
  createFile(filePath, content);
});

console.log('\n✨ JavaScript project setup complete!');
console.log('\n📋 Next steps:');
console.log('1. Install dependencies: npm install');
console.log('2. Set up Supabase:');
console.log('   - Create account at https://supabase.com');
console.log('   - Create new project');
console.log('   - Run SQL from supabase-schema.sql in SQL Editor');
console.log('   - Copy API keys to .env.local');
console.log('3. Run development server: npm run dev');
console.log('4. Open http://localhost:3000');
console.log('\n🎉 Happy coding with JavaScript!');