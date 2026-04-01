'use client'

import dynamic from 'next/dynamic'
import type { Trip } from '@/lib/types'

const GlobeInner = dynamic(() => import('./GlobeInner'), {
  ssr: false,
  loading: () => <div id="globe-container" />,
})

interface Props {
  trips: Trip[]
  onTripClick: (tripId: string) => void
}

export default function GlobeWrapper({ trips, onTripClick }: Props) {
  return <GlobeInner trips={trips} onTripClick={onTripClick} />
}
