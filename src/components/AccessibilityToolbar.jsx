// src/components/AccessibilityToolbar.jsx
import { useState } from 'react'
import {
  Settings2,
  Type,
  Contrast,
  Volume2,
  Minus,
  Brain,
  Ear,
  ChevronDown,
  ChevronUp
} from 'lucide-react'
import { useAccessibility } from '../context/AccessibilityContext'

/**
 * AccessibilityToolbar — Phase 6 & Phase 14 polish
 *
 * A compact, collapsible floating toolbar providing quick toggles for
 * all core accessibility accommodations:
 *   • Font size (normal ↔ large)
 *   • High Contrast
 *   • Read Aloud
 *   • Simple Language (Cognitive Mode)
 *   • Captions / Transcripts
 *   • Reduced Motion
 *
 * All writes go directly to AccessibilityContext — synchronized across the entire app.
 */
export default function AccessibilityToolbar({ className = '' }) {
  const { settings, toggleSetting, updateSetting } = useAccessibility()
  const [open, setOpen] = useState(false)

  const toggles = [
    {
      key: 'fontSize',
      label: 'Large Text',
      Icon: Type,
      isActive: settings.fontSize === 'large',
      onToggle: () =>
        updateSetting('fontSize', settings.fontSize === 'large' ? 'normal' : 'large'),
      activeColor: 'bg-indigo-100 text-indigo-700 border-indigo-300 ring-1 ring-indigo-200',
    },
    {
      key: 'highContrast',
      label: 'High Contrast',
      Icon: Contrast,
      isActive: settings.highContrast,
      onToggle: () => toggleSetting('highContrast'),
      activeColor: 'bg-gray-900 text-white border-gray-700 ring-1 ring-gray-600',
    },
    {
      key: 'readAloud',
      label: 'Read Aloud',
      Icon: Volume2,
      isActive: settings.readAloud,
      onToggle: () => toggleSetting('readAloud'),
      activeColor: 'bg-blue-100 text-blue-700 border-blue-300 ring-1 ring-blue-200',
    },
    {
      key: 'simpleLanguage',
      label: 'Simple Language',
      Icon: Brain,
      isActive: settings.simpleLanguage,
      onToggle: () => toggleSetting('simpleLanguage'),
      activeColor: 'bg-purple-100 text-purple-700 border-purple-300 ring-1 ring-purple-200',
    },
    {
      key: 'captions',
      label: 'Captions',
      Icon: Ear,
      isActive: settings.captions,
      onToggle: () => toggleSetting('captions'),
      activeColor: 'bg-emerald-100 text-emerald-700 border-emerald-300 ring-1 ring-emerald-200',
    },
    {
      key: 'reducedMotion',
      label: 'Reduce Motion',
      Icon: Minus,
      isActive: settings.reducedMotion,
      onToggle: () => toggleSetting('reducedMotion'),
      activeColor: 'bg-amber-100 text-amber-700 border-amber-300 ring-1 ring-amber-200',
    },
  ]

  const activeCount = toggles.filter((t) => t.isActive).length

  return (
    <div className={`bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl shadow-sm overflow-hidden transition-colors ${className}`}>
      {/* Header / toggle button */}
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        aria-controls="a11y-toolbar-content"
        className="w-full flex items-center justify-between gap-2 px-4 py-3
          hover:bg-gray-50 dark:hover:bg-gray-800/60 transition-colors text-left
          focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
      >
        <div className="flex items-center gap-2 text-sm font-semibold text-gray-700 dark:text-gray-200">
          <Settings2 size={16} aria-hidden="true" className="text-indigo-600 dark:text-indigo-400" />
          Accessibility Quick Controls
        </div>
        <div className="flex items-center gap-2">
          {activeCount > 0 && (
            <span className="text-xs font-bold bg-indigo-100 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-300 rounded-full px-2.5 py-0.5">
              {activeCount} active
            </span>
          )}
          {open ? (
            <ChevronUp size={15} className="text-gray-400 dark:text-gray-500" aria-hidden="true" />
          ) : (
            <ChevronDown size={15} className="text-gray-400 dark:text-gray-500" aria-hidden="true" />
          )}
        </div>
      </button>

      {/* Toggle grid */}
      {open && (
        <div
          id="a11y-toolbar-content"
          className="px-4 pb-4 pt-1 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2 border-t border-gray-100 dark:border-gray-800"
        >
          {toggles.map(({ key, label, Icon, isActive, onToggle, activeColor }) => (
            <button
              key={key}
              type="button"
              onClick={onToggle}
              aria-pressed={isActive}
              className={`flex flex-col items-center justify-center text-center gap-1.5 rounded-xl border p-3
                text-xs font-medium transition-all
                focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-1
                active:scale-95
                ${
                  isActive
                    ? activeColor
                    : 'bg-gray-50 dark:bg-gray-800/80 text-gray-600 dark:text-gray-300 border-gray-200 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-700'
                }`}
            >
              <Icon size={18} aria-hidden="true" />
              <span className="leading-tight">{label}</span>
              <span className="sr-only">{isActive ? '(enabled)' : '(disabled)'}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
