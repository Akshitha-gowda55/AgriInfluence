import Link from 'next/link'
import { LoginForm } from '@/components/auth/login-form'

export const metadata = {
  title: 'Login | AgriInfluence',
  description: 'Login to your AgriInfluence account',
}

export default function LoginPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-green-50 to-white">
      <div className="container mx-auto flex min-h-screen items-center justify-center px-4 py-10">
        <div className="grid w-full max-w-5xl overflow-hidden rounded-2xl border bg-white shadow-lg md:grid-cols-2">
          <div className="hidden flex-col justify-center bg-green-700 p-10 text-white md:flex">
            <h1 className="mb-4 text-4xl font-bold leading-tight">
              Welcome back to AgriInfluence
            </h1>
            <p className="mb-6 text-sm text-green-100">
              Sign in to manage your cart, orders, wishlist, and explore trusted
              agricultural products with influencer recommendations.
            </p>

            <div className="space-y-3 text-sm text-green-100">
              <p>• Secure account access</p>
              <p>• Track your orders easily</p>
              <p>• Save favorite products to wishlist</p>
              <p>• Get product insights from influencers</p>
            </div>
          </div>

          <div className="flex items-center justify-center p-6 sm:p-10">
            <div className="w-full max-w-md">
              <div className="mb-6 text-center md:text-left">
                <h2 className="text-3xl font-bold text-gray-900">Login</h2>
                <p className="mt-2 text-sm text-gray-600">
                  Enter your credentials to access your account.
                </p>
              </div>

              <LoginForm />

              <p className="mt-6 text-center text-sm text-gray-600 md:text-left">
                Don&apos;t have an account?{' '}
                <Link
                  href="/signup"
                  className="font-medium text-green-700 hover:underline"
                >
                  Create one
                </Link>
              </p>

              <p className="mt-2 text-center text-sm text-gray-600 md:text-left">
                <Link
                  href="/"
                  className="font-medium text-gray-700 hover:underline"
                >
                  ← Back to Home
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}