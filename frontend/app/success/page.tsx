'use client'

import Link from 'next/link'
import { CheckCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'

export default function SuccessPage() {
  return (
    <div className="mx-auto flex min-h-[60vh] max-w-2xl flex-col items-center justify-center px-4 py-12 text-center">
      <div className="mb-6 rounded-full bg-primary/10 p-4">
        <CheckCircle className="h-12 w-12 text-primary" />
      </div>

      <h1 className="text-3xl font-bold">Payment Successful</h1>
      <p className="mt-3 text-muted-foreground">
        Thank you for your purchase. Your order has been placed successfully.
      </p>

      <div className="mt-8 flex gap-4">
        <Button asChild>
          <Link href="/orders">View Orders</Link>
        </Button>
        <Button asChild variant="outline">
          <Link href="/products">Continue Shopping</Link>
        </Button>
      </div>
    </div>
  )
}