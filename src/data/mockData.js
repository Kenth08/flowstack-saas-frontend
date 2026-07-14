// ---------------------------------------------------------------------------
// FlowStack — Mock data
// ---------------------------------------------------------------------------
// This file provides realistic fake data so the UI looks complete before the
// backend exists. Every export below maps to a future Django/DRF endpoint.
// When wiring the real API, replace these imports with fetch/react-query calls
// (see `src/lib/api.js` for the endpoint map) and delete the mock objects.
// ---------------------------------------------------------------------------

// Small helper so avatars are deterministic and don't need image assets.
// Returns initials that <Avatar /> renders on a colored background.
export const avatarColors = [
  'bg-brand-500',
  'bg-emerald-500',
  'bg-rose-500',
  'bg-amber-500',
  'bg-sky-500',
  'bg-fuchsia-500',
  'bg-teal-500',
  'bg-indigo-500',
]

// ---------------------------------------------------------------------------
// Current user  ->  GET /api/v1/me/
// ---------------------------------------------------------------------------
export const currentUser = {
  id: 'usr_001',
  name: 'Alex Morgan',
  firstName: 'Alex',
  email: 'alex@flowstack.io',
  role: 'Owner',
  plan: 'Pro',
  avatarColor: 'bg-brand-500',
  initials: 'AM',
  timezone: 'UTC+00:00',
  jobTitle: 'Head of Product',
}

// ---------------------------------------------------------------------------
// Workspaces  ->  GET /api/v1/workspaces/
// ---------------------------------------------------------------------------
export const workspaces = [
  {
    id: 'ws_001',
    uuid: '2f1c8a10-0001-4a10-9b21-000000000001',
    name: 'Acme Product Team',
    plan: 'Pro',
    membersCount: 12,
    projectsCount: 8,
    owner: 'Alex Morgan',
    color: 'bg-brand-500',
    initials: 'AP',
    description: 'Core product, growth, and design squads.',
  },
  {
    id: 'ws_002',
    uuid: '2f1c8a10-0002-4a10-9b21-000000000002',
    name: 'Marketing HQ',
    plan: 'Business',
    membersCount: 7,
    projectsCount: 5,
    owner: 'Priya Nair',
    color: 'bg-fuchsia-500',
    initials: 'MH',
    description: 'Campaigns, content, and brand.',
  },
  {
    id: 'ws_003',
    uuid: '2f1c8a10-0003-4a10-9b21-000000000003',
    name: 'Engineering Guild',
    plan: 'Free',
    membersCount: 4,
    projectsCount: 3,
    owner: 'Alex Morgan',
    color: 'bg-emerald-500',
    initials: 'EG',
    description: 'Platform, infra, and DX initiatives.',
  },
]

// ---------------------------------------------------------------------------
// Members  ->  GET /api/v1/workspaces/{uuid}/members/
// ---------------------------------------------------------------------------
export const members = [
  {
    id: 'usr_001',
    name: 'Alex Morgan',
    email: 'alex@flowstack.io',
    role: 'Owner',
    workspace: 'Acme Product Team',
    joined: '2024-01-12',
    status: 'Active',
    initials: 'AM',
    avatarColor: 'bg-brand-500',
  },
  {
    id: 'usr_002',
    name: 'Priya Nair',
    email: 'priya@flowstack.io',
    role: 'Member',
    workspace: 'Marketing HQ',
    joined: '2024-02-03',
    status: 'Active',
    initials: 'PN',
    avatarColor: 'bg-fuchsia-500',
  },
  {
    id: 'usr_003',
    name: 'Diego Silva',
    email: 'diego@flowstack.io',
    role: 'Member',
    workspace: 'Acme Product Team',
    joined: '2024-02-18',
    status: 'Active',
    initials: 'DS',
    avatarColor: 'bg-emerald-500',
  },
  {
    id: 'usr_004',
    name: 'Mei Chen',
    email: 'mei@flowstack.io',
    role: 'Member',
    workspace: 'Engineering Guild',
    joined: '2024-03-09',
    status: 'Active',
    initials: 'MC',
    avatarColor: 'bg-sky-500',
  },
  {
    id: 'usr_005',
    name: 'Tomas Novak',
    email: 'tomas@flowstack.io',
    role: 'Member',
    workspace: 'Acme Product Team',
    joined: '2024-04-01',
    status: 'Invited',
    initials: 'TN',
    avatarColor: 'bg-amber-500',
  },
  {
    id: 'usr_006',
    name: 'Sara Ahmed',
    email: 'sara@flowstack.io',
    role: 'Member',
    workspace: 'Marketing HQ',
    joined: '2024-04-22',
    status: 'Active',
    initials: 'SA',
    avatarColor: 'bg-rose-500',
  },
  {
    id: 'usr_007',
    name: 'Liam Walsh',
    email: 'liam@flowstack.io',
    role: 'Member',
    workspace: 'Engineering Guild',
    joined: '2024-05-15',
    status: 'Suspended',
    initials: 'LW',
    avatarColor: 'bg-indigo-500',
  },
]

