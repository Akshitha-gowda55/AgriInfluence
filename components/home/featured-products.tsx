'use client'

import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { ProductCard } from '@/components/product-card'
import { products } from '@/lib/data'

export function FeaturedProducts() {
  const featuredProducts = products.slice(0, 4)

  return (
    <section className="py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-10 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-sm font-medium uppercase tracking-widest text-primary">
              Shop Our Collection
            </p>
            <h2 className="mt-2 font-serif text-3xl font-bold text-foreground sm:text-4xl">
              Featured Products
            </h2>
            <p className="mt-2 max-w-xl text-muted-foreground">
              Discover our best-selling fertilizers, pesticides, and seeds trusted by
              farmers nationwide.
            </p>
          </div>

          <Button variant="outline" asChild>
            <Link href="/products">
              View All Products
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {featuredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        {/* Category Links */}
        <div className="mt-16 grid grid-cols-1 gap-4 sm:grid-cols-3">
          {[
            {
              name: 'Fertilizers',
              description: 'Boost your soil health',
              href: '/products?category=fertilizer',
              image:
                'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=600&h=400&fit=crop',
            },
            {
              name: 'Pesticides',
              description: 'Protect your crops',
              href: '/products?category=pesticide',
              image:
                'https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=600&h=400&fit=crop',
            },
            {
              name: 'Seeds',
              description: 'Premium quality seeds',
              href: '/products?category=seeds',
              image:
                'https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=600&h=400&fit=crop',
            },
          ].map((category) => (
            <Link
              key={category.name}
              href={category.href}
              className="group relative overflow-hidden rounded-lg"
            >
              <div className="relative aspect-[16/10]">
                <img
                  src={category.image}
                  alt={category.name}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-foreground/50 transition-opacity group-hover:bg-foreground/60" />
                <div className="absolute inset-0 flex flex-col justify-end p-6">
                  <h3 className="text-xl font-semibold text-primary-foreground">
                    {category.name}
                  </h3>
                  <p className="mt-1 text-sm text-primary-foreground/80">
                    {category.description}
                  </p>
                  <span className="mt-2 inline-flex items-center text-sm font-medium text-primary">
                    Shop Now
                    <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}