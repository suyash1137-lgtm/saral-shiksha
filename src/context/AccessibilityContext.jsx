// src/context/AccessibilityContext.jsx
import { createContext, useContext, useState, useEffect } from 'react'

const defaultSettings = {
  fontSize: 'normal',      // 'normal' | 'large'
  highContrast: false,
  readAloud: false,
  captions: false,
  simpleLanguage: false,
  reducedMotion: false,
}

const STORAGE_KEY = 'saralshiksha_accessibility'

const AccessibilityContext = createContext(null)

export function AccessibilityProvider({ children }) {
  const [settings, setSettings] = useState(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY)
      return stored ? { ...defaultSettings, ...JSON.parse(stored) } : defaultSettings
    } catch {
      return defaultSettings
    }
  })

  // Persist to localStorage on every change
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(settings))
  }, [settings])

  // Apply high-contrast class to <html> for global styling hooks
  useEffect(() => {
    document.documentElement.classList.toggle('high-contrast', settings.highContrast)
    document.documentElement.classList.toggle('reduced-motion', settings.reducedMotion)
    document.documentElement.classList.toggle('large-text', settings.fontSize === 'large')
  }, [settings.highContrast, settings.reducedMotion, settings.fontSize])

  function updateSetting(key, value) {
    setSettings(prev => ({ ...prev, [key]: value }))
  }

  function toggleSetting(key) {
    setSettings(prev => ({ ...prev, [key]: !prev[key] }))
  }

  function resetSettings() {
    setSettings(defaultSettings)
  }

  return (
    <AccessibilityContext.Provider value={{ settings, updateSetting, toggleSetting, resetSettings }}>
      {children}
    </AccessibilityContext.Provider>
  )
}

// eslint-disable-next-line react-refresh/only-export-components
export function useAccessibility() {
  const ctx = useContext(AccessibilityContext)
  if (!ctx) throw new Error('useAccessibility must be used inside AccessibilityProvider')
  return ctx
}

export default AccessibilityContext
