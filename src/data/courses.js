// src/data/courses.js
/**
 * Mock course data.
 * Shape is designed to be 1:1 replaceable with a real API response.
 * progress: 0-100 (percent complete)
 */
const courses = [
  {
    id: 'course-001',
    title: 'Python Basics',
    description: 'Learn the fundamentals of Python programming — variables, loops, functions, and more.',
    category: 'Programming',
    level: 'Beginner',
    duration: '8 weeks',
    progress: 70,
    thumbnail: null,
    color: 'indigo',
    icon: '🐍',
    lessons: [
      { id: 'lesson-001', title: 'Introduction to Python', duration: '10 min', completed: true },
      { id: 'lesson-002', title: 'Variables and Data Types', duration: '15 min', completed: true },
      { id: 'lesson-003', title: 'Control Flow & Loops', duration: '20 min', completed: false },
      { id: 'lesson-004', title: 'Functions', duration: '18 min', completed: false },
    ],
    quizzes: [
      { id: 'quiz-001', title: 'Python Basics Quiz', questions: 10 },
    ],
    tags: ['python', 'programming', 'beginner'],
    completedLessons: 8,
    totalLessons: 12,
  },
  {
    id: 'course-002',
    title: 'Web Development',
    description: 'Build modern websites with HTML, CSS, JavaScript, and React.',
    category: 'Web',
    level: 'Intermediate',
    duration: '12 weeks',
    progress: 50,
    thumbnail: null,
    color: 'blue',
    icon: '🌐',
    lessons: [
      { id: 'lesson-005', title: 'HTML Fundamentals', duration: '12 min', completed: true },
      { id: 'lesson-006', title: 'CSS Styling', duration: '20 min', completed: false },
      { id: 'lesson-007', title: 'JavaScript Basics', duration: '25 min', completed: false },
    ],
    quizzes: [
      { id: 'quiz-002', title: 'HTML & CSS Quiz', questions: 8 },
    ],
    tags: ['html', 'css', 'javascript', 'react'],
    completedLessons: 6,
    totalLessons: 14,
  },
  {
    id: 'course-003',
    title: 'AI Fundamentals',
    description: 'Understand the core concepts of Artificial Intelligence, machine learning, and neural networks.',
    category: 'Artificial Intelligence',
    level: 'Intermediate',
    duration: '10 weeks',
    progress: 30,
    thumbnail: null,
    color: 'purple',
    icon: '🤖',
    lessons: [
      { id: 'lesson-008', title: 'What is AI?', duration: '8 min', completed: true },
      { id: 'lesson-009', title: 'Machine Learning Basics', duration: '22 min', completed: false },
      { id: 'lesson-010', title: 'Neural Networks', duration: '30 min', completed: false },
    ],
    quizzes: [
      { id: 'quiz-003', title: 'AI Concepts Quiz', questions: 12 },
    ],
    tags: ['ai', 'machine-learning', 'neural-networks'],
    completedLessons: 3,
    totalLessons: 10,
  },
]

export default courses
