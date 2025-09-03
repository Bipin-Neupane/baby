'use client'

import Image from 'next/image'
import { useState } from 'react'

// Default fallback images for each category
const categoryFallbacks = {
  'clothing': 'https://images.unsplash.com/photo-1522771930-78848d9293e8?w=400&h=400&fit=crop&crop=center&auto=format',
  'toys': 'https://images.unsplash.com/photo-1596461404969-9ae70f2830c1?w=400&h=400&fit=crop&crop=center&auto=format',
  'nursery': 'https://images.unsplash.com/photo-1519689680058-324335c77eba?w=400&h=400&fit=crop&crop=center&auto=format',
  'feeding': 'https://images.unsplash.com/photo-1544642899-f0d6e5f6ed6f?w=400&h=400&fit=crop&crop=center&auto=format',
  'bath-care': 'https://images.unsplash.com/photo-1492725764893-90b379c2b6e7?w=400&h=400&fit=crop&crop=center&auto=format',
  'travel': 'https://images.unsplash.com/photo-1533499966477-9e50e2d0b9e7?w=400&h=400&fit=crop&crop=center&auto=format',
  'safety': 'https://images.unsplash.com/photo-1503516509570-a0d605c5de96?w=400&h=400&fit=crop&crop=center&auto=format',
  'gifts': 'https://images.unsplash.com/photo-1515192650392-45c8ad7b8fdc?w=400&h=400&fit=crop&crop=center&auto=format',
  'default': 'https://images.unsplash.com/photo-1519689680058-324335c77eba?w=400&h=400&fit=crop&crop=center&auto=format'
}

export default function ImageWithFallback({ 
  src, 
  alt, 
  category = 'default',
  className = '',
  fill = true,
  width,
  height,
  sizes,
  priority = false,
  onLoadStart,
  onLoadComplete,
  ...props 
}) {
  const [imgSrc, setImgSrc] = useState(src)
  const [imageLoading, setImageLoading] = useState(true)
  const [hasErrored, setHasErrored] = useState(false)

  // Get the appropriate image source with fallbacks
  const getImageSrc = () => {
    // If original image and no error, use it
    if (imgSrc && !hasErrored && typeof imgSrc === 'string' && imgSrc.trim() && imgSrc.startsWith('http')) {
      return imgSrc
    }
    
    // Use category-specific fallback
    return categoryFallbacks[category?.toLowerCase()] || categoryFallbacks.default
  }

  const handleLoad = (result) => {
    setImageLoading(false)
    setHasErrored(false)
    onLoadComplete?.(result)
  }

  const handleError = () => {
    console.warn(`Image failed to load: ${imgSrc}. Using fallback for category: ${category}`)
    setHasErrored(true)
    setImageLoading(false)
    // Set fallback image
    const fallback = categoryFallbacks[category?.toLowerCase()] || categoryFallbacks.default
    if (imgSrc !== fallback) {
      setImgSrc(fallback)
    }
  }

  const handleLoadStart = () => {
    setImageLoading(true)
    onLoadStart?.()
  }

  const finalSrc = getImageSrc()

  // Common props for both fill and sized images
  const imageProps = {
    src: finalSrc,
    alt: alt || 'Product image',
    className: `${className} ${imageLoading ? 'opacity-0' : 'opacity-100'} transition-opacity duration-300`,
    onLoad: handleLoad,
    onError: handleError,
    onLoadStart: handleLoadStart,
    priority,
    ...props
  }

  // Loading skeleton
  const LoadingSkeleton = () => (
    imageLoading && (
      <div className="absolute inset-0 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 animate-pulse" />
    )
  )

  if (fill) {
    return (
      <>
        <LoadingSkeleton />
        <Image
          {...imageProps}
          fill
          sizes={sizes || "(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"}
        />
      </>
    )
  }

  return (
    <>
      <LoadingSkeleton />
      <Image
        {...imageProps}
        width={width}
        height={height}
      />
    </>
  )
}