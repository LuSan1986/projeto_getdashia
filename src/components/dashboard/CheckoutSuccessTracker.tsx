'use client'

import { useEffect, useRef } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'

type GtagFn = (...args: unknown[]) => void

export default function CheckoutSuccessTracker() {
  const searchParams = useSearchParams()
  const router       = useRouter()
  const fired        = useRef(false)

  useEffect(() => {
    if (fired.current) return
    if (searchParams.get('success') !== 'true') return

    fired.current = true

    const amountCents = parseInt(searchParams.get('amount_cents') ?? '0', 10)
    const value       = amountCents / 100

    const win = window as Window & { gtag?: GtagFn }
    win.gtag?.('event', 'conversion', {
      send_to:  'AW-18379845957/YUHkCNX13d4cEMXimLxE',
      value,
      currency: 'BRL',
    })

    // Clean up URL so a page refresh doesn't re-fire the conversion
    router.replace('/dashboard', { scroll: false })
  }, [searchParams, router])

  return null
}
