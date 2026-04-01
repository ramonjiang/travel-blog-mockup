'use client'

import { useState, useEffect, useRef } from 'react'
import type { Trip } from '@/lib/types'
import { format } from 'date-fns'

interface Props {
  trip: Trip
  isActive: boolean
  onActivate: () => void
  onOpenModal: (trip: Trip) => void
}

export default function TripCard({ trip, isActive, onActivate, onOpenModal }: Props) {
  const ref = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)

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

  const [y, m] = trip.trip_date.split('-').map(Number)
  const localDate = new Date(y, m - 1, 1)
  const month = format(localDate, 'MMMM')
  const year = format(localDate, 'yyyy')

  return (
    <div
      ref={ref}
      className={`trip-card fade-in${visible ? ' visible' : ''}${isActive ? ' active' : ''}`}
      id={`trip-${trip.id}`}
      onClick={onActivate}
    >
      <div className="dot" />
      <div className="card-content">
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <div style={{ flex: 1 }}>
            <div className="trip-date">
              <span className="trip-month">{month}</span> {year}
            </div>
            <div className="trip-name">{trip.name}</div>
            <div className="trip-location-teaser">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                <circle cx="12" cy="10" r="3" />
              </svg>
              {trip.location}
            </div>
          </div>
          <span className="expand-icon">&#x25BE;</span>
        </div>
        <div className="trip-details">
          <p>{trip.description}</p>
          <button
            className="view-photos-btn"
            onClick={(e) => { e.stopPropagation(); onOpenModal(trip) }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <rect x="3" y="3" width="18" height="18" rx="2" />
              <circle cx="8.5" cy="8.5" r="1.5" />
              <path d="m21 15-5-5L5 21" />
            </svg>
            View Photos &amp; Videos
          </button>
        </div>
      </div>
    </div>
  )
}
