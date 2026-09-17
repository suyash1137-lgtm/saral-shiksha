// src/components/SimpleLanguageToggle.jsx
import { Languages } from 'lucide-react'
import { useAccessibility } from '../context/AccessibilityContext'

/**
 * SimpleLanguageToggle — Phase 6
 *
 * Renders one of two content versions depending on the simpleLanguage
 * accessibility setting. If the setting is on it shows `simpleContent`,
 * otherwise `normalContent`.
 *
 * Additionally renders a small pill button so the user can toggle
 * the mode inline without going back to the Accessibility Profile page.
 *
 * Props:
 *  normalContent – ReactNode — full/normal version
 *  simpleContent – ReactNode — simplified version
 *  showToggle    – boolean (default: true) — show the inline toggle button
 */
export default function SimpleLanguageToggle({
  normalContent,
  simpleContent,
  showToggle = true,
}) {
  const { settings, toggleSetting } = useAccessibility()
  const isSimple = settings.simpleLanguage

  return (
    <div className="flex flex-col gap-2">
      {/* Inline toggle pill */}
      {showToggle && (
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => toggleSetting('simpleLanguage')}
            aria-pressed={isSimple}
            className={`inline-flex items-center gap-1.5 text-xs font-medium rounded-full
              px-3 py-1 transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500
              ${isSimple
                ? 'bg-purple-100 text-purple-700 hover:bg-purple-200'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
          >
            <Languages size={12} aria-hidden="true" />
            {isSimple ? 'Simple Language: ON' : 'Simple Language: OFF'}
          </button>
        </div>
      )}

      {/* Content — swaps instantly */}
      <div>
        {isSimple ? simpleContent : normalContent}
      </div>
    </div>
  )
}
