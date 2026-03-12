import ProductCard from '@/components/products/product-card'
import { products } from '../../lib/data'

export default function FeaturedProducts() {
  const featuredProducts = products
    .filter((product) => product.featured === true)
    .slice(0, 4)

  return (
    <section className="py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-foreground">
            Featured Products
          </h2>
          <p className="mt-2 text-muted-foreground">
            Top agricultural products selected for quality and performance.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {featuredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  )
}