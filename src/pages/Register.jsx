import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { User, Mail, Lock, Eye, EyeOff } from 'lucide-react'
import AuthLayout from '../components/layout/AuthLayout'
import Button from '../components/ui/Button'
import { inputClass } from '../components/ui/Modal'

// Register page — UI + local state only.
export default function Register() {
  const [showPw, setShowPw] = useState(false)
  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault()
    // TODO(api): POST new account -> auto-login -> GET /api/v1/me/
    navigate('/dashboard')
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
      <form onSubmit={handleSubmit} className="space-y-4">
        <label className="block">
          <span className="mb-1.5 block text-sm font-medium text-slate-700">
            Full name
          </span>
          <div className="relative">
            <User className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              required
              placeholder="Alex Morgan"
              className={`${inputClass} pl-10`}
            />
          </div>
        </label>

        <label className="block">
          <span className="mb-1.5 block text-sm font-medium text-slate-700">
            Email address
          </span>
          <div className="relative">
            <Mail className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
            <input
              type="email"
              required
              placeholder="you@company.com"
              className={`${inputClass} pl-10`}
            />
          </div>
        </label>

        <label className="block">
          <span className="mb-1.5 block text-sm font-medium text-slate-700">
            Password
          </span>
          <div className="relative">
            <Lock className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
            <input
              type={showPw ? 'text' : 'password'}
              required
              placeholder="Create a strong password"
              className={`${inputClass} pl-10 pr-10`}
            />
            <button
              type="button"
              onClick={() => setShowPw((s) => !s)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
            >
              {showPw ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            </button>
          </div>
          <span className="mt-1 block text-xs text-slate-400">
            Must be at least 8 characters.
          </span>
        </label>

        <label className="flex items-start gap-2 text-sm text-slate-600">
          <input
            type="checkbox"
            required
            className="mt-0.5 h-4 w-4 rounded border-slate-300 text-brand-600 focus:ring-brand-500"
          />
          <span>
            I agree to the{' '}
            <a href="#" className="font-medium text-brand-600 hover:text-brand-700">
              Terms
            </a>{' '}
            and{' '}
            <a href="#" className="font-medium text-brand-600 hover:text-brand-700">
              Privacy Policy
            </a>
            .
          </span>
        </label>

        <Button type="submit" size="lg" className="w-full">
          Create account
        </Button>
      </form>
    </AuthLayout>
  )
}
