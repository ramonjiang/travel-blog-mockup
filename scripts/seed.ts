import { createClient } from '@supabase/supabase-js'
import * as dotenv from 'dotenv'
import { resolve } from 'path'

dotenv.config({ path: resolve(process.cwd(), '.env.local') })

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

const trips = [
  {
    id: 'bali-2026',
    name: 'Bali',
    location: 'Bali, Indonesia',
    country: 'Indonesia',
    lat: -8.3405, lng: 115.092,
    trip_date: '2026-03-01',
    description: 'Rice terraces, temple ceremonies, and warm ocean water.',
  },
  {
    id: 'pv-dec-2025',
    name: 'Puerto Vallarta',
    location: 'Puerto Vallarta, Mexico',
    country: 'Mexico',
    lat: 20.6534, lng: -105.2253,
    trip_date: '2025-12-01',
    description: 'Cobblestone streets, Malecón sunsets, and fresh ceviche.',
  },
  {
    id: 'pv-oct-2025',
    name: 'Puerto Vallarta',
    location: 'Puerto Vallarta, Mexico',
    country: 'Mexico',
    lat: 20.6534, lng: -105.2253,
    trip_date: '2025-10-01',
    description: 'Back to the PV. Beach days, rooftop dinners, warm Pacific water.',
  },
  {
    id: 'encinitas-oct-2025',
    name: 'Encinitas',
    location: 'Encinitas, CA',
    country: 'USA',
    lat: 33.0369, lng: -117.2920,
    trip_date: '2025-10-01',
    description: 'Fall surf sessions and coastal walks along Moonlight Beach.',
  },
  {
    id: 'encinitas-aug-2025',
    name: 'Encinitas',
    location: 'Encinitas, CA',
    country: 'USA',
    lat: 33.0369, lng: -117.2920,
    trip_date: '2025-08-01',
    description: 'Summer vibes on the 101. Tacos, sunshine, and longboard sessions.',
  },
  {
    id: 'cabo-2025',
    name: 'Cabo',
    location: 'Cabo San Lucas, Mexico',
    country: 'Mexico',
    lat: 22.8905, lng: -109.9167,
    trip_date: '2025-07-01',
    description: "Land's End arch, deep sea fishing, and poolside days.",
  },
  {
    id: 'oahu-2025',
    name: 'Oahu',
    location: 'Oahu, Hawaii',
    country: 'USA',
    lat: 21.3069, lng: -157.8583,
    trip_date: '2025-06-01',
    description: 'North Shore swell, Diamond Head hike, shave ice in Haleiwa.',
  },
  {
    id: 'encinitas-apr-2025',
    name: 'Encinitas',
    location: 'Encinitas, CA',
    country: 'USA',
    lat: 33.0369, lng: -117.2920,
    trip_date: '2025-04-01',
    description: "Spring along the coast. Swami's surf spot and Leucadia eats.",
  },
  {
    id: 'mazatlan-2025',
    name: 'Mazatlán',
    location: 'Mazatlán, Mexico',
    country: 'Mexico',
    lat: 23.2494, lng: -106.4111,
    trip_date: '2025-01-01',
    description: 'Historic centro, stone island ferry, and some of the best Pacific sunsets.',
  },
  {
    id: 'sayulita-2024',
    name: 'Sayulita',
    location: 'Sayulita, Mexico',
    country: 'Mexico',
    lat: 20.8675, lng: -105.5022,
    trip_date: '2024-01-01',
    description: 'Colorful pueblo vibes, surf lessons, and fish tacos on the beach.',
  },
]

async function seed() {
  console.log('Seeding trips...')
  const { error: tripsError } = await supabase.from('trips').upsert(trips)
  if (tripsError) {
    console.error('Failed to seed trips:', tripsError.message)
    process.exit(1)
  }
  console.log(`✓ Inserted ${trips.length} trips`)
  console.log('\nDone. Media rows will be added after Cloudinary is set up.')
}

seed()
