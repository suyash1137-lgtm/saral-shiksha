// src/components/AIAssistant.jsx
import { useState, useRef, useEffect } from 'react'
import { MessageCircle, X, Send, Loader2, Volume2 } from 'lucide-react'
import { getAIResponse, QUICK_ACTIONS, getQuickActionQuery } from '../services/aiService'

/**
 * AIAssistant — Phase 8
 *
 * Floating "Ask Saral AI" button + chat panel.
 *
 * Props:
 *  context – optional object passed to aiService for context-aware replies
 *            e.g. { lessonTitle: 'Variables', lessonTopic: 'python', courseTitle: 'Python Basics' }
 */

// ─── single chat message ──────────────────────────────────────────
function ChatMessage({ message }) {
  const isUser = message.role === 'user'

  return (
    <div className={`flex gap-2 ${isUser ? 'flex-row-reverse' : 'flex-row'}`}>
      {/* Avatar */}
      <div
        className={`w-7 h-7 rounded-full flex items-center justify-center text-sm flex-shrink-0 font-bold
          ${isUser ? 'bg-indigo-600 text-white' : 'bg-amber-400 text-amber-900'}`}
        aria-hidden="true"
      >
        {isUser ? 'U' : 'AI'}
      </div>

      {/* Bubble */}
      <div
        className={`max-w-[80%] px-4 py-2.5 rounded-2xl text-sm leading-relaxed whitespace-pre-wrap
          ${isUser
            ? 'bg-indigo-600 text-white rounded-tr-sm'
            : 'bg-gray-100 text-gray-800 rounded-tl-sm'
          }`}
      >
        {message.content}
      </div>
    </div>
  )
}

// ─── thinking indicator ───────────────────────────────────────────
function ThinkingIndicator() {
  return (
    <div className="flex gap-2" aria-live="polite" aria-label="Saral AI is thinking">
      <div className="w-7 h-7 rounded-full bg-amber-400 text-amber-900 flex items-center justify-center text-sm font-bold flex-shrink-0"
        aria-hidden="true">AI</div>
      <div className="bg-gray-100 rounded-2xl rounded-tl-sm px-4 py-3 flex items-center gap-1">
        {[0, 1, 2].map(i => (
          <span key={i} className="w-1.5 h-1.5 rounded-full bg-gray-400 animate-bounce"
            style={{ animationDelay: `${i * 120}ms` }} aria-hidden="true" />
        ))}
      </div>
    </div>
  )
}

