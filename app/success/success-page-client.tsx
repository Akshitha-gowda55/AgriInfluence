'use client'

import { useEffect, useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { Check } from 'lucide-react'

export default function SuccessPageClient() {
  const searchParams = useSearchParams()
  const sessionId = searchParams.get('session_id')
  const router = useRouter()
  const [redirecting, setRedirecting] = useState(false)

  useEffect(() => {
    if (!sessionId) {
      setRedirecting(true)
      const timer = setTimeout(() => router.push('/'), 2000)
      return () => clearTimeout(timer)
    }
  }, [sessionId, router])

  if (redirecting) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p className="text-lg text-muted-foreground">
          No payment session found. Redirecting to home...
        </p>
      </div>
    )
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex flex-1 items-center justify-center px-4">
        <div className="max-w-md text-center">
          <div className="mx-auto mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-green-500">
            <Check className="h-12 w-12 text-white" />
          </div>
          <h1 className="mb-2 text-3xl font-bold">Order Successful!</h1>
          <p className="mb-4 text-muted-foreground">
            Thank you for your purchase. Your payment was successful.
          </p>
          {sessionId && (
            <p className="mb-6 text-sm text-muted-foreground">
              Payment Session ID: <span className="font-mono">{sessionId}</span>
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