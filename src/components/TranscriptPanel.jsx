// src/components/TranscriptPanel.jsx
import { useState } from 'react'
import { ChevronDown, ChevronUp, FileText } from 'lucide-react'

/**
 * TranscriptPanel — Phase 6
 *
 * A collapsible panel that shows a text transcript for audio/video content.
 * Used alongside video or audio lessons for hearing accessibility.
 *
 * Props:
 *  transcript – string | null — the transcript text to display
 *  title      – optional panel heading (default: "Transcript")
 *  defaultOpen – boolean, whether to start expanded (default: false)
 *  captions   – boolean from AccessibilityContext — if true, auto-opens on mount
 */
export default function TranscriptPanel({
  transcript,
  title = 'Transcript',
  defaultOpen = false,
  captions = false,
}) {
  const [open, setOpen] = useState(defaultOpen || captions)

  if (!transcript) return null

  return (
    <div className="border border-gray-200 dark:border-gray-800 rounded-2xl overflow-hidden bg-white dark:bg-gray-900 transition-colors">
      {/* Toggle header */}
      <button
        type="button"
        onClick={() => setOpen(o => !o)}
        aria-expanded={open}
        className="w-full flex items-center justify-between gap-3 px-5 py-3.5
          bg-gray-50 dark:bg-gray-800/60 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors text-left
          focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
      >
        <div className="flex items-center gap-2 text-sm font-semibold text-gray-700 dark:text-gray-200">
          <FileText size={16} aria-hidden="true" className="text-indigo-500 dark:text-indigo-400" />
          {title}
        </div>
        {open
          ? <ChevronUp size={16} className="text-gray-400 dark:text-gray-500" aria-hidden="true" />
          : <ChevronDown size={16} className="text-gray-400 dark:text-gray-500" aria-hidden="true" />
        }
      </button>

      {/* Content */}
      {open && (
        <div
          role="region"
          aria-label={title}
          className="px-5 py-4 text-sm text-gray-700 dark:text-gray-300 leading-relaxed border-t border-gray-100 dark:border-gray-800
            max-h-64 overflow-y-auto whitespace-pre-wrap"
        >
          {transcript}
        </div>
      )}
    </div>
  )
}
