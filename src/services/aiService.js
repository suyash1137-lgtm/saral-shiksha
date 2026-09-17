// src/services/aiService.js
/**
 * Saral Shiksha — AI Assistant Service
 * Phase 8 — Mock implementation
 *
 * ─────────────────────────────────────────────────────────────────
 * ARCHITECTURE NOTE:
 * The public surface of this module is a single async function:
 *
 *   getAIResponse(question, context) → Promise<string>
 *
 * `context` is an optional object with lesson-level information:
 *   { lessonTitle, lessonTopic, courseTitle }
 *
 * Currently this returns deterministic mock responses via keyword
 * matching — no API calls, no latency.
 *
 * TO REPLACE WITH REAL AI (Gemini / OpenAI):
 *   1. Remove the mock logic below.
 *   2. Add your API key via an env variable (VITE_GEMINI_KEY etc.)
 *   3. Replace the function body with your API call, e.g.:
 *
 *      const response = await fetch('https://generativelanguage.googleapis.com/...', {
 *        method: 'POST',
 *        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${key}` },
 *        body: JSON.stringify({ contents: [{ parts: [{ text: prompt }] }] }),
 *      })
 *      const data = await response.json()
 *      return data.candidates[0].content.parts[0].text
 *
 * ─────────────────────────────────────────────────────────────────
 */

// ─── Mock response library ────────────────────────────────────────

const MOCK_RESPONSES = {
  variable: [
    "A variable is like a labeled box that stores information. You give it a name, and it holds a value you can use later.",
    "In Python, you create a variable by writing: `age = 25`. Now `age` holds the number 25 anywhere in your program.",
  ],
  loop: [
    "A loop lets you repeat the same action many times. A `for` loop runs a set number of times; a `while` loop runs until a condition becomes false.",
    "Example of a loop:\nfor i in range(5):\n    print(i)\nThis prints the numbers 0, 1, 2, 3, 4.",
  ],
  function: [
    "A function is a reusable block of code. You define it once with `def`, then call it by name whenever you need it.",
    "Example:\ndef greet(name):\n    print('Hello,', name)\n\ngreet('Aarav')  # Prints: Hello, Aarav",
  ],
  python: [
    "Python is a beginner-friendly programming language. It's used in web development, data science, and artificial intelligence.",
    "Python was created in 1991 by Guido van Rossum. Its clean, readable syntax makes it one of the most popular languages in the world.",
  ],
  html: [
    "HTML stands for HyperText Markup Language. It's the language that gives structure to web pages.",
    "HTML uses tags like <h1> for headings and <p> for paragraphs to tell the browser what to display.",
  ],
  ai: [
    "Artificial Intelligence (AI) refers to systems that can perform tasks that would normally require human intelligence — like recognising images, understanding language, or making decisions.",
    "Machine Learning is a branch of AI where systems learn from data instead of being explicitly programmed with rules.",
  ],
  example: [
    "Here's a quick example:\n\nage = 25\nname = 'Aarav'\nprint(name, 'is', age, 'years old')\n\nOutput: Aarav is 25 years old",
    "Example of an if statement:\nif age >= 18:\n    print('Adult')\nelse:\n    print('Minor')",
  ],
  simple: [
    "Let me put it simply: a variable is like a box. You put a value in it, give it a name, and use it later in your code.",
    "In simple terms: Python reads your instructions from top to bottom and does what you tell it to do, step by step.",
  ],
  translate: [
    "🌐 Translation (Hindi): एक चर (variable) एक नाम वाला बॉक्स है जो जानकारी संग्रहीत करता है।\n\n(Real translation will be powered by a translation API in a future version.)",
    "🌐 Translation (Tamil): ஒரு மாறி (variable) என்பது தகவலை சேமிக்கும் ஒரு பெட்டி போன்றது.\n\n(Real translation coming soon.)",
  ],
  hello: [
    "Hi there! I'm Saral AI 👋 I'm here to help you understand your lessons. Ask me anything about what you're learning!",
  ],
  help: [
    "I can help you with:\n• Explaining concepts in simple language\n• Giving examples of code\n• Translating key terms\n• Answering questions about your lesson\n\nJust type your question below!",
  ],
}

const FALLBACK_RESPONSES = [
  "That's a great question! Based on what you're learning, I'd suggest re-reading the explanation in this lesson and trying the example yourself.",
  "I'm not sure I understood that completely. Could you rephrase your question? You can also try one of the quick actions above.",
  "Interesting! This topic connects to many areas of programming. For now, focus on the key points in this lesson — they're the foundation you'll build on.",
  "Great curiosity! The best way to understand this is to try it out. Experiment with the code example and see what happens when you change values.",
]

// ─── Quick action payloads ─────────────────────────────────────────

export const QUICK_ACTIONS = [
  { id: 'explain-simple', label: 'Explain simply',   emoji: '💡' },
  { id: 'give-example',   label: 'Give an example',  emoji: '📝' },
  { id: 'translate',      label: 'Translate',         emoji: '🌐' },
]

const QUICK_ACTION_QUERIES = {
  'explain-simple': 'explain simply',
  'give-example':   'give me an example',
  'translate':      'translate',
}

export function getQuickActionQuery(actionId) {
  return QUICK_ACTION_QUERIES[actionId] ?? actionId
}

// ─── Core function ────────────────────────────────────────────────

/**
 * getAIResponse(question, context?)
 *
 * Returns a Promise<string> — always resolves successfully.
 * Uses a tiny artificial delay (150ms) so the UI can show a
 * "thinking" state, even though there's no real network call.
 *
 * @param {string} question  - The user's message
 * @param {object} [context] - Optional { lessonTitle, lessonTopic, courseTitle }
 */
export async function getAIResponse(question, context = {}) {
  // ── REPLACE THIS BLOCK WITH REAL API CALL ──────────────────────
  // Simulated latency (remove when using real API)
  await new Promise(resolve => setTimeout(resolve, 180))

  const q = question.toLowerCase()

  // Keyword matching — order matters (more specific first)
  for (const [keyword, responses] of Object.entries(MOCK_RESPONSES)) {
    if (q.includes(keyword)) {
      // Pick a random response from the array for variety
      return responses[Math.floor(Math.random() * responses.length)]
    }
  }

  // Context-aware fallback: mention the lesson topic if available
  if (context.lessonTitle) {
    return `Good question about "${context.lessonTitle}"! ` +
      FALLBACK_RESPONSES[Math.floor(Math.random() * FALLBACK_RESPONSES.length)]
  }

  return FALLBACK_RESPONSES[Math.floor(Math.random() * FALLBACK_RESPONSES.length)]
  // ── END OF MOCK BLOCK ──────────────────────────────────────────
}
