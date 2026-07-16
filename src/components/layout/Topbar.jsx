import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Bell, Menu, LogOut, User, CreditCard, Settings as SettingsIcon } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import SearchInput from '../ui/SearchInput'
import Avatar from '../ui/Avatar'
import WorkspaceSwitcher from './WorkspaceSwitcher'
import { useAuth } from '../../context/AuthContext'
import { currentUser as fallbackUser } from '../../data/mockData'

// Sticky top header: mobile menu button, page title, search, workspace
// switcher, notifications, and the user menu.
export default function Topbar({ title, onMenuClick }) {
  const [notifOpen, setNotifOpen] = useState(false)
  const [userOpen, setUserOpen] = useState(false)
  const notifRef = useRef(null)
  const userRef = useRef(null)
  const navigate = useNavigate()
  const { user, signOut } = useAuth()
  const currentUser = user ?? fallbackUser

  const handleLogout = () => {
    setUserOpen(false)
    signOut() // clears the mock session (localStorage)
    navigate('/login', { replace: true })
  }

  const goTo = (path) => {
    setUserOpen(false)
    navigate(path)
  }

  useEffect(() => {
    const onClick = (e) => {
      if (notifRef.current && !notifRef.current.contains(e.target))
        setNotifOpen(false)
      if (userRef.current && !userRef.current.contains(e.target))
        setUserOpen(false)
    }
    document.addEventListener('mousedown', onClick)
    return () => document.removeEventListener('mousedown', onClick)
  }, [])

  const notifications = [
    { id: 1, text: 'Priya completed “Finalize brand color tokens”', time: '12m' },
    { id: 2, text: 'New invitation accepted by grace@contractor.io', time: '1h' },
    { id: 3, text: 'Billing Platform v2 is 88% complete', time: '3h' },
  ]

  return (
    <header className="sticky top-0 z-20 border-b border-slate-200 bg-white/80 backdrop-blur-md">
      <div className="flex h-16 items-center gap-3 px-4 sm:px-6">
        {/* Mobile menu */}
        <button
          onClick={onMenuClick}
          className="rounded-lg p-2 text-slate-500 transition-colors hover:bg-slate-100 lg:hidden"
          aria-label="Open menu"
        >
          <Menu className="h-5 w-5" />
        </button>

        {/* Page title */}
        <h1 className="text-lg font-semibold text-slate-900 sm:text-xl">
          {title}
        </h1>

        {/* Search — grows to fill, hidden on the smallest screens */}
        <div className="ml-auto hidden max-w-xs flex-1 md:block">
          <SearchInput placeholder="Search projects, tasks, people…" />
        </div>

        <div className="ml-auto flex items-center gap-2 md:ml-2">
          <WorkspaceSwitcher />

          {/* Notifications */}
          <div className="relative" ref={notifRef}>
            <button
              onClick={() => setNotifOpen((o) => !o)}
              className="relative rounded-lg p-2 text-slate-500 transition-colors hover:bg-slate-100"
              aria-label="Notifications"
            >
              <Bell className="h-5 w-5" />
              <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-rose-500 ring-2 ring-white" />
            </button>
            <AnimatePresence>
              {notifOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -6, scale: 0.98 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -6, scale: 0.98 }}
                  transition={{ duration: 0.15 }}
                  className="absolute right-0 z-30 mt-2 w-80 overflow-hidden rounded-xl border border-slate-200 bg-white shadow-card"
                >
                  <div className="flex items-center justify-between border-b border-slate-100 px-4 py-3">
                    <p className="text-sm font-semibold text-slate-900">
                      Notifications
                    </p>
                    <span className="rounded-full bg-brand-50 px-2 py-0.5 text-xs font-medium text-brand-600">
                      3 new
                    </span>
                  </div>
                  {/* TODO(api): GET notifications endpoint (websocket/poll) */}
                  <div className="max-h-80 overflow-y-auto scrollbar-thin">
                    {notifications.map((n) => (
                      <div
                        key={n.id}
                        className="flex gap-3 border-b border-slate-50 px-4 py-3 transition-colors last:border-0 hover:bg-slate-50"
                      >
                        <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-brand-500" />
                        <div>
                          <p className="text-sm text-slate-600">{n.text}</p>
                          <p className="mt-0.5 text-xs text-slate-400">
                            {n.time} ago
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* User menu */}
          <div className="relative" ref={userRef}>
            <button
              onClick={() => setUserOpen((o) => !o)}
              className="flex items-center gap-2 rounded-lg p-1 transition-colors hover:bg-slate-100 fs-focus"
              aria-label="Account menu"
              aria-haspopup="menu"
              aria-expanded={userOpen}
            >
              <Avatar
                initials={currentUser.initials}
                color={currentUser.avatarColor}
                size="sm"
              />
            </button>
            <AnimatePresence>
              {userOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -6, scale: 0.98 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -6, scale: 0.98 }}
                  transition={{ duration: 0.15 }}
                  className="absolute right-0 z-30 mt-2 w-56 overflow-hidden rounded-xl border border-slate-200 bg-white p-1.5 shadow-card"
                >
                  <div className="flex items-center gap-3 px-2.5 py-2">
                    <Avatar
                      initials={currentUser.initials}
                      color={currentUser.avatarColor}
                      size="md"
                    />
                    <div className="min-w-0">
                      <p className="truncate text-sm font-semibold text-slate-900">
                        {currentUser.name}
                      </p>
                      <p className="truncate text-xs text-slate-400">
                        {currentUser.email}
                      </p>
                    </div>
                  </div>
                  <div className="my-1 h-px bg-slate-100" />
                  <button
                    onClick={() => goTo('/settings')}
                    className="flex w-full items-center gap-2.5 rounded-lg px-2.5 py-2 text-sm text-slate-600 transition-colors hover:bg-slate-50 fs-focus"
                  >
                    <User className="h-4 w-4 text-slate-400" /> Profile
                  </button>
                  <button
                    onClick={() => goTo('/settings')}
                    className="flex w-full items-center gap-2.5 rounded-lg px-2.5 py-2 text-sm text-slate-600 transition-colors hover:bg-slate-50 fs-focus"
                  >
                    <SettingsIcon className="h-4 w-4 text-slate-400" /> Settings
                  </button>
                  <button
                    onClick={() => goTo('/billing')}
                    className="flex w-full items-center gap-2.5 rounded-lg px-2.5 py-2 text-sm text-slate-600 transition-colors hover:bg-slate-50 fs-focus"
                  >
                    <CreditCard className="h-4 w-4 text-slate-400" /> Billing
                  </button>
                  <div className="my-1 h-px bg-slate-100" />
                  <button
                    onClick={handleLogout}
                    className="flex w-full items-center gap-2.5 rounded-lg px-2.5 py-2 text-sm text-rose-600 transition-colors hover:bg-rose-50 fs-focus"
                  >
                    <LogOut className="h-4 w-4" /> Sign out
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </header>
  )
}
