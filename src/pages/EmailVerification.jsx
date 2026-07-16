import { useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { MailCheck, RefreshCw } from 'lucide-react'
import AuthLayout from '../components/layout/AuthLayout'
import Button from '../components/ui/Button'
import { useToast } from '../components/ui/Toast'
import { resendVerification } from '../api/auth'

// Email verification notice — tells the user to check their inbox. UI + mock.
export default function EmailVerification() {
  const [params] = useSearchParams()
  const email = params.get('email')
  const toast = useToast()
  const [sending, setSending] = useState(false)

  const resend = async () => {
    if (sending) return
    setSending(true)
    try {
      // TODO(supabase): supabase.auth.resend({ type: 'signup', email })
      await resendVerification(email)
      toast.success('Verification email sent')
    } finally {
      setSending(false)
    }
  }

  return (
    <AuthLayout
      title="Verify your email"
      subtitle="One quick step to secure your account."
      back={{ to: '/login', label: 'Back to sign in' }}
      footer={
        <>
          Entered the wrong email?{' '}
          <Link to="/register" className="font-semibold text-brand-600 hover:text-brand-700">
            Sign up again
          </Link>
        </>
      }
    >
      <div className="flex flex-col items-center rounded-2xl border border-brand-100 bg-brand-50/50 px-6 py-10 text-center">
        <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white shadow-soft ring-1 ring-brand-100">
          <MailCheck className="h-7 w-7 text-brand-600" />
        </span>
        <h3 className="mt-5 text-base font-semibold text-slate-900">
          Check your email
        </h3>
        <p className="mt-1.5 max-w-xs text-sm text-slate-500">
          We've sent a verification link to{' '}
          {email ? (
            <span className="font-semibold text-slate-700">{email}</span>
          ) : (
            'your inbox'
          )}
          . Click it to activate your FlowStack account.
        </p>
      </div>

      <Button
        variant="secondary"
        size="lg"
        icon={RefreshCw}
        className="mt-5 w-full"
        onClick={resend}
        loading={sending}
      >
        {sending ? 'Resending…' : 'Resend email'}
      </Button>
    </AuthLayout>
  )
}
