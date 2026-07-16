import { MoreHorizontal, Trash2, Shield } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import Avatar from '../ui/Avatar'
import Badge from '../ui/Badge'

function formatDate(iso) {
  return new Date(iso).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  })
}

// Row action menu. `onRemove` is called with the member when "Remove" is
// chosen so the parent can confirm (ConfirmDialog) and call the API.
function RowActions({ member, onRemove }) {
  const [open, setOpen] = useState(false)
  const ref = useRef(null)
  useEffect(() => {
    const onClick = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false)
    }
    document.addEventListener('mousedown', onClick)
    return () => document.removeEventListener('mousedown', onClick)
  }, [])
  return (
    <div className="relative" ref={ref}>
      <button
        onClick={() => setOpen((o) => !o)}
        className="rounded-lg p-1.5 text-slate-400 transition-colors hover:bg-slate-100 hover:text-slate-600"
      >
        <MoreHorizontal className="h-4 w-4" />
      </button>
      {open && (
        <div className="absolute right-0 z-10 mt-1 w-44 rounded-xl border border-slate-200 bg-white p-1.5 shadow-card">
          {/* TODO(api): PATCH member role — see updateMemberRole() in api/members.js */}
          <button className="flex w-full items-center gap-2.5 rounded-lg px-2.5 py-2 text-sm text-slate-600 hover:bg-slate-50">
            <Shield className="h-4 w-4 text-slate-400" /> Change role
          </button>
          {/* DELETE workspace member — confirmed + called by the parent page. */}
          <button
            onClick={() => {
              setOpen(false)
              onRemove?.(member)
            }}
            className="flex w-full items-center gap-2.5 rounded-lg px-2.5 py-2 text-sm text-rose-600 hover:bg-rose-50"
          >
            <Trash2 className="h-4 w-4" /> Remove
          </button>
        </div>
      )}
    </div>
  )
}

// Responsive members table. Collapses to cards on mobile.
export default function MemberTable({ members, onRemove }) {
  return (
    <div className="fs-card overflow-hidden">
      {/* Desktop table */}
      <div className="hidden overflow-x-auto md:block">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-slate-100 text-left text-xs uppercase tracking-wide text-slate-400">
              <th className="px-5 py-3 font-medium">Name</th>
              <th className="px-5 py-3 font-medium">Role</th>
              <th className="px-5 py-3 font-medium">Workspace</th>
              <th className="px-5 py-3 font-medium">Joined</th>
              <th className="px-5 py-3 font-medium">Status</th>
              <th className="px-5 py-3 text-right font-medium">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50">
            {members.map((m) => (
              <tr key={m.id} className="transition-colors hover:bg-slate-50/70">
                <td className="px-5 py-3">
                  <div className="flex items-center gap-3">
                    <Avatar initials={m.initials} color={m.avatarColor} size="sm" />
                    <div>
                      <p className="font-medium text-slate-800">{m.name}</p>
                      <p className="text-xs text-slate-400">{m.email}</p>
                    </div>
                  </div>
                </td>
                <td className="px-5 py-3">
                  <Badge>{m.role}</Badge>
                </td>
                <td className="px-5 py-3 text-slate-600">{m.workspace}</td>
                <td className="px-5 py-3 text-slate-500">{formatDate(m.joined)}</td>
                <td className="px-5 py-3">
                  <Badge dot>{m.status}</Badge>
                </td>
                <td className="px-5 py-3 text-right">
                  <RowActions member={m} onRemove={onRemove} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile cards */}
      <div className="divide-y divide-slate-100 md:hidden">
        {members.map((m) => (
          <div key={m.id} className="flex items-center gap-3 p-4">
            <Avatar initials={m.initials} color={m.avatarColor} size="md" />
            <div className="min-w-0 flex-1">
              <p className="truncate font-medium text-slate-800">{m.name}</p>
              <p className="truncate text-xs text-slate-400">{m.email}</p>
              <div className="mt-1.5 flex flex-wrap items-center gap-1.5">
                <Badge>{m.role}</Badge>
                <Badge dot>{m.status}</Badge>
              </div>
            </div>
            <RowActions member={m} onRemove={onRemove} />
          </div>
        ))}
      </div>
    </div>
  )
}
