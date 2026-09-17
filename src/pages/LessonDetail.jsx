// src/pages/LessonDetail.jsx
import { useParams, Link } from 'react-router-dom'
import {
  ArrowLeft, ArrowRight, BookOpen, CheckCircle,
  Code2, Lightbulb, ChevronRight, Clock,
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
    <div className="rounded-2xl overflow-hidden border border-gray-200">
      {/* Header bar */}
      <div className="flex items-center gap-2 bg-gray-800 px-4 py-2.5">
        <div className="flex gap-1.5" aria-hidden="true">
          {['bg-red-400', 'bg-amber-400', 'bg-green-400'].map(c => (
            <span key={c} className={`w-3 h-3 rounded-full ${c}`} />
          ))}
        </div>
        <span className="text-gray-400 text-xs font-mono ml-2">{language}</span>
      </div>
      {/* Code */}
      <pre className="bg-gray-900 text-green-300 px-5 py-4 text-sm font-mono
        leading-relaxed overflow-x-auto whitespace-pre">
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
    <li className="flex items-start gap-3 bg-indigo-50 border border-indigo-100 rounded-xl px-4 py-3">
      <CheckCircle size={18} className="text-indigo-500 flex-shrink-0 mt-0.5" aria-hidden="true" />
      <span className="text-sm text-gray-800 leading-relaxed">{text}</span>
    </li>
  )
}

