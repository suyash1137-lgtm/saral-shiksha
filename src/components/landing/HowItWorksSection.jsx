// src/components/landing/HowItWorksSection.jsx
import { UserPlus, Sliders, BookOpen } from 'lucide-react'
import SectionHeader from './SectionHeader'

const steps = [
  {
    number: '01',
    Icon: UserPlus,
    title: 'Sign Up',
    desc: 'Create your free student account in under a minute.',
  },
  {
    number: '02',
    Icon: Sliders,
    title: 'Set Your Preferences',
    desc: 'Tell us how you learn best — font size, contrast, captions, language complexity, and more.',
  },
  {
    number: '03',
    Icon: BookOpen,
    title: 'Learn Your Way',
    desc: 'Every lesson, quiz, and resource is served in the format that works for you. Change preferences anytime.',
  },
]

export default function HowItWorksSection() {
  return (
    <section aria-labelledby="how-heading" className="bg-white py-20 px-4">
      <div className="container mx-auto flex flex-col items-center gap-12">
        <SectionHeader
          badge="How It Works"
          heading="Three simple steps to better learning."
          description="Getting started with Saral Shiksha takes less than two minutes. Your personalised experience is ready immediately."
        />

        <div className="relative flex flex-col md:flex-row gap-8 w-full max-w-4xl">
          {/* Connector line — desktop only */}
          <div
            aria-hidden="true"
            className="hidden md:block absolute top-10 left-[calc(16.67%+1.5rem)] right-[calc(16.67%+1.5rem)] h-0.5 bg-indigo-100"
          />

          {steps.map(({ number, Icon, title, desc }) => (
            <div key={number} className="flex-1 flex flex-col items-center text-center gap-4 relative">
              {/* Step bubble */}
              <div className="w-20 h-20 rounded-full bg-indigo-600 flex items-center justify-center shadow-lg shadow-indigo-200 relative z-10">
                <Icon size={30} className="text-white" aria-hidden="true" />
              </div>

              {/* Step number badge */}
              <span className="absolute top-0 right-1/2 translate-x-8 -translate-y-1 text-xs font-bold bg-amber-400 text-amber-900 rounded-full w-5 h-5 flex items-center justify-center z-20">
                {number.slice(1)}
              </span>

              <h3 className="text-lg font-bold text-gray-900">{title}</h3>
              <p className="text-sm text-gray-500 leading-relaxed max-w-[220px]">{desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
