export interface Product {
  id: string
  name: string
  category: string
  price: number
  originalPrice?: number
  description: string
  usage: string
  image: string
  rating: number
  reviews: number
  inStock: boolean
  badge?: string
}

export interface Testimonial {
  id: string
  name: string
  location: string
  image: string
  quote: string
  crop: string
}

export interface Review {
  id: string
  author: string
  rating: number
  comment: string
  date: string
  verified: boolean
}

export interface OrderItem {
  id: string
  name: string
  price: number
  quantity: number
}

export interface Order {
  id: string
  items: OrderItem[]
  total: number
  date: string
  status: string
}
export interface CartItem {
  id: string
  name: string
  price: number
  image: string
  quantity: number
}


export interface User {
  name: string
  email: string
}

export interface WishlistItem {
  id: string
  name: string
  price: number
  image: string
}