// src/pages/Dashboard.jsx
import { Link } from 'react-router-dom'
import {
  BookOpen, TrendingUp, Flame, CheckCircle,
  ArrowRight, Clock, Star, BarChart2,
} from 'lucide-react'
import { useAuth } from '../context/AuthContext'
import { useAccessibility } from '../context/AccessibilityContext'
import courses from '../data/courses'
import ReadAloudButton from '../components/ReadAloudButton'
import AccessibilityToolbar from '../components/AccessibilityToolbar'
import SimpleLanguageToggle from '../components/SimpleLanguageToggle'

// ─── helpers ─────────────────────────────────────────────────────
const avgProgress = Math.round(
  courses.reduce((sum, c) => sum + c.progress, 0) / courses.length
)
const totalCompletedLessons = courses.reduce((sum, c) => sum + c.completedLessons, 0)

// Course with the best "continue learning" candidate (in progress, not complete)
const continueCoure = courses.find(c => c.progress > 0 && c.progress < 100) ?? courses[0]
const continueLesson = continueCoure.lessons.find(l => !l.completed) ?? continueCoure.lessons[0]

// color helpers per course
const colorMap = {
  indigo: {
    ring: 'border-indigo-200',
    bg: 'bg-indigo-50',
    icon: 'bg-indigo-100 text-indigo-600',
    bar: 'bg-indigo-500',
    badge: 'bg-indigo-100 text-indigo-700',
    btn: 'bg-indigo-600 hover:bg-indigo-700',
  },
  blue: {
    ring: 'border-blue-200',
    bg: 'bg-blue-50',
    icon: 'bg-blue-100 text-blue-600',
    bar: 'bg-blue-500',
    badge: 'bg-blue-100 text-blue-700',
    btn: 'bg-blue-600 hover:bg-blue-700',
  },
  purple: {
    ring: 'border-purple-200',
    bg: 'bg-purple-50',
    icon: 'bg-purple-100 text-purple-600',
    bar: 'bg-purple-500',
    badge: 'bg-purple-100 text-purple-700',
    btn: 'bg-purple-600 hover:bg-purple-700',
  },
}

const levelColor = {
  Beginner:     'bg-emerald-100 text-emerald-700',
  Intermediate: 'bg-amber-100 text-amber-700',
  Advanced:     'bg-red-100 text-red-700',
}

