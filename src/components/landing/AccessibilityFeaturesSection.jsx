// src/components/landing/AccessibilityFeaturesSection.jsx
import { Eye, Ear, Brain } from 'lucide-react'
import SectionHeader from './SectionHeader'
import FeatureCard from './FeatureCard'

const features = [
  {
    icon: <Eye size={24} />,
    title: 'Visual Support',
    description: 'Designed for students with low vision or visual processing difficulties.',
    items: ['Larger text sizing', 'High contrast mode', 'Read aloud (text-to-speech)', 'Dyslexia-friendly layout'],
    accent: 'bg-blue-100',
    iconColor: 'text-blue-600',
  },
  {
    icon: <Ear size={24} />,
    title: 'Hearing Support',
    description: 'Full accessibility for Deaf and hard-of-hearing students.',
    items: ['Live captions on video', 'Full transcripts', 'Text-based audio explanations', 'Visual alerts & cues'],
    accent: 'bg-emerald-100',
    iconColor: 'text-emerald-600',
  },
  {
    icon: <Brain size={24} />,
    title: 'Cognitive Support',
    description: 'Clear, paced content for students with learning differences.',
    items: ['Simple, plain language', 'Short focused sections', 'Step-by-step learning', 'Progress indicators'],
    accent: 'bg-purple-100',
    iconColor: 'text-purple-600',
  },
]

export default function AccessibilityFeaturesSection() {
  return (
    <section aria-labelledby="features-heading" className="bg-gray-50 py-20 px-4">
      <div className="container mx-auto flex flex-col items-center gap-12">
        <SectionHeader
          badge="Accessibility Features"
          heading="Built for every kind of learner."
          description="Three core accessibility pillars ensure every student can engage fully with the content — regardless of their needs."
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-5xl">
          {features.map((f) => (
            <FeatureCard key={f.title} {...f} />
          ))}
        </div>
      </div>
    </section>
  )
}
