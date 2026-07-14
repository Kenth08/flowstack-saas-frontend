import { createContext, useCallback, useContext, useState } from 'react'
import { createPortal } from 'react-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { CheckCircle2, Info, AlertTriangle, X } from 'lucide-react'

// ---------------------------------------------------------------------------
// Lightweight toast system.
// Wrap the app in <ToastProvider> then call `const toast = useToast()`.
//   toast.success('Project created')
//   toast.info('Invitation sent')
// ---------------------------------------------------------------------------
const ToastContext = createContext(null)

export function useToast() {
  const ctx = useContext(ToastContext)
  if (!ctx) throw new Error('useToast must be used within <ToastProvider>')
  return ctx
}

const icons = {
  success: CheckCircle2,
  info: Info,
  warning: AlertTriangle,
}

const accents = {
  success: 'text-emerald-500',
  info: 'text-brand-500',
  warning: 'text-amber-500',
}

export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([])

  const dismiss = useCallback((id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id))
  }, [])

  const push = useCallback(
    (message, type = 'success') => {
      const id = Math.random().toString(36).slice(2)
      setToasts((prev) => [...prev, { id, message, type }])
      setTimeout(() => dismiss(id), 3200)
    },
    [dismiss]
  )

  const api = {
    success: (m) => push(m, 'success'),
    info: (m) => push(m, 'info'),
    warning: (m) => push(m, 'warning'),
  }

  return (
    <ToastContext.Provider value={api}>
      {children}
      {createPortal(
        <div className="pointer-events-none fixed bottom-4 right-4 z-[60] flex w-full max-w-sm flex-col gap-2">
          <AnimatePresence>
            {toasts.map((t) => {
              const Icon = icons[t.type]
              return (
                <motion.div
                  key={t.id}
                  layout
                  initial={{ opacity: 0, x: 40, scale: 0.95 }}
                  animate={{ opacity: 1, x: 0, scale: 1 }}
                  exit={{ opacity: 0, x: 40, scale: 0.95 }}
                  transition={{ type: 'spring', duration: 0.4, bounce: 0.2 }}
                  className="pointer-events-auto flex items-start gap-3 rounded-xl border border-slate-200 bg-white p-4 shadow-card"
                >
                  <Icon className={`mt-0.5 h-5 w-5 shrink-0 ${accents[t.type]}`} />
                  <p className="flex-1 text-sm font-medium text-slate-700">
                    {t.message}
                  </p>
                  <button
                    onClick={() => dismiss(t.id)}
                    className="rounded-md p-0.5 text-slate-400 transition-colors hover:bg-slate-100 hover:text-slate-600"
                    aria-label="Dismiss"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </motion.div>
              )
            })}
          </AnimatePresence>
        </div>,
        document.body
      )}
    </ToastContext.Provider>
  )
}
