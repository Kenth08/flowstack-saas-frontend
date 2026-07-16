import { useMemo, useState } from 'react'
import { UserPlus, Users } from 'lucide-react'
import PageHeader from '../components/ui/PageHeader'
import Button from '../components/ui/Button'
import SearchInput from '../components/ui/SearchInput'
import MemberTable from '../components/members/MemberTable'
import Modal, { Field, inputClass } from '../components/ui/Modal'
import ConfirmDialog from '../components/ui/ConfirmDialog'
import LoadingSkeleton from '../components/ui/LoadingSkeleton'
import ErrorState from '../components/ui/ErrorState'
import EmptyState from '../components/ui/EmptyState'
import { useToast } from '../components/ui/Toast'
import { cn } from '../lib/cn'
import { useAsync } from '../hooks/useAsync'
import { listMembers, removeMember } from '../api/members'
import { listWorkspaces } from '../api/workspaces'
import { createInvitation } from '../api/invitations'

// Data: GET /api/v1/workspaces/{uuid}/members/

const roleFilters = ['All', 'Owner', 'Member']

export default function Members() {
  const [query, setQuery] = useState('')
  const [role, setRole] = useState('All')
  const [open, setOpen] = useState(false)
  const [toRemove, setToRemove] = useState(null)
  const toast = useToast()

  const { data, loading, error, reload } = useAsync(() => listMembers(), [])
  const { data: workspacesData } = useAsync(() => listWorkspaces(), [])
  const members = data ?? []
  const workspaces = workspacesData ?? []

  const filtered = useMemo(() => {
    return members.filter((m) => {
      const matchesQuery =
        m.name.toLowerCase().includes(query.toLowerCase()) ||
        m.email.toLowerCase().includes(query.toLowerCase())
      const matchesRole = role === 'All' || m.role === role
      return matchesQuery && matchesRole
    })
  }, [members, query, role])

  const handleInvite = async (e) => {
    e.preventDefault()
    const form = new FormData(e.target)
    // POST /api/v1/workspaces/{uuid}/invitations/
    await createInvitation(undefined, {
      email: form.get('email'),
      role: form.get('role'),
      workspace: form.get('workspace'),
    })
    setOpen(false)
    toast.success('Invitation sent')
  }

  const confirmRemove = async () => {
    // DELETE /api/v1/workspaces/{uuid}/members/{id}/
    await removeMember(undefined, toRemove.id)
    setToRemove(null)
    toast.success('Member removed')
    reload()
  }

  return (
    <div>
      <PageHeader
        title="Members"
        subtitle="Manage who has access to your workspaces."
      >
        <Button icon={UserPlus} onClick={() => setOpen(true)}>
          Invite Member
        </Button>
      </PageHeader>

      {loading ? (
        <LoadingSkeleton variant="table" rows={6} cols={6} />
      ) : error ? (
        <ErrorState error={error} onRetry={reload} />
      ) : (
        <>
          <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center">
            <SearchInput
              value={query}
              onChange={setQuery}
              placeholder="Search members…"
              className="sm:max-w-xs"
            />
            <div className="flex items-center gap-1.5">
              {roleFilters.map((r) => (
                <button
                  key={r}
                  onClick={() => setRole(r)}
                  className={cn(
                    'rounded-lg px-3 py-1.5 text-sm font-medium transition-colors',
                    role === r
                      ? 'bg-brand-600 text-white'
                      : 'bg-white text-slate-600 ring-1 ring-slate-200 hover:bg-slate-50'
                  )}
                >
                  {r}
                </button>
              ))}
            </div>
          </div>

          {filtered.length === 0 ? (
            <EmptyState
              icon={Users}
              title="No members found"
              description="Try adjusting your search or filters, or invite a new member."
              actionLabel="Invite Member"
              onAction={() => setOpen(true)}
            />
          ) : (
            <MemberTable members={filtered} onRemove={setToRemove} />
          )}
        </>
      )}

      {/* Invite modal (UI only) */}
      <Modal
        open={open}
        onClose={() => setOpen(false)}
        title="Invite member"
        description="Send an invitation to join a workspace."
        footer={
          <>
            <Button variant="secondary" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button type="submit" form="invite-member-form">
              Send invite
            </Button>
          </>
        }
      >
        <form id="invite-member-form" onSubmit={handleInvite} className="space-y-4">
          <Field label="Email address">
            <input required name="email" type="email" placeholder="teammate@company.com" className={inputClass} />
          </Field>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <Field label="Role">
              <select name="role" className={inputClass}>
                <option>Member</option>
                <option>Owner</option>
              </select>
            </Field>
            <Field label="Workspace">
              <select name="workspace" className={inputClass}>
                {workspaces.map((w) => (
                  <option key={w.id}>{w.name}</option>
                ))}
              </select>
            </Field>
          </div>
        </form>
      </Modal>

      {/* Remove member confirmation */}
      <ConfirmDialog
        open={!!toRemove}
        title="Remove member?"
        description={
          toRemove
            ? `${toRemove.name} will lose access to this workspace immediately.`
            : ''
        }
        confirmLabel="Remove"
        onConfirm={confirmRemove}
        onClose={() => setToRemove(null)}
      />
    </div>
  )
}
