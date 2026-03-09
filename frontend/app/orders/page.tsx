'use client'

import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { Package } from 'lucide-react'
import { useEffect, useState } from 'react'

interface OrderItem {
  id: string
  name: string
  price: number
  quantity: number
}

interface Order {
  id: string
  total: number
  date: string
  status: string
  items: OrderItem[]
}

export default function OrdersPage() {
  const [orders, setOrders] = useState<Order[]>([])

  useEffect(() => {
    const storedOrders = localStorage.getItem('orders')
    if (storedOrders) {
      setOrders(JSON.parse(storedOrders))
    }
  }, [])

  return (
    <div className="flex min-h-screen flex-col">
      <Header />

      <main className="flex-1 bg-muted/30">
        <div className="max-w-5xl mx-auto px-4 py-10">

          <h1 className="text-3xl font-bold mb-6">Your Orders</h1>

          {orders.length === 0 ? (
            <div className="text-center py-16">
              <Package className="mx-auto mb-4 h-12 w-12 text-muted-foreground" />

              <p className="mb-4 text-muted-foreground">
                You haven't placed any orders yet.
              </p>

              <Button asChild>
                <Link href="/products">Browse Products</Link>
              </Button>
            </div>
          ) : (
            <div className="space-y-6">
              {orders.map((order) => (
                <div
                  key={order.id}
                  className="rounded-lg border bg-white p-6 shadow-sm"
                >
                  <div className="flex justify-between items-center mb-4">
                    <div>
                      <p className="font-semibold">
                        Order ID: {order.id}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {new Date(order.date).toLocaleDateString()}
                      </p>
                    </div>

                    <span className="text-sm font-medium text-green-600">
                      {order.status}
                    </span>
                  </div>

                  <div className="space-y-2">
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

                  <div className="mt-4 border-t pt-4 flex justify-between font-semibold">
                    <span>Total</span>
                    <span>₹{order.total.toFixed(2)}</span>
                  </div>
                </div>
              ))}
            </div>
          )}

        </div>
      </main>

      <Footer />
    </div>
  )
}