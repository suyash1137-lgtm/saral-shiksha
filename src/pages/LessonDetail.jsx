// src/pages/LessonDetail.jsx
import { useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import {
  ArrowLeft,
  ArrowRight,
  BookOpen,
  CheckCircle,
  Code2,
  Lightbulb,
  ChevronRight,
  Clock,
  AlertTriangle
} from 'lucide-react'
import { useAccessibility } from '../context/AccessibilityContext'
import { getLessonById } from '../data/lessons'
import ReadAloudButton from '../components/ReadAloudButton'
import SimpleLanguageToggle from '../components/SimpleLanguageToggle'
import TranscriptPanel from '../components/TranscriptPanel'
import AccessibilityToolbar from '../components/AccessibilityToolbar'
import AIAssistant from '../components/AIAssistant'

// ─── Code block ───────────────────────────────────────────────────
function CodeBlock({ code, caption, language }) {
  return (
    <div className="rounded-2xl overflow-hidden border border-gray-200 shadow-sm">
      {/* Header bar */}
      <div className="flex items-center gap-2 bg-gray-800 px-4 py-2.5">
        <div className="flex gap-1.5" aria-hidden="true">
          {['bg-red-400', 'bg-amber-400', 'bg-green-400'].map((c) => (
            <span key={c} className={`w-3 h-3 rounded-full ${c}`} />
          ))}
        </div>
        <span className="text-gray-400 text-xs font-mono ml-2">{language}</span>
      </div>
      {/* Code */}
      <pre className="bg-gray-900 text-green-300 px-5 py-4 text-sm font-mono leading-relaxed overflow-x-auto whitespace-pre">
        <code>{code}</code>
      </pre>
      {caption && (
        <p className="bg-gray-50 border-t border-gray-200 px-4 py-2 text-xs text-gray-500 italic">
          {caption}
        </p>
      )}
    </div>
  )
}

// ─── key point item ───────────────────────────────────────────────
function KeyPoint({ text }) {
  return (
    <li className="flex items-start gap-3 bg-indigo-50/80 dark:bg-indigo-950/40 border border-indigo-100 dark:border-indigo-900/60 rounded-xl px-4 py-3">
      <CheckCircle size={18} className="text-indigo-600 dark:text-indigo-400 flex-shrink-0 mt-0.5" aria-hidden="true" />
      <span className="text-sm text-gray-800 dark:text-gray-200 leading-relaxed font-medium">{text}</span>
    </li>
  )
}

// ─── section wrapper ──────────────────────────────────────────────
function LessonSection({ icon: Icon, title, iconColor = 'text-indigo-600 dark:text-indigo-400', children }) {
  return (
    <section className="flex flex-col gap-3">
      <div className="flex items-center gap-2">
        <Icon size={18} className={`flex-shrink-0 ${iconColor}`} aria-hidden="true" />
        <h2 className="font-bold text-gray-900 dark:text-gray-50 text-base">{title}</h2>
      </div>
      {children}
    </section>
  )
}

// ─── page root ────────────────────────────────────────────────────
export default function LessonDetail() {
  const { id } = useParams()
  const { settings } = useAccessibility()

  const lesson = getLessonById(id)

  // Local override state for simple language toggle (defaults to global setting)
  const [localSimple, setLocalSimple] = useState(null)
  const isSimpleMode = localSimple !== null ? localSimple : settings.simpleLanguage

  // Friendly 404 handler for invalid lesson IDs
  if (!lesson) {
    return (
      <div className="max-w-2xl mx-auto py-16 px-4 flex flex-col items-center text-center gap-5">
        <div className="w-16 h-16 rounded-full bg-amber-100 text-amber-600 flex items-center justify-center shadow-sm">
          <AlertTriangle size={32} aria-hidden="true" />
        </div>
        <div className="flex flex-col gap-2">
          <span className="text-xs font-bold uppercase tracking-wider text-amber-800 bg-amber-50 px-3 py-1 rounded-full border border-amber-200 mx-auto">
            Not Found
          </span>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900">Lesson Not Found</h1>
          <p className="text-gray-600 text-sm max-w-md leading-relaxed">
            The lesson ID "<strong>{id}</strong>" does not match any current modules. You can browse
            all available curriculum modules in our course catalog.
          </p>
        </div>
        <Link
          to="/courses"
          className="inline-flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-sm px-6 py-3 rounded-xl transition-all shadow-sm active:scale-95"
        >
          <ArrowLeft size={16} /> Back to Course Catalog
        </Link>
      </div>
    )
  }

  // The text the ReadAloudButton will speak — changes with language mode
  const explanationText = isSimpleMode
    ? lesson.simpleExplanation
    : lesson.normalExplanation

  // Full narration text for auto-play (intro + explanation + key points)
  const fullNarration = [
    lesson.title,
    lesson.introduction,
    explanationText,
    'Key points:',
    ...lesson.keyPoints,
  ].join('. ')

  // AI context for the assistant
  const aiContext = {
    lessonTitle: lesson.title,
    lessonTopic: lesson.courseTitle?.split(' ')[0]?.toLowerCase() ?? 'programming',
    courseTitle: lesson.courseTitle,
  }

  return (
    <>
      <div className="max-w-3xl mx-auto flex flex-col gap-7 pb-24">
        {/* Breadcrumb nav */}
        <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-sm text-gray-500 dark:text-gray-400">
          <Link to="/dashboard" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
            Dashboard
          </Link>
          <ChevronRight size={14} aria-hidden="true" />
          <Link to="/courses" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
            {lesson.courseTitle}
          </Link>
          <ChevronRight size={14} aria-hidden="true" />
          <span className="text-gray-800 dark:text-gray-200 font-medium truncate">{lesson.title}</span>
        </nav>

        {/* Accessibility Toolbar */}
        <AccessibilityToolbar />

        {/* Lesson header */}
        <header className="flex flex-col gap-3">
          {/* Course + lesson meta */}
          <div className="flex flex-wrap items-center gap-2 text-xs text-gray-500 dark:text-gray-400">
            <span className="bg-indigo-100 dark:bg-indigo-950/80 text-indigo-700 dark:text-indigo-300 font-semibold px-2.5 py-0.5 rounded-full">
              {lesson.courseTitle}
            </span>
            <span>
              Lesson {lesson.lessonNumber} of {lesson.totalLessons}
            </span>
            <span className="flex items-center gap-1">
              <Clock size={12} aria-hidden="true" />
              {lesson.duration}
            </span>
            {lesson.completed && (
              <span className="flex items-center gap-1 text-emerald-600 dark:text-emerald-400 font-medium">
                <CheckCircle size={12} aria-hidden="true" />
                Completed
              </span>
            )}
          </div>

          {/* Title */}
          <h1
            className={`font-extrabold text-gray-900 dark:text-gray-50 leading-tight ${
              settings.fontSize === 'large' ? 'text-3xl sm:text-4xl' : 'text-2xl sm:text-3xl'
            }`}
          >
            {lesson.title}
          </h1>

          {/* Intro */}
          <p
            className={`text-gray-600 dark:text-gray-300 leading-relaxed ${
              settings.fontSize === 'large' ? 'text-lg' : 'text-base'
            }`}
          >
            {lesson.introduction}
          </p>

          {/* Read aloud for full lesson */}
          <div className="flex items-center gap-2 flex-wrap pt-1">
            <ReadAloudButton text={fullNarration} label="Read entire lesson aloud" autoPlay />
            <span className="text-xs text-gray-400 dark:text-gray-500">
              {settings.readAloud
                ? 'Auto-reading active (Read Aloud enabled)'
                : 'Click to hear this full lesson read aloud'}
            </span>
          </div>
        </header>

        {/* Explanation (with Simple Language toggle) */}
        <LessonSection icon={BookOpen} title="Explanation">
          <SimpleLanguageToggle
            showToggle
            isSimple={isSimpleMode}
            onToggle={() => setLocalSimple(!isSimpleMode)}
            normalContent={
              <p
                className={`text-gray-700 dark:text-gray-200 leading-relaxed bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-2xl px-5 py-4 shadow-sm ${
                  settings.fontSize === 'large' ? 'text-lg' : 'text-base'
                }`}
              >
                {lesson.normalExplanation}
              </p>
            }
            simpleContent={
              <div
                className={`bg-purple-50/80 dark:bg-purple-950/40 border-2 border-purple-200 dark:border-purple-800 rounded-2xl px-5 py-4 flex flex-col gap-2 shadow-sm ${
                  settings.fontSize === 'large' ? 'text-lg' : 'text-base'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-purple-700 dark:text-purple-300 uppercase tracking-wider bg-purple-100 dark:bg-purple-900/60 px-2.5 py-0.5 rounded">
                    Simple Language Mode Active
                  </span>
                  <span className="text-xs text-purple-600 dark:text-purple-300 font-medium">Adapted for Cognitive Clarity</span>
                </div>
                <p className="text-gray-900 dark:text-gray-100 font-medium leading-relaxed">{lesson.simpleExplanation}</p>
              </div>
            }
          />

          {/* Per-explanation read aloud */}
          <div className="mt-1">
            <ReadAloudButton text={explanationText} label="Read this explanation aloud" />
          </div>
        </LessonSection>

        {/* Example */}
        <LessonSection icon={Code2} title="Example" iconColor="text-emerald-600">
          <CodeBlock
            code={lesson.example.code}
            caption={lesson.example.caption}
            language={lesson.example.language}
          />
        </LessonSection>

        {/* Key Points */}
        <LessonSection icon={Lightbulb} title="Key Points" iconColor="text-amber-600">
          <ul className="flex flex-col gap-2.5" aria-label="Key points">
            {lesson.keyPoints.map((point, i) => (
              <KeyPoint key={i} text={point} />
            ))}
          </ul>
        </LessonSection>

        {/* Transcript / Captions panel */}
        <TranscriptPanel
          transcript={lesson.transcript}
          title="Lesson Transcript & Captions"
          captions={settings.captions}
        />

        {/* Quiz CTA */}
        <div className="bg-gradient-to-r from-amber-50 to-yellow-50 dark:from-amber-950/30 dark:to-yellow-950/20 border-2 border-amber-200 dark:border-amber-800/80 rounded-2xl p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-sm">
          <div className="flex-1">
            <p className="text-xs font-bold text-amber-800 dark:text-amber-300 uppercase tracking-widest mb-1">
              Ready to verify what you learned?
            </p>
            <h3 className="font-extrabold text-gray-900 dark:text-gray-50 text-lg">Take the Lesson Quiz</h3>
            <p className="text-sm text-gray-600 dark:text-gray-300 mt-0.5">
              {lesson.courseTitle} · Practice concepts & record your score to your profile.
            </p>
          </div>
          <Link
            to={`/quiz/${lesson.quizId}`}
            className="flex items-center gap-2 bg-amber-500 hover:bg-amber-600 text-white font-bold text-sm rounded-xl px-6 py-3 transition-colors active:scale-[0.98] flex-shrink-0 shadow-sm focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2"
          >
            Take the Quiz
            <ArrowRight size={16} aria-hidden="true" />
          </Link>
        </div>

        {/* Lesson navigation */}
        <div className="flex items-center justify-between gap-4 pt-4 border-t border-gray-100 dark:border-gray-800">
          {lesson.prevLessonId ? (
            <Link
              to={`/lesson/${lesson.prevLessonId}`}
              className="flex items-center gap-2 text-sm font-semibold text-indigo-600 dark:text-indigo-400 hover:text-indigo-800 dark:hover:text-indigo-300 transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500 rounded"
            >
              <ArrowLeft size={15} aria-hidden="true" />
              Previous Lesson
            </Link>
          ) : (
            <Link
              to="/courses"
              className="flex items-center gap-2 text-sm font-semibold text-indigo-600 dark:text-indigo-400 hover:text-indigo-800 dark:hover:text-indigo-300 transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500 rounded"
            >
              <ArrowLeft size={15} aria-hidden="true" />
              Back to Courses
            </Link>
          )}

          {lesson.nextLessonId && (
            <Link
              to={`/lesson/${lesson.nextLessonId}`}
              className="flex items-center gap-2 text-sm font-semibold text-white bg-indigo-600 hover:bg-indigo-700 rounded-xl px-5 py-2.5 transition-colors active:scale-[0.98] focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-1 shadow-sm"
            >
              Next Lesson
              <ArrowRight size={15} aria-hidden="true" />
            </Link>
          )}
        </div>
      </div>

      {/* AI Assistant floating button + panel */}
      <AIAssistant context={aiContext} />
    </>
  )
}
