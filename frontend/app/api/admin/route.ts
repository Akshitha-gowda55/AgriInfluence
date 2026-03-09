import { NextResponse } from 'next/server'
import { productReviews } from '@/lib/data'
import type { Review } from '@/types'

const reviews: Review[] = [...productReviews]

export async function GET() {
  try {
    return NextResponse.json({
      success: true,
      reviews,
    })
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: 'Failed to fetch reviews',
      },
      { status: 500 }
    )
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { author, rating, comment, verified } = body

    if (!author || !comment || typeof rating !== 'number') {
      return NextResponse.json(
        {
          success: false,
          message: 'author, rating, and comment are required',
        },
        { status: 400 }
      )
    }

    if (rating < 1 || rating > 5) {
      return NextResponse.json(
        {
          success: false,
          message: 'Rating must be between 1 and 5',
        },
        { status: 400 }
      )
    }

    const newReview: Review = {
      id: Date.now().toString(),
      author,
      rating,
      comment,
      date: new Date().toISOString(),
      verified: Boolean(verified),
    }

    reviews.unshift(newReview)

    return NextResponse.json(
      {
        success: true,
        message: 'Review added successfully',
        review: newReview,
      },
      { status: 201 }
    )
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: 'Failed to add review',
      },
      { status: 500 }
    )
  }
}