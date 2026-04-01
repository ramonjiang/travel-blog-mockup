'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { createServerClient, createBrowserClient } from '@/lib/supabase'
import { createAdminSession, deleteAdminSession, verifyAdminSession } from '@/lib/admin-session'
import type { MediaItem } from '@/lib/types'

// ── Auth ──────────────────────────────────────────────────────────────────────

export async function loginAction(_prevState: unknown, formData: FormData) {
  const email = formData.get('email') as string
  const password = formData.get('password') as string

  const supabase = createBrowserClient()
  const { data, error } = await supabase.auth.signInWithPassword({ email, password })

  if (error || !data.user) {
    return { error: 'Invalid email or password.' }
  }

  await createAdminSession(data.user.id)
  redirect('/admin/dashboard')
}

export async function logoutAction() {
  await deleteAdminSession()
  redirect('/admin/login')
}

// ── Trips ─────────────────────────────────────────────────────────────────────

export async function createTripAction(_prevState: unknown, formData: FormData) {
  await verifyAdminSession()
  const supabase = createServerClient()

  const tripDate = `${formData.get('year')}-${String(formData.get('month')).padStart(2, '0')}-01`

  const { error } = await supabase.from('trips').insert({
    id: formData.get('id') as string,
    name: formData.get('name') as string,
    location: formData.get('location') as string,
    country: formData.get('country') as string,
    lat: parseFloat(formData.get('lat') as string),
    lng: parseFloat(formData.get('lng') as string),
    trip_date: tripDate,
    description: formData.get('description') as string,
    published: false,
  })

  if (error) return { error: error.message }

  revalidatePath('/')
  revalidatePath('/admin/dashboard')
  redirect('/admin/dashboard')
}

export async function updateTripAction(_prevState: unknown, formData: FormData) {
  await verifyAdminSession()
  const supabase = createServerClient()

  const id = formData.get('id') as string
  const tripDate = `${formData.get('year')}-${String(formData.get('month')).padStart(2, '0')}-01`

  const { error } = await supabase.from('trips').update({
    name: formData.get('name') as string,
    location: formData.get('location') as string,
    country: formData.get('country') as string,
    lat: parseFloat(formData.get('lat') as string),
    lng: parseFloat(formData.get('lng') as string),
    trip_date: tripDate,
    description: formData.get('description') as string,
  }).eq('id', id)

  if (error) return { error: error.message }

  revalidatePath('/')
  revalidatePath('/admin/dashboard')
  revalidatePath(`/admin/trips/${id}`)
  return { success: true }
}

export async function togglePublishedAction(tripId: string, published: boolean) {
  await verifyAdminSession()
  const supabase = createServerClient()
  await supabase.from('trips').update({ published }).eq('id', tripId)
  revalidatePath('/')
  revalidatePath('/admin/dashboard')
}

// ── Media ─────────────────────────────────────────────────────────────────────

export async function saveMediaAction(media: Omit<MediaItem, 'id'>) {
  await verifyAdminSession()
  const supabase = createServerClient()
  const { error } = await supabase.from('media').insert(media)
  if (error) return { error: error.message }
  revalidatePath(`/admin/trips/${media.trip_id}`)
  revalidatePath('/')
  return { success: true }
}

export async function deleteMediaAction(mediaId: string, tripId: string) {
  await verifyAdminSession()
  const supabase = createServerClient()
  await supabase.from('media').delete().eq('id', mediaId)
  revalidatePath(`/admin/trips/${tripId}`)
  revalidatePath('/')
}

export async function updateMediaAction(
  mediaId: string,
  tripId: string,
  fields: Partial<Pick<MediaItem, 'is_wide' | 'sort_order'>>
) {
  await verifyAdminSession()
  const supabase = createServerClient()
  await supabase.from('media').update(fields).eq('id', mediaId)
  revalidatePath(`/admin/trips/${tripId}`)
}
