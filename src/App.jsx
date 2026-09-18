// src/App.jsx
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { AccessibilityProvider } from './context/AccessibilityContext'
import { ThemeProvider } from './context/ThemeContext'
import { AuthProvider } from './context/AuthContext'
import MainLayout from './layouts/MainLayout'

// Student pages
import Home          from './pages/Home'
import Login         from './pages/Login'
import Signup        from './pages/Signup'
import Accessibility from './pages/Accessibility'
import Dashboard     from './pages/Dashboard'
import Courses       from './pages/Courses'
import LessonDetail  from './pages/LessonDetail'
import QuizDetail    from './pages/QuizDetail'
import Progress      from './pages/Progress'
import NotFound      from './pages/NotFound'

// Teacher pages
import TeacherLogin     from './pages/teacher/TeacherLogin'
import TeacherDashboard from './pages/teacher/TeacherDashboard'
import CreateCourse     from './pages/teacher/CreateCourse'
import Students         from './pages/teacher/Students'

export default function App() {
  return (
    // AccessibilityProvider wraps everything so global CSS classes apply to <html>
    <AccessibilityProvider>
      {/* ThemeProvider manages light/dark mode */}
      <ThemeProvider>
        {/* AuthProvider is nested inside so it can be consumed anywhere */}
        <AuthProvider>
          <BrowserRouter>
            <Routes>
              <Route element={<MainLayout />}>
                {/* Student routes */}
                <Route path="/"                    element={<Home />} />
                <Route path="/login"               element={<Login />} />
                <Route path="/signup"              element={<Signup />} />
                <Route path="/accessibility"       element={<Accessibility />} />
                <Route path="/dashboard"           element={<Dashboard />} />
                <Route path="/courses"             element={<Courses />} />
                <Route path="/lesson/:id"          element={<LessonDetail />} />
                <Route path="/quiz/:id"            element={<QuizDetail />} />
                <Route path="/progress"            element={<Progress />} />

                {/* Teacher routes */}
                <Route path="/teacher/login"           element={<TeacherLogin />} />
                <Route path="/teacher/dashboard"       element={<TeacherDashboard />} />
                <Route path="/teacher/course/create"   element={<CreateCourse />} />
                <Route path="/teacher/students"        element={<Students />} />

                {/* 404 */}
                <Route path="*" element={<NotFound />} />
              </Route>
            </Routes>
          </BrowserRouter>
        </AuthProvider>
      </ThemeProvider>
    </AccessibilityProvider>
  )
}
