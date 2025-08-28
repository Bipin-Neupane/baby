'use client'

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
    router.push(`/products?${params.toString()}`)
  }

  const handleSortChange = (sort) => {
    const params = new URLSearchParams(searchParams)
    if (sort) {
      params.set('sort', sort)
    } else {
      params.delete('sort')
    }
    router.push(`/products?${params.toString()}`)
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
              router.push(`/products?${params.toString()}`)
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
}