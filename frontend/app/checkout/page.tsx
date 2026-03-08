'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { ChevronLeft } from 'lucide-react'
import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'
import { useCartStore } from '@/lib/cart-store'
import { PayPalButtons, PayPalScriptProvider } from '@paypal/react-paypal-js'

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
          <Link href="/cart" className="mb-6 flex items-center text-sm">
            <ChevronLeft className="mr-1 h-4 w-4" />
            Back to Cart
          </Link>

          <div className="grid gap-10 lg:grid-cols-2">
            <div>
              <h2 className="mb-6 text-2xl font-semibold">Payment</h2>

              {clientId ? (
                <PayPalScriptProvider
                  options={{
                    clientId,
                    currency: 'USD',
                    intent: 'capture',
                    disableFunding: 'card',
                  }}
                >
                  <PayPalButtons
                    style={{
                      layout: 'vertical',
                      color: 'gold',
                      shape: 'rect',
                      label: 'paypal',
                    }}
                    createOrder={async () => {
                      const res = await fetch('/api/checkout', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ items, total }),
                      })

                      const data = await res.json()

                      if (!res.ok || !data.orderID) {
                        console.error('Create order failed:', data)
                        throw new Error('Failed to create PayPal order')
                      }

                      return data.orderID
                    }}
                    onApprove={async (data) => {
                      const res = await fetch('/api/checkout', {
                        method: 'PUT',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ orderID: data.orderID }),
                      })

                      const details = await res.json()

                      if (!res.ok) {
                        console.error('Capture failed:', details)
                        throw new Error('Failed to capture PayPal payment')
                      }

                      clearCart()

                      const orderId =
                        details?.id ||
                        details?.purchase_units?.[0]?.payments?.captures?.[0]?.id ||
                        data.orderID

                      router.push(orderId ? `/success?orderId=${orderId}` : '/success')
                    }}
                    onError={(err) => {
                      console.error('PayPal payment error:', err)
                      alert('Payment failed')
                    }}
                    onCancel={() => {
                      console.log('PayPal payment cancelled')
                    }}
                  />
                </PayPalScriptProvider>
              ) : (
                <p className="text-sm text-red-500">
                  PayPal Client ID is missing. Add{' '}
                  <code>NEXT_PUBLIC_PAYPAL_CLIENT_ID</code>.
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
                    <span>${(item.price * item.quantity).toFixed(2)}</span>
                  </div>
                ))}
              </div>

              <div className="mt-6 space-y-2 border-t pt-6">
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

                <div className="flex justify-between pt-3 text-lg font-bold">
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