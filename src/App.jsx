import { Routes, Route, Navigate } from 'react-router-dom'
import { ToastProvider } from './components/ui/Toast'
import AppLayout from './components/layout/AppLayout'

// Public pages
import Landing from './pages/Landing'
import Login from './pages/Login'
import Register from './pages/Register'

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

// TODO(auth): wrap AppLayout routes in a guard that checks auth state.
// e.g. redirect to /login when there's no valid session/token.
export default function App() {
  return (
    <ToastProvider>
      <Routes>
        {/* Public */}
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Protected app shell */}
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

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </ToastProvider>
  )
}
