// src/components/Navbar.jsx
import { NavLink } from 'react-router-dom'
import { BookOpen, LayoutDashboard, TrendingUp, GraduationCap, Home, Settings } from 'lucide-react'

const navLinks = [
  { to: '/',           label: 'Home',      Icon: Home },
  { to: '/dashboard',  label: 'Dashboard', Icon: LayoutDashboard },
  { to: '/courses',    label: 'Courses',   Icon: BookOpen },
  { to: '/progress',   label: 'Progress',  Icon: TrendingUp },
  { to: '/teacher/dashboard', label: 'Teacher', Icon: GraduationCap },
]

const activeClass = 'text-indigo-600 border-b-2 border-indigo-600'
const baseClass   = 'flex items-center gap-1.5 pb-1 text-sm font-medium text-gray-600 hover:text-indigo-600 transition-colors'

export default function Navbar() {
  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 flex items-center justify-between h-14">

        {/* Brand */}
        <NavLink to="/" className="flex items-center gap-2 font-bold text-indigo-700 text-lg">
          <BookOpen size={22} />
          <span>Saral Shiksha</span>
        </NavLink>

        {/* Nav links */}
        <nav className="flex items-center gap-6">
          {navLinks.map(({ to, label, Icon }) => (
            <NavLink
              key={to}
              to={to}
              end={to === '/'}
              className={({ isActive }) =>
                `${baseClass} ${isActive ? activeClass : ''}`
              }
            >
              <Icon size={16} />
              <span className="hidden sm:inline">{label}</span>
            </NavLink>
          ))}
        </nav>

        {/* Accessibility shortcut */}
        <NavLink
          to="/accessibility"
          className={({ isActive }) =>
            `${baseClass} ${isActive ? activeClass : ''}`
          }
          title="Accessibility Settings"
        >
          <Settings size={18} />
          <span className="hidden sm:inline text-xs">Accessibility</span>
        </NavLink>
      </div>
    </header>
  )
}
