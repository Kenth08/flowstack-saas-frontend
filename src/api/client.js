// ---------------------------------------------------------------------------
// FlowStack — API client
// ---------------------------------------------------------------------------
// This is the single place where the frontend talks to the (future) Django/DRF
// backend. Every resource module in `src/api/*` builds on top of this file.
//
// Right now the app runs on mock data (see `src/data/mockData.js`). The service
// functions call `mockRequest()` so the whole app already behaves as if it were
// async: pages show loading skeletons, handle errors, and render empty states.
//
// GOING LIVE — when the backend is ready:
//   1. Set VITE_API_BASE_URL in a `.env` file (e.g. http://localhost:8000/api/v1).
//   2. Flip USE_MOCKS to false (or set VITE_USE_MOCKS=false).
//   3. In each `src/api/*.js` module, swap the `mockRequest(...)` line for the
//      `apiFetch(endpoints.X())` line that sits right above it in a TODO comment.
//   4. Wire real auth in `getToken()` / the 401 handler below.
// No page or component code needs to change — they only import from `src/api/*`.
// ---------------------------------------------------------------------------

// Base URL for the DRF API. Reads from Vite env, falls back to a dev proxy path.
// TODO(api): create `.env` with VITE_API_BASE_URL=http://localhost:8000/api/v1
export const API_BASE_URL =
  import.meta.env?.VITE_API_BASE_URL || '/api/v1'

// Master switch between mock data and the real backend.
// TODO(api): set VITE_USE_MOCKS=false (or hardcode false) once the API is live.
export const USE_MOCKS =
  (import.meta.env?.VITE_USE_MOCKS ?? 'true') !== 'false'

// ---------------------------------------------------------------------------
// Endpoint map — keep in sync with the DRF router.
// Functions build URLs so callers never hardcode paths.
// ---------------------------------------------------------------------------
export const endpoints = {
  // Auth / current user
  me: () => `${API_BASE_URL}/me/`, // GET /api/v1/me/

  // Workspaces
  workspaces: () => `${API_BASE_URL}/workspaces/`, // GET/POST /api/v1/workspaces/
  workspaceMembers: (wsUuid) =>
    `${API_BASE_URL}/workspaces/${wsUuid}/members/`, // GET /api/v1/workspaces/{uuid}/members/
  workspaceProjects: (wsUuid) =>
    `${API_BASE_URL}/workspaces/${wsUuid}/projects/`, // GET/POST /api/v1/workspaces/{uuid}/projects/
  workspaceInvitations: (wsUuid) =>
    `${API_BASE_URL}/workspaces/${wsUuid}/invitations/`, // GET/POST /api/v1/workspaces/{uuid}/invitations/
  invitation: (wsUuid, id) =>
    `${API_BASE_URL}/workspaces/${wsUuid}/invitations/${id}/`, // DELETE / resend
  workspaceAnalytics: (wsUuid) =>
    `${API_BASE_URL}/workspaces/${wsUuid}/analytics/`, // GET /api/v1/workspaces/{uuid}/analytics/

  // Projects / tasks
  projectTasks: (projectUuid) =>
    `${API_BASE_URL}/projects/${projectUuid}/tasks/`, // GET/POST /api/v1/projects/{uuid}/tasks/
  task: (projectUuid, id) =>
    `${API_BASE_URL}/projects/${projectUuid}/tasks/${id}/`, // PATCH/DELETE

  // Billing
  subscription: () => `${API_BASE_URL}/billing/subscription/`, // GET /api/v1/billing/subscription/
  checkoutSession: () => `${API_BASE_URL}/billing/checkout-session/`, // POST /api/v1/billing/checkout-session/
  portalSession: () => `${API_BASE_URL}/billing/portal-session/`, // POST /api/v1/billing/portal-session/
}

// ---------------------------------------------------------------------------
// ApiError — a consistent error shape the UI can rely on (ErrorState, toasts).
// ---------------------------------------------------------------------------
export class ApiError extends Error {
  constructor(message, { status = 0, data = null } = {}) {
    super(message)
    this.name = 'ApiError'
    this.status = status
    this.data = data
  }
}

// Reads the (mock) session token that AuthContext stores in localStorage, so
// authenticated mock requests already carry a Bearer header.
// TODO(auth): swap for the real JWT/session token (Supabase or DRF) when live.
function getToken() {
  try {
    return localStorage.getItem('flowstack_token')
  } catch {
    return null
  }
}

// ---------------------------------------------------------------------------
// apiFetch — the real network call. Unused while USE_MOCKS is true, but ready:
// resource modules already reference it in their TODO lines.
// ---------------------------------------------------------------------------
export async function apiFetch(url, options = {}) {
  const token = getToken()
  let res
  try {
    res = await fetch(url, {
      headers: {
        'Content-Type': 'application/json',
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
        ...options.headers,
      },
      ...options,
      // Serialize plain-object bodies automatically.
      body:
        options.body && typeof options.body !== 'string'
          ? JSON.stringify(options.body)
          : options.body,
    })
  } catch (networkErr) {
    throw new ApiError('Network error — please check your connection.', {
      status: 0,
    })
  }

  // TODO(auth): on 401, try a token refresh, then redirect to /login on failure.
  if (!res.ok) {
    let data = null
    try {
      data = await res.json()
    } catch {
      /* body was not JSON */
    }
    // DRF commonly returns { detail: "..." } or field-keyed error objects.
    const message =
      data?.detail || `Request failed with status ${res.status}`
    throw new ApiError(message, { status: res.status, data })
  }

  return res.status === 204 ? null : res.json()
}

// ---------------------------------------------------------------------------
// mockRequest — resolves cloned mock data after a short delay so the UI
// exercises real loading/empty/error flows. Delete once USE_MOCKS is gone.
// ---------------------------------------------------------------------------
export function mockRequest(data, { delay = 450 } = {}) {
  return new Promise((resolve) => {
    setTimeout(() => resolve(clone(data)), delay)
  })
}

// Deep-clone so callers can safely mutate mock results without corrupting the
// shared seed data in `src/data/mockData.js`.
function clone(data) {
  if (typeof structuredClone === 'function') return structuredClone(data)
  return JSON.parse(JSON.stringify(data))
}
