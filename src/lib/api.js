// ---------------------------------------------------------------------------
// DEPRECATED — moved to `src/api/`.
// ---------------------------------------------------------------------------
// The API layer now lives under `src/api/`: a shared client (`src/api/client.js`)
// plus one module per resource (workspaces, projects, tasks, members, …).
//
// This file is kept only so older imports don't break. Prefer importing from
// the resource modules, e.g.:
//     import { listProjects } from '@/api/projects'
//     import { apiFetch, endpoints } from '@/api/client'
// ---------------------------------------------------------------------------
export {
  API_BASE_URL,
  USE_MOCKS,
  endpoints,
  apiFetch,
  ApiError,
  mockRequest,
} from '../api/client'
