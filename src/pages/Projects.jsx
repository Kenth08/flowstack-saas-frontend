import { useMemo, useState } from 'react'
import { Plus, LayoutGrid, Table2, Calendar } from 'lucide-react'
import PageHeader from '../components/ui/PageHeader'
import Button from '../components/ui/Button'
import Badge from '../components/ui/Badge'
import SearchInput from '../components/ui/SearchInput'
import ProjectCard from '../components/projects/ProjectCard'
import { AvatarGroup } from '../components/ui/Avatar'
import Modal, { Field, inputClass } from '../components/ui/Modal'
import EmptyState from '../components/ui/EmptyState'
import LoadingSkeleton from '../components/ui/LoadingSkeleton'
import ErrorState from '../components/ui/ErrorState'
import { useToast } from '../components/ui/Toast'
import { cn } from '../lib/cn'
import { useAsync } from '../hooks/useAsync'
import { listProjects, createProject } from '../api/projects'
import { listWorkspaces } from '../api/workspaces'

// Data: GET /api/v1/workspaces/{uuid}/projects/ ; create: POST same path.

const statusFilters = ['All', 'On Track', 'At Risk', 'Delayed']

function formatDate(iso) {
  return new Date(iso).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  })
}

export default function Projects() {
  const [view, setView] = useState('grid') // 'grid' | 'table'
  const [query, setQuery] = useState('')
  const [status, setStatus] = useState('All')
  const [open, setOpen] = useState(false)
  const toast = useToast()

  const { data, loading, error, reload } = useAsync(() => listProjects(), [])
  const { data: workspacesData } = useAsync(() => listWorkspaces(), [])
  const projects = data ?? []
  const workspaces = workspacesData ?? []

  const filtered = useMemo(() => {
    return projects.filter((p) => {
      const matchesQuery =
        p.name.toLowerCase().includes(query.toLowerCase()) ||
        p.workspace.toLowerCase().includes(query.toLowerCase())
      const matchesStatus = status === 'All' || p.status === status
      return matchesQuery && matchesStatus
    })
  }, [projects, query, status])

  const handleCreate = async (e) => {
    e.preventDefault()
    const form = new FormData(e.target)
    // POST /api/v1/workspaces/{uuid}/projects/
    await createProject(undefined, {
      name: form.get('name'),
      workspace: form.get('workspace'),
      dueDate: form.get('dueDate'),
      status: form.get('status'),
    })
    setOpen(false)
    toast.success('Project created')
    reload()
  }

  return (
    <div>
      <PageHeader
        title="Projects"
        subtitle="Track progress across every project in your workspaces."
      >
        <Button icon={Plus} onClick={() => setOpen(true)}>
          Create Project
        </Button>
      </PageHeader>

      {loading ? (
        <LoadingSkeleton variant={view === 'table' ? 'table' : 'cards'} />
      ) : error ? (
        <ErrorState error={error} onRetry={reload} />
      ) : (
        <>
      {/* Filter bar */}
      <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-1 flex-col gap-3 sm:flex-row sm:items-center">
          <SearchInput
            value={query}
            onChange={setQuery}
            placeholder="Search projects…"
            className="sm:max-w-xs"
          />
          <div className="flex flex-wrap items-center gap-1.5">
            {statusFilters.map((s) => (
              <button
                key={s}
                onClick={() => setStatus(s)}
                className={cn(
                  'rounded-lg px-3 py-1.5 text-sm font-medium transition-colors',
                  status === s
                    ? 'bg-brand-600 text-white'
                    : 'bg-white text-slate-600 ring-1 ring-slate-200 hover:bg-slate-50'
                )}
              >
                {s}
              </button>
            ))}
          </div>
        </div>

        {/* View toggle */}
        <div className="flex items-center gap-1 rounded-xl border border-slate-200 bg-white p-1">
          <button
            onClick={() => setView('grid')}
            className={cn(
              'flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-sm font-medium transition-colors',
              view === 'grid'
                ? 'bg-brand-50 text-brand-700'
                : 'text-slate-500 hover:bg-slate-50'
            )}
          >
            <LayoutGrid className="h-4 w-4" /> Grid
          </button>
          <button
            onClick={() => setView('table')}
            className={cn(
              'flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-sm font-medium transition-colors',
              view === 'table'
                ? 'bg-brand-50 text-brand-700'
                : 'text-slate-500 hover:bg-slate-50'
            )}
          >
            <Table2 className="h-4 w-4" /> Table
          </button>
        </div>
      </div>

      {/* Content */}
      {filtered.length === 0 ? (
        <EmptyState
          icon={LayoutGrid}
          title="No projects found"
          description="Try adjusting your search or filters, or create a new project."
          actionLabel="Create Project"
          onAction={() => setOpen(true)}
        />
      ) : view === 'grid' ? (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3">
          {filtered.map((p, i) => (
            <ProjectCard key={p.id} project={p} index={i} />
          ))}
        </div>
      ) : (
        <div className="fs-card overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-slate-100 text-left text-xs uppercase tracking-wide text-slate-400">
                  <th className="px-5 py-3 font-medium">Project</th>
                  <th className="px-5 py-3 font-medium">Workspace</th>
                  <th className="px-5 py-3 font-medium">Progress</th>
                  <th className="px-5 py-3 font-medium">Status</th>
                  <th className="px-5 py-3 font-medium">Due date</th>
                  <th className="px-5 py-3 font-medium">Team</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {filtered.map((p) => (
                  <tr key={p.id} className="transition-colors hover:bg-slate-50/70">
                    <td className="px-5 py-3">
                      <div className="flex items-center gap-2.5">
                        <span className={`h-7 w-1 rounded-full ${p.color}`} />
                        <span className="font-medium text-slate-800">
                          {p.name}
                        </span>
                      </div>
                    </td>
                    <td className="px-5 py-3 text-slate-600">{p.workspace}</td>
                    <td className="px-5 py-3">
                      <div className="flex items-center gap-2">
                        <div className="h-1.5 w-20 overflow-hidden rounded-full bg-slate-100">
                          <div
                            className="h-full rounded-full bg-brand-500"
                            style={{ width: `${p.progress}%` }}
                          />
                        </div>
                        <span className="text-xs font-medium text-slate-500">
                          {p.progress}%
                        </span>
                      </div>
                    </td>
                    <td className="px-5 py-3">
                      <Badge>{p.status}</Badge>
                    </td>
                    <td className="px-5 py-3">
                      <span className="inline-flex items-center gap-1.5 text-slate-500">
                        <Calendar className="h-3.5 w-3.5 text-slate-400" />
                        {formatDate(p.dueDate)}
                      </span>
                    </td>
                    <td className="px-5 py-3">
                      <AvatarGroup people={p.members} max={3} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
        </>
      )}

      {/* Create modal (UI only) */}
      <Modal
        open={open}
        onClose={() => setOpen(false)}
        title="Create project"
        description="Set up a new project and start adding tasks."
        footer={
          <>
            <Button variant="secondary" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button type="submit" form="create-project-form">
              Create project
            </Button>
          </>
        }
      >
        <form id="create-project-form" onSubmit={handleCreate} className="space-y-4">
          <Field label="Project name">
            <input required name="name" placeholder="e.g. Mobile App Redesign" className={inputClass} />
          </Field>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <Field label="Workspace">
              <select name="workspace" className={inputClass}>
                {workspaces.map((w) => (
                  <option key={w.id}>{w.name}</option>
                ))}
              </select>
            </Field>
            <Field label="Due date">
              <input type="date" name="dueDate" className={inputClass} />
            </Field>
          </div>
          <Field label="Status">
            <select name="status" className={inputClass}>
              <option>On Track</option>
              <option>At Risk</option>
              <option>Delayed</option>
            </select>
          </Field>
        </form>
      </Modal>
    </div>
  )
}
