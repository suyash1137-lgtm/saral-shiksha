// src/components/Navbar.jsx
import { NavLink, useNavigate } from 'react-router-dom'
import {
  BookOpen, LayoutDashboard, TrendingUp,
  GraduationCap, Home, Settings, LogOut, User
} from 'lucide-react'
import { useAuth } from '../context/AuthContext'

const navLinks = [
  { to: '/',                  label: 'Home',      Icon: Home },
  { to: '/dashboard',         label: 'Dashboard', Icon: LayoutDashboard },
  { to: '/courses',           label: 'Courses',   Icon: BookOpen },
  { to: '/progress',          label: 'Progress',  Icon: TrendingUp },
  { to: '/teacher/dashboard', label: 'Teacher',   Icon: GraduationCap },
]

const activeClass = 'text-indigo-600 border-b-2 border-indigo-600'
const baseClass   = 'flex items-center gap-1.5 pb-1 text-sm font-medium text-gray-600 hover:text-indigo-600 transition-colors'

export default function Navbar() {
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  function handleLogout() {
    logout()
    navigate('/')
  }

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 flex items-center justify-between h-14">

        {/* Brand */}
        <NavLink to="/" className="flex items-center gap-2 font-bold text-indigo-700 text-lg">
          <BookOpen size={22} />
          <span>Saral Shiksha</span>
        </NavLink>

        {/* Nav links */}
        <nav className="flex items-center gap-6" aria-label="Main navigation">
          {navLinks.map(({ to, label, Icon }) => (
            <NavLink
              key={to}
              to={to}
              end={to === '/'}
              className={({ isActive }) =>
                `${baseClass} ${isActive ? activeClass : ''}`
              }
            >
              <Icon size={16} aria-hidden="true" />
              <span className="hidden sm:inline">{label}</span>
            </NavLink>
          ))}
        </nav>

        {/* Right side — accessibility + auth */}
        <div className="flex items-center gap-3">
          <NavLink
            to="/accessibility"
            className={({ isActive }) =>
              `${baseClass} ${isActive ? activeClass : ''}`
            }
            title="Accessibility Settings"
          >
            <Settings size={18} aria-hidden="true" />
            <span className="hidden sm:inline text-xs">Accessibility</span>
          </NavLink>

          {user ? (
            <div className="flex items-center gap-2">
              {/* User badge */}
              <span
                className="hidden sm:flex items-center gap-1.5 text-xs font-medium text-gray-600 bg-gray-100 rounded-full px-3 py-1"
                aria-label={`Logged in as ${user.name}`}
              >
                <User size={13} aria-hidden="true" />
                {user.name}
              </span>
              <button
                onClick={handleLogout}
                title="Log out"
                className="flex items-center gap-1 text-xs text-gray-500 hover:text-red-500 transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500 rounded"
                aria-label="Log out"
              >
                <LogOut size={15} aria-hidden="true" />
                <span className="hidden sm:inline">Log out</span>
              </button>
            </div>
          ) : (
            <NavLink
              to="/login"
              className="text-xs font-semibold bg-indigo-600 text-white px-3 py-1.5 rounded-lg hover:bg-indigo-700 transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              Log In
            </NavLink>
          )}
        </div>
      </div>
    </header>
  )
}
