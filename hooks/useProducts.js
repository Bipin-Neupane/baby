import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'

export function useProducts(category, featured) {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    fetchProducts()
  }, [category, featured])

  const fetchProducts = async () => {
    try {
      let query = supabase
        .from('products')
        .select('*')
        .eq('is_active', true)

      if (category) {
        query = query.eq('category', category)
      }

      if (featured) {
        query = query.eq('is_featured', true)
      }

      const { data, error } = await query

      if (error) throw error
      setProducts(data || [])
    } catch (err) {
      setError(err)
    } finally {
      setLoading(false)
    }
  }

  return { products, loading, error, refetch: fetchProducts }
}