// ---------------------------------------------------------------------------
// Invitations  —  /api/v1/workspaces/{uuid}/invitations/
// ---------------------------------------------------------------------------
import { apiFetch, endpoints, mockRequest } from './client'
import { invitations } from '../data/mockData'

// GET /api/v1/workspaces/{uuid}/invitations/  ->  pending/accepted/expired.
export function listInvitations(workspaceUuid) {
  // TODO(api): return apiFetch(endpoints.workspaceInvitations(workspaceUuid))
  return mockRequest(invitations)
}

// POST /api/v1/workspaces/{uuid}/invitations/  ->  send an invitation.
// payload: { email, role, workspace }
export function createInvitation(workspaceUuid, payload) {
  // TODO(api): return apiFetch(endpoints.workspaceInvitations(workspaceUuid), { method: 'POST', body: payload })
  return mockRequest({
    id: `inv_${Date.now()}`,
    status: 'Pending',
    sentAt: new Date().toISOString().slice(0, 10),
    invitedBy: 'You',
    ...payload,
  })
}

// POST /api/v1/workspaces/{uuid}/invitations/{id}/resend/  ->  resend email.
export function resendInvitation(workspaceUuid, id) {
  // TODO(api): return apiFetch(`${endpoints.invitation(workspaceUuid, id)}resend/`, { method: 'POST' })
  return mockRequest({ id, resent: true })
}

// DELETE /api/v1/workspaces/{uuid}/invitations/{id}/  ->  revoke an invite.
export function revokeInvitation(workspaceUuid, id) {
  // TODO(api): return apiFetch(endpoints.invitation(workspaceUuid, id), { method: 'DELETE' })
  return mockRequest({ id, revoked: true })
}
