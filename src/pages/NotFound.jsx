// src/pages/NotFound.jsx
import { Link } from 'react-router-dom'

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center gap-4">
      <p className="text-6xl font-extrabold text-indigo-200">404</p>
      <h1 className="text-2xl font-bold text-gray-700">Page Not Found</h1>
      <p className="text-gray-500 text-sm">This route doesn't exist yet.</p>
      <Link to="/" className="bg-indigo-600 text-white px-5 py-2 rounded-lg text-sm font-medium hover:bg-indigo-700 transition-colors">
        Back to Home
      </Link>
    </div>
  )
}
