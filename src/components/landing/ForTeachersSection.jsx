// src/components/landing/ForTeachersSection.jsx
import { BarChart3, Bell, Users, ClipboardList } from 'lucide-react'
import SectionHeader from './SectionHeader'
import FeatureCard from './FeatureCard'

const teacherFeatures = [
  {
    icon: <BarChart3 size={22} />,
    title: 'Progress Tracking',
    description: 'Monitor each student\'s lesson completion, quiz scores, and engagement metrics on one clear dashboard.',
    accent: 'bg-blue-100',
    iconColor: 'text-blue-600',
  },
  {
    icon: <Bell size={22} />,
    title: 'Intervention Alerts',
    description: 'Receive smart alerts when a student falls behind, struggles with a topic, or stops engaging — so you can step in early.',
    accent: 'bg-amber-100',
    iconColor: 'text-amber-600',
  },
  {
    icon: <Users size={22} />,
    title: 'Class Management',
    description: 'View all your students in one place, see their accessibility profiles, and understand how each one learns best.',
    accent: 'bg-emerald-100',
    iconColor: 'text-emerald-600',
  },
  {
    icon: <ClipboardList size={22} />,
    title: 'Content Creation',
    description: 'Upload and organize courses. The platform automatically structures content to meet diverse accessibility needs.',
    accent: 'bg-purple-100',
    iconColor: 'text-purple-600',
  },
]

export default function ForTeachersSection() {
  return (
    <section aria-labelledby="teachers-heading" className="bg-white py-20 px-4">
      <div className="container mx-auto flex flex-col items-center gap-12">
        <SectionHeader
          badge="For Teachers"
          heading="Empower your classroom."
          description="Saral Shiksha gives educators the tools to understand and support every student — not just the ones who raise their hand."
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 w-full max-w-5xl">
          {teacherFeatures.map((f) => (
            <FeatureCard key={f.title} {...f} />
          ))}
        </div>

        {/* Teacher dashboard preview */}
        <div className="w-full max-w-3xl bg-gray-50 border border-gray-200 rounded-2xl p-6 flex flex-col gap-4">
          <p className="text-xs font-semibold text-gray-400 uppercase tracking-widest">Teacher Dashboard Preview</p>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {[
              { label: 'Total Students', value: '32', color: 'text-indigo-600' },
              { label: 'Completed Lessons', value: '78%', color: 'text-emerald-600' },
              { label: 'Pending Alerts', value: '3', color: 'text-amber-600' },
              { label: 'Avg. Quiz Score', value: '84%', color: 'text-blue-600' },
            ].map(({ label, value, color }) => (
              <div key={label} className="bg-white rounded-xl p-4 flex flex-col gap-1 border border-gray-100">
                <span className={`text-2xl font-extrabold ${color}`}>{value}</span>
                <span className="text-xs text-gray-400 font-medium">{label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
