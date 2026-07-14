# FlowStack

A professional **team project management SaaS** dashboard — frontend only.
Built to look and feel like a real product (Trello / Asana / Linear / Monday
inspired), ready to connect to a Django/DRF backend later.

> This is a **frontend prototype**. All data is mocked. Every place that will
> talk to the backend is marked with a `TODO(api)` comment.

## Tech stack

- **React 18** + **Vite**
- **JavaScript (JSX)** — no TypeScript
- **Tailwind CSS** for styling
- **React Router DOM** for routing
- **Framer Motion** for subtle animations
- **Lucide React** for icons
- **Recharts** for charts

## Getting started

```bash
npm install
npm run dev      # start dev server at http://localhost:5173
npm run build    # production build
npm run preview  # preview the production build
```

## Routes

| Route          | Page          | Description                                   |
| -------------- | ------------- | --------------------------------------------- |
| `/`            | Landing       | Public marketing page (hero, features, pricing, FAQ) |
| `/login`       | Login         | Auth — sign in                                |
| `/register`    | Register      | Auth — create account                         |
| `/dashboard`   | Overview      | Stats, charts, recent projects, activity      |
| `/workspaces`  | Workspaces    | Workspace cards + create modal                |
| `/projects`    | Projects      | Grid/table toggle, filters, create modal      |
| `/tasks`       | Tasks         | Kanban board + task detail/add modals         |
| `/members`     | Members       | Members table + invite modal                  |
| `/invitations` | Invitations   | Invite list with status + invite modal        |
| `/analytics`   | Analytics     | Charts, KPIs, workload, usage                 |
| `/billing`     | Billing       | Plan, usage, pricing, invoice history         |
| `/settings`    | Settings      | Profile, workspace, notifications, theme, security |

## Project structure

```
src/
├── App.jsx                 # Routes
├── main.jsx                # Entry + Router
├── index.css               # Tailwind + shared component classes
├── data/
│   └── mockData.js         # All mock data (maps 1:1 to future endpoints)
├── lib/
│   ├── api.js              # Endpoint map + fetch wrapper (backend hookup point)
│   └── cn.js               # className helper
├── components/
│   ├── ui/                 # Button, Badge, Modal, Avatar, Toast, Skeleton, …
│   ├── layout/             # AppLayout, Sidebar, Topbar, WorkspaceSwitcher, AuthLayout
│   ├── dashboard/          # StatCard, ChartCard, chart mocks, ActivityFeed
│   ├── projects/           # ProjectCard
│   ├── tasks/              # TaskCard, KanbanBoard
│   ├── members/            # MemberTable
│   └── billing/            # PricingCard, BillingUsageCard
└── pages/                  # One file per route
```

## Connecting the backend (later)

The frontend is structured so the backend can be wired in without restructuring:

1. **`src/lib/api.js`** already lists every planned endpoint and provides an
   `apiFetch` wrapper. Add the base URL, auth headers, and error handling there.
2. Search the codebase for **`TODO(api)`** — each marks a spot where mock data
   should be replaced with a real request.

Planned endpoints:

```
GET  /api/v1/me/
GET  /api/v1/workspaces/
GET  /api/v1/workspaces/{uuid}/projects/
GET  /api/v1/projects/{uuid}/tasks/
POST /api/v1/workspaces/{uuid}/invitations/
GET  /api/v1/workspaces/{uuid}/analytics/
GET  /api/v1/billing/subscription/
POST /api/v1/billing/checkout-session/   # Stripe Checkout
POST /api/v1/billing/portal-session/     # Stripe billing portal
```

## Notes

- The Kanban board is laid out to be **drag-and-drop ready** (see `TODO(dnd)`),
  but DnD is not wired up yet.
- Toasts, modals, filters, and view toggles all work with local state.
- Loading **skeletons** live in `components/ui/Skeleton.jsx` for when real API
  loading states are added.
