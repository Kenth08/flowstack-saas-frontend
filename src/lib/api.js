// ---------------------------------------------------------------------------
// FlowStack — API layer (placeholder)
// ---------------------------------------------------------------------------
// The frontend currently reads from `src/data/mockData.js`. This module is the
// single place where the real Django/DRF backend will be wired in later.
//
// Backend partner note: base URL, auth headers (JWT/session), and error
// handling all belong here so pages/components never talk to fetch directly.
// ---------------------------------------------------------------------------

// TODO(api): Read from an env var, e.g. import.meta.env.VITE_API_BASE_URL
export const API_BASE_URL = '/api/v1'

// ---------------------------------------------------------------------------
// Endpoint map — keep in sync with the DRF router.
// Functions build URLs so callers don't hardcode paths.
// ---------------------------------------------------------------------------
export const endpoints = {
  // Auth / current user
  me: () => `${API_BASE_URL}/me/`, // GET  /api/v1/me/

  // Workspaces
  workspaces: () => `${API_BASE_URL}/workspaces/`, // GET /api/v1/workspaces/
  workspaceProjects: (workspaceUuid) =>
    `${API_BASE_URL}/workspaces/${workspaceUuid}/projects/`, // GET /api/v1/workspaces/{uuid}/projects/
  workspaceMembers: (workspaceUuid) =>
    `${API_BASE_URL}/workspaces/${workspaceUuid}/members/`,
  workspaceInvitations: (workspaceUuid) =>
    `${API_BASE_URL}/workspaces/${workspaceUuid}/invitations/`, // GET/POST /api/v1/workspaces/{uuid}/invitations/
  workspaceAnalytics: (workspaceUuid) =>
    `${API_BASE_URL}/workspaces/${workspaceUuid}/analytics/`, // GET /api/v1/workspaces/{uuid}/analytics/

  // Projects / tasks
  projectTasks: (projectUuid) =>
    `${API_BASE_URL}/projects/${projectUuid}/tasks/`, // GET /api/v1/projects/{uuid}/tasks/

  // Billing
  subscription: () => `${API_BASE_URL}/billing/subscription/`, // GET /api/v1/billing/subscription/
  checkoutSession: () => `${API_BASE_URL}/billing/checkout-session/`, // POST /api/v1/billing/checkout-session/
  portalSession: () => `${API_BASE_URL}/billing/portal-session/`, // POST /api/v1/billing/portal-session/
}

// ---------------------------------------------------------------------------
// Thin fetch wrapper — ready for when the backend is live.
// TODO(api): attach auth token, handle 401 refresh, and normalize errors.
// ---------------------------------------------------------------------------
export async function apiFetch(url, options = {}) {
  const res = await fetch(url, {
    headers: {
      'Content-Type': 'application/json',
      // TODO(api): Authorization: `Bearer ${getToken()}`
      ...options.headers,
    },
    ...options,
  })

  if (!res.ok) {
    // TODO(api): map DRF error payloads to a consistent shape for the UI
    throw new Error(`Request failed: ${res.status}`)
  }

  return res.status === 204 ? null : res.json()
}

// ---------------------------------------------------------------------------
// Example of how a page will consume this once the backend exists:
//
//   import { endpoints, apiFetch } from '@/lib/api'
//   const projects = await apiFetch(endpoints.workspaceProjects(uuid))
//
// For now, pages import directly from '@/data/mockData'.
// ---------------------------------------------------------------------------
