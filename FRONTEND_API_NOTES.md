# FlowStack — Frontend ↔ Backend Integration Notes

This document is the contract between the **React/Vite frontend** and the
**Django/DRF backend**. It lists, per page, exactly what data the UI needs, which
endpoint it expects, and the JSON shape it renders today (as mock data).

The frontend is **already wired for the real API** — it just runs on mock data
for now. No page or component code needs to change when the backend goes live.

---

## 1. How the frontend is structured for the backend

```
src/
  api/
    client.js         # base URL, auth, apiFetch(), endpoints map, USE_MOCKS flag
    me.js             # getMe(), updateMe()
    workspaces.js     # listWorkspaces(), createWorkspace()
    projects.js       # listProjects(), createProject()
    tasks.js          # listTasks(), createTask(), updateTask()
    members.js        # listMembers(), updateMemberRole(), removeMember()
    invitations.js    # listInvitations(), createInvitation(), resend/revoke
    analytics.js      # getAnalytics(), getOverview()
    billing.js        # getSubscription(), listPlans(), checkout/portal sessions
  hooks/
    useAsync.js       # standardizes loading / error / data + reload()
  data/
    mockData.js       # the seed data the api/* modules return today
```

- **Pages never call `fetch` directly.** They import a function from `src/api/*`
  and run it through `useAsync`, which yields `{ data, loading, error, reload }`.
- Every page renders four states: **loading** (`LoadingSkeleton`), **error**
  (`ErrorState` with a retry button), **empty** (`EmptyState`), and **data**.
- Each `src/api/*` function currently returns `mockRequest(...)` (a resolved
  promise with a small delay). Right above that line is a commented-out
  `apiFetch(endpoints.X())` call — the real implementation.

### Going live — the switch

1. Create `.env`:
   ```
   VITE_API_BASE_URL=http://localhost:8000/api/v1
   VITE_USE_MOCKS=false
   ```
2. In each `src/api/*.js`, swap the `mockRequest(...)` line for the `apiFetch(...)`
   line in the TODO comment above it.
3. Implement auth token storage/read in `getToken()` and the 401 handling in
   `apiFetch()` (both in `src/api/client.js`).

That's it — the component tree is untouched.

---

## 2. Cross-cutting requirements

- **Auth**: The app expects a bearer token (`Authorization: Bearer <jwt>`).
  A `401` should trigger token refresh, then redirect to `/login`. Wire this in
  `apiFetch()`. `App.jsx` also has a `TODO(auth)` to guard the `AppLayout` routes.
- **IDs**: The UI keys lists on a stable `id`. Workspaces/projects/tasks also
  carry a `uuid` used to build nested URLs. Please return both (or make `id` the
  uuid consistently).
- **Errors**: DRF's default `{ "detail": "..." }` is already surfaced by
  `ApiError.message` in `ErrorState`. Field-level errors arrive as `error.data`.
- **Dates**: ISO 8601 strings (`YYYY-MM-DD` or full ISO). The frontend formats
  them for display.
- **Pagination**: Lists currently expect a **plain array**. If DRF uses paginated
  responses (`{ count, next, previous, results }`), tell us and we'll read
  `.results` inside the `api/*` modules (one-line change per resource).
- **Colors/initials**: `color`, `avatarColor`, and `initials` are presentation
  helpers the frontend can derive itself. Send them if convenient, otherwise the
  UI will generate them.

---

## 3. Per-page requirements

### Dashboard / Overview — `/dashboard`
Needs a name for the greeting, top-line stats, two charts, recent projects,
recent activity, and upcoming deadlines.

- `GET /api/v1/me/` → `{ firstName }` (+ full profile, see Settings)
- `GET /api/v1/workspaces/{uuid}/analytics/` → overview slice:
  ```json
  {
    "stats": [
      { "key": "projects", "label": "Total Projects", "value": 24,
        "trend": 12.5, "icon": "FolderKanban", "spark": [8,10,9,12,14] }
    ],
    "charts": {
      "taskProgress": [ { "name": "Wk 1", "created": 40, "completed": 24 } ],
      "tasksByStatus": [ { "name": "Todo", "value": 48, "color": "#94a3b8" } ]
    },
    "activities": [
      { "id": "act_1", "actor": "Priya Nair", "action": "completed task",
        "target": "Finalize brand color tokens", "time": "12m ago",
        "initials": "PN", "avatarColor": "bg-fuchsia-500" }
    ],
    "upcomingDeadlines": [
      { "id": "dl_1", "title": "Brand Refresh", "date": "2026-07-15",
        "urgency": "today" }   // today | soon | week | later
    ]
  }
  ```
