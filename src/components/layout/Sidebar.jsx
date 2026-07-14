import { NavLink } from 'react-router-dom'
import { motion } from 'framer-motion'
import {
  LayoutDashboard,
  Building2,
  FolderKanban,
  ListChecks,
  Users,
  Mail,
  BarChart3,
  CreditCard,
  Settings,
  Sparkles,
  X,
} from 'lucide-react'
import Logo from '../ui/Logo'
import { cn } from '../../lib/cn'
import { currentUser } from '../../data/mockData'

// Primary navigation. Icons + labels map 1:1 to the app routes.
const navItems = [
  { to: '/dashboard', label: 'Overview', icon: LayoutDashboard },
  { to: '/workspaces', label: 'Workspaces', icon: Building2 },
  { to: '/projects', label: 'Projects', icon: FolderKanban },
  { to: '/tasks', label: 'Tasks', icon: ListChecks },
  { to: '/members', label: 'Members', icon: Users },
  { to: '/invitations', label: 'Invitations', icon: Mail },
  { to: '/analytics', label: 'Analytics', icon: BarChart3 },
  { to: '/billing', label: 'Billing', icon: CreditCard },
  { to: '/settings', label: 'Settings', icon: Settings },
]

function NavItems({ onNavigate }) {
  return (
    <nav className="flex-1 space-y-1 px-3">
      {navItems.map((item) => (
        <NavLink
          key={item.to}
          to={item.to}
          onClick={onNavigate}
          className={({ isActive }) =>
            cn(
              'group relative flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-colors',
              isActive
                ? 'bg-white/10 text-white'
                : 'text-slate-400 hover:bg-white/5 hover:text-white'
            )
          }
        >
          {({ isActive }) => (
            <>
              {isActive && (
                <motion.span
                  layoutId="sidebar-active"
                  className="absolute inset-y-1 left-0 w-1 rounded-r-full bg-brand-400"
                />
              )}
              <item.icon
                className={cn(
                  'h-[18px] w-[18px] transition-colors',
                  isActive
                    ? 'text-brand-300'
                    : 'text-slate-500 group-hover:text-slate-300'
                )}
              />
              {item.label}
            </>
          )}
        </NavLink>
      ))}
    </nav>
  )
}

// Bottom card: upgrade CTA + current plan label.
function UpgradeCard() {
  return (
    <div className="px-3 pb-4">
      <div className="rounded-2xl bg-gradient-to-br from-brand-500 to-brand-700 p-4">
        <div className="mb-2 flex h-8 w-8 items-center justify-center rounded-lg bg-white/20">
          <Sparkles className="h-4 w-4 text-white" />
        </div>
        <p className="text-sm font-semibold text-white">Upgrade to Pro</p>
        <p className="mt-1 text-xs text-brand-100">
          Unlock unlimited projects, automations, and advanced analytics.
        </p>
        {/* TODO(api): POST /api/v1/billing/checkout-session/ to start upgrade */}
        <button className="mt-3 w-full rounded-lg bg-white px-3 py-2 text-xs font-semibold text-brand-700 transition-colors hover:bg-brand-50">
          Upgrade now
        </button>
      </div>
      <div className="mt-3 flex items-center justify-between px-1">
        <span className="text-xs text-slate-500">Current plan</span>
        <span className="rounded-md bg-white/10 px-2 py-0.5 text-xs font-semibold text-brand-300">
          {currentUser.plan}
        </span>
      </div>
    </div>
  )
}

// Shared inner content for both desktop rail and mobile drawer.
function SidebarContent({ onNavigate, onClose }) {
  return (
    <div className="flex h-full flex-col bg-navy-900">
      <div className="flex items-center justify-between px-5 py-5">
        <Logo />
        {onClose && (
          <button
            onClick={onClose}
            className="rounded-lg p-1.5 text-slate-400 hover:bg-white/5 hover:text-white lg:hidden"
            aria-label="Close menu"
          >
            <X className="h-5 w-5" />
          </button>
        )}
      </div>
      <div className="mt-2 flex-1 overflow-y-auto scrollbar-thin">
        <NavItems onNavigate={onNavigate} />
      </div>
      <UpgradeCard />
    </div>
  )
}

// Desktop: fixed 260px rail. Mobile: animated drawer + backdrop.
export default function Sidebar({ mobileOpen, onClose }) {
  return (
    <>
      {/* Desktop rail */}
      <aside className="hidden w-[260px] shrink-0 lg:block">
        <div className="fixed inset-y-0 left-0 w-[260px] border-r border-navy-800">
          <SidebarContent />
        </div>
      </aside>

      {/* Mobile drawer */}
      {mobileOpen && (
        <div className="lg:hidden">
          <motion.div
            className="fixed inset-0 z-40 bg-slate-900/60 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />
          <motion.div
            className="fixed inset-y-0 left-0 z-50 w-[280px]"
            initial={{ x: '-100%' }}
            animate={{ x: 0 }}
            exit={{ x: '-100%' }}
            transition={{ type: 'spring', duration: 0.4, bounce: 0.05 }}
          >
            <SidebarContent onNavigate={onClose} onClose={onClose} />
          </motion.div>
        </div>
      )}
    </>
  )
}
