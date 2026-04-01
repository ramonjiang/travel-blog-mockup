'use client'

import { useState, useCallback } from 'react'
import type { Trip } from '@/lib/types'
import YearGroup from './YearGroup'
import PhotoModal from '../Modal/PhotoModal'

interface Props {
  trips: Trip[]
  scrollToId: string | null
}

export default function Timeline({ trips, scrollToId }: Props) {
  const [activeId, setActiveId] = useState<string | null>(null)
  const [modalTrip, setModalTrip] = useState<Trip | null>(null)

  // Group trips by year, sorted newest first
  const byYear = trips.reduce<Record<number, Trip[]>>((acc, trip) => {
    const year = parseInt(trip.trip_date.split('-')[0])
    ;(acc[year] ??= []).push(trip)
    return acc
  }, {})
  const years = Object.keys(byYear).map(Number).sort((a, b) => b - a)

  // Called by globe pin clicks
  const handleScrollTo = useCallback((id: string) => {
    const el = document.getElementById(`trip-${id}`)
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'center' })
      setTimeout(() => setActiveId(id), 500)
    }
  }, [])

  // Effect: react to globe click
  useState(() => {
    if (scrollToId) handleScrollTo(scrollToId)
  })

  return (
    <>
      <section className="timeline-section" id="timeline">
        <div className="timeline-header">
          <h2>My Journey</h2>
          <p>Tap a trip to see details, then view photos</p>
        </div>
        <div className="timeline">
          {years.map(year => (
            <YearGroup
              key={year}
              year={year}
              trips={byYear[year]}
              activeId={activeId}
              onActivate={setActiveId}
              onOpenModal={setModalTrip}
            />
          ))}
        </div>
      </section>
      <PhotoModal trip={modalTrip} onClose={() => setModalTrip(null)} />
    </>
  )
}
