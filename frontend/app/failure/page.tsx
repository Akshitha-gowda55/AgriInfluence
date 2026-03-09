import { Suspense } from 'react'
import FailurePageClient from './failure-page-client'

export default function FailurePage() {
  return (
    <Suspense fallback={<div className="p-6">Loading payment details...</div>}>
      <FailurePageClient />
    </Suspense>
  )
}