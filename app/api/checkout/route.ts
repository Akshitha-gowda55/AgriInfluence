import { NextRequest, NextResponse } from 'next/server'

const PAYPAL_CLIENT_ID = process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID!
const PAYPAL_SECRET = process.env.PAYPAL_SECRET!
const PAYPAL_BASE = process.env.PAYPAL_BASE || 'https://api-m.sandbox.paypal.com'

// Generate Base64 for basic auth
const auth = Buffer.from(`${PAYPAL_CLIENT_ID}:${PAYPAL_SECRET}`).toString('base64')

export async function POST(req: NextRequest) {
  try {
    const { items } = await req.json()
    if (!items || items.length === 0) {
      return NextResponse.json({ error: 'Cart is empty' }, { status: 400 })
    }

    // Calculate total amount
    const total = items.reduce((sum: number, item: any) => sum + item.price * item.quantity, 0)

    // Create order in PayPal
    const res = await fetch(`${PAYPAL_BASE}/v2/checkout/orders`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Basic ${auth}`,
      },
      body: JSON.stringify({
        intent: 'CAPTURE',
        purchase_units: [
          {
            amount: {
              currency_code: 'INR',
              value: total.toFixed(2),
            },
          },
        ],
      }),
    })

    const data = await res.json()

    if (!data.id) {
      console.error(data)
      return NextResponse.json({ error: 'Failed to create PayPal order' }, { status: 500 })
    }

    return NextResponse.json({ orderID: data.id })
  } catch (err) {
    console.error(err)
    return NextResponse.json({ error: 'PayPal checkout failed' }, { status: 500 })
  }
}