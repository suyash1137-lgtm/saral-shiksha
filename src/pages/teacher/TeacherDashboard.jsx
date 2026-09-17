// src/pages/teacher/TeacherDashboard.jsx
import { useState } from 'react'
import { Link } from 'react-router-dom'
import {
  Users,
  BookOpen,
  FileText,
  AlertTriangle,
  ArrowRight,
  PlusCircle,
  CheckCircle,
  GraduationCap,
  Sparkles,
  ChevronRight,
  Send,
  Eye,
  Ear,
  Brain
} from 'lucide-react'
import { useAuth } from '../../context/AuthContext'
import { useAccessibility } from '../../context/AccessibilityContext'
import students from '../../data/students'
import courses from '../../data/courses'
import AccessibilityToolbar from '../../components/AccessibilityToolbar'

const a11yIconMap = {
  readAloud: { label: 'Read Aloud', icon: Eye, color: 'bg-blue-100 text-blue-700' },
  highContrast: { label: 'High Contrast', icon: Eye, color: 'bg-amber-100 text-amber-700' },
  captions: { label: 'Captions', icon: Ear, color: 'bg-emerald-100 text-emerald-700' },
  simpleLanguage: { label: 'Simple Language', icon: Brain, color: 'bg-purple-100 text-purple-700' },
}

