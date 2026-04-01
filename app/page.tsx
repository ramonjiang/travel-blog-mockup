'use client'

import { useState } from 'react'
import Header from '@/components/Header'
import GlobeWrapper from '@/components/Globe/GlobeWrapper'
import Timeline from '@/components/Timeline/Timeline'
import type { Trip } from '@/lib/types'

// Static data — will be replaced by Supabase fetch in Phase 2
const TRIPS: Trip[] = [
  {
    id: 'bali-2026',
    name: 'Bali',
    location: 'Bali, Indonesia',
    country: 'Indonesia',
    lat: -8.3405, lng: 115.092,
    trip_date: '2026-03-01',
    description: 'Rice terraces, temple ceremonies, and warm ocean water.',
    cover_public_id: null,
    published: true,
    media: [
      { id: '1', trip_id: 'bali-2026', cloudinary_public_id: '', resource_type: 'image', is_wide: true, duration_seconds: null, sort_order: 0 },
      { id: '2', trip_id: 'bali-2026', cloudinary_public_id: '', resource_type: 'image', is_wide: false, duration_seconds: null, sort_order: 1 },
      { id: '3', trip_id: 'bali-2026', cloudinary_public_id: '', resource_type: 'image', is_wide: false, duration_seconds: null, sort_order: 2 },
      { id: '4', trip_id: 'bali-2026', cloudinary_public_id: '', resource_type: 'video', is_wide: false, duration_seconds: 55, sort_order: 3 },
    ],
  },
  {
    id: 'pv-dec-2025',
    name: 'Puerto Vallarta',
    location: 'Puerto Vallarta, Mexico',
    country: 'Mexico',
    lat: 20.6534, lng: -105.2253,
    trip_date: '2025-12-01',
    description: 'Cobblestone streets, Malecón sunsets, and fresh ceviche.',
    cover_public_id: null,
    published: true,
    media: [
      { id: '5', trip_id: 'pv-dec-2025', cloudinary_public_id: '', resource_type: 'image', is_wide: true, duration_seconds: null, sort_order: 0 },
      { id: '6', trip_id: 'pv-dec-2025', cloudinary_public_id: '', resource_type: 'image', is_wide: false, duration_seconds: null, sort_order: 1 },
      { id: '7', trip_id: 'pv-dec-2025', cloudinary_public_id: '', resource_type: 'video', is_wide: false, duration_seconds: 33, sort_order: 2 },
      { id: '8', trip_id: 'pv-dec-2025', cloudinary_public_id: '', resource_type: 'image', is_wide: false, duration_seconds: null, sort_order: 3 },
    ],
  },
  {
    id: 'pv-oct-2025',
    name: 'Puerto Vallarta',
    location: 'Puerto Vallarta, Mexico',
    country: 'Mexico',
    lat: 20.6534, lng: -105.2253,
    trip_date: '2025-10-01',
    description: 'Back to the PV. Beach days, rooftop dinners, warm Pacific water.',
    cover_public_id: null,
    published: true,
    media: [
      { id: '9', trip_id: 'pv-oct-2025', cloudinary_public_id: '', resource_type: 'image', is_wide: true, duration_seconds: null, sort_order: 0 },
      { id: '10', trip_id: 'pv-oct-2025', cloudinary_public_id: '', resource_type: 'image', is_wide: false, duration_seconds: null, sort_order: 1 },
      { id: '11', trip_id: 'pv-oct-2025', cloudinary_public_id: '', resource_type: 'image', is_wide: false, duration_seconds: null, sort_order: 2 },
      { id: '12', trip_id: 'pv-oct-2025', cloudinary_public_id: '', resource_type: 'video', is_wide: false, duration_seconds: 28, sort_order: 3 },
    ],
  },
  {
    id: 'encinitas-oct-2025',
    name: 'Encinitas',
    location: 'Encinitas, CA',
    country: 'USA',
    lat: 33.0369, lng: -117.2920,
    trip_date: '2025-10-01',
    description: 'Fall surf sessions and coastal walks along Moonlight Beach.',
    cover_public_id: null,
    published: true,
    media: [
      { id: '13', trip_id: 'encinitas-oct-2025', cloudinary_public_id: '', resource_type: 'image', is_wide: true, duration_seconds: null, sort_order: 0 },
      { id: '14', trip_id: 'encinitas-oct-2025', cloudinary_public_id: '', resource_type: 'image', is_wide: false, duration_seconds: null, sort_order: 1 },
      { id: '15', trip_id: 'encinitas-oct-2025', cloudinary_public_id: '', resource_type: 'image', is_wide: false, duration_seconds: null, sort_order: 2 },
      { id: '16', trip_id: 'encinitas-oct-2025', cloudinary_public_id: '', resource_type: 'video', is_wide: false, duration_seconds: 20, sort_order: 3 },
    ],
  },
  {
    id: 'encinitas-aug-2025',
    name: 'Encinitas',
    location: 'Encinitas, CA',
    country: 'USA',
    lat: 33.0369, lng: -117.2920,
    trip_date: '2025-08-01',
    description: 'Summer vibes on the 101. Tacos, sunshine, and longboard sessions.',
    cover_public_id: null,
    published: true,
    media: [
      { id: '17', trip_id: 'encinitas-aug-2025', cloudinary_public_id: '', resource_type: 'image', is_wide: true, duration_seconds: null, sort_order: 0 },
      { id: '18', trip_id: 'encinitas-aug-2025', cloudinary_public_id: '', resource_type: 'image', is_wide: false, duration_seconds: null, sort_order: 1 },
      { id: '19', trip_id: 'encinitas-aug-2025', cloudinary_public_id: '', resource_type: 'video', is_wide: false, duration_seconds: 45, sort_order: 2 },
      { id: '20', trip_id: 'encinitas-aug-2025', cloudinary_public_id: '', resource_type: 'image', is_wide: false, duration_seconds: null, sort_order: 3 },
    ],
  },
  {
    id: 'cabo-2025',
    name: 'Cabo',
    location: 'Cabo San Lucas, Mexico',
    country: 'Mexico',
    lat: 22.8905, lng: -109.9167,
    trip_date: '2025-07-01',
    description: "Land's End arch, deep sea fishing, and poolside days.",
    cover_public_id: null,
    published: true,
    media: [
      { id: '21', trip_id: 'cabo-2025', cloudinary_public_id: '', resource_type: 'image', is_wide: true, duration_seconds: null, sort_order: 0 },
      { id: '22', trip_id: 'cabo-2025', cloudinary_public_id: '', resource_type: 'image', is_wide: false, duration_seconds: null, sort_order: 1 },
      { id: '23', trip_id: 'cabo-2025', cloudinary_public_id: '', resource_type: 'image', is_wide: false, duration_seconds: null, sort_order: 2 },
      { id: '24', trip_id: 'cabo-2025', cloudinary_public_id: '', resource_type: 'video', is_wide: false, duration_seconds: 38, sort_order: 3 },
    ],
  },
  {
    id: 'oahu-2025',
    name: 'Oahu',
    location: 'Oahu, Hawaii',
    country: 'USA',
    lat: 21.3069, lng: -157.8583,
    trip_date: '2025-06-01',
    description: 'North Shore swell, Diamond Head hike, shave ice in Haleiwa.',
    cover_public_id: null,
    published: true,
    media: [
      { id: '25', trip_id: 'oahu-2025', cloudinary_public_id: '', resource_type: 'image', is_wide: true, duration_seconds: null, sort_order: 0 },
      { id: '26', trip_id: 'oahu-2025', cloudinary_public_id: '', resource_type: 'image', is_wide: false, duration_seconds: null, sort_order: 1 },
      { id: '27', trip_id: 'oahu-2025', cloudinary_public_id: '', resource_type: 'image', is_wide: false, duration_seconds: null, sort_order: 2 },
      { id: '28', trip_id: 'oahu-2025', cloudinary_public_id: '', resource_type: 'video', is_wide: false, duration_seconds: 50, sort_order: 3 },
      { id: '29', trip_id: 'oahu-2025', cloudinary_public_id: '', resource_type: 'image', is_wide: false, duration_seconds: null, sort_order: 4 },
    ],
  },
  {
    id: 'encinitas-apr-2025',
    name: 'Encinitas',
    location: 'Encinitas, CA',
    country: 'USA',
    lat: 33.0369, lng: -117.2920,
    trip_date: '2025-04-01',
    description: "Spring along the coast. Swami's surf spot and Leucadia eats.",
    cover_public_id: null,
    published: true,
    media: [
      { id: '30', trip_id: 'encinitas-apr-2025', cloudinary_public_id: '', resource_type: 'image', is_wide: true, duration_seconds: null, sort_order: 0 },
      { id: '31', trip_id: 'encinitas-apr-2025', cloudinary_public_id: '', resource_type: 'image', is_wide: false, duration_seconds: null, sort_order: 1 },
      { id: '32', trip_id: 'encinitas-apr-2025', cloudinary_public_id: '', resource_type: 'video', is_wide: false, duration_seconds: 32, sort_order: 2 },
      { id: '33', trip_id: 'encinitas-apr-2025', cloudinary_public_id: '', resource_type: 'image', is_wide: false, duration_seconds: null, sort_order: 3 },
    ],
  },
  {
    id: 'mazatlan-2025',
    name: 'Mazatlán',
    location: 'Mazatlán, Mexico',
    country: 'Mexico',
    lat: 23.2494, lng: -106.4111,
    trip_date: '2025-01-01',
    description: 'Historic centro, stone island ferry, and some of the best Pacific sunsets.',
    cover_public_id: null,
    published: true,
    media: [
      { id: '34', trip_id: 'mazatlan-2025', cloudinary_public_id: '', resource_type: 'image', is_wide: true, duration_seconds: null, sort_order: 0 },
      { id: '35', trip_id: 'mazatlan-2025', cloudinary_public_id: '', resource_type: 'image', is_wide: false, duration_seconds: null, sort_order: 1 },
      { id: '36', trip_id: 'mazatlan-2025', cloudinary_public_id: '', resource_type: 'image', is_wide: false, duration_seconds: null, sort_order: 2 },
      { id: '37', trip_id: 'mazatlan-2025', cloudinary_public_id: '', resource_type: 'video', is_wide: false, duration_seconds: 40, sort_order: 3 },
    ],
  },
  {
    id: 'sayulita-2024',
    name: 'Sayulita',
    location: 'Sayulita, Mexico',
    country: 'Mexico',
    lat: 20.8675, lng: -105.5022,
    trip_date: '2024-01-01',
    description: 'Colorful pueblo vibes, surf lessons, and fish tacos on the beach.',
    cover_public_id: null,
    published: true,
    media: [
      { id: '38', trip_id: 'sayulita-2024', cloudinary_public_id: '', resource_type: 'image', is_wide: true, duration_seconds: null, sort_order: 0 },
      { id: '39', trip_id: 'sayulita-2024', cloudinary_public_id: '', resource_type: 'image', is_wide: false, duration_seconds: null, sort_order: 1 },
      { id: '40', trip_id: 'sayulita-2024', cloudinary_public_id: '', resource_type: 'image', is_wide: false, duration_seconds: null, sort_order: 2 },
      { id: '41', trip_id: 'sayulita-2024', cloudinary_public_id: '', resource_type: 'video', is_wide: false, duration_seconds: 35, sort_order: 3 },
    ],
  },
]

export default function HomePage() {
  const [scrollToId, setScrollToId] = useState<string | null>(null)
  const tripCount = TRIPS.length
  const countryCount = new Set(TRIPS.map(t => t.country)).size

  return (
    <>
      <Header />

      {/* Globe Section */}
      <section className="globe-section" id="globe">
        <div className="globe-title">
          <h1>Where I&apos;ve Been</h1>
          <p>Spin the globe to explore my travels</p>
          <div className="trip-count">
            <span className="dot" />
            <span>{tripCount} trips across {countryCount} countries</span>
          </div>
        </div>
        <GlobeWrapper trips={TRIPS} onTripClick={setScrollToId} />
        <p className="globe-hint">drag to spin &middot; click a pin to jump to trip</p>
      </section>

      <Timeline trips={TRIPS} scrollToId={scrollToId} />
    </>
  )
}
