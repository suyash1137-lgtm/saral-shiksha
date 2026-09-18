# 🎓 Saral Shiksha

> **"Learning that adapts to every student."**

An accessible, personalized learning platform for students with visual, hearing, and cognitive/learning difficulties — built for the **Hack2Ignite** hackathon.

---

## 🌟 Key Highlights

- **Dual-Experience Platform**: Comprehensive portals for both **Students** (adaptive learning) and **Educators** (progress tracking & interventions).
- **Instant Personalization**: One Accessibility Profile immediately transforms the UI and content across all pages without page reloads.
- **Cognitive & Simple Language Mode**: Real-time toggling between standard academic curriculum and simplified cognitive breakdowns.
- **Multimodal Learning Engine**: Browser-native **Read Aloud** (SpeechSynthesis), accessible code blocks, transcript/caption panels, and colorblind-safe quiz indicators.
- **Saral AI Assistant**: Floating learning companion with quick prompt actions (*Explain simply*, *Give an example*, *Translate*, *Read aloud*).
- **Automated Educator Alerts**: Flags students falling behind (<50% progress threshold) and enables 1-click targeted academic interventions.
- **WCAG Compliant Violet Theme**: Unified high-contrast, accessible light violet aesthetic (`#F5F0FF`) with zero color-only dependencies.

---

## 🚀 Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React 18 + Vite 5 |
| Styling | Tailwind CSS 3 + Custom Accessibility Utilities |
| Routing | React Router 6 |
| State Management | React Context (`AccessibilityContext`, `AuthContext`) + LocalStorage Persistence |
| Speech Engine | Web Speech API (`SpeechSynthesis`) |
| Icons | Lucide React |

---

## 📁 Project Structure

```
src/
├── components/          # Reusable UI & accessibility engine components
│   ├── AccessibilityToolbar.jsx  # Floating 6-toggle quick accessibility controls
│   ├── AIAssistant.jsx           # Floating AI learning assistant modal & actions
│   ├── FormInput.jsx             # Accessible form input with ARIA descriptions
│   ├── Navbar.jsx                # Responsive global navigation with auth badge
│   ├── ReadAloudButton.jsx       # SpeechSynthesis text-to-speech button
│   ├── SimpleLanguageToggle.jsx  # Normal vs. simplified content switcher
│   ├── Toast.jsx                 # Unified status toast notifications
│   └── TranscriptPanel.jsx       # Accessible expandable transcripts/captions
├── context/             # Global providers
│   ├── AccessibilityContext.jsx  # Font size, contrast, TTS, captions, simplified language
│   └── AuthContext.jsx           # Student & Teacher auth (with Demo Student & Prof. Janhavi)
├── data/                # Structured curriculum, quizzes, and student roster
│   ├── courses.js                # Course definitions with lesson outlines & progress
│   ├── lessons.js                # Dual-content lesson modules with transcripts
│   ├── quizzes.js                # Multi-question quizzes with explanations
│   └── students.js               # Student roster with accessibility tags & completion rates
├── layouts/             # Page wrappers
│   └── MainLayout.jsx            # Global container with unified violet theme (#F5F0FF)
├── pages/               # Route-level pages
│   ├── Accessibility.jsx         # Accessibility Profile customization
│   ├── Courses.jsx               # Filterable course catalog
│   ├── Dashboard.jsx             # Student dashboard with equal-height cards & streaks
│   ├── Home.jsx                  # EdTech landing page with 9-point future roadmap
│   ├── LessonDetail.jsx          # Adaptive lesson viewer with 404 handling
│   ├── Login.jsx                 # Student login with 1-click Demo Student
│   ├── Progress.jsx              # Progress tracking & localStorage quiz achievements
│   ├── QuizDetail.jsx            # Colorblind-safe interactive quiz engine
│   ├── Signup.jsx                # Student registration
│   └── teacher/                  # Educator portal
│       ├── CreateCourse.jsx      # Inclusive course authoring (dual-text pairing)
│       ├── Students.jsx          # Student progress roster & intervention dispatcher
│       ├── TeacherDashboard.jsx  # Educator metrics & intervention alert banner
│       └── TeacherLogin.jsx      # Educator sign-in with 1-click Demo Teacher
└── services/            # Service modules
    └── aiService.js              # Context-aware AI assistant responses
```

