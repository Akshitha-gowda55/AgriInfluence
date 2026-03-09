'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { ChevronLeft } from 'lucide-react'
import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'
import { useCartStore } from '@/lib/cart-store'

declare global {
  interface Window {
    Razorpay: any
  }
}

export default function CheckoutClient() {
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

  const loadRazorpayScript = (): Promise<boolean> => {
    return new Promise((resolve) => {
      if (document.getElementById('razorpay-script')) {
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
        alert('Razorpay Key ID is missing. Add NEXT_PUBLIC_RAZORPAY_KEY_ID in .env.local')
        return
      }

      setIsLoading(true)

      const scriptLoaded = await loadRazorpayScript()
      if (!scriptLoaded) {
        alert('Razorpay SDK failed to load.')
        return
      }

      const res = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
  items,
  total: Math.round(total * 100),
}),
      })

      const data = await res.json()

      if (!res.ok || !data.success || !data.order) {
        console.error('Razorpay order creation failed:', data)
        alert(data.error || 'Failed to create Razorpay order')
        return
      }

      const options = {
        key: razorpayKey,
        amount: data.order.amount,
        currency: data.order.currency,
        name: 'AgriInfluence',
        description: 'Order Payment',
        order_id: data.order.id,
        handler: async function (response: any) {
          try {
            const verifyRes = await fetch('/api/checkout', {
              method: 'PUT',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                razorpay_order_id: response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature,
              }),
            })

            const verifyData = await verifyRes.json()

            if (!verifyRes.ok || !verifyData.success) {
              console.error('Payment verification failed:', verifyData)
              alert(verifyData.error || 'Payment verification failed')
              return
            }

            clearCart()
            router.push(`/success?orderId=${response.razorpay_payment_id}`)
          } catch (error) {
            console.error('Verification error:', error)
            alert('Payment succeeded, but verification failed.')
          }
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
          ondismiss: function () {
            console.log('Razorpay payment cancelled')
          },
        },
      }

      const paymentObject = new window.Razorpay(options)

      paymentObject.on('payment.failed', function (response: any) {
        console.error('Razorpay payment failed:', response.error)
        alert(response.error?.description || 'Payment failed')
      })

      paymentObject.open()
    } catch (error) {
      console.error('Razorpay error:', error)
      alert('Something went wrong while starting payment.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1 bg-muted/30">
        <div className="max-w-6xl mx-auto px-4 py-10">
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
                  className="w-full rounded-md bg-green-600 px-6 py-3 text-white font-medium hover:bg-green-700 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {isLoading ? 'Processing...' : `Pay Now ₹${total.toFixed(2)}`}
                </button>
              ) : (
                <p className="text-sm text-red-500">
                  Razorpay Key ID is missing. Add <code>NEXT_PUBLIC_RAZORPAY_KEY_ID</code>.
                </p>
              )}
            </div>

            <div className="rounded-lg border bg-white p-6">
              <h2 className="mb-4 text-xl font-semibold">Order Summary</h2>

              <div className="space-y-3">
                {items.map((item) => (
                  <div key={String(item.id)} className="flex justify-between">
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

      <Footer />
    </div>
  )
}
