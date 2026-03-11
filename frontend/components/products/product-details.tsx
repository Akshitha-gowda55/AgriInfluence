'use client'

import { useState } from 'react'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { useCartStore } from '@/lib/cart-store'
import type { Product } from '@/types'
import { Minus, Plus, ShoppingCart, Star } from 'lucide-react'

interface ProductDetailsProps {
  product: Product
}

export function ProductDetails({ product }: ProductDetailsProps) {
  const addItem = useCartStore((state) => state.addItem)
  const [quantity, setQuantity] = useState(1)

  const handleAddToCart = () => {
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      quantity,
    })
  }

  return (
    <div className="grid gap-10 lg:grid-cols-2">
      <div className="relative aspect-square overflow-hidden rounded-xl border bg-white">
        <Image
          src={product.image}
          alt={product.name}
          fill
          className="object-cover"
          priority
        />
        {product.badge && (
          <Badge className="absolute left-4 top-4">
            {product.badge}
          </Badge>
        )}
      </div>

      <div>
        <p className="text-sm font-medium uppercase tracking-wide text-green-700">
          {product.category}
        </p>

        <h1 className="mt-2 text-3xl font-bold text-gray-900">
          {product.name}
        </h1>

        <div className="mt-4 flex items-center gap-2">
          <div className="flex items-center gap-1">
            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
            <span className="font-medium">{product.rating}</span>
          </div>
          <span className="text-sm text-gray-500">
            ({product.reviews} reviews)
          </span>
        </div>

        <div className="mt-5 flex items-center gap-3">
          <span className="text-3xl font-bold text-gray-900">
            ₹{product.price.toFixed(2)}
          </span>

          {product.originalPrice && (
            <span className="text-lg text-gray-500 line-through">
              ₹{product.originalPrice.toFixed(2)}
            </span>
          )}
        </div>

        <p className="mt-6 leading-7 text-gray-600">
          {product.description}
        </p>

        <div className="mt-6">
          <h2 className="mb-2 text-lg font-semibold text-gray-900">
            Usage Instructions
          </h2>
          <p className="leading-7 text-gray-600">{product.usage}</p>
        </div>

        <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center">
          <div className="flex w-fit items-center rounded-lg border">
            <button
              type="button"
              onClick={() => setQuantity((prev) => Math.max(1, prev - 1))}
              className="p-3"
              aria-label="Decrease quantity"
            >
              <Minus className="h-4 w-4" />
            </button>

            <span className="min-w-[48px] text-center font-medium">
              {quantity}
            </span>

            <button
              type="button"
              onClick={() => setQuantity((prev) => prev + 1)}
              className="p-3"
              aria-label="Increase quantity"
            >
              <Plus className="h-4 w-4" />
            </button>
          </div>

          <Button
            onClick={handleAddToCart}
            disabled={!product.inStock}
            className="sm:min-w-[220px]"
          >
            <ShoppingCart className="mr-2 h-4 w-4" />
            {product.inStock ? 'Add to Cart' : 'Out of Stock'}
          </Button>
        </div>

        <div className="mt-6">
          <span
            className={`inline-flex rounded-full px-3 py-1 text-sm font-medium ${
              product.inStock
                ? 'bg-green-100 text-green-700'
                : 'bg-red-100 text-red-700'
            }`}
          >
            {product.inStock ? 'In Stock' : 'Out of Stock'}
          </span>
        </div>
      </div>
    </div>
  )
}