// Reusable compact assignees (subset of members) for avatar groups on cards.
export const assignees = members.slice(0, 6).map((m) => ({
  id: m.id,
  name: m.name,
  initials: m.initials,
  avatarColor: m.avatarColor,
}))

// ---------------------------------------------------------------------------
// Projects  ->  GET /api/v1/workspaces/{uuid}/projects/
// ---------------------------------------------------------------------------
export const projects = [
  {
    id: 'prj_001',
    uuid: '3a2c8a10-0001-4a10-9b21-000000000001',
    name: 'Mobile App Redesign',
    workspace: 'Acme Product Team',
    progress: 72,
    status: 'On Track',
    dueDate: '2026-08-12',
    tasksTotal: 48,
    tasksDone: 34,
    members: [assignees[0], assignees[2], assignees[3]],
    color: 'bg-brand-500',
  },
  {
    id: 'prj_002',
    uuid: '3a2c8a10-0002-4a10-9b21-000000000002',
    name: 'Q3 Growth Campaign',
    workspace: 'Marketing HQ',
    progress: 45,
    status: 'At Risk',
    dueDate: '2026-07-28',
    tasksTotal: 30,
    tasksDone: 13,
    members: [assignees[1], assignees[5]],
    color: 'bg-fuchsia-500',
  },
  {
    id: 'prj_003',
    uuid: '3a2c8a10-0003-4a10-9b21-000000000003',
    name: 'Billing Platform v2',
    workspace: 'Engineering Guild',
    progress: 88,
    status: 'On Track',
    dueDate: '2026-07-20',
    tasksTotal: 55,
    tasksDone: 48,
    members: [assignees[3], assignees[0], assignees[4]],
    color: 'bg-emerald-500',
  },
  {
    id: 'prj_004',
    uuid: '3a2c8a10-0004-4a10-9b21-000000000004',
    name: 'Design System 2.0',
    workspace: 'Acme Product Team',
    progress: 60,
    status: 'On Track',
    dueDate: '2026-09-05',
    tasksTotal: 40,
    tasksDone: 24,
    members: [assignees[2], assignees[1]],
    color: 'bg-sky-500',
  },
  {
    id: 'prj_005',
    uuid: '3a2c8a10-0005-4a10-9b21-000000000005',
    name: 'Onboarding Flow Revamp',
    workspace: 'Acme Product Team',
    progress: 25,
    status: 'Delayed',
    dueDate: '2026-07-16',
    tasksTotal: 22,
    tasksDone: 5,
    members: [assignees[0], assignees[3], assignees[5]],
    color: 'bg-amber-500',
  },
  {
    id: 'prj_006',
    uuid: '3a2c8a10-0006-4a10-9b21-000000000006',
    name: 'Brand Refresh',
    workspace: 'Marketing HQ',
    progress: 95,
    status: 'On Track',
    dueDate: '2026-07-15',
    tasksTotal: 18,
    tasksDone: 17,
    members: [assignees[1], assignees[5], assignees[2]],
    color: 'bg-rose-500',
  },
]

// ---------------------------------------------------------------------------
// Tasks  ->  GET /api/v1/projects/{uuid}/tasks/
// Grouped by kanban column key: todo | in_progress | review | done
// ---------------------------------------------------------------------------
export const taskColumns = [
  { key: 'todo', title: 'Todo', accent: 'bg-slate-400' },
  { key: 'in_progress', title: 'In Progress', accent: 'bg-brand-500' },
  { key: 'review', title: 'Review', accent: 'bg-amber-500' },
  { key: 'done', title: 'Done', accent: 'bg-emerald-500' },
]

