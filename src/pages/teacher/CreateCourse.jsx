// src/pages/teacher/CreateCourse.jsx
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {
  BookOpen,
  PlusCircle,
  CheckCircle,
  GraduationCap,
  Sparkles,
  ChevronRight,
  ArrowRight,
  RotateCcw,
  Languages,
  Eye,
  Ear,
  Brain,
  HelpCircle
} from 'lucide-react'
import { useAccessibility } from '../../context/AccessibilityContext'
import FormInput from '../../components/FormInput'
import AccessibilityToolbar from '../../components/AccessibilityToolbar'

const STORAGE_KEY = 'saralshiksha_teacher_courses'

const SAMPLE_DATA = {
  courseName: 'Basic Plant Biology',
  description: 'Understand the living world of flora, cellular respiration, and plant life cycles.',
  category: 'Science',
  level: 'Beginner',
  lessonTitle: 'Photosynthesis & Solar Energy',
  normalContent:
    'Photosynthesis is the biochemical process by which photoautotrophic plants, algae, and certain bacteria convert radiant electromagnetic energy (photons) into chemical potential energy stored within the molecular bonds of carbohydrate glucose, simultaneously liberating molecular oxygen as a byproduct.',
  simpleContent:
    'Plants make their food using sunlight. They take in air and water, use sunshine to turn them into sweet plant food, and release clean oxygen for us to breathe.',
  keyTakeaway: 'Sunlight + Water + Air = Plant Food + Clean Oxygen',
}

