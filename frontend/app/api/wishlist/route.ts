import { NextResponse } from 'next/server'
import type { WishlistItem } from '@/types'

const wishlistItems: WishlistItem[] = []

export async function GET() {
  try {
    return NextResponse.json({
      success: true,
      items: wishlistItems,
    })
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: 'Failed to fetch wishlist',
      },
      { status: 500 }
    )
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { id, name, price, image } = body

    if (!id || !name || typeof price !== 'number' || !image) {
      return NextResponse.json(
        {
          success: false,
          message: 'id, name, price, and image are required',
        },
        { status: 400 }
      )
    }

    const existingItem = wishlistItems.find((item) => item.id === id)

    if (existingItem) {
      return NextResponse.json(
        {
          success: false,
          message: 'Item already exists in wishlist',
        },
        { status: 409 }
      )
    }

    const newItem: WishlistItem = {
      id,
      name,
      price,
      image,
    }

    wishlistItems.push(newItem)

    return NextResponse.json(
      {
        success: true,
        message: 'Item added to wishlist',
        item: newItem,
      },
      { status: 201 }
    )
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: 'Failed to add item to wishlist',
      },
      { status: 500 }
    )
  }
}

export async function DELETE(request: Request) {
  try {
    const body = await request.json()
    const { id } = body

    if (!id) {
      return NextResponse.json(
        {
          success: false,
          message: 'Wishlist item id is required',
        },
        { status: 400 }
      )
    }

    const index = wishlistItems.findIndex((item) => item.id === id)

    if (index === -1) {
      return NextResponse.json(
        {
          success: false,
          message: 'Wishlist item not found',
        },
        { status: 404 }
      )
    }

    const removedItem = wishlistItems.splice(index, 1)[0]

    return NextResponse.json({
      success: true,
      message: 'Item removed from wishlist',
      item: removedItem,
    })
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: 'Failed to remove wishlist item',
      },
      { status: 500 }
    )
  }
}