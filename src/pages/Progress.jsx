// src/pages/Progress.jsx
import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import {
  TrendingUp,
  BookOpen,
  CheckCircle,
  Award,
  Flame,
  Clock,
  ArrowRight,
  RotateCcw,
  Calendar,
  BarChart3,
  ChevronRight,
  FileQuestion,
  Star
} from 'lucide-react'
import { useAccessibility } from '../context/AccessibilityContext'
import courses from '../data/courses'
import AccessibilityToolbar from '../components/AccessibilityToolbar'

const STORAGE_KEY = 'saralshiksha_quiz_scores'

const colorMap = {
  indigo: {
    ring: 'border-indigo-200',
    bar: 'bg-indigo-600',
    badge: 'bg-indigo-100 text-indigo-700',
    iconBg: 'bg-indigo-100 text-indigo-600',
  },
  blue: {
    ring: 'border-blue-200',
    bar: 'bg-blue-600',
    badge: 'bg-blue-100 text-blue-700',
    iconBg: 'bg-blue-100 text-blue-600',
  },
  purple: {
    ring: 'border-purple-200',
    bar: 'bg-purple-600',
    badge: 'bg-purple-100 text-purple-700',
    iconBg: 'bg-purple-100 text-purple-600',
  },
}

export default function Progress() {
  const { settings } = useAccessibility()
  const [quizScores, setQuizScores] = useState([])

  // Load quiz scores from localStorage
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY)
      if (stored) {
        const parsed = JSON.parse(stored)
        // Convert object of scores to array, sorted newest first
        const arr = Object.values(parsed).sort(
          (a, b) => new Date(b.completedAt || 0) - new Date(a.completedAt || 0)
        )
        setQuizScores(arr)
      }
    } catch (e) {
      console.error('Error loading quiz scores', e)
    }
  }, [])

  // Aggregate statistics
  const totalCourses = courses.length
  const totalLessonsCompleted = courses.reduce((sum, c) => sum + (c.completedLessons || 0), 0)
  const totalLessonsPossible = courses.reduce((sum, c) => sum + (c.totalLessons || 0), 0)
  const avgProgress = Math.round(
    courses.reduce((sum, c) => sum + c.progress, 0) / (totalCourses || 1)
  )

  // Average quiz score
  const avgQuizScore =
    quizScores.length > 0
      ? Math.round(
          quizScores.reduce((sum, q) => sum + (q.percentage || 0), 0) / quizScores.length
        )
      : null

  // Recent activity items combining quiz results with learning milestones
  const staticActivities = [
    {
      id: 'act-1',
      title: 'Completed Lesson: Variables & Data Types',
      course: 'Python Basics',
      time: 'Today',
      icon: CheckCircle,
      iconColor: 'text-emerald-600',
      bgColor: 'bg-emerald-50',
    },
    {
      id: 'act-2',
      title: 'Configured Accessibility Profile',
      course: 'Profile & Settings',
      time: '1 day ago',
      icon: Star,
      iconColor: 'text-indigo-600',
      bgColor: 'bg-indigo-50',
    },
    {
      id: 'act-3',
      title: 'Completed Lesson: Introduction to Python',
      course: 'Python Basics',
      time: '2 days ago',
      icon: CheckCircle,
      iconColor: 'text-emerald-600',
      bgColor: 'bg-emerald-50',
    },
    {
      id: 'act-4',
      title: 'Started Web Development Module',
      course: 'Web Development',
      time: '3 days ago',
      icon: BookOpen,
      iconColor: 'text-blue-600',
      bgColor: 'bg-blue-50',
    },
  ]

  return (
    <div className="max-w-5xl mx-auto flex flex-col gap-8 pb-20">
      {/* Breadcrumb nav */}
      <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-sm text-gray-500">
        <Link to="/dashboard" className="hover:text-indigo-600 transition-colors">
          Dashboard
        </Link>
        <ChevronRight size={14} aria-hidden="true" />
        <span className="text-gray-800 font-medium">My Progress</span>
      </nav>

      {/* Accessibility Toolbar */}
      <AccessibilityToolbar />

      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <span className="inline-block bg-indigo-50 border border-indigo-100 text-indigo-700 text-xs font-semibold tracking-widest uppercase px-3 py-1 rounded-full mb-2">
            Analytics & Mastery
          </span>
          <h1
            className={`font-extrabold text-gray-900 leading-tight ${
              settings.fontSize === 'large' ? 'text-3xl sm:text-4xl' : 'text-2xl sm:text-3xl'
            }`}
          >
            My Learning Progress
          </h1>
          <p className="text-gray-600 text-sm sm:text-base mt-1">
            Track your course completions, test scores, and learning streak all in one place.
          </p>
        </div>

        {/* Streak card */}
        <div className="flex items-center gap-3 bg-amber-50 border border-amber-200 rounded-2xl px-5 py-3.5 self-start sm:self-auto shadow-sm">
          <div className="w-10 h-10 rounded-xl bg-amber-400/20 text-amber-600 flex items-center justify-center">
            <Flame size={24} aria-hidden="true" />
          </div>
          <div>
            <p className="text-2xl font-black text-amber-800 leading-none">5 Days</p>
            <p className="text-xs font-semibold text-amber-700 mt-0.5">Active Streak 🔥</p>
          </div>
        </div>
      </div>

      {/* Top Metric Cards */}
      <section aria-labelledby="metrics-heading">
        <h2 id="metrics-heading" className="sr-only">
          Progress Overview Metrics
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Overall Progress */}
          <div className="bg-white rounded-2xl border border-gray-200 p-5 shadow-sm flex flex-col justify-between">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-gray-500">
                Overall Progress
              </span>
              <div className="w-8 h-8 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center">
                <TrendingUp size={18} />
              </div>
            </div>
            <div className="mt-4">
              <div className="flex items-baseline gap-2">
                <span className="text-3xl font-black text-gray-900">{avgProgress}%</span>
                <span className="text-xs font-semibold text-emerald-600">Across all courses</span>
              </div>
              <div className="w-full bg-gray-100 rounded-full h-2 mt-2 overflow-hidden">
                <div
                  className="bg-indigo-600 h-2 rounded-full transition-all duration-500"
                  style={{ width: `${avgProgress}%` }}
                />
              </div>
            </div>
          </div>

          {/* Lessons Completed */}
          <div className="bg-white rounded-2xl border border-gray-200 p-5 shadow-sm flex flex-col justify-between">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-gray-500">
                Lessons Finished
              </span>
              <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center">
                <CheckCircle size={18} />
              </div>
            </div>
            <div className="mt-4">
              <div className="flex items-baseline gap-2">
                <span className="text-3xl font-black text-gray-900">{totalLessonsCompleted}</span>
                <span className="text-xs text-gray-500">of {totalLessonsPossible} modules</span>
              </div>
              <p className="text-xs text-emerald-600 font-medium mt-1">
                {Math.round((totalLessonsCompleted / (totalLessonsPossible || 1)) * 100)}% of curriculum
              </p>
            </div>
          </div>

          {/* Average Quiz Score */}
          <div className="bg-white rounded-2xl border border-gray-200 p-5 shadow-sm flex flex-col justify-between">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-gray-500">
                Average Quiz Score
              </span>
              <div className="w-8 h-8 rounded-lg bg-purple-50 text-purple-600 flex items-center justify-center">
                <Award size={18} />
              </div>
            </div>
            <div className="mt-4">
              <div className="flex items-baseline gap-2">
                <span className="text-3xl font-black text-gray-900">
                  {avgQuizScore !== null ? `${avgQuizScore}%` : '—'}
                </span>
                <span className="text-xs text-gray-500">
                  {quizScores.length > 0
                    ? `${quizScores.length} test${quizScores.length > 1 ? 's' : ''}`
                    : 'No quizzes yet'}
                </span>
              </div>
              <p className="text-xs text-purple-700 font-medium mt-1">
                {quizScores.length > 0 ? 'Verified mastery' : 'Take a quiz to see score'}
              </p>
            </div>
          </div>

          {/* Active Courses */}
          <div className="bg-white rounded-2xl border border-gray-200 p-5 shadow-sm flex flex-col justify-between">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-gray-500">
                Enrolled Courses
              </span>
              <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center">
                <BookOpen size={18} />
              </div>
            </div>
            <div className="mt-4">
              <div className="flex items-baseline gap-2">
                <span className="text-3xl font-black text-gray-900">{totalCourses}</span>
                <span className="text-xs text-gray-500">In-progress subjects</span>
              </div>
              <p className="text-xs text-blue-600 font-medium mt-1">All accessible</p>
            </div>
          </div>
        </div>
      </section>

      {/* Per-Course Progress List */}
      <section aria-labelledby="courses-progress-heading">
        <div className="flex items-center justify-between mb-4">
          <h2
            id="courses-progress-heading"
            className={`font-bold text-gray-900 ${
              settings.fontSize === 'large' ? 'text-2xl' : 'text-xl'
            }`}
          >
            Course Breakdown
          </h2>
          <Link to="/courses" className="text-sm font-semibold text-indigo-600 hover:underline">
            Browse All Courses →
          </Link>
        </div>

        <div className="flex flex-col gap-4">
          {courses.map((course) => {
            const styling = colorMap[course.color] || colorMap.indigo
            const nextLesson = course.lessons?.find((l) => !l.completed) || course.lessons?.[0]

            return (
              <div
                key={course.id}
                className="bg-white rounded-2xl border border-gray-200 p-5 sm:p-6 shadow-sm hover:shadow transition-shadow flex flex-col md:flex-row md:items-center justify-between gap-6"
              >
                {/* Course Icon & Details */}
                <div className="flex items-start gap-4 flex-1">
                  <div
                    className={`w-14 h-14 rounded-2xl flex items-center justify-center text-2xl flex-shrink-0 ${styling.iconBg}`}
                  >
                    {course.icon}
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex flex-wrap items-center gap-2 mb-1">
                      <h3 className="font-bold text-gray-900 text-lg leading-tight">
                        {course.title}
                      </h3>
                      <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-gray-100 text-gray-700">
                        {course.level}
                      </span>
                    </div>

                    <p className="text-sm text-gray-600 line-clamp-1 mb-3">
                      {course.description}
                    </p>

                    {/* Progress Bar and stats */}
                    <div className="max-w-md">
                      <div className="flex justify-between text-xs text-gray-600 font-semibold mb-1">
                        <span>
                          {course.completedLessons} of {course.totalLessons} lessons completed
                        </span>
                        <span>{course.progress}%</span>
                      </div>
                      <div
                        className="w-full bg-gray-100 rounded-full h-2.5 overflow-hidden"
                        role="progressbar"
                        aria-valuenow={course.progress}
                        aria-valuemin={0}
                        aria-valuemax={100}
                        aria-label={`${course.title} completion`}
                      >
                        <div
                          className={`h-2.5 rounded-full transition-all duration-500 ${styling.bar}`}
                          style={{ width: `${course.progress}%` }}
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Continue button */}
                <div className="flex items-center gap-3 self-end md:self-center flex-shrink-0">
                  <Link
                    to={nextLesson ? `/lesson/${nextLesson.id}` : `/courses`}
                    className="inline-flex items-center gap-2 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 font-semibold text-sm px-5 py-2.5 rounded-xl transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-600"
                  >
                    Continue
                    <ArrowRight size={15} aria-hidden="true" />
                  </Link>
                </div>
              </div>
            )
          })}
        </div>
      </section>

      {/* Quiz Scores & Mastery Section */}
      <section aria-labelledby="quiz-scores-heading">
        <div className="flex items-center justify-between mb-4">
          <h2
            id="quiz-scores-heading"
            className={`font-bold text-gray-900 ${
              settings.fontSize === 'large' ? 'text-2xl' : 'text-xl'
            }`}
          >
            Quiz Achievements
          </h2>
          <Link
            to="/quiz/quiz-001"
            className="text-sm font-semibold text-indigo-600 hover:underline"
          >
            Take Practice Quiz →
          </Link>
        </div>

        {quizScores.length === 0 ? (
          /* Empty state */
          <div className="bg-white rounded-2xl border-2 border-dashed border-gray-200 p-8 sm:p-10 flex flex-col items-center text-center gap-4">
            <div className="w-16 h-16 rounded-full bg-indigo-50 text-indigo-600 flex items-center justify-center">
              <FileQuestion size={32} aria-hidden="true" />
            </div>
            <div className="max-w-md">
              <h3 className="text-lg font-bold text-gray-900">No Quiz Attempts Yet</h3>
              <p className="text-sm text-gray-600 mt-1">
                Quizzes test your understanding at the end of each lesson. Take your first quiz to
                see your scores and mastery certificates appear here!
              </p>
            </div>
            <Link
              to="/quiz/quiz-001"
              className="inline-flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-sm px-6 py-3 rounded-xl transition-all shadow-sm active:scale-95"
            >
              Start Python Variables Quiz
              <ArrowRight size={16} aria-hidden="true" />
            </Link>
          </div>
        ) : (
          /* Populated quiz scores grid */
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {quizScores.map((q) => {
              const passed = q.percentage >= 70
              return (
                <div
                  key={q.quizId}
                  className="bg-white rounded-2xl border border-gray-200 p-5 shadow-sm flex flex-col justify-between gap-4"
                >
                  <div className="flex flex-col gap-2">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-indigo-50 text-indigo-700">
                        {q.courseTitle}
                      </span>
                      <span
                        className={`text-xs font-bold px-2.5 py-0.5 rounded-full ${
                          passed
                            ? 'bg-emerald-100 text-emerald-800'
                            : 'bg-amber-100 text-amber-800'
                        }`}
                      >
                        {passed ? 'Passed ✓' : 'Practice needed'}
                      </span>
                    </div>

                    <h3 className="font-bold text-gray-900 text-base leading-snug">
                      {q.quizTitle}
                    </h3>
                  </div>

                  <div className="bg-gray-50 rounded-xl p-3 flex items-center justify-between">
                    <div>
                      <p className="text-xs text-gray-500 font-medium">Final Score</p>
                      <p className="text-lg font-black text-gray-900">
                        {q.score} / {q.total}{' '}
                        <span className="text-sm font-semibold text-indigo-600">
                          ({q.percentage}%)
                        </span>
                      </p>
                    </div>

                    <div className="w-9 h-9 rounded-full bg-white border border-gray-200 flex items-center justify-center text-amber-500">
                      <Award size={18} />
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-1 text-xs text-gray-500 border-t border-gray-100">
                    <span className="flex items-center gap-1">
                      <Clock size={12} />
                      {q.completedAt ? new Date(q.completedAt).toLocaleDateString() : 'Recent'}
                    </span>
                    <Link
                      to={`/quiz/${q.quizId}`}
                      className="text-indigo-600 font-semibold hover:underline inline-flex items-center gap-1"
                    >
                      <RotateCcw size={12} />
                      Retake
                    </Link>
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </section>

      {/* Recent Activity Timeline */}
      <section aria-labelledby="activity-heading">
        <h2
          id="activity-heading"
          className={`font-bold text-gray-900 mb-4 ${
            settings.fontSize === 'large' ? 'text-2xl' : 'text-xl'
          }`}
        >
          Recent Activity
        </h2>

        <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm">
          <ul className="divide-y divide-gray-100" aria-label="Recent activity log">
            {/* Show any recent quiz completion on top */}
            {quizScores.slice(0, 2).map((q) => (
              <li key={`activity-${q.quizId}`} className="py-3.5 flex items-start gap-4">
                <div className="w-9 h-9 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Award size={18} aria-hidden="true" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-bold text-gray-900">
                    Completed Quiz: {q.quizTitle}
                  </p>
                  <p className="text-xs text-gray-500 mt-0.5">
                    {q.courseTitle} · Score: {q.percentage}% ({q.score}/{q.total} correct)
                  </p>
                </div>
                <span className="text-xs font-medium text-gray-400 flex-shrink-0">Just now</span>
              </li>
            ))}

            {/* Static historical milestones */}
            {staticActivities.map((act) => {
              const Icon = act.icon
              return (
                <li key={act.id} className="py-3.5 flex items-start gap-4">
                  <div
                    className={`w-9 h-9 rounded-xl ${act.bgColor} ${act.iconColor} flex items-center justify-center flex-shrink-0 mt-0.5`}
                  >
                    <Icon size={18} aria-hidden="true" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-gray-800">{act.title}</p>
                    <p className="text-xs text-gray-500 mt-0.5">{act.course}</p>
                  </div>
                  <span className="text-xs font-medium text-gray-400 flex-shrink-0">
                    {act.time}
                  </span>
                </li>
              )
            })}
          </ul>
        </div>
      </section>

      {/* Quick Navigation Footer Links */}
      <div className="flex flex-wrap items-center gap-4 pt-4 border-t border-gray-200">
        <Link
          to="/dashboard"
          className="text-sm font-semibold text-indigo-600 hover:text-indigo-800 transition-colors"
        >
          ← Back to Dashboard
        </Link>
        <span className="text-gray-300">|</span>
        <Link
          to="/courses"
          className="text-sm font-semibold text-indigo-600 hover:text-indigo-800 transition-colors"
        >
          Explore All Courses
        </Link>
        <span className="text-gray-300">|</span>
        <Link
          to="/accessibility"
          className="text-sm font-semibold text-indigo-600 hover:text-indigo-800 transition-colors"
        >
          Adjust Accessibility Profile
        </Link>
      </div>
    </div>
  )
}
