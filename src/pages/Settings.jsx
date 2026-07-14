import { useState } from 'react'
import { motion } from 'framer-motion'
import {
  User,
  Building2,
  Bell,
  Palette,
  Shield,
  Sun,
  Moon,
  Monitor,
  Check,
} from 'lucide-react'
import PageHeader from '../components/ui/PageHeader'
import Button from '../components/ui/Button'
import Avatar from '../components/ui/Avatar'
import { Field, inputClass } from '../components/ui/Modal'
import { useToast } from '../components/ui/Toast'
import { cn } from '../lib/cn'
import { currentUser } from '../data/mockData'

// All settings are mock/local state only.
// TODO(api): PATCH /api/v1/me/ and workspace settings endpoints on save.

const tabs = [
  { key: 'profile', label: 'Profile', icon: User },
  { key: 'workspace', label: 'Workspace', icon: Building2 },
  { key: 'notifications', label: 'Notifications', icon: Bell },
  { key: 'theme', label: 'Theme', icon: Palette },
  { key: 'security', label: 'Security', icon: Shield },
]

// Reusable toggle switch.
function Toggle({ checked, onChange }) {
  return (
    <button
      type="button"
      onClick={() => onChange(!checked)}
      className={cn(
        'relative h-6 w-11 rounded-full transition-colors',
        checked ? 'bg-brand-600' : 'bg-slate-200'
      )}
    >
      <span
        className={cn(
          'absolute top-0.5 h-5 w-5 rounded-full bg-white shadow transition-transform',
          checked ? 'translate-x-[22px]' : 'translate-x-0.5'
        )}
      />
    </button>
  )
}

function SettingRow({ title, description, children }) {
  return (
    <div className="flex items-center justify-between gap-4 border-b border-slate-100 py-4 last:border-0">
      <div>
        <p className="text-sm font-medium text-slate-800">{title}</p>
        {description && (
          <p className="mt-0.5 text-sm text-slate-500">{description}</p>
        )}
      </div>
      {children}
    </div>
  )
}

function Card({ title, description, children }) {
  return (
    <div className="fs-card p-6">
      <h3 className="text-base font-semibold text-slate-900">{title}</h3>
      {description && <p className="mt-0.5 text-sm text-slate-500">{description}</p>}
      <div className="mt-5">{children}</div>
    </div>
  )
}

