// src/components/landing/ForStudentsSection.jsx
import { CircleCheck } from 'lucide-react'
import SectionHeader from './SectionHeader'

const benefits = [
  'Lessons tailored to your accessibility profile',
  'Read-aloud for every piece of text content',
  'Video captions and full transcripts',
  'Simple language mode for cognitive clarity',
  'Short, focused sections — no information overload',
  'Track your own progress at a glance',
  'Accessible quizzes with clear, large controls',
  'Learn at your own pace — no time pressure',
]

export default function ForStudentsSection() {
  return (
    <section aria-labelledby="students-heading" className="bg-indigo-50 py-20 px-4">
      <div className="container mx-auto max-w-5xl flex flex-col md:flex-row gap-12 items-center">
        {/* Left text */}
        <div className="flex-1 flex flex-col gap-6">
          <SectionHeader
            badge="For Students"
            heading="A platform that works for you."
            description="Whether you have a visual, hearing, or cognitive accessibility need — or simply prefer a different way of learning — Saral Shiksha meets you where you are."
            center={false}
          />

          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {benefits.map((b) => (
              <li key={b} className="flex items-start gap-2.5 text-sm text-gray-700">
                <CircleCheck
                  size={18}
                  className="text-emerald-500 flex-shrink-0 mt-0.5"
                  aria-hidden="true"
                />
                {b}
              </li>
            ))}
          </ul>
        </div>

        {/* Right illustration card */}
        <div className="flex-1 max-w-sm w-full">
          <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-8 flex flex-col gap-5">
            <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
              <div className="h-full w-2/3 bg-emerald-400 rounded-full" />
            </div>
            <p className="text-xs text-gray-400 font-medium">Course Progress — 67%</p>

            {/* Fake lesson list */}
            {['Introduction to Algebra', 'Fractions Made Simple', 'Geometry Basics'].map(
              (lesson, i) => (
                <div
                  key={lesson}
                  className={`flex items-center gap-3 p-3 rounded-xl border ${
                    i === 0
                      ? 'border-emerald-200 bg-emerald-50'
                      : i === 1
                      ? 'border-indigo-200 bg-indigo-50'
                      : 'border-gray-100 bg-gray-50'
                  }`}
                >
                  <span
                    className={`w-2 h-2 rounded-full flex-shrink-0 ${
                      i === 0 ? 'bg-emerald-400' : i === 1 ? 'bg-indigo-400' : 'bg-gray-300'
                    }`}
                    aria-hidden="true"
                  />
                  <span className="text-sm font-medium text-gray-700">{lesson}</span>
                </div>
              )
            )}

            <div className="mt-2 flex gap-2 flex-wrap">
              {['Large Text', 'High Contrast', 'Captions'].map((tag) => (
                <span
                  key={tag}
                  className="bg-indigo-100 text-indigo-700 text-xs font-semibold px-3 py-1 rounded-full"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
