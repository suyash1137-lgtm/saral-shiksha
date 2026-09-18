// src/components/Navbar.jsx
import { NavLink, useNavigate } from 'react-router-dom'
import {
  BookOpen, LayoutDashboard, TrendingUp,
  GraduationCap, Home, Settings, LogOut, User
} from 'lucide-react'
import { useAuth } from '../context/AuthContext'
import ThemeToggle from './ThemeToggle'

const navLinks = [
  { to: '/',                  label: 'Home',      Icon: Home },
  { to: '/dashboard',         label: 'Dashboard', Icon: LayoutDashboard },
  { to: '/courses',           label: 'Courses',   Icon: BookOpen },
  { to: '/progress',          label: 'Progress',  Icon: TrendingUp },
  { to: '/teacher/dashboard', label: 'Teacher',   Icon: GraduationCap },
]

const activeClass = 'text-indigo-600 dark:text-indigo-400 border-b-2 border-indigo-600 dark:border-indigo-400 font-semibold'
const baseClass   = 'flex items-center gap-1.5 pb-1 text-sm font-medium text-gray-600 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors'

export default function Navbar() {
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  function handleLogout() {
    logout()
    navigate('/')
  }

  return (
    <header className="bg-white dark:bg-gray-900 border-b border-gray-200/80 dark:border-gray-800 shadow-sm sticky top-0 z-50 transition-colors">
      <div className="container mx-auto px-4 flex items-center justify-between h-14">

        {/* Brand */}
        <NavLink to="/" className="flex items-center gap-2 font-bold text-indigo-700 dark:text-indigo-400 text-lg">
          <BookOpen size={22} />
          <span>Saral Shiksha</span>
        </NavLink>

        {/* Nav links */}
        <nav className="flex items-center gap-3 sm:gap-6" aria-label="Main navigation">
          {navLinks.map(({ to, label, Icon }) => (
            <NavLink
              key={to}
              to={to}
              end={to === '/'}
              aria-label={label}
              className={({ isActive }) =>
                `${baseClass} ${isActive ? activeClass : ''}`
              }
            >
              <Icon size={16} aria-hidden="true" />
              <span className="hidden sm:inline">{label}</span>
            </NavLink>
          ))}
        </nav>

        {/* Right side — theme toggle + accessibility + auth */}
        <div className="flex items-center gap-2.5 sm:gap-3">
          {/* Theme Toggle (Light / Dark) */}
          <ThemeToggle />

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
                className="hidden sm:flex items-center gap-1.5 text-xs font-medium text-gray-700 dark:text-gray-200 bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-full px-3 py-1"
                aria-label={`Logged in as ${user.name}`}
              >
                {user.avatar ? (
                  <img src={user.avatar} alt="" className="w-4 h-4 rounded-full object-cover" />
                ) : (
                  <User size={13} aria-hidden="true" />
                )}
                <span className="truncate max-w-[110px]">{user.name}</span>
              </span>
              <button
                onClick={handleLogout}
                title="Log out"
                className="flex items-center gap-1 text-xs text-gray-500 dark:text-gray-400 hover:text-red-500 dark:hover:text-red-400 transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500 rounded p-1"
                aria-label="Log out"
              >
                <LogOut size={15} aria-hidden="true" />
                <span className="hidden sm:inline">Log out</span>
              </button>
            </div>
          ) : (
            <NavLink
              to="/login"
              className="text-xs font-semibold bg-indigo-600 hover:bg-indigo-700 text-white px-3.5 py-1.5 rounded-lg shadow-sm transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              Log In
            </NavLink>
          )}
        </div>
      </div>
    </header>
  )
}
