// src/pages/teacher/TeacherDashboard.jsx
import { Link } from 'react-router-dom'
import students from '../../data/students'

export default function TeacherDashboard() {
  return (
    <div>
      <h1 className="text-2xl font-bold text-indigo-700 mb-1">Teacher Dashboard</h1>
      <p className="text-sm text-gray-500 mb-6">Route: /teacher/dashboard · Analytics and class management — Phase 5+.</p>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
        {students.map(s => (
          <div key={s.id} className="bg-white rounded-xl shadow p-5">
            <p className="font-semibold text-gray-800 mb-1">{s.name}</p>
            <div className="w-full bg-gray-100 rounded-full h-2 mb-1">
              <div
                className="bg-emerald-500 h-2 rounded-full"
                style={{ width: `${s.overallProgress}%` }}
              />
            </div>
            <p className="text-xs text-gray-500">{s.overallProgress}% overall</p>
          </div>
        ))}
      </div>

      <div className="flex gap-3 flex-wrap">
        <Link to="/teacher/course/create" className="bg-indigo-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-indigo-700 transition-colors">
          + Create Course
        </Link>
        <Link to="/teacher/students" className="border border-indigo-600 text-indigo-600 px-4 py-2 rounded-lg text-sm font-medium hover:bg-indigo-50 transition-colors">
          View All Students
        </Link>
      </div>
    </div>
  )
}
