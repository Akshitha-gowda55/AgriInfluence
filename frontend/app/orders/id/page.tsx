'use client'

import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import Link from 'next/link'
import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'
import { Button } from '@/components/ui/button'
import { ChevronLeft, Package } from 'lucide-react'

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

export default function OrderDetailsPage() {
  const params = useParams()
  const orderId = params.id as string

  const [order, setOrder] = useState<Order | null>(null)

  useEffect(() => {
    const storedOrders = localStorage.getItem('orders')

    if (storedOrders) {
      const orders: Order[] = JSON.parse(storedOrders)
      const foundOrder = orders.find((o) => o.id === orderId)
      if (foundOrder) setOrder(foundOrder)
    }
  }, [orderId])

  return (
    <div className="flex min-h-screen flex-col">
      <Header />

      <main className="flex-1 bg-muted/30">
        <div className="max-w-5xl mx-auto px-4 py-10">

          <Link
            href="/orders"
            className="mb-6 flex items-center text-sm"
          >
            <ChevronLeft className="mr-1 h-4 w-4" />
            Back to Orders
          </Link>

          {!order ? (
            <div className="text-center py-16">
              <Package className="mx-auto mb-4 h-12 w-12 text-muted-foreground" />
              <p className="text-muted-foreground">
                Order not found.
              </p>
            </div>
          ) : (
            <div className="rounded-lg border bg-white p-6 shadow-sm">

              {/* Order Header */}
              <div className="flex flex-col sm:flex-row sm:justify-between mb-6">
                <div>
                  <h1 className="text-2xl font-bold">
                    Order #{order.id}
                  </h1>
                  <p className="text-sm text-muted-foreground">
                    Placed on {new Date(order.date).toLocaleDateString()}
                  </p>
                </div>

                <span className="mt-2 sm:mt-0 text-sm font-medium text-green-600">
                  {order.status}
                </span>
              </div>

              {/* Items */}
              <div className="space-y-4">
                {order.items.map((item) => (
                  <div
                    key={item.id}
                    className="flex justify-between border-b pb-3"
                  >
                    <div>
                      <p className="font-medium">{item.name}</p>
                      <p className="text-sm text-muted-foreground">
                        Quantity: {item.quantity}
                      </p>
                    </div>

                    <p className="font-medium">
                      ₹{(item.price * item.quantity).toFixed(2)}
                    </p>
                  </div>
                ))}
              </div>

              {/* Total */}
              <div className="mt-6 border-t pt-4 flex justify-between text-lg font-semibold">
                <span>Total Paid</span>
                <span>₹{order.total.toFixed(2)}</span>
              </div>

              {/* Buttons */}
              <div className="mt-6 flex gap-4">
                <Button asChild>
                  <Link href="/products">Shop More</Link>
                </Button>

                <Button variant="outline" asChild>
                  <Link href="/orders">View All Orders</Link>
                </Button>
              </div>

            </div>
          )}

        </div>
      </main>

      <Footer />
    </div>
  )
}