export interface MediaItem {
  id: string
  trip_id: string
  cloudinary_public_id: string
  resource_type: 'image' | 'video'
  is_wide: boolean
  duration_seconds: number | null
  sort_order: number
}

export interface Trip {
  id: string
  name: string
  location: string
  country: string          // e.g. "Mexico", "USA", "Indonesia"
  lat: number
  lng: number
  trip_date: string        // ISO date string: "2026-03-01"
  description: string
  cover_public_id: string | null
  published: boolean
  media: MediaItem[]
}
