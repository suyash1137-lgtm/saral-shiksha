// src/pages/Progress.jsx
import courses from '../data/courses'

export default function Progress() {
  const avg = Math.round(courses.reduce((s, c) => s + c.progress, 0) / courses.length)

  return (
    <div>
      <h1 className="text-2xl font-bold text-indigo-700 mb-1">My Progress</h1>
      <p className="text-sm text-gray-500 mb-6">Route: /progress · Charts and streaks coming in a later phase.</p>

      <div className="bg-white rounded-xl shadow p-6 mb-6 flex flex-col items-center gap-2">
        <p className="text-sm text-gray-500">Overall Average</p>
        <p className="text-5xl font-extrabold text-indigo-600">{avg}%</p>
      </div>

      <div className="space-y-4">
        {courses.map(c => (
          <div key={c.id} className="bg-white rounded-xl shadow p-5">
            <div className="flex justify-between mb-2">
              <span className="font-semibold text-gray-800">{c.title}</span>
              <span className="text-sm text-indigo-600 font-bold">{c.progress}%</span>
            </div>
            <div className="w-full bg-gray-100 rounded-full h-3">
              <div className="bg-indigo-500 h-3 rounded-full transition-all" style={{ width: `${c.progress}%` }} />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
