// ---------------------------------------------------------------------------
// Auth — mock authentication for the frontend demo.
// ---------------------------------------------------------------------------
// This module fakes sign-in/up/reset so the whole product flow works end to end
// (Landing → Login/Register → Dashboard) before any backend exists. It follows
// the same pattern as the rest of `src/api/*`: resolve mock data via
// `mockRequest`, with the real call sitting in a TODO right above.
//
// GOING LIVE — replace the mock bodies with either:
//   • Supabase:  supabase.auth.signInWithPassword({ email, password }) …
//   • DRF:       POST /api/v1/auth/login|register|password-reset …
// The AuthContext + pages consume these functions and won't need to change.
// ---------------------------------------------------------------------------
import { mockRequest, ApiError } from './client'
import { currentUser } from '../data/mockData'

// Demo account shown on the login page so anyone can try the product.
export const DEMO_CREDENTIALS = {
  email: 'alex@flowstack.io',
  password: 'password',
}

// Placeholder token so `apiFetch` has something to attach as a Bearer header.
const MOCK_TOKEN = 'demo.mock.jwt-token'

function initialsFromName(name = '') {
  const parts = name.trim().split(/\s+/).filter(Boolean)
  if (!parts.length) return 'FS'
  return (parts[0][0] + (parts[1]?.[0] ?? '')).toUpperCase()
}

// POST /api/v1/auth/login/  ->  { token, user }
export function login({ email, password }) {
  // TODO(supabase): const { data, error } = await supabase.auth
  //   .signInWithPassword({ email, password })
  // TODO(api): return apiFetch(`${API_BASE_URL}/auth/login/`, { method: 'POST', body: { email, password } })
  return mockRequest({}).then(() => {
    const ok =
      email?.trim().toLowerCase() === DEMO_CREDENTIALS.email &&
      password === DEMO_CREDENTIALS.password
    if (!ok) {
      throw new ApiError(
        'Invalid email or password. Try the demo credentials below.',
        { status: 401 }
      )
    }
    return { token: MOCK_TOKEN, user: currentUser }
  })
}

// One-click demo sign-in — no credentials required.
export function loginDemo() {
  // TODO(supabase/api): sign in a shared read-only demo account here.
  return mockRequest({ token: MOCK_TOKEN, user: currentUser })
}

// POST /api/v1/auth/register/  ->  { token, user }  (mock auto-login)
export function register({ name, email }) {
  // TODO(supabase): supabase.auth.signUp({ email, password })
  // TODO(api): return apiFetch(`${API_BASE_URL}/auth/register/`, { method: 'POST', body: {...} })
  return mockRequest({
    token: MOCK_TOKEN,
    user: {
      ...currentUser,
      name: name || currentUser.name,
      firstName: (name || currentUser.name).split(' ')[0],
      email: email || currentUser.email,
      initials: initialsFromName(name || currentUser.name),
    },
  })
}

// POST /api/v1/auth/password-reset/  ->  204
export function requestPasswordReset(email) {
  // TODO(supabase): supabase.auth.resetPasswordForEmail(email, { redirectTo })
  // TODO(api): return apiFetch(`${API_BASE_URL}/auth/password-reset/`, { method: 'POST', body: { email } })
  return mockRequest({ ok: true, email })
}

// POST /api/v1/auth/password-reset/confirm/  ->  204
export function resetPassword({ password, token }) {
  // TODO(supabase): supabase.auth.updateUser({ password })
  // TODO(api): return apiFetch(`${API_BASE_URL}/auth/password-reset/confirm/`, { method: 'POST', body: { password, token } })
  return mockRequest({ ok: true, token })
}

// POST /api/v1/auth/verify-email/resend/  ->  204
export function resendVerification(email) {
  // TODO(supabase): supabase.auth.resend({ type: 'signup', email })
  return mockRequest({ ok: true, email })
}
