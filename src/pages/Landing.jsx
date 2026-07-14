import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import {
  Building2,
  FolderKanban,
  ListChecks,
  Users,
  BarChart3,
  CreditCard,
  ArrowRight,
  Play,
  ChevronDown,
  Check,
  Star,
  Menu,
  X,
  Search,
  Bell,
  Twitter,
  Github,
  Linkedin,
  Quote,
} from 'lucide-react'
import Logo from '../components/ui/Logo'
import Button from '../components/ui/Button'
import { plans, faqs } from '../data/mockData'
import { cn } from '../lib/cn'

// Shared container: consistent ~1152px max width + horizontal padding.
const container = 'mx-auto w-full max-w-6xl px-6 lg:px-8'

// ---------------------------------------------------------------------------
// Feature list for the landing grid.
// ---------------------------------------------------------------------------
const features = [
  {
    icon: Building2,
    title: 'Workspaces',
    desc: 'Organize teams and projects into dedicated, isolated workspaces.',
    accent: 'from-brand-500 to-indigo-600',
  },
  {
    icon: FolderKanban,
    title: 'Project Tracking',
    desc: 'Track progress, milestones, and deadlines across every project.',
    accent: 'from-violet-500 to-purple-600',
  },
  {
    icon: ListChecks,
    title: 'Task Management',
    desc: 'Plan and prioritize work with boards, lists, and due dates.',
    accent: 'from-sky-500 to-blue-600',
  },
  {
    icon: Users,
    title: 'Team Collaboration',
    desc: 'Invite members, assign roles, and keep everyone in sync.',
    accent: 'from-fuchsia-500 to-pink-600',
  },
  {
    icon: BarChart3,
    title: 'Analytics',
    desc: 'Understand team performance with clean, actionable dashboards.',
    accent: 'from-emerald-500 to-teal-600',
  },
  {
    icon: CreditCard,
    title: 'Billing',
    desc: 'Flexible plans that scale with your team, managed in one place.',
    accent: 'from-amber-500 to-orange-600',
  },
]

const trustedBy = ['NovaTech', 'BrightLabs', 'ScaleFlow', 'Apex Studio', 'CloudHive']

const testimonials = [
  {
    quote:
      'FlowStack replaced three different tools for us. Our team finally has one place to plan and ship work.',
    name: 'Jordan Reyes',
    role: 'VP Engineering, NovaTech',
    initials: 'JR',
    color: 'bg-brand-500',
  },
  {
    quote:
      'The analytics alone paid for itself. We spot blockers days earlier than we used to.',
    name: 'Amara Okafor',
    role: 'Head of Ops, BrightLabs',
    initials: 'AO',
    color: 'bg-fuchsia-500',
  },
  {
    quote:
      'Clean, fast, and genuinely a joy to use. Onboarding the whole team took an afternoon.',
    name: 'Lucas Meyer',
    role: 'Founder, ScaleFlow',
    initials: 'LM',
    color: 'bg-emerald-500',
  },
]