- `GET /api/v1/workspaces/{uuid}/projects/` → first 4 shown as "Recent Projects".

### Workspaces — `/workspaces`
- `GET /api/v1/workspaces/` → array:
  ```json
  { "id": "ws_1", "uuid": "…", "name": "Acme Product Team",
    "description": "…", "plan": "Pro", "membersCount": 12,
    "projectsCount": 8, "owner": "Alex Morgan",
    "color": "bg-brand-500", "initials": "AP" }
  ```
- `POST /api/v1/workspaces/` — body `{ name, description, plan }` → created object.

### Projects — `/projects`
- `GET /api/v1/workspaces/{uuid}/projects/` → array:
  ```json
  { "id": "prj_1", "uuid": "…", "name": "Mobile App Redesign",
    "workspace": "Acme Product Team", "progress": 72, "status": "On Track",
    "dueDate": "2026-08-12", "tasksTotal": 48, "tasksDone": 34,
    "color": "bg-brand-500",
    "members": [ { "id": "usr_1", "initials": "AM", "avatarColor": "bg-brand-500" } ] }
  ```
  `status` ∈ `On Track | At Risk | Delayed`.
- `POST /api/v1/workspaces/{uuid}/projects/` — body `{ name, workspace, dueDate, status }`.

### Tasks — `/tasks` (Kanban)
- `GET /api/v1/projects/{uuid}/tasks/` → array; UI groups by `status`:
  ```json
  { "id": "tsk_1", "title": "Audit onboarding funnel",
    "project": "Onboarding Flow Revamp", "status": "todo",
    "priority": "High", "dueDate": "2026-07-18", "tags": ["Research"],
    "assignee": { "id": "usr_1", "name": "Alex Morgan",
                  "initials": "AM", "avatarColor": "bg-brand-500" } }
  ```
  `status` (column keys) ∈ `todo | in_progress | review | done`.
  `priority` ∈ `High | Medium | Low`.
- `POST /api/v1/projects/{uuid}/tasks/` — create.
- `PATCH /api/v1/projects/{uuid}/tasks/{id}/` — used when a card moves columns
  (drag-and-drop is stubbed; endpoint is what it will call).

### Members — `/members`
- `GET /api/v1/workspaces/{uuid}/members/` → array:
  ```json
  { "id": "usr_1", "name": "Alex Morgan", "email": "alex@flowstack.io",
    "role": "Owner", "workspace": "Acme Product Team",
    "joined": "2024-01-12", "status": "Active",
    "initials": "AM", "avatarColor": "bg-brand-500" }
  ```
  `role` ∈ `Owner | Member`. `status` ∈ `Active | Invited | Suspended`.
- `PATCH /api/v1/workspaces/{uuid}/members/{id}/` — change role.
- `DELETE /api/v1/workspaces/{uuid}/members/{id}/` — remove (confirmed in UI).

### Invitations — `/invitations`
- `GET /api/v1/workspaces/{uuid}/invitations/` → array:
  ```json
  { "id": "inv_1", "email": "noah@partner.com", "role": "Member",
    "workspace": "Acme Product Team", "status": "Pending",
    "sentAt": "2026-07-11", "invitedBy": "Alex Morgan" }
  ```
  `status` ∈ `Pending | Accepted | Expired`.
- `POST /api/v1/workspaces/{uuid}/invitations/` — body `{ email, role }`.
- `POST /api/v1/workspaces/{uuid}/invitations/{id}/resend/` — resend email.
- `DELETE /api/v1/workspaces/{uuid}/invitations/{id}/` — revoke (confirmed in UI).

