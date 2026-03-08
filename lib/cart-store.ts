'use client'

import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { CartItem, Product } from './types'

interface CartStore {
  items: CartItem[]
  addItem: (product: Product) => void
  removeItem: (productId: string) => void
  updateQuantity: (productId: string, quantity: number) => void
  clearCart: () => void
  getTotalItems: () => number
  getTotalPrice: () => number
  fetchCart: () => Promise<void>
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],

      addItem: (product: Product) => {
        set((state) => {
          const existingItem = state.items.find((item) => item.id === product.id)

          if (existingItem) {
            return {
              items: state.items.map((item) =>
                item.id === product.id
                  ? { ...item, quantity: item.quantity + 1 }
                  : item
              ),
            }
          }

          return { items: [...state.items, { ...product, quantity: 1 }] }
        })
      },

      removeItem: (productId: string) => {
        set((state) => ({
          items: state.items.filter((item) => item.id !== productId),
        }))
      },

      updateQuantity: (productId: string, quantity: number) => {
        if (quantity <= 0) {
          get().removeItem(productId)
          return
        }

        set((state) => ({
          items: state.items.map((item) =>
            item.id === productId ? { ...item, quantity } : item
          ),
        }))
      },

      clearCart: () => set({ items: [] }),

      getTotalItems: () => {
        return get().items.reduce((total, item) => total + item.quantity, 0)
      },

      getTotalPrice: () => {
        return get().items.reduce(
          (total, item) => total + item.price * item.quantity,
          0
        )
      },

      fetchCart: async () => {
        try {
          const token = localStorage.getItem('token')
          if (!token) return

          const res = await fetch('http://localhost:5000/api/cart', {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          })

          if (!res.ok) {
            console.error('Failed to fetch cart')
            return
          }

          const data = await res.json()

          if (data?.products) {
            const cartItems = data.products.map((p: any) => ({
              id: p.product._id,
              name: p.product.name,
              price: p.product.price,
              image: p.product.image,
              quantity: p.quantity,
              inStock: p.product.inStock,
            }))

            set({ items: cartItems })
          }
        } catch (err) {
          console.error('Error fetching cart:', err)
        }
      },
    }),
    {
      name: 'agri-cart',
    }
  )
)