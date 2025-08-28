import { supabase } from '@/lib/supabase'
import { notFound } from 'next/navigation'
import ProductDetail from '@/components/products/ProductDetail'

async function getProduct(id) {
  const { data, error } = await supabase
    .from('products')
    .select('*')
    .eq('id', id)
    .single()

  if (error || !data) {
    notFound()
  }

  return data
}

export default async function ProductPage({ params }) {
  const product = await getProduct(params.id)

  return <ProductDetail product={product} />
}