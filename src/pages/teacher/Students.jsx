// src/pages/teacher/Students.jsx
import { useState, useEffect } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import {
  Users,
  Search,
  AlertTriangle,
  CheckCircle,
  X,
  Send,
  GraduationCap,
  ChevronRight,
  Eye,
  Ear,
  Brain,
  Clock,
  BookOpen,
  Award,
  Filter,
  Calendar
} from 'lucide-react'
import { useAccessibility } from '../../context/AccessibilityContext'
import students from '../../data/students'
import courses from '../../data/courses'
import AccessibilityToolbar from '../../components/AccessibilityToolbar'
import Toast from '../../components/Toast'

const a11yBadgeMap = {
  readAloud: { label: 'Read Aloud', icon: Eye, color: 'bg-blue-100 text-blue-700 border-blue-200' },
  highContrast: { label: 'High Contrast', icon: Eye, color: 'bg-amber-100 text-amber-700 border-amber-200' },
  captions: { label: 'Captions / Transcripts', icon: Ear, color: 'bg-emerald-100 text-emerald-700 border-emerald-200' },
  simpleLanguage: { label: 'Simple Language', icon: Brain, color: 'bg-purple-100 text-purple-700 border-purple-200' },
}

const mockStudentDetails = {
  'student-001': {
    primaryCourse: 'Python Basics',
    completedLessons: 10,
    totalLessons: 12,
    quizAverage: '85%',
    lastActive: 'Today at 10:24 AM',
    notes: 'Excels with audio support. Consistently scores above 80% on Python syntax quizzes.',
  },
  'student-002': {
    primaryCourse: 'AI Fundamentals',
    completedLessons: 4,
    totalLessons: 10,
    quizAverage: '42%',
    lastActive: '3 days ago',
    notes: 'Struggling with multi-layered neural network concepts. Benefits heavily from captioned video summaries and simplified step-by-step breakdowns.',
  },
  'student-003': {
    primaryCourse: 'Python & AI Fundamentals',
    completedLessons: 24,
    totalLessons: 26,
    quizAverage: '94%',
    lastActive: 'Yesterday at 4:15 PM',
    notes: 'Thriving with simple language mode. Completes modules rapidly and frequently retakes quizzes for 100% scores.',
  },
}

