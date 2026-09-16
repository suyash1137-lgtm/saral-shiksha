// src/components/landing/SectionHeader.jsx

/**
 * Reusable section header with an optional badge label,
 * main heading, and supporting description.
 *
 * Props:
 *  badge      – short label shown above the heading (optional)
 *  heading    – main h2 text
 *  description – supporting paragraph (optional)
 *  center     – boolean, default true — centers text
 *  light      – boolean — use lighter text colors (for dark backgrounds)
 */
export default function SectionHeader({ badge, heading, description, center = true, light = false }) {
  const align = center ? 'text-center items-center' : 'text-left items-start'
  const headColor = light ? 'text-white' : 'text-gray-900'
  const descColor = light ? 'text-indigo-100' : 'text-gray-500'

  return (
    <div className={`flex flex-col gap-3 ${align}`}>
      {badge && (
        <span className="inline-block bg-indigo-100 text-indigo-700 text-xs font-semibold tracking-widest uppercase px-3 py-1 rounded-full">
          {badge}
        </span>
      )}
      <h2 className={`text-3xl sm:text-4xl font-extrabold leading-tight ${headColor}`}>
        {heading}
      </h2>
      {description && (
        <p className={`max-w-2xl text-base sm:text-lg leading-relaxed ${descColor}`}>
          {description}
        </p>
      )}
    </div>
  )
}
