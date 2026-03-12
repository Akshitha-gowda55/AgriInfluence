'use client'

import { useEffect } from 'react'
import { useCartStore } from '@/lib/cart-store'

export default function CartFetcher({
  children,
}: {
  children: React.ReactNode
}) {

  const fetchCart = useCartStore(
    (state) => state.fetchCart
  )

  useEffect(() => {
    fetchCart()
  }, [fetchCart])

  return (
    <>
      {children}
    </>
  )
}