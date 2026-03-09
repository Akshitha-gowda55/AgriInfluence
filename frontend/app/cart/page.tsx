'use client'

import Link from 'next/link'
import Image from 'next/image'
import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'
import { Button } from '@/components/ui/button'
import { useCartStore } from '@/lib/cart-store'
import { Minus, Plus, Trash2, ShoppingCart } from 'lucide-react'

export default function CartPage() {
  const { items, removeItem, updateQuantity, getTotalPrice } = useCartStore()

  const subtotal = getTotalPrice()
  const shipping = subtotal > 99 ? 0 : 9.99
  const tax = subtotal * 0.08
  const total = subtotal + shipping + tax

  return (
    <div className="flex min-h-screen flex-col">
      <Header />

      <main className="flex-1 bg-muted/30">
        <div className="mx-auto max-w-6xl px-4 py-10">
          <h1 className="mb-8 flex items-center gap-2 text-3xl font-bold">
            <ShoppingCart className="h-8 w-8" />
            My Cart
          </h1>

          {items.length === 0 ? (
            <div className="rounded-lg border bg-white p-10 text-center shadow-sm">
              <p className="mb-4 text-muted-foreground">Your cart is empty.</p>
              <Button asChild>
                <Link href="/products">Browse Products</Link>
              </Button>
            </div>
          ) : (
            <div className="grid gap-8 lg:grid-cols-3">
              <div className="space-y-4 lg:col-span-2">
                {items.map((item) => (
                  <div
                    key={item.id}
                    className="flex flex-col gap-4 rounded-lg border bg-white p-4 shadow-sm sm:flex-row sm:items-center sm:justify-between"
                  >
                    <div className="flex items-center gap-4">
                      <div className="relative h-20 w-20 overflow-hidden rounded-md border">
                        <Image
                          src={item.image}
                          alt={item.name}
                          fill
                          className="object-cover"
                        />
                      </div>

                      <div>
                        <h2 className="font-semibold">{item.name}</h2>
                        <p className="text-sm text-muted-foreground">
                          ₹{item.price.toFixed(2)}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <div className="flex items-center rounded-md border">
                        <button
                          className="p-2"
                          onClick={() =>
                            updateQuantity(item.id, item.quantity - 1)
                          }
                        >
                          <Minus className="h-4 w-4" />
                        </button>

                        <span className="min-w-[40px] text-center">
                          {item.quantity}
                        </span>

                        <button
                          className="p-2"
                          onClick={() =>
                            updateQuantity(item.id, item.quantity + 1)
                          }
                        >
                          <Plus className="h-4 w-4" />
                        </button>
                      </div>

                      <button
                        className="rounded-md p-2 text-red-600 hover:bg-red-50"
                        onClick={() => removeItem(item.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              <div className="rounded-lg border bg-white p-6 shadow-sm">
                <h2 className="mb-4 text-xl font-semibold">Order Summary</h2>

                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span>₹{subtotal.toFixed(2)}</span>
                  </div>

                  <div className="flex justify-between">
                    <span>Shipping</span>
                    <span>{shipping === 0 ? 'Free' : `₹${shipping.toFixed(2)}`}</span>
                  </div>

                  <div className="flex justify-between">
                    <span>Tax</span>
                    <span>₹{tax.toFixed(2)}</span>
                  </div>

                  <div className="flex justify-between border-t pt-3 text-lg font-bold">
                    <span>Total</span>
                    <span>₹{total.toFixed(2)}</span>
                  </div>
                </div>

                <Button asChild className="mt-6 w-full">
                  <Link href="/checkout">Proceed to Checkout</Link>
                </Button>
              </div>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  )
}