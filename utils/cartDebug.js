// Cart debugging utilities
// Use these in browser console to debug cart issues

export const cartDebug = {
  // Check current cart state
  getCart: () => {
    const cart = localStorage.getItem('babybloom_cart')
    console.log('Current cart in localStorage:', cart ? JSON.parse(cart) : 'empty')
    return cart ? JSON.parse(cart) : []
  },

  // Clear cart completely
  clearCart: () => {
    localStorage.removeItem('babybloom_cart')
    console.log('Cart cleared from localStorage')
    console.log('Refresh the page to see changes')
  },

  // Add a test item to cart
  addTestItem: () => {
    const testItem = {
      id: 'test-' + Date.now(),
      product: {
        id: 'test-product',
        name: 'Test Product',
        price: 19.99,
        images: ['https://images.unsplash.com/photo-1519689680058-324335c77eba?w=400'],
        brand: 'Test Brand',
        category: 'toys'
      },
      quantity: 1
    }

    const currentCart = cartDebug.getCart()
    const newCart = [...currentCart, testItem]
    localStorage.setItem('babybloom_cart', JSON.stringify(newCart))
    console.log('Test item added to cart')
    console.log('Refresh the page to see changes')
  },

  // Validate cart structure
  validateCart: () => {
    const cart = cartDebug.getCart()
    const issues = []

    if (!Array.isArray(cart)) {
      issues.push('Cart is not an array')
      return issues
    }

    cart.forEach((item, index) => {
      if (!item) {
        issues.push(`Item ${index}: is null/undefined`)
        return
      }

      if (!item.id) issues.push(`Item ${index}: missing id`)
      if (!item.product) issues.push(`Item ${index}: missing product`)
      if (!item.quantity || typeof item.quantity !== 'number') {
        issues.push(`Item ${index}: invalid quantity`)
      }

      if (item.product) {
        if (!item.product.id) issues.push(`Item ${index}: product missing id`)
        if (!item.product.name) issues.push(`Item ${index}: product missing name`)
        if (!item.product.price) issues.push(`Item ${index}: product missing price`)
      }
    })

    if (issues.length === 0) {
      console.log('✅ Cart structure is valid')
    } else {
      console.log('❌ Cart validation issues:', issues)
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
  }
}

// Make available globally in development
if (typeof window !== 'undefined' && process.env.NODE_ENV === 'development') {
  window.cartDebug = cartDebug
}