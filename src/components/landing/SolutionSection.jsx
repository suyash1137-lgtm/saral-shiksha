// src/components/landing/SolutionSection.jsx
import { CheckCircle, Settings, Zap } from 'lucide-react'
import SectionHeader from './SectionHeader'

const pillars = [
  {
    Icon: Settings,
    title: 'Accessibility Profile',
    desc: 'Every student sets up their own accessibility preferences once — larger text, high contrast, captions, read-aloud, and more. The platform remembers them forever.',
  },
  {
    Icon: Zap,
    title: 'Adaptive Interface',
    desc: 'The entire UI — fonts, colors, layout, and controls — responds instantly to a student\'s profile. No reloads, no settings buried in menus.',
  },
  {
    Icon: CheckCircle,
    title: 'Adaptive Content',
    desc: 'Lessons are delivered in the format that suits the learner — simplified language, short focused sections, visual aids, audio narration, or captions.',
  },
]

export default function SolutionSection() {
  return (
    <section
      aria-labelledby="solution-heading"
      className="bg-indigo-700 py-20 px-4"
    >
      <div className="container mx-auto flex flex-col items-center gap-12">
        <SectionHeader
          badge="Our Solution"
          heading="Learning that truly adapts."
          description="Saral Shiksha puts the student first. Every lesson, every interface, every interaction — personalised to the needs of each individual learner."
          light
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-5xl">
          {pillars.map(({ Icon, title, desc }) => (
            <div
              key={title}
              className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-6 flex flex-col gap-4"
            >
              <div className="w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center">
                <Icon size={24} className="text-white" aria-hidden="true" />
              </div>
              <h3 className="text-lg font-bold text-white">{title}</h3>
              <p className="text-sm text-indigo-100 leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