// ─── stat card ───────────────────────────────────────────────────
function StatCard({ Icon, label, value, sub, color = 'indigo' }) {
  const c = colorMap[color] ?? colorMap.indigo
  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 flex items-center gap-4">
      <div className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 ${c.icon}`}>
        <Icon size={22} aria-hidden="true" />
      </div>
      <div>
        <p className="text-2xl font-extrabold text-gray-900 leading-none">{value}</p>
        <p className="text-sm font-medium text-gray-600 mt-0.5">{label}</p>
        {sub && <p className="text-xs text-gray-400 mt-0.5">{sub}</p>}
      </div>
    </div>
  )
}

// ─── course card ─────────────────────────────────────────────────
function CourseCard({ course }) {
  const c = colorMap[course.color] ?? colorMap.indigo
  const nextLesson = course.lessons.find(l => !l.completed) ?? course.lessons[0]

  return (
    <div className={`bg-white rounded-2xl border ${c.ring} shadow-sm p-5 flex flex-col gap-4 hover:shadow-md transition-shadow`}>
      {/* Header */}
      <div className="flex items-start gap-3">
        <div className={`w-11 h-11 rounded-xl flex items-center justify-center text-xl flex-shrink-0 ${c.icon}`}>
          {course.icon}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2">
            <h3 className="font-bold text-gray-900 text-base leading-tight">{course.title}</h3>
            <span className={`text-xs px-2 py-0.5 rounded-full font-medium flex-shrink-0 ${levelColor[course.level] ?? 'bg-gray-100 text-gray-600'}`}>
              {course.level}
            </span>
          </div>
          <p className="text-xs text-gray-500 mt-0.5">{course.category} · {course.duration}</p>
        </div>
      </div>

      {/* Progress bar */}
      <div>
        <div className="flex justify-between items-center text-xs text-gray-500 mb-1.5">
          <span>{course.completedLessons} of {course.totalLessons} lessons</span>
          <span className="font-semibold text-gray-700">{course.progress}%</span>
        </div>
        <div className="w-full bg-gray-100 rounded-full h-3 overflow-hidden" role="progressbar"
          aria-valuenow={course.progress} aria-valuemin={0} aria-valuemax={100}
          aria-label={`${course.title} progress: ${course.progress}%`}>
          <div
            className={`h-3 rounded-full transition-all duration-500 ${c.bar}`}
            style={{ width: `${course.progress}%` }}
          />
        </div>
      </div>

      {/* Tags */}
      <div className="flex flex-wrap gap-1">
        {course.tags.slice(0, 3).map(tag => (
          <span key={tag} className={`text-xs px-2 py-0.5 rounded-md font-medium ${c.badge}`}>
            {tag}
          </span>
        ))}
      </div>

      {/* CTA */}
      <Link
        to={`/lesson/${nextLesson.id}`}
        className={`flex items-center justify-center gap-2 text-sm font-semibold text-white rounded-xl py-2.5
          transition-all active:scale-[0.98]
          focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500
          ${c.btn}`}
      >
        Continue Learning
        <ArrowRight size={15} aria-hidden="true" />
      </Link>
    </div>
  )
}

// ─── recommended lesson card ─────────────────────────────────────
function ContinueLearningCard({ course, lesson }) {
  return (
    <div className="bg-gradient-to-r from-indigo-600 to-indigo-700 rounded-2xl p-6 flex flex-col sm:flex-row gap-5 items-start sm:items-center">
      <div className="flex-1">
        <p className="text-indigo-200 text-xs font-semibold uppercase tracking-widest mb-1">
          Continue where you left off
        </p>
        <h3 className="text-white font-bold text-lg leading-snug">{lesson.title}</h3>
        <p className="text-indigo-200 text-sm mt-1">{course.title} · {lesson.duration}</p>

        {/* Progress context */}
        <div className="flex items-center gap-2 mt-3">
          <div className="flex-1 bg-indigo-500 rounded-full h-2 overflow-hidden max-w-[180px]"
            role="progressbar" aria-valuenow={course.progress} aria-valuemin={0} aria-valuemax={100}>
            <div className="h-2 bg-amber-400 rounded-full" style={{ width: `${course.progress}%` }} />
          </div>
          <span className="text-indigo-100 text-xs font-medium">{course.progress}% complete</span>
        </div>
      </div>

      <Link
        to={`/lesson/${lesson.id}`}
        className="inline-flex items-center gap-2 bg-white text-indigo-700 font-bold text-sm
          rounded-xl px-6 py-3 hover:bg-indigo-50 transition-colors flex-shrink-0
          focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-indigo-600"
      >
        Start Lesson
        <ArrowRight size={16} aria-hidden="true" />
      </Link>
    </div>
  )
}

// ─── page root ───────────────────────────────────────────────────
export default function Dashboard() {
  const { user } = useAuth()
  const { settings } = useAccessibility()

  const welcomeText = `Welcome back, ${user?.name ?? 'Student'}! You have ${totalCompletedLessons} lessons completed across ${courses.length} courses. Keep up the great work!`

  return (
    <div className="flex flex-col gap-8 max-w-5xl mx-auto">

      {/* ── Welcome header ── */}
      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
        <div>
          <h1 className={`font-extrabold text-gray-900 leading-tight ${settings.fontSize === 'large' ? 'text-3xl sm:text-4xl' : 'text-2xl sm:text-3xl'}`}>
            Welcome back, {user?.name ?? 'Student'} 👋
          </h1>
          <SimpleLanguageToggle
            showToggle={false}
            normalContent={
              <p className="text-gray-500 mt-1 text-sm sm:text-base">
                Here's an overview of your learning journey. Pick up where you left off or explore new courses.
              </p>
            }
            simpleContent={
              <p className="text-gray-500 mt-1 text-sm sm:text-base">
                This is your dashboard. You can see your courses and how much you have learned.
              </p>
            }
          />

          {/* Read Aloud demo — proves Phase 6 working on Dashboard */}
          {settings.readAloud && (
            <div className="mt-2">
              <ReadAloudButton text={welcomeText} label="Read welcome message aloud" />
            </div>
          )}
        </div>

        {/* Streak badge */}
        <div className="flex items-center gap-2 bg-amber-50 border border-amber-200 rounded-2xl px-4 py-3 flex-shrink-0 self-start">
          <Flame size={22} className="text-amber-500" aria-hidden="true" />
          <div>
            <p className="text-xl font-extrabold text-amber-700 leading-none">5</p>
            <p className="text-xs text-amber-600 font-medium">Day Streak 🔥</p>
          </div>
        </div>
      </div>

      {/* ── Accessibility Toolbar (Phase 6) ── */}
      <AccessibilityToolbar />

      {/* ── Stats row ── */}
      <section aria-labelledby="stats-heading">
        <h2 id="stats-heading" className="sr-only">Learning Statistics</h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <StatCard Icon={BookOpen}    label="Enrolled Courses"   value={courses.length}          color="indigo" />
          <StatCard Icon={CheckCircle} label="Lessons Completed"  value={totalCompletedLessons}   color="blue"   sub="across all courses" />
          <StatCard Icon={BarChart2}   label="Overall Progress"   value={`${avgProgress}%`}       color="purple" sub="average completion" />
          <StatCard Icon={Star}        label="Learning Streak"    value="5 days"                  color="indigo" sub="keep it going!" />
        </div>
      </section>

      {/* ── Continue Learning ── */}
      <section aria-labelledby="continue-heading">
        <h2 id="continue-heading" className={`font-bold text-gray-900 mb-4 ${settings.fontSize === 'large' ? 'text-xl' : 'text-lg'}`}>
          Continue Learning
        </h2>
        <ContinueLearningCard course={continueCoure} lesson={continueLesson} />
      </section>

      {/* ── My Courses ── */}
      <section aria-labelledby="courses-heading">
        <div className="flex items-center justify-between mb-4">
          <h2 id="courses-heading" className={`font-bold text-gray-900 ${settings.fontSize === 'large' ? 'text-xl' : 'text-lg'}`}>
            My Courses
          </h2>
          <Link
            to="/courses"
            className="text-sm text-indigo-600 font-semibold hover:underline focus:outline-none focus:ring-2 focus:ring-indigo-500 rounded"
          >
            View all →
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {courses.map(c => <CourseCard key={c.id} course={c} />)}
        </div>
      </section>

      {/* ── Recommended Lessons ── */}
      <section aria-labelledby="recs-heading">
        <h2 id="recs-heading" className={`font-bold text-gray-900 mb-4 ${settings.fontSize === 'large' ? 'text-xl' : 'text-lg'}`}>
          Recommended Next
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {courses.map(course => {
            const next = course.lessons.find(l => !l.completed)
            if (!next) return null
            const c = colorMap[course.color] ?? colorMap.indigo
            return (
              <Link
                key={next.id}
                to={`/lesson/${next.id}`}
                className={`bg-white rounded-2xl border ${c.ring} p-4 flex items-center gap-3
                  hover:shadow-md transition-shadow focus:outline-none focus:ring-2 focus:ring-indigo-500`}
              >
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-lg flex-shrink-0 ${c.icon}`}>
                  {course.icon}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-gray-900 text-sm truncate">{next.title}</p>
                  <p className="text-xs text-gray-500 mt-0.5">{course.title}</p>
                  <div className="flex items-center gap-1 mt-1 text-xs text-gray-400">
                    <Clock size={11} aria-hidden="true" />
                    {next.duration}
                  </div>
                </div>
                <ArrowRight size={15} className="text-gray-400 flex-shrink-0" aria-hidden="true" />
              </Link>
            )
          })}
        </div>
      </section>

      {/* ── Quick links ── */}
      <div className="flex gap-3 flex-wrap pb-4 border-t border-gray-100 pt-4">
        <Link to="/courses"  className="text-sm text-indigo-600 font-semibold hover:underline">Browse all courses →</Link>
        <Link to="/progress" className="text-sm text-indigo-600 font-semibold hover:underline">View progress report →</Link>
        <Link to="/accessibility" className="text-sm text-indigo-600 font-semibold hover:underline">Accessibility settings →</Link>
      </div>
    </div>
  )
}
