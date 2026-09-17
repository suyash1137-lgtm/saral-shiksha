// src/components/FormInput.jsx
import { AlertCircle } from 'lucide-react'

/**
 * Reusable accessible form input.
 *
 * Props:
 *  id         – ties <label> to <input> via htmlFor
 *  label      – visible label text
 *  type       – input type (text | email | password …)
 *  value      – controlled value
 *  onChange   – change handler
 *  error      – error string or null/undefined
 *  autoComplete – optional autocomplete hint
 *  placeholder
 */
export default function FormInput({
  id,
  label,
  type = 'text',
  value,
  onChange,
  error,
  autoComplete,
  placeholder,
  required = true,
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label
        htmlFor={id}
        className="text-sm font-semibold text-gray-700"
      >
        {label}
        {required && (
          <span className="text-red-500 ml-0.5" aria-hidden="true">*</span>
        )}
      </label>

      <input
        id={id}
        type={type}
        value={value}
        onChange={onChange}
        autoComplete={autoComplete}
        placeholder={placeholder}
        required={required}
        aria-invalid={!!error}
        aria-describedby={error ? `${id}-error` : undefined}
        className={`w-full px-4 py-3 rounded-xl border text-sm text-gray-900 bg-white
          placeholder:text-gray-400 transition-colors
          focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent
          ${error
            ? 'border-red-400 bg-red-50 focus:ring-red-400'
            : 'border-gray-200 hover:border-indigo-300'
          }`}
      />

      {error && (
        <p
          id={`${id}-error`}
          role="alert"
          className="flex items-center gap-1.5 text-xs text-red-600 font-medium"
        >
          <AlertCircle size={13} aria-hidden="true" />
          {error}
        </p>
      )}
    </div>
  )
}
