'use client'

import Link from 'next/link'
import Image from 'next/image'
import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useCartStore } from '@/lib/cart-store'
import { formatPrice } from '@/lib/currency'
import {
  Minus,
  Plus,
  Trash2,
  ShoppingBag,
  ArrowRight,
  Tag,
} from 'lucide-react'
import { useEffect, useState } from 'react'

export default function CartPage() {
  const { items, updateQuantity, removeItem, getTotalPrice } = useCartStore()
  const [promoCode, setPromoCode] = useState('')
  const [promoApplied, setPromoApplied] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 flex items-center justify-center">
          <p className="text-muted-foreground">Loading cart...</p>
        </main>
        <Footer />
      </div>
    )
  }

  const subtotal = getTotalPrice()
  const shipping = subtotal > 99 ? 0 : 9.99
  const discount = promoApplied ? subtotal * 0.1 : 0
  const total = subtotal + shipping - discount

  const handleApplyPromo = () => {
    if (promoCode.toLowerCase() === 'agri10') {
      setPromoApplied(true)
    }
  }

  if (items.length === 0) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 flex items-center justify-center">
          <div className="text-center px-4">
            <div className="mx-auto mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-muted">
              <ShoppingBag className="h-12 w-12 text-muted-foreground" />
            </div>
            <h1 className="text-2xl font-bold text-foreground">
              Your cart is empty
            </h1>
            <p className="mt-2 text-muted-foreground">
              Looks like you have not added any products yet.
            </p>
            <Button asChild className="mt-6">
              <Link href="/products">
                Continue Shopping
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </main>
        <Footer />
      </div>
    )
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
          <h1 className="font-serif text-3xl font-bold text-foreground sm:text-4xl">
            Shopping Cart
          </h1>
          <p className="mt-2 text-muted-foreground">
            {items.length} {items.length === 1 ? 'item' : 'items'} in your cart
          </p>

          <div className="mt-8 grid grid-cols-1 gap-8 lg:grid-cols-3">
            <div className="space-y-4 lg:col-span-2">
              {items.map((item) => (
                <div
                  key={String(item.id)}
                  className="flex gap-4 rounded-lg border border-border bg-card p-4"
                >
                  <Link
                    href={`/products/${item.id}`}
                    className="relative h-24 w-24 flex-shrink-0 overflow-hidden rounded-md bg-muted"
                  >
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      className="object-cover"
                    />
                  </Link>

                  <div className="flex flex-1 flex-col">
                    <div className="flex justify-between">
                      <div>
                        <Link
                          href={`/products/${item.id}`}
                          className="font-medium text-foreground transition-colors hover:text-primary"
                        >
                          {item.name}
                        </Link>
                        <p className="mt-1 text-sm capitalize text-primary">
                          {item.category}
                        </p>
                      </div>
                      <p className="font-medium text-foreground">
                        {formatPrice(item.price * item.quantity)}
                      </p>
                    </div>

                    <div className="mt-auto flex items-center justify-between">
                      <div className="flex items-center rounded-md border border-border">
                        <button
                          className="p-2 transition-colors hover:bg-muted"
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          aria-label="Decrease quantity"
                        >
                          <Minus className="h-3 w-3" />
                        </button>
                        <span className="w-8 text-center text-sm">
                          {item.quantity}
                        </span>
                        <button
                          className="p-2 transition-colors hover:bg-muted"
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          aria-label="Increase quantity"
                        >
                          <Plus className="h-3 w-3" />
                        </button>
                      </div>

                      <button
                        onClick={() => removeItem(item.id)}
                        className="text-muted-foreground transition-colors hover:text-destructive"
                        aria-label="Remove item"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="lg:col-span-1">
              <div className="sticky top-24 rounded-lg border border-border bg-card p-6">
                <h2 className="text-lg font-medium text-foreground">
                  Order Summary
                </h2>

                <div className="mt-4">
                  <label className="text-sm text-muted-foreground">
                    Promo Code
                  </label>
                  <div className="mt-1 flex gap-2">
                    <div className="relative flex-1">
                      <Tag className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                      <Input
                        type="text"
                        placeholder="Enter code"
                        value={promoCode}
                        onChange={(e) => setPromoCode(e.target.value)}
                        className="pl-10"
                        disabled={promoApplied}
                      />
                    </div>
                    <Button
                      variant="outline"
                      onClick={handleApplyPromo}
                      disabled={promoApplied || !promoCode}
                    >
                      Apply
                    </Button>
                  </div>
                  {promoApplied && (
                    <p className="mt-1 text-sm text-primary">
                      Code AGRI10 applied! 10% off
                    </p>
                  )}
                  <p className="mt-1 text-xs text-muted-foreground">
                    Try: AGRI10 for 10% off
                  </p>
                </div>

                <div className="mt-6 space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Subtotal</span>
                    <span className="text-foreground">{formatPrice(subtotal)}</span>
                  </div>
                  {discount > 0 && (
                    <div className="flex justify-between text-sm">
                      <span className="text-primary">Discount (10%)</span>
                      <span className="text-primary">
                        -{formatPrice(discount)}
                      </span>
                    </div>
                  )}
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Shipping</span>
                    <span className="text-foreground">
                      {shipping === 0 ? 'Free' : formatPrice(shipping)}
                    </span>
                  </div>
                  {shipping > 0 && (
                    <p className="text-xs text-muted-foreground">
                      Free shipping on orders over ₹99
                    </p>
                  )}
                  <div className="border-t border-border pt-3">
                    <div className="flex justify-between">
                      <span className="font-medium text-foreground">Total</span>
                      <span className="text-lg font-bold text-foreground">
                        {formatPrice(total)}
                      </span>
                    </div>
                  </div>
                </div>

                <Button asChild className="mt-6 w-full" size="lg">
                  <Link href="/checkout">
                    Proceed to Checkout
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>

                <Button asChild variant="ghost" className="mt-2 w-full">
                  <Link href="/products">Continue Shopping</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}