---

## ♿ Accessibility Engine

All accessibility settings are centralized in `AccessibilityContext` and applied immediately via global DOM hooks and CSS classes:

| Feature | Behavior |
|---|---|
| **Large Text** | Scales root font size and boosts `h1/h2/h3/p` hierarchy dynamically across the entire app. |
| **High Contrast** | Boosts contrast ratios platform-wide and applies explicit high-contrast borders and text. |
| **Read Aloud** | Automatically speaks lesson content or individual explanations using the browser Web Speech API. |
| **Simple Language** | Swaps dense curriculum terminology for plain-language, cognitive-friendly explanations. |
| **Captions / Transcripts** | Auto-expands rich text transcripts for audio/video media. |
| **Reduced Motion** | Disables transitions and progress-bar animations, respecting user toggle and OS preferences. |

---

## 🗺️ Routes Map

| Route | Page / Feature |
|---|---|
| `/` | EdTech Landing Page (Problem, Solution, Features, Roadmap) |
| `/login` | Student Login (*Try Demo Student* one-click button) |
| `/signup` | Student Registration |
| `/accessibility` | Accessibility Profile Configuration |
| `/dashboard` | Student Dashboard (Streaks, Enrolled Courses, Recommendations) |
| `/courses` | Course Catalog with Category Search |
| `/lesson/:id` | Adaptive Accessible Lesson with AI Assistant & TTS |
| `/quiz/:id` | Interactive Quiz Engine with Explanations |
| `/progress` | Personal Analytics & Quiz Mastery Records |
| `/teacher/login` | Educator Portal Login (*Try Demo Teacher* one-click button) |
| `/teacher/dashboard` | Educator Dashboard with Intervention Alerts |
| `/teacher/course/create` | Dual-Explanation Course Builder |
| `/teacher/students` | Student Progress Roster & Intervention Manager |

---

## 🎯 Hackathon Demo Walkthroughs

### 1. Student Demo Path
1. Go to `/login` → Click **"Try Demo Student"** → Logs in instantly as *Demo Student*.
2. On `/accessibility`, select **Simple Language**, **Larger Text**, and **High Contrast** → Click **"Save Preferences"** → **"Continue to Dashboard"**.
3. View `/dashboard` rendered in high contrast with scaled typography.
4. Click **"Continue Learning"** on *Python Basics* → Opens `/lesson/lesson-002`.
5. Observe the lesson rendered directly in **Simple Language Mode** (*"A variable is like a box that stores information."*).
6. Click **"Ask Saral AI"** → Ask *"What is a variable?"* → Click **"🔊 Read aloud"** to hear the response.
7. Click **"Take the Quiz"** → Answer Question 1 → Observe the colorblind-safe badge and explanation.
8. Finish Quiz → Click **"Continue to Progress"** → View your verified score recorded under **Quiz Achievements**.

### 2. Teacher Demo Path
1. Go to `/teacher/login` → Click **"Try Demo Teacher"** → Logs in as *Prof. Janhavi*.
2. On `/teacher/dashboard`, observe the **Intervention Alert** highlighting *Student B* at 35% completion.
3. Click **"Create Course"** (`/teacher/course/create`) → Click **"Load Example (Photosynthesis)"** → Inspect the side-by-side normal vs. simplified authoring fields.
4. Click **"View Students"** (`/teacher/students`) → Filter by *Needs Attention* → Open *Student B*'s dossier modal.
5. Click **"Send Intervention"** → Observe the live delivery confirmation toast.

---

## 🏃 Getting Started

```bash
# Clone repository and install dependencies
git clone https://github.com/suyash1137-lgtm/saral-shiksha.git
cd saral-shiksha
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

---

*All 15 Phases Complete — Hack2Ignite 2026*
