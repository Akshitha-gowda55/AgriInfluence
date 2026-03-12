'use client'

import { useMemo } from 'react'

import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'

import { orders } from '@/lib/data'
import type { Order } from '@/types'

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle
} from '@/components/ui/card'

import { Badge } from '@/components/ui/badge'

export default function AdminOrdersPage() {

  const typedOrders = orders as Order[]

  const sortedOrders = useMemo(() => {
    return [...typedOrders].sort(
      (a, b) =>
        new Date(b.createdAt).getTime() -
        new Date(a.createdAt).getTime()
    )
  }, [typedOrders])


  return (
    <div className="min-h-screen flex flex-col">

      <Header />

      <main className="flex-1 bg-muted/30">

        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">

          {/* Page Title */}
          <div className="mb-8">

            <h1 className="text-3xl font-bold text-foreground">
              Admin Orders
            </h1>

            <p className="mt-2 text-muted-foreground">
              View and manage all customer orders.
            </p>

          </div>


          {/* Orders Card */}
          <Card>

            <CardHeader>
              <CardTitle>
                All Orders
              </CardTitle>
            </CardHeader>

            <CardContent>

              <div className="space-y-4">

                {sortedOrders.map((order) => (

                  <div
                    key={order.id}
                    className="flex flex-col gap-4 rounded-lg border p-4 md:flex-row md:items-center md:justify-between"
                  >

                    {/* Order Info */}
                    <div>

                      <p className="font-semibold">
                        Order ID: {order.id}
                      </p>

                      <p className="text-sm text-muted-foreground">
                        {new Date(order.createdAt).toLocaleDateString()}
                      </p>

                    </div>


                    {/* Order Details */}
                    <div className="flex flex-wrap items-center gap-3">

                      <Badge variant="outline">
                        {order.orderStatus}
                      </Badge>

                      <Badge variant="secondary">
                        {order.paymentStatus}
                      </Badge>

                      <p className="font-medium">
                        {order.items.length} item(s)
                      </p>

                      <p className="font-semibold">
                        ₹{order.pricing.total.toFixed(2)}
                      </p>

                    </div>

                  </div>

                ))}

              </div>

            </CardContent>

          </Card>

        </div>

      </main>

      <Footer />

    </div>
  )
}