export const tasks = [
  {
    id: 'tsk_001',
    title: 'Audit current onboarding funnel',
    project: 'Onboarding Flow Revamp',
    status: 'todo',
    priority: 'High',
    assignee: assignees[0],
    dueDate: '2026-07-18',
    tags: ['Research'],
  },
  {
    id: 'tsk_002',
    title: 'Design empty states for dashboard',
    project: 'Design System 2.0',
    status: 'todo',
    priority: 'Medium',
    assignee: assignees[2],
    dueDate: '2026-07-22',
    tags: ['Design'],
  },
  {
    id: 'tsk_003',
    title: 'Set up Stripe webhook handlers',
    project: 'Billing Platform v2',
    status: 'in_progress',
    priority: 'High',
    assignee: assignees[3],
    dueDate: '2026-07-19',
    tags: ['Backend'],
  },
  {
    id: 'tsk_004',
    title: 'Build kanban card component',
    project: 'Mobile App Redesign',
    status: 'in_progress',
    priority: 'Medium',
    assignee: assignees[0],
    dueDate: '2026-07-21',
    tags: ['Frontend'],
  },
  {
    id: 'tsk_005',
    title: 'Write launch email sequence',
    project: 'Q3 Growth Campaign',
    status: 'in_progress',
    priority: 'Low',
    assignee: assignees[1],
    dueDate: '2026-07-25',
    tags: ['Content'],
  },
  {
    id: 'tsk_006',
    title: 'Review analytics chart specs',
    project: 'Mobile App Redesign',
    status: 'review',
    priority: 'Medium',
    assignee: assignees[4],
    dueDate: '2026-07-17',
    tags: ['Design'],
  },
  {
    id: 'tsk_007',
    title: 'QA billing checkout flow',
    project: 'Billing Platform v2',
    status: 'review',
    priority: 'High',
    assignee: assignees[3],
    dueDate: '2026-07-16',
    tags: ['QA'],
  },
  {
    id: 'tsk_008',
    title: 'Finalize brand color tokens',
    project: 'Brand Refresh',
    status: 'done',
    priority: 'Medium',
    assignee: assignees[1],
    dueDate: '2026-07-10',
    tags: ['Design'],
  },
  {
    id: 'tsk_009',
    title: 'Ship new marketing homepage',
    project: 'Brand Refresh',
    status: 'done',
    priority: 'High',
    assignee: assignees[5],
    dueDate: '2026-07-12',
    tags: ['Frontend'],
  },
  {
    id: 'tsk_010',
    title: 'Configure CI pipeline caching',
    project: 'Billing Platform v2',
    status: 'done',
    priority: 'Low',
    assignee: assignees[3],
    dueDate: '2026-07-08',
    tags: ['DevOps'],
  },
  {
    id: 'tsk_011',
    title: 'Draft pricing page copy',
    project: 'Q3 Growth Campaign',
    status: 'todo',
    priority: 'Medium',
    assignee: assignees[5],
    dueDate: '2026-07-24',
    tags: ['Content'],
  },
  {
    id: 'tsk_012',
    title: 'Prototype tablet navigation',
    project: 'Mobile App Redesign',
    status: 'review',
    priority: 'Low',
    assignee: assignees[2],
    dueDate: '2026-07-23',
    tags: ['Design'],
  },
]

// ---------------------------------------------------------------------------
// Invitations  ->  GET / POST /api/v1/workspaces/{uuid}/invitations/
// ---------------------------------------------------------------------------
export const invitations = [
  {
    id: 'inv_001',
    email: 'noah@partner.com',
    role: 'Member',
    workspace: 'Acme Product Team',
    status: 'Pending',
    sentAt: '2026-07-11',
    invitedBy: 'Alex Morgan',
  },
  {
    id: 'inv_002',
    email: 'grace@contractor.io',
    role: 'Member',
    workspace: 'Marketing HQ',
    status: 'Accepted',
    sentAt: '2026-07-05',
    invitedBy: 'Priya Nair',
  },
  {
    id: 'inv_003',
    email: 'owen@vendor.dev',
    role: 'Owner',
    workspace: 'Engineering Guild',
    status: 'Expired',
    sentAt: '2026-06-20',
    invitedBy: 'Alex Morgan',
  },
  {
    id: 'inv_004',
    email: 'hana@studio.design',
    role: 'Member',
    workspace: 'Acme Product Team',
    status: 'Pending',
    sentAt: '2026-07-13',
    invitedBy: 'Diego Silva',
  },
]

