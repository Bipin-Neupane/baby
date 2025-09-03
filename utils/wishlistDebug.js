// Wishlist debugging utilities
// Use these in browser console to debug wishlist issues

export const wishlistDebug = {
  // Check current wishlist state
  getWishlist: () => {
    const wishlist = localStorage.getItem('dcubestore_wishlist')
    console.log('Current wishlist in localStorage:', wishlist ? JSON.parse(wishlist) : 'empty')
    return wishlist ? JSON.parse(wishlist) : []
  },

  // Clear wishlist completely
  clearWishlist: () => {
    localStorage.removeItem('dcubestore_wishlist')
    console.log('Wishlist cleared from localStorage')
    console.log('Refresh the page to see changes')
  },

  // Add a test item to wishlist
  addTestItem: () => {
    const testItem = {
      id: 'test-wishlist-' + Date.now(),
      name: 'Test Wishlist Product',
      price: 29.99,
      images: ['https://images.unsplash.com/photo-1519689680058-324335c77eba?w=400'],
      brand: 'Test Brand',
      category: 'toys',
      slug: 'test-wishlist-product'
    }

    const currentWishlist = wishlistDebug.getWishlist()
    const newWishlist = [...currentWishlist, testItem]
    localStorage.setItem('dcubestore_wishlist', JSON.stringify(newWishlist))
    console.log('Test item added to wishlist')
    console.log('Refresh the page to see changes')
  },

  // Validate wishlist structure
  validateWishlist: () => {
    const wishlist = wishlistDebug.getWishlist()
    const issues = []

    if (!Array.isArray(wishlist)) {
      issues.push('Wishlist is not an array')
      return issues
    }

    wishlist.forEach((item, index) => {
      if (!item) {
        issues.push(`Item ${index}: is null/undefined`)
        return
      }

      if (!item.id) issues.push(`Item ${index}: missing id`)
      if (!item.name) issues.push(`Item ${index}: missing name`)
      if (!item.price || typeof item.price !== 'number') {
        issues.push(`Item ${index}: invalid price`)
      }
      if (!item.images || !Array.isArray(item.images)) {
        issues.push(`Item ${index}: invalid images array`)
      }
    })

    if (issues.length === 0) {
      console.log('✅ Wishlist structure is valid')
    } else {
      console.log('❌ Wishlist validation issues:', issues)
    }

    return issues
  },

  // Check if localStorage is available
  checkStorage: () => {
    try {
      const test = 'test'
      localStorage.setItem(test, test)
      localStorage.removeItem(test)
      console.log('✅ localStorage is available')
      return true
    } catch (e) {
      console.log('❌ localStorage is not available:', e)
      return false
    }
  },

  // Compare wishlist with cart items
  compareWithCart: () => {
    const wishlist = wishlistDebug.getWishlist()
    const cart = localStorage.getItem('dcubestore_cart')
    const cartItems = cart ? JSON.parse(cart) : []

    const wishlistIds = new Set(wishlist.map(item => item.id))
    const cartIds = new Set(cartItems.map(item => item.product.id))

    const inBoth = [...wishlistIds].filter(id => cartIds.has(id))
    const onlyInWishlist = [...wishlistIds].filter(id => !cartIds.has(id))
    const onlyInCart = [...cartIds].filter(id => !wishlistIds.has(id))

    console.log('Wishlist vs Cart comparison:', {
      inBoth: inBoth.length,
      onlyInWishlist: onlyInWishlist.length,
      onlyInCart: onlyInCart.length,
      details: {
        inBoth,
        onlyInWishlist,
        onlyInCart
      }
    })
  },

  // Get wishlist statistics
  getStats: () => {
    const wishlist = wishlistDebug.getWishlist()
    
    if (wishlist.length === 0) {
      console.log('Wishlist is empty')
      return
    }

    const totalValue = wishlist.reduce((sum, item) => {
      return sum + item.price
    }, 0)

    const categories = wishlist.reduce((acc, item) => {
      acc[item.category] = (acc[item.category] || 0) + 1
      return acc
    }, {})

    const avgPrice = totalValue / wishlist.length

    console.log('Wishlist Statistics:', {
      totalItems: wishlist.length,
      totalValue: `$${totalValue.toFixed(2)}`,
      averagePrice: `$${avgPrice.toFixed(2)}`,
      categoryBreakdown: categories
    })
  }
}

// Make available globally in development
if (typeof window !== 'undefined' && process.env.NODE_ENV === 'development') {
  window.wishlistDebug = wishlistDebug
}