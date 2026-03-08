import Link from 'next/link'

export default function PaymentFailedPage() {
  return (
    <div className="flex min-h-screen items-center justify-center px-4">
      <div className="max-w-md text-center">
        <h1 className="mb-2 text-3xl font-bold">Payment Failed</h1>
        <p className="mb-6 text-muted-foreground">
          Something went wrong while processing your PayPal payment.
        </p>
        <Link href="/checkout" className="underline">
          Go back to checkout
        </Link>
      </div>
    </div>
  )
}