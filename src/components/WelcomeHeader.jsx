// src/components/WelcomeHeader.jsx
import { useState, useRef } from 'react'
import {
  Camera,
  Pencil,
  Check,
  X,
  Flame,
  User
} from 'lucide-react'
import { useAuth } from '../context/AuthContext'
import { useAccessibility } from '../context/AccessibilityContext'
import SimpleLanguageToggle from './SimpleLanguageToggle'
import ReadAloudButton from './ReadAloudButton'

/**
 * WelcomeHeader — Phase 6.1
 *
 * Displays:
 *  - Interactive avatar: displays uploaded image or letter badge; clicking opens file picker.
 *  - Greeting with student name from AuthContext and inline editable name input.
 *  - Subtitle with SimpleLanguageToggle.
 *  - Read Aloud button when enabled.
 *  - Day Streak badge.
 */
export default function WelcomeHeader() {
  const { user, updateUser } = useAuth()
  const { settings } = useAccessibility()
  const fileInputRef = useRef(null)

  const displayName = user?.name || 'Student'

  // Inline editing state
  const [isEditing, setIsEditing] = useState(false)
  const [nameVal, setNameVal] = useState(displayName)

  const handleStartEdit = () => {
    setNameVal(displayName)
    setIsEditing(true)
  }

  const handleSaveName = () => {
    const trimmed = nameVal.trim()
    if (trimmed && trimmed !== displayName) {
      updateUser({ name: trimmed })
    }
    setIsEditing(false)
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleSaveName()
    } else if (e.key === 'Escape') {
      setNameVal(displayName)
      setIsEditing(false)
    }
  }

  // Avatar file upload handler
  const handleAvatarClick = () => {
    fileInputRef.current?.click()
  }

  const handleFileChange = (e) => {
    const file = e.target.files?.[0]
    if (!file) return

    // Read as Base64 Data URL to persist in localStorage
    const reader = new FileReader()
    reader.onload = (event) => {
      const dataUrl = event.target?.result
      if (dataUrl) {
        updateUser({ avatar: dataUrl })
      }
    }
    reader.readAsDataURL(file)
  }

  const firstLetter = (displayName || 'S').trim().charAt(0).toUpperCase()

  const welcomeText = `Welcome back, ${displayName}. Here is an overview of your learning journey.`

  return (
    <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-5 bg-white dark:bg-gray-900 border border-gray-200/80 dark:border-gray-800 rounded-3xl p-6 shadow-sm transition-colors">
      {/* Left side: Avatar + Greeting */}
      <div className="flex items-start gap-4 flex-1 min-w-0">
        {/* Profile Avatar with upload overlay */}
        <div className="relative group flex-shrink-0">
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            accept="image/*"
            className="hidden"
            aria-label="Upload profile image"
          />

          <button
            type="button"
            onClick={handleAvatarClick}
            title="Click to change profile picture"
            aria-label="Click to upload profile photo"
            className="relative w-14 h-14 sm:w-16 sm:h-16 rounded-2xl overflow-hidden border-2 border-indigo-200 dark:border-indigo-700 shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-transform active:scale-95 group-hover:shadow-md"
          >
            {user?.avatar ? (
              <img
                src={user.avatar}
                alt={`${displayName}'s profile`}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full bg-gradient-to-tr from-indigo-600 to-purple-600 text-white flex items-center justify-center text-xl sm:text-2xl font-bold">
                {firstLetter}
              </div>
            )}

            {/* Hover overlay with Camera icon */}
            <div className="absolute inset-0 bg-black/40 backdrop-blur-[1px] opacity-0 group-hover:opacity-100 group-focus:opacity-100 transition-opacity flex flex-col items-center justify-center text-white">
              <Camera size={18} />
              <span className="text-[10px] font-medium leading-none mt-1">Edit</span>
            </div>
          </button>
        </div>

        {/* Greeting & Name */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            {isEditing ? (
              <div className="flex items-center gap-1.5 py-0.5">
                <input
                  type="text"
                  value={nameVal}
                  onChange={(e) => setNameVal(e.target.value)}
                  onKeyDown={handleKeyDown}
                  autoFocus
                  maxLength={40}
                  className="px-3 py-1 text-lg sm:text-2xl font-bold text-gray-900 dark:text-gray-100 bg-gray-50 dark:bg-gray-800 border border-indigo-400 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  placeholder="Your Name"
                  aria-label="Edit your name"
                />
                <button
                  type="button"
                  onClick={handleSaveName}
                  title="Save name"
                  aria-label="Save name"
                  className="p-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500"
                >
                  <Check size={16} />
                </button>
                <button
                  type="button"
                  onClick={() => setIsEditing(false)}
                  title="Cancel editing"
                  aria-label="Cancel editing"
                  className="p-2 rounded-xl bg-gray-100 dark:bg-gray-800 text-gray-500 hover:text-gray-800 dark:hover:text-gray-200 transition-colors focus:outline-none focus:ring-2 focus:ring-gray-400"
                >
                  <X size={16} />
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-2 flex-wrap">
                <h1
                  className={`font-extrabold text-gray-900 dark:text-gray-50 leading-tight ${
                    settings.fontSize === 'large'
                      ? 'text-3xl sm:text-4xl'
                      : 'text-2xl sm:text-3xl'
                  }`}
                >
                  Welcome back, {displayName} 👋
                </h1>
                <button
                  type="button"
                  onClick={handleStartEdit}
                  title="Edit your name"
                  aria-label="Edit your name"
                  className="p-1.5 text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500"
                >
                  <Pencil size={16} aria-hidden="true" />
                </button>
              </div>
            )}
          </div>

          {/* Subtitle with SimpleLanguageToggle */}
          <div className="mt-1">
            <SimpleLanguageToggle
              showToggle={false}
              normalContent={
                <p className="text-gray-600 dark:text-gray-300 text-sm sm:text-base leading-relaxed">
                  Here's an overview of your learning journey. Pick up where you left off or explore new courses.
                </p>
              }
              simpleContent={
                <p className="text-gray-600 dark:text-gray-300 text-sm sm:text-base leading-relaxed font-medium">
                  This is your dashboard. You can see your courses and how much you have learned.
                </p>
              }
            />
          </div>

          {/* Read Aloud Button */}
          {settings.readAloud && (
            <div className="mt-2.5">
              <ReadAloudButton text={welcomeText} label="Read welcome message aloud" />
            </div>
          )}
        </div>
      </div>

      {/* Right side: Day Streak badge */}
      <div className="flex items-center gap-2.5 bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800/80 rounded-2xl px-4 py-3 flex-shrink-0 self-start">
        <Flame size={24} className="text-amber-500 dark:text-amber-400" aria-hidden="true" />
        <div>
          <p className="text-xl font-extrabold text-amber-700 dark:text-amber-300 leading-none">5</p>
          <p className="text-xs text-amber-700 dark:text-amber-400 font-semibold mt-0.5">Day Streak 🔥</p>
        </div>
      </div>
    </div>
  )
}
