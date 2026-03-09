'use client'

import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { XCircle } from 'lucide-react'
import { useSearchParams } from 'next/navigation'

export default function FailurePage() {
  const searchParams = useSearchParams()
  const orderId = searchParams.get('orderId')

  return (
    <div className="flex min-h-screen flex-col">
      <Header />

      <main className="flex flex-1 items-center justify-center px-4">
        <div className="max-w-md text-center">

          {/* Icon */}
          <div className="mx-auto mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-red-500">
            <XCircle className="h-12 w-12 text-white" />
          </div>

          {/* Title */}
          <h1 className="mb-2 text-3xl font-bold">Payment Failed</h1>

          {/* Message */}
          <p className="mb-4 text-muted-foreground">
            Unfortunately your payment could not be processed.
            Please try again or use a different payment method.
          </p>

          {/* Order ID if exists */}
          {orderId && (
            <p className="mb-6 text-sm text-muted-foreground">
              Order ID: <span className="font-mono">{orderId}</span>
            </p>
          )}

          {/* Buttons */}
          <div className="flex flex-wrap justify-center gap-4">
            <Button asChild>
              <Link href="/checkout">Try Again</Link>
            </Button>

            <Button variant="outline" asChild>
              <Link href="/cart">Back to Cart</Link>
            </Button>
          </div>

        </div>
      </main>

      <Footer />
    </div>
  )
}