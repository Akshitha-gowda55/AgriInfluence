import { Suspense } from 'react'
import SuccessPageClient from './success-page-client'

export default function SuccessPage() {
  return (
    <Suspense fallback={<div className="p-6">Loading order details...</div>}>
      <SuccessPageClient />
    </Suspense>
  )
}