// ---------------------------------------------------------------------------
// Navbar — taller (80px), bigger logo, stronger CTA.
// ---------------------------------------------------------------------------
function Navbar() {
  const [open, setOpen] = useState(false)
  const links = [
    { label: 'Features', href: '#features' },
    { label: 'Pricing', href: '#pricing' },
    { label: 'FAQ', href: '#faq' },
  ]
  return (
    <header className="sticky top-0 z-40 border-b border-slate-200/70 bg-white/80 shadow-[0_1px_0_0_rgba(15,23,42,0.02)] backdrop-blur-xl">
      <div className={cn(container, 'flex h-20 items-center justify-between')}>
        <Logo variant="light" className="h-9" />

        <nav className="hidden items-center gap-9 md:flex">
          {links.map((l) => (
            <a
              key={l.label}
              href={l.href}
              className="text-[15px] font-medium text-slate-600 transition-colors hover:text-slate-900"
            >
              {l.label}
            </a>
          ))}
        </nav>

        <div className="hidden items-center gap-3 md:flex">
          <Link to="/login">
            <Button variant="ghost" size="md" className="text-[15px]">
              Login
            </Button>
          </Link>
          <Link to="/register">
            <Button
              variant="gradient"
              size="md"
              iconRight={ArrowRight}
              className="px-5 text-[15px] shadow-lg shadow-brand-600/25"
            >
              Get Started
            </Button>
          </Link>
        </div>

        <button
          onClick={() => setOpen((o) => !o)}
          className="rounded-lg p-2 text-slate-600 hover:bg-slate-100 md:hidden"
          aria-label="Toggle menu"
        >
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {open && (
        <div className="border-t border-slate-100 bg-white px-6 py-4 md:hidden">
          <nav className="flex flex-col gap-1">
            {links.map((l) => (
              <a
                key={l.label}
                href={l.href}
                onClick={() => setOpen(false)}
                className="rounded-lg px-3 py-2.5 text-[15px] font-medium text-slate-600 hover:bg-slate-50"
              >
                {l.label}
              </a>
            ))}
            <div className="mt-2 flex flex-col gap-2">
              <Link to="/login">
                <Button variant="secondary" className="w-full">
                  Login
                </Button>
              </Link>
              <Link to="/register">
                <Button variant="gradient" className="w-full">
                  Get Started
                </Button>
              </Link>
            </div>
          </nav>
        </div>
      )}
    </header>
  )
}

