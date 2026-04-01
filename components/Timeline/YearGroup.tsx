'use client'

import { useState, useEffect, useRef } from 'react'
import type { Trip } from '@/lib/types'
import TripCard from './TripCard'

interface Props {
  year: number
  trips: Trip[]
  activeId: string | null
  onActivate: (id: string | null) => void
  onOpenModal: (trip: Trip) => void
}

export default function YearGroup({ year, trips, activeId, onActivate, onOpenModal }: Props) {
  const [collapsed, setCollapsed] = useState(true)
  const [visible, setVisible] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true) },
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return (
    <>
      <div
        ref={ref}
        className={`year-marker fade-in${visible ? ' visible' : ''}${collapsed ? ' collapsed' : ''}`}
        onClick={() => setCollapsed(c => !c)}
      >
        <div className="year-label" />
        <h3>
          {year} <span className="year-count">({trips.length})</span>
          <span className="year-toggle">&#x25BE;</span>
        </h3>
      </div>
      <div className={`year-trips${collapsed ? ' collapsed' : ''}`}>
        {trips.map(trip => (
          <TripCard
            key={trip.id}
            trip={trip}
            isActive={activeId === trip.id}
            onActivate={() => onActivate(activeId === trip.id ? null : trip.id)}
            onOpenModal={onOpenModal}
          />
        ))}
      </div>
    </>
  )
}
