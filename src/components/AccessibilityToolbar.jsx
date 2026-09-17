// src/components/AccessibilityToolbar.jsx
import { useState } from 'react'
import {
  Settings2, Type, Contrast, Volume2, Minus, ChevronDown, ChevronUp
} from 'lucide-react'
import { useAccessibility } from '../context/AccessibilityContext'

/**
 * AccessibilityToolbar — Phase 6
 *
 * A compact, collapsible floating toolbar providing quick toggles for
 * the four most-used accessibility settings:
 *   • Font size (normal ↔ large)
 *   • High Contrast
 *   • Read Aloud
 *   • Reduced Motion
 *
 * All writes go directly to AccessibilityContext — zero local state for settings.
 *
 * Props:
 *  className – extra wrapper classes (e.g. to override position)
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
      activeColor: 'bg-indigo-100 text-indigo-700 border-indigo-200',
    },
    {
      key: 'highContrast',
      label: 'High Contrast',
      Icon: Contrast,
      isActive: settings.highContrast,
      onToggle: () => toggleSetting('highContrast'),
      activeColor: 'bg-gray-900 text-white border-gray-700',
    },
    {
      key: 'readAloud',
      label: 'Read Aloud',
      Icon: Volume2,
      isActive: settings.readAloud,
      onToggle: () => toggleSetting('readAloud'),
      activeColor: 'bg-emerald-100 text-emerald-700 border-emerald-200',
    },
    {
      key: 'reducedMotion',
      label: 'Reduce Motion',
      Icon: Minus,
      isActive: settings.reducedMotion,
      onToggle: () => toggleSetting('reducedMotion'),
      activeColor: 'bg-amber-100 text-amber-700 border-amber-200',
    },
  ]

  return (
    <div className={`bg-white border border-gray-200 rounded-2xl shadow-sm overflow-hidden ${className}`}>
      {/* Header / toggle button */}
      <button
        type="button"
        onClick={() => setOpen(o => !o)}
        aria-expanded={open}
        aria-controls="a11y-toolbar-content"
        className="w-full flex items-center justify-between gap-2 px-4 py-3
          hover:bg-gray-50 transition-colors text-left
          focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
      >
        <div className="flex items-center gap-2 text-sm font-semibold text-gray-700">
          <Settings2 size={16} aria-hidden="true" className="text-indigo-500" />
          Accessibility Toolbar
        </div>
        <div className="flex items-center gap-2">
          {/* Active count badge */}
          {toggles.filter(t => t.isActive).length > 0 && (
            <span className="text-xs font-bold bg-indigo-100 text-indigo-700 rounded-full px-2 py-0.5">
              {toggles.filter(t => t.isActive).length} on
            </span>
          )}
          {open
            ? <ChevronUp size={15} className="text-gray-400" aria-hidden="true" />
            : <ChevronDown size={15} className="text-gray-400" aria-hidden="true" />
          }
        </div>
      </button>

      {/* Toggle grid */}
      {open && (
        <div
          id="a11y-toolbar-content"
          className="px-4 pb-4 pt-1 grid grid-cols-2 sm:grid-cols-4 gap-2 border-t border-gray-100"
        >
          {toggles.map(({ key, label, Icon, isActive, onToggle, activeColor }) => (
            <button
              key={key}
              type="button"
              onClick={onToggle}
              aria-pressed={isActive}
              className={`flex flex-col items-center gap-1.5 rounded-xl border px-3 py-3
                text-xs font-medium transition-all
                focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-1
                active:scale-95
                ${isActive
                  ? activeColor
                  : 'bg-gray-50 text-gray-500 border-gray-200 hover:bg-gray-100'
                }`}
            >
              <Icon size={18} aria-hidden="true" />
              <span>{label}</span>
              <span className="sr-only">{isActive ? '(on)' : '(off)'}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
