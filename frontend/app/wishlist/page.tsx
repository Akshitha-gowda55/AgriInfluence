'use client'

import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'
import { ProductCard } from '@/components/product-card'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { Heart } from 'lucide-react'
import { useWishlistStore } from '@/store/wishlist-store'

export default function WishlistPage() {
  const { items } = useWishlistStore()

  return (
    <div className="flex min-h-screen flex-col">
      <Header />

      <main className="flex-1 bg-muted/30">
        <div className="max-w-6xl mx-auto px-4 py-10">

          <h1 className="text-3xl font-bold mb-8">My Wishlist</h1>

          {items.length === 0 ? (
            <div className="text-center py-16">
              <Heart className="mx-auto mb-4 h-12 w-12 text-muted-foreground" />

              <p className="mb-4 text-muted-foreground">
                Your wishlist is empty.
              </p>

              <Button asChild>
                <Link href="/products">Browse Products</Link>
              </Button>
            </div>
          ) : (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {items.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}

        </div>
      </main>

      <Footer />
    </div>
  )
}