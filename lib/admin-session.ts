import 'server-only'
import { SignJWT, jwtVerify } from 'jose'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { cache } from 'react'

const key = new TextEncoder().encode(process.env.ADMIN_SESSION_SECRET!)
const COOKIE_NAME = 'admin-session'
const DURATION_DAYS = 7

export async function encrypt(payload: { userId: string }) {
  return new SignJWT(payload)
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime(`${DURATION_DAYS}d`)
    .sign(key)
}

export async function decrypt(token: string): Promise<{ userId: string } | null> {
  try {
    const { payload } = await jwtVerify(token, key, { algorithms: ['HS256'] })
    return payload as { userId: string }
  } catch {
    return null
  }
}

export async function createAdminSession(userId: string) {
  const expiresAt = new Date(Date.now() + DURATION_DAYS * 86_400_000)
  const token = await encrypt({ userId })
  const cookieStore = await cookies()
  cookieStore.set(COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    expires: expiresAt,
    path: '/',
  })
}

export async function deleteAdminSession() {
  const cookieStore = await cookies()
  cookieStore.delete(COOKIE_NAME)
}

export const verifyAdminSession = cache(async () => {
  const cookieStore = await cookies()
  const token = cookieStore.get(COOKIE_NAME)?.value
  if (!token) redirect('/admin/login')
  const session = await decrypt(token)
  if (!session?.userId) redirect('/admin/login')
  return { userId: session.userId }
})
