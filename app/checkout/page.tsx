'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { ChevronLeft } from 'lucide-react'
import { useCartStore } from '@/lib/cart-store'

declare global {
  interface Window {
    Razorpay: any
  }
}

export default function CheckoutPage() {
  const router = useRouter()
  const { items, getTotalPrice, clearCart } = useCartStore()
  const [isLoading, setIsLoading] = useState(false)

  const subtotal = getTotalPrice()
  const shipping = subtotal > 99 ? 0 : 9.99
  const tax = subtotal * 0.08
  const total = subtotal + shipping + tax

  useEffect(() => {
    if (items.length === 0) {
      router.push('/cart')
    }
  }, [items, router])

  if (items.length === 0) return null

  const razorpayKey = process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID || ''

  const loadRazorpayScript = async (): Promise<boolean> => {
    return new Promise((resolve) => {
      const existingScript = document.getElementById('razorpay-script')
      if (existingScript) {
        resolve(true)
        return
      }

      const script = document.createElement('script')
      script.id = 'razorpay-script'
      script.src = 'https://checkout.razorpay.com/v1/checkout.js'
      script.async = true
      script.onload = () => resolve(true)
      script.onerror = () => resolve(false)

      document.body.appendChild(script)
    })
  }

  const handleRazorpayPayment = async () => {
    try {
      if (!razorpayKey) {
        alert('Add NEXT_PUBLIC_RAZORPAY_KEY_ID in .env.local')
        return
      }

      setIsLoading(true)

      const scriptLoaded = await loadRazorpayScript()
      if (!scriptLoaded) {
        alert('Razorpay SDK failed to load.')
        return
      }

      const res = await fetch('/api/payments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ items, total }),
      })

      const data = await res.json()

      if (!res.ok || !data.success || !data.order) {
        alert(data.message || 'Failed to create Razorpay order')
        return
      }

      const options = {
        key: razorpayKey,
        amount: data.order.amount,
        currency: data.order.currency,
        name: 'AgriInfluence',
        description: 'Order Payment',
        order_id: data.order.id,
        handler: async (response: any) => {
          const existingOrders = JSON.parse(localStorage.getItem('orders') || '[]')

          const newOrder = {
            id: response.razorpay_payment_id,
            items,
            total,
            date: new Date().toISOString(),
            status: 'Paid',
          }

          localStorage.setItem('orders', JSON.stringify([newOrder, ...existingOrders]))
          clearCart()
          router.push(`/success?orderId=${response.razorpay_payment_id}`)
        },
        prefill: {
          name: 'Customer',
          email: 'customer@example.com',
          contact: '9999999999',
        },
        theme: {
          color: '#16a34a',
        },
        modal: {
          ondismiss: () => router.push('/failure'),
        },
      }

      const paymentObject = new window.Razorpay(options)

      paymentObject.on('payment.failed', () => {
        router.push('/failure')
      })

      paymentObject.open()
    } catch (error) {
      console.error(error)
      alert('Something went wrong while starting payment.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <main className="min-h-screen bg-muted/30">
      <div className="mx-auto max-w-6xl px-4 py-10">
        <Link href="/cart" className="mb-6 flex items-center text-sm">
          <ChevronLeft className="mr-1 h-4 w-4" />
          Back to Cart
        </Link>

        <div className="grid gap-10 lg:grid-cols-2">
          <div>
            <h2 className="mb-6 text-2xl font-semibold">Payment</h2>

            {razorpayKey ? (
              <button
                onClick={handleRazorpayPayment}
                disabled={isLoading}
                className="w-full rounded-md bg-green-600 px-6 py-3 font-medium text-white hover:bg-green-700 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {isLoading ? 'Processing...' : `Pay Now ₹${total.toFixed(2)}`}
              </button>
            ) : (
              <p className="text-sm text-red-500">
                Razorpay Key ID is missing.
              </p>
            )}
          </div>

          <div className="rounded-lg border bg-white p-6">
            <h2 className="mb-4 text-xl font-semibold">Order Summary</h2>

            <div className="space-y-3">
              {items.map((item) => (
                <div key={item.id} className="flex justify-between">
                  <span>
                    {item.name} × {item.quantity}
                  </span>
                  <span>₹{(item.price * item.quantity).toFixed(2)}</span>
                </div>
              ))}
            </div>

            <div className="mt-6 space-y-2 border-t pt-6">
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

              <div className="flex justify-between pt-3 text-lg font-bold">
                <span>Total</span>
                <span>₹{total.toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}