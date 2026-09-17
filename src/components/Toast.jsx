// src/components/Toast.jsx
import { CheckCircle, AlertCircle, Info, X } from 'lucide-react'

/**
 * Reusable accessible Toast notification.
 *
 * Props:
 *  message: string (if empty/falsy, doesn't render)
 *  type: 'success' | 'error' | 'info' (default: 'success')
 *  onClose: optional function to dismiss manually
 */
export default function Toast({ message, type = 'success', onClose }) {
  if (!message) return null

  const typeConfig = {
    success: {
      bg: 'bg-emerald-900 border-emerald-700 text-white',
      icon: <CheckCircle size={18} className="text-emerald-400 flex-shrink-0" />,
    },
    error: {
      bg: 'bg-rose-900 border-rose-700 text-white',
      icon: <AlertCircle size={18} className="text-rose-400 flex-shrink-0" />,
    },
    info: {
      bg: 'bg-indigo-900 border-indigo-700 text-white',
      icon: <Info size={18} className="text-indigo-400 flex-shrink-0" />,
    },
  }

  const config = typeConfig[type] || typeConfig.success

  return (
    <div
      role="status"
      aria-live="polite"
      className={`fixed bottom-6 right-6 z-50 px-5 py-3.5 rounded-2xl shadow-2xl border flex items-center gap-3 transition-all animate-bounce ${config.bg}`}
    >
      {config.icon}
      <span className="text-sm font-semibold leading-tight">{message}</span>
      {onClose && (
        <button
          type="button"
          onClick={onClose}
          className="ml-2 text-white/70 hover:text-white p-1 rounded focus:outline-none focus:ring-2 focus:ring-white"
          aria-label="Close notification"
        >
          <X size={14} />
        </button>
      )}
    </div>
  )
}
