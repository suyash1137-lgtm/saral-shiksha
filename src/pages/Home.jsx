// src/pages/Home.jsx
import HeroSection from '../components/landing/HeroSection'
import ProblemSection from '../components/landing/ProblemSection'
import SolutionSection from '../components/landing/SolutionSection'
import AccessibilityFeaturesSection from '../components/landing/AccessibilityFeaturesSection'
import HowItWorksSection from '../components/landing/HowItWorksSection'
import ForStudentsSection from '../components/landing/ForStudentsSection'
import ForTeachersSection from '../components/landing/ForTeachersSection'
import FutureVisionSection from '../components/landing/FutureVisionSection'
import LandingFooter from '../components/landing/LandingFooter'

/**
 * Home page (route: "/")
 * Phase 2 — Full landing page composed from section components.
 * AccessibilityContext is consumed inside individual sections that need it.
 */
export default function Home() {
  return (
    <div className="flex flex-col w-full">
      <HeroSection />
      <ProblemSection />
      <SolutionSection />
      <AccessibilityFeaturesSection />
      <HowItWorksSection />
      <ForStudentsSection />
      <ForTeachersSection />
      <FutureVisionSection />
      <LandingFooter />
    </div>
  )
}
