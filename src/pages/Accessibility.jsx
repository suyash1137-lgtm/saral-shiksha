// src/pages/Accessibility.jsx
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  Eye, Ear, Brain, Zap, CheckSquare,
  Save, ArrowRight, RotateCcw,
} from 'lucide-react'
import { useAccessibility } from '../context/AccessibilityContext'

/**
 * Accessibility Profile — Phase 4
 *
 * Each option maps to the existing AccessibilityContext shape (Phase 1).
 * Toggling any checkbox here instantly reskins the whole app.
 *
 * Options without a context key (transcripts, visualExplanations, shortSections,
 * stepByStep, voiceNavigation) are saved to a separate localStorage key
 * ('saralshiksha_extra_prefs') so Phase 5+ can read them without touching
 * the Phase 1 context shape.
 */

const EXTRA_KEY = 'saralshiksha_extra_prefs'
function loadExtra() {
  try { return JSON.parse(localStorage.getItem(EXTRA_KEY) || '{}') } catch { return {} }
}
function saveExtra(obj) {
  localStorage.setItem(EXTRA_KEY, JSON.stringify(obj))
}

// ─── group & option definitions ──────────────────────────────────
const GROUPS = [
  {
    id: 'visual',
    label: 'Visual Support',
    Icon: Eye,
    color: 'text-blue-600',
    bg: 'bg-blue-50',
    border: 'border-blue-200',
    desc: 'For students with low vision or visual processing difficulties.',
    options: [
      {
        id: 'largerText',
        label: 'Larger Text',
        hint: 'Makes all text bigger across the entire platform.',
        contextKey: 'fontSize',
        isFont: true,       // special: toggles fontSize 'large' ↔ 'normal'
      },
      {
        id: 'highContrast',
        label: 'High Contrast',
        hint: 'Increases contrast ratios for better readability.',
        contextKey: 'highContrast',
      },
      {
        id: 'readAloud',
        label: 'Read Aloud',
        hint: 'Text-to-speech narration for all lesson content.',
        contextKey: 'readAloud',
      },
    ],
  },
  {
    id: 'hearing',
    label: 'Hearing Support',
    Icon: Ear,
    color: 'text-emerald-600',
    bg: 'bg-emerald-50',
    border: 'border-emerald-200',
    desc: 'For Deaf and hard-of-hearing learners.',
    options: [
      {
        id: 'captions',
        label: 'Captions',
        hint: 'Live captions displayed on all video and audio content.',
        contextKey: 'captions',
      },
      {
        id: 'transcripts',
        label: 'Text Transcripts',
        hint: 'Full written transcripts available for every lesson.',
        extraKey: 'transcripts',
      },
      {
        id: 'visualExplanations',
        label: 'Visual Explanations',
        hint: 'Diagrams and visuals accompany or replace audio descriptions.',
        extraKey: 'visualExplanations',
      },
    ],
  },
  {
    id: 'cognitive',
    label: 'Cognitive Support',
    Icon: Brain,
    color: 'text-purple-600',
    bg: 'bg-purple-50',
    border: 'border-purple-200',
    desc: 'For students with learning differences or cognitive accessibility needs.',
    options: [
      {
        id: 'simpleLanguage',
        label: 'Simple Language',
        hint: 'Complex instructions rewritten in plain, clear language.',
        contextKey: 'simpleLanguage',
      },
      {
        id: 'shortSections',
        label: 'Short Sections',
        hint: 'Content split into bite-sized chunks — no information overload.',
        extraKey: 'shortSections',
      },
      {
        id: 'stepByStep',
        label: 'Step-by-Step Guidance',
        hint: 'Instructions broken into numbered steps with clear progress.',
        extraKey: 'stepByStep',
      },
    ],
  },
  {
    id: 'other',
    label: 'Other',
    Icon: Zap,
    color: 'text-amber-600',
    bg: 'bg-amber-50',
    border: 'border-amber-200',
    desc: 'Additional comfort and interaction preferences.',
    options: [
      {
        id: 'reducedMotion',
        label: 'Reduced Motion',
        hint: 'Minimises all animations and transitions across the platform.',
        contextKey: 'reducedMotion',
      },
      {
        id: 'voiceNavigation',
        label: 'Voice Navigation',
        hint: 'Optimised layouts for voice control and switch access software.',
        extraKey: 'voiceNavigation',
      },
    ],
  },
]

// ─── single option row ───────────────────────────────────────────
function OptionCheckbox({ option, contextValue, extraValue, onContextChange, onExtraChange }) {
  const checked = option.contextKey
    ? (option.isFont ? contextValue === 'large' : Boolean(contextValue))
    : Boolean(extraValue)

  function toggle() {
    if (option.contextKey) {
      onContextChange(option)
    } else {
      onExtraChange(option.extraKey)
    }
  }

  const checkboxId = `pref-${option.id}`

  return (
    <label
      htmlFor={checkboxId}
      className={`flex items-start gap-4 p-4 rounded-xl border cursor-pointer transition-all select-none
        ${checked
          ? 'bg-white border-indigo-300 ring-2 ring-indigo-200 shadow-sm'
          : 'bg-white border-gray-200 hover:border-indigo-200 hover:shadow-sm'
        }`}
    >
      {/* Hidden native checkbox for a11y */}
      <input
        id={checkboxId}
        type="checkbox"
        checked={checked}
        onChange={toggle}
        className="sr-only"
        aria-describedby={`${checkboxId}-hint`}
      />

      {/* Custom checkbox visual — big touch target, not color-only */}
      <div
        aria-hidden="true"
        className={`w-6 h-6 flex-shrink-0 rounded-md border-2 flex items-center justify-center
          transition-colors mt-0.5
          ${checked ? 'bg-indigo-600 border-indigo-600' : 'bg-white border-gray-300'}`}
      >
        {checked && <CheckSquare size={14} className="text-white" strokeWidth={3} />}
      </div>

      {/* Labels */}
      <div className="flex-1">
        <span className={`block font-semibold text-sm ${checked ? 'text-indigo-800' : 'text-gray-800'}`}>
          {option.label}
        </span>
        <span id={`${checkboxId}-hint`} className="block text-xs text-gray-500 mt-0.5 leading-relaxed">
          {option.hint}
        </span>
      </div>
    </label>
  )
}

