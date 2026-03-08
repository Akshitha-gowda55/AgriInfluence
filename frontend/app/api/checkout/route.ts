import { NextRequest, NextResponse } from 'next/server'

const PAYPAL_CLIENT_ID = process.env.PAYPAL_CLIENT_ID!
const PAYPAL_SECRET = process.env.PAYPAL_SECRET!
const PAYPAL_BASE =
  process.env.PAYPAL_BASE || 'https://api-m.sandbox.paypal.com'

async function getPayPalAccessToken() {
  const auth = Buffer.from(`${PAYPAL_CLIENT_ID}:${PAYPAL_SECRET}`).toString('base64')

  const response = await fetch(`${PAYPAL_BASE}/v1/oauth2/token`, {
    method: 'POST',
    headers: {
      Authorization: `Basic ${auth}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: 'grant_type=client_credentials',
  })

  const data = await response.json()

  if (!response.ok || !data.access_token) {
    console.error('PayPal access token error:', data)
    throw new Error('Failed to generate PayPal access token')
  }

  return data.access_token as string
}

export async function POST(req: NextRequest) {
  try {
    const { items, total } = await req.json()

    if (!items || items.length === 0) {
      return NextResponse.json({ error: 'Cart is empty' }, { status: 400 })
    }

    const calculatedTotal =
      typeof total === 'number'
        ? total
        : items.reduce(
            (sum: number, item: any) =>
              sum + Number(item.price) * Number(item.quantity),
            0
          )

    const accessToken = await getPayPalAccessToken()

    const response = await fetch(`${PAYPAL_BASE}/v2/checkout/orders`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify({
        intent: 'CAPTURE',
        purchase_units: [
          {
            amount: {
              currency_code: 'USD',
              value: calculatedTotal.toFixed(2),
            },
            description: 'AgriInfluence Order',
          },
        ],
      }),
    })

    const data = await response.json()

    if (!response.ok || !data.id) {
      console.error('PayPal create order error:', data)
      return NextResponse.json(
        { error: 'Failed to create PayPal order', details: data },
        { status: 500 }
      )
    }

    return NextResponse.json({ orderID: data.id })
  } catch (error) {
    console.error('PayPal checkout failed:', error)
    return NextResponse.json(
      { error: 'PayPal checkout failed' },
      { status: 500 }
    )
  }
}

export async function PUT(req: NextRequest) {
  try {
    const { orderID } = await req.json()

    if (!orderID) {
      return NextResponse.json({ error: 'Order ID is required' }, { status: 400 })
    }

    const accessToken = await getPayPalAccessToken()

    const response = await fetch(
      `${PAYPAL_BASE}/v2/checkout/orders/${orderID}/capture`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
      }
    )

    const data = await response.json()

    if (!response.ok) {
      console.error('PayPal capture error:', data)
      return NextResponse.json(
        { error: 'Failed to capture PayPal order', details: data },
        { status: 500 }
      )
    }

    return NextResponse.json(data)
  } catch (error) {
    console.error('PayPal capture failed:', error)
    return NextResponse.json(
      { error: 'PayPal capture failed' },
      { status: 500 }
    )
  }
}