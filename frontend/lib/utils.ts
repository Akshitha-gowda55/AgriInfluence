export function formatCurrency(value: number) {
  return `₹${value.toFixed(2)}`
}

export function formatDate(date: string | Date) {
  return new Date(date).toLocaleDateString()
}

export function generateId() {
  return Math.random().toString(36).substring(2, 10)
}