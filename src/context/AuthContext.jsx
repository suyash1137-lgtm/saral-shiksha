// src/context/AuthContext.jsx
import { createContext, useContext, useState } from 'react'

/**
 * Mock authentication context — no real backend.
 * State is kept in memory only; the logged-in user's profile
 * is saved to localStorage so page reloads keep the session alive.
 *
 * Shape stored in localStorage (key: saralshiksha_user):
 *   { id, name, email, role: 'student' | 'teacher' }
 *
 * FUTURE: swap localStorage reads/writes for real API calls here.
 */

const USERS_KEY = 'saralshiksha_users'   // registered accounts
const SESSION_KEY = 'saralshiksha_user'  // current session

// ─── pre-seeded demo users ────────────────────────────────────────
const DEMO_USER = {
  id: 'demo-001',
  name: 'Demo Student',
  email: 'demo@saralshiksha.in',
  role: 'student',
}
const DEMO_PASSWORD = 'demo1234'

const DEMO_TEACHER = {
  id: 'teacher-001',
  name: 'Prof. Sharma',
  email: 'teacher@saralshiksha.in',
  role: 'teacher',
}
const DEMO_TEACHER_PASSWORD = 'teacher1234'

function loadUsers() {
  try {
    const raw = localStorage.getItem(USERS_KEY)
    const arr = raw ? JSON.parse(raw) : []
    // make sure demo user credentials always exist
    if (!arr.find(u => u.email === DEMO_USER.email)) {
      arr.push({ ...DEMO_USER, password: DEMO_PASSWORD })
    }
    if (!arr.find(u => u.email === DEMO_TEACHER.email)) {
      arr.push({ ...DEMO_TEACHER, password: DEMO_TEACHER_PASSWORD })
    }
    localStorage.setItem(USERS_KEY, JSON.stringify(arr))
    return arr
  } catch {
    return [
      { ...DEMO_USER, password: DEMO_PASSWORD },
      { ...DEMO_TEACHER, password: DEMO_TEACHER_PASSWORD }
    ]
  }
}

function saveUsers(users) {
  localStorage.setItem(USERS_KEY, JSON.stringify(users))
}

function loadSession() {
  try {
    const raw = localStorage.getItem(SESSION_KEY)
    return raw ? JSON.parse(raw) : null
  } catch {
    return null
  }
}

function saveSession(user) {
  if (user) {
    localStorage.setItem(SESSION_KEY, JSON.stringify(user))
  } else {
    localStorage.removeItem(SESSION_KEY)
  }
}

// ─── context ─────────────────────────────────────────────────────
const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => loadSession())

  /**
   * signup({ name, email, password })
   * Returns { ok: true } or { ok: false, error: string }
   */
  function signup({ name, email, password }) {
    const users = loadUsers()
    if (users.find(u => u.email.toLowerCase() === email.toLowerCase())) {
      return { ok: false, error: 'An account with this email already exists.' }
    }
    const newUser = {
      id: `user-${Date.now()}`,
      name,
      email,
      role: 'student',
      password,
    }
    saveUsers([...users, newUser])
    const session = { id: newUser.id, name: newUser.name, email: newUser.email, role: newUser.role }
    saveSession(session)
    setUser(session)
    return { ok: true }
  }

  /**
   * login({ email, password })
   * Returns { ok: true } or { ok: false, error: string }
   */
  function login({ email, password }) {
    const users = loadUsers()
    const found = users.find(
      u => u.email.toLowerCase() === email.toLowerCase() && u.password === password
    )
    if (!found) {
      return { ok: false, error: 'Incorrect email or password. Try the Demo Student button.' }
    }
    const session = { id: found.id, name: found.name, email: found.email, role: found.role }
    saveSession(session)
    setUser(session)
    return { ok: true }
  }

  /** loginAsDemo — one click, no credentials needed */
  function loginAsDemo() {
    const session = { ...DEMO_USER }
    saveSession(session)
    setUser(session)
    return { ok: true }
  }

  /** loginAsDemoTeacher — one click, teacher portal */
  function loginAsDemoTeacher() {
    const session = { ...DEMO_TEACHER }
    saveSession(session)
    setUser(session)
    return { ok: true }
  }

  /** loginTeacher — educator login */
  function loginTeacher({ email, password }) {
    const users = loadUsers()
    const found = users.find(
      u => u.email.toLowerCase() === email.toLowerCase() && u.password === password
    )
    if (found) {
      const session = { id: found.id, name: found.name, email: found.email, role: 'teacher' }
      saveSession(session)
      setUser(session)
      return { ok: true }
    }
    // For prototype simplicity, allow login if valid email provided
    if (email && password) {
      const session = {
        id: `teacher-${Date.now()}`,
        name: email.split('@')[0] || 'Teacher',
        email,
        role: 'teacher'
      }
      saveSession(session)
      setUser(session)
      return { ok: true }
    }
    return { ok: false, error: 'Please enter a valid email and password, or use the Demo Teacher button.' }
  }

  function logout() {
    saveSession(null)
    setUser(null)
  }

  return (
    <AuthContext.Provider value={{ user, signup, login, loginAsDemo, loginAsDemoTeacher, loginTeacher, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

// eslint-disable-next-line react-refresh/only-export-components
export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used inside AuthProvider')
  return ctx
}

export default AuthContext
