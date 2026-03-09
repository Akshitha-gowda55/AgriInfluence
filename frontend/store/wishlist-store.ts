'use client'

import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { WishlistItem } from '@/types'

interface WishlistStore {
  items: WishlistItem[]
  addItem: (item: WishlistItem) => void
  removeItem: (id: string) => void
  clearWishlist: () => void
}

export const useWishlistStore = create<WishlistStore>()(
  persist(
    (set) => ({
      items: [],

      addItem: (item) =>
        set((state) => {
          const exists = state.items.some((i) => i.id === item.id)

          if (exists) {
            return { items: state.items }
          }

          return {
            items: [...state.items, item],
          }
        }),

      removeItem: (id) =>
        set((state) => ({
          items: state.items.filter((item) => item.id !== id),
        })),

      clearWishlist: () => set({ items: [] }),
    }),
    {
      name: 'agri-wishlist',
    }
  )
)