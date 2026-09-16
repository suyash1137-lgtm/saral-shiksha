// src/pages/Accessibility.jsx
import { useAccessibility } from '../context/AccessibilityContext'

const Toggle = ({ label, description, value, onToggle }) => (
  <div className="flex items-start justify-between py-4 border-b border-gray-100 last:border-0">
    <div className="flex-1 pr-4">
      <p className="font-medium text-gray-800">{label}</p>
      {description && <p className="text-sm text-gray-500 mt-0.5">{description}</p>}
    </div>
    <button
      role="switch"
      aria-checked={value}
      onClick={onToggle}
      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 ${value ? 'bg-indigo-600' : 'bg-gray-200'}`}
    >
      <span className={`inline-block h-4 w-4 transform rounded-full bg-white shadow transition-transform ${value ? 'translate-x-6' : 'translate-x-1'}`} />
    </button>
  </div>
)

export default function Accessibility() {
  const { settings, toggleSetting, updateSetting, resetSettings } = useAccessibility()

  return (
    <div className="max-w-lg mx-auto">
      <h1 className="text-2xl font-bold text-indigo-700 mb-1">Accessibility Settings</h1>
      <p className="text-sm text-gray-500 mb-6">Your preferences are saved automatically.</p>

      <div className="bg-white rounded-2xl shadow p-6 space-y-1">

        {/* Font Size */}
        <div className="flex items-start justify-between py-4 border-b border-gray-100">
          <div>
            <p className="font-medium text-gray-800">Font Size</p>
            <p className="text-sm text-gray-500">Increase text size for easier reading.</p>
          </div>
          <div className="flex gap-2">
            {['normal', 'large'].map(size => (
              <button
                key={size}
                onClick={() => updateSetting('fontSize', size)}
                className={`px-3 py-1 rounded-lg text-sm font-medium border transition-colors ${
                  settings.fontSize === size
                    ? 'bg-indigo-600 text-white border-indigo-600'
                    : 'bg-white text-gray-600 border-gray-300 hover:border-indigo-400'
                }`}
              >
                {size.charAt(0).toUpperCase() + size.slice(1)}
              </button>
            ))}
          </div>
        </div>

        <Toggle
          label="High Contrast"
          description="Use high contrast colours for better visibility."
          value={settings.highContrast}
          onToggle={() => toggleSetting('highContrast')}
        />
        <Toggle
          label="Read Aloud"
          description="Text-to-speech for lesson content."
          value={settings.readAloud}
          onToggle={() => toggleSetting('readAloud')}
        />
        <Toggle
          label="Captions"
          description="Show captions on all video and audio content."
          value={settings.captions}
          onToggle={() => toggleSetting('captions')}
        />
        <Toggle
          label="Simple Language"
          description="Rewrite complex instructions in plain language."
          value={settings.simpleLanguage}
          onToggle={() => toggleSetting('simpleLanguage')}
        />
        <Toggle
          label="Reduced Motion"
          description="Minimise animations and transitions."
          value={settings.reducedMotion}
          onToggle={() => toggleSetting('reducedMotion')}
        />
      </div>

      <button
        onClick={resetSettings}
        className="mt-4 text-sm text-gray-400 hover:text-red-500 transition-colors underline"
      >
        Reset to defaults
      </button>

      <p className="text-xs text-gray-400 mt-6 font-mono text-center">Route: /accessibility</p>
    </div>
  )
}
