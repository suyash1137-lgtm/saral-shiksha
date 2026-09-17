// src/components/landing/FutureVisionSection.jsx
import {
  Sparkles,
  Globe2,
  HandMetal,
  Mic,
  HelpCircle,
  Bell,
  Smartphone,
  WifiOff,
  TrendingDown
} from 'lucide-react'
import SectionHeader from './SectionHeader'

const roadmapItems = [
  {
    Icon: Sparkles,
    title: 'AI Personalized Learning',
    desc: 'Real-time adaptive pacing delivering harder concepts when ready and simplified breakdowns when extra clarity is needed.',
    status: 'In Development',
    statusColor: 'bg-indigo-100 text-indigo-700',
  },
  {
    Icon: Globe2,
    title: 'Multiple Indian Languages',
    desc: 'Full regional accessibility for Hindi, Tamil, Telugu, Bengali, Marathi, and Kannada — removing linguistic barriers.',
    status: 'Coming Soon',
    statusColor: 'bg-amber-100 text-amber-700',
  },
  {
    Icon: HandMetal,
    title: 'Sign Language Support',
    desc: 'Picture-in-picture Indian Sign Language (ISL) video interpretations paired with lesson content for Deaf learners.',
    status: 'Planned',
    statusColor: 'bg-purple-100 text-purple-700',
  },
  {
    Icon: Mic,
    title: 'Voice-Based Navigation',
    desc: 'Hands-free voice commands enabling motor-impaired students to navigate, answer questions, and control media.',
    status: 'Planned',
    statusColor: 'bg-blue-100 text-blue-700',
  },
  {
    Icon: HelpCircle,
    title: 'Personalized Quizzes',
    desc: 'Diagnostic assessments that automatically adapt question complexity based on student response patterns.',
    status: 'Planned',
    statusColor: 'bg-emerald-100 text-emerald-700',
  },
  {
    Icon: Bell,
    title: 'Teacher Intervention Alerts',
    desc: 'Automated notification engine alerting educators when students need pedagogical or accessibility accommodation.',
    status: 'Prototype Ready',
    statusColor: 'bg-emerald-100 text-emerald-700',
  },
  {
    Icon: Smartphone,
    title: 'Mobile Application',
    desc: 'Native iOS & Android mobile apps optimized for low-spec devices and touch accessibility.',
    status: 'Coming Soon',
    statusColor: 'bg-amber-100 text-amber-700',
  },
  {
    Icon: WifiOff,
    title: 'Offline Learning',
    desc: 'Local caching and syncing so rural students without stable broadband can continue learning uninterrupted.',
    status: 'Planned',
    statusColor: 'bg-purple-100 text-purple-700',
  },
  {
    Icon: TrendingDown,
    title: 'Dropout-Risk Analytics',
    desc: 'Early warning predictive indicators helping schools retain students through targeted support.',
    status: 'Research Stage',
    statusColor: 'bg-indigo-100 text-indigo-700',
  },
]

export default function FutureVisionSection() {
  return (
    <section aria-labelledby="vision-heading" className="bg-indigo-950 py-24 px-4">
      <div className="container mx-auto flex flex-col items-center gap-12">
        <SectionHeader
          badge="Future Vision"
          heading="Where we're headed next."
          description="Saral Shiksha is expanding beyond the web prototype. Here is our comprehensive roadmap for a universally accessible learning ecosystem."
          light
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 w-full max-w-6xl">
          {roadmapItems.map(({ Icon, title, desc, status, statusColor }) => (
            <div
              key={title}
              className="bg-white/5 border border-white/10 rounded-2xl p-6 flex flex-col gap-4 hover:bg-white/10 transition-colors duration-200"
            >
              <div className="flex items-center justify-between">
                <div className="w-11 h-11 rounded-xl bg-indigo-800/80 flex items-center justify-center">
                  <Icon size={22} className="text-indigo-300" aria-hidden="true" />
                </div>
                <span className={`text-xs font-semibold px-2.5 py-0.5 rounded-full ${statusColor}`}>
                  {status}
                </span>
              </div>

              <div className="flex flex-col gap-1.5">
                <h3 className="text-base font-bold text-white">{title}</h3>
                <p className="text-sm text-indigo-200/80 leading-relaxed">{desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
