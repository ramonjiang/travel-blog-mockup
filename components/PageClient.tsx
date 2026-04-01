'use client'

import { useState } from 'react'
import GlobeWrapper from '@/components/Globe/GlobeWrapper'
import Timeline from '@/components/Timeline/Timeline'
import type { Trip } from '@/lib/types'

interface Props {
  trips: Trip[]
}

export default function PageClient({ trips }: Props) {
  const [scrollToId, setScrollToId] = useState<string | null>(null)
  const tripCount = trips.length
  const countryCount = new Set(trips.map(t => t.country)).size

  return (
    <>
      <section className="globe-section" id="globe">
        <div className="globe-title">
          <h1>Where I&apos;ve Been</h1>
          <p>Spin the globe to explore my travels</p>
          <div className="trip-count">
            <span className="dot" />
            <span>{tripCount} trips across {countryCount} countries</span>
          </div>
        </div>
        <GlobeWrapper trips={trips} onTripClick={setScrollToId} />
        <p className="globe-hint">drag to spin &middot; click a pin to jump to trip</p>
      </section>
      <Timeline trips={trips} scrollToId={scrollToId} />
    </>
  )
}
