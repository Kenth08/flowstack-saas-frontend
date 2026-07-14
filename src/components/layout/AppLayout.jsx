import { useState } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import Sidebar from './Sidebar'
import Topbar from './Topbar'

// Maps route paths to the title shown in the Topbar.
const titleMap = {
  '/dashboard': 'Overview',
  '/workspaces': 'Workspaces',
  '/projects': 'Projects',
  '/tasks': 'Tasks',
  '/members': 'Members',
  '/invitations': 'Invitations',
  '/analytics': 'Analytics',
  '/billing': 'Billing',
  '/settings': 'Settings',
}

// Shell for all protected app routes: sidebar + topbar + animated content.
export default function AppLayout() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const location = useLocation()
  const title = titleMap[location.pathname] || 'Dashboard'

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="flex">
        <Sidebar mobileOpen={mobileOpen} onClose={() => setMobileOpen(false)} />

        <div className="flex min-h-screen w-full flex-col lg:pl-0">
          <Topbar title={title} onMenuClick={() => setMobileOpen(true)} />

          <main className="flex-1 px-4 py-6 sm:px-6 sm:py-8">
            <AnimatePresence mode="wait">
              <motion.div
                key={location.pathname}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.2 }}
                className="mx-auto max-w-7xl"
              >
                <Outlet />
              </motion.div>
            </AnimatePresence>
          </main>
        </div>
      </div>
    </div>
  )
}
