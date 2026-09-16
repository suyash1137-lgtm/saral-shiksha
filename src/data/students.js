// src/data/students.js
/**
 * Mock student data for teacher dashboard.
 * Shape mirrors what a MongoDB/Express API would return.
 * overallProgress: weighted average across enrolled courses (0-100)
 */
const students = [
  {
    id: 'student-001',
    name: 'Student A',
    email: 'student.a@example.com',
    enrolledCourses: ['course-001', 'course-002'],
    overallProgress: 82,
    accessibilityNeeds: ['readAloud'],
    joinedAt: '2025-08-01',
  },
  {
    id: 'student-002',
    name: 'Student B',
    email: 'student.b@example.com',
    enrolledCourses: ['course-003'],
    overallProgress: 35,
    accessibilityNeeds: ['highContrast', 'captions'],
    joinedAt: '2025-08-15',
  },
  {
    id: 'student-003',
    name: 'Student C',
    email: 'student.c@example.com',
    enrolledCourses: ['course-001', 'course-002', 'course-003'],
    overallProgress: 91,
    accessibilityNeeds: ['simpleLanguage'],
    joinedAt: '2025-07-20',
  },
]

export default students
