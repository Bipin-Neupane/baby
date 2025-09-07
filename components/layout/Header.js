'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { useCart } from '@/hooks/useCart'
import { useAuth } from '@/hooks/useAuth'
import { ShoppingCart, Menu, X, User, Search, Heart } from 'lucide-react'

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [showUserMenu, setShowUserMenu] = useState(false)
  const [showSearch, setShowSearch] = useState(false)
  const { itemCount, isLoaded } = useCart()
  const { user, isAdmin, logout } = useAuth()
  
  // Create refs for the dropdown elements
  const userMenuRef = useRef(null)
  const userButtonRef = useRef(null)
  
  // Check if WishlistContext exists
  let wishlistCount = 0
  let wishlistLoaded = true
  try {
    const { useWishlist } = require('@/contexts/WishlistContext')
    const wishlistHook = useWishlist()
    wishlistCount = wishlistHook?.itemCount || 0
    wishlistLoaded = wishlistHook?.isLoaded || false
  } catch (error) {
    // Wishlist context not available
  }

  // Handle click outside for user menu
  useEffect(() => {
    function handleClickOutside(event) {
      // Check if click is outside both the menu and the button
      if (
        userMenuRef.current && 
        !userMenuRef.current.contains(event.target) &&
        userButtonRef.current &&
        !userButtonRef.current.contains(event.target)
      ) {
        setShowUserMenu(false)
      }
    }

    // Add event listener when menu is open
    if (showUserMenu) {
      document.addEventListener('mousedown', handleClickOutside)
      // Also handle escape key
      const handleEscape = (e) => {
        if (e.key === 'Escape') {
          setShowUserMenu(false)
        }
      }
      document.addEventListener('keydown', handleEscape)
      
      // Cleanup
      return () => {
        document.removeEventListener('mousedown', handleClickOutside)
        document.removeEventListener('keydown', handleEscape)
      }
    }
  }, [showUserMenu])

  const handleLogout = async () => {
    await logout()
    setShowUserMenu(false)
  }

  // Load search modal dynamically
  let SearchModal = null
  try {
    SearchModal = require('@/components/search/SearchModal').default
  } catch (error) {
    // Search modal not available
  }

  return (
    <>
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-gray-100">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <Link href="/" className="flex items-center space-x-2">
              <span className="text-lg sm:text-xl md:text-2xl font-bold bg-gradient-to-r from-pink-500 to-purple-600 text-transparent bg-clip-text">
                <span className="sm:hidden">DS</span>
                <span className="hidden sm:inline">Dcube Store</span>
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
                {wishlistLoaded && wishlistCount > 0 && (
                  <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                    {wishlistCount}
                  </span>
                )}
                {!wishlistLoaded && (
                  <span className="absolute -top-1 -right-1 w-2 h-2 bg-gray-400 rounded-full animate-pulse"></span>
                )}
              </Link>

              {/* User Account */}
              <div className="relative">
                <button 
                  ref={userButtonRef}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                  onClick={() => setShowUserMenu(!showUserMenu)}
                >
                  <User className="w-5 h-5 text-gray-700" />
                </button>
                
                {showUserMenu && (
                  <>
                    {/* Invisible backdrop for mobile */}
                    <div 
                      className="fixed inset-0 z-40 md:hidden"
                      onClick={() => setShowUserMenu(false)}
                    />
                    
                    <div 
                      ref={userMenuRef}
                      className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-2 z-50 animate-fade-in"
                      style={{
                        animation: 'fadeIn 0.2s ease-out'
                      }}
                    >
                      {user ? (
                        <>
                          <Link 
                            href="/account" 
                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-purple-50"
                            onClick={() => setShowUserMenu(false)}
                          >
                            My Account
                          </Link>
                          <Link 
                            href="/orders" 
                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-purple-50"
                            onClick={() => setShowUserMenu(false)}
                          >
                            My Orders
                          </Link>
                          <Link 
                            href="/wishlist" 
                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-purple-50"
                            onClick={() => setShowUserMenu(false)}
                          >
                            My Wishlist
                          </Link>
                          {isAdmin && (
                            <>
                              <hr className="my-2" />
                              <Link 
                                href="/admin" 
                                className="block px-4 py-2 text-sm text-purple-600 font-medium hover:bg-purple-50"
                                onClick={() => setShowUserMenu(false)}
                              >
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
                          <Link 
                            href="/login" 
                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-purple-50"
                            onClick={() => setShowUserMenu(false)}
                          >
                            Login
                          </Link>
                          <Link 
                            href="/register" 
                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-purple-50"
                            onClick={() => setShowUserMenu(false)}
                          >
                            Create Account
                          </Link>
                        </>
                      )}
                    </div>
                  </>
                )}
              </div>

              {/* Cart */}
              <Link href="/cart" className="p-2 hover:bg-gray-100 rounded-lg transition-colors relative">
                <ShoppingCart className="w-5 h-5 text-gray-700" />
                {isLoaded && itemCount > 0 && (
                  <span className="absolute -top-1 -right-1 w-5 h-5 bg-purple-600 text-white text-xs rounded-full flex items-center justify-center">
                    {itemCount}
                  </span>
                )}
                {!isLoaded && (
                  <span className="absolute -top-1 -right-1 w-2 h-2 bg-gray-400 rounded-full animate-pulse"></span>
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
      {SearchModal && <SearchModal isOpen={showSearch} onClose={() => setShowSearch(false)} />}
      
      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </>
  )
}