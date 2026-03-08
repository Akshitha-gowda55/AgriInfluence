import { Suspense } from 'react'
import ProductsPageClient from './products-page-client'

export default function ProductsPage() {
  return (
    <Suspense fallback={<div className="p-6">Loading products...</div>}>
      <ProductsPageClient />
    </Suspense>
  )
}