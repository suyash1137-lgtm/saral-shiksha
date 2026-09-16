// src/components/landing/FutureVisionSection.jsx
import { Sparkles, Globe2, HandMetal, WifiOff } from 'lucide-react'
import SectionHeader from './SectionHeader'

const roadmapItems = [
  {
    Icon: Sparkles,
    title: 'AI Personalisation',
    desc: 'Lessons that adapt in real-time based on how a student performs — delivering harder content when ready, simpler content when struggling.',
    status: 'In Development',
    statusColor: 'bg-indigo-100 text-indigo-700',
  },
  {
    Icon: Globe2,
    title: 'Multiple Indian Languages',
    desc: 'Full support for Hindi, Tamil, Telugu, Bengali, Marathi, and more — so language is never a barrier to learning.',
    status: 'Coming Soon',
    statusColor: 'bg-amber-100 text-amber-700',
  },
  {
    Icon: HandMetal,
    title: 'Sign Language Support',
    desc: 'Video-based sign language explanations alongside every lesson, making content fully accessible for Deaf learners.',
    status: 'Planned',
    statusColor: 'bg-purple-100 text-purple-700',
  },
  {
    Icon: WifiOff,
    title: 'Offline Learning',
    desc: "Download lessons for offline use — because consistent internet access shouldn't be a prerequisite for quality education.",
    status: 'Planned',
    statusColor: 'bg-emerald-100 text-emerald-700',
  },
]

export default function FutureVisionSection() {
  return (
    <section aria-labelledby="vision-heading" className="bg-indigo-950 py-20 px-4">
      <div className="container mx-auto flex flex-col items-center gap-12">
        <SectionHeader
          badge="Future Vision"
          heading="Where we're headed."
          description="Saral Shiksha is just getting started. Here's the roadmap for a platform that keeps getting smarter and more inclusive."
          light
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 w-full max-w-5xl">
          {roadmapItems.map(({ Icon, title, desc, status, statusColor }) => (
            <div
              key={title}
              className="bg-white/5 border border-white/10 rounded-2xl p-6 flex flex-col gap-4 hover:bg-white/10 transition-colors duration-200"
            >
              <div className="w-11 h-11 rounded-xl bg-indigo-800 flex items-center justify-center">
                <Icon size={22} className="text-indigo-300" aria-hidden="true" />
              </div>

              <div className="flex flex-col gap-2">
                <span className={`text-xs font-semibold px-2.5 py-0.5 rounded-full w-fit ${statusColor}`}>
                  {status}
                </span>
                <h3 className="text-base font-bold text-white">{title}</h3>
              </div>

              <p className="text-sm text-indigo-200 leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
