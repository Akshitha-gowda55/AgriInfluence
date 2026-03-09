export const API_URL =
  process.env.NEXT_PUBLIC_API_URL
    ? `${process.env.NEXT_PUBLIC_API_URL}/api`
    : 'http://localhost:5000/api'

export const apiEndpoints = {
  products: `${API_URL}/products`,
  cart: `${API_URL}/cart`,
  auth: `${API_URL}/auth`,
}