### Analytics — `/analytics`
- `GET /api/v1/workspaces/{uuid}/analytics/` → the full analytics object:
  ```json
  {
    "kpis": [ { "label": "Productivity Score", "value": "87%", "trend": 4.2 } ],
    "taskProgress":   [ { "name": "Wk 1", "created": 40, "completed": 24 } ],
    "tasksByStatus":  [ { "name": "Todo", "value": 48, "color": "#94a3b8" } ],
    "teamWorkload":   [ { "name": "Alex", "tasks": 32 } ],
    "projectsProgress":[ { "name": "Mobile App", "progress": 72 } ],
    "usage": [ { "label": "Storage Used", "value": 6.4, "max": 10, "unit": "GB" } ]
  }
  ```
  (The Overview page reads a subset of this same endpoint — see Dashboard.)
- The date-range `<select>` (Last 30 days / 7 days / quarter) should become a
  `?range=` query param when wired.

### Billing — `/billing`
- `GET /api/v1/billing/subscription/`:
  ```json
  {
    "currentPlan": { "name": "Pro", "price": 24, "interval": "month",
                     "renewsOn": "2026-08-14", "status": "Active" },
    "usage": [ { "label": "Projects", "used": 24, "limit": 50, "unit": "" } ],
    "history": [ { "id": "in_1042", "date": "2026-07-01", "amount": 24.0,
                   "status": "Paid", "plan": "Pro Monthly" } ]
  }
  ```
- `POST /api/v1/billing/checkout-session/` — body `{ plan }` → `{ "url": "https://checkout.stripe.com/…" }`. Frontend redirects to `url`.
- `POST /api/v1/billing/portal-session/` → `{ "url": "…" }`. Frontend redirects.
- Pricing plans render from static content today; optionally serve them via a
  `GET /api/v1/billing/plans/` (already stubbed as `listPlans()`).

### Settings — `/settings`
- `GET /api/v1/me/` → profile:
  ```json
  { "id": "usr_1", "name": "Alex Morgan", "firstName": "Alex",
    "email": "alex@flowstack.io", "role": "Owner", "plan": "Pro",
    "jobTitle": "Head of Product", "timezone": "UTC+00:00",
    "initials": "AM", "avatarColor": "bg-brand-500" }
  ```
- `PATCH /api/v1/me/` — profile tab save.
- Workspace / notifications / security tabs are local-state only for now; they'll
  map to workspace-settings, notification-preferences, and password/2FA endpoints
  when those exist. (Flagged with TODOs in `Settings.jsx`.)

---

## 4. Endpoint summary (matches the DRF router the frontend expects)

| Method | Path | Used by |
| ------ | ---- | ------- |
| GET    | `/api/v1/me/` | Overview, Settings, Topbar, Sidebar |
| PATCH  | `/api/v1/me/` | Settings |
| GET/POST | `/api/v1/workspaces/` | Workspaces, WorkspaceSwitcher |
| GET    | `/api/v1/workspaces/{uuid}/members/` | Members |
| PATCH/DELETE | `/api/v1/workspaces/{uuid}/members/{id}/` | Members |
| GET/POST | `/api/v1/workspaces/{uuid}/projects/` | Projects, Overview |
| GET/POST | `/api/v1/projects/{uuid}/tasks/` | Tasks |
| PATCH  | `/api/v1/projects/{uuid}/tasks/{id}/` | Tasks (move) |
| GET/POST | `/api/v1/workspaces/{uuid}/invitations/` | Invitations, Members |
| DELETE | `/api/v1/workspaces/{uuid}/invitations/{id}/` | Invitations |
| GET    | `/api/v1/workspaces/{uuid}/analytics/` | Analytics, Overview |
| GET    | `/api/v1/billing/subscription/` | Billing |
| POST   | `/api/v1/billing/checkout-session/` | Billing, Sidebar upgrade |
| POST   | `/api/v1/billing/portal-session/` | Billing |

---

## 5. Open questions for the backend

1. **Pagination** — plain arrays or DRF paginated envelopes?
2. **Active workspace** — is it a server-side concept, or does the frontend pass
   the selected workspace `uuid` on every nested call? (UI assumes the latter.)
3. **Overview vs Analytics** — one analytics endpoint returning both slices, or
   two endpoints? (Frontend can consume either.)
4. **Notifications** (Topbar bell) — REST poll or websocket? Not yet wired.
5. **Auth flow** — JWT (access/refresh) vs session cookies, and the token endpoints.
