import { NextRequest, NextResponse } from 'next/server'
import crypto from 'crypto'
import Razorpay from 'razorpay'

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID!,
  key_secret: process.env.RAZORPAY_KEY_SECRET!,
})

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

    if (!calculatedTotal || calculatedTotal <= 0) {
      return NextResponse.json(
        { error: 'Invalid order total' },
        { status: 400 }
      )
    }

    const order = await razorpay.orders.create({
      amount: Math.round(calculatedTotal * 100), // convert to paise
      currency: 'INR',
      receipt: `receipt_${Date.now()}`,
      notes: {
        source: 'AgriInfluence',
      },
    })

    return NextResponse.json({
      success: true,
      order,
    })
  } catch (error) {
    console.error('Razorpay order creation failed:', error)
    return NextResponse.json(
      { error: 'Razorpay order creation failed' },
      { status: 500 }
    )
  }
}

export async function PUT(req: NextRequest) {
  try {
    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
    } = await req.json()

    if (
      !razorpay_order_id ||
      !razorpay_payment_id ||
      !razorpay_signature
    ) {
      return NextResponse.json(
        { error: 'Missing payment verification fields' },
        { status: 400 }
      )
    }

    const body = `${razorpay_order_id}|${razorpay_payment_id}`

    const expectedSignature = crypto
      .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET!)
      .update(body.toString())
      .digest('hex')

    const isValidSignature = expectedSignature === razorpay_signature

    if (!isValidSignature) {
      return NextResponse.json(
        { error: 'Invalid payment signature', success: false },
        { status: 400 }
      )
    }

    return NextResponse.json({
      success: true,
      message: 'Payment verified successfully',
      orderId: razorpay_order_id,
      paymentId: razorpay_payment_id,
    })
  } catch (error) {
    console.error('Razorpay verification failed:', error)
    return NextResponse.json(
      { error: 'Razorpay verification failed', success: false },
      { status: 500 }
    )
  }
}