// src/pages/LessonDetail.jsx
import { useParams } from 'react-router-dom'
import PlaceholderPage from '../components/PlaceholderPage'

export default function LessonDetail() {
  const { id } = useParams()
  return (
    <PlaceholderPage
      route={`/lesson/${id}`}
      title={`Lesson: ${id}`}
      description="Lesson viewer with accessibility controls (read-aloud, captions, reduced-motion) — Phase 3+."
    />
  )
}
