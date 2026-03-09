'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { User, Package, LogOut } from 'lucide-react'

interface UserData {
  name: string
  email: string
}

export default function ProfilePage() {
  const router = useRouter()
  const [user, setUser] = useState<UserData | null>(null)

  useEffect(() => {
    const storedUser = localStorage.getItem('user')

    if (storedUser) {
      setUser(JSON.parse(storedUser))
    } else {
      router.push('/login')
    }
  }, [router])

  const handleLogout = () => {
    localStorage.removeItem('user')
    localStorage.removeItem('token')
    router.push('/login')
  }

  if (!user) return null

  return (
    <div className="flex min-h-screen flex-col">
      <Header />

      <main className="flex-1 bg-muted/30">
        <div className="max-w-4xl mx-auto px-4 py-10">

          <h1 className="text-3xl font-bold mb-8">My Profile</h1>

          <div className="grid gap-6 md:grid-cols-2">

            {/* Profile Info */}
            <div className="rounded-lg border bg-white p-6 shadow-sm">
              <div className="flex items-center gap-3 mb-4">
                <User className="h-6 w-6" />
                <h2 className="text-xl font-semibold">Account Information</h2>
              </div>

              <div className="space-y-3">
                <p>
                  <span className="font-medium">Name:</span> {user.name}
                </p>
                <p>
                  <span className="font-medium">Email:</span> {user.email}
                </p>
              </div>
            </div>

            {/* Orders */}
            <div className="rounded-lg border bg-white p-6 shadow-sm">
              <div className="flex items-center gap-3 mb-4">
                <Package className="h-6 w-6" />
                <h2 className="text-xl font-semibold">My Orders</h2>
              </div>

              <p className="text-muted-foreground mb-4">
                View your previous purchases and track order status.
              </p>

              <Button asChild>
                <Link href="/orders">View Orders</Link>
              </Button>
            </div>

          </div>

          {/* Logout */}
          <div className="mt-8">
            <Button
              variant="destructive"
              onClick={handleLogout}
              className="flex items-center gap-2"
            >
              <LogOut className="h-4 w-4" />
              Logout
            </Button>
          </div>

        </div>
      </main>

      <Footer />
    </div>
  )
}