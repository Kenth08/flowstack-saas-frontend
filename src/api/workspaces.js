// ---------------------------------------------------------------------------
// Workspaces  —  /api/v1/workspaces/
// ---------------------------------------------------------------------------
import { apiFetch, endpoints, mockRequest } from './client'
import { workspaces } from '../data/mockData'

// GET /api/v1/workspaces/  ->  workspaces the user belongs to.
export function listWorkspaces() {
  // TODO(api): return apiFetch(endpoints.workspaces())
  return mockRequest(workspaces)
}

// POST /api/v1/workspaces/  ->  create a workspace.
// payload: { name, description, plan }
export function createWorkspace(payload) {
  // TODO(api): return apiFetch(endpoints.workspaces(), { method: 'POST', body: payload })
  return mockRequest({
    id: `ws_${Date.now()}`,
    uuid: crypto.randomUUID?.() ?? `ws-${Date.now()}`,
    membersCount: 1,
    projectsCount: 0,
    color: 'bg-brand-500',
    initials: (payload?.name || 'NW').slice(0, 2).toUpperCase(),
    owner: 'You',
    ...payload,
  })
}
