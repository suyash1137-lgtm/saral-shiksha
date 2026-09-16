// src/layouts/MainLayout.jsx
import { Outlet, useLocation } from 'react-router-dom'
import Navbar from '../components/Navbar'

/**
 * MainLayout wraps every page via React Router's nested routes.
 * The home page (/) is full-bleed — its sections own their own containers.
 * All other pages receive the standard padded container.
 */
export default function MainLayout() {
  const { pathname } = useLocation()
  const isHome = pathname === '/'

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navbar />
      <main className={`flex-1 ${isHome ? '' : 'container mx-auto px-4 py-8'}`}>
        <Outlet />
      </main>
    </div>
  )
}
