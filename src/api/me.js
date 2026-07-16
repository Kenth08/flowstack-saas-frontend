// ---------------------------------------------------------------------------
// Current user  —  /api/v1/me/
// ---------------------------------------------------------------------------
import { apiFetch, endpoints, mockRequest } from './client'
import { currentUser } from '../data/mockData'

// GET /api/v1/me/  ->  the authenticated user's profile.
export function getMe() {
  // TODO(api): return apiFetch(endpoints.me())
  return mockRequest(currentUser)
}

// PATCH /api/v1/me/  ->  update profile (Settings > Profile).
export function updateMe(payload) {
  // TODO(api): return apiFetch(endpoints.me(), { method: 'PATCH', body: payload })
  return mockRequest({ ...currentUser, ...payload })
}
