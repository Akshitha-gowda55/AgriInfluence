import { notFound } from 'next/navigation'

import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'
import { ProductDetails } from '@/components/products/product-details'
import { products } from '@/lib/data'

interface ProductPageProps {
  params: Promise<{
    id: string
  }>
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { id } = await params

  const product = products.find((item) => item.id === id)

  if (!product) {
    notFound()
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Header />

      <main className="flex-1 bg-muted/30">
        <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
          <ProductDetails product={product} />
        </div>
      </main>

      <Footer />
    </div>
  )
}