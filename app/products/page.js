import { supabase } from '@/lib/supabase'
import ProductGrid from '@/components/products/ProductGrid'
import ProductFilters from '@/components/products/ProductFilters'

async function getProducts(searchParams) {
  let query = supabase
    .from('products')
    .select('*')
    .eq('is_active', true)

  // Apply category filter if provided
  if (searchParams?.category) {
    query = query.eq('category', searchParams.category)
  }

  // Apply sale filter if provided
  if (searchParams?.sale === 'true') {
    query = query.not('sale_price', 'is', null)
  }

  // Apply sorting
  if (searchParams?.sort) {
    switch (searchParams.sort) {
      case 'price-asc':
        query = query.order('price', { ascending: true })
        break
      case 'price-desc':
        query = query.order('price', { ascending: false })
        break
      case 'name':
        query = query.order('name', { ascending: true })
        break
      default:
        query = query.order('created_at', { ascending: false })
    }
  } else {
    query = query.order('created_at', { ascending: false })
  }

  const { data, error } = await query

  if (error) {
    console.error('Error fetching products:', error)
    return []
  }

  return data || []
}

async function getCategories() {
  const { data, error } = await supabase
    .from('categories')
    .select('*')
    .eq('is_active', true)
    .order('display_order', { ascending: true })

  if (error) {
    console.error('Error fetching categories:', error)
    return []
  }

  return data || []
}

export default async function ProductsPage({ searchParams }) {
  const [products, categories] = await Promise.all([
    getProducts(searchParams),
    getCategories()
  ])

  const currentCategory = searchParams?.category || 'all'

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          {currentCategory === 'all' 
            ? 'All Products' 
            : categories.find(c => c.slug === currentCategory)?.name || 'Products'}
        </h1>
        <p className="text-gray-600">
          {searchParams?.sale === 'true'
            ? 'Special offers and discounted items'
            : `Showing ${products.length} products${currentCategory !== 'all' ? ' in ' + currentCategory : ''}`}
        </p>
      </div>
      
      <div className="grid lg:grid-cols-4 gap-8">
        <div className="lg:col-span-1">
          <ProductFilters categories={categories} currentCategory={currentCategory} />
        </div>
        
        <div className="lg:col-span-3">
          {products.length > 0 ? (
            <ProductGrid products={products} />
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-600 mb-4">No products found in this category.</p>
              <a href="/products" className="btn-primary">View All Products</a>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}