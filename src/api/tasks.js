// ---------------------------------------------------------------------------
// Tasks  —  /api/v1/projects/{uuid}/tasks/
// ---------------------------------------------------------------------------
import { apiFetch, endpoints, mockRequest } from './client'
import { tasks, taskColumns } from '../data/mockData'

// The Kanban column definitions are static UI config, not a network resource,
// but exposing them here keeps every page importing task shapes from one place.
export { taskColumns }

// GET /api/v1/projects/{uuid}/tasks/  ->  tasks for a project (kanban board).
export function listTasks(projectUuid) {
  // TODO(api): return apiFetch(endpoints.projectTasks(projectUuid))
  return mockRequest(tasks)
}

// POST /api/v1/projects/{uuid}/tasks/  ->  create a task.
// payload: { title, status, priority, assignee, dueDate }
export function createTask(projectUuid, payload) {
  // TODO(api): return apiFetch(endpoints.projectTasks(projectUuid), { method: 'POST', body: payload })
  return mockRequest({ id: `tsk_${Date.now()}`, tags: [], ...payload })
}

// PATCH /api/v1/projects/{uuid}/tasks/{id}/  ->  move a task / edit fields.
// Used when a card changes column (drag-and-drop) or is edited in the modal.
export function updateTask(projectUuid, id, payload) {
  // TODO(api): return apiFetch(endpoints.task(projectUuid, id), { method: 'PATCH', body: payload })
  return mockRequest({ id, ...payload })
}
