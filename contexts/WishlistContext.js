'use client'

import { createContext, useContext, useState, useEffect } from 'react'
import toast from 'react-hot-toast'

// Import debug utilities in development
if (process.env.NODE_ENV === 'development') {
  import('../utils/wishlistDebug.js')
}

const WishlistContext = createContext()

const WISHLIST_STORAGE_KEY = 'dcubestore_wishlist'

// Helper function to safely access localStorage
const getStoredWishlist = () => {
  if (typeof window === 'undefined') return null
  
  try {
    const savedWishlist = localStorage.getItem(WISHLIST_STORAGE_KEY)
    return savedWishlist ? JSON.parse(savedWishlist) : null
  } catch (error) {
    console.warn('Failed to load wishlist from localStorage:', error)
    return null
  }
}

// Helper function to safely store wishlist
const storeWishlist = (wishlist) => {
  if (typeof window === 'undefined') return
  
  try {
    localStorage.setItem(WISHLIST_STORAGE_KEY, JSON.stringify(wishlist))
  } catch (error) {
    console.warn('Failed to save wishlist to localStorage:', error)
  }
}

export function WishlistProvider({ children }) {
  const [wishlist, setWishlist] = useState([])
  const [isLoaded, setIsLoaded] = useState(false)

  // Load wishlist from localStorage on mount (client-side only)
  useEffect(() => {
    const savedWishlist = getStoredWishlist()
    if (savedWishlist && Array.isArray(savedWishlist)) {
      // Validate wishlist items structure
      const validItems = savedWishlist.filter(item => 
        item && 
        item.id && 
        item.name && 
        typeof item.price === 'number'
      )
      setWishlist(validItems)
    }
    setIsLoaded(true)
  }, [])

  // Save wishlist to localStorage whenever it changes (but only after initial load)
  useEffect(() => {
    if (isLoaded) {
      storeWishlist(wishlist)
    }
  }, [wishlist, isLoaded])

  const addToWishlist = (product) => {
    if (!product || !product.id) {
      console.error('Invalid product provided to addToWishlist:', product)
      toast.error('Unable to add item to wishlist')
      return
    }

    setWishlist(current => {
      const exists = current.find(item => item.id === product.id)
      if (exists) {
        toast.error('Already in wishlist!')
        return current
      }
      
      // Create a clean product object for storage
      const wishlistItem = {
        id: product.id,
        name: product.name,
        price: product.price,
        images: product.images,
        brand: product.brand,
        category: product.category,
        slug: product.slug
      }
      
      console.log('Added item to wishlist:', product.name)
      toast.success('Added to wishlist!')
      return [...current, wishlistItem]
    })
  }

  const removeFromWishlist = (productId) => {
    setWishlist(current => {
      const item = current.find(item => item.id === productId)
      if (item) {
        console.log('Removed item from wishlist:', item.name)
      }
      return current.filter(item => item.id !== productId)
    })
    toast.success('Removed from wishlist')
  }

  const isInWishlist = (productId) => {
    return wishlist.some(item => item.id === productId)
  }

  const clearWishlist = () => {
    setWishlist([])
    console.log('Wishlist cleared')
  }

  // Debug logging
  useEffect(() => {
    if (isLoaded) {
      console.log('Wishlist state updated:', {
        itemCount: wishlist.length,
        items: wishlist.map(item => ({ 
          name: item.name, 
          price: item.price
        }))
      })
    }
  }, [wishlist, isLoaded])

  return (
    <WishlistContext.Provider value={{
      wishlist,
      addToWishlist,
      removeFromWishlist,
      isInWishlist,
      clearWishlist,
      itemCount: wishlist.length,
      isLoaded // Expose loading state
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
}