'use client'

import { useState } from 'react'
import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'

export default function ExamplePage() {

  const [count, setCount] = useState(0)

  return (
    <div className="min-h-screen flex flex-col">

      <Header />

      <main className="flex-1 p-8">
        <h1 className="text-2xl font-bold">
          Example Page
        </h1>

        <button
          onClick={() => setCount(count + 1)}
          className="mt-4 rounded bg-green-600 px-4 py-2 text-white"
        >
          Count: {count}
        </button>
      </main>

      <Footer />

    </div>
  )
}