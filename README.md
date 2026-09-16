# 🎓 Saral Shiksha

> **"Learning that adapts to every student."**

An accessible, personalized learning platform for students with visual, hearing, and cognitive/learning difficulties — built for **Hack2Ignite** hackathon.

---

## 🚀 Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React 18 + Vite 5 |
| Styling | Tailwind CSS 3 |
| Routing | React Router 6 |
| Icons | Lucide React |
| Data (Phase 1) | Mock JSON + localStorage |
| Data (Phase 2+) | Express + MongoDB *(planned)* |

---

## 📁 Project Structure

```
src/
├── components/      # Reusable UI components
├── context/         # Global state (AccessibilityContext)
├── data/            # Mock data (courses, students)
├── hooks/           # Custom React hooks
├── layouts/         # Page wrappers (MainLayout)
├── pages/           # Route-level page components
│   └── teacher/     # Educator-specific pages
└── utils/           # Utility helpers
```

---

## ♿ Accessibility Features

- **Font Size** — Normal / Large toggle
- **High Contrast** — Increases visual contrast
- **Read Aloud** — Text-to-speech for lesson content
- **Captions** — Closed captions on media
- **Simple Language** — Plain-language rewrites
- **Reduced Motion** — Minimises animations

All settings are persisted to `localStorage`.

---

## 🗺️ Routes

| Route | Page |
|---|---|
| `/` | Home |
| `/login` | Student Login |
| `/signup` | Register |
| `/accessibility` | Accessibility Settings |
| `/dashboard` | Student Dashboard |
| `/courses` | Course Catalogue |
| `/lesson/:id` | Lesson Viewer |
| `/quiz/:id` | Quiz Engine |
| `/progress` | Progress Tracker |
| `/teacher/login` | Teacher Login |
| `/teacher/dashboard` | Teacher Dashboard |
| `/teacher/course/create` | Course Builder |
| `/teacher/students` | Student Management |

---

## 🏃 Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173)

---

## 🔨 Build

```bash
npm run build
npm run preview
```

---

*Phase 1 of 15 — Project Foundation*
