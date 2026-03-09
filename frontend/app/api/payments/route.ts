import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const { items, total } = body

    if (!items || !total) {
      return NextResponse.json(
        { success: false, message: 'Invalid payment request' },
        { status: 400 }
      )
    }

    const key = process.env.RAZORPAY_KEY_ID
    const secret = process.env.RAZORPAY_KEY_SECRET

    if (!key || !secret) {
      return NextResponse.json(
        { success: false, message: 'Razorpay keys missing in env' },
        { status: 500 }
      )
    }

    const auth = Buffer.from(`${key}:${secret}`).toString('base64')

    const orderResponse = await fetch('https://api.razorpay.com/v1/orders', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Basic ${auth}`,
      },
      body: JSON.stringify({
        amount: Math.round(total * 100), // paise
        currency: 'INR',
        receipt: `order_${Date.now()}`,
      }),
    })

    const order = await orderResponse.json()

    if (!orderResponse.ok) {
      return NextResponse.json(
        { success: false, error: order },
        { status: 500 }
      )
    }

    return NextResponse.json({
      success: true,
      order,
    })
  } catch (error) {
    console.error(error)

    return NextResponse.json(
      { success: false, message: 'Payment initialization failed' },
      { status: 500 }
    )
  }
}