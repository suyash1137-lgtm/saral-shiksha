// src/data/courses.js
/**
 * Mock course data.
 * Shape is designed to be 1:1 replaceable with a MongoDB document.
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
    lessons: [],
    quizzes: [],
    tags: ['python', 'programming', 'beginner'],
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
    lessons: [],
    quizzes: [],
    tags: ['html', 'css', 'javascript', 'react'],
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
    lessons: [],
    quizzes: [],
    tags: ['ai', 'machine-learning', 'neural-networks'],
  },
]

export default courses
