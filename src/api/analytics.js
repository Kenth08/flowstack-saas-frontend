// ---------------------------------------------------------------------------
// Analytics  —  /api/v1/workspaces/{uuid}/analytics/
// ---------------------------------------------------------------------------
import { apiFetch, endpoints, mockRequest } from './client'
import {
  analytics,
  overviewStats,
  activities,
  upcomingDeadlines,
} from '../data/mockData'

// GET /api/v1/workspaces/{uuid}/analytics/  ->  charts + KPIs for the
// Analytics page (task progress, tasks by status, workload, usage, ...).
export function getAnalytics(workspaceUuid) {
  // TODO(api): return apiFetch(endpoints.workspaceAnalytics(workspaceUuid))
  return mockRequest(analytics)
}

// GET /api/v1/workspaces/{uuid}/analytics/  (overview slice)
// The dashboard/Overview page needs stat tiles, recent activity, and upcoming
// deadlines. The backend can return these under the same analytics endpoint;
// this helper bundles the pieces the Overview page renders.
export function getOverview(workspaceUuid) {
  // TODO(api): return apiFetch(endpoints.workspaceAnalytics(workspaceUuid))
  //   and read { stats, charts, activities, upcomingDeadlines } from the payload.
  return mockRequest({
    stats: overviewStats,
    charts: {
      taskProgress: analytics.taskProgress,
      tasksByStatus: analytics.tasksByStatus,
    },
    activities,
    upcomingDeadlines,
  })
}
