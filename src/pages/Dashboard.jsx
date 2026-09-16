// src/pages/Dashboard.jsx
import { Link } from 'react-router-dom'
import courses from '../data/courses'

export default function Dashboard() {
  return (
    <div>
      <h1 className="text-2xl font-bold text-indigo-700 mb-1">Student Dashboard</h1>
      <p className="text-sm text-gray-500 mb-6">Route: /dashboard · Full widgets coming in a later phase.</p>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
        {courses.map(c => (
          <div key={c.id} className="bg-white rounded-xl shadow p-5">
            <p className="font-semibold text-gray-800 mb-1">{c.title}</p>
            <div className="w-full bg-gray-100 rounded-full h-2 mb-1">
              <div
                className="bg-indigo-500 h-2 rounded-full transition-all"
                style={{ width: `${c.progress}%` }}
              />
            </div>
            <p className="text-xs text-gray-500">{c.progress}% complete</p>
          </div>
        ))}
      </div>

      <div className="bg-indigo-50 rounded-xl p-6 text-center text-indigo-700 font-medium">
        Full dashboard with AI recommendations, streaks, and analytics — Phase 2+
      </div>

      <div className="mt-4 flex gap-3 flex-wrap">
        <Link to="/courses" className="text-sm text-indigo-600 hover:underline">Browse Courses →</Link>
        <Link to="/progress" className="text-sm text-indigo-600 hover:underline">View Progress →</Link>
      </div>
    </div>
  )
}
