import { useMemo, useState } from 'react'
import { Link, useNavigate, useSearchParams } from 'react-router-dom'
import { User, Mail, Lock, Eye, EyeOff, AlertCircle } from 'lucide-react'
import AuthLayout from '../components/layout/AuthLayout'
import AuthField from '../components/auth/AuthField'
import GoogleButton from '../components/auth/GoogleButton'
import Button from '../components/ui/Button'
import { cn } from '../lib/cn'
import { useAuth } from '../context/AuthContext'

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

// Scores password strength 0–4 and returns a label + bar color.
function scorePassword(pw) {
  let score = 0
  if (pw.length >= 8) score++
  if (/[A-Z]/.test(pw) && /[a-z]/.test(pw)) score++
  if (/\d/.test(pw)) score++
  if (/[^A-Za-z0-9]/.test(pw)) score++
  const meta = [
    { label: '', color: '' },
    { label: 'Weak', color: 'bg-rose-500' },
    { label: 'Fair', color: 'bg-amber-500' },
    { label: 'Good', color: 'bg-sky-500' },
    { label: 'Strong', color: 'bg-emerald-500' },
  ]
  return { score, ...meta[score] }
}

const planNames = { free: 'Free', pro: 'Pro', business: 'Business' }

// Register page — mock auth, real validation + UX states.
export default function Register() {
  const [params] = useSearchParams()
  const plan = params.get('plan')
  const planLabel = plan && planNames[plan.toLowerCase()]

  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    confirm: '',
    terms: false,
  })
  const [errors, setErrors] = useState({})
  const [formError, setFormError] = useState('')
  const [showPw, setShowPw] = useState(false)
  const [submitting, setSubmitting] = useState(false)

  const { signUp } = useAuth()
  const navigate = useNavigate()

  const strength = useMemo(() => scorePassword(form.password), [form.password])

  const setField = (name) => (e) => {
    const value = name === 'terms' ? e.target.checked : e.target.value
    setForm((f) => ({ ...f, [name]: value }))
    setErrors((prev) => ({ ...prev, [name]: undefined }))
    setFormError('')
  }

  const validate = () => {
    const next = {}
    if (!form.name.trim()) next.name = 'Full name is required.'
    if (!form.email.trim()) next.email = 'Email is required.'
    else if (!EMAIL_RE.test(form.email)) next.email = 'Enter a valid email address.'
    if (!form.password) next.password = 'Password is required.'
    else if (form.password.length < 8) next.password = 'Use at least 8 characters.'
    if (form.confirm !== form.password) next.confirm = 'Passwords do not match.'
    if (!form.terms) next.terms = 'Please accept the terms to continue.'
    setErrors(next)
    return Object.keys(next).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (submitting || !validate()) return
    setSubmitting(true)
    setFormError('')
    try {
      // TODO(supabase): supabase.auth.signUp({ email, password })
      // If email verification is enabled later, redirect to /email-verification
      // instead of auto-logging in below.
      await signUp({ name: form.name, email: form.email, password: form.password })
      navigate('/dashboard', { replace: true })
    } catch (err) {
      setFormError(err?.message || 'Unable to create your account. Please try again.')
      setSubmitting(false)
    }
  }

  return (
    <AuthLayout
      title="Create your account"
      subtitle="Start managing your team's work in minutes. No credit card required."
      footer={
        <>
          Already have an account?{' '}
          <Link to="/login" className="font-semibold text-brand-600 hover:text-brand-700">
            Sign in
          </Link>
        </>
      }
    >
      {planLabel && (
        <div className="mb-5 rounded-xl border border-brand-100 bg-brand-50/60 px-3.5 py-2.5 text-sm text-slate-600">
          You're signing up for the{' '}
          <span className="font-semibold text-brand-700">{planLabel}</span> plan.
        </div>
      )}

      {formError && (
        <div
          role="alert"
          className="mb-4 flex items-start gap-2 rounded-xl border border-rose-200 bg-rose-50 p-3 text-sm text-rose-700"
        >
          <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
          <span>{formError}</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4" noValidate>
        <AuthField
          label="Full name"
          name="name"
          type="text"
          autoComplete="name"
          icon={User}
          placeholder="Alex Morgan"
          value={form.name}
          onChange={setField('name')}
          error={errors.name}
        />

        <AuthField
          label="Email address"
          name="email"
          type="email"
          autoComplete="email"
          icon={Mail}
          placeholder="you@company.com"
          value={form.email}
          onChange={setField('email')}
          error={errors.email}
        />

        <div>
          <AuthField
            label="Password"
            name="password"
            type={showPw ? 'text' : 'password'}
            autoComplete="new-password"
            icon={Lock}
            placeholder="Create a strong password"
            value={form.password}
            onChange={setField('password')}
            error={errors.password}
            hint={!errors.password && !form.password ? 'Must be at least 8 characters.' : undefined}
            rightSlot={
              <button
                type="button"
                onClick={() => setShowPw((s) => !s)}
                aria-label={showPw ? 'Hide password' : 'Show password'}
                className="rounded-md p-1.5 text-slate-400 transition-colors hover:text-slate-600 fs-focus"
              >
                {showPw ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            }
          />
          {/* Strength meter */}
          {form.password && (
            <div className="mt-2 flex items-center gap-2">
              <div className="flex flex-1 gap-1">
                {[1, 2, 3, 4].map((i) => (
                  <span
                    key={i}
                    className={cn(
                      'h-1.5 flex-1 rounded-full transition-colors',
                      i <= strength.score ? strength.color : 'bg-slate-200'
                    )}
                  />
                ))}
              </div>
              <span className="w-12 text-right text-xs font-medium text-slate-500">
                {strength.label}
              </span>
            </div>
          )}
        </div>

        <AuthField
          label="Confirm password"
          name="confirm"
          type={showPw ? 'text' : 'password'}
          autoComplete="new-password"
          icon={Lock}
          placeholder="Re-enter your password"
          value={form.confirm}
          onChange={setField('confirm')}
          error={errors.confirm}
        />

        <div>
          <label className="flex items-start gap-2 text-sm text-slate-600">
            <input
              type="checkbox"
              checked={form.terms}
              onChange={setField('terms')}
              className="mt-0.5 h-4 w-4 rounded border-slate-300 text-brand-600 focus:ring-brand-500"
            />
            <span>
              I agree to the{' '}
              <Link to="/contact" className="font-medium text-brand-600 hover:text-brand-700">
                Terms
              </Link>{' '}
              and{' '}
              <Link to="/contact" className="font-medium text-brand-600 hover:text-brand-700">
                Privacy Policy
              </Link>
              .
            </span>
          </label>
          {errors.terms && (
            <p className="mt-1.5 text-xs font-medium text-rose-600">{errors.terms}</p>
          )}
        </div>

        <Button type="submit" size="lg" className="w-full" loading={submitting}>
          {submitting ? 'Creating account…' : 'Create account'}
        </Button>
      </form>

      <div className="my-5 flex items-center gap-3">
        <span className="h-px flex-1 bg-slate-200" />
        <span className="text-xs font-medium uppercase tracking-wide text-slate-400">
          or
        </span>
        <span className="h-px flex-1 bg-slate-200" />
      </div>

      <GoogleButton label="Sign up with Google" />
    </AuthLayout>
  )
}
