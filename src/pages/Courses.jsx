// src/pages/Courses.jsx
import courses from '../data/courses'

const levelColor = { Beginner: 'bg-green-100 text-green-700', Intermediate: 'bg-yellow-100 text-yellow-700', Advanced: 'bg-red-100 text-red-700' }

export default function Courses() {
  return (
    <div>
      <h1 className="text-2xl font-bold text-indigo-700 mb-1">Courses</h1>
      <p className="text-sm text-gray-500 mb-6">Route: /courses · Full enroll flow coming in a later phase.</p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {courses.map(c => (
          <div key={c.id} className="bg-white rounded-xl shadow p-5 flex flex-col gap-3">
            <div className="flex items-start justify-between">
              <h2 className="font-bold text-gray-800">{c.title}</h2>
              <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${levelColor[c.level] ?? 'bg-gray-100 text-gray-600'}`}>
                {c.level}
              </span>
            </div>
            <p className="text-sm text-gray-500 flex-1">{c.description}</p>
            <div>
              <div className="flex justify-between text-xs text-gray-400 mb-1">
                <span>Progress</span><span>{c.progress}%</span>
              </div>
              <div className="w-full bg-gray-100 rounded-full h-2">
                <div className="bg-indigo-500 h-2 rounded-full" style={{ width: `${c.progress}%` }} />
              </div>
            </div>
            <div className="flex flex-wrap gap-1">
              {c.tags.map(t => (
                <span key={t} className="text-xs bg-indigo-50 text-indigo-500 px-2 py-0.5 rounded">{t}</span>
              ))}
            </div>
            <button className="mt-1 bg-indigo-600 text-white text-sm py-2 rounded-lg hover:bg-indigo-700 transition-colors">
              Continue Learning
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}
