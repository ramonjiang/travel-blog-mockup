'use client'

import { useActionState } from 'react'
import { loginAction } from '@/lib/admin-actions'

export default function LoginForm() {
  const [state, action, pending] = useActionState(loginAction, undefined)

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <form action={action} style={{ width: '100%', maxWidth: 380, padding: '0 1.5rem' }}>
        <div className="logo" style={{ marginBottom: '2.5rem' }}>
          <span className="logo-line-1">Sea</span>
          <span className="logo-line-2"><span className="logo-s">S</span>urf</span>
        </div>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '2rem' }}>Admin Panel</p>

        {state?.error && (
          <div style={{ background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.3)', borderRadius: 8, padding: '0.75rem 1rem', color: '#ef4444', fontSize: '0.875rem', marginBottom: '1.25rem' }}>
            {state.error}
          </div>
        )}

        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
          <input className="admin-input" name="email" type="email" placeholder="Email" required autoComplete="email" />
          <input className="admin-input" name="password" type="password" placeholder="Password" required autoComplete="current-password" />
          <button className="admin-btn admin-btn-primary" type="submit" disabled={pending} style={{ width: '100%', justifyContent: 'center', marginTop: '0.5rem' }}>
            {pending ? 'Signing in…' : 'Sign In'}
          </button>
        </div>
      </form>
    </div>
  )
}