export default function TeacherDashboard() {
  const { user } = useAuth()
  const { settings } = useAccessibility()
  const [sentAlerts, setSentAlerts] = useState({})
  const [toastMsg, setToastMsg] = useState('')

  // Compute metrics
  const totalStudents = students.length
  const totalCourses = courses.length
  const totalLessons = courses.reduce((sum, c) => sum + (c.totalLessons || 10), 0)

  // Intervention threshold: < 50%
  const flaggedStudents = students.filter(s => s.overallProgress < 50)
  const interventionCount = flaggedStudents.length

  const handleQuickIntervene = (student) => {
    setSentAlerts(prev => ({ ...prev, [student.id]: true }))
    setToastMsg(`Intervention sent to ${student.name}: Learning support guide dispatched!`)
    setTimeout(() => setToastMsg(''), 4000)
  }

  return (
    <div className="max-w-5xl mx-auto flex flex-col gap-8 pb-20">
      {/* Toast alert */}
      {toastMsg && (
        <div
          role="status"
          className="fixed bottom-6 right-6 z-50 bg-purple-900 text-white px-5 py-3.5 rounded-2xl shadow-xl flex items-center gap-3 border border-purple-700 animate-bounce"
        >
          <CheckCircle size={20} className="text-emerald-400 flex-shrink-0" />
          <span className="text-sm font-semibold">{toastMsg}</span>
        </div>
      )}

      {/* Top Breadcrumb */}
      <div className="flex items-center gap-1.5 text-sm text-gray-500">
        <span className="text-purple-700 font-semibold flex items-center gap-1">
          <GraduationCap size={16} /> Educator Portal
        </span>
        <ChevronRight size={14} />
        <span className="text-gray-800 font-medium">Dashboard</span>
      </div>

      {/* Accessibility Toolbar */}
      <AccessibilityToolbar />

      {/* Welcome Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <span className="inline-block bg-purple-50 border border-purple-100 text-purple-700 text-xs font-semibold tracking-widest uppercase px-3 py-1 rounded-full mb-2">
            Educator Workspace
          </span>
          <h1
            className={`font-extrabold text-gray-900 leading-tight ${
              settings.fontSize === 'large' ? 'text-3xl sm:text-4xl' : 'text-2xl sm:text-3xl'
            }`}
          >
            Welcome, {user?.name || 'Prof. Sharma'} 👋
          </h1>
          <p className="text-gray-600 text-sm sm:text-base mt-1">
            Monitor student accessibility profiles, intervention alerts, and inclusive course design.
          </p>
        </div>

        {/* Quick action buttons */}
        <div className="flex flex-wrap items-center gap-3 self-start sm:self-auto">
          <Link
            to="/teacher/course/create"
            className="inline-flex items-center gap-2 bg-purple-600 hover:bg-purple-700 text-white font-bold text-sm px-5 py-3 rounded-xl shadow-sm hover:shadow active:scale-95 transition-all focus:outline-none focus:ring-2 focus:ring-purple-600 focus:ring-offset-2"
          >
            <PlusCircle size={17} aria-hidden="true" />
            Create Course
          </Link>
          <Link
            to="/teacher/students"
            className="inline-flex items-center gap-2 bg-white border-2 border-purple-200 hover:border-purple-300 text-purple-700 font-semibold text-sm px-5 py-3 rounded-xl hover:bg-purple-50 transition-all focus:outline-none focus:ring-2 focus:ring-purple-600"
          >
            <Users size={17} aria-hidden="true" />
            View Students
          </Link>
        </div>
      </div>

      {/* 4 Overview Stat Cards */}
      <section aria-labelledby="teacher-stats-heading">
        <h2 id="teacher-stats-heading" className="sr-only">
          Teacher Overview Metrics
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Total Students */}
          <div className="bg-white rounded-2xl border border-gray-200 p-5 shadow-sm flex flex-col justify-between">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-gray-500">
                Enrolled Students
              </span>
              <div className="w-9 h-9 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center">
                <Users size={18} />
              </div>
            </div>
            <div className="mt-4">
              <span className="text-3xl font-black text-gray-900">{totalStudents}</span>
              <p className="text-xs text-gray-500 mt-1">All accessibility profiles active</p>
            </div>
          </div>

          {/* Total Courses */}
          <div className="bg-white rounded-2xl border border-gray-200 p-5 shadow-sm flex flex-col justify-between">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-gray-500">
                Published Courses
              </span>
              <div className="w-9 h-9 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
                <BookOpen size={18} />
              </div>
            </div>
            <div className="mt-4">
              <span className="text-3xl font-black text-gray-900">{totalCourses}</span>
              <p className="text-xs text-blue-600 font-medium mt-1">Adaptive content enabled</p>
            </div>
          </div>

          {/* Total Lessons */}
          <div className="bg-white rounded-2xl border border-gray-200 p-5 shadow-sm flex flex-col justify-between">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-gray-500">
                Total Lessons
              </span>
              <div className="w-9 h-9 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center">
                <FileText size={18} />
              </div>
            </div>
            <div className="mt-4">
              <span className="text-3xl font-black text-gray-900">{totalLessons}</span>
              <p className="text-xs text-indigo-600 font-medium mt-1">Normal + Simplified paired</p>
            </div>
          </div>

          {/* Intervention Alerts */}
          <div className="bg-white rounded-2xl border-2 border-amber-200 p-5 shadow-sm flex flex-col justify-between bg-amber-50/40">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-amber-800">
                Intervention Alerts
              </span>
              <div className="w-9 h-9 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center">
                <AlertTriangle size={18} />
              </div>
            </div>
            <div className="mt-4">
              <div className="flex items-baseline gap-2">
                <span className="text-3xl font-black text-amber-800">{interventionCount}</span>
                <span className="text-xs font-bold text-amber-700 bg-amber-100 px-2 py-0.5 rounded">
                  Requires Attention
                </span>
              </div>
              <p className="text-xs text-amber-800 mt-1 font-medium">Students falling behind (&lt;50%)</p>
            </div>
          </div>
        </div>
      </section>

      {/* Flagged Students: Intervention Alert Highlight Section */}
      {flaggedStudents.length > 0 && (
        <section aria-labelledby="alerts-heading">
          <div className="bg-gradient-to-r from-amber-50 to-orange-50 border-2 border-amber-300 rounded-2xl p-6 shadow-sm">
            <div className="flex items-start gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-amber-500 text-white flex items-center justify-center flex-shrink-0 mt-0.5">
                <AlertTriangle size={22} />
              </div>
              <div>
                <h2 id="alerts-heading" className="text-lg font-bold text-amber-950">
                  Intervention Alert: {flaggedStudents.length} Student Needs Academic Support
                </h2>
                <p className="text-sm text-amber-800 mt-0.5">
                  The automated tracking system detects a student struggling with pace or course completion threshold.
                </p>
              </div>
            </div>

            <div className="flex flex-col gap-3">
              {flaggedStudents.map((student) => {
                const isSent = sentAlerts[student.id]
                return (
                  <div
                    key={student.id}
                    className="bg-white rounded-xl border border-amber-200 p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-full bg-amber-100 text-amber-800 font-bold text-base flex items-center justify-center flex-shrink-0">
                        {student.name.split(' ').map(n => n[0]).join('')}
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-gray-900 text-base">{student.name}</span>
                          <span className="text-xs font-bold text-rose-700 bg-rose-50 border border-rose-200 px-2 py-0.5 rounded-md">
                            Progress: {student.overallProgress}%
                          </span>
                        </div>
                        <p className="text-xs text-gray-500 mt-0.5">{student.email}</p>
                        <div className="flex flex-wrap items-center gap-1.5 mt-2">
                          <span className="text-xs text-gray-500 font-medium">Needs:</span>
                          {student.accessibilityNeeds.map((need) => {
                            const info = a11yIconMap[need] || { label: need, color: 'bg-gray-100 text-gray-700' }
                            return (
                              <span
                                key={need}
                                className={`text-xs font-semibold px-2 py-0.5 rounded-full ${info.color}`}
                              >
                                {info.label}
                              </span>
                            )
                          })}
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 self-end sm:self-center">
                      <Link
                        to="/teacher/students"
                        className="text-xs font-bold text-indigo-600 hover:text-indigo-800 hover:underline px-3 py-2"
                      >
                        View Profile
                      </Link>
                      <button
                        type="button"
                        disabled={isSent}
                        onClick={() => handleQuickIntervene(student)}
                        className={`inline-flex items-center gap-2 text-xs font-bold px-4 py-2.5 rounded-xl transition-all ${
                          isSent
                            ? 'bg-emerald-100 text-emerald-800 cursor-default'
                            : 'bg-amber-500 hover:bg-amber-600 text-white shadow-sm active:scale-95'
                        }`}
                      >
                        <Send size={13} />
                        {isSent ? 'Intervention Sent ✓' : 'Send Intervention'}
                      </button>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </section>
      )}

      {/* Class Roster Summary Table */}
      <section aria-labelledby="class-roster-heading">
        <div className="flex items-center justify-between mb-4">
          <h2
            id="class-roster-heading"
            className={`font-bold text-gray-900 ${
              settings.fontSize === 'large' ? 'text-2xl' : 'text-xl'
            }`}
          >
            Class Overview
          </h2>
          <Link
            to="/teacher/students"
            className="text-sm font-semibold text-purple-700 hover:underline inline-flex items-center gap-1"
          >
            Detailed Roster Table <ArrowRight size={15} />
          </Link>
        </div>

        <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-sm">
          <div className="divide-y divide-gray-100">
            {students.map((s) => {
              const needsAttention = s.overallProgress < 50
              return (
                <div
                  key={s.id}
                  className="p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-gray-50/60 transition-colors"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-purple-100 text-purple-800 font-bold text-sm flex items-center justify-center flex-shrink-0">
                      {s.name.split(' ').map(n => n[0]).join('')}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-gray-900 text-sm">{s.name}</span>
                        {needsAttention ? (
                          <span className="inline-flex items-center gap-1 text-xs font-bold text-amber-800 bg-amber-100 px-2 py-0.5 rounded-full">
                            <AlertTriangle size={11} /> Needs Attention
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 text-xs font-bold text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded-full">
                            <CheckCircle size={11} /> On Track
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-gray-500 mt-0.5">{s.email}</p>
                    </div>
                  </div>

                  {/* Progress bar */}
                  <div className="flex items-center gap-4 min-w-[200px]">
                    <div className="flex-1">
                      <div className="flex justify-between text-xs font-semibold text-gray-600 mb-1">
                        <span>Completion</span>
                        <span>{s.overallProgress}%</span>
                      </div>
                      <div className="w-full bg-gray-100 rounded-full h-2 overflow-hidden">
                        <div
                          className={`h-2 rounded-full ${
                            needsAttention ? 'bg-amber-500' : 'bg-emerald-500'
                          }`}
                          style={{ width: `${s.overallProgress}%` }}
                        />
                      </div>
                    </div>

                    <Link
                      to={`/teacher/students?student=${s.id}`}
                      className="text-xs font-semibold text-purple-700 hover:text-purple-900 border border-purple-200 hover:bg-purple-50 px-3 py-1.5 rounded-lg transition-colors flex-shrink-0"
                    >
                      Report
                    </Link>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Quick Access Grid */}
      <section aria-labelledby="quick-access-heading">
        <h2 id="quick-access-heading" className="sr-only">Quick Actions</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Link
            to="/teacher/course/create"
            className="bg-white border-2 border-purple-100 hover:border-purple-300 rounded-2xl p-6 shadow-sm hover:shadow transition-all group flex items-start gap-4"
          >
            <div className="w-12 h-12 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center group-hover:scale-105 transition-transform flex-shrink-0">
              <PlusCircle size={24} />
            </div>
            <div>
              <h3 className="font-bold text-gray-900 text-base group-hover:text-purple-700 transition-colors">
                Create Adaptive Course
              </h3>
              <p className="text-xs text-gray-500 mt-1 leading-relaxed">
                Author new lessons with side-by-side Normal and Simplified content, visual tags, and accessibility notes.
              </p>
            </div>
          </Link>

          <Link
            to="/teacher/students"
            className="bg-white border-2 border-indigo-100 hover:border-indigo-300 rounded-2xl p-6 shadow-sm hover:shadow transition-all group flex items-start gap-4"
          >
            <div className="w-12 h-12 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center group-hover:scale-105 transition-transform flex-shrink-0">
              <Users size={24} />
            </div>
            <div>
              <h3 className="font-bold text-gray-900 text-base group-hover:text-indigo-700 transition-colors">
                View Student Progress Reports
              </h3>
              <p className="text-xs text-gray-500 mt-1 leading-relaxed">
                Inspect individual quiz scores, learning accommodation flags, and dispatch personalized interventions.
              </p>
            </div>
          </Link>
        </div>
      </section>
    </div>
  )
}
