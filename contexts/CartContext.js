'use client'

import { createContext, useContext, useState, useEffect } from 'react'
import toast from 'react-hot-toast'

// Import debug utilities in development
if (process.env.NODE_ENV === 'development') {
  import('../utils/cartDebug.js')
}

const CartContext = createContext()

const CART_STORAGE_KEY = 'babybloom_cart'

// Helper function to safely access localStorage
const getStoredCart = () => {
  if (typeof window === 'undefined') return null
  
  try {
    const savedCart = localStorage.getItem(CART_STORAGE_KEY)
    return savedCart ? JSON.parse(savedCart) : null
  } catch (error) {
    console.warn('Failed to load cart from localStorage:', error)
    return null
  }
}

// Helper function to safely store cart
const storeCart = (items) => {
  if (typeof window === 'undefined') return
  
  try {
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items))
  } catch (error) {
    console.warn('Failed to save cart to localStorage:', error)
  }
}

export function CartProvider({ children }) {
  const [items, setItems] = useState([])
  const [isLoaded, setIsLoaded] = useState(false)

  // Load cart from localStorage on mount (client-side only)
  useEffect(() => {
    const savedCart = getStoredCart()
    if (savedCart && Array.isArray(savedCart)) {
      // Validate cart items structure
      const validItems = savedCart.filter(item => 
        item && 
        item.product && 
        item.product.id && 
        typeof item.quantity === 'number' && 
        item.quantity > 0
      )
      setItems(validItems)
    }
    setIsLoaded(true)
  }, [])

  // Save cart to localStorage whenever it changes (but only after initial load)
  useEffect(() => {
    if (isLoaded) {
      storeCart(items)
    }
  }, [items, isLoaded])

  const addItem = (product, quantity = 1) => {
    if (!product || !product.id) {
      console.error('Invalid product provided to addItem:', product)
      toast.error('Unable to add item to cart')
      return
    }

    setItems(current => {
      const existingItem = current.find(item => item.product.id === product.id)
      
      if (existingItem) {
        const updatedItems = current.map(item =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        )
        console.log('Updated existing item in cart:', product.name, 'New quantity:', existingItem.quantity + quantity)
        return updatedItems
      }
      
      const newItem = { 
        id: crypto.randomUUID(), 
        product: {
          id: product.id,
          name: product.name,
          price: product.price,
          sale_price: product.sale_price,
          images: product.images,
          brand: product.brand,
          category: product.category
        }, 
        quantity 
      }
      
      console.log('Added new item to cart:', product.name, 'Quantity:', quantity)
      return [...current, newItem]
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
    console.log('Cart cleared')
  }

  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0)
  
  const totalPrice = items.reduce(
    (sum, item) => sum + (item.product.sale_price || item.product.price) * item.quantity,
    0
  )

  // Debug logging
  useEffect(() => {
    console.log('Cart state updated:', {
      itemCount,
      totalPrice: totalPrice.toFixed(2),
      items: items.map(item => ({ 
        name: item.product.name, 
        quantity: item.quantity,
        price: item.product.sale_price || item.product.price
      }))
    })
  }, [items, itemCount, totalPrice])

  return (
    <CartContext.Provider value={{
      items,
      addItem,
      removeItem,
      updateQuantity,
      clearCart,
      itemCount,
      totalPrice,
      isLoaded // Expose loading state
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
}