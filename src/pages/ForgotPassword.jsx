import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Mail, MailCheck, AlertCircle } from 'lucide-react'
import AuthLayout from '../components/layout/AuthLayout'
import AuthField from '../components/auth/AuthField'
import Button from '../components/ui/Button'
import { requestPasswordReset } from '../api/auth'

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

// Forgot password — request a reset link. UI + mock only.
export default function ForgotPassword() {
  const [email, setEmail] = useState('')
  const [error, setError] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [sent, setSent] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (submitting) return
    if (!EMAIL_RE.test(email)) {
      setError('Enter a valid email address.')
      return
    }
    setError('')
    setSubmitting(true)
    try {
      // TODO(supabase): supabase.auth.resetPasswordForEmail(email)
      await requestPasswordReset(email)
      setSent(true)
    } catch (err) {
      setError(err?.message || 'Something went wrong. Please try again.')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <AuthLayout
      title={sent ? 'Check your inbox' : 'Forgot your password?'}
      subtitle={
        sent
          ? "If an account exists for that email, we've sent a link to reset your password."
          : "Enter your email and we'll send you a link to reset your password."
      }
      back={{ to: '/login', label: 'Back to sign in' }}
      footer={
        <>
          Remembered it?{' '}
          <Link to="/login" className="font-semibold text-brand-600 hover:text-brand-700">
            Sign in
          </Link>
        </>
      }
    >
      {sent ? (
        <div className="space-y-5">
          <div className="flex flex-col items-center rounded-2xl border border-emerald-100 bg-emerald-50/60 px-6 py-8 text-center">
            <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white shadow-soft ring-1 ring-emerald-100">
              <MailCheck className="h-6 w-6 text-emerald-600" />
            </span>
            <p className="mt-4 text-sm text-slate-600">
              We sent a reset link to{' '}
              <span className="font-semibold text-slate-800">{email}</span>.
            </p>
            <p className="mt-1 text-xs text-slate-400">
              Didn't get it? Check your spam folder or try again.
            </p>
          </div>
          <Button variant="secondary" size="lg" className="w-full" onClick={() => setSent(false)}>
            Use a different email
          </Button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4" noValidate>
          {error && (
            <div
              role="alert"
              className="flex items-start gap-2 rounded-xl border border-rose-200 bg-rose-50 p-3 text-sm text-rose-700"
            >
              <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
              <span>{error}</span>
            </div>
          )}
          <AuthField
            label="Email address"
            name="email"
            type="email"
            autoComplete="email"
            icon={Mail}
            placeholder="you@company.com"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value)
              setError('')
            }}
            error={error}
          />
          <Button type="submit" size="lg" className="w-full" loading={submitting}>
            {submitting ? 'Sending…' : 'Send reset link'}
          </Button>
        </form>
      )}
    </AuthLayout>
  )
}
