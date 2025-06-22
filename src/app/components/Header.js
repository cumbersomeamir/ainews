// app/components/Header.js
'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isAdmin, setIsAdmin] = useState(false)

  const navItems = [
    { name: 'Home', href: '/' },
    { name: 'AI Research', href: '/category/ai-research' },
    { name: 'Machine Learning', href: '/category/machine-learning' },
    { name: 'Tech News', href: '/category/tech-news' },
    { name: 'Robotics', href: '/category/robotics' },
    { name: 'Industry', href: '/category/industry' }
  ]

  useEffect(() => {
    // Check if user is admin
    const adminAuth = localStorage.getItem('adminAuth')
    setIsAdmin(adminAuth === 'true')
  }, [])

  return (
    <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-yellow-400 rounded-lg flex items-center justify-center">
              <span className="text-black font-bold text-lg">AI</span>
            </div>
            <span className="text-xl font-bold text-black">
              Artificial Intelligence News
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-gray-600 hover:text-blue-600 font-medium transition-colors duration-200"
              >
                {item.name}
              </Link>
            ))}
          </nav>

          {/* Right Side - Search & Admin */}
          <div className="hidden md:flex items-center space-x-4">
            <button className="p-2 text-gray-400 hover:text-gray-600">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </button>
            
            {/* Admin Button */}
            {isAdmin ? (
              <Link
                href="/admin/dashboard"
                className="bg-yellow-400 text-black px-3 py-1.5 rounded-lg text-sm font-bold hover:bg-yellow-500 transition-colors"
              >
                Admin Panel
              </Link>
            ) : (
              <Link
                href="/admin/login"
                className="text-gray-600 hover:text-gray-900 text-sm font-medium"
              >
                Admin
              </Link>
            )}
          </div>

          {/* Mobile menu button */}
          <button
            className="md:hidden p-2 text-gray-400 hover:text-gray-600"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-200">
            <nav className="flex flex-col space-y-4">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="text-gray-600 hover:text-blue-600 font-medium"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
              
              {/* Mobile Admin Link */}
              <div className="pt-2 border-t border-gray-200">
                {isAdmin ? (
                  <Link
                    href="/admin/dashboard"
                    className="text-yellow-600 font-medium"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Admin Panel
                  </Link>
                ) : (
                  <Link
                    href="/admin/login"
                    className="text-gray-600 font-medium"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Admin Login
                  </Link>
                )}
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  )
}

export default Header