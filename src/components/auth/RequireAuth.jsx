import { Navigate, Outlet, useLocation } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'

// ---------------------------------------------------------------------------
// RequireAuth — guards the dashboard routes.
// If there's no (mock) session, redirect to /login and remember where the user
// was headed via a `?next=` param so login can send them back afterward.
//
// TODO(auth): with real Supabase/JWT auth, also handle the "session still
// loading" state here (show a splash) before deciding to redirect.
// ---------------------------------------------------------------------------
export default function RequireAuth() {
  const { isAuthenticated } = useAuth()
  const location = useLocation()

  if (!isAuthenticated) {
    const next = encodeURIComponent(location.pathname + location.search)
    return <Navigate to={`/login?next=${next}`} replace />
  }

  return <Outlet />
}

// RedirectIfAuthed — for /login and /register: a signed-in user shouldn't see
// the auth forms, so send them straight to the dashboard (or their `next`).
export function RedirectIfAuthed({ children }) {
  const { isAuthenticated } = useAuth()
  const location = useLocation()

  if (isAuthenticated) {
    const params = new URLSearchParams(location.search)
    const next = params.get('next')
    return <Navigate to={next ? decodeURIComponent(next) : '/dashboard'} replace />
  }

  return children
}
