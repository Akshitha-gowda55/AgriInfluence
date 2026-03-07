'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'
import { Button } from '@/components/ui/button'
import { useCartStore } from '@/lib/cart-store'
import { ChevronLeft } from 'lucide-react'
import Link from 'next/link'

export default function CheckoutPage() {
  const router = useRouter()
  const { items, getTotalPrice, clearCart } = useCartStore()

  const [loading, setLoading] = useState(false)

  const subtotal = getTotalPrice()
  const shipping = subtotal > 99 ? 0 : 9.99
  const tax = subtotal * 0.08
  const total = subtotal + shipping + tax

  useEffect(() => {
    if (items.length === 0) router.push('/cart')
  }, [items, router])

  const handleCheckout = async () => {
    try {
      setLoading(true)
      const res = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ items }),
      })
      const data = await res.json()
      if (data.url) {
        window.location.href = data.url
      } else {
        alert('Payment session failed')
      }
    } catch (err) {
      console.error(err)
      alert('Something went wrong')
    }
    setLoading(false)
  }

  if (items.length === 0) return null

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1 bg-muted/30">
        <div className="max-w-6xl mx-auto px-4 py-10">
          <Link href="/cart" className="flex items-center text-sm mb-6">
            <ChevronLeft className="h-4 w-4 mr-1" />
            Back to Cart
          </Link>

          <div className="grid lg:grid-cols-2 gap-10">
            {/* Shipping Form */}
            <div>
              <h2 className="text-2xl font-semibold mb-6">Shipping Information</h2>
              <div className="space-y-4">
                <input placeholder="Full Name" className="w-full border rounded-md p-3" />
                <input placeholder="Email" className="w-full border rounded-md p-3" />
                <input placeholder="Address" className="w-full border rounded-md p-3" />
                <div className="grid grid-cols-2 gap-4">
                  <input placeholder="City" className="border rounded-md p-3" />
                  <input placeholder="Zip Code" className="border rounded-md p-3" />
                </div>
              </div>
              <Button
                className="mt-6 w-full"
                onClick={handleCheckout}
                disabled={loading}
              >
                {loading ? 'Redirecting...' : `Pay $${total.toFixed(2)}`}
              </Button>
            </div>

            {/* Order Summary */}
            <div className="bg-white border rounded-lg p-6">
              <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
              <div className="space-y-3">
                {items.map((item) => (
                  <div key={item.id} className="flex justify-between">
                    <span>{item.name} × {item.quantity}</span>
                    <span>${(item.price * item.quantity).toFixed(2)}</span>
                  </div>
                ))}
              </div>
              <div className="border-t mt-6 pt-6 space-y-2">
                <div className="flex justify-between"><span>Subtotal</span><span>${subtotal.toFixed(2)}</span></div>
                <div className="flex justify-between"><span>Shipping</span><span>{shipping === 0 ? 'Free' : `$${shipping.toFixed(2)}`}</span></div>
                <div className="flex justify-between"><span>Tax</span><span>${tax.toFixed(2)}</span></div>
                <div className="flex justify-between font-bold text-lg pt-3"><span>Total</span><span>${total.toFixed(2)}</span></div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}