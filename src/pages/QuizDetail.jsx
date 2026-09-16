// src/pages/QuizDetail.jsx
import { useParams } from 'react-router-dom'
import PlaceholderPage from '../components/PlaceholderPage'

export default function QuizDetail() {
  const { id } = useParams()
  return (
    <PlaceholderPage
      route={`/quiz/${id}`}
      title={`Quiz: ${id}`}
      description="Adaptive quiz engine with accessible question formats — Phase 4+."
    />
  )
}