// ---------------------------------------------------------------------------
// Hero — gradient glow, trust badge, tighter copy, larger preview near text.
// ---------------------------------------------------------------------------
function Hero() {
  return (
    <section className="relative overflow-hidden">
      {/* background glows */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute left-1/2 top-[-10%] h-[520px] w-[820px] -translate-x-1/2 rounded-full bg-gradient-to-br from-brand-300/50 via-indigo-300/30 to-fuchsia-200/40 blur-3xl" />
        <div className="absolute left-[8%] top-[30%] h-72 w-72 rounded-full bg-violet-300/30 blur-3xl" />
        <div className="absolute right-[8%] top-[20%] h-72 w-72 rounded-full bg-sky-300/30 blur-3xl" />
        <div
          className="absolute inset-0 opacity-[0.4]"
          style={{
            maskImage:
              'radial-gradient(60% 50% at 50% 20%, black, transparent)',
            backgroundImage:
              'linear-gradient(to right, #e2e8f0 1px, transparent 1px), linear-gradient(to bottom, #e2e8f0 1px, transparent 1px)',
            backgroundSize: '44px 44px',
          }}
        />
      </div>

      <div className={cn(container, 'pb-10 pt-14 text-center lg:pt-20')}>
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <span className="inline-flex items-center gap-2 rounded-full border border-brand-200 bg-white/70 px-4 py-1.5 text-sm font-medium text-brand-700 shadow-sm backdrop-blur">
            <Star className="h-4 w-4 fill-brand-500 text-brand-500" />
            Trusted by 4,000+ modern teams
          </span>

          <h1 className="mx-auto mt-7 max-w-4xl text-[2.6rem] font-extrabold leading-[1.08] tracking-tight text-slate-900 sm:text-6xl">
            Manage projects, tasks, and teams in{' '}
            <span className="relative whitespace-nowrap">
              <span className="bg-gradient-to-r from-brand-500 via-indigo-500 to-fuchsia-500 bg-clip-text text-transparent">
                one workspace.
              </span>
            </span>
          </h1>

          <p className="mx-auto mt-6 max-w-xl text-lg text-slate-500">
            FlowStack brings planning, tracking, and collaboration together — with
            powerful analytics built in — so your team ships faster.
          </p>

          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link to="/register">
              <Button
                variant="gradient"
                size="lg"
                iconRight={ArrowRight}
                className="px-7 text-base shadow-xl shadow-brand-600/30"
              >
                Start Free Trial
              </Button>
            </Link>
            <Button variant="secondary" size="lg" icon={Play} className="px-7 text-base">
              View Demo
            </Button>
          </div>

          <p className="mt-4 text-sm text-slate-400">
            Free 14-day trial • No credit card required
          </p>
        </motion.div>

        <DashboardPreview />
      </div>
    </section>
  )
}

// ---------------------------------------------------------------------------
// Dashboard preview — larger, richer SaaS mock sitting close under the hero.
// ---------------------------------------------------------------------------
function DashboardPreview() {
  const stats = [
    ['Projects', '24', 'text-brand-600', 'bg-brand-100'],
    ['Active', '142', 'text-sky-600', 'bg-sky-100'],
    ['Done', '389', 'text-emerald-600', 'bg-emerald-100'],
    ['Members', '23', 'text-fuchsia-600', 'bg-fuchsia-100'],
  ]
  const bars = [42, 60, 48, 72, 58, 84, 70, 92, 78, 96]
  const activity = [
    ['bg-emerald-500', 'Priya completed a task'],
    ['bg-brand-500', 'Diego commented on Mobile App'],
    ['bg-amber-500', 'Sara moved a task to Review'],
  ]

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.2 }}
      className="relative mx-auto mt-12"
    >
      {/* glow behind the preview */}
      <div className="pointer-events-none absolute -inset-x-10 -bottom-10 -top-6 -z-10 rounded-[2rem] bg-gradient-to-tr from-brand-400/25 via-indigo-400/20 to-fuchsia-400/25 blur-2xl" />

      <div className="overflow-hidden rounded-2xl border border-slate-200/80 bg-white/90 p-2 shadow-2xl shadow-slate-900/10 ring-1 ring-white/60 backdrop-blur">
        <div className="overflow-hidden rounded-xl border border-slate-100">
          <div className="flex min-h-[440px] text-left">
            {/* sidebar */}
            <div className="hidden w-52 shrink-0 flex-col bg-navy-900 p-4 sm:flex">
              <Logo className="h-7" />
              <div className="mt-6 space-y-1">
                {[
                  ['Overview', true],
                  ['Projects', false],
                  ['Tasks', false],
                  ['Members', false],
                  ['Analytics', false],
                  ['Billing', false],
                ].map(([n, active]) => (
                  <div
                    key={n}
                    className={cn(
                      'flex items-center gap-2 rounded-lg px-3 py-2 text-xs font-medium',
                      active ? 'bg-white/10 text-white' : 'text-slate-400'
                    )}
                  >
                    <span
                      className={cn(
                        'h-1.5 w-1.5 rounded-full',
                        active ? 'bg-brand-400' : 'bg-slate-600'
                      )}
                    />
                    {n}
                  </div>
                ))}
              </div>
              <div className="mt-auto rounded-xl bg-gradient-to-br from-brand-500 to-brand-700 p-3">
                <div className="h-2 w-12 rounded bg-white/70" />
                <div className="mt-2 h-1.5 w-full rounded bg-white/30" />
                <div className="mt-1.5 h-1.5 w-3/4 rounded bg-white/30" />
              </div>
            </div>

            {/* main */}
            <div className="flex-1 bg-slate-50">
              {/* topbar */}
              <div className="flex items-center justify-between border-b border-slate-100 bg-white px-5 py-3">
                <div className="h-4 w-24 rounded bg-slate-200" />
                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-2 rounded-lg border border-slate-200 px-2.5 py-1.5">
                    <Search className="h-3.5 w-3.5 text-slate-400" />
                    <div className="h-2 w-16 rounded bg-slate-200" />
                  </div>
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg border border-slate-200">
                    <Bell className="h-3.5 w-3.5 text-slate-400" />
                  </div>
                  <div className="h-8 w-8 rounded-full bg-gradient-to-br from-brand-400 to-brand-600" />
                </div>
              </div>

              <div className="space-y-4 p-5">
                {/* stat cards */}
                <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
                  {stats.map(([label, val, txt, bg]) => (
                    <div
                      key={label}
                      className="rounded-xl border border-slate-200 bg-white p-3"
                    >
                      <div className={cn('h-7 w-7 rounded-lg', bg)} />
                      <p className={cn('mt-2 text-xl font-bold', txt)}>{val}</p>
                      <p className="text-[10px] text-slate-400">{label}</p>
                    </div>
                  ))}
                </div>

                {/* chart + donut */}
                <div className="grid grid-cols-1 gap-3 lg:grid-cols-3">
                  <div className="rounded-xl border border-slate-200 bg-white p-4 lg:col-span-2">
                    <div className="mb-3 flex items-center justify-between">
                      <div className="h-3 w-28 rounded bg-slate-200" />
                      <div className="flex gap-2">
                        <div className="h-2 w-10 rounded bg-brand-200" />
                        <div className="h-2 w-10 rounded bg-slate-200" />
                      </div>
                    </div>
                    <div className="flex h-28 items-end gap-2">
                      {bars.map((h, i) => (
                        <div key={i} className="flex flex-1 flex-col justify-end gap-0.5">
                          <div
                            className="rounded-t bg-gradient-to-t from-brand-400 to-brand-600"
                            style={{ height: `${h}%` }}
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="flex flex-col rounded-xl border border-slate-200 bg-white p-4">
                    <div className="mb-3 h-3 w-20 rounded bg-slate-200" />
                    <div className="flex flex-1 items-center justify-center">
                      <div
                        className="h-24 w-24 rounded-full"
                        style={{
                          background:
                            'conic-gradient(#6366f1 0 45%, #10b981 45% 72%, #f59e0b 72% 90%, #f43f5e 90% 100%)',
                        }}
                      >
                        <div className="flex h-full w-full items-center justify-center">
                          <div className="h-14 w-14 rounded-full bg-white" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* activity + team */}
                <div className="grid grid-cols-1 gap-3 lg:grid-cols-3">
                  <div className="rounded-xl border border-slate-200 bg-white p-4 lg:col-span-2">
                    <div className="mb-3 h-3 w-24 rounded bg-slate-200" />
                    <div className="space-y-2.5">
                      {activity.map(([dot, _], i) => (
                        <div key={i} className="flex items-center gap-2.5">
                          <span className={cn('h-6 w-6 rounded-full', dot)} />
                          <div className="h-2.5 flex-1 rounded bg-slate-100" />
                          <div className="h-2 w-8 rounded bg-slate-100" />
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="rounded-xl border border-slate-200 bg-white p-4">
                    <div className="mb-3 h-3 w-16 rounded bg-slate-200" />
                    <div className="flex -space-x-2">
                      {['bg-brand-500', 'bg-fuchsia-500', 'bg-emerald-500', 'bg-amber-500', 'bg-sky-500'].map(
                        (c, i) => (
                          <span
                            key={i}
                            className={cn('h-8 w-8 rounded-full ring-2 ring-white', c)}
                          />
                        )
                      )}
                    </div>
                    <div className="mt-3 space-y-2">
                      <div className="h-2 w-full rounded bg-slate-100" />
                      <div className="h-2 w-2/3 rounded bg-slate-100" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

// ---------------------------------------------------------------------------
// Trust logos strip
// ---------------------------------------------------------------------------
function TrustBar() {
  return (
    <section className="border-y border-slate-100 bg-white/60 py-10">
      <div className={container}>
        <p className="text-center text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">
          Trusted by modern teams
        </p>
        <div className="mt-6 flex flex-wrap items-center justify-center gap-x-10 gap-y-4">
          {trustedBy.map((name) => (
            <span
              key={name}
              className="text-lg font-bold tracking-tight text-slate-400 transition-colors hover:text-slate-600"
            >
              {name}
            </span>
          ))}
        </div>
      </div>
    </section>
  )
}

// ---------------------------------------------------------------------------
// Features — richer cards with gradient icon tiles + hover lift.
// ---------------------------------------------------------------------------
function Features() {
  return (
    <section id="features" className="py-24">
      <div className={container}>
        <div className="mx-auto max-w-2xl text-center">
          <span className="text-sm font-semibold uppercase tracking-wider text-brand-600">
            Features
          </span>
          <h2 className="mt-3 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
            Everything your team needs to ship
          </h2>
          <p className="mt-4 text-lg text-slate-500">
            One platform for workspaces, projects, tasks, and the people who make
            them happen.
          </p>
        </div>

        <div className="mt-16 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((f, i) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.05 }}
              whileHover={{ y: -4 }}
              className="group relative overflow-hidden rounded-2xl border border-slate-200 bg-gradient-to-b from-white to-slate-50/70 p-6 shadow-soft transition-shadow hover:shadow-card"
            >
              <div
                className={cn(
                  'flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br text-white shadow-lg',
                  f.accent
                )}
              >
                <f.icon className="h-6 w-6" />
              </div>
              <h3 className="mt-5 text-lg font-semibold text-slate-900">
                {f.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-500">
                {f.desc}
              </p>
              <div className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-brand-600 opacity-0 transition-opacity group-hover:opacity-100">
                Learn more <ArrowRight className="h-4 w-4" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ---------------------------------------------------------------------------
// Testimonials
// ---------------------------------------------------------------------------
function Testimonials() {
  return (
    <section className="bg-slate-50/80 py-24">
      <div className={container}>
        <div className="mx-auto max-w-2xl text-center">
          <span className="text-sm font-semibold uppercase tracking-wider text-brand-600">
            Testimonials
          </span>
          <h2 className="mt-3 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
            Loved by teams everywhere
          </h2>
        </div>
        <div className="mt-14 grid grid-cols-1 gap-6 md:grid-cols-3">
          {testimonials.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.06 }}
              className="flex flex-col rounded-2xl border border-slate-200 bg-white p-6 shadow-soft"
            >
              <Quote className="h-8 w-8 text-brand-200" />
              <p className="mt-3 flex-1 text-[15px] leading-relaxed text-slate-600">
                “{t.quote}”
              </p>
              <div className="mt-5 flex items-center gap-3 border-t border-slate-100 pt-4">
                <span
                  className={cn(
                    'flex h-10 w-10 items-center justify-center rounded-full text-sm font-semibold text-white',
                    t.color
                  )}
                >
                  {t.initials}
                </span>
                <div>
                  <p className="text-sm font-semibold text-slate-900">{t.name}</p>
                  <p className="text-xs text-slate-400">{t.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ---------------------------------------------------------------------------
// Pricing — monthly/yearly toggle + strongly highlighted Pro plan.
// ---------------------------------------------------------------------------
function Pricing() {
  const [yearly, setYearly] = useState(false)

  const priceFor = (base) => {
    if (base === 0) return 0
    return yearly ? Math.round(base * 0.8) : base
  }

  return (
    <section id="pricing" className="py-24">
      <div className={container}>
        <div className="mx-auto max-w-2xl text-center">
          <span className="text-sm font-semibold uppercase tracking-wider text-brand-600">
            Pricing
          </span>
          <h2 className="mt-3 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
            Simple, transparent pricing
          </h2>
          <p className="mt-4 text-lg text-slate-500">
            Start free and upgrade as your team grows. Cancel anytime.
          </p>

          {/* toggle */}
          <div className="mt-8 inline-flex items-center gap-3 rounded-full border border-slate-200 bg-white p-1 shadow-soft">
            <button
              onClick={() => setYearly(false)}
              className={cn(
                'rounded-full px-4 py-1.5 text-sm font-medium transition-colors',
                !yearly ? 'bg-brand-600 text-white' : 'text-slate-500'
              )}
            >
              Monthly
            </button>
            <button
              onClick={() => setYearly(true)}
              className={cn(
                'flex items-center gap-1.5 rounded-full px-4 py-1.5 text-sm font-medium transition-colors',
                yearly ? 'bg-brand-600 text-white' : 'text-slate-500'
              )}
            >
              Yearly
              <span
                className={cn(
                  'rounded-full px-1.5 py-0.5 text-[10px] font-semibold',
                  yearly ? 'bg-white/20 text-white' : 'bg-emerald-100 text-emerald-700'
                )}
              >
                -20%
              </span>
            </button>
          </div>
        </div>

        <div className="mt-14 grid grid-cols-1 items-center gap-6 md:grid-cols-3">
          {plans.map((plan) => {
            const highlighted = plan.highlighted
            const price = priceFor(plan.price)
            return (
              <div
                key={plan.id}
                className={cn(
                  'relative flex flex-col rounded-2xl border p-7 transition-all',
                  highlighted
                    ? 'border-transparent bg-navy-900 text-white shadow-2xl shadow-brand-900/30 md:-my-4 md:py-11 ring-1 ring-brand-500/40'
                    : 'border-slate-200 bg-white shadow-soft hover:shadow-card'
                )}
              >
                {highlighted && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-gradient-to-r from-brand-400 to-fuchsia-500 px-4 py-1 text-xs font-semibold text-white shadow-lg">
                    Most Popular
                  </span>
                )}

                <div>
                  <h3
                    className={cn(
                      'text-lg font-semibold',
                      highlighted ? 'text-white' : 'text-slate-900'
                    )}
                  >
                    {plan.name}
                  </h3>
                  <p
                    className={cn(
                      'mt-1 text-sm',
                      highlighted ? 'text-brand-100' : 'text-slate-500'
                    )}
                  >
                    {plan.tagline}
                  </p>
                </div>

                <div className="mt-5 flex items-end gap-1.5">
                  <span
                    className={cn(
                      'text-5xl font-extrabold tracking-tight',
                      highlighted ? 'text-white' : 'text-slate-900'
                    )}
                  >
                    ${price}
                  </span>
                  <span
                    className={cn(
                      'mb-1.5 text-sm',
                      highlighted ? 'text-brand-200' : 'text-slate-400'
                    )}
                  >
                    /mo{yearly && plan.price !== 0 ? ', billed yearly' : ''}
                  </span>
                </div>

                <ul className="mb-7 mt-6 flex-1 space-y-3">
                  {plan.features.map((feat) => (
                    <li
                      key={feat}
                      className={cn(
                        'flex items-start gap-2.5 text-sm',
                        highlighted ? 'text-brand-50' : 'text-slate-600'
                      )}
                    >
                      <span
                        className={cn(
                          'mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full',
                          highlighted ? 'bg-brand-400/30' : 'bg-brand-100'
                        )}
                      >
                        <Check
                          className={cn(
                            'h-3 w-3',
                            highlighted ? 'text-brand-200' : 'text-brand-600'
                          )}
                        />
                      </span>
                      {feat}
                    </li>
                  ))}
                </ul>

                <Link to="/register">
                  <Button
                    variant={highlighted ? 'gradient' : 'secondary'}
                    size="lg"
                    className={cn('w-full', highlighted && 'shadow-lg shadow-brand-600/30')}
                  >
                    {plan.price === 0 ? 'Get Started Free' : `Choose ${plan.name}`}
                  </Button>
                </Link>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

// ---------------------------------------------------------------------------
// FAQ — cleaner cards, more spacing, smooth expand.
// ---------------------------------------------------------------------------
function FAQItem({ faq }) {
  const [open, setOpen] = useState(false)
  return (
    <div
      className={cn(
        'rounded-2xl border bg-white transition-colors',
        open ? 'border-brand-200 shadow-soft' : 'border-slate-200'
      )}
    >
      <button
        onClick={() => setOpen((o) => !o)}
        className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left"
      >
        <span className="text-[15px] font-semibold text-slate-900">{faq.q}</span>
        <span
          className={cn(
            'flex h-7 w-7 shrink-0 items-center justify-center rounded-full transition-colors',
            open ? 'bg-brand-600 text-white' : 'bg-slate-100 text-slate-500'
          )}
        >
          <ChevronDown
            className={cn('h-4 w-4 transition-transform', open && 'rotate-180')}
          />
        </span>
      </button>
      <motion.div
        initial={false}
        animate={{ height: open ? 'auto' : 0, opacity: open ? 1 : 0 }}
        transition={{ duration: 0.25 }}
        className="overflow-hidden"
      >
        <p className="px-6 pb-5 text-sm leading-relaxed text-slate-500">{faq.a}</p>
      </motion.div>
    </div>
  )
}

function FAQ() {
  return (
    <section id="faq" className="bg-slate-50/80 py-24">
      <div className={cn(container, 'max-w-3xl')}>
        <div className="text-center">
          <span className="text-sm font-semibold uppercase tracking-wider text-brand-600">
            FAQ
          </span>
          <h2 className="mt-3 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
            Frequently asked questions
          </h2>
          <p className="mt-4 text-lg text-slate-500">
            Everything you need to know about FlowStack.
          </p>
        </div>
        <div className="mt-12 space-y-4">
          {faqs.map((faq) => (
            <FAQItem key={faq.q} faq={faq} />
          ))}
        </div>
      </div>
    </section>
  )
}

// ---------------------------------------------------------------------------
// CTA banner — premium gradient card, fixed buttons.
// ---------------------------------------------------------------------------
function CTABanner() {
  return (
    <section className="py-24">
      <div className={container}>
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-brand-600 via-indigo-600 to-brand-800 px-8 py-16 text-center shadow-2xl shadow-brand-900/30 sm:px-16">
          <div
            className="absolute inset-0 opacity-15"
            style={{
              backgroundImage:
                'radial-gradient(circle at 1px 1px, white 1px, transparent 0)',
              backgroundSize: '26px 26px',
            }}
          />
          <div className="pointer-events-none absolute -right-16 -top-16 h-64 w-64 rounded-full bg-white/10 blur-2xl" />
          <div className="pointer-events-none absolute -bottom-20 -left-16 h-64 w-64 rounded-full bg-fuchsia-400/20 blur-2xl" />

          <div className="relative mx-auto max-w-2xl">
            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
              Ready to bring your team together?
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-lg text-brand-100">
              Start planning projects, tracking tasks, and collaborating faster.
            </p>
            <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Link to="/register">
                <Button
                  variant="plain"
                  size="lg"
                  className="bg-white px-7 text-base font-semibold text-brand-700 shadow-lg hover:bg-brand-50"
                  iconRight={ArrowRight}
                >
                  Start Free Trial
                </Button>
              </Link>
              <Link to="/login">
                <Button
                  variant="plain"
                  size="lg"
                  className="border border-white/30 bg-white/10 px-7 text-base font-semibold text-white backdrop-blur hover:bg-white/20"
                >
                  Sign in
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

// ---------------------------------------------------------------------------
// Footer — bigger logo, social icons, status.
// ---------------------------------------------------------------------------
function Footer() {
  const cols = [
    { title: 'Product', links: ['Features', 'Pricing', 'Integrations', 'Changelog'] },
    { title: 'Company', links: ['About', 'Blog', 'Careers', 'Contact'] },
    { title: 'Resources', links: ['Docs', 'Help Center', 'API', 'Status'] },
    { title: 'Legal', links: ['Privacy', 'Terms', 'Security', 'Cookies'] },
  ]
  const socials = [Twitter, Github, Linkedin]
  return (
    <footer className="border-t border-slate-200 bg-white">
      <div className={cn(container, 'py-16')}>
        <div className="grid grid-cols-2 gap-10 sm:grid-cols-3 lg:grid-cols-6">
          <div className="col-span-2">
            <Logo variant="light" className="h-10" />
            <p className="mt-5 max-w-xs text-sm leading-relaxed text-slate-500">
              The workspace where modern teams plan, track, and ship their best
              work together.
            </p>
            <div className="mt-6 flex items-center gap-2">
              {socials.map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 text-slate-500 transition-colors hover:border-brand-300 hover:bg-brand-50 hover:text-brand-600"
                >
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>
          {cols.map((col) => (
            <div key={col.title}>
              <h4 className="text-sm font-semibold text-slate-900">{col.title}</h4>
              <ul className="mt-4 space-y-3">
                {col.links.map((link) => (
                  <li key={link}>
                    <a
                      href="#"
                      className="text-sm text-slate-500 transition-colors hover:text-brand-600"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="mt-14 flex flex-col items-center justify-between gap-4 border-t border-slate-100 pt-8 sm:flex-row">
          <p className="text-sm text-slate-400">
            © {new Date().getFullYear()} FlowStack. All rights reserved.
          </p>
          <div className="flex items-center gap-2 rounded-full border border-emerald-100 bg-emerald-50 px-3 py-1 text-sm font-medium text-emerald-600">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
            </span>
            All systems operational
          </div>
        </div>
      </div>
    </footer>
  )
}

// ---------------------------------------------------------------------------
// Page
// ---------------------------------------------------------------------------
export default function Landing() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <main>
        <Hero />
        <TrustBar />
        <Features />
        <Testimonials />
        <Pricing />
        <FAQ />
        <CTABanner />
      </main>
      <Footer />
    </div>
  )
}
