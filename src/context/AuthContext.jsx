import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react'
import * as authApi from '../api/auth'

// ---------------------------------------------------------------------------
// AuthContext — mock session management for the frontend demo.
// ---------------------------------------------------------------------------
// Holds the current user + token in React state, mirrored to localStorage so a
// signed-in demo survives page reloads. The `api/client.js` `getToken()` reads
// the same localStorage key, so mock auth and the API layer stay in sync.
//
// TODO(supabase): replace this with supabase.auth session + onAuthStateChange,
// or a DRF JWT (access/refresh) flow. Components only use the hook below, so the
// swap is isolated to this file + `src/api/auth.js`.
// ---------------------------------------------------------------------------

const TOKEN_KEY = 'flowstack_token'
const USER_KEY = 'flowstack_user'

const AuthContext = createContext(null)

function readStoredUser() {
  try {
    const raw = localStorage.getItem(USER_KEY)
    return raw ? JSON.parse(raw) : null
  } catch {
    return null
  }
}

function persistSession({ token, user }) {
  try {
    localStorage.setItem(TOKEN_KEY, token)
    localStorage.setItem(USER_KEY, JSON.stringify(user))
  } catch {
    /* storage unavailable — session stays in-memory only */
  }
}

function clearSession() {
  try {
    localStorage.removeItem(TOKEN_KEY)
    localStorage.removeItem(USER_KEY)
  } catch {
    /* ignore */
  }
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => readStoredUser())

  // Keep state in sync if another tab logs in/out.
  useEffect(() => {
    const onStorage = (e) => {
      if (e.key === USER_KEY) setUser(readStoredUser())
    }
    window.addEventListener('storage', onStorage)
    return () => window.removeEventListener('storage', onStorage)
  }, [])

  const apply = useCallback((session) => {
    persistSession(session)
    setUser(session.user)
    return session.user
  }, [])

  const signIn = useCallback(
    async (credentials) => apply(await authApi.login(credentials)),
    [apply]
  )

  const signInDemo = useCallback(
    async () => apply(await authApi.loginDemo()),
    [apply]
  )

  const signUp = useCallback(
    async (data) => apply(await authApi.register(data)),
    [apply]
  )

  const signOut = useCallback(() => {
    // TODO(supabase): supabase.auth.signOut()
    clearSession()
    setUser(null)
  }, [])

  const value = useMemo(
    () => ({
      user,
      isAuthenticated: !!user,
      signIn,
      signInDemo,
      signUp,
      signOut,
    }),
    [user, signIn, signInDemo, signUp, signOut]
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within an <AuthProvider>')
  return ctx
}
