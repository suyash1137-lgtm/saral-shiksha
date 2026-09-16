// src/components/landing/HeroSection.jsx
import { Link } from 'react-router-dom'
import { BookOpen, ArrowRight, Sparkles } from 'lucide-react'
import { useAccessibility } from '../../context/AccessibilityContext'

export default function HeroSection() {
  const { settings } = useAccessibility()

  return (
    <section
      aria-label="Hero"
      className={`relative overflow-hidden bg-gradient-to-br from-indigo-50 via-white to-emerald-50 ${
        settings.highContrast ? 'bg-white' : ''
      }`}
    >
      {/* Soft background blobs — hidden with reduced motion */}
      {!settings.reducedMotion && (
        <div aria-hidden="true" className="pointer-events-none absolute inset-0">
          <div className="absolute -top-24 -left-24 w-96 h-96 rounded-full bg-indigo-100 opacity-40 blur-3xl" />
          <div className="absolute bottom-0 right-0 w-80 h-80 rounded-full bg-emerald-100 opacity-40 blur-3xl" />
        </div>
      )}

      <div className="relative container mx-auto px-4 py-24 sm:py-32 flex flex-col items-center text-center gap-8">
        {/* Brand badge */}
        <div className="flex items-center gap-2 bg-white border border-indigo-100 shadow-sm rounded-full px-4 py-1.5 text-sm font-medium text-indigo-700">
          <Sparkles size={14} />
          Inclusive EdTech Platform
        </div>

        {/* Logo + Name */}
        <div className="flex items-center gap-4 text-indigo-700">
          <BookOpen size={52} strokeWidth={1.8} aria-hidden="true" />
          <h1
            className={`font-extrabold tracking-tight text-gray-900 ${
              settings.fontSize === 'large' ? 'text-5xl sm:text-7xl' : 'text-5xl sm:text-6xl'
            }`}
          >
            Saral Shiksha
          </h1>
        </div>

        {/* Tagline */}
        <p
          className={`font-semibold text-indigo-600 italic ${
            settings.fontSize === 'large' ? 'text-2xl sm:text-3xl' : 'text-xl sm:text-2xl'
          }`}
        >
          "Learning that adapts to every student."
        </p>

        {/* Supporting text */}
        <p
          className={`max-w-xl text-gray-600 leading-relaxed ${
            settings.fontSize === 'large' ? 'text-lg sm:text-xl' : 'text-base sm:text-lg'
          }`}
        >
          An accessible, personalized learning platform that adapts lessons according to every
          student's learning and accessibility needs — so no student is ever left behind.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-wrap gap-4 justify-center mt-2">
          <Link
            to="/accessibility"
            className={`inline-flex items-center gap-2 bg-indigo-600 text-white font-semibold rounded-xl px-7 py-3.5 hover:bg-indigo-700 active:scale-95 transition-all shadow-md shadow-indigo-200 ${
              settings.fontSize === 'large' ? 'text-lg' : 'text-base'
            }`}
          >
            Start Learning
            <ArrowRight size={18} />
          </Link>
          <Link
            to="/dashboard"
            className={`inline-flex items-center gap-2 bg-white text-indigo-700 border-2 border-indigo-200 font-semibold rounded-xl px-7 py-3.5 hover:bg-indigo-50 hover:border-indigo-400 active:scale-95 transition-all ${
              settings.fontSize === 'large' ? 'text-lg' : 'text-base'
            }`}
          >
            Explore Platform
          </Link>
        </div>

        {/* Social proof pill */}
        <div className="flex flex-wrap gap-6 justify-center pt-6 border-t border-gray-100 w-full max-w-lg">
          {[
            { value: '3', label: 'Accessibility Modes' },
            { value: '100%', label: 'Free to Use' },
            { value: 'All', label: 'Learning Styles' },
          ].map(({ value, label }) => (
            <div key={label} className="flex flex-col items-center gap-0.5">
              <span className="text-2xl font-extrabold text-indigo-700">{value}</span>
              <span className="text-xs text-gray-400 font-medium">{label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
