// src/components/landing/ProblemSection.jsx
import { AlertTriangle, Type, Contrast, Volume2, Subtitles, BookOpen, Clock } from 'lucide-react'
import SectionHeader from './SectionHeader'

const problems = [
  { Icon: Type,       label: 'Small, hard-to-read text' },
  { Icon: Contrast,   label: 'Low contrast & poor color choices' },
  { Icon: Volume2,    label: 'Audio-only content, no visuals' },
  { Icon: Subtitles,  label: 'Videos without captions' },
  { Icon: BookOpen,   label: 'Complicated language & long paragraphs' },
  { Icon: Clock,      label: 'Information overload with no pacing' },
]

export default function ProblemSection() {
  return (
    <section aria-labelledby="problem-heading" className="bg-white py-20 px-4">
      <div className="container mx-auto flex flex-col items-center gap-12">
        <SectionHeader
          badge="The Problem"
          heading="One size doesn't fit all."
          description="Most e-learning platforms give every student the exact same experience — regardless of their visual, hearing, or cognitive needs. The result? Millions of students silently struggle."
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 w-full max-w-4xl">
          {problems.map(({ Icon, label }) => (
            <div
              key={label}
              className="flex items-center gap-3 bg-red-50 border border-red-100 rounded-xl px-5 py-4"
            >
              <span className="text-red-400 flex-shrink-0" aria-hidden="true">
                <Icon size={20} />
              </span>
              <span className="text-sm font-medium text-red-800">{label}</span>
            </div>
          ))}
        </div>

        {/* Callout banner */}
        <div className="w-full max-w-3xl bg-amber-50 border border-amber-200 rounded-2xl px-8 py-6 flex items-start gap-4">
          <AlertTriangle size={24} className="text-amber-500 flex-shrink-0 mt-0.5" aria-hidden="true" />
          <p className="text-amber-900 text-sm sm:text-base leading-relaxed">
            <span className="font-bold">15% of the world's population</span> lives with some form
            of disability. In India alone, that's over 26 million students who deserve learning tools
            built for their needs — not despite them.
          </p>
        </div>
      </div>
    </section>
  )
}
