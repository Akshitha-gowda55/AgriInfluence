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

export default function AdminAnalyticsPage() {

  const typedOrders = orders as Order[]

  const analytics = useMemo(() => {

    const totalOrders = typedOrders.length

    const totalRevenue = typedOrders.reduce(
      (sum: number, order: Order) => sum + order.pricing.total,
      0
    )

    const deliveredOrders = typedOrders.filter(
      (order: Order) => order.orderStatus.toLowerCase() === 'delivered'
    ).length

    const pendingOrders = typedOrders.filter(
      (order: Order) => order.orderStatus.toLowerCase() === 'pending'
    ).length

    const cancelledOrders = typedOrders.filter(
      (order: Order) => order.orderStatus.toLowerCase() === 'cancelled'
    ).length

    const paidOrders = typedOrders.filter(
      (order: Order) => order.paymentStatus.toLowerCase() === 'paid'
    ).length

    const averageOrderValue =
      totalOrders > 0 ? totalRevenue / totalOrders : 0

    return {
      totalOrders,
      totalRevenue,
      deliveredOrders,
      pendingOrders,
      cancelledOrders,
      paidOrders,
      averageOrderValue
    }

  }, [typedOrders])


  return (
    <div className="min-h-screen flex flex-col">

      <Header />

      <main className="flex-1 bg-muted/30">

        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">

          {/* Page Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-foreground">
              Admin Analytics
            </h1>

            <p className="mt-2 text-muted-foreground">
              Overview of orders, revenue, and payment performance.
            </p>
          </div>


          {/* Stats Cards */}
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-4">

            <Card>
              <CardHeader>
                <CardTitle>Total Orders</CardTitle>
              </CardHeader>

              <CardContent>
                <p className="text-3xl font-bold">
                  {analytics.totalOrders}
                </p>
              </CardContent>
            </Card>


            <Card>
              <CardHeader>
                <CardTitle>Total Revenue</CardTitle>
              </CardHeader>

              <CardContent>
                <p className="text-3xl font-bold">
                  ₹{analytics.totalRevenue.toFixed(2)}
                </p>
              </CardContent>
            </Card>


            <Card>
              <CardHeader>
                <CardTitle>Paid Orders</CardTitle>
              </CardHeader>

              <CardContent>
                <p className="text-3xl font-bold">
                  {analytics.paidOrders}
                </p>
              </CardContent>
            </Card>


            <Card>
              <CardHeader>
                <CardTitle>Average Order Value</CardTitle>
              </CardHeader>

              <CardContent>
                <p className="text-3xl font-bold">
                  ₹{analytics.averageOrderValue.toFixed(2)}
                </p>
              </CardContent>
            </Card>

          </div>


          {/* Order Status Cards */}
          <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-3">

            <Card>
              <CardHeader>
                <CardTitle>Delivered Orders</CardTitle>
              </CardHeader>

              <CardContent>
                <div className="flex items-center justify-between">

                  <p className="text-2xl font-bold">
                    {analytics.deliveredOrders}
                  </p>

                  <Badge>
                    Delivered
                  </Badge>

                </div>
              </CardContent>
            </Card>


            <Card>
              <CardHeader>
                <CardTitle>Pending Orders</CardTitle>
              </CardHeader>

              <CardContent>
                <div className="flex items-center justify-between">

                  <p className="text-2xl font-bold">
                    {analytics.pendingOrders}
                  </p>

                  <Badge variant="secondary">
                    Pending
                  </Badge>

                </div>
              </CardContent>
            </Card>


            <Card>
              <CardHeader>
                <CardTitle>Cancelled Orders</CardTitle>
              </CardHeader>

              <CardContent>
                <div className="flex items-center justify-between">

                  <p className="text-2xl font-bold">
                    {analytics.cancelledOrders}
                  </p>

                  <Badge variant="destructive">
                    Cancelled
                  </Badge>

                </div>
              </CardContent>
            </Card>

          </div>


          {/* Recent Orders */}
          <div className="mt-8">

            <Card>

              <CardHeader>
                <CardTitle>
                  Recent Orders Summary
                </CardTitle>
              </CardHeader>

              <CardContent>

                <div className="space-y-4">

                  {typedOrders.slice(0, 5).map((order: Order) => (

                    <div
                      key={order.id}
                      className="flex flex-col gap-2 rounded-lg border p-4 sm:flex-row sm:items-center sm:justify-between"
                    >

                      <div>
                        <p className="font-medium text-foreground">
                          Order #{order.id}
                        </p>

                        <p className="text-sm text-muted-foreground">
                          {order.items.length} item(s)
                        </p>
                      </div>


                      <div className="flex flex-wrap items-center gap-3">

                        <Badge variant="outline">
                          {order.orderStatus}
                        </Badge>

                        <Badge variant="secondary">
                          {order.paymentStatus}
                        </Badge>

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

        </div>

      </main>

      <Footer />

    </div>
  )
}