import { NextResponse } from 'next/server'

export async function GET() {
  try {
    return NextResponse.json({
      success: true,
      message: 'Admin API is working',
      data: {
        totalUsers: 120,
        totalOrders: 54,
        totalProducts: 8,
        totalRevenue: 12540,
      },
    })
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: 'Failed to load admin data',
      },
      { status: 500 }
    )
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json()

    const { action } = body

    if (!action) {
      return NextResponse.json(
        {
          success: false,
          message: 'Admin action required',
        },
        { status: 400 }
      )
    }

    return NextResponse.json({
      success: true,
      message: `Admin action "${action}" executed`,
    })
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: 'Admin operation failed',
      },
      { status: 500 }
    )
  }
}