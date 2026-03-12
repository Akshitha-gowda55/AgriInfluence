import { notFound } from 'next/navigation'

import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'
import { ProductDetails } from '@/components/products/product-details'

import { products } from '@/lib/data'

interface ProductPageProps {
  params: {
    id: string
  }
}

export default function ProductPage({ params }: ProductPageProps) {
  const product = products.find(
    (p) => p.id === params.id
  )

  if (!product) {
    notFound()
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Header />

      <main className="flex-1 bg-muted/30">
        <div className="mx-auto max-w-7xl px-4 py-10">
          <ProductDetails product={product} />
        </div>
      </main>

      <Footer />
    </div>
  )
}