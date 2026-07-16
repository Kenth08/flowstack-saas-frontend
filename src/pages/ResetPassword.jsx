import { useState } from 'react'
import { Link, useNavigate, useSearchParams } from 'react-router-dom'
import { Lock, Eye, EyeOff, ShieldCheck, AlertCircle } from 'lucide-react'
import AuthLayout from '../components/layout/AuthLayout'
import AuthField from '../components/auth/AuthField'
import Button from '../components/ui/Button'
import { resetPassword } from '../api/auth'

// Reset password — set a new password from the emailed link. UI + mock only.
export default function ResetPassword() {
  const [params] = useSearchParams()
  const token = params.get('token') // TODO(supabase): comes from the reset link
  const navigate = useNavigate()

  const [form, setForm] = useState({ password: '', confirm: '' })
  const [errors, setErrors] = useState({})
  const [showPw, setShowPw] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [done, setDone] = useState(false)

  const setField = (name) => (e) => {
    setForm((f) => ({ ...f, [name]: e.target.value }))
    setErrors((prev) => ({ ...prev, [name]: undefined }))
  }

  const validate = () => {
    const next = {}
    if (!form.password) next.password = 'Password is required.'
    else if (form.password.length < 8) next.password = 'Use at least 8 characters.'
    if (form.confirm !== form.password) next.confirm = 'Passwords do not match.'
    setErrors(next)
    return Object.keys(next).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (submitting || !validate()) return
    setSubmitting(true)
    try {
      // TODO(supabase): supabase.auth.updateUser({ password: form.password })
      await resetPassword({ password: form.password, token })
      setDone(true)
    } catch (err) {
      setErrors({ password: err?.message || 'Could not reset password.' })
      setSubmitting(false)
    }
  }

  return (
    <AuthLayout
      title={done ? 'Password updated' : 'Set a new password'}
      subtitle={
        done
          ? 'Your password has been changed. You can now sign in with it.'
          : 'Choose a strong new password for your FlowStack account.'
      }
      back={{ to: '/login', label: 'Back to sign in' }}
    >
      {done ? (
        <div className="space-y-5">
          <div className="flex flex-col items-center rounded-2xl border border-emerald-100 bg-emerald-50/60 px-6 py-8 text-center">
            <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white shadow-soft ring-1 ring-emerald-100">
              <ShieldCheck className="h-6 w-6 text-emerald-600" />
            </span>
            <p className="mt-4 text-sm text-slate-600">
              All set — your password has been updated.
            </p>
          </div>
          <Button size="lg" className="w-full" onClick={() => navigate('/login')}>
            Continue to sign in
          </Button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4" noValidate>
          <AuthField
            label="New password"
            name="password"
            type={showPw ? 'text' : 'password'}
            autoComplete="new-password"
            icon={Lock}
            placeholder="Create a strong password"
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
          <AuthField
            label="Confirm new password"
            name="confirm"
            type={showPw ? 'text' : 'password'}
            autoComplete="new-password"
            icon={Lock}
            placeholder="Re-enter your new password"
            value={form.confirm}
            onChange={setField('confirm')}
            error={errors.confirm}
          />
          {!token && (
            <div className="flex items-start gap-2 rounded-xl border border-amber-200 bg-amber-50 p-3 text-xs text-amber-700">
              <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
              <span>Open this page from the reset link in your email. (Demo: any values work.)</span>
            </div>
          )}
          <Button type="submit" size="lg" className="w-full" loading={submitting}>
            {submitting ? 'Updating…' : 'Update password'}
          </Button>
          <p className="text-center text-sm text-slate-500">
            <Link to="/login" className="font-semibold text-brand-600 hover:text-brand-700">
              Back to sign in
            </Link>
          </p>
        </form>
      )}
    </AuthLayout>
  )
}
