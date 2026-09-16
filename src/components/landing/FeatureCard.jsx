// src/components/landing/FeatureCard.jsx

/**
 * Reusable feature card used across landing page sections.
 *
 * Props:
 *  icon       – React element (Lucide icon instance)
 *  title      – card heading
 *  description – supporting text
 *  items      – optional string[], rendered as a bullet list
 *  accent     – Tailwind bg color class for the icon circle (default 'bg-indigo-100')
 *  iconColor  – Tailwind text color class for icon (default 'text-indigo-600')
 */
export default function FeatureCard({
  icon,
  title,
  description,
  items,
  accent = 'bg-indigo-100',
  iconColor = 'text-indigo-600',
}) {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 flex flex-col gap-4 hover:shadow-md transition-shadow duration-200">
      {/* Icon circle */}
      <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${accent}`}>
        <span className={iconColor}>{icon}</span>
      </div>

      <h3 className="text-lg font-bold text-gray-900">{title}</h3>

      {description && (
        <p className="text-sm text-gray-500 leading-relaxed">{description}</p>
      )}

      {items && items.length > 0 && (
        <ul className="flex flex-col gap-1.5 mt-1">
          {items.map((item) => (
            <li key={item} className="flex items-center gap-2 text-sm text-gray-600">
              <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 flex-shrink-0" aria-hidden="true" />
              {item}
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
