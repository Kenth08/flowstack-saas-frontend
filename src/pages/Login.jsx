import { useState } from 'react'
import { Link, useNavigate, useSearchParams } from 'react-router-dom'
import { Mail, Lock, Eye, EyeOff, Sparkles, AlertCircle } from 'lucide-react'
import AuthLayout from '../components/layout/AuthLayout'
import AuthField from '../components/auth/AuthField'
import GoogleButton from '../components/auth/GoogleButton'
import Button from '../components/ui/Button'
import { useAuth } from '../context/AuthContext'
import { DEMO_CREDENTIALS } from '../api/auth'

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

// Login page — mock auth, real validation + UX states.
export default function Login() {
  const [form, setForm] = useState({ email: '', password: '' })
  const [errors, setErrors] = useState({})
  const [formError, setFormError] = useState('')
  const [showPw, setShowPw] = useState(false)
  const [submitting, setSubmitting] = useState(false)

  const { signIn, signInDemo } = useAuth()
  const navigate = useNavigate()
  const [params] = useSearchParams()
  const next = params.get('next')

  const goNext = () => navigate(next ? decodeURIComponent(next) : '/dashboard', { replace: true })

  const setField = (name) => (e) => {
    setForm((f) => ({ ...f, [name]: e.target.value }))
    setErrors((prev) => ({ ...prev, [name]: undefined }))
    setFormError('')
  }

  const validate = () => {
    const next = {}
    if (!form.email.trim()) next.email = 'Email is required.'
    else if (!EMAIL_RE.test(form.email)) next.email = 'Enter a valid email address.'
    if (!form.password) next.password = 'Password is required.'
    setErrors(next)
    return Object.keys(next).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (submitting || !validate()) return
    setSubmitting(true)
    setFormError('')
    try {
      // TODO(supabase): supabase.auth.signInWithPassword(form)
      await signIn(form)
      goNext()
    } catch (err) {
      setFormError(err?.message || 'Unable to sign in. Please try again.')
    } finally {
      setSubmitting(false)
    }
  }

  const handleDemo = async () => {
    if (submitting) return
    setSubmitting(true)
    setFormError('')
    try {
      await signInDemo()
      goNext()
    } catch {
      setFormError('Could not start the demo. Please try again.')
      setSubmitting(false)
    }
  }

  return (
    <AuthLayout
      title="Welcome back"
      subtitle="Sign in to your FlowStack workspace to continue."
      footer={
        <>
          Don't have an account?{' '}
          <Link to="/register" className="font-semibold text-brand-600 hover:text-brand-700">
            Sign up
          </Link>
        </>
      }
    >
      {/* Demo account hint */}
      <div className="mb-5 flex items-start gap-2.5 rounded-xl border border-brand-100 bg-brand-50/60 p-3 text-sm">
        <Sparkles className="mt-0.5 h-4 w-4 shrink-0 text-brand-600" />
        <div className="text-slate-600">
          <p className="font-medium text-slate-700">Demo account</p>
          <p className="mt-0.5">
            <span className="font-medium">{DEMO_CREDENTIALS.email}</span> ·{' '}
            <span className="font-medium">{DEMO_CREDENTIALS.password}</span>
          </p>
        </div>
      </div>

      {/* Error banner */}
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

        <AuthField
          label="Password"
          name="password"
          type={showPw ? 'text' : 'password'}
          autoComplete="current-password"
          icon={Lock}
          placeholder="••••••••"
          value={form.password}
          onChange={setField('password')}
          error={errors.password}
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

        <div className="flex items-center justify-between">
          <label className="flex items-center gap-2 text-sm text-slate-600">
            <input
              type="checkbox"
              className="h-4 w-4 rounded border-slate-300 text-brand-600 focus:ring-brand-500"
            />
            Remember me
          </label>
          <Link
            to="/forgot-password"
            className="rounded-md text-sm font-medium text-brand-600 hover:text-brand-700 fs-focus"
          >
            Forgot password?
          </Link>
        </div>

        <Button type="submit" size="lg" className="w-full" loading={submitting}>
          {submitting ? 'Signing in…' : 'Sign in'}
        </Button>
      </form>

      {/* Continue as demo */}
      <Button
        variant="secondary"
        size="lg"
        className="mt-3 w-full"
        onClick={handleDemo}
        disabled={submitting}
      >
        Continue as Demo
      </Button>

      {/* Divider */}
      <div className="my-5 flex items-center gap-3">
        <span className="h-px flex-1 bg-slate-200" />
        <span className="text-xs font-medium uppercase tracking-wide text-slate-400">
          or
        </span>
        <span className="h-px flex-1 bg-slate-200" />
      </div>

      {/* Social auth (UI only for now) */}
      <GoogleButton label="Sign in with Google" />
    </AuthLayout>
  )
}
