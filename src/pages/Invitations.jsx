import { useState } from 'react'
import { motion } from 'framer-motion'
import { Mail, Plus, RefreshCw, X, Clock } from 'lucide-react'
import PageHeader from '../components/ui/PageHeader'
import Button from '../components/ui/Button'
import Badge from '../components/ui/Badge'
import Modal, { Field, inputClass } from '../components/ui/Modal'
import EmptyState from '../components/ui/EmptyState'
import { useToast } from '../components/ui/Toast'
import { invitations as seed, workspaces } from '../data/mockData'

// TODO(api): GET  /api/v1/workspaces/{uuid}/invitations/
// TODO(api): POST /api/v1/workspaces/{uuid}/invitations/  { email, role }

function formatDate(iso) {
  return new Date(iso).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  })
}

export default function Invitations() {
  const [invites, setInvites] = useState(seed)
  const [open, setOpen] = useState(false)
  const toast = useToast()

  const handleSend = (e) => {
    e.preventDefault()
    // TODO(api): POST /api/v1/workspaces/{uuid}/invitations/
    // Optimistically add to the list for the prototype.
    const form = new FormData(e.target)
    setInvites((prev) => [
      {
        id: `inv_${Date.now()}`,
        email: form.get('email') || 'new@invite.com',
        role: form.get('role') || 'Member',
        workspace: form.get('workspace') || workspaces[0].name,
        status: 'Pending',
        sentAt: new Date().toISOString().slice(0, 10),
        invitedBy: 'Alex Morgan',
      },
      ...prev,
    ])
    setOpen(false)
    toast.success('Invitation sent')
  }

  const revoke = (id) => {
    setInvites((prev) => prev.filter((i) => i.id !== id))
    toast.info('Invitation revoked')
  }

  return (
    <div>
      <PageHeader
        title="Invitations"
        subtitle="Track pending, accepted, and expired workspace invitations."
      >
        <Button icon={Plus} onClick={() => setOpen(true)}>
          Invite Member
        </Button>
      </PageHeader>

      {invites.length === 0 ? (
        <EmptyState
          icon={Mail}
          title="No invitations yet"
          description="Invite teammates to collaborate in your workspaces."
          actionLabel="Invite Member"
          onAction={() => setOpen(true)}
        />
      ) : (
        <div className="fs-card divide-y divide-slate-100 overflow-hidden">
          {invites.map((inv, i) => (
            <motion.div
              key={inv.id}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.25, delay: i * 0.03 }}
              className="flex flex-col gap-3 p-4 transition-colors hover:bg-slate-50/70 sm:flex-row sm:items-center sm:justify-between"
            >
              <div className="flex items-center gap-3">
                <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-50 text-brand-600">
                  <Mail className="h-5 w-5" />
                </span>
                <div>
                  <p className="font-medium text-slate-800">{inv.email}</p>
                  <p className="flex items-center gap-1.5 text-xs text-slate-400">
                    <Clock className="h-3 w-3" /> Sent {formatDate(inv.sentAt)} ·
                    by {inv.invitedBy}
                  </p>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-2 sm:gap-3">
                <Badge tone="neutral">{inv.workspace}</Badge>
                <Badge>{inv.role}</Badge>
                <Badge dot>{inv.status}</Badge>

                <div className="ml-auto flex items-center gap-1 sm:ml-0">
                  {inv.status === 'Pending' && (
                    <>
                      {/* TODO(api): POST resend invitation */}
                      <button
                        onClick={() => toast.success('Invitation resent')}
                        className="rounded-lg p-1.5 text-slate-400 transition-colors hover:bg-white hover:text-brand-600"
                        title="Resend"
                      >
                        <RefreshCw className="h-4 w-4" />
                      </button>
                      {/* TODO(api): DELETE invitation */}
                      <button
                        onClick={() => revoke(inv.id)}
                        className="rounded-lg p-1.5 text-slate-400 transition-colors hover:bg-white hover:text-rose-600"
                        title="Revoke"
                      >
                        <X className="h-4 w-4" />
                      </button>
                    </>
                  )}
                  {inv.status === 'Expired' && (
                    <button
                      onClick={() => toast.success('Invitation resent')}
                      className="inline-flex items-center gap-1 rounded-lg px-2.5 py-1.5 text-xs font-medium text-brand-600 transition-colors hover:bg-brand-50"
                    >
                      <RefreshCw className="h-3.5 w-3.5" /> Resend
                    </button>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}

      {/* Invite modal (UI only) */}
      <Modal
        open={open}
        onClose={() => setOpen(false)}
        title="Invite member"
        description="They'll receive an email to join the selected workspace."
        footer={
          <>
            <Button variant="secondary" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button type="submit" form="invite-form">
              Send invitation
            </Button>
          </>
        }
      >
        <form id="invite-form" onSubmit={handleSend} className="space-y-4">
          <Field label="Email address">
            <input
              required
              name="email"
              type="email"
              placeholder="teammate@company.com"
              className={inputClass}
            />
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
    </div>
  )
}
