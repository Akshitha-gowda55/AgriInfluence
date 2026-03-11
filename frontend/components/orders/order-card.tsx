'use client'

import Link from 'next/link'
import { Badge } from '@/components/ui/badge'
import type { Order } from '@/types'

interface OrderCardProps {
  order: Order
  showViewButton?: boolean
}

export function OrderCard({
  order,
  showViewButton = true,
}: OrderCardProps) {
  const statusColor =
    order.status.toLowerCase() === 'delivered'
      ? 'bg-green-100 text-green-700'
      : order.status.toLowerCase() === 'shipped'
      ? 'bg-blue-100 text-blue-700'
      : order.status.toLowerCase() === 'processing'
      ? 'bg-yellow-100 text-yellow-700'
      : 'bg-gray-100 text-gray-700'

  return (
    <div className="rounded-lg border bg-white p-6 shadow-sm">
      <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h3 className="font-semibold text-gray-900">
            Order #{order.id}
          </h3>
          <p className="text-sm text-gray-500">
            {new Date(order.date).toLocaleDateString()}
          </p>
        </div>

        <Badge className={statusColor}>
          {order.status}
        </Badge>
      </div>

      <div className="space-y-2">
        {order.items.map((item) => (
          <div
            key={item.id}
            className="flex justify-between text-sm text-gray-700"
          >
            <span>
              {item.name} × {item.quantity}
            </span>
            <span>₹{(item.price * item.quantity).toFixed(2)}</span>
          </div>
        ))}
      </div>

      <div className="mt-4 flex items-center justify-between border-t pt-4">
        <p className="font-semibold text-gray-900">
          Total: ₹{order.total.toFixed(2)}
        </p>

        {showViewButton && (
          <Link
            href={`/orders/${order.id}`}
            className="text-sm font-medium text-green-700 hover:underline"
          >
            View Details
          </Link>
        )}
      </div>
    </div>
  )
}