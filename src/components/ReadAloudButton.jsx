// src/components/ReadAloudButton.jsx
import { useState, useEffect, useCallback } from 'react'
import { Volume2, VolumeX, Square } from 'lucide-react'
import { useAccessibility } from '../context/AccessibilityContext'

/**
 * ReadAloudButton — Phase 6
 *
 * Reads `text` aloud using the browser Web Speech API (SpeechSynthesis).
 * If `autoPlay` is true and the readAloud accessibility setting is on,
 * it will start reading automatically when the component mounts or text changes.
 *
 * Props:
 *  text      – string to speak (required)
 *  label     – optional aria-label override
 *  compact   – if true, shows icon-only (no text label on button)
 *  autoPlay  – if true, speaks when readAloud setting is active
 *  className – extra class overrides
 */
export default function ReadAloudButton({
  text,
  label,
  compact = false,
  autoPlay = false,
  className = '',
}) {
  const { settings } = useAccessibility()
  const [speaking, setSpeaking] = useState(false)
  const [supported] = useState(() => typeof window !== 'undefined' && 'speechSynthesis' in window)

  // Cancel speech on unmount
  useEffect(() => {
    return () => {
      if (supported) window.speechSynthesis.cancel()
    }
  }, [supported])

  // Auto-play when setting is on and autoPlay prop is set
  useEffect(() => {
    if (autoPlay && settings.readAloud && text && supported) {
      speak()
    }
    // We intentionally exclude `speak` from deps to avoid recursion
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [settings.readAloud, autoPlay, text])

  const speak = useCallback(() => {
    if (!supported) return
    window.speechSynthesis.cancel()
    const utterance = new SpeechSynthesisUtterance(text)
    utterance.rate = 0.95
    utterance.pitch = 1
    utterance.onstart  = () => setSpeaking(true)
    utterance.onend    = () => setSpeaking(false)
    utterance.onerror  = () => setSpeaking(false)
    window.speechSynthesis.speak(utterance)
  }, [text, supported])

  const stop = useCallback(() => {
    if (!supported) return
    window.speechSynthesis.cancel()
    setSpeaking(false)
  }, [supported])

  if (!supported) return null

  const ariaLabel = speaking
    ? 'Stop reading aloud'
    : (label ?? 'Read this text aloud')

  return (
    <button
      type="button"
      onClick={speaking ? stop : speak}
      aria-label={ariaLabel}
      title={ariaLabel}
      className={`inline-flex items-center gap-1.5 text-xs font-medium rounded-lg px-3 py-1.5
        transition-all focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-1
        ${speaking
          ? 'bg-emerald-100 text-emerald-700 hover:bg-emerald-200'
          : 'bg-indigo-50 text-indigo-600 hover:bg-indigo-100'
        }
        ${className}`}
    >
      {speaking ? (
        <>
          <Square size={12} aria-hidden="true" className="fill-current" />
          {!compact && <span>Stop</span>}
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" aria-hidden="true" />
        </>
      ) : (
        <>
          <Volume2 size={13} aria-hidden="true" />
          {!compact && <span>Read Aloud</span>}
        </>
      )}
    </button>
  )
}
