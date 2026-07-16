// ---------------------------------------------------------------------------
// Projects  —  /api/v1/workspaces/{uuid}/projects/
// ---------------------------------------------------------------------------
import { apiFetch, endpoints, mockRequest } from './client'
import { projects } from '../data/mockData'

// GET /api/v1/workspaces/{uuid}/projects/  ->  projects in a workspace.
// While on mock data, `workspaceUuid` is accepted but not used for filtering.
export function listProjects(workspaceUuid) {
  // TODO(api): return apiFetch(endpoints.workspaceProjects(workspaceUuid))
  return mockRequest(projects)
}

// POST /api/v1/workspaces/{uuid}/projects/  ->  create a project.
// payload: { name, workspace, dueDate, status }
export function createProject(workspaceUuid, payload) {
  // TODO(api): return apiFetch(endpoints.workspaceProjects(workspaceUuid), { method: 'POST', body: payload })
  return mockRequest({
    id: `prj_${Date.now()}`,
    uuid: crypto.randomUUID?.() ?? `prj-${Date.now()}`,
    progress: 0,
    tasksTotal: 0,
    tasksDone: 0,
    members: [],
    color: 'bg-brand-500',
    status: 'On Track',
    ...payload,
  })
}