export default function Students() {
  const [searchParams, setSearchParams] = useSearchParams()
  const { settings } = useAccessibility()

  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('ALL') // 'ALL' | 'NEEDS_ATTENTION' | 'ON_TRACK'
  const [selectedStudent, setSelectedStudent] = useState(null)
  const [interventionToast, setInterventionToast] = useState('')
  const [sentInterventions, setSentInterventions] = useState({})
  const [customNote, setCustomNote] = useState('')

  // Handle URL query parameter ?student=student-002
  useEffect(() => {
    const studentId = searchParams.get('student')
    if (studentId) {
      const found = students.find((s) => s.id === studentId)
      if (found) setSelectedStudent(found)
    }
  }, [searchParams])

  // Close modal on Escape key
  useEffect(() => {
    function handleKey(e) {
      if (e.key === 'Escape' && selectedStudent) {
        setSelectedStudent(null)
      }
    }
    document.addEventListener('keydown', handleKey)
    return () => document.removeEventListener('keydown', handleKey)
  }, [selectedStudent])

  // Filter students
  const filteredStudents = students.filter((s) => {
    const matchesSearch =
      s.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      s.email.toLowerCase().includes(searchTerm.toLowerCase())

    const needsAttention = s.overallProgress < 50
    if (statusFilter === 'NEEDS_ATTENTION') return matchesSearch && needsAttention
    if (statusFilter === 'ON_TRACK') return matchesSearch && !needsAttention
    return matchesSearch
  })

  // Handle sending intervention
  const handleSendIntervention = (student) => {
    setSentInterventions((prev) => ({ ...prev, [student.id]: true }))
    setInterventionToast(`Intervention dispatched to ${student.name}! Learning accommodation guide delivered.`)
    setCustomNote('')
    setTimeout(() => setInterventionToast(''), 4000)
  }

  // Helper to get course names from course ids
  const getCourseNames = (courseIds) => {
    return courseIds
      .map((id) => {
        const found = courses.find((c) => c.id === id)
        return found ? found.title : id
      })
      .join(', ')
  }

  return (
    <div className="max-w-5xl mx-auto flex flex-col gap-8 pb-20">
      {/* Toast Notification */}
      <Toast message={interventionToast} onClose={() => setInterventionToast('')} />

      {/* Top Breadcrumb */}
      <div className="flex items-center gap-1.5 text-sm text-gray-500">
        <Link to="/teacher/dashboard" className="text-purple-700 font-semibold hover:underline flex items-center gap-1">
          <GraduationCap size={16} /> Educator Portal
        </Link>
        <ChevronRight size={14} />
        <span className="text-gray-800 font-medium">Student Progress Tracking</span>
      </div>

      {/* Accessibility Toolbar */}
      <AccessibilityToolbar />

      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <span className="inline-block bg-purple-50 border border-purple-100 text-purple-700 text-xs font-semibold tracking-widest uppercase px-3 py-1 rounded-full mb-2">
            Roster & Interventions
          </span>
          <h1
            className={`font-extrabold text-gray-900 leading-tight ${
              settings.fontSize === 'large' ? 'text-3xl sm:text-4xl' : 'text-2xl sm:text-3xl'
            }`}
          >
            Student Progress & Accommodations
          </h1>
          <p className="text-gray-600 text-sm sm:text-base mt-1">
            Review individual learner progress, active accessibility accommodations, and trigger academic interventions.
          </p>
        </div>
      </div>

      {/* Search and Filters Bar */}
      <div className="bg-white rounded-2xl border border-gray-200 p-4 sm:p-5 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4">
        {/* Search input */}
        <div className="relative w-full sm:w-80">
          <Search size={17} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search by student name or email..."
            className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
        </div>

        {/* Status filter tabs */}
        <div className="flex items-center gap-1.5 w-full sm:w-auto overflow-x-auto pb-1 sm:pb-0">
          <button
            type="button"
            onClick={() => setStatusFilter('ALL')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-colors whitespace-nowrap ${
              statusFilter === 'ALL'
                ? 'bg-purple-600 text-white'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            All Students ({students.length})
          </button>
          <button
            type="button"
            onClick={() => setStatusFilter('NEEDS_ATTENTION')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-colors whitespace-nowrap flex items-center gap-1.5 ${
              statusFilter === 'NEEDS_ATTENTION'
                ? 'bg-amber-600 text-white'
                : 'bg-amber-50 text-amber-800 hover:bg-amber-100 border border-amber-200'
            }`}
          >
            <AlertTriangle size={13} />
            Needs Attention ({students.filter((s) => s.overallProgress < 50).length})
          </button>
          <button
            type="button"
            onClick={() => setStatusFilter('ON_TRACK')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-colors whitespace-nowrap flex items-center gap-1.5 ${
              statusFilter === 'ON_TRACK'
                ? 'bg-emerald-600 text-white'
                : 'bg-emerald-50 text-emerald-800 hover:bg-emerald-100 border border-emerald-200'
            }`}
          >
            <CheckCircle size={13} />
            On Track ({students.filter((s) => s.overallProgress >= 50).length})
          </button>
        </div>
      </div>

      {/* Main Student Progress Table (Desktop) */}
      <div className="hidden md:block bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-sm">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-purple-50/80 border-b border-purple-100 text-xs font-bold uppercase tracking-wider text-purple-900">
              <th className="py-4 px-5">Student</th>
              <th className="py-4 px-5">Enrolled Subject(s)</th>
              <th className="py-4 px-5">Completion</th>
              <th className="py-4 px-5">Status & Alert</th>
              <th className="py-4 px-5 text-right">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 text-sm">
            {filteredStudents.length === 0 ? (
              <tr>
                <td colSpan={5} className="py-8 text-center text-gray-500">
                  No students found matching your search.
                </td>
              </tr>
            ) : (
              filteredStudents.map((student) => {
                const needsAttention = student.overallProgress < 50
                const isSent = sentInterventions[student.id]

                return (
                  <tr
                    key={student.id}
                    className={`hover:bg-gray-50/80 transition-colors ${
                      needsAttention ? 'bg-amber-50/25' : ''
                    }`}
                  >
                    {/* Student Info */}
                    <td className="py-4 px-5">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-purple-100 text-purple-800 font-bold flex items-center justify-center flex-shrink-0">
                          {student.name.split(' ').map((n) => n[0]).join('')}
                        </div>
                        <div>
                          <p className="font-bold text-gray-900">{student.name}</p>
                          <p className="text-xs text-gray-500">{student.email}</p>
                        </div>
                      </div>
                    </td>

                    {/* Courses */}
                    <td className="py-4 px-5">
                      <span className="text-xs font-medium text-gray-700">
                        {getCourseNames(student.enrolledCourses)}
                      </span>
                    </td>

                    {/* Progress */}
                    <td className="py-4 px-5">
                      <div className="w-32">
                        <div className="flex justify-between text-xs font-bold text-gray-700 mb-1">
                          <span>{student.overallProgress}%</span>
                        </div>
                        <div className="w-full bg-gray-100 rounded-full h-2 overflow-hidden">
                          <div
                            className={`h-2 rounded-full ${
                              needsAttention ? 'bg-amber-500' : 'bg-emerald-500'
                            }`}
                            style={{ width: `${student.overallProgress}%` }}
                          />
                        </div>
                      </div>
                    </td>

                    {/* Status & Intervention Badge */}
                    <td className="py-4 px-5">
                      <div className="flex flex-col gap-1 items-start">
                        {needsAttention ? (
                          <>
                            <span className="inline-flex items-center gap-1.5 text-xs font-bold text-amber-800 bg-amber-100 px-2.5 py-1 rounded-md border border-amber-200">
                              <AlertTriangle size={13} className="text-amber-700 flex-shrink-0" />
                              Needs Attention
                            </span>
                            <span className="text-xs font-bold text-rose-700 bg-rose-50 px-2 py-0.5 rounded border border-rose-200">
                              Intervention Recommended
                            </span>
                          </>
                        ) : (
                          <span className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-800 bg-emerald-100 px-2.5 py-1 rounded-md border border-emerald-200">
                            <CheckCircle size={13} className="text-emerald-700 flex-shrink-0" />
                            On Track
                          </span>
                        )}
                      </div>
                    </td>

                    {/* Actions */}
                    <td className="py-4 px-5 text-right">
                      <button
                        type="button"
                        onClick={() => setSelectedStudent(student)}
                        className="inline-flex items-center gap-1 text-xs font-bold text-purple-700 hover:text-purple-900 border border-purple-200 hover:bg-purple-50 px-3.5 py-2 rounded-xl transition-all focus:outline-none focus:ring-2 focus:ring-purple-500"
                      >
                        View Student
                      </button>
                    </td>
                  </tr>
                )
              })
            )}
          </tbody>
        </table>
      </div>

      {/* Mobile Card List (Mobile Responsive View) */}
      <div className="md:hidden flex flex-col gap-4">
        {filteredStudents.map((student) => {
          const needsAttention = student.overallProgress < 50
          return (
            <div
              key={student.id}
              className={`bg-white rounded-2xl border p-5 shadow-sm flex flex-col gap-4 ${
                needsAttention ? 'border-amber-300 bg-amber-50/20' : 'border-gray-200'
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-purple-100 text-purple-800 font-bold flex items-center justify-center">
                    {student.name.split(' ').map((n) => n[0]).join('')}
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 text-base">{student.name}</h3>
                    <p className="text-xs text-gray-500">{student.email}</p>
                  </div>
                </div>

                {needsAttention ? (
                  <span className="inline-flex items-center gap-1 text-xs font-bold text-amber-800 bg-amber-100 px-2.5 py-0.5 rounded-full">
                    <AlertTriangle size={12} /> Attention
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1 text-xs font-bold text-emerald-800 bg-emerald-100 px-2.5 py-0.5 rounded-full">
                    <CheckCircle size={12} /> On Track
                  </span>
                )}
              </div>

              <div>
                <p className="text-xs text-gray-500 mb-1">
                  Courses: <span className="font-semibold text-gray-700">{getCourseNames(student.enrolledCourses)}</span>
                </p>
                <div className="flex justify-between text-xs font-bold text-gray-700 mb-1">
                  <span>Progress</span>
                  <span>{student.overallProgress}%</span>
                </div>
                <div className="w-full bg-gray-100 rounded-full h-2 overflow-hidden">
                  <div
                    className={`h-2 rounded-full ${
                      needsAttention ? 'bg-amber-500' : 'bg-emerald-500'
                    }`}
                    style={{ width: `${student.overallProgress}%` }}
                  />
                </div>
              </div>

              {needsAttention && (
                <div className="bg-rose-50 border border-rose-200 text-rose-800 text-xs font-bold p-2.5 rounded-xl flex items-center gap-2">
                  <AlertTriangle size={14} className="flex-shrink-0" />
                  Intervention Recommended (&lt;50% progress)
                </div>
              )}

              <button
                type="button"
                onClick={() => setSelectedStudent(student)}
                className="w-full py-2.5 border border-purple-200 text-purple-700 font-bold text-xs rounded-xl hover:bg-purple-50 transition-colors"
              >
                View Full Student Dossier
              </button>
            </div>
          )
        })}
      </div>

      {/* Student Detail Modal */}
      {selectedStudent && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-student-name"
          className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto"
        >
          <div className="bg-white rounded-3xl max-w-xl w-full p-6 sm:p-8 shadow-2xl border border-gray-100 flex flex-col gap-6 relative animate-in fade-in zoom-in-95 duration-150">
            {/* Close Button */}
            <button
              type="button"
              onClick={() => setSelectedStudent(null)}
              className="absolute top-5 right-5 text-gray-400 hover:text-gray-600 focus:outline-none focus:ring-2 focus:ring-purple-500 rounded-full p-1"
              aria-label="Close modal"
            >
              <X size={20} />
            </button>

            {/* Modal Header */}
            <div className="flex items-start gap-4 pr-8">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-purple-600 to-indigo-600 text-white font-bold text-xl flex items-center justify-center flex-shrink-0 shadow-md">
                {selectedStudent.name.split(' ').map((n) => n[0]).join('')}
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h2 id="modal-student-name" className="text-xl font-extrabold text-gray-900">
                    {selectedStudent.name}
                  </h2>
                  {selectedStudent.overallProgress < 50 ? (
                    <span className="text-xs font-bold text-amber-800 bg-amber-100 px-2 py-0.5 rounded border border-amber-200">
                      Needs Attention
                    </span>
                  ) : (
                    <span className="text-xs font-bold text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded border border-emerald-200">
                      On Track
                    </span>
                  )}
                </div>
                <p className="text-xs text-gray-500 mt-0.5">{selectedStudent.email}</p>
                <p className="text-xs text-gray-400 mt-1 flex items-center gap-1">
                  <Calendar size={12} /> Joined on {selectedStudent.joinedAt}
                </p>
              </div>
            </div>

            {/* Accessibility Profile Box */}
            <div className="bg-purple-50/60 border border-purple-100 rounded-2xl p-4 flex flex-col gap-2">
              <span className="text-xs font-bold uppercase tracking-wider text-purple-900">
                Active Accessibility Needs
              </span>
              <div className="flex flex-wrap gap-2">
                {selectedStudent.accessibilityNeeds.map((need) => {
                  const info = a11yBadgeMap[need] || {
                    label: need,
                    icon: CheckCircle,
                    color: 'bg-gray-100 text-gray-700 border-gray-200',
                  }
                  const Icon = info.icon
                  return (
                    <span
                      key={need}
                      className={`text-xs font-semibold px-3 py-1 rounded-full border flex items-center gap-1.5 ${info.color}`}
                    >
                      <Icon size={12} />
                      {info.label}
                    </span>
                  )
                })}
              </div>
            </div>

            {/* Performance Stats Grid */}
            {(() => {
              const details =
                mockStudentDetails[selectedStudent.id] || mockStudentDetails['student-001']
              return (
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  <div className="bg-gray-50 rounded-xl p-3 border border-gray-100">
                    <span className="text-xs text-gray-500 font-medium block">Overall Progress</span>
                    <span className="text-lg font-black text-purple-700">
                      {selectedStudent.overallProgress}%
                    </span>
                  </div>

                  <div className="bg-gray-50 rounded-xl p-3 border border-gray-100">
                    <span className="text-xs text-gray-500 font-medium block">Lessons Done</span>
                    <span className="text-lg font-black text-gray-900">
                      {details.completedLessons} / {details.totalLessons}
                    </span>
                  </div>

                  <div className="bg-gray-50 rounded-xl p-3 border border-gray-100">
                    <span className="text-xs text-gray-500 font-medium block">Quiz Avg</span>
                    <span className="text-lg font-black text-emerald-600">
                      {details.quizAverage}
                    </span>
                  </div>

                  <div className="bg-gray-50 rounded-xl p-3 border border-gray-100">
                    <span className="text-xs text-gray-500 font-medium block">Last Active</span>
                    <span className="text-xs font-bold text-gray-800 line-clamp-1 mt-1">
                      {details.lastActive}
                    </span>
                  </div>
                </div>
              )
            })()}

            {/* Teacher Notes & Pedagogical Insight */}
            <div className="bg-gray-50 rounded-2xl p-4 border border-gray-100">
              <span className="text-xs font-bold uppercase tracking-wider text-gray-500 block mb-1">
                Pedagogical Assessment
              </span>
              <p className="text-xs sm:text-sm text-gray-700 leading-relaxed">
                {(mockStudentDetails[selectedStudent.id] || mockStudentDetails['student-001']).notes}
              </p>
            </div>

            {/* Intervention Action Area */}
            <div className="border-t border-gray-100 pt-4 flex flex-col gap-3">
              <label htmlFor="intervention-note" className="text-xs font-bold uppercase tracking-wider text-gray-700">
                Send Direct Intervention / Support Note
              </label>
              <textarea
                id="intervention-note"
                rows={2}
                value={customNote}
                onChange={(e) => setCustomNote(e.target.value)}
                placeholder="Add an encouraging note or specify which simplified review module to highlight..."
                className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-xs text-gray-900 focus:outline-none focus:ring-2 focus:ring-purple-500"
              />

              <div className="flex items-center justify-between gap-3">
                <button
                  type="button"
                  onClick={() => setSelectedStudent(null)}
                  className="text-xs font-bold text-gray-500 hover:text-gray-700 px-3 py-2"
                >
                  Close
                </button>

                <button
                  type="button"
                  onClick={() => handleSendIntervention(selectedStudent)}
                  className="inline-flex items-center gap-2 bg-purple-600 hover:bg-purple-700 text-white font-bold text-sm px-6 py-2.5 rounded-xl shadow-md transition-all active:scale-95 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
                >
                  <Send size={14} />
                  {sentInterventions[selectedStudent.id] ? 'Send Follow-up Intervention' : 'Send Intervention'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
