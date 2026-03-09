export const API_URL =
  process.env.NEXT_PUBLIC_API_URL || 'https://your-backend.onrender.com/api'

export const apiEndpoints = {
  products: `${API_URL}/products`,
  cart: `${API_URL}/cart`,
  auth: `${API_URL}/auth`,
}