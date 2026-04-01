import { NextResponse } from 'next/server'
import { createServerClient } from '@/lib/supabase'
import type { Trip } from '@/lib/types'

export async function GET() {
  const supabase = createServerClient()

  const { data, error } = await supabase
    .from('trips')
    .select('*, media(*)')
    .eq('published', true)
    .order('trip_date', { ascending: false })
    .order('sort_order', { ascending: true, referencedTable: 'media' })

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json(data as Trip[])
}
