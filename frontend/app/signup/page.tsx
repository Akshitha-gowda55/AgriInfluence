import Link from 'next/link'
import { SignupForm } from '@/components/auth/signup-form'

export const metadata = {
  title: 'Sign Up | AgriInfluence',
  description: 'Create your AgriInfluence account',
}

export default function SignupPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-green-50 to-white">
      <div className="container mx-auto flex min-h-screen items-center justify-center px-4 py-10">
        <div className="grid w-full max-w-5xl overflow-hidden rounded-2xl border bg-white shadow-lg md:grid-cols-2">
          <div className="hidden flex-col justify-center bg-green-700 p-10 text-white md:flex">
            <h1 className="mb-4 text-4xl font-bold leading-tight">
              Join AgriInfluence today
            </h1>
            <p className="mb-6 text-sm text-green-100">
              Create your account to explore agricultural products, connect with
              influencers, save favorites, and place orders easily.
            </p>

            <div className="space-y-3 text-sm text-green-100">
              <p>• Create your customer account securely</p>
              <p>• Add products to cart and wishlist</p>
              <p>• Track all your orders in one place</p>
              <p>• Discover trusted influencer recommendations</p>
            </div>
          </div>

          <div className="flex items-center justify-center p-6 sm:p-10">
            <div className="w-full max-w-md">
              <div className="mb-6 text-center md:text-left">
                <h2 className="text-3xl font-bold text-gray-900">Create Account</h2>
                <p className="mt-2 text-sm text-gray-600">
                  Fill in your details to register on AgriInfluence.
                </p>
              </div>

              <SignupForm />

              <p className="mt-6 text-center text-sm text-gray-600 md:text-left">
                Already have an account?{' '}
                <Link
                  href="/login"
                  className="font-medium text-green-700 hover:underline"
                >
                  Login
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