// ---------------------------------------------------------------------------
// Activity feed  (derived server-side; part of overview payload)
// ---------------------------------------------------------------------------
export const activities = [
  {
    id: 'act_001',
    actor: 'Priya Nair',
    initials: 'PN',
    avatarColor: 'bg-fuchsia-500',
    action: 'completed task',
    target: 'Finalize brand color tokens',
    time: '12m ago',
  },
  {
    id: 'act_002',
    actor: 'Diego Silva',
    initials: 'DS',
    avatarColor: 'bg-emerald-500',
    action: 'commented on',
    target: 'Mobile App Redesign',
    time: '48m ago',
  },
  {
    id: 'act_003',
    actor: 'Mei Chen',
    initials: 'MC',
    avatarColor: 'bg-sky-500',
    action: 'created project',
    target: 'Design System 2.0',
    time: '2h ago',
  },
  {
    id: 'act_004',
    actor: 'Alex Morgan',
    initials: 'AM',
    avatarColor: 'bg-brand-500',
    action: 'invited',
    target: 'noah@partner.com',
    time: '3h ago',
  },
  {
    id: 'act_005',
    actor: 'Sara Ahmed',
    initials: 'SA',
    avatarColor: 'bg-rose-500',
    action: 'moved task to Review',
    target: 'QA billing checkout flow',
    time: '5h ago',
  },
]

// ---------------------------------------------------------------------------
// Upcoming deadlines (overview card)
// ---------------------------------------------------------------------------
export const upcomingDeadlines = [
  { id: 'dl_001', title: 'Brand Refresh', date: '2026-07-15', urgency: 'today' },
  { id: 'dl_002', title: 'Onboarding Flow Revamp', date: '2026-07-16', urgency: 'soon' },
  { id: 'dl_003', title: 'Billing Platform v2', date: '2026-07-20', urgency: 'week' },
  { id: 'dl_004', title: 'Q3 Growth Campaign', date: '2026-07-28', urgency: 'later' },
]

// ---------------------------------------------------------------------------
// Overview stat cards  (part of workspace analytics payload)
// ---------------------------------------------------------------------------
export const overviewStats = [
  {
    key: 'projects',
    label: 'Total Projects',
    value: 24,
    trend: +12.5,
    icon: 'FolderKanban',
    spark: [8, 10, 9, 12, 14, 13, 16, 18, 20, 24],
  },
  {
    key: 'active',
    label: 'Active Tasks',
    value: 142,
    trend: +8.2,
    icon: 'ListChecks',
    spark: [90, 100, 96, 110, 120, 118, 130, 128, 138, 142],
  },
  {
    key: 'completed',
    label: 'Completed Tasks',
    value: 389,
    trend: +23.1,
    icon: 'CircleCheckBig',
    spark: [210, 240, 260, 280, 300, 320, 340, 360, 375, 389],
  },
  {
    key: 'members',
    label: 'Team Members',
    value: 23,
    trend: -2.4,
    icon: 'Users',
    spark: [24, 25, 24, 24, 23, 24, 23, 23, 24, 23],
  },
]

