// src/data/lessons.js
/**
 * Mock lesson data.
 * Shape is designed to be 1:1 replaceable with a real API response.
 *
 * Each lesson has:
 *  - normalExplanation / simpleExplanation  (for SimpleLanguageToggle)
 *  - example                                (code/text block)
 *  - keyPoints                              (bullet list)
 *  - transcript                             (full text for TranscriptPanel / captions)
 *  - quizId                                 (links to /quiz/:id)
 *  - nextLessonId                           (links to next lesson)
 */

const lessons = [
  {
    id: 'lesson-001',
    courseId: 'course-001',
    courseTitle: 'Python Basics',
    title: 'Introduction to Python',
    lessonNumber: 1,
    totalLessons: 12,
    duration: '10 min',
    completed: true,
    quizId: 'quiz-001',
    nextLessonId: 'lesson-002',
    prevLessonId: null,

    introduction:
      'Python is one of the most widely used programming languages in the world. ' +
      "It's beginner-friendly, readable, and powerful enough to build websites, AI systems, and data pipelines.",

    normalExplanation:
      'Python is a high-level, interpreted programming language. ' +
      'It uses indentation to define code blocks, making it visually clean and easy to read. ' +
      'Python supports multiple programming paradigms including procedural, object-oriented, and functional programming.',

    simpleExplanation:
      'Python is a programming language. ' +
      'It is easy to learn because it looks almost like normal English. ' +
      'You can use Python to tell a computer what to do.',

    example: {
      language: 'python',
      code: '# Your first Python program\nprint("Hello, World!")\n\n# Python uses indentation\nif 5 > 2:\n    print("Five is greater than two")',
      caption: 'A simple Python program that prints messages to the screen.',
    },

    keyPoints: [
      'Python is free and open-source.',
      'It runs on Windows, Mac, and Linux.',
      'Python code is easy to read — it looks similar to plain English.',
      'Python is used in web development, data science, and AI.',
    ],

    transcript:
      'Introduction to Python.\n\n' +
      'Python is a high-level, interpreted programming language. ' +
      'It uses indentation to define code blocks, making it visually clean and easy to read. ' +
      'Python supports multiple programming paradigms.\n\n' +
      'Example: print("Hello, World!")\n\n' +
      'Key Points:\n' +
      '1. Python is free and open-source.\n' +
      '2. It runs on Windows, Mac, and Linux.\n' +
      '3. Python code is easy to read.\n' +
      '4. Python is used in web development, data science, and AI.',
  },

  {
    id: 'lesson-002',
    courseId: 'course-001',
    courseTitle: 'Python Basics',
    title: 'Variables and Data Types',
    lessonNumber: 2,
    totalLessons: 12,
    duration: '15 min',
    completed: false,
    quizId: 'quiz-001',
    nextLessonId: 'lesson-003',
    prevLessonId: 'lesson-001',

    introduction:
      "Variables are one of the most fundamental concepts in programming. " +
      "Every program you write will use variables to store and manage data.",

    normalExplanation:
      "A variable is a named storage location in memory used to hold a value that can change " +
      "during program execution. In Python, you don't need to declare a variable's type explicitly — " +
      "Python infers it automatically based on the value you assign.",

    simpleExplanation:
      "A variable is like a box that stores information. " +
      "You give the box a name, and you can put a number, a word, or other data inside it. " +
      "You can change what's in the box anytime.",

    example: {
      language: 'python',
      code: '# Creating variables\nage = 25\nname = "Aarav"\nis_student = True\n\n# Printing variables\nprint(age)        # Output: 25\nprint(name)       # Output: Aarav\nprint(is_student) # Output: True',
      caption: "Three variables storing different types of data: a number, text, and a true/false value.",
    },

    keyPoints: [
      'A variable stores a value under a name you choose.',
      'Python has four main data types: int, float, str, and bool.',
      'Variable names are case-sensitive (age ≠ Age).',
      'Use = to assign a value to a variable.',
    ],

    transcript:
      'Variables and Data Types.\n\n' +
      'A variable is a named storage location in memory used to hold a value. ' +
      'In Python, you do not need to declare the type — Python figures it out automatically.\n\n' +
      'Example:\n' +
      'age = 25\n' +
      'name = "Aarav"\n' +
      'is_student = True\n\n' +
      'Key Points:\n' +
      '1. A variable stores a value under a name you choose.\n' +
      '2. Python has four main data types: int, float, str, and bool.\n' +
      '3. Variable names are case-sensitive.\n' +
      '4. Use the equals sign to assign a value.',
  },

  {
    id: 'lesson-003',
    courseId: 'course-001',
    courseTitle: 'Python Basics',
    title: 'Control Flow & Loops',
    lessonNumber: 3,
    totalLessons: 12,
    duration: '20 min',
    completed: false,
    quizId: 'quiz-001',
    nextLessonId: 'lesson-004',
    prevLessonId: 'lesson-002',

    introduction:
      'Control flow lets your program make decisions and repeat actions. ' +
      "These are the building blocks of almost every program you'll ever write.",

    normalExplanation:
      'Control flow structures determine the order in which code executes. ' +
      'The if/elif/else statement allows conditional execution — running different code depending on whether a condition is true or false. ' +
      'Loops (for and while) allow you to repeat a block of code multiple times.',

    simpleExplanation:
      'Control flow means telling the computer to make choices. ' +
      'If something is true, do one thing. If not, do something else. ' +
      'A loop means doing the same thing over and over until you say stop.',

    example: {
      language: 'python',
      code: '# If statement\nage = 18\nif age >= 18:\n    print("You can vote!")\nelse:\n    print("Too young to vote.")\n\n# For loop\nfor i in range(5):\n    print(i)  # Prints 0, 1, 2, 3, 4',
      caption: 'An if/else decision and a for loop that counts from 0 to 4.',
    },

    keyPoints: [
      'if checks whether a condition is true.',
      'else runs when the condition is false.',
      'for loops repeat for a set number of times.',
      'while loops repeat until a condition becomes false.',
    ],

    transcript:
      'Control Flow and Loops.\n\n' +
      'Control flow determines the order in which your code runs. ' +
      'If statements allow your program to make decisions. ' +
      'Loops allow you to repeat code.\n\n' +
      'Example:\n' +
      'age = 18\nif age >= 18:\n    print("You can vote!")\nelse:\n    print("Too young to vote.")\n\n' +
      'Key Points:\n' +
      '1. if checks whether a condition is true.\n' +
      '2. else runs when the condition is false.\n' +
      '3. for loops repeat a set number of times.\n' +
      '4. while loops repeat until a condition is false.',
  },

  // Fallback lesson for unknown IDs
  {
    id: 'lesson-005',
    courseId: 'course-002',
    courseTitle: 'Web Development',
    title: 'HTML Fundamentals',
    lessonNumber: 1,
    totalLessons: 14,
    duration: '12 min',
    completed: true,
    quizId: 'quiz-002',
    nextLessonId: 'lesson-006',
    prevLessonId: null,

    introduction:
      'HTML is the foundation of every webpage on the internet. ' +
      'Every website you have ever visited was built using HTML.',

    normalExplanation:
      'HTML (HyperText Markup Language) is the standard language used to create and structure content on the web. ' +
      'It uses a system of elements represented by tags to define headings, paragraphs, links, images, and more.',

    simpleExplanation:
      'HTML is a language for making web pages. ' +
      'You use special tags to tell the browser what to show. ' +
      'For example, a heading tag makes big bold text.',

    example: {
      language: 'html',
      code: '<!DOCTYPE html>\n<html>\n  <head>\n    <title>My Page</title>\n  </head>\n  <body>\n    <h1>Hello World</h1>\n    <p>This is a paragraph.</p>\n  </body>\n</html>',
      caption: 'A minimal HTML document with a heading and a paragraph.',
    },

    keyPoints: [
      'HTML stands for HyperText Markup Language.',
      'Tags like <h1>, <p>, and <a> define page content.',
      'Every HTML file starts with <!DOCTYPE html>.',
      'Browsers read HTML and display it as a webpage.',
    ],

    transcript:
      'HTML Fundamentals.\n\n' +
      'HTML is the standard language for creating web pages. ' +
      'It uses tags to define headings, paragraphs, links, and images.\n\n' +
      'Example of a minimal HTML page with a heading and a paragraph.\n\n' +
      'Key Points:\n' +
      '1. HTML stands for HyperText Markup Language.\n' +
      '2. Tags define page content.\n' +
      '3. Every HTML file starts with DOCTYPE html.\n' +
      '4. Browsers read HTML and display it as a webpage.',
  },
]

const lessonAliases = {
  'python-variables': 'lesson-002',
  'variables': 'lesson-002',
  'python-intro': 'lesson-001',
  'loops': 'lesson-003',
  'html': 'lesson-005',
}

/**
 * Get a lesson by ID or alias.
 * Returns undefined if the lesson is not found so the page can show a friendly 404.
 */
export function getLessonById(id) {
  if (!id) return undefined
  const resolvedId = lessonAliases[id] || id
  return lessons.find(l => l.id === resolvedId)
}

export default lessons
