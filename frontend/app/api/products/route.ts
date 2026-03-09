import { NextResponse } from 'next/server'
import { products } from '@/lib/data'

export async function GET() {
  try {
    return NextResponse.json({
      success: true,
      products,
    })
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: 'Failed to fetch products',
      },
      { status: 500 }
    )
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { name, category, price, description, usage, image } = body

    if (!name || !category || !price) {
      return NextResponse.json(
        {
          success: false,
          message: 'Name, category, and price are required',
        },
        { status: 400 }
      )
    }

    const newProduct = {
      id: Date.now().toString(),
      name,
      category,
      price: Number(price),
      description: description || 'New product description',
      usage: usage || 'Use as directed',
      image: image || 'https://via.placeholder.com/400x400?text=Product',
      rating: 0,
      reviews: 0,
      inStock: true,
    }

    return NextResponse.json(
      {
        success: true,
        message: 'Product created successfully',
        product: newProduct,
      },
      { status: 201 }
    )
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: 'Failed to create product',
      },
      { status: 500 }
    )
  }
}