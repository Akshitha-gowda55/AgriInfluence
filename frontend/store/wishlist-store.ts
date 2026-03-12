// store/wishlist-store.ts

import { create } from 'zustand'
import { Product } from '@/types'

type WishlistStore = {
  items: Product[]
  addToWishlist: (product: Product) => void
  removeFromWishlist: (productId: string) => void
  isInWishlist: (productId: string) => boolean
  clearWishlist: () => void
}

export const useWishlistStore = create<WishlistStore>((set, get) => ({
  items: [],

  addToWishlist: (product) =>
    set((state) => {
      const alreadyExists = state.items.some((item) => item.id === product.id)

      if (alreadyExists) {
        return state
      }

      return {
        items: [...state.items, product],
      }
    }),

  removeFromWishlist: (productId) =>
    set((state) => ({
      items: state.items.filter((item) => item.id !== productId),
    })),

  isInWishlist: (productId) =>
    get().items.some((item) => item.id === productId),

  clearWishlist: () => set({ items: [] }),
}))