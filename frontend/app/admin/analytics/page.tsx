'use client'

import { useEffect, useMemo, useState } from 'react'
import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'
import type { Order } from '@/types'
import { ShoppingBag, IndianRupee, PackageCheck, Clock3 } from 'lucide-react'

export default function AdminAnalyticsPage() {
  const [orders, setOrders] = useState<Order[]>([])

  useEffect(() => {
    const storedOrders = localStorage.getItem('orders')
    if (storedOrders) {
      setOrders(JSON.parse(storedOrders))
    }
  }, [])

  const analytics = useMemo(() => {
    const totalOrders = orders.length
    const totalRevenue = orders.reduce((sum, order) => sum + order.total, 0)

    const deliveredOrders = orders.filter(
      (order) => order.status.toLowerCase() === 'delivered'
    ).length

    const processingOrders = orders.filter((order) =>
      ['paid', 'processing', 'shipped'].includes(order.status.toLowerCase())
    ).length

    return {
      totalOrders,
      totalRevenue,
      deliveredOrders,
      processingOrders,
    }
  }, [orders])

  const recentOrders = [...orders]
    .sort(
      (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
    )
    .slice(0, 5)

  const cards = [
    {
      title: 'Total Orders',
      value: analytics.totalOrders,
      icon: ShoppingBag,
    },
    {
      title: 'Total Revenue',
      value: `₹${analytics.totalRevenue.toFixed(2)}`,
      icon: IndianRupee,
    },
    {
      title: 'Delivered Orders',
      value: analytics.deliveredOrders,
      icon: PackageCheck,
    },
    {
      title: 'Active Orders',
      value: analytics.processingOrders,
      icon: Clock3,
    },
  ]

  return (
    <div className="flex min-h-screen flex-col">
      <Header />

      <main className="flex-1 bg-muted/30">
        <div className="mx-auto max-w-6xl px-4 py-10">
          <h1 className="mb-8 text-3xl font-bold">Analytics</h1>

          <div className="mb-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {cards.map((card) => (
              <div
                key={card.title}
                className="rounded-lg border bg-white p-6 shadow-sm"
              >
                <div className="mb-4 flex items-center gap-3">
                  <card.icon className="h-6 w-6 text-green-600" />
                  <h2 className="text-sm font-medium text-muted-foreground">
                    {card.title}
                  </h2>
                </div>
                <p className="text-2xl font-bold">{card.value}</p>
              </div>
            ))}
          </div>

          <div className="rounded-lg border bg-white p-6 shadow-sm">
            <h2 className="mb-4 text-xl font-semibold">Recent Orders</h2>

            {recentOrders.length === 0 ? (
              <p className="text-sm text-muted-foreground">
                No order data available yet.
              </p>
            ) : (
              <div className="space-y-4">
                {recentOrders.map((order) => (
                  <div
                    key={order.id}
                    className="flex flex-col gap-2 rounded-lg border p-4 sm:flex-row sm:items-center sm:justify-between"
                  >
                    <div>
                      <p className="font-medium">Order #{order.id}</p>
                      <p className="text-sm text-muted-foreground">
                        {new Date(order.date).toLocaleDateString()}
                      </p>
                    </div>

                    <div className="text-sm sm:text-right">
                      <p className="font-medium">₹{order.total.toFixed(2)}</p>
                      <p className="text-muted-foreground">{order.status}</p>
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