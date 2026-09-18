// src/pages/Courses.jsx
import { useState } from 'react'
import { Link } from 'react-router-dom'
import {
  BookOpen,
  ArrowRight,
  Clock,
  CheckCircle,
  Search,
  Filter,
  Layers,
  ChevronRight
} from 'lucide-react'
import { useAccessibility } from '../context/AccessibilityContext'
import courses from '../data/courses'
import AccessibilityToolbar from '../components/AccessibilityToolbar'

const levelColors = {
  Beginner: 'bg-emerald-100 text-emerald-800 border-emerald-200',
  Intermediate: 'bg-amber-100 text-amber-800 border-amber-200',
  Advanced: 'bg-rose-100 text-rose-800 border-rose-200',
}

const colorMap = {
  indigo: {
    ring: 'border-indigo-200',
    bar: 'bg-indigo-600',
    badge: 'bg-indigo-50 text-indigo-700',
    btn: 'bg-indigo-600 hover:bg-indigo-700',
  },
  blue: {
    ring: 'border-blue-200',
    bar: 'bg-blue-600',
    badge: 'bg-blue-50 text-blue-700',
    btn: 'bg-blue-600 hover:bg-blue-700',
  },
  purple: {
    ring: 'border-purple-200',
    bar: 'bg-purple-600',
    badge: 'bg-purple-50 text-purple-700',
    btn: 'bg-purple-600 hover:bg-purple-700',
  },
}

export default function Courses() {
  const { settings } = useAccessibility()
  const [search, setSearch] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('ALL')

  const categories = ['ALL', 'Programming', 'Web', 'Artificial Intelligence']

  const filtered = courses.filter((c) => {
    const matchesSearch =
      c.title.toLowerCase().includes(search.toLowerCase()) ||
      c.description.toLowerCase().includes(search.toLowerCase())
    const matchesCategory = selectedCategory === 'ALL' || c.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  return (
    <div className="max-w-5xl mx-auto flex flex-col gap-8 pb-20">
      {/* Breadcrumb nav */}
      <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-sm text-gray-500 dark:text-gray-400">
        <Link to="/dashboard" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
          Dashboard
        </Link>
        <ChevronRight size={14} aria-hidden="true" />
        <span className="text-gray-800 dark:text-gray-200 font-medium">Courses</span>
      </nav>

      {/* Accessibility Toolbar */}
      <AccessibilityToolbar />

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <span className="inline-block bg-indigo-50 dark:bg-indigo-950/80 border border-indigo-100 dark:border-indigo-800 text-indigo-700 dark:text-indigo-300 text-xs font-semibold tracking-widest uppercase px-3 py-1 rounded-full mb-2">
            Curriculum Catalog
          </span>
          <h1
            className={`font-extrabold text-gray-900 dark:text-gray-50 leading-tight ${
              settings.fontSize === 'large' ? 'text-3xl sm:text-4xl' : 'text-2xl sm:text-3xl'
            }`}
          >
            Accessible Courses
          </h1>
          <p className="text-gray-600 dark:text-gray-300 text-sm sm:text-base mt-1">
            Explore interactive courses built with multi-modal accessibility, visual diagrams, and simplified language.
          </p>
        </div>
      </div>

      {/* Filter & Search Bar */}
      <div className="bg-white dark:bg-gray-900 border border-gray-200/80 dark:border-gray-800 p-4 sm:p-5 rounded-2xl shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4 transition-colors">
        {/* Search */}
        <div className="relative w-full sm:w-80">
          <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search subjects or topics..."
            className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 text-sm bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 placeholder:text-gray-400 dark:placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        {/* Categories */}
        <div className="flex items-center gap-1.5 w-full sm:w-auto overflow-x-auto pb-1 sm:pb-0">
          {categories.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setSelectedCategory(cat)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
                selectedCategory === cat
                  ? 'bg-indigo-600 text-white shadow-sm'
                  : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
              }`}
            >
              {cat === 'ALL' ? 'All Subjects' : cat}
            </button>
          ))}
        </div>
      </div>

      {/* Courses Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map((c) => {
          const styling = colorMap[c.color] || colorMap.indigo
          const nextLesson = c.lessons?.find((l) => !l.completed) || c.lessons?.[0] || { id: 'lesson-001' }

          return (
            <div
              key={c.id}
              className={`bg-white dark:bg-gray-900 rounded-2xl border ${styling.ring} dark:border-gray-800 p-6 shadow-sm hover:shadow-md transition-all flex flex-col justify-between gap-5`}
            >
              <div className="flex flex-col gap-3">
                <div className="flex items-start justify-between gap-2">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl" aria-hidden="true">
                      {c.icon}
                    </span>
                    <div>
                      <h2 className="font-bold text-gray-900 dark:text-gray-50 text-lg leading-tight">{c.title}</h2>
                      <span className="text-xs text-gray-500 dark:text-gray-400 font-medium">
                        {c.category} · {c.duration}
                      </span>
                    </div>
                  </div>
                  <span
                    className={`text-xs px-2.5 py-0.5 rounded-full font-semibold border ${
                      levelColors[c.level] || 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300'
                    }`}
                  >
                    {c.level}
                  </span>
                </div>

                <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed line-clamp-2">{c.description}</p>
              </div>

              {/* Progress and Action */}
              <div className="flex flex-col gap-4 border-t border-gray-100 dark:border-gray-800 pt-4">
                <div>
                  <div className="flex justify-between text-xs text-gray-600 dark:text-gray-400 font-semibold mb-1">
                    <span>
                      {c.completedLessons} of {c.totalLessons} lessons completed
                    </span>
                    <span>{c.progress}%</span>
                  </div>
                  <div
                    className="w-full bg-gray-100 dark:bg-gray-800 rounded-full h-2 overflow-hidden"
                    role="progressbar"
                    aria-valuenow={c.progress}
                    aria-valuemin={0}
                    aria-valuemax={100}
                    aria-label={`${c.title} completion`}
                  >
                    <div
                      className={`h-2 rounded-full transition-all duration-500 ${styling.bar}`}
                      style={{ width: `${c.progress}%` }}
                    />
                  </div>
                </div>

                <div className="flex flex-wrap gap-1">
                  {c.tags.slice(0, 3).map((tag) => (
                    <span
                      key={tag}
                      className="text-xs bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 font-medium px-2 py-0.5 rounded-md"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>

                <Link
                  to={`/lesson/${nextLesson.id}`}
                  className={`flex items-center justify-center gap-2 text-sm font-bold text-white rounded-xl py-3 shadow-sm transition-all active:scale-[0.98] ${styling.btn}`}
                >
                  Continue Learning
                  <ArrowRight size={16} aria-hidden="true" />
                </Link>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
