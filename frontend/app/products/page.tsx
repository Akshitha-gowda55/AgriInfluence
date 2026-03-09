import { Suspense } from 'react'
import ProductsPageClient from './products-page-client'

function ProductsPageFallback() {
  return (
    <main className="min-h-screen bg-gray-50">
      <section className="border-b bg-white">
        <div className="container mx-auto px-4 py-10">
          <h1 className="text-3xl font-bold text-gray-900 sm:text-4xl">
            Our Products
          </h1>
          <p className="mt-3 max-w-2xl text-sm text-gray-600 sm:text-base">
            Browse trusted fertilizers, pesticides, and agricultural essentials
            recommended through AgriInfluence.
          </p>
        </div>
      </section>

      <section className="container mx-auto px-4 py-8">
        <div className="rounded-2xl bg-white p-6 shadow-sm">
          <p className="text-sm text-gray-600">Loading products...</p>
        </div>
      </section>
    </main>
  )
}

export const metadata = {
  title: 'Products | AgriInfluence',
  description: 'Explore fertilizers, pesticides, and farming essentials',
}

export default function ProductsPage() {
  return (
    <Suspense fallback={<ProductsPageFallback />}>
      <ProductsPageClient />
    </Suspense>
  )
}