// ─── main component ───────────────────────────────────────────────
export default function AIAssistant({ context = {} }) {
  const [open, setOpen]           = useState(false)
  const [input, setInput]         = useState('')
  const [messages, setMessages]   = useState([
    {
      id: 'welcome',
      role: 'assistant',
      content: `Hi! I'm Saral AI 👋 I can help you understand this lesson. Ask me anything, or use the quick actions below!`,
    },
  ])
  const [thinking, setThinking]   = useState(false)
  const [lastAiText, setLastAiText] = useState('')

  const messagesEndRef = useRef(null)
  const inputRef       = useRef(null)
  const panelRef       = useRef(null)

  // Scroll to bottom on new messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, thinking])

  // Focus input when panel opens
  useEffect(() => {
    if (open) {
      setTimeout(() => inputRef.current?.focus(), 50)
    }
  }, [open])

  // Close on Escape
  useEffect(() => {
    function handleKey(e) {
      if (e.key === 'Escape' && open) setOpen(false)
    }
    document.addEventListener('keydown', handleKey)
    return () => document.removeEventListener('keydown', handleKey)
  }, [open])

  async function sendMessage(text) {
    const trimmed = (text ?? input).trim()
    if (!trimmed || thinking) return

    const userMsg = { id: Date.now(), role: 'user', content: trimmed }
    setMessages(prev => [...prev, userMsg])
    setInput('')
    setThinking(true)

    try {
      const reply = await getAIResponse(trimmed, context)
      const aiMsg = { id: Date.now() + 1, role: 'assistant', content: reply }
      setMessages(prev => [...prev, aiMsg])
      setLastAiText(reply)
    } catch {
      setMessages(prev => [...prev, {
        id: Date.now() + 1,
        role: 'assistant',
        content: "Sorry, I couldn't process that. Please try again.",
      }])
    } finally {
      setThinking(false)
    }
  }

  function handleQuickAction(action) {
    const query = getQuickActionQuery(action.id)
    sendMessage(query)
  }

  function readLastAloud() {
    if (!lastAiText || !('speechSynthesis' in window)) return
    window.speechSynthesis.cancel()
    const u = new SpeechSynthesisUtterance(lastAiText)
    u.rate = 0.95
    window.speechSynthesis.speak(u)
  }

  return (
    <>
      {/* ── Floating action button ── */}
      <button
        type="button"
        onClick={() => setOpen(o => !o)}
        aria-label={open ? 'Close AI Assistant' : 'Ask Saral AI'}
        aria-expanded={open}
        aria-haspopup="dialog"
        className={`fixed bottom-6 right-6 z-40 flex items-center gap-2.5
          shadow-lg shadow-indigo-200 font-bold text-sm
          rounded-full px-5 py-3.5 transition-all active:scale-95
          focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2
          ${open
            ? 'bg-gray-800 text-white hover:bg-gray-700'
            : 'bg-indigo-600 text-white hover:bg-indigo-700'
          }`}
      >
        {open
          ? <X size={18} aria-hidden="true" />
          : <MessageCircle size={18} aria-hidden="true" />
        }
        {open ? 'Close' : 'Ask Saral AI'}
      </button>

      {/* ── Chat panel ── */}
      {open && (
        <div
          ref={panelRef}
          role="dialog"
          aria-label="Saral AI Learning Assistant"
          aria-modal="true"
          className="fixed bottom-24 right-6 z-40 w-[min(380px,calc(100vw-3rem))]
            bg-white border border-gray-200 rounded-3xl shadow-2xl shadow-indigo-100
            flex flex-col overflow-hidden"
          style={{ maxHeight: 'min(560px, calc(100vh - 8rem))' }}
        >
          {/* Header */}
          <div className="flex items-center justify-between px-5 py-4 bg-indigo-600 text-white flex-shrink-0">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-full bg-amber-400 text-amber-900 font-bold text-sm flex items-center justify-center"
                aria-hidden="true">AI</div>
              <div>
                <p className="font-bold text-sm leading-none">Saral AI</p>
                <p className="text-indigo-200 text-xs">Your learning assistant</p>
              </div>
            </div>
            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label="Close AI assistant"
              className="text-indigo-200 hover:text-white transition-colors
                focus:outline-none focus:ring-2 focus:ring-white rounded"
            >
              <X size={18} />
            </button>
          </div>

          {/* Messages */}
          <div
            className="flex-1 overflow-y-auto px-4 py-4 flex flex-col gap-3 min-h-0"
            aria-live="polite"
            aria-relevant="additions"
          >
            {messages.map(msg => (
              <ChatMessage key={msg.id} message={msg} />
            ))}
            {thinking && <ThinkingIndicator />}
            <div ref={messagesEndRef} />
          </div>

          {/* Quick actions */}
          <div className="px-4 py-2 flex flex-wrap gap-1.5 border-t border-gray-100 flex-shrink-0">
            {QUICK_ACTIONS.map(action => (
              <button
                key={action.id}
                type="button"
                onClick={() => handleQuickAction(action)}
                disabled={thinking}
                className="text-xs font-medium bg-indigo-50 text-indigo-700
                  hover:bg-indigo-100 disabled:opacity-50
                  rounded-full px-3 py-1.5 transition-colors
                  focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                {action.emoji} {action.label}
              </button>
            ))}
            {/* Read last AI response aloud */}
            {lastAiText && (
              <button
                type="button"
                onClick={readLastAloud}
                className="text-xs font-medium bg-emerald-50 text-emerald-700
                  hover:bg-emerald-100 rounded-full px-3 py-1.5 transition-colors
                  focus:outline-none focus:ring-2 focus:ring-emerald-500"
                aria-label="Read last response aloud"
              >
                🔊 Read aloud
              </button>
            )}
          </div>

          {/* Input area */}
          <form
            onSubmit={e => { e.preventDefault(); sendMessage() }}
            className="flex items-center gap-2 px-4 py-3 border-t border-gray-100 flex-shrink-0"
          >
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={e => setInput(e.target.value)}
              placeholder="Ask a question…"
              disabled={thinking}
              aria-label="Type your question"
              className="flex-1 text-sm px-4 py-2.5 rounded-xl border border-gray-200
                focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent
                bg-gray-50 placeholder:text-gray-400 disabled:opacity-60"
            />
            <button
              type="submit"
              disabled={!input.trim() || thinking}
              aria-label="Send message"
              className="w-10 h-10 flex items-center justify-center rounded-xl
                bg-indigo-600 text-white hover:bg-indigo-700
                disabled:opacity-50 disabled:cursor-not-allowed
                transition-colors active:scale-95
                focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-1"
            >
              {thinking
                ? <Loader2 size={16} className="animate-spin" aria-hidden="true" />
                : <Send size={16} aria-hidden="true" />
              }
            </button>
          </form>
        </div>
      )}
    </>
  )
}
