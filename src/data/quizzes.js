// src/data/quizzes.js
/**
 * Mock quiz data.
 * Structured by quiz ID (and mapped to lesson IDs).
 * Each quiz contains an array of questions with multiple options,
 * the correct answer index, and a clear explanation.
 */

const quizzes = {
  'quiz-001': {
    id: 'quiz-001',
    title: 'Python Variables & Basics Quiz',
    courseId: 'course-001',
    courseTitle: 'Python Basics',
    lessonId: 'lesson-002',
    lessonTitle: 'Variables and Data Types',
    questions: [
      {
        id: 'q1',
        question: 'What is a variable?',
        options: [
          'A computer',
          'A place that stores information',
          'A browser',
          'A keyboard',
        ],
        correctAnswer: 1, // 'A place that stores information'
        explanation: 'A variable acts like a labeled container or storage location in memory where a program stores information to use later.',
      },
      {
        id: 'q2',
        question: 'Which symbol is used to assign a value to a variable in Python?',
        options: [
          '== (Double equals)',
          '-> (Arrow)',
          '= (Single equals)',
          ': (Colon)',
        ],
        correctAnswer: 2, // '= (Single equals)'
        explanation: 'In Python, the single equals sign (=) is the assignment operator used to store a value inside a variable.',
      },
      {
        id: 'q3',
        question: 'What data type would store the text "Aarav"?',
        options: [
          'Integer (int)',
          'Boolean (bool)',
          'Float (float)',
          'String (str)',
        ],
        correctAnswer: 3, // 'String (str)'
        explanation: 'Text enclosed in quotation marks like "Aarav" is stored as a string (str) data type in Python.',
      },
    ],
  },
  'quiz-002': {
    id: 'quiz-002',
    title: 'HTML & CSS Fundamentals Quiz',
    courseId: 'course-002',
    courseTitle: 'Web Development',
    lessonId: 'lesson-005',
    lessonTitle: 'HTML Fundamentals',
    questions: [
      {
        id: 'q1',
        question: 'What does HTML stand for?',
        options: [
          'HyperText Markup Language',
          'High Tech Modern Language',
          'Home Tool Markup Language',
          'Hyperlink Transfer Machine Language',
        ],
        correctAnswer: 0,
        explanation: 'HTML stands for HyperText Markup Language, the standard code used to structure webpages.',
      },
      {
        id: 'q2',
        question: 'Which tag is used for the most important heading on a webpage?',
        options: [
          '<head>',
          '<h6>',
          '<h1>',
          '<header>',
        ],
        correctAnswer: 2,
        explanation: 'The <h1> tag defines the highest-level, most important heading on a page.',
      },
    ],
  },
  'quiz-003': {
    id: 'quiz-003',
    title: 'AI Concepts Quiz',
    courseId: 'course-003',
    courseTitle: 'AI Fundamentals',
    lessonId: 'lesson-008',
    lessonTitle: 'What is AI?',
    questions: [
      {
        id: 'q1',
        question: 'What is the primary goal of Machine Learning?',
        options: [
          'To manually write hardcoded rules for every scenario',
          'To enable computers to learn patterns directly from data',
          'To replace hardware components with software',
          'To boost monitor refresh rates',
        ],
        correctAnswer: 1,
        explanation: 'Machine learning allows algorithms to discover patterns and learn from data without explicit manual programming for every possibility.',
      },
    ],
  },
}

// Aliases for friendly IDs and lesson IDs
const aliases = {
  'python-variables': 'quiz-001',
  'lesson-001': 'quiz-001',
  'lesson-002': 'quiz-001',
  'lesson-003': 'quiz-001',
  'lesson-004': 'quiz-001',
  'lesson-005': 'quiz-002',
  'lesson-006': 'quiz-002',
  'lesson-008': 'quiz-003',
}

/**
 * Look up a quiz by quizId, lessonId, or slug.
 * Falls back to 'quiz-001' so any demo ID displays valid quiz content.
 */
export function getQuizById(id) {
  const resolvedId = aliases[id] || id
  return quizzes[resolvedId] || quizzes['quiz-001']
}

export default quizzes
