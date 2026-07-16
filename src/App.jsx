import { Routes, Route, Navigate } from 'react-router-dom'
import { ToastProvider } from './components/ui/Toast'
import AppLayout from './components/layout/AppLayout'
import RequireAuth, { RedirectIfAuthed } from './components/auth/RequireAuth'

// Public pages
import Landing from './pages/Landing'
import Login from './pages/Login'
import Register from './pages/Register'
import ForgotPassword from './pages/ForgotPassword'
import ResetPassword from './pages/ResetPassword'
import EmailVerification from './pages/EmailVerification'
import Contact from './pages/Contact'

// App (protected) pages
import Overview from './pages/Overview'
import Workspaces from './pages/Workspaces'
import Projects from './pages/Projects'
import Tasks from './pages/Tasks'
import Members from './pages/Members'
import Invitations from './pages/Invitations'
import Analytics from './pages/Analytics'
import Billing from './pages/Billing'
import Settings from './pages/Settings'

export default function App() {
  return (
    <ToastProvider>
      <Routes>
        {/* Public */}
        <Route path="/" element={<Landing />} />
        <Route path="/contact" element={<Contact />} />

        {/* Auth — signed-in users are bounced to the dashboard */}
        <Route
          path="/login"
          element={
            <RedirectIfAuthed>
              <Login />
            </RedirectIfAuthed>
          }
        />
        <Route
          path="/register"
          element={
            <RedirectIfAuthed>
              <Register />
            </RedirectIfAuthed>
          }
        />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/email-verification" element={<EmailVerification />} />

        {/* Protected app shell — requires a (mock) session.
            TODO(auth): replace RequireAuth's check with real Supabase/JWT auth. */}
        <Route element={<RequireAuth />}>
          <Route element={<AppLayout />}>
            <Route path="/dashboard" element={<Overview />} />
            <Route path="/workspaces" element={<Workspaces />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/tasks" element={<Tasks />} />
            <Route path="/members" element={<Members />} />
            <Route path="/invitations" element={<Invitations />} />
            <Route path="/analytics" element={<Analytics />} />
            <Route path="/billing" element={<Billing />} />
            <Route path="/settings" element={<Settings />} />
          </Route>
        </Route>

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </ToastProvider>
  )
}
