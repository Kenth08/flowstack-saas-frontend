// ---------------------------------------------------------------------------
// Members  —  /api/v1/workspaces/{uuid}/members/
// ---------------------------------------------------------------------------
import { apiFetch, endpoints, mockRequest } from './client'
import { members } from '../data/mockData'

// GET /api/v1/workspaces/{uuid}/members/  ->  members of a workspace.
export function listMembers(workspaceUuid) {
  // TODO(api): return apiFetch(endpoints.workspaceMembers(workspaceUuid))
  return mockRequest(members)
}

// PATCH /api/v1/workspaces/{uuid}/members/{id}/  ->  change a member's role.
export function updateMemberRole(workspaceUuid, id, role) {
  // TODO(api): return apiFetch(`${endpoints.workspaceMembers(workspaceUuid)}${id}/`, { method: 'PATCH', body: { role } })
  return mockRequest({ id, role })
}

// DELETE /api/v1/workspaces/{uuid}/members/{id}/  ->  remove a member.
export function removeMember(workspaceUuid, id) {
  // TODO(api): return apiFetch(`${endpoints.workspaceMembers(workspaceUuid)}${id}/`, { method: 'DELETE' })
  return mockRequest({ id, removed: true })
}
