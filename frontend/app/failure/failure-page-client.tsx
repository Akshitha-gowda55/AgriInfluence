'use client'

import Link from 'next/link'
import { XCircle } from 'lucide-react'
import { useSearchParams } from 'next/navigation'
import { Button } from '@/components/ui/button'

export default function FailurePageClient() {
  const searchParams = useSearchParams()
  const reason = searchParams.get('reason')

  return (
    <div className="mx-auto flex min-h-[60vh] max-w-2xl flex-col items-center justify-center px-4 py-12 text-center">
      <div className="mb-6 rounded-full bg-red-100 p-4">
        <XCircle className="h-12 w-12 text-red-600" />
      </div>

      <h1 className="text-3xl font-bold">Payment Failed</h1>
      <p className="mt-3 text-muted-foreground">
        Your payment could not be completed.
      </p>

      {reason && (
        <p className="mt-2 text-sm text-red-500">
          Reason: {reason}
        </p>
      )}

      <div className="mt-8 flex gap-4">
        <Button asChild>
          <Link href="/checkout">Try Again</Link>
        </Button>
        <Button asChild variant="outline">
          <Link href="/cart">Back to Cart</Link>
        </Button>
      </div>
    </div>
  )
}