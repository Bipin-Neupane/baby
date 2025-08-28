// lib/imageUtils.js
// Utility functions for handling product images

export const categoryImages = {
  'clothing': 'https://images.unsplash.com/photo-1522771930-78848d9293e8?w=800&h=800&fit=crop',
  'toys': 'https://images.unsplash.com/photo-1596461404969-9ae70f2830c1?w=800&h=800&fit=crop',
  'nursery': 'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?w=800&h=800&fit=crop',
  'feeding': 'https://images.unsplash.com/photo-1570544820881-4fe8b8e5da06?w=800&h=800&fit=crop',
  'bath-care': 'https://images.unsplash.com/photo-1540221652346-e5dd6b50f3e7?w=800&h=800&fit=crop',
  'travel': 'https://images.unsplash.com/photo-1533499966477-9333968a4e28?w=800&h=800&fit=crop',
  'safety': 'https://images.unsplash.com/photo-1503516509570-a0d605c5de96?w=800&h=800&fit=crop',
  'gifts': 'https://images.unsplash.com/photo-1515192650392-45c8ad7b8fdc?w=800&h=800&fit=crop',
  'default': 'https://images.unsplash.com/photo-1519689680058-324335c77eba?w=800&h=800&fit=crop'
}

export function getProductImageUrl(product) {
  // Check if product has valid images array
  if (product.images && Array.isArray(product.images) && product.images.length > 0) {
    const firstImage = product.images[0]
    
    // Check if it's a valid URL
    if (firstImage && typeof firstImage === 'string' && firstImage.startsWith('http')) {
      // Skip placeholder images
      if (!firstImage.includes('placeholder') && !firstImage.includes('/api/placeholder')) {
        return firstImage
      }
    }
  }
  
  // Return category-specific fallback
  return categoryImages[product.category] || categoryImages.default
}

export function isValidImageUrl(url) {
  if (!url || typeof url !== 'string') return false
  if (!url.startsWith('http')) return false
  if (url.includes('placeholder')) return false
  if (url.includes('/api/placeholder')) return false
  return true
}