// ---------------------------------------------------------------------------
// Analytics  ->  GET /api/v1/workspaces/{uuid}/analytics/
// ---------------------------------------------------------------------------
export const analytics = {
  // Line/area chart — task progress over the last 8 weeks
  taskProgress: [
    { name: 'Wk 1', created: 40, completed: 24 },
    { name: 'Wk 2', created: 48, completed: 32 },
    { name: 'Wk 3', created: 42, completed: 38 },
    { name: 'Wk 4', created: 55, completed: 40 },
    { name: 'Wk 5', created: 60, completed: 52 },
    { name: 'Wk 6', created: 58, completed: 61 },
    { name: 'Wk 7', created: 66, completed: 64 },
    { name: 'Wk 8', created: 72, completed: 70 },
  ],
  // Donut — tasks by status
  tasksByStatus: [
    { name: 'Todo', value: 48, color: '#94a3b8' },
    { name: 'In Progress', value: 34, color: '#6366f1' },
    { name: 'Done', value: 52, color: '#10b981' },
    { name: 'Overdue', value: 8, color: '#f43f5e' },
  ],
  // Bar — tasks completed per member (workload)
  teamWorkload: [
    { name: 'Alex', tasks: 32 },
    { name: 'Priya', tasks: 28 },
    { name: 'Diego', tasks: 24 },
    { name: 'Mei', tasks: 19 },
    { name: 'Sara', tasks: 22 },
    { name: 'Tomas', tasks: 14 },
  ],
  // Bar — projects progress
  projectsProgress: [
    { name: 'Mobile App', progress: 72 },
    { name: 'Billing v2', progress: 88 },
    { name: 'Design Sys', progress: 60 },
    { name: 'Onboarding', progress: 25 },
    { name: 'Brand', progress: 95 },
  ],
  // Small KPI tiles on the analytics page
  kpis: [
    { label: 'Productivity Score', value: '87%', trend: +4.2 },
    { label: 'Avg. Completion Time', value: '3.4d', trend: -0.6 },
    { label: 'Overdue Tasks', value: 8, trend: -12.0 },
    { label: 'On-time Delivery', value: '92%', trend: +2.1 },
  ],
  // Workspace usage stats
  usage: [
    { label: 'Active Workspaces', value: 3, max: 5 },
    { label: 'Storage Used', value: 6.4, max: 10, unit: 'GB' },
    { label: 'API Calls (30d)', value: 18400, max: 50000 },
  ],
}

// ---------------------------------------------------------------------------
// Billing  ->  GET /api/v1/billing/subscription/
// ---------------------------------------------------------------------------
export const billing = {
  currentPlan: {
    name: 'Pro',
    price: 24,
    interval: 'month',
    renewsOn: '2026-08-14',
    status: 'Active',
  },
  usage: [
    { label: 'Projects', used: 24, limit: 50, unit: '' },
    { label: 'Team Members', used: 23, limit: 25, unit: '' },
    { label: 'Storage', used: 6.4, limit: 10, unit: 'GB' },
  ],
  history: [
    { id: 'in_1042', date: '2026-07-01', amount: 24.0, status: 'Paid', plan: 'Pro Monthly' },
    { id: 'in_1031', date: '2026-06-01', amount: 24.0, status: 'Paid', plan: 'Pro Monthly' },
    { id: 'in_1020', date: '2026-05-01', amount: 24.0, status: 'Paid', plan: 'Pro Monthly' },
    { id: 'in_1009', date: '2026-04-01', amount: 24.0, status: 'Paid', plan: 'Pro Monthly' },
  ],
}

// Pricing plans — shared by landing page + billing page
export const plans = [
  {
    id: 'free',
    name: 'Free',
    price: 0,
    tagline: 'For individuals getting started.',
    highlighted: false,
    features: [
      'Up to 3 projects',
      '2 workspaces',
      '5 team members',
      'Basic analytics',
      'Community support',
    ],
  },
  {
    id: 'pro',
    name: 'Pro',
    price: 24,
    tagline: 'For growing teams that need more.',
    highlighted: true,
    features: [
      'Unlimited projects',
      '10 workspaces',
      '25 team members',
      'Advanced analytics',
      'Priority support',
      'Custom fields & automations',
    ],
  },
  {
    id: 'business',
    name: 'Business',
    price: 59,
    tagline: 'For organizations at scale.',
    highlighted: false,
    features: [
      'Everything in Pro',
      'Unlimited workspaces',
      'Unlimited members',
      'SSO & audit logs',
      'Dedicated support',
      'SLA & onboarding',
    ],
  },
]

// FAQ — landing page
export const faqs = [
  {
    q: 'Can I use FlowStack for free?',
    a: 'Yes. The Free plan includes up to 3 projects and 5 team members — no credit card required. Upgrade anytime as your team grows.',
  },
  {
    q: 'How does the free trial work?',
    a: 'Start a 14-day trial of the Pro plan instantly. You get full access to advanced analytics, automations, and unlimited projects.',
  },
  {
    q: 'Can I switch plans later?',
    a: 'Absolutely. You can upgrade, downgrade, or cancel at any time from your billing settings. Changes are prorated automatically.',
  },
  {
    q: 'Is my data secure?',
    a: 'We use industry-standard encryption in transit and at rest. Business plans add SSO, audit logs, and configurable data retention.',
  },
  {
    q: 'Do you offer team discounts?',
    a: 'Yes — annual billing saves 20%, and we offer custom pricing for teams over 50 members. Reach out to our sales team.',
  },
]
