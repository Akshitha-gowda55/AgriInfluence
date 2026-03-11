'use client'

import { useState } from 'react'
import type { Order } from '@/types'
import { Button } from '@/components/ui/button'

interface AdminOrdersTableProps {
  orders: Order[]
}

export function AdminOrdersTable({ orders }: AdminOrdersTableProps) {
  const [orderList, setOrderList] = useState<Order[]>(orders)

  const updateStatus = (id: string, status: string) => {
    setOrderList((prev) =>
      prev.map((order) =>
        order.id === id ? { ...order, status } : order
      )
    )
  }

  return (
    <div className="rounded-lg border bg-white shadow-sm">
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="border-b bg-muted/50">
            <tr>
              <th className="px-4 py-3 text-left font-medium">Order ID</th>
              <th className="px-4 py-3 text-left font-medium">Date</th>
              <th className="px-4 py-3 text-left font-medium">Items</th>
              <th className="px-4 py-3 text-left font-medium">Total</th>
              <th className="px-4 py-3 text-left font-medium">Status</th>
              <th className="px-4 py-3 text-right font-medium">Actions</th>
            </tr>
          </thead>

          <tbody>
            {orderList.map((order) => (
              <tr key={order.id} className="border-b">
                <td className="px-4 py-3 font-medium">{order.id}</td>

                <td className="px-4 py-3">
                  {new Date(order.date).toLocaleDateString()}
                </td>

                <td className="px-4 py-3">
                  {order.items.reduce((sum, item) => sum + item.quantity, 0)}
                </td>

                <td className="px-4 py-3">₹{order.total.toFixed(2)}</td>

                <td className="px-4 py-3">
                  <span className="rounded-full bg-muted px-3 py-1 text-xs">
                    {order.status}
                  </span>
                </td>

                <td className="px-4 py-3">
                  <div className="flex justify-end gap-2">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => updateStatus(order.id, 'Processing')}
                    >
                      Processing
                    </Button>

                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => updateStatus(order.id, 'Shipped')}
                    >
                      Shipped
                    </Button>

                    <Button
                      size="sm"
                      onClick={() => updateStatus(order.id, 'Delivered')}
                    >
                      Delivered
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {orderList.length === 0 && (
          <div className="p-6 text-center text-muted-foreground">
            No orders available.
          </div>
        )}
      </div>
    </div>
  )
}