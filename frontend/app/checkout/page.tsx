'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { ChevronLeft } from 'lucide-react'
import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'
import { useCartStore } from '@/lib/cart-store'
import { PayPalScriptProvider, PayPalButtons } from '@paypal/react-paypal-js'

export default function CheckoutPage() {
  const router = useRouter()
  const { items, getTotalPrice, clearCart } = useCartStore()

  const subtotal = getTotalPrice()
  const shipping = subtotal > 99 ? 0 : 9.99
  const tax = subtotal * 0.08
  const total = subtotal + shipping + tax

  useEffect(() => {
    if (items.length === 0) router.push('/cart')
  }, [items, router])

  if (items.length === 0) return null

  const clientId = process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID || ''

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
            <div>
              <h2 className="text-2xl font-semibold mb-6">Payment</h2>

              {clientId ? (
                <PayPalScriptProvider
                  options={{
                    clientId,
                    currency: 'USD',
                    intent: 'capture',
                  }}
                >
                  <PayPalButtons
                    style={{ layout: 'vertical' }}
                    createOrder={async () => {
                      const res = await fetch('/api/checkout', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ items, total }),
                      })

                      if (!res.ok) {
                        throw new Error('Failed to create PayPal order')
                      }

                      const data = await res.json()

                      if (!data.orderID) {
                        throw new Error('No PayPal order ID returned')
                      }

                      return data.orderID
                    }}
                    onApprove={async (_data, actions) => {
                      const details = await actions?.order?.capture()

                      console.log(details)
                      clearCart()

                      const orderId =
                        details?.id ||
                        details?.purchase_units?.[0]?.payments?.captures?.[0]?.id

                      router.push(orderId ? `/success?orderId=${orderId}` : '/success')
                    }}
                    onError={(err) => {
                      console.error('PayPal payment error:', err)
                      alert('Payment failed')
                    }}
                    onCancel={() => {
                      alert('Payment cancelled')
                    }}
                  />
                </PayPalScriptProvider>
              ) : (
                <p className="text-sm text-red-500">
                  PayPal Client ID is missing. Add{' '}
                  <code>NEXT_PUBLIC_PAYPAL_CLIENT_ID</code> in Vercel and local env.
                </p>
              )}
            </div>

            <div className="bg-white border rounded-lg p-6">
              <h2 className="text-xl font-semibold mb-4">Order Summary</h2>

              <div className="space-y-3">
                {items.map((item) => (
                  <div key={String(item.id)} className="flex justify-between">
                    <span>
                      {item.name} × {item.quantity}
                    </span>
                    <span>${(item.price * item.quantity).toFixed(2)}</span>
                  </div>
                ))}
              </div>

              <div className="border-t mt-6 pt-6 space-y-2">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>

                <div className="flex justify-between">
                  <span>Shipping</span>
                  <span>{shipping === 0 ? 'Free' : `$${shipping.toFixed(2)}`}</span>
                </div>

                <div className="flex justify-between">
                  <span>Tax</span>
                  <span>${tax.toFixed(2)}</span>
                </div>

                <div className="flex justify-between font-bold text-lg pt-3">
                  <span>Total</span>
                  <span>${total.toFixed(2)}</span>
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