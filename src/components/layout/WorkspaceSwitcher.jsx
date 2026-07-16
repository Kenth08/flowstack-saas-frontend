import { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { Check, ChevronsUpDown, Plus } from 'lucide-react'
import { workspaces } from '../../data/mockData'
import { cn } from '../../lib/cn'

// Dropdown to switch the active workspace. Local state only for now.
// TODO(api): fetch list via GET /api/v1/workspaces/ and persist selection.
export default function WorkspaceSwitcher() {
  const [open, setOpen] = useState(false)
  const [active, setActive] = useState(workspaces[0])
  const ref = useRef(null)
  const navigate = useNavigate()

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
        aria-label="Switch workspace"
        aria-haspopup="menu"
        aria-expanded={open}
        className="flex cursor-pointer items-center gap-2 rounded-xl border border-slate-200 bg-white px-2.5 py-1.5 text-sm transition-colors hover:border-slate-300 hover:bg-slate-50 fs-focus"
      >
        <span
          className={cn(
            'flex h-6 w-6 items-center justify-center rounded-md text-[10px] font-bold text-white',
            active.color
          )}
        >
          {active.initials}
        </span>
        <span className="hidden max-w-[140px] truncate font-medium text-slate-700 sm:block">
          {active.name}
        </span>
        <ChevronsUpDown className="h-4 w-4 text-slate-400" />
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -6, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -6, scale: 0.98 }}
            transition={{ duration: 0.15 }}
            className="absolute left-0 z-30 mt-2 w-64 overflow-hidden rounded-xl border border-slate-200 bg-white p-1.5 shadow-card"
          >
            <p className="px-2.5 py-1.5 text-xs font-semibold uppercase tracking-wide text-slate-400">
              Workspaces
            </p>
            {workspaces.map((ws) => (
              <button
                key={ws.id}
                onClick={() => {
                  setActive(ws)
                  setOpen(false)
                }}
                className="flex w-full items-center gap-2.5 rounded-lg px-2.5 py-2 text-sm transition-colors hover:bg-slate-50"
              >
                <span
                  className={cn(
                    'flex h-7 w-7 items-center justify-center rounded-md text-[10px] font-bold text-white',
                    ws.color
                  )}
                >
                  {ws.initials}
                </span>
                <span className="flex-1 text-left">
                  <span className="block font-medium text-slate-700">
                    {ws.name}
                  </span>
                  <span className="block text-xs text-slate-400">
                    {ws.plan} · {ws.membersCount} members
                  </span>
                </span>
                {active.id === ws.id && (
                  <Check className="h-4 w-4 text-brand-600" />
                )}
              </button>
            ))}
            <div className="my-1 h-px bg-slate-100" />
            <button
              onClick={() => {
                setOpen(false)
                navigate('/workspaces')
              }}
              className="flex w-full items-center gap-2.5 rounded-lg px-2.5 py-2 text-sm font-medium text-brand-600 transition-colors hover:bg-brand-50 fs-focus"
            >
              <span className="flex h-7 w-7 items-center justify-center rounded-md border border-dashed border-brand-300">
                <Plus className="h-4 w-4" />
              </span>
              Create workspace
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
