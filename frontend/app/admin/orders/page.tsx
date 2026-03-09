'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'
import { Button } from '@/components/ui/button'
import type { Order } from '@/types'

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState<Order[]>([])

  useEffect(() => {
    const storedOrders = localStorage.getItem('orders')
    if (storedOrders) {
      setOrders(JSON.parse(storedOrders))
    }
  }, [])

  const updateStatus = (id: string, status: string) => {
    const updatedOrders = orders.map((order) =>
      order.id === id ? { ...order, status } : order
    )

    setOrders(updatedOrders)
    localStorage.setItem('orders', JSON.stringify(updatedOrders))
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Header />

      <main className="flex-1 bg-muted/30">
        <div className="mx-auto max-w-6xl px-4 py-10">
          <h1 className="mb-8 text-3xl font-bold">Manage Orders</h1>

          <div className="rounded-lg border bg-white p-6 shadow-sm">
            <h2 className="mb-4 text-xl font-semibold">All Customer Orders</h2>

            {orders.length === 0 ? (
              <p className="text-sm text-muted-foreground">
                No orders available.
              </p>
            ) : (
              <div className="space-y-6">
                {orders.map((order) => (
                  <div
                    key={order.id}
                    className="rounded-lg border p-4"
                  >
                    <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                      <div>
                        <p className="font-semibold">Order ID: {order.id}</p>
                        <p className="text-sm text-muted-foreground">
                          {new Date(order.date).toLocaleDateString()}
                        </p>
                      </div>

                      <div className="flex flex-wrap gap-2">
                        <span className="rounded-full bg-muted px-3 py-1 text-sm">
                          {order.status}
                        </span>

                        <Link href={`/orders/${order.id}`}>
                          <Button variant="outline" size="sm">
                            View
                          </Button>
                        </Link>
                      </div>
                    </div>

                    <div className="mb-4 space-y-2">
                      {order.items.map((item) => (
                        <div
                          key={item.id}
                          className="flex justify-between text-sm"
                        >
                          <span>
                            {item.name} × {item.quantity}
                          </span>
                          <span>₹{(item.price * item.quantity).toFixed(2)}</span>
                        </div>
                      ))}
                    </div>

                    <div className="mb-4 flex justify-between border-t pt-3 font-medium">
                      <span>Total</span>
                      <span>₹{order.total.toFixed(2)}</span>
                    </div>

                    <div className="flex flex-wrap gap-2">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => updateStatus(order.id, 'Processing')}
                      >
                        Mark Processing
                      </Button>

                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => updateStatus(order.id, 'Shipped')}
                      >
                        Mark Shipped
                      </Button>

                      <Button
                        size="sm"
                        onClick={() => updateStatus(order.id, 'Delivered')}
                      >
                        Mark Delivered
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}