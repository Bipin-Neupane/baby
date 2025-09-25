import { Baby, Heart, Crown } from 'lucide-react'

// Utility function to get ebook icon and color based on product ID
export function getEbookIconAndColor(productId) {
  const ebookStyles = {
    'starter-ebook': {
      icon: Baby,
      color: 'from-blue-400 to-blue-600'
    },
    'premium-ebook': {
      icon: Heart,
      color: 'from-pink-400 to-pink-600'
    },
    'expert-ebook': {
      icon: Crown,
      color: 'from-purple-400 to-purple-600'
    }
  }

  return ebookStyles[productId] || ebookStyles['starter-ebook']
}