export default function Settings() {
  const [tab, setTab] = useState('profile')
  const [notifs, setNotifs] = useState({
    taskAssigned: true,
    mentions: true,
    weeklyDigest: false,
    productUpdates: true,
  })
  const [theme, setTheme] = useState('light')
  const toast = useToast()

  const save = () => {
    // TODO(api): PATCH the relevant settings endpoint
    toast.success('Changes saved')
  }

  return (
    <div>
      <PageHeader
        title="Settings"
        subtitle="Manage your account, workspace, and preferences."
      />

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-[220px_1fr]">
        {/* Tabs */}
        <nav className="flex gap-1 overflow-x-auto lg:flex-col lg:overflow-visible">
          {tabs.map((t) => (
            <button
              key={t.key}
              onClick={() => setTab(t.key)}
              className={cn(
                'flex shrink-0 items-center gap-2.5 rounded-xl px-3.5 py-2.5 text-sm font-medium transition-colors',
                tab === t.key
                  ? 'bg-brand-50 text-brand-700'
                  : 'text-slate-600 hover:bg-slate-100'
              )}
            >
              <t.icon className="h-4 w-4" />
              {t.label}
            </button>
          ))}
        </nav>

        {/* Panel */}
        <motion.div
          key={tab}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2 }}
          className="space-y-6"
        >
          {tab === 'profile' && (
            <Card
              title="Profile"
              description="Update your personal information."
            >
              <div className="mb-6 flex items-center gap-4">
                <Avatar
                  initials={currentUser.initials}
                  color={currentUser.avatarColor}
                  size="lg"
                />
                <div>
                  <Button variant="secondary" size="sm">
                    Change avatar
                  </Button>
                  <p className="mt-1.5 text-xs text-slate-400">
                    JPG, PNG or GIF. Max 2MB.
                  </p>
                </div>
              </div>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <Field label="Full name">
                  <input defaultValue={currentUser.name} className={inputClass} />
                </Field>
                <Field label="Email address">
                  <input defaultValue={currentUser.email} className={inputClass} />
                </Field>
                <Field label="Job title">
                  <input defaultValue={currentUser.jobTitle} className={inputClass} />
                </Field>
                <Field label="Timezone">
                  <select className={inputClass} defaultValue={currentUser.timezone}>
                    <option>UTC+00:00</option>
                    <option>UTC-05:00</option>
                    <option>UTC-08:00</option>
                    <option>UTC+05:30</option>
                  </select>
                </Field>
              </div>
            </Card>
          )}

          {tab === 'workspace' && (
            <Card
              title="Workspace settings"
              description="Configure your active workspace."
            >
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <Field label="Workspace name">
                  <input defaultValue="Acme Product Team" className={inputClass} />
                </Field>
                <Field label="Workspace URL" hint="flowstack.io/acme-product">
                  <input defaultValue="acme-product" className={inputClass} />
                </Field>
              </div>
              <div className="mt-4">
                <Field label="Description">
                  <textarea
                    rows={3}
                    defaultValue="Core product, growth, and design squads."
                    className={inputClass}
                  />
                </Field>
              </div>
              <div className="mt-2">
                <SettingRow
                  title="Public workspace"
                  description="Allow anyone with the link to view projects."
                >
                  <Toggle checked={false} onChange={() => {}} />
                </SettingRow>
                <SettingRow
                  title="Require invite approval"
                  description="Owners must approve new member invitations."
                >
                  <Toggle checked onChange={() => {}} />
                </SettingRow>
              </div>
            </Card>
          )}

          {tab === 'notifications' && (
            <Card
              title="Notifications"
              description="Choose what you want to be notified about."
            >
              <SettingRow
                title="Task assigned"
                description="When a task is assigned to you."
              >
                <Toggle
                  checked={notifs.taskAssigned}
                  onChange={(v) => setNotifs((n) => ({ ...n, taskAssigned: v }))}
                />
              </SettingRow>
              <SettingRow
                title="Mentions"
                description="When someone @mentions you in a comment."
              >
                <Toggle
                  checked={notifs.mentions}
                  onChange={(v) => setNotifs((n) => ({ ...n, mentions: v }))}
                />
              </SettingRow>
              <SettingRow
                title="Weekly digest"
                description="A summary of your team's activity each week."
              >
                <Toggle
                  checked={notifs.weeklyDigest}
                  onChange={(v) => setNotifs((n) => ({ ...n, weeklyDigest: v }))}
                />
              </SettingRow>
              <SettingRow
                title="Product updates"
                description="News about new FlowStack features."
              >
                <Toggle
                  checked={notifs.productUpdates}
                  onChange={(v) => setNotifs((n) => ({ ...n, productUpdates: v }))}
                />
              </SettingRow>
            </Card>
          )}

          {tab === 'theme' && (
            <Card
              title="Theme"
              description="Customize how FlowStack looks for you."
            >
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
                {[
                  { key: 'light', label: 'Light', icon: Sun },
                  { key: 'dark', label: 'Dark', icon: Moon },
                  { key: 'system', label: 'System', icon: Monitor },
                ].map((opt) => (
                  <button
                    key={opt.key}
                    onClick={() => setTheme(opt.key)}
                    className={cn(
                      'relative flex flex-col items-center gap-2 rounded-xl border-2 p-5 transition-colors',
                      theme === opt.key
                        ? 'border-brand-500 bg-brand-50/50'
                        : 'border-slate-200 hover:border-slate-300'
                    )}
                  >
                    {theme === opt.key && (
                      <span className="absolute right-2 top-2 flex h-5 w-5 items-center justify-center rounded-full bg-brand-600 text-white">
                        <Check className="h-3 w-3" />
                      </span>
                    )}
                    <opt.icon className="h-6 w-6 text-slate-600" />
                    <span className="text-sm font-medium text-slate-700">
                      {opt.label}
                    </span>
                  </button>
                ))}
              </div>
              <p className="mt-4 text-xs text-slate-400">
                Note: dark mode is a preview toggle only in this prototype.
              </p>
            </Card>
          )}

          {tab === 'security' && (
            <Card
              title="Security"
              description="Keep your account secure."
            >
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <Field label="Current password">
                  <input type="password" placeholder="••••••••" className={inputClass} />
                </Field>
                <div className="hidden sm:block" />
                <Field label="New password">
                  <input type="password" placeholder="••••••••" className={inputClass} />
                </Field>
                <Field label="Confirm new password">
                  <input type="password" placeholder="••••••••" className={inputClass} />
                </Field>
              </div>
              <div className="mt-4">
                <SettingRow
                  title="Two-factor authentication"
                  description="Add an extra layer of security to your account."
                >
                  <Toggle checked={false} onChange={() => {}} />
                </SettingRow>
                <SettingRow
                  title="Active sessions"
                  description="You're signed in on 2 devices."
                >
                  <Button variant="secondary" size="sm">
                    Manage
                  </Button>
                </SettingRow>
              </div>
              <div className="mt-6 rounded-xl border border-rose-200 bg-rose-50 p-4">
                <p className="text-sm font-semibold text-rose-700">Danger zone</p>
                <p className="mt-1 text-sm text-rose-600">
                  Permanently delete your account and all associated data.
                </p>
                <Button variant="danger" size="sm" className="mt-3">
                  Delete account
                </Button>
              </div>
            </Card>
          )}

          {/* Save bar */}
          <div className="flex items-center justify-end gap-3">
            <Button variant="secondary">Cancel</Button>
            <Button onClick={save}>Save changes</Button>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