// ─── group card ──────────────────────────────────────────────────
function GroupCard({ group, settings, extra, onContextChange, onExtraChange }) {
  const { Icon, label, desc, color, bg, border, options } = group

  return (
    <section
      aria-labelledby={`group-${group.id}`}
      className={`rounded-2xl border ${border} ${bg} p-6 flex flex-col gap-4`}
    >
      {/* Group heading */}
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center shadow-sm flex-shrink-0">
          <Icon size={20} className={color} aria-hidden="true" />
        </div>
        <div>
          <h2 id={`group-${group.id}`} className="font-bold text-gray-900 text-base">
            {label}
          </h2>
          <p className="text-xs text-gray-500">{desc}</p>
        </div>
      </div>

      {/* Options */}
      <div className="flex flex-col gap-2">
        {options.map(opt => (
          <OptionCheckbox
            key={opt.id}
            option={opt}
            contextValue={opt.contextKey ? settings[opt.contextKey] : undefined}
            extraValue={opt.extraKey ? extra[opt.extraKey] : false}
            onContextChange={onContextChange}
            onExtraChange={onExtraChange}
          />
        ))}
      </div>
    </section>
  )
}

// ─── page root ───────────────────────────────────────────────────
export default function AccessibilityProfile() {
  const { settings, updateSetting, toggleSetting, resetSettings } = useAccessibility()
  const navigate = useNavigate()

  const [extra, setExtra]   = useState(() => loadExtra())
  const [saved, setSaved]   = useState(false)

  // Handle options that map to AccessibilityContext
  function handleContextChange(option) {
    if (option.isFont) {
      updateSetting('fontSize', settings.fontSize === 'large' ? 'normal' : 'large')
    } else {
      toggleSetting(option.contextKey)
    }
  }

  // Handle options stored in separate localStorage key
  function handleExtraChange(extraKey) {
    setExtra(prev => {
      const next = { ...prev, [extraKey]: !prev[extraKey] }
      saveExtra(next)
      return next
    })
  }

  function handleSave() {
    // AccessibilityContext already auto-persists via its own useEffect.
    // extra already persisted inline on each toggle.
    setSaved(true)
    setTimeout(() => setSaved(false), 2500)
  }

  function handleContinue() {
    navigate('/dashboard')
  }

  function handleReset() {
    resetSettings()
    const cleared = {}
    saveExtra(cleared)
    setExtra(cleared)
  }

  return (
    <div className="max-w-2xl mx-auto py-4 px-2 sm:px-0">

      {/* Page header */}
      <header className="mb-8 text-center">
        <span className="inline-block bg-indigo-100 text-indigo-700 text-xs font-semibold tracking-widest uppercase px-3 py-1 rounded-full mb-3">
          Accessibility Profile
        </span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-3">
          How do you prefer to learn?
        </h1>
        <p className="text-gray-500 text-sm sm:text-base max-w-lg mx-auto leading-relaxed">
          Select the options that make learning easier for you. The platform adapts its interface
          and content to your choices <strong>immediately</strong> — and remembers them every visit.
        </p>
      </header>

      {/* Live indicator */}
      <div
        className="flex items-center justify-center gap-2 mb-6 text-xs text-indigo-600 font-medium
          bg-indigo-50 border border-indigo-100 rounded-full px-4 py-2 w-fit mx-auto"
        role="status"
        aria-live="polite"
      >
        <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" aria-hidden="true" />
        Changes apply live — watch the whole page update as you select
      </div>

      {/* Preference groups */}
      <div className="flex flex-col gap-5" role="main" aria-label="Accessibility preferences">
        {GROUPS.map(group => (
          <GroupCard
            key={group.id}
            group={group}
            settings={settings}
            extra={extra}
            onContextChange={handleContextChange}
            onExtraChange={handleExtraChange}
          />
        ))}
      </div>

      {/* Action buttons */}
      <div className="flex flex-wrap gap-3 mt-8 pb-4">
        <button
          onClick={handleSave}
          aria-live="polite"
          aria-label={saved ? 'Preferences saved' : 'Save preferences'}
          className={`flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-sm transition-all
            focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 active:scale-[0.98]
            ${saved
              ? 'bg-emerald-600 text-white'
              : 'bg-indigo-600 hover:bg-indigo-700 text-white'
            }`}
        >
          <Save size={16} aria-hidden="true" />
          {saved ? 'Saved ✓' : 'Save Preferences'}
        </button>

        <button
          onClick={handleContinue}
          className="flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-sm
            bg-white border-2 border-indigo-200 text-indigo-700
            hover:bg-indigo-50 hover:border-indigo-400 active:scale-[0.98] transition-all
            focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
        >
          Continue to Dashboard
          <ArrowRight size={16} aria-hidden="true" />
        </button>

        <button
          onClick={handleReset}
          className="flex items-center gap-2 px-4 py-3 rounded-xl text-sm text-gray-400
            hover:text-red-500 hover:bg-red-50 transition-colors
            focus:outline-none focus:ring-2 focus:ring-red-400 focus:ring-offset-2"
          aria-label="Reset all preferences to their defaults"
        >
          <RotateCcw size={14} aria-hidden="true" />
          Reset to defaults
        </button>
      </div>
    </div>
  )
}
