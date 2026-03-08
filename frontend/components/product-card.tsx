'use client'

import Link from 'next/link'
import Image from 'next/image'
import { Star, ShoppingCart } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Product } from '@/lib/types'
import { useCartStore } from '@/lib/cart-store'
import { formatPrice } from '@/lib/currency'

interface ProductCardProps {
  product: Product
}

export function ProductCard({ product }: ProductCardProps) {
  const addItem = useCartStore((state) => state.addItem)

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    addItem(product)
  }

  const price = product.price ?? 0
  const originalPrice = product.originalPrice ?? 0
  const discount =
    originalPrice > 0 ? Math.round((1 - price / originalPrice) * 100) : 0

  return (
    <Link href={`/products/${product.id}`} className="group">
      <div className="relative overflow-hidden rounded-lg border border-border bg-card transition-all duration-300 hover:border-primary/30 hover:shadow-lg">
        <div className="relative aspect-square overflow-hidden bg-muted">
          {product.image ? (
            <Image
              src={product.image}
              alt={product.name ?? 'Product Image'}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-105"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center text-muted-foreground">
              No Image
            </div>
          )}

          {product.badge && (
            <Badge
              className={`absolute left-3 top-3 ${
                product.badge === 'Sale'
                  ? 'bg-destructive text-destructive-foreground'
                  : product.badge === 'Organic'
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-accent text-accent-foreground'
              }`}
            >
              {product.badge}
            </Badge>
          )}

          {!product.inStock && (
            <div className="absolute inset-0 flex items-center justify-center bg-background/80">
              <span className="text-sm font-medium text-muted-foreground">
                Out of Stock
              </span>
            </div>
          )}
        </div>

        <div className="p-4">
          <div className="flex items-start justify-between gap-2">
            <div>
              <p className="text-xs font-medium uppercase tracking-wide text-primary">
                {product.category ?? 'Category'}
              </p>
              <h3 className="mt-1 line-clamp-2 font-medium text-foreground transition-colors group-hover:text-primary">
                {product.name ?? 'Unnamed Product'}
              </h3>
            </div>
          </div>

          <div className="mt-2 flex items-center gap-1">
            <div className="flex items-center">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`h-3.5 w-3.5 ${
                    i < Math.floor(product.rating ?? 0)
                      ? 'fill-accent text-accent'
                      : 'fill-muted text-muted'
                  }`}
                />
              ))}
            </div>
            <span className="text-xs text-muted-foreground">
              ({product.reviews ?? 0})
            </span>
          </div>

          <div className="mt-3 flex items-center justify-between">
            <div className="flex items-baseline gap-2">
              <span className="text-lg font-semibold text-foreground">
                {formatPrice(price)}
              </span>
              {originalPrice > 0 && (
                <span className="text-sm text-muted-foreground line-through">
                  {formatPrice(originalPrice)}
                </span>
              )}
              {discount > 0 && (
                <span className="text-xs font-medium text-destructive">
                  -{discount}%
                </span>
              )}
            </div>

            <Button
              size="icon"
              variant="outline"
              className="h-8 w-8 opacity-0 transition-opacity group-hover:opacity-100"
              onClick={handleAddToCart}
              disabled={!product.inStock}
              aria-label={`Add ${product.name ?? 'Product'} to cart`}
            >
              <ShoppingCart className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </Link>
  )
}