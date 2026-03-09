'use client'

import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'
import Link from 'next/link'
import { Package, ShoppingCart, Users, BarChart3 } from 'lucide-react'

export default function AdminPage() {
  const cards = [
    {
      title: 'Manage Products',
      icon: Package,
      href: '/admin/products',
      description: 'Add, edit or remove products',
    },
    {
      title: 'View Orders',
      icon: ShoppingCart,
      href: '/admin/orders',
      description: 'Check all customer orders',
    },
    {
      title: 'Users',
      icon: Users,
      href: '/admin/users',
      description: 'View registered users',
    },
    {
      title: 'Analytics',
      icon: BarChart3,
      href: '/admin/analytics',
      description: 'Sales and performance metrics',
    },
  ]

  return (
    <div className="flex min-h-screen flex-col">
      <Header />

      <main className="flex-1 bg-muted/30">
        <div className="mx-auto max-w-6xl px-4 py-10">

          <h1 className="mb-8 text-3xl font-bold">
            Admin Dashboard
          </h1>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">

            {cards.map((card) => (
              <Link
                key={card.title}
                href={card.href}
                className="rounded-lg border bg-white p-6 shadow-sm hover:shadow-md transition"
              >
                <div className="flex items-center gap-3 mb-4">
                  <card.icon className="h-6 w-6 text-green-600" />
                  <h2 className="font-semibold">{card.title}</h2>
                </div>

                <p className="text-sm text-muted-foreground">
                  {card.description}
                </p>
              </Link>
            ))}

          </div>

        </div>
      </main>

      <Footer />
    </div>
  )
}