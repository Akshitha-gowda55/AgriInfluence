'use client'

import {
  IndianRupee,
  Package,
  ShoppingCart,
  Users,
} from 'lucide-react'

type AnalyticsCardsProps = {
  totalRevenue: number
  totalOrders: number
  totalProducts: number
  totalUsers: number
}

export default function AnalyticsCards({
  totalRevenue,
  totalOrders,
  totalProducts,
  totalUsers,
}: AnalyticsCardsProps) {
  const cards = [
    {
      title: 'Total Revenue',
      value: `₹${totalRevenue.toLocaleString('en-IN')}`,
      icon: IndianRupee,
      bg: 'bg-green-100',
      text: 'text-green-700',
    },
    {
      title: 'Total Orders',
      value: totalOrders.toString(),
      icon: ShoppingCart,
      bg: 'bg-blue-100',
      text: 'text-blue-700',
    },
    {
      title: 'Total Products',
      value: totalProducts.toString(),
      icon: Package,
      bg: 'bg-orange-100',
      text: 'text-orange-700',
    },
    {
      title: 'Total Users',
      value: totalUsers.toString(),
      icon: Users,
      bg: 'bg-purple-100',
      text: 'text-purple-700',
    },
  ]

  return (
    <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
      {cards.map((card) => {
        const Icon = card.icon

        return (
          <div
            key={card.title}
            className="rounded-2xl border bg-white p-5 shadow-sm"
          >
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">
                  {card.title}
                </p>
                <p className="mt-2 text-2xl font-bold text-gray-900">
                  {card.value}
                </p>
              </div>

              <div
                className={`flex h-11 w-11 items-center justify-center rounded-xl ${card.bg} ${card.text}`}
              >
                <Icon className="h-5 w-5" />
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}