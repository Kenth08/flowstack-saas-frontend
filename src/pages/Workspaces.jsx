import { useState } from 'react'
import { motion } from 'framer-motion'
import { Plus, Users, FolderKanban, Crown, ArrowRight, Building2 } from 'lucide-react'
import PageHeader from '../components/ui/PageHeader'
import Button from '../components/ui/Button'
import Badge from '../components/ui/Badge'
import Modal, { Field, inputClass } from '../components/ui/Modal'
import LoadingSkeleton from '../components/ui/LoadingSkeleton'
import ErrorState from '../components/ui/ErrorState'
import EmptyState from '../components/ui/EmptyState'
import { useToast } from '../components/ui/Toast'
import { cn } from '../lib/cn'
import { useAsync } from '../hooks/useAsync'
import { listWorkspaces, createWorkspace } from '../api/workspaces'

// Data: GET /api/v1/workspaces/ ; create: POST /api/v1/workspaces/

function WorkspaceCard({ ws, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.05 }}
      className="fs-card group flex flex-col p-6 transition-shadow hover:shadow-card"
    >
      <div className="flex items-start justify-between">
        <span
          className={cn(
            'flex h-12 w-12 items-center justify-center rounded-xl text-sm font-bold text-white',
            ws.color
          )}
        >
          {ws.initials}
        </span>
        <Badge>{ws.plan}</Badge>
      </div>

      <h3 className="mt-4 text-lg font-semibold text-slate-900">{ws.name}</h3>
      <p className="mt-1 line-clamp-2 text-sm text-slate-500">{ws.description}</p>

      <div className="mt-4 flex items-center gap-4 text-sm text-slate-500">
        <span className="inline-flex items-center gap-1.5">
          <Users className="h-4 w-4 text-slate-400" /> {ws.membersCount}
        </span>
        <span className="inline-flex items-center gap-1.5">
          <FolderKanban className="h-4 w-4 text-slate-400" /> {ws.projectsCount}
        </span>
      </div>

      <div className="mt-5 flex items-center justify-between border-t border-slate-100 pt-4">
        <span className="inline-flex items-center gap-1.5 text-xs text-slate-400">
          <Crown className="h-3.5 w-3.5 text-amber-400" /> {ws.owner}
        </span>
        <Button variant="secondary" size="sm" iconRight={ArrowRight}>
          Open
        </Button>
      </div>
    </motion.div>
  )
}

export default function Workspaces() {
  const [open, setOpen] = useState(false)
  const toast = useToast()
  const { data, loading, error, reload } = useAsync(() => listWorkspaces(), [])
  const workspaces = data ?? []

  const handleCreate = async (e) => {
    e.preventDefault()
    const form = new FormData(e.target)
    // POST /api/v1/workspaces/  { name, description, plan }
    await createWorkspace({
      name: form.get('name'),
      description: form.get('description'),
      plan: form.get('plan'),
    })
    setOpen(false)
    toast.success('Workspace created')
    reload()
  }

  return (
    <div>
      <PageHeader
        title="Workspaces"
        subtitle="Organize your teams and projects into dedicated workspaces."
      >
        <Button icon={Plus} onClick={() => setOpen(true)}>
          Create Workspace
        </Button>
      </PageHeader>

      {loading ? (
        <LoadingSkeleton variant="cards" count={3} />
      ) : error ? (
        <ErrorState error={error} onRetry={reload} />
      ) : workspaces.length === 0 ? (
        <EmptyState
          icon={Building2}
          title="No workspaces yet"
          description="Create your first workspace to organize teams and projects."
          actionLabel="Create Workspace"
          onAction={() => setOpen(true)}
        />
      ) : (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {workspaces.map((ws, i) => (
            <WorkspaceCard key={ws.id} ws={ws} index={i} />
          ))}

          {/* Create tile */}
          <button
            onClick={() => setOpen(true)}
            className="flex min-h-[220px] flex-col items-center justify-center rounded-2xl border-2 border-dashed border-slate-200 text-slate-400 transition-colors hover:border-brand-300 hover:bg-brand-50/40 hover:text-brand-600"
          >
            <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-white shadow-soft">
              <Plus className="h-6 w-6" />
            </span>
            <span className="mt-3 text-sm font-medium">New workspace</span>
          </button>
        </div>
      )}

      {/* Create modal (UI only) */}
      <Modal
        open={open}
        onClose={() => setOpen(false)}
        title="Create workspace"
        description="Workspaces keep projects and teams neatly separated."
        footer={
          <>
            <Button variant="secondary" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button type="submit" form="create-ws-form">
              Create workspace
            </Button>
          </>
        }
      >
        <form id="create-ws-form" onSubmit={handleCreate} className="space-y-4">
          <Field label="Workspace name">
            <input
              required
              name="name"
              placeholder="e.g. Product Team"
              className={inputClass}
            />
          </Field>
          <Field label="Description" hint="Optional — describe what this workspace is for.">
            <textarea
              name="description"
              rows={3}
              placeholder="What does this team work on?"
              className={inputClass}
            />
          </Field>
          <Field label="Plan">
            <select name="plan" className={inputClass}>
              <option>Free</option>
              <option>Pro</option>
              <option>Business</option>
            </select>
          </Field>
        </form>
      </Modal>
    </div>
  )
}
