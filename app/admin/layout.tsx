import { verifyAdminSession } from '@/lib/admin-session'
import { logoutAction } from '@/lib/admin-actions'

export const metadata = { title: 'Admin — SEA Surf' }

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  await verifyAdminSession()

  return (
    <div className="admin-layout">
      <aside className="admin-sidebar">
        <div className="logo" style={{ marginBottom: '2rem' }}>
          <span className="logo-line-1">Sea</span>
          <span className="logo-line-2"><span className="logo-s">S</span>urf</span>
        </div>
        <nav style={{ flex: 1 }}>
          <a href="/admin/dashboard" className="admin-nav-link">Trips</a>
          <a href="/admin/trips/new" className="admin-nav-link">+ New Trip</a>
        </nav>
        <form action={logoutAction}>
          <button type="submit" className="admin-btn admin-btn-ghost" style={{ width: '100%', justifyContent: 'center' }}>
            Logout
          </button>
        </form>
      </aside>
      <main className="admin-content">{children}</main>
    </div>
  )
}