// ─── section wrapper ──────────────────────────────────────────────
function LessonSection({ icon: Icon, title, iconColor = 'text-indigo-500', children }) {
  return (
    <section className="flex flex-col gap-3">
      <div className="flex items-center gap-2">
        <Icon size={18} className={`flex-shrink-0 ${iconColor}`} aria-hidden="true" />
        <h2 className="font-bold text-gray-900 text-base">{title}</h2>
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

  // The text the ReadAloudButton will speak — changes with language mode
  const explanationText = settings.simpleLanguage
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

        {/* ── Breadcrumb nav ── */}
        <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-sm text-gray-400">
          <Link to="/dashboard" className="hover:text-indigo-600 transition-colors">Dashboard</Link>
          <ChevronRight size={14} aria-hidden="true" />
          <Link to="/courses" className="hover:text-indigo-600 transition-colors">{lesson.courseTitle}</Link>
          <ChevronRight size={14} aria-hidden="true" />
          <span className="text-gray-700 font-medium truncate">{lesson.title}</span>
        </nav>

        {/* ── Accessibility Toolbar ── */}
        <AccessibilityToolbar />

        {/* ── Lesson header ── */}
        <header className="flex flex-col gap-3">
          {/* Course + lesson meta */}
          <div className="flex flex-wrap items-center gap-2 text-xs text-gray-500">
            <span className="bg-indigo-100 text-indigo-700 font-semibold px-2.5 py-0.5 rounded-full">
              {lesson.courseTitle}
            </span>
            <span>Lesson {lesson.lessonNumber} of {lesson.totalLessons}</span>
            <span className="flex items-center gap-1">
              <Clock size={12} aria-hidden="true" />
              {lesson.duration}
            </span>
            {lesson.completed && (
              <span className="flex items-center gap-1 text-emerald-600 font-medium">
                <CheckCircle size={12} aria-hidden="true" />
                Completed
              </span>
            )}
          </div>

          {/* Title */}
          <h1 className={`font-extrabold text-gray-900 leading-tight
            ${settings.fontSize === 'large' ? 'text-3xl sm:text-4xl' : 'text-2xl sm:text-3xl'}`}>
            {lesson.title}
          </h1>

          {/* Intro */}
          <p className={`text-gray-600 leading-relaxed
            ${settings.fontSize === 'large' ? 'text-lg' : 'text-base'}`}>
            {lesson.introduction}
          </p>

          {/* Read aloud for full lesson */}
          <div className="flex items-center gap-2 flex-wrap">
            <ReadAloudButton
              text={fullNarration}
              label="Read entire lesson aloud"
              autoPlay
            />
            <span className="text-xs text-gray-400">
              {settings.readAloud
                ? 'Auto-reading because Read Aloud is on'
                : 'Click to hear this lesson read aloud'}
            </span>
          </div>
        </header>

        {/* ── Explanation (with Simple Language toggle) ── */}
        <LessonSection icon={BookOpen} title="Explanation">
          <SimpleLanguageToggle
            showToggle
            normalContent={
              <p className={`text-gray-700 leading-relaxed bg-white border border-gray-100
                rounded-2xl px-5 py-4
                ${settings.fontSize === 'large' ? 'text-lg' : 'text-base'}`}>
                {lesson.normalExplanation}
              </p>
            }
            simpleContent={
              <div className={`bg-purple-50 border border-purple-200 rounded-2xl px-5 py-4 flex flex-col gap-2
                ${settings.fontSize === 'large' ? 'text-lg' : 'text-base'}`}>
                <span className="text-xs font-semibold text-purple-600 uppercase tracking-widest">
                  Simple Language Mode
                </span>
                <p className="text-gray-800 leading-relaxed">{lesson.simpleExplanation}</p>
              </div>
            }
          />

          {/* Per-explanation read aloud */}
          <div className="mt-1">
            <ReadAloudButton text={explanationText} label="Read this explanation aloud" />
          </div>
        </LessonSection>

        {/* ── Example ── */}
        <LessonSection icon={Code2} title="Example" iconColor="text-emerald-500">
          <CodeBlock
            code={lesson.example.code}
            caption={lesson.example.caption}
            language={lesson.example.language}
          />
        </LessonSection>

        {/* ── Key Points ── */}
        <LessonSection icon={Lightbulb} title="Key Points" iconColor="text-amber-500">
          <ul className="flex flex-col gap-2" aria-label="Key points">
            {lesson.keyPoints.map((point, i) => (
              <KeyPoint key={i} text={point} />
            ))}
          </ul>
        </LessonSection>

        {/* ── Transcript / Captions panel ── */}
        <TranscriptPanel
          transcript={lesson.transcript}
          title="Lesson Transcript"
          captions={settings.captions}
        />

        {/* ── Quiz CTA ── */}
        <div className="bg-gradient-to-r from-amber-50 to-yellow-50 border border-amber-200
          rounded-2xl p-6 flex flex-col sm:flex-row items-start sm:items-center gap-4">
          <div className="flex-1">
            <p className="text-xs font-semibold text-amber-700 uppercase tracking-widest mb-1">
              Ready to test your knowledge?
            </p>
            <h3 className="font-bold text-gray-900 text-lg">Take the Lesson Quiz</h3>
            <p className="text-sm text-gray-500 mt-0.5">
              {lesson.courseTitle} · 10 questions · ~5 minutes
            </p>
          </div>
          <Link
            to={`/quiz/${lesson.quizId}`}
            className="flex items-center gap-2 bg-amber-500 hover:bg-amber-600
              text-white font-bold text-sm rounded-xl px-6 py-3
              transition-colors active:scale-[0.98] flex-shrink-0
              focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2"
          >
            Take the Quiz
            <ArrowRight size={16} aria-hidden="true" />
          </Link>
        </div>

        {/* ── Lesson navigation ── */}
        <div className="flex items-center justify-between gap-4 pt-2 border-t border-gray-100">
          {lesson.prevLessonId ? (
            <Link
              to={`/lesson/${lesson.prevLessonId}`}
              className="flex items-center gap-2 text-sm font-semibold text-indigo-600
                hover:text-indigo-800 transition-colors
                focus:outline-none focus:ring-2 focus:ring-indigo-500 rounded"
            >
              <ArrowLeft size={15} aria-hidden="true" />
              Previous Lesson
            </Link>
          ) : (
            <Link
              to="/courses"
              className="flex items-center gap-2 text-sm font-semibold text-indigo-600
                hover:text-indigo-800 transition-colors
                focus:outline-none focus:ring-2 focus:ring-indigo-500 rounded"
            >
              <ArrowLeft size={15} aria-hidden="true" />
              Back to Courses
            </Link>
          )}

          {lesson.nextLessonId && (
            <Link
              to={`/lesson/${lesson.nextLessonId}`}
              className="flex items-center gap-2 text-sm font-semibold text-white
                bg-indigo-600 hover:bg-indigo-700 rounded-xl px-5 py-2.5
                transition-colors active:scale-[0.98]
                focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-1"
            >
              Next Lesson
              <ArrowRight size={15} aria-hidden="true" />
            </Link>
          )}
        </div>

      </div>

      {/* ── AI Assistant floating button + panel ── */}
      <AIAssistant context={aiContext} />
    </>
  )
}
