// src/components/PlaceholderPage.jsx
/**
 * Reusable placeholder used by every route in Phase 1.
 * Each page simply passes its title/route/description; real content comes in later phases.
 */
export default function PlaceholderPage({ title, route, description }) {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4">
      <div className="bg-white rounded-2xl shadow p-10 max-w-lg w-full">
        <p className="text-xs font-mono text-gray-400 uppercase tracking-widest mb-2">{route}</p>
        <h1 className="text-3xl font-bold text-indigo-700 mb-3">{title}</h1>
        {description && (
          <p className="text-gray-500 text-sm">{description}</p>
        )}
        <div className="mt-6 inline-block bg-indigo-50 text-indigo-400 text-xs font-medium px-4 py-1.5 rounded-full">
          Phase 1 — Placeholder · Full content coming soon
        </div>
      </div>
    </div>
  )
}
