import { useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { ArrowLeft, Mail, MessageSquare, CheckCircle2 } from 'lucide-react'
import Logo from '../components/ui/Logo'
import Button from '../components/ui/Button'
import { Field, inputClass } from '../components/ui/Modal'
import { useToast } from '../components/ui/Toast'

// Public contact / sales page. Used by the Business plan CTA and footer link.
// UI + mock only.
export default function Contact() {
  const [params] = useSearchParams()
  const plan = params.get('plan')
  const toast = useToast()
  const [sent, setSent] = useState(false)
  const [submitting, setSubmitting] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (submitting) return
    setSubmitting(true)
    // TODO(api): POST /api/v1/contact/  { name, email, company, message }
    await new Promise((r) => setTimeout(r, 600))
    setSubmitting(false)
    setSent(true)
    toast.success('Message sent — we’ll be in touch!')
  }

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Top bar */}
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex h-16 max-w-5xl items-center justify-between px-6">
          <Link to="/" className="rounded-md fs-focus" aria-label="FlowStack home">
            <Logo variant="light" className="h-8" />
          </Link>
          <Link
            to="/"
            className="inline-flex items-center gap-1.5 rounded-md text-sm font-medium text-slate-500 transition-colors hover:text-slate-800 fs-focus"
          >
            <ArrowLeft className="h-4 w-4" /> Back to home
          </Link>
        </div>
      </header>

      <main className="mx-auto max-w-2xl px-6 py-16">
        <div className="text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-brand-200 bg-white px-3.5 py-1.5 text-sm font-medium text-brand-700 shadow-sm">
            <MessageSquare className="h-4 w-4" /> Talk to sales
          </span>
          <h1 className="mt-5 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
            Let's build the right plan for your team
          </h1>
          <p className="mx-auto mt-3 max-w-lg text-slate-500">
            Tell us a bit about your team and we'll get back to you within one
            business day.
          </p>
        </div>

        <div className="mt-10 rounded-2xl border border-slate-200 bg-white p-6 shadow-soft sm:p-8">
          {sent ? (
            <div className="flex flex-col items-center py-8 text-center">
              <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-600 ring-1 ring-emerald-100">
                <CheckCircle2 className="h-7 w-7" />
              </span>
              <h2 className="mt-5 text-lg font-semibold text-slate-900">
                Thanks for reaching out!
              </h2>
              <p className="mt-1.5 max-w-sm text-sm text-slate-500">
                A member of our team will email you shortly. In the meantime, feel
                free to explore the product.
              </p>
              <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
                <Link to="/register">
                  <Button>Start free trial</Button>
                </Link>
                <Link to="/login">
                  <Button variant="secondary">Sign in</Button>
                </Link>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <Field label="Full name">
                  <input required name="name" placeholder="Alex Morgan" className={inputClass} />
                </Field>
                <Field label="Work email">
                  <input required name="email" type="email" placeholder="you@company.com" className={inputClass} />
                </Field>
              </div>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <Field label="Company">
                  <input name="company" placeholder="Acme Inc." className={inputClass} />
                </Field>
                <Field label="Plan of interest">
                  <select name="plan" defaultValue={plan || 'Business'} className={inputClass}>
                    <option>Free</option>
                    <option>Pro</option>
                    <option>Business</option>
                    <option>Enterprise</option>
                  </select>
                </Field>
              </div>
              <Field label="How can we help?">
                <textarea
                  required
                  name="message"
                  rows={4}
                  placeholder="Tell us about your team and what you're looking for…"
                  className={inputClass}
                />
              </Field>
              <Button type="submit" size="lg" icon={Mail} className="w-full" loading={submitting}>
                {submitting ? 'Sending…' : 'Send message'}
              </Button>
            </form>
          )}
        </div>
      </main>
    </div>
  )
}
