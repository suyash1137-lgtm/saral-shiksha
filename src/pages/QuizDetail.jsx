// src/pages/QuizDetail.jsx
import { useState, useEffect } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import {
  CheckCircle,
  XCircle,
  Award,
  ArrowRight,
  RotateCcw,
  BookOpen,
  ChevronRight,
  HelpCircle,
  Volume2
} from 'lucide-react'
import { useAccessibility } from '../context/AccessibilityContext'
import { getQuizById } from '../data/quizzes'
import AccessibilityToolbar from '../components/AccessibilityToolbar'
import ReadAloudButton from '../components/ReadAloudButton'

const STORAGE_KEY = 'saralshiksha_quiz_scores'

export default function QuizDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { settings } = useAccessibility()

  const quiz = getQuizById(id)
  const questions = quiz.questions || []

  // Quiz progression state
  const [currentIdx, setCurrentIdx] = useState(0)
  const [selectedAnswers, setSelectedAnswers] = useState({}) // { [questionIdx]: optionIdx }
  const [isCompleted, setIsCompleted] = useState(false)
  const [feedbackAnnounced, setFeedbackAnnounced] = useState('')

  const currentQ = questions[currentIdx]
  const hasSelectedCurrent = selectedAnswers[currentIdx] !== undefined
  const selectedOptionIdx = selectedAnswers[currentIdx]
  const isCurrentCorrect = selectedOptionIdx === currentQ?.correctAnswer

  // Calculate score
  const totalQuestions = questions.length
  const correctCount = questions.reduce((acc, q, idx) => {
    return selectedAnswers[idx] === q.correctAnswer ? acc + 1 : acc
  }, 0)
  const percentage = totalQuestions > 0 ? Math.round((correctCount / totalQuestions) * 100) : 0

  // Save score to localStorage upon completion
  useEffect(() => {
    if (isCompleted && quiz) {
      try {
        const existing = JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}')
        const updated = {
          ...existing,
          [quiz.id]: {
            quizId: quiz.id,
            quizTitle: quiz.title,
            courseId: quiz.courseId,
            courseTitle: quiz.courseTitle,
            lessonId: quiz.lessonId,
            lessonTitle: quiz.lessonTitle,
            score: correctCount,
            total: totalQuestions,
            percentage,
            completedAt: new Date().toISOString(),
          },
        }
        localStorage.setItem(STORAGE_KEY, JSON.stringify(updated))
      } catch (e) {
        console.error('Error saving quiz score', e)
      }
    }
  }, [isCompleted, quiz, correctCount, totalQuestions, percentage])

  // Handle answer selection
  const handleSelectOption = (optionIdx) => {
    if (hasSelectedCurrent) return // Prevent changing once answered
    const updated = { ...selectedAnswers, [currentIdx]: optionIdx }
    setSelectedAnswers(updated)

    const isCorrect = optionIdx === currentQ.correctAnswer
    const announcement = isCorrect
      ? `Correct! Answer: ${currentQ.options[optionIdx]}. ${currentQ.explanation}`
      : `Not quite. Selected: ${currentQ.options[optionIdx]}. Correct answer is ${currentQ.options[currentQ.correctAnswer]}. ${currentQ.explanation}`
    setFeedbackAnnounced(announcement)
  }

  // Handle next question or finish
  const handleNext = () => {
    if (currentIdx < totalQuestions - 1) {
      setCurrentIdx((prev) => prev + 1)
      setFeedbackAnnounced('')
    } else {
      setIsCompleted(true)
    }
  }

  // Retake quiz
  const handleRetake = () => {
    setSelectedAnswers({})
    setCurrentIdx(0)
    setIsCompleted(false)
    setFeedbackAnnounced('')
  }

  const optionLetters = ['A', 'B', 'C', 'D']

  return (
    <div className="max-w-3xl mx-auto flex flex-col gap-6 pb-20">
      {/* Breadcrumb nav */}
      <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-sm text-gray-500">
        <Link to="/dashboard" className="hover:text-indigo-600 transition-colors">
          Dashboard
        </Link>
        <ChevronRight size={14} aria-hidden="true" />
        <Link to={`/lesson/${quiz.lessonId || 'lesson-002'}`} className="hover:text-indigo-600 transition-colors">
          {quiz.courseTitle}
        </Link>
        <ChevronRight size={14} aria-hidden="true" />
        <span className="text-gray-800 font-medium truncate">{quiz.title}</span>
      </nav>

      {/* Accessibility Toolbar */}
      <AccessibilityToolbar />

      {/* Quiz Header Card */}
      <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6">
        <div className="flex flex-wrap items-center justify-between gap-3 mb-2">
          <span className="inline-flex items-center gap-1.5 bg-indigo-50 border border-indigo-100 text-indigo-700 text-xs font-semibold px-3 py-1 rounded-full">
            <BookOpen size={14} />
            {quiz.courseTitle}
          </span>
          <span className="text-xs font-medium text-gray-500">
            {isCompleted ? 'Quiz Completed' : `Question ${currentIdx + 1} of ${totalQuestions}`}
          </span>
        </div>

        <h1
          className={`font-extrabold text-gray-900 leading-tight ${
            settings.fontSize === 'large' ? 'text-3xl sm:text-4xl' : 'text-2xl sm:text-3xl'
          }`}
        >
          {quiz.title}
        </h1>
        <p className="text-sm text-gray-600 mt-1">
          Review your understanding of key concepts. Choose the option you think is best.
        </p>

        {/* Visual Progress Bar */}
        <div className="mt-5">
          <div className="flex justify-between text-xs text-gray-500 mb-1 font-medium">
            <span>Progress</span>
            <span>
              {isCompleted
                ? '100%'
                : `${Math.round(((currentIdx + (hasSelectedCurrent ? 1 : 0)) / totalQuestions) * 100)}%`}
            </span>
          </div>
          <div
            className="w-full bg-gray-100 rounded-full h-2.5 overflow-hidden"
            role="progressbar"
            aria-valuenow={
              isCompleted
                ? 100
                : Math.round(((currentIdx + (hasSelectedCurrent ? 1 : 0)) / totalQuestions) * 100)
            }
            aria-valuemin={0}
            aria-valuemax={100}
            aria-label="Quiz progress"
          >
            <div
              className="bg-indigo-600 h-2.5 rounded-full transition-all duration-300"
              style={{
                width: `${
                  isCompleted
                    ? 100
                    : ((currentIdx + (hasSelectedCurrent ? 1 : 0)) / totalQuestions) * 100
                }%`,
              }}
            />
          </div>
        </div>
      </div>

      {/* Screen Reader Live Announcement */}
      <div className="sr-only" aria-live="polite" aria-atomic="true">
        {feedbackAnnounced}
      </div>

      {!isCompleted ? (
        /* Question Card */
        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 sm:p-8 flex flex-col gap-6">
          {/* Question Text & Read Aloud */}
          <div className="flex flex-col gap-3">
            <div className="flex items-start justify-between gap-4">
              <h2
                id={`question-${currentQ.id}`}
                className={`font-bold text-gray-900 leading-snug ${
                  settings.fontSize === 'large' ? 'text-xl sm:text-2xl' : 'text-lg sm:text-xl'
                }`}
              >
                <span className="text-indigo-600 mr-2">Q{currentIdx + 1}.</span>
                {currentQ.question}
              </h2>
            </div>

            <div className="flex items-center gap-3">
              <ReadAloudButton
                text={`${currentQ.question}. Options: ${currentQ.options
                  .map((opt, i) => `Option ${optionLetters[i]}: ${opt}`)
                  .join('. ')}`}
                label="Read question and options aloud"
              />
            </div>
          </div>

          {/* Options Grid / List */}
          <div
            role="radiogroup"
            aria-labelledby={`question-${currentQ.id}`}
            className="flex flex-col gap-3.5"
          >
            {currentQ.options.map((option, idx) => {
              const isSelected = selectedOptionIdx === idx
              const isCorrectOption = currentQ.correctAnswer === idx

              let borderClass = 'border-gray-200 hover:border-indigo-400 hover:bg-indigo-50/40'
              let badgeBg = 'bg-gray-100 text-gray-700 border-gray-300'
              let stateIcon = null
              let stateLabel = null

              if (hasSelectedCurrent) {
                if (isCorrectOption) {
                  borderClass = 'border-emerald-500 bg-emerald-50/70 ring-2 ring-emerald-300'
                  badgeBg = 'bg-emerald-600 text-white border-emerald-600'
                  stateIcon = <CheckCircle size={22} className="text-emerald-600 flex-shrink-0" />
                  stateLabel = (
                    <span className="text-xs font-bold text-emerald-800 uppercase tracking-wider bg-emerald-100 px-2 py-0.5 rounded">
                      Correct Answer
                    </span>
                  )
                } else if (isSelected) {
                  borderClass = 'border-rose-400 bg-rose-50/70 ring-2 ring-rose-200'
                  badgeBg = 'bg-rose-600 text-white border-rose-600'
                  stateIcon = <XCircle size={22} className="text-rose-600 flex-shrink-0" />
                  stateLabel = (
                    <span className="text-xs font-bold text-rose-800 uppercase tracking-wider bg-rose-100 px-2 py-0.5 rounded">
                      Your Choice (Incorrect)
                    </span>
                  )
                } else {
                  borderClass = 'border-gray-200 opacity-60 bg-gray-50'
                }
              }

              return (
                <button
                  key={idx}
                  type="button"
                  role="radio"
                  aria-checked={isSelected}
                  disabled={hasSelectedCurrent}
                  onClick={() => handleSelectOption(idx)}
                  className={`w-full text-left p-4 sm:p-5 rounded-2xl border-2 transition-all flex items-start gap-4
                    focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:ring-offset-2
                    ${borderClass} ${!hasSelectedCurrent ? 'cursor-pointer active:scale-[0.99]' : 'cursor-default'}`}
                >
                  {/* Option letter pill */}
                  <span
                    className={`w-9 h-9 rounded-xl border flex items-center justify-center font-bold text-sm flex-shrink-0 mt-0.5 transition-colors ${badgeBg}`}
                  >
                    {optionLetters[idx]}
                  </span>

                  {/* Option text */}
                  <div className="flex-1 pt-1">
                    <p
                      className={`font-semibold text-gray-800 ${
                        settings.fontSize === 'large' ? 'text-lg' : 'text-base'
                      }`}
                    >
                      {option}
                    </p>
                    {stateLabel && <div className="mt-1.5">{stateLabel}</div>}
                  </div>

                  {/* Icon confirmation (not relying on color alone) */}
                  {stateIcon && <div className="mt-1">{stateIcon}</div>}
                </button>
              )
            })}
          </div>

          {/* Explanation Box (Visible once answered) */}
          {hasSelectedCurrent && (
            <div
              className={`rounded-2xl p-5 border-2 flex flex-col gap-3 transition-all ${
                isCurrentCorrect
                  ? 'bg-emerald-50 border-emerald-300'
                  : 'bg-amber-50 border-amber-300'
              }`}
            >
              <div className="flex items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  {isCurrentCorrect ? (
                    <>
                      <CheckCircle size={22} className="text-emerald-600" aria-hidden="true" />
                      <span className="font-extrabold text-emerald-900 text-base">
                        Correct! Well done!
                      </span>
                    </>
                  ) : (
                    <>
                      <HelpCircle size={22} className="text-amber-700" aria-hidden="true" />
                      <span className="font-extrabold text-amber-900 text-base">
                        Not quite — here is the explanation:
                      </span>
                    </>
                  )}
                </div>
                <ReadAloudButton
                  text={`Explanation: ${currentQ.explanation}`}
                  label="Read explanation aloud"
                />
              </div>

              <p
                className={`text-gray-800 leading-relaxed ${
                  settings.fontSize === 'large' ? 'text-base' : 'text-sm'
                }`}
              >
                {currentQ.explanation}
              </p>
            </div>
          )}

          {/* Action button (Next / Results) */}
          {hasSelectedCurrent && (
            <div className="flex justify-end pt-2">
              <button
                type="button"
                onClick={handleNext}
                className="inline-flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-base px-7 py-3.5 rounded-xl shadow-sm hover:shadow active:scale-[0.98] transition-all focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:ring-offset-2"
              >
                {currentIdx < totalQuestions - 1 ? (
                  <>
                    Next Question
                    <ArrowRight size={18} aria-hidden="true" />
                  </>
                ) : (
                  <>
                    See Final Results
                    <Award size={18} aria-hidden="true" />
                  </>
                )}
              </button>
            </div>
          )}
        </div>
      ) : (
        /* Results / Final Score Screen */
        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-8 flex flex-col items-center text-center gap-6">
          <div className="w-20 h-20 rounded-full bg-amber-100 border-4 border-amber-300 flex items-center justify-center text-amber-700 shadow-sm">
            <Award size={40} aria-hidden="true" />
          </div>

          <div className="flex flex-col gap-2 max-w-md">
            <span className="text-xs font-bold uppercase tracking-widest text-indigo-700 bg-indigo-50 px-3 py-1 rounded-full mx-auto">
              Quiz Completed
            </span>
            <h2
              className={`font-extrabold text-gray-900 ${
                settings.fontSize === 'large' ? 'text-3xl sm:text-4xl' : 'text-2xl sm:text-3xl'
              }`}
            >
              {percentage >= 70 ? 'Great job!' : 'Good effort!'}
            </h2>
            <p className="text-gray-600 text-base">
              You got <strong className="text-gray-900 font-bold">{correctCount}</strong> of{' '}
              <strong className="text-gray-900 font-bold">{totalQuestions}</strong> questions
              correct ({percentage}%).
            </p>
          </div>

          {/* Score breakdown card */}
          <div className="w-full max-w-md bg-gray-50 border border-gray-200 rounded-2xl p-5 flex items-center justify-around">
            <div className="flex flex-col items-center">
              <span className="text-2xl font-black text-emerald-600">{correctCount}</span>
              <span className="text-xs font-semibold text-gray-500 uppercase mt-0.5">Correct</span>
            </div>
            <div className="w-px h-10 bg-gray-200" />
            <div className="flex flex-col items-center">
              <span className="text-2xl font-black text-rose-500">{totalQuestions - correctCount}</span>
              <span className="text-xs font-semibold text-gray-500 uppercase mt-0.5">Incorrect</span>
            </div>
            <div className="w-px h-10 bg-gray-200" />
            <div className="flex flex-col items-center">
              <span className="text-2xl font-black text-indigo-600">{percentage}%</span>
              <span className="text-xs font-semibold text-gray-500 uppercase mt-0.5">Score</span>
            </div>
          </div>

          <div className="text-xs text-gray-500 bg-indigo-50/80 border border-indigo-100 rounded-xl px-4 py-2.5 max-w-md">
            ✓ Your quiz score has been automatically saved to your progress profile.
          </div>

          {/* Buttons: Retake vs Continue to /progress */}
          <div className="flex flex-wrap items-center justify-center gap-4 mt-2">
            <button
              type="button"
              onClick={handleRetake}
              className="inline-flex items-center gap-2 border-2 border-gray-300 hover:border-gray-400 bg-white text-gray-700 font-semibold px-6 py-3 rounded-xl hover:bg-gray-50 transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-600"
            >
              <RotateCcw size={16} aria-hidden="true" />
              Retake Quiz
            </button>

            <button
              type="button"
              onClick={() => navigate('/progress')}
              className="inline-flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white font-bold px-7 py-3.5 rounded-xl shadow-md hover:shadow-lg transition-all active:scale-95 focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:ring-offset-2"
            >
              Continue to Progress
              <ArrowRight size={18} aria-hidden="true" />
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
