// src/pages/Signup.jsx
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { BookOpen, UserPlus, Eye, EyeOff } from 'lucide-react'
import { useAuth } from '../context/AuthContext'
import FormInput from '../components/FormInput'

// ─── validation ──────────────────────────────────────────────────
function validate(name, email, password) {
  const errs = {}
  if (!name.trim()) errs.name = 'Your name is required.'
  else if (name.trim().length < 2) errs.name = 'Name must be at least 2 characters.'

  if (!email.trim()) errs.email = 'Email is required.'
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) errs.email = 'Enter a valid email address.'

  if (!password) errs.password = 'Password is required.'
  else if (password.length < 6) errs.password = 'Password must be at least 6 characters.'

  return errs
}

export default function Signup() {
  const { signup } = useAuth()
  const navigate   = useNavigate()

  const [name, setName]         = useState('')
  const [email, setEmail]       = useState('')
  const [password, setPassword] = useState('')
  const [showPw, setShowPw]     = useState(false)
  const [errors, setErrors]     = useState({})
  const [formErr, setFormErr]   = useState('')
  const [loading, setLoading]   = useState(false)

  async function handleSubmit(e) {
    e.preventDefault()
    const errs = validate(name, email, password)
    if (Object.keys(errs).length) { setErrors(errs); return }
    setErrors({})
    setFormErr('')
    setLoading(true)
    await new Promise(r => setTimeout(r, 300))
    const result = signup({ name, email, password })
    setLoading(false)
    if (result.ok) {
      navigate('/accessibility')
    } else {
      setFormErr(result.error)
    }
  }

  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md flex flex-col gap-8">

        {/* Brand header */}
        <div className="flex flex-col items-center gap-2 text-center">
          <Link to="/" className="flex items-center gap-2 text-indigo-700 font-extrabold text-2xl">
            <BookOpen size={28} aria-hidden="true" />
            Saral Shiksha
          </Link>
          <p className="text-gray-500 text-sm">Create your free account</p>
        </div>

        {/* ── Signup form ──────────────────────────────────────── */}
        <form
          onSubmit={handleSubmit}
          noValidate
          aria-label="Student sign-up form"
          className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 flex flex-col gap-5"
        >
          {formErr && (
            <div role="alert" className="flex items-start gap-2 bg-red-50 border border-red-200 text-red-700 rounded-xl px-4 py-3 text-sm">
              <span className="font-bold mt-0.5">✕</span>
              <span>{formErr}</span>
            </div>
          )}

          <FormInput
            id="signup-name"
            label="Full Name"
            type="text"
            value={name}
            onChange={e => setName(e.target.value)}
            error={errors.name}
            autoComplete="name"
            placeholder="Aarav Kumar"
          />

          <FormInput
            id="signup-email"
            label="Email"
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            error={errors.email}
            autoComplete="email"
            placeholder="you@example.com"
          />

          {/* Password with show/hide */}
          <div className="flex flex-col gap-1.5">
            <label htmlFor="signup-password" className="text-sm font-semibold text-gray-700">
              Password <span className="text-red-500" aria-hidden="true">*</span>
            </label>
            <div className="relative">
              <input
                id="signup-password"
                type={showPw ? 'text' : 'password'}
                value={password}
                onChange={e => setPassword(e.target.value)}
                autoComplete="new-password"
                placeholder="Min. 6 characters"
                required
                aria-invalid={!!errors.password}
                aria-describedby={errors.password ? 'signup-password-error' : 'signup-password-hint'}
                className={`w-full px-4 py-3 pr-12 rounded-xl border text-sm text-gray-900 bg-white
                  placeholder:text-gray-400 transition-colors
                  focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent
                  ${errors.password ? 'border-red-400 bg-red-50' : 'border-gray-200 hover:border-indigo-300'}`}
              />
              <button
                type="button"
                onClick={() => setShowPw(p => !p)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 rounded"
                aria-label={showPw ? 'Hide password' : 'Show password'}
              >
                {showPw ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
            {errors.password ? (
              <p id="signup-password-error" role="alert" className="flex items-center gap-1.5 text-xs text-red-600 font-medium">
                ⚠ {errors.password}
              </p>
            ) : (
              <p id="signup-password-hint" className="text-xs text-gray-400">Minimum 6 characters.</p>
            )}
          </div>

          <button
            type="submit"
            disabled={loading}
            className="flex items-center justify-center gap-2 w-full bg-indigo-600 hover:bg-indigo-700
                       disabled:opacity-60 text-white font-semibold rounded-xl py-3.5 text-sm
                       transition-all active:scale-[0.98]
                       focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          >
            {loading ? (
              <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" aria-hidden="true" />
            ) : (
              <UserPlus size={17} aria-hidden="true" />
            )}
            {loading ? 'Creating account…' : 'Create Account'}
          </button>
        </form>

        {/* Quick demo shortcut */}
        <p className="text-center text-sm text-gray-500">
          Just exploring?{' '}
          <Link to="/login" className="text-indigo-600 font-semibold hover:underline">
            Try the Demo Student login
          </Link>
        </p>

        <p className="text-center text-sm text-gray-500">
          Already have an account?{' '}
          <Link to="/login" className="text-indigo-600 font-semibold hover:underline">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  )
}
