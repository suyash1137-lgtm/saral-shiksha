// src/pages/Home.jsx
import { Link } from 'react-router-dom'
import { BookOpen, Eye, Ear, Brain } from 'lucide-react'

const pillars = [
  { Icon: Eye,     label: 'Visual',    color: 'bg-blue-100 text-blue-700' },
  { Icon: Ear,     label: 'Hearing',   color: 'bg-green-100 text-green-700' },
  { Icon: Brain,   label: 'Cognitive', color: 'bg-purple-100 text-purple-700' },
]

export default function Home() {
  return (
    <div className="flex flex-col items-center text-center py-16 gap-8">
      <div className="flex items-center gap-3 text-indigo-700">
        <BookOpen size={40} />
        <h1 className="text-4xl font-extrabold">Saral Shiksha</h1>
      </div>

      <p className="text-xl text-gray-500 italic">"Learning that adapts to every student."</p>

      <p className="text-gray-600 max-w-xl">
        An accessible, personalized learning platform built for students with visual,
        hearing, and cognitive/learning difficulties.
      </p>

      <div className="flex gap-4 flex-wrap justify-center">
        {pillars.map(({ Icon, label, color }) => (
          <div key={label} className={`flex items-center gap-2 px-5 py-2.5 rounded-full font-medium text-sm ${color}`}>
            <Icon size={18} />
            {label} Accessibility
          </div>
        ))}
      </div>

      <div className="flex gap-4 flex-wrap justify-center mt-4">
        <Link to="/signup"
          className="bg-indigo-600 text-white px-6 py-2.5 rounded-lg font-semibold hover:bg-indigo-700 transition-colors">
          Get Started
        </Link>
        <Link to="/login"
          className="border border-indigo-600 text-indigo-600 px-6 py-2.5 rounded-lg font-semibold hover:bg-indigo-50 transition-colors">
          Log In
        </Link>
      </div>

      <p className="text-xs text-gray-400 mt-8 font-mono">Route: / — Full content in Phase 2+</p>
    </div>
  )
}
