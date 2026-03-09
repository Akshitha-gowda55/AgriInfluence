import { NextResponse } from 'next/server'

type OrderItem = {
  id: string
  name: string
  price: number
  quantity: number
}

type Order = {
  id: string
  items: OrderItem[]
  total: number
  date: string
  status: string
}

const orders: Order[] = []

export async function GET() {
  try {
    return NextResponse.json({
      success: true,
      orders,
    })
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: 'Failed to fetch orders',
      },
      { status: 500 }
    )
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { items, total, status } = body

    if (!items || !Array.isArray(items) || items.length === 0) {
      return NextResponse.json(
        {
          success: false,
          message: 'Order items are required',
        },
        { status: 400 }
      )
    }

    if (typeof total !== 'number') {
      return NextResponse.json(
        {
          success: false,
          message: 'Valid order total is required',
        },
        { status: 400 }
      )
    }

    const newOrder: Order = {
      id: `ORD-${Date.now()}`,
      items,
      total,
      date: new Date().toISOString(),
      status: status || 'Paid',
    }

    orders.push(newOrder)

    return NextResponse.json(
      {
        success: true,
        message: 'Order created successfully',
        order: newOrder,
      },
      { status: 201 }
    )
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: 'Failed to create order',
      },
      { status: 500 }
    )
  }
}