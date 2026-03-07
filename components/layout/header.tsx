// components/layout/Header.tsx
'use client'

import Link from 'next/link'
import { ShoppingCart } from 'lucide-react'
import dynamic from 'next/dynamic'

// Dynamically import CartBadge as client-only
const CartBadge = dynamic(() => import('@/components/ui/cartBadge'), { ssr: false })

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full bg-white shadow">
      <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          
          {/* Logo */}
          <Link href="/" className="text-xl font-bold">
            AgriInfluence
          </Link>

          {/* Navigation Links */}
          <div className="flex items-center space-x-6">
            <Link href="/products" className="hover:text-primary">
              Products
            </Link>
            <Link href="/about" className="hover:text-primary">
              About
            </Link>

            {/* Cart */}
            <Link href="/cart" className="relative">
              <ShoppingCart className="h-5 w-5" />
              <CartBadge />
            </Link>
          </div>

        </div>
      </nav>
    </header>
  )
}