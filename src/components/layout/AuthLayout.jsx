import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { CheckCircle2, ArrowLeft } from 'lucide-react'
import Logo from '../ui/Logo'

// Split-screen auth shell: form on the left, brand panel on the right.
// `back` controls the top-left navigation link (defaults to "Back to home").
export default function AuthLayout({
  title,
  subtitle,
  children,
  footer,
  back = { to: '/', label: 'Back to home' },
}) {
  return (
    <div className="flex min-h-screen bg-white">
      {/* Left: form */}
      <div className="flex w-full flex-col justify-center px-6 py-10 sm:px-12 lg:w-1/2 lg:px-20">
        <div className="mx-auto w-full max-w-sm">
          {back && (
            <Link
              to={back.to}
              className="mb-8 inline-flex items-center gap-1.5 rounded-md text-sm font-medium text-slate-500 transition-colors hover:text-slate-800 fs-focus"
            >
              <ArrowLeft className="h-4 w-4" />
              {back.label}
            </Link>
          )}
          <Link to="/" className="inline-block rounded-md fs-focus" aria-label="FlowStack home">
            <Logo variant="light" />
          </Link>
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="mt-10"
          >
            <h1 className="text-2xl font-bold tracking-tight text-slate-900">
              {title}
            </h1>
            <p className="mt-2 text-sm text-slate-500">{subtitle}</p>
            <div className="mt-8">{children}</div>
            {footer && (
              <p className="mt-6 text-center text-sm text-slate-500">{footer}</p>
            )}
          </motion.div>
        </div>
      </div>

      {/* Right: brand panel */}
      <div className="relative hidden overflow-hidden bg-navy-900 lg:flex lg:w-1/2">
        <div className="absolute inset-0 bg-gradient-to-br from-brand-600/30 via-navy-900 to-navy-950" />
        <div
          className="absolute inset-0 opacity-[0.06]"
          style={{
            backgroundImage:
              'radial-gradient(circle at 1px 1px, white 1px, transparent 0)',
            backgroundSize: '32px 32px',
          }}
        />
        <div className="relative z-10 flex flex-col justify-center px-16">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <h2 className="text-3xl font-bold leading-tight text-white">
              Manage projects, tasks, and teams in one workspace.
            </h2>
            <p className="mt-4 max-w-md text-brand-100/80">
              FlowStack brings your team's work together — plan, track, and ship
              faster with a workspace built for modern teams.
            </p>
            <ul className="mt-8 space-y-3">
              {[
                'Unlimited projects & tasks',
                'Real-time team collaboration',
                'Powerful analytics dashboards',
              ].map((item) => (
                <li key={item} className="flex items-center gap-3 text-brand-50">
                  <CheckCircle2 className="h-5 w-5 text-brand-300" />
                  {item}
                </li>
              ))}
            </ul>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