export default function CreateCourse() {
  const navigate = useNavigate()
  const { settings } = useAccessibility()

  const [courseName, setCourseName] = useState('')
  const [description, setDescription] = useState('')
  const [category, setCategory] = useState('Science')
  const [level, setLevel] = useState('Beginner')

  // Lesson fields
  const [lessonTitle, setLessonTitle] = useState('')
  const [normalContent, setNormalContent] = useState('')
  const [simpleContent, setSimpleContent] = useState('')
  const [keyTakeaway, setKeyTakeaway] = useState('')

  // Accessibility tags
  const [supportsTts, setSupportsTts] = useState(true)
  const [supportsCaptions, setSupportsCaptions] = useState(true)
  const [supportsSimpleLang, setSupportsSimpleLang] = useState(true)

  // Status
  const [submitted, setSubmitted] = useState(false)
  const [errors, setErrors] = useState({})

  const handleLoadSample = () => {
    setCourseName(SAMPLE_DATA.courseName)
    setDescription(SAMPLE_DATA.description)
    setCategory(SAMPLE_DATA.category)
    setLevel(SAMPLE_DATA.level)
    setLessonTitle(SAMPLE_DATA.lessonTitle)
    setNormalContent(SAMPLE_DATA.normalContent)
    setSimpleContent(SAMPLE_DATA.simpleContent)
    setKeyTakeaway(SAMPLE_DATA.keyTakeaway)
    setErrors({})
  }

  const handleReset = () => {
    setCourseName('')
    setDescription('')
    setLessonTitle('')
    setNormalContent('')
    setSimpleContent('')
    setKeyTakeaway('')
    setErrors({})
    setSubmitted(false)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const errs = {}
    if (!courseName.trim()) errs.courseName = 'Course name is required.'
    if (!description.trim()) errs.description = 'Course description is required.'
    if (!lessonTitle.trim()) errs.lessonTitle = 'Lesson title is required.'
    if (!normalContent.trim()) errs.normalContent = 'Standard content is required.'
    if (!simpleContent.trim()) errs.simpleContent = 'Simplified content is required.'

    if (Object.keys(errs).length > 0) {
      setErrors(errs)
      return
    }

    setErrors({})

    // Save to localStorage
    try {
      const existing = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]')
      const newCourse = {
        id: `created-${Date.now()}`,
        title: courseName,
        description,
        category,
        level,
        lesson: {
          title: lessonTitle,
          normalContent,
          simpleContent,
          keyTakeaway,
          accommodations: {
            tts: supportsTts,
            captions: supportsCaptions,
            simpleLanguage: supportsSimpleLang,
          },
        },
        createdAt: new Date().toISOString(),
      }
      localStorage.setItem(STORAGE_KEY, JSON.stringify([newCourse, ...existing]))
      setSubmitted(true)
    } catch (err) {
      console.error('Error saving created course', err)
      setSubmitted(true)
    }
  }

  return (
    <div className="max-w-4xl mx-auto flex flex-col gap-8 pb-20">
      {/* Top Breadcrumb */}
      <div className="flex items-center gap-1.5 text-sm text-gray-500">
        <Link to="/teacher/dashboard" className="text-purple-700 font-semibold hover:underline flex items-center gap-1">
          <GraduationCap size={16} /> Educator Portal
        </Link>
        <ChevronRight size={14} />
        <span className="text-gray-800 font-medium">Create Course</span>
      </div>

      {/* Accessibility Toolbar */}
      <AccessibilityToolbar />

      {/* Header with Quick Template Loader */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <span className="inline-block bg-purple-50 border border-purple-100 text-purple-700 text-xs font-semibold tracking-widest uppercase px-3 py-1 rounded-full mb-2">
            Inclusive Course Builder
          </span>
          <h1
            className={`font-extrabold text-gray-900 leading-tight ${
              settings.fontSize === 'large' ? 'text-3xl sm:text-4xl' : 'text-2xl sm:text-3xl'
            }`}
          >
            Create Accessible Course
          </h1>
          <p className="text-gray-600 text-sm sm:text-base mt-1">
            Author once, adapt automatically. Pair standard curriculum text with cognitive-friendly simple language.
          </p>
        </div>

        <button
          type="button"
          onClick={handleLoadSample}
          className="inline-flex items-center gap-2 bg-amber-50 hover:bg-amber-100 border border-amber-300 text-amber-900 font-bold text-xs sm:text-sm px-4 py-2.5 rounded-xl transition-all shadow-sm active:scale-95 self-start sm:self-auto"
        >
          <Sparkles size={16} className="text-amber-600" />
          Load Example (Photosynthesis)
        </button>
      </div>

      {submitted ? (
        /* Success State */
        <div className="bg-white rounded-2xl border-2 border-emerald-300 p-8 sm:p-10 shadow-sm flex flex-col items-center text-center gap-5">
          <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center">
            <CheckCircle size={36} aria-hidden="true" />
          </div>

          <div className="max-w-md">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-800 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
              Successfully Saved
            </span>
            <h2 className="text-2xl font-bold text-gray-900 mt-2">Course & Lesson Published!</h2>
            <p className="text-sm text-gray-600 mt-1">
              "<strong>{courseName}</strong>" has been recorded with dual normal & simplified
              content. Students toggling Simple Language or Read Aloud will experience your adapted
              versions seamlessly.
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-4 mt-2">
            <button
              type="button"
              onClick={handleReset}
              className="inline-flex items-center gap-2 border-2 border-gray-300 hover:border-gray-400 bg-white text-gray-700 font-semibold px-6 py-3 rounded-xl hover:bg-gray-50 transition-colors"
            >
              <PlusCircle size={16} />
              Create Another Course
            </button>

            <button
              type="button"
              onClick={() => navigate('/teacher/dashboard')}
              className="inline-flex items-center gap-2 bg-purple-600 hover:bg-purple-700 text-white font-bold px-7 py-3.5 rounded-xl shadow-md transition-all active:scale-95"
            >
              Return to Teacher Dashboard
              <ArrowRight size={18} />
            </button>
          </div>
        </div>
      ) : (
        /* Course Builder Form */
        <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-8">
          {/* Section 1: Course Meta */}
          <div className="bg-white rounded-2xl border border-gray-200 p-6 sm:p-8 shadow-sm flex flex-col gap-6">
            <div className="flex items-center gap-2 border-b border-gray-100 pb-3">
              <BookOpen size={20} className="text-purple-600" />
              <h2 className="font-bold text-gray-900 text-lg">1. Course Details</h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="sm:col-span-2">
                <FormInput
                  id="course-name"
                  label="Course Title"
                  value={courseName}
                  onChange={(e) => setCourseName(e.target.value)}
                  placeholder="e.g. Basic Plant Biology"
                  error={errors.courseName}
                />
              </div>

              <div>
                <label htmlFor="course-category" className="text-sm font-semibold text-gray-700 block mb-1.5">
                  Subject Category
                </label>
                <select
                  id="course-category"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm text-gray-900 bg-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                >
                  <option value="Science">Science</option>
                  <option value="Programming">Programming</option>
                  <option value="Mathematics">Mathematics</option>
                  <option value="Social Studies">Social Studies</option>
                  <option value="Web Development">Web Development</option>
                </select>
              </div>

              <div>
                <label htmlFor="course-level" className="text-sm font-semibold text-gray-700 block mb-1.5">
                  Difficulty Level
                </label>
                <select
                  id="course-level"
                  value={level}
                  onChange={(e) => setLevel(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm text-gray-900 bg-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                >
                  <option value="Beginner">Beginner</option>
                  <option value="Intermediate">Intermediate</option>
                  <option value="Advanced">Advanced</option>
                </select>
              </div>

              <div className="sm:col-span-2 flex flex-col gap-1.5">
                <label htmlFor="course-desc" className="text-sm font-semibold text-gray-700">
                  Course Description <span className="text-red-500">*</span>
                </label>
                <textarea
                  id="course-desc"
                  rows={2}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Explain what students will learn in this course..."
                  className={`w-full px-4 py-3 rounded-xl border text-sm text-gray-900 bg-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 ${
                    errors.description ? 'border-red-400 bg-red-50' : 'border-gray-200'
                  }`}
                />
                {errors.description && (
                  <p className="text-xs text-red-600 font-medium">{errors.description}</p>
                )}
              </div>
            </div>
          </div>

          {/* Section 2: Lesson Content with Side-by-Side Normal vs Simplified */}
          <div className="bg-white rounded-2xl border border-gray-200 p-6 sm:p-8 shadow-sm flex flex-col gap-6">
            <div className="flex items-center justify-between border-b border-gray-100 pb-3">
              <div className="flex items-center gap-2">
                <Languages size={20} className="text-indigo-600" />
                <h2 className="font-bold text-gray-900 text-lg">
                  2. Lesson Authoring — Dual Explanation
                </h2>
              </div>
              <span className="text-xs font-semibold text-indigo-700 bg-indigo-50 px-2.5 py-1 rounded-full">
                Core Accessibility Feature
              </span>
            </div>

            <FormInput
              id="lesson-title"
              label="Lesson Title"
              value={lessonTitle}
              onChange={(e) => setLessonTitle(e.target.value)}
              placeholder="e.g. Photosynthesis & Solar Energy"
              error={errors.lessonTitle}
            />

            {/* Side-by-side or paired comparison */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Normal Explanation Card */}
              <div className="flex flex-col gap-2 bg-gray-50 border border-gray-200 rounded-2xl p-5">
                <div className="flex items-center justify-between">
                  <label htmlFor="normal-content" className="text-sm font-bold text-gray-800 flex items-center gap-1.5">
                    <BookOpen size={16} className="text-indigo-600" />
                    Standard / Normal Content
                  </label>
                  <span className="text-xs text-gray-500 font-medium">Standard curriculum</span>
                </div>
                <p className="text-xs text-gray-500">
                  Full academic explanation with comprehensive vocabulary.
                </p>
                <textarea
                  id="normal-content"
                  rows={6}
                  value={normalContent}
                  onChange={(e) => setNormalContent(e.target.value)}
                  placeholder="e.g. Photosynthesis is the process by which plants convert light energy into chemical energy..."
                  className={`w-full px-4 py-3 rounded-xl border text-sm text-gray-900 bg-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
                    errors.normalContent ? 'border-red-400 bg-red-50' : 'border-gray-200'
                  }`}
                />
                {errors.normalContent && (
                  <p className="text-xs text-red-600 font-medium">{errors.normalContent}</p>
                )}
              </div>

              {/* Simplified Explanation Card */}
              <div className="flex flex-col gap-2 bg-purple-50/70 border-2 border-purple-200 rounded-2xl p-5">
                <div className="flex items-center justify-between">
                  <label htmlFor="simple-content" className="text-sm font-bold text-purple-900 flex items-center gap-1.5">
                    <Brain size={16} className="text-purple-600" />
                    Simplified / Cognitive Content
                  </label>
                  <span className="text-xs font-bold text-purple-700 bg-purple-100 px-2 py-0.5 rounded">
                    Adapted Mode
                  </span>
                </div>
                <p className="text-xs text-purple-700">
                  Clear, conversational language for students with cognitive or learning needs.
                </p>
                <textarea
                  id="simple-content"
                  rows={6}
                  value={simpleContent}
                  onChange={(e) => setSimpleContent(e.target.value)}
                  placeholder="e.g. Plants make their food using sunlight."
                  className={`w-full px-4 py-3 rounded-xl border text-sm text-gray-900 bg-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 ${
                    errors.simpleContent ? 'border-red-400 bg-red-50' : 'border-purple-200'
                  }`}
                />
                {errors.simpleContent && (
                  <p className="text-xs text-red-600 font-medium">{errors.simpleContent}</p>
                )}
              </div>
            </div>

            {/* Key takeaway */}
            <div className="flex flex-col gap-1.5">
              <label htmlFor="key-takeaway" className="text-sm font-semibold text-gray-700">
                Key Summary / Takeaway (Optional)
              </label>
              <input
                id="key-takeaway"
                type="text"
                value={keyTakeaway}
                onChange={(e) => setKeyTakeaway(e.target.value)}
                placeholder="e.g. Sunlight + Water = Plant Food"
                className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm text-gray-900 bg-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>

            {/* Accessibility Flags */}
            <div className="border-t border-gray-100 pt-4 flex flex-col gap-3">
              <span className="text-xs font-bold uppercase tracking-wider text-gray-500">
                Accessibility Adaptations Enabled for this Lesson
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <label className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl border border-gray-200 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={supportsTts}
                    onChange={(e) => setSupportsTts(e.target.checked)}
                    className="w-4 h-4 text-purple-600 rounded focus:ring-purple-500"
                  />
                  <div className="text-xs font-semibold text-gray-800 flex items-center gap-1.5">
                    <Eye size={14} className="text-blue-600" /> Read Aloud
                  </div>
                </label>

                <label className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl border border-gray-200 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={supportsCaptions}
                    onChange={(e) => setSupportsCaptions(e.target.checked)}
                    className="w-4 h-4 text-purple-600 rounded focus:ring-purple-500"
                  />
                  <div className="text-xs font-semibold text-gray-800 flex items-center gap-1.5">
                    <Ear size={14} className="text-emerald-600" /> Captions / Transcript
                  </div>
                </label>

                <label className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl border border-gray-200 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={supportsSimpleLang}
                    onChange={(e) => setSupportsSimpleLang(e.target.checked)}
                    className="w-4 h-4 text-purple-600 rounded focus:ring-purple-500"
                  />
                  <div className="text-xs font-semibold text-gray-800 flex items-center gap-1.5">
                    <Brain size={14} className="text-purple-600" /> Cognitive Mode
                  </div>
                </label>
              </div>
            </div>
          </div>

          {/* Action buttons */}
          <div className="flex items-center justify-end gap-4">
            <button
              type="button"
              onClick={handleReset}
              className="text-sm font-semibold text-gray-500 hover:text-gray-700 px-4 py-3"
            >
              Clear Form
            </button>

            <button
              type="submit"
              className="inline-flex items-center gap-2 bg-purple-600 hover:bg-purple-700 text-white font-bold text-base px-8 py-3.5 rounded-xl shadow-md active:scale-95 transition-all focus:outline-none focus:ring-2 focus:ring-purple-600 focus:ring-offset-2"
            >
              <CheckCircle size={18} />
              Publish Accessible Course
            </button>
          </div>
        </form>
      )}
    </div>
  )
}
