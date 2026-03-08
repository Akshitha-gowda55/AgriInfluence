'use client'

import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { Check } from 'lucide-react'
import { useSearchParams } from 'next/navigation'

export default function SuccessPageClient() {
  const searchParams = useSearchParams()
  const orderId = searchParams.get('orderId')

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex flex-1 items-center justify-center px-4">
        <div className="max-w-md text-center">
          <div className="mx-auto mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-green-500">
            <Check className="h-12 w-12 text-white" />
          </div>

          <h1 className="mb-2 text-3xl font-bold">Payment Successful!</h1>

          <p className="mb-4 text-muted-foreground">
            Thank you for your purchase. Your PayPal payment was completed successfully.
          </p>

          {orderId && (
            <p className="mb-6 text-sm text-muted-foreground">
              Order ID: <span className="font-mono">{orderId}</span>
            </p>
          )}

          <div className="flex flex-wrap justify-center gap-4">
            <Button asChild>
              <Link href="/products">Continue Shopping</Link>
            </Button>
            <Button variant="outline" asChild>
              <Link href="/">Go to Home</Link>
            </Button>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}