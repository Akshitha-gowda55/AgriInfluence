import { create } from 'zustand'
import type { CartItem, Product } from '@/types'

type CartStore = {
  items: CartItem[]

  addToCart: (product: Product) => void
  removeFromCart: (productId: string) => void
  increaseQuantity: (productId: string) => void
  decreaseQuantity: (productId: string) => void
  clearCart: () => void
  fetchCart: () => void

  getTotalItems: () => number
  getTotalPrice: () => number
}

export const useCartStore = create<CartStore>((set, get) => ({

  items: [],


  addToCart: (product) =>
    set((state) => {

      const existingItem = state.items.find(
        (item) => item.id === product.id
      )

      let updatedItems: CartItem[]

      if (existingItem) {

        updatedItems = state.items.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )

      } else {

        updatedItems = [
          ...state.items,
          {
            ...product,
            quantity: 1,
          },
        ]

      }

      localStorage.setItem(
        'cart',
        JSON.stringify(updatedItems)
      )

      return {
        items: updatedItems,
      }

    }),


  removeFromCart: (productId) =>
    set((state) => {

      const updatedItems = state.items.filter(
        (item) => item.id !== productId
      )

      localStorage.setItem(
        'cart',
        JSON.stringify(updatedItems)
      )

      return {
        items: updatedItems,
      }

    }),


  increaseQuantity: (productId) =>
    set((state) => {

      const updatedItems = state.items.map((item) =>
        item.id === productId
          ? { ...item, quantity: item.quantity + 1 }
          : item
      )

      localStorage.setItem(
        'cart',
        JSON.stringify(updatedItems)
      )

      return {
        items: updatedItems,
      }

    }),


  decreaseQuantity: (productId) =>
    set((state) => {

      const updatedItems = state.items
        .map((item) =>
          item.id === productId
            ? { ...item, quantity: item.quantity - 1 }
            : item
        )
        .filter((item) => item.quantity > 0)

      localStorage.setItem(
        'cart',
        JSON.stringify(updatedItems)
      )

      return {
        items: updatedItems,
      }

    }),


  clearCart: () => {

    localStorage.removeItem('cart')

    set({
      items: [],
    })

  },


  fetchCart: () => {

    const storedCart = localStorage.getItem('cart')

    if (storedCart) {

      set({
        items: JSON.parse(storedCart),
      })

    } else {

      set({
        items: [],
      })

    }

  },


  getTotalItems: () =>
    get().items.reduce(
      (total, item) => total + item.quantity,
      0
    ),


  getTotalPrice: () =>
    get().items.reduce(
      (total, item) =>
        total + item.price * item.quantity,
      0
    ),

}))