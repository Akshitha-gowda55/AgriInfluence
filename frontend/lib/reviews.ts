// lib/reviews.ts

import { Review } from '@/types'

export const sampleReviews: Review[] = [
  {
    id: 'rev_1',
    userId: 'user_1',
    userName: 'Ramesh Kumar',
    rating: 5,
    comment:
      'Very good product. I used it for my tomato crop and saw healthier growth within a short time.',
    createdAt: '2026-02-12T10:30:00.000Z',
  },
  {
    id: 'rev_2',
    userId: 'user_2',
    userName: 'Suresh Patil',
    rating: 4,
    comment:
      'Packaging was good and delivery was on time. Product quality also looks reliable.',
    createdAt: '2026-02-18T08:15:00.000Z',
  },
  {
    id: 'rev_3',
    userId: 'user_3',
    userName: 'Anitha Gowda',
    rating: 5,
    comment:
      'One of the better agri products I have purchased online. Worth the price.',
    createdAt: '2026-02-24T14:45:00.000Z',
  },
  {
    id: 'rev_4',
    userId: 'user_4',
    userName: 'Mahesh R',
    rating: 3,
    comment:
      'Product is okay. Results were decent, but instructions could have been clearer.',
    createdAt: '2026-03-01T11:20:00.000Z',
  },
]

export function calculateAverageRating(reviews: Review[]): number {
  if (reviews.length === 0) return 0

  const total = reviews.reduce((sum, review) => sum + review.rating, 0)
  return Number((total / reviews.length).toFixed(1))
}

export function getReviewCount(reviews: Review[]): number {
  return reviews.length
}

export function getRatingBreakdown(reviews: Review[]) {
  const breakdown = {
    5: 0,
    4: 0,
    3: 0,
    2: 0,
    1: 0,
  }

  reviews.forEach((review) => {
    breakdown[review.rating as 1 | 2 | 3 | 4 | 5] += 1
  })

  return breakdown
}

export function sortReviewsByNewest(reviews: Review[]): Review[] {
  return [...reviews].sort(
    (a, b) =>
      new Date(b.createdAt ?? '').getTime() -
      new Date(a.createdAt ?? '').getTime()
  )
}

export function sortReviewsByHighestRating(reviews: Review[]): Review[] {
  return [...reviews].sort((a, b) => b.rating - a.rating)
}

export function sortReviewsByLowestRating(reviews: Review[]): Review[] {
  return [...reviews].sort((a, b) => a.rating - b.rating)
}

export function filterReviewsByRating(
  reviews: Review[],
  rating: number
): Review[] {
  return reviews.filter((review) => review.rating === rating)
}

export function formatReviewDate(dateString: string): string {
  return new Intl.DateTimeFormat('en-IN', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  }).format(new Date(dateString))
}