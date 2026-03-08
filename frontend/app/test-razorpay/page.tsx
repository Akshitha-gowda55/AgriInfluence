'use client'

import { useState } from 'react'

declare global {
  interface Window {
    Razorpay: any
  }
}

export default function TestRazorpay() {
  const [loading, setLoading] = useState(false)
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

  const handleTestPayment = async () => {
    try {
      if (!razorpayKey) {
        alert('Missing NEXT_PUBLIC_RAZORPAY_KEY_ID')
        return
      }

      setLoading(true)

      const scriptLoaded = await loadRazorpayScript()
      if (!scriptLoaded) {
        alert('Failed to load Razorpay SDK')
        return
      }

      const res = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          items: [
            {
              id: 'test-product',
              name: 'Test Product',
              price: 10,
              quantity: 1,
            },
          ],
          total: 10,
        }),
      })

      const data = await res.json()

      if (!res.ok || !data.success || !data.order) {
        console.error(data)
        alert(data.error || 'Failed to create order')
        return
      }

      const options = {
        key: razorpayKey,
        amount: data.order.amount,
        currency: data.order.currency,
        name: 'AgriInfluence',
        description: 'Test Payment',
        order_id: data.order.id,
        handler: async function (response: any) {
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
            console.error(verifyData)
            alert('Payment verification failed')
            return
          }

          alert(`Payment successful: ${response.razorpay_payment_id}`)
          console.log(response)
        },
        prefill: {
          name: 'Test User',
          email: 'test@example.com',
          contact: '9999999999',
        },
        theme: {
          color: '#16a34a',
        },
      }

      const paymentObject = new window.Razorpay(options)

      paymentObject.on('payment.failed', function (response: any) {
        console.error(response.error)
        alert(response.error?.description || 'Payment failed')
      })

      paymentObject.open()
    } catch (error) {
      console.error(error)
      alert('Something went wrong')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center">
      <button
        onClick={handleTestPayment}
        disabled={loading}
        className="rounded-md bg-green-600 px-6 py-3 text-white hover:bg-green-700 disabled:opacity-60"
      >
        {loading ? 'Processing...' : 'Test Razorpay Payment ₹10'}
      </button>
    </div>
  )
}