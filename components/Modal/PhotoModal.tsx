'use client'

import { useEffect } from 'react'
import type { Trip } from '@/lib/types'
import { format } from 'date-fns'
import PhotoGrid from './PhotoGrid'

interface Props {
  trip: Trip | null
  onClose: () => void
}

export default function PhotoModal({ trip, onClose }: Props) {
  // Close on Escape key
  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [onClose])

  // Lock body scroll when open
  useEffect(() => {
    document.body.style.overflow = trip ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [trip])

  return (
    <div
      className={`modal-overlay${trip ? ' open' : ''}`}
      onClick={(e) => { if (e.target === e.currentTarget) onClose() }}
    >
      <div className="modal-sheet">
        <div className="modal-handle" />
        <div className="modal-header">
          <div>
            <h3>{trip?.name}</h3>
            <div className="modal-date">
              {trip && (() => { const [y,m] = trip.trip_date.split('-').map(Number); return `${trip.location} · ${format(new Date(y, m-1, 1), 'MMM yyyy')}` })()}
            </div>
          </div>
          <button className="modal-close" onClick={onClose}>&times;</button>
        </div>
        {trip && <PhotoGrid media={trip.media} />}
      </div>
    </div>
  )
}
