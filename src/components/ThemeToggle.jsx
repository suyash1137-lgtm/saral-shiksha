// src/components/ThemeToggle.jsx
import { Sun, Moon } from 'lucide-react'
import { useTheme } from '../context/ThemeContext'
import { useAccessibility } from '../context/AccessibilityContext'

/**
 * ThemeToggle — Phase 6.1
 * A switch-style toggle button showing sun/moon state.
 * Respects AccessibilityContext.reducedMotion for instant transition.
 */
export default function ThemeToggle() {
  const { theme, toggleTheme, isDark } = useTheme()
  const { settings } = useAccessibility()
  const instant = settings?.reducedMotion

  return (
    <button
      type="button"
      role="switch"
      aria-checked={isDark}
      aria-label={isDark ? 'Switch to light theme' : 'Switch to dark theme'}
      title={isDark ? 'Switch to light theme' : 'Switch to dark theme'}
      onClick={toggleTheme}
      className={`relative inline-flex h-8 w-14 items-center rounded-full p-1 border transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 ${
        instant ? 'transition-none' : 'duration-200'
      } ${
        isDark
          ? 'bg-indigo-950 border-indigo-700 text-indigo-200 focus:ring-offset-gray-900'
          : 'bg-indigo-50 border-indigo-200 text-indigo-700 focus:ring-offset-white'
      }`}
    >
      {/* Background Icons (Sun on left, Moon on right) */}
      <span className="sr-only">{isDark ? 'Dark mode enabled' : 'Light mode enabled'}</span>
      <div className="absolute inset-0 flex items-center justify-between px-1.5 pointer-events-none text-xs">
        <Sun size={13} className={isDark ? 'text-gray-500 opacity-60' : 'text-amber-500'} />
        <Moon size={13} className={isDark ? 'text-indigo-300' : 'text-gray-400 opacity-60'} />
      </div>

      {/* Sliding Knob */}
      <span
        className={`inline-flex h-6 w-6 transform items-center justify-center rounded-full bg-white shadow-md transition-transform ${
          instant ? 'transition-none' : 'duration-200 ease-in-out'
        } ${isDark ? 'translate-x-6 bg-indigo-600 text-white' : 'translate-x-0 bg-white text-amber-500'}`}
      >
        {isDark ? (
          <Moon size={13} className="text-white" aria-hidden="true" />
        ) : (
          <Sun size={13} className="text-amber-500" aria-hidden="true" />
        )}
      </span>
    </button>
  )
}
