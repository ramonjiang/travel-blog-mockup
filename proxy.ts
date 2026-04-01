import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { decrypt } from '@/lib/admin-session'

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl

  const sessionCookie = request.cookies.get('admin-session')?.value
  const session = sessionCookie ? await decrypt(sessionCookie) : null
  const isAuthenticated = !!session?.userId

  // Redirect authenticated users away from login
  if (pathname === '/admin/login' && isAuthenticated) {
    return NextResponse.redirect(new URL('/admin/dashboard', request.url))
  }

  // Redirect unauthenticated users to login
  if (pathname !== '/admin/login' && !isAuthenticated) {
    return NextResponse.redirect(new URL('/admin/login', request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/admin/:path*'],
}
