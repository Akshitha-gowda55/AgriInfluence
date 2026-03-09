'use client'

import { useEffect, useState } from 'react'
import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'
import type { User } from '@/types'

export default function AdminUsersPage() {
  const [users, setUsers] = useState<User[]>([])

  useEffect(() => {
    const storedUser = localStorage.getItem('user')

    if (storedUser) {
      const parsedUser: User = JSON.parse(storedUser)
      setUsers([parsedUser])
    }
  }, [])

  return (
    <div className="flex min-h-screen flex-col">
      <Header />

      <main className="flex-1 bg-muted/30">
        <div className="mx-auto max-w-6xl px-4 py-10">
          <h1 className="mb-8 text-3xl font-bold">Manage Users</h1>

          <div className="rounded-lg border bg-white p-6 shadow-sm">
            <h2 className="mb-4 text-xl font-semibold">Registered Users</h2>

            {users.length === 0 ? (
              <p className="text-sm text-muted-foreground">
                No users available.
              </p>
            ) : (
              <div className="space-y-4">
                {users.map((user, index) => (
                  <div
                    key={`${user.email}-${index}`}
                    className="flex flex-col gap-2 rounded-lg border p-4 sm:flex-row sm:items-center sm:justify-between"
                  >
                    <div>
                      <p className="font-medium">{user.name}</p>
                      <p className="text-sm text-muted-foreground">
                        {user.email}
                      </p>
                    </div>

                    <span className="rounded-full bg-muted px-3 py-1 text-sm">
                      Customer
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}