// src/components/landing/LandingFooter.jsx
import { Link } from 'react-router-dom'
import { BookOpen, Github, Twitter, Mail } from 'lucide-react'

const navGroups = [
  {
    label: 'Platform',
    links: [
      { to: '/', label: 'Home' },
      { to: '/dashboard', label: 'Dashboard' },
      { to: '/courses', label: 'Courses' },
      { to: '/progress', label: 'Progress' },
    ],
  },
  {
    label: 'Teachers',
    links: [
      { to: '/teacher/dashboard', label: 'Teacher Dashboard' },
      { to: '/teacher/course/create', label: 'Create Course' },
      { to: '/teacher/students', label: 'My Students' },
    ],
  },
  {
    label: 'Account',
    links: [
      { to: '/login', label: 'Log In' },
      { to: '/signup', label: 'Sign Up' },
      { to: '/accessibility', label: 'Accessibility Settings' },
    ],
  },
]

export default function LandingFooter() {
  return (
    <footer className="bg-gray-900 text-gray-300 pt-16 pb-8 px-4" role="contentinfo">
      <div className="container mx-auto max-w-6xl flex flex-col gap-12">
        {/* Top row */}
        <div className="flex flex-col md:flex-row gap-10 md:gap-0 justify-between">
          {/* Brand */}
          <div className="flex flex-col gap-4 max-w-xs">
            <Link to="/" className="flex items-center gap-2 text-white font-bold text-lg">
              <BookOpen size={24} aria-hidden="true" />
              Saral Shiksha
            </Link>
            <p className="text-sm text-gray-400 leading-relaxed">
              An accessible, personalised learning platform built for every student — regardless of their needs.
            </p>
            {/* Social icons */}
            <div className="flex gap-4 mt-2">
              {[
                { Icon: Github, href: '#', label: 'GitHub' },
                { Icon: Twitter, href: '#', label: 'Twitter' },
                { Icon: Mail, href: '#', label: 'Contact' },
              ].map(({ Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="text-gray-500 hover:text-white transition-colors"
                >
                  <Icon size={18} />
                </a>
              ))}
            </div>
          </div>

          {/* Nav groups */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-8">
            {navGroups.map(({ label, links }) => (
              <div key={label} className="flex flex-col gap-3">
                <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-widest">
                  {label}
                </h3>
                <ul className="flex flex-col gap-2">
                  {links.map(({ to, label: linkLabel }) => (
                    <li key={to}>
                      <Link
                        to={to}
                        className="text-sm text-gray-400 hover:text-white transition-colors"
                      >
                        {linkLabel}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-2 pt-8 border-t border-gray-800 text-xs text-gray-500">
          <p>© {new Date().getFullYear()} Saral Shiksha. Built for Hack2Ignite.</p>
          <p>Committed to WCAG 2.1 AA accessibility standards.</p>
        </div>
      </div>
    </footer>
  )
}
