import { Suspense } from 'react'
import SuccessPageClient from './success-page-client.tsx'

export default function SuccessPage() {
  return (
    <Suspense fallback={<div className="p-6">Loading order details...</div>}>
      <SuccessPageClient />
    </Suspense>
  )
}