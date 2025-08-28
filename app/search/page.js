'use client'

import { useState, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import { supabase } from '@/lib/supabase'
import ProductGrid from '@/components/products/ProductGrid'
import { Search } from 'lucide-react'

export default function SearchPage() {
  const searchParams = useSearchParams()
  const query = searchParams.get('q') || ''
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (query) {
      searchProducts()
    }
  }, [query])

  const searchProducts = async () => {
    setLoading(true)
    try {
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .or(`name.ilike.%${query}%,description.ilike.%${query}%,brand.ilike.%${query}%,category.ilike.%${query}%`)
        .eq('is_active', true)

      if (error) throw error
      setProducts(data || [])
    } catch (error) {
      console.error('Search error:', error)
      setProducts([])
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          Search Results
        </h1>
        {query && (
          <p className="text-gray-600">
            {loading ? 'Searching for' : `${products.length} results for`} "{query}"
          </p>
        )}
      </div>

      {loading ? (
        <div className="text-center py-12">
          <div className="inline-flex items-center">
            <Search className="w-6 h-6 mr-2 animate-pulse" />
            <span>Searching...</span>
          </div>
        </div>
      ) : products.length > 0 ? (
        <ProductGrid products={products} />
      ) : query ? (
        <div className="text-center py-12">
          <Search className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <p className="text-gray-600 mb-4">No products found for "{query}"</p>
          <p className="text-sm text-gray-500">Try searching with different keywords</p>
        </div>
      ) : (
        <div className="text-center py-12">
          <Search className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <p className="text-gray-600">Enter a search term to find products</p>
        </div>
      )}
    </div>
  )
}