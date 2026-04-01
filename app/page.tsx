import Header from '@/components/Header'
import PageClient from '@/components/PageClient'
import { createServerClient } from '@/lib/supabase'
import type { Trip } from '@/lib/types'

export const revalidate = 3600 // re-fetch from Supabase at most every hour

async function fetchTrips(): Promise<Trip[]> {
  const supabase = createServerClient()
  const { data, error } = await supabase
    .from('trips')
    .select('*, media(*)')
    .eq('published', true)
    .order('trip_date', { ascending: false })
    .order('sort_order', { ascending: true, referencedTable: 'media' })

  if (error) {
    console.error('Failed to fetch trips:', error.message)
    return []
  }
  return data as Trip[]
}

export default async function HomePage() {
  const trips = await fetchTrips()

  return (
    <>
      <Header />
      <PageClient trips={trips} />
    </>
  )
}
