// src/components/SimpleLanguageToggle.jsx
import { Languages } from 'lucide-react'
import { useAccessibility } from '../context/AccessibilityContext'

/**
 * SimpleLanguageToggle — Phase 6 & Phase 13/14 polish
 *
 * Renders one of two content versions depending on the simpleLanguage mode.
 * Supports both controlled mode (for per-session overrides) and uncontrolled mode
 * (reading directly from AccessibilityContext).
 *
 * Props:
 *  normalContent – ReactNode — full/normal version
 *  simpleContent – ReactNode — simplified version
 *  showToggle    – boolean (default: true) — show the inline toggle button
 *  isSimple      – optional boolean override
 *  onToggle      – optional toggle callback
 */
export default function SimpleLanguageToggle({
  normalContent,
  simpleContent,
  showToggle = true,
  isSimple: controlledIsSimple,
  onToggle: controlledOnToggle,
}) {
  const { settings, toggleSetting } = useAccessibility()

  const isSimple =
    controlledIsSimple !== undefined ? controlledIsSimple : settings.simpleLanguage
  const handleToggle = controlledOnToggle || (() => toggleSetting('simpleLanguage'))

  return (
    <div className="flex flex-col gap-2">
      {/* Inline toggle pill */}
      {showToggle && (
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={handleToggle}
            aria-pressed={isSimple}
            className={`inline-flex items-center gap-1.5 text-xs font-semibold rounded-full
              px-3.5 py-1.5 transition-all focus:outline-none focus:ring-2 focus:ring-purple-500 active:scale-95
              ${
                isSimple
                  ? 'bg-purple-100 text-purple-800 border border-purple-300 hover:bg-purple-200'
                  : 'bg-gray-100 text-gray-700 border border-gray-200 hover:bg-gray-200'
              }`}
          >
            <Languages size={13} aria-hidden="true" />
            {isSimple ? 'Simple Language: Active' : 'Switch to Simple Language'}
          </button>
        </div>
      )}

      {/* Content — swaps instantly */}
      <div>{isSimple ? simpleContent : normalContent}</div>
    </div>
  )
}
