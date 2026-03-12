'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { notFound } from 'next/navigation'
import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'
import ProductCard from '@/components/products/product-card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { products, productReviews } from '@/lib/data'
import { useCartStore } from '@/lib/cart-store'
import {
  Star,
  ShoppingCart,
  Truck,
  Shield,
  Leaf,
  ChevronRight,
  Minus,
  Plus,
  Check,
} from 'lucide-react'

interface ProductPageProps {
  params: { id: string }
}

export default function ProductPage({ params }: ProductPageProps) {
  const { id } = params
  const product = products.find((p) => p.id === id)

  const [quantity, setQuantity] = useState(1)
  const [addedToCart, setAddedToCart] = useState(false)

  const addToCart = useCartStore((state) => state.addToCart)

  if (!product) {
    notFound()
  }

  const relatedProducts = products
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 4)

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      addToCart(product)
    }
    setAddedToCart(true)
    setTimeout(() => setAddedToCart(false), 2000)
  }

  const discount = product.originalPrice
    ? Math.round((1 - product.price / product.originalPrice) * 100)
    : 0

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1">
        <div className="bg-muted/50 border-b border-border">
          <div className="mx-auto max-w-7xl px-4 py-3 sm:px-6 lg:px-8">
            <nav className="flex items-center gap-2 text-sm">
              <Link
                href="/"
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                Home
              </Link>
              <ChevronRight className="h-4 w-4 text-muted-foreground" />
              <Link
                href="/products"
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                Products
              </Link>
              <ChevronRight className="h-4 w-4 text-muted-foreground" />
              <span className="text-foreground font-medium truncate">
                {product.name}
              </span>
            </nav>
          </div>
        </div>

        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-12">
            <div className="relative">
              <div className="relative aspect-square overflow-hidden rounded-xl bg-muted">
                <Image
                  src={product.image ?? '/placeholder.jpg'}
                  alt={product.name}
                  fill
                  className="object-cover"
                  priority
                />
              </div>

              {product.badge && (
                <Badge
                  className={`absolute top-4 left-4 ${
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
            </div>

            <div>
              <p className="text-sm font-medium text-primary uppercase tracking-wide">
                {product.category}
              </p>

              <h1 className="mt-2 font-serif text-3xl font-bold text-foreground sm:text-4xl">
                {product.name}
              </h1>

              <div className="mt-4 flex items-center gap-2">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`h-5 w-5 ${
                        i < Math.floor(product.rating)
                          ? 'fill-accent text-accent'
                          : 'fill-muted text-muted'
                      }`}
                    />
                  ))}
                </div>

                <span className="text-sm font-medium text-foreground">
                  {product.rating}
                </span>

                <span className="text-sm text-muted-foreground">
                  ({product.reviews ?? 0} reviews)
                </span>
              </div>

              <div className="mt-6 flex items-baseline gap-3">
                <span className="text-3xl font-bold text-foreground">
                  ₹{product.price.toFixed(2)}
                </span>

                {product.originalPrice && (
                  <>
                    <span className="text-xl text-muted-foreground line-through">
                      ₹{product.originalPrice.toFixed(2)}
                    </span>
                    <Badge variant="destructive">-{discount}%</Badge>
                  </>
                )}
              </div>

              <p className="mt-6 text-muted-foreground leading-relaxed">
                {product.description}
              </p>

              <div className="mt-6">
                {product.inStock ? (
                  <div className="flex items-center gap-2 text-primary">
                    <Check className="h-5 w-5" />
                    <span className="font-medium">In Stock</span>
                  </div>
                ) : (
                  <span className="text-destructive font-medium">
                    Out of Stock
                  </span>
                )}
              </div>

              <div className="mt-6 flex flex-col gap-4 sm:flex-row">
                <div className="flex items-center border border-border rounded-lg">
                  <button
                    type="button"
                    className="p-3 hover:bg-muted transition-colors"
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    aria-label="Decrease quantity"
                  >
                    <Minus className="h-4 w-4" />
                  </button>

                  <span className="w-12 text-center font-medium">
                    {quantity}
                  </span>

                  <button
                    type="button"
                    className="p-3 hover:bg-muted transition-colors"
                    onClick={() => setQuantity(quantity + 1)}
                    aria-label="Increase quantity"
                  >
                    <Plus className="h-4 w-4" />
                  </button>
                </div>

                <Button
                  size="lg"
                  className="flex-1"
                  onClick={handleAddToCart}
                  disabled={!product.inStock}
                >
                  {addedToCart ? (
                    <>
                      <Check className="mr-2 h-5 w-5" />
                      Added to Cart
                    </>
                  ) : (
                    <>
                      <ShoppingCart className="mr-2 h-5 w-5" />
                      Add to Cart
                    </>
                  )}
                </Button>
              </div>

              <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-3">
                {[
                  { icon: Truck, text: 'Free shipping over $99' },
                  { icon: Shield, text: '30-day returns' },
                  { icon: Leaf, text: 'Eco-friendly' },
                ].map((feature) => (
                  <div
                    key={feature.text}
                    className="flex items-center gap-2 text-sm text-muted-foreground"
                  >
                    <feature.icon className="h-4 w-4 text-primary" />
                    <span>{feature.text}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-16">
            <Tabs defaultValue="usage" className="w-full">
              <TabsList className="w-full justify-start border-b bg-transparent p-0">
                <TabsTrigger
                  value="usage"
                  className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent"
                >
                  Usage Instructions
                </TabsTrigger>

                <TabsTrigger
                  value="reviews"
                  className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent"
                >
                  Reviews ({product.reviews ?? 0})
                </TabsTrigger>
              </TabsList>

              <TabsContent value="usage" className="mt-6">
                <div className="prose prose-neutral max-w-none">
                  <h3 className="text-lg font-medium text-foreground">
                    How to Use
                  </h3>

                  <p className="mt-4 text-muted-foreground leading-relaxed">
                    {product.usage ?? 'Use as directed.'}
                  </p>

                  <h4 className="mt-6 font-medium text-foreground">
                    Important Notes:
                  </h4>

                  <ul className="mt-2 space-y-2 text-muted-foreground">
                    <li>Store in a cool, dry place away from direct sunlight</li>
                    <li>Keep out of reach of children and pets</li>
                    <li>Wear protective gloves during application</li>
                    <li>Follow all safety guidelines on the product label</li>
                  </ul>
                </div>
              </TabsContent>

              <TabsContent value="reviews" className="mt-6">
                <div className="space-y-6">
                  {productReviews.map((review) => (
                    <div
                      key={review.id}
                      className="border-b border-border pb-6 last:border-0"
                    >
                      <div className="flex items-start justify-between">
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="font-medium text-foreground">
                              {review.author ?? 'Anonymous'}
                            </span>

                            {review.verified && (
                              <Badge variant="secondary" className="text-xs">
                                Verified Purchase
                              </Badge>
                            )}
                          </div>

                          <div className="mt-1 flex items-center gap-1">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                className={`h-4 w-4 ${
                                  i < review.rating
                                    ? 'fill-accent text-accent'
                                    : 'fill-muted text-muted'
                                }`}
                              />
                            ))}
                          </div>
                        </div>

                        <span className="text-sm text-muted-foreground">
                          {new Date(review.date ?? '').toLocaleDateString()}
                        </span>
                      </div>

                      <p className="mt-3 text-muted-foreground">
                        {review.comment}
                      </p>
                    </div>
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          </div>

          {relatedProducts.length > 0 && (
            <div className="mt-16">
              <h2 className="font-serif text-2xl font-bold text-foreground">
                Related Products
              </h2>

              <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
                {relatedProducts.map((relatedProduct) => (
                  <ProductCard
                    key={relatedProduct.id}
                    product={relatedProduct}
                  />
                ))}
              </div>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  )
}