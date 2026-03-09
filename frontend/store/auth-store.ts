'use client'

import { create } from 'zustand'

type User = {
  id?: string
  name: string
  email: string
  role?: string
}

interface AuthStore {
  user: User | null
  token: string | null
  setAuth: (user: User, token: string) => void
  logout: () => void
  loadAuth: () => void
}

export const useAuthStore = create<AuthStore>((set) => ({
  user: null,
  token: null,

  setAuth: (user, token) => {
    localStorage.setItem('user', JSON.stringify(user))
    localStorage.setItem('token', token)

    set({
      user,
      token,
    })
  },

  logout: () => {
    localStorage.removeItem('user')
    localStorage.removeItem('token')

    set({
      user: null,
      token: null,
    })
  },

  loadAuth: () => {
    if (typeof window === 'undefined') return

    const storedUser = localStorage.getItem('user')
    const storedToken = localStorage.getItem('token')

    set({
      user: storedUser ? JSON.parse(storedUser) : null,
      token: storedToken || null,
    })
  },
}))