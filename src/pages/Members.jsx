import { useMemo, useState } from 'react'
import { UserPlus } from 'lucide-react'
import PageHeader from '../components/ui/PageHeader'
import Button from '../components/ui/Button'
import SearchInput from '../components/ui/SearchInput'
import MemberTable from '../components/members/MemberTable'
import Modal, { Field, inputClass } from '../components/ui/Modal'
import { useToast } from '../components/ui/Toast'
import { cn } from '../lib/cn'
import { members, workspaces } from '../data/mockData'

// TODO(api): GET /api/v1/workspaces/{uuid}/members/

const roleFilters = ['All', 'Owner', 'Member']

export default function Members() {
  const [query, setQuery] = useState('')
  const [role, setRole] = useState('All')
  const [open, setOpen] = useState(false)
  const toast = useToast()

  const filtered = useMemo(() => {
    return members.filter((m) => {
      const matchesQuery =
        m.name.toLowerCase().includes(query.toLowerCase()) ||
        m.email.toLowerCase().includes(query.toLowerCase())
      const matchesRole = role === 'All' || m.role === role
      return matchesQuery && matchesRole
    })
  }, [query, role])

  const handleInvite = (e) => {
    e.preventDefault()
    // TODO(api): POST /api/v1/workspaces/{uuid}/invitations/
    setOpen(false)
    toast.success('Invitation sent')
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

      <MemberTable members={filtered} />

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
            <input required type="email" placeholder="teammate@company.com" className={inputClass} />
          </Field>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <Field label="Role">
              <select className={inputClass}>
                <option>Member</option>
                <option>Owner</option>
              </select>
            </Field>
            <Field label="Workspace">
              <select className={inputClass}>
                {workspaces.map((w) => (
                  <option key={w.id}>{w.name}</option>
                ))}
              </select>
            </Field>
          </div>
        </form>
      </Modal>
    </div>
  )
}
