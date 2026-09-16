// src/pages/teacher/Students.jsx
import students from '../../data/students'

export default function Students() {
  return (
    <div>
      <h1 className="text-2xl font-bold text-indigo-700 mb-1">All Students</h1>
      <p className="text-sm text-gray-500 mb-6">Route: /teacher/students · Search, filter, and per-student reports — Phase 5+.</p>

      <div className="bg-white rounded-xl shadow overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-indigo-50">
            <tr>
              <th className="text-left px-5 py-3 font-semibold text-indigo-700">Name</th>
              <th className="text-left px-5 py-3 font-semibold text-indigo-700">Email</th>
              <th className="text-left px-5 py-3 font-semibold text-indigo-700">Progress</th>
              <th className="text-left px-5 py-3 font-semibold text-indigo-700">Accessibility Needs</th>
            </tr>
          </thead>
          <tbody>
            {students.map((s, i) => (
              <tr key={s.id} className={i % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                <td className="px-5 py-3 font-medium text-gray-800">{s.name}</td>
                <td className="px-5 py-3 text-gray-500">{s.email}</td>
                <td className="px-5 py-3">
                  <div className="flex items-center gap-2">
                    <div className="w-24 bg-gray-200 rounded-full h-1.5">
                      <div className="bg-emerald-500 h-1.5 rounded-full" style={{ width: `${s.overallProgress}%` }} />
                    </div>
                    <span className="font-semibold text-gray-700">{s.overallProgress}%</span>
                  </div>
                </td>
                <td className="px-5 py-3">
                  <div className="flex flex-wrap gap-1">
                    {s.accessibilityNeeds.map(n => (
                      <span key={n} className="bg-purple-100 text-purple-700 text-xs px-2 py-0.5 rounded">{n}</span>
                    ))}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
