// app/category/[slug]/page.js
'use client'
import { useState, useEffect } from 'react'
import { useParams } from 'next/navigation'
import Header from '../../components/Header'
import Footer from '../../components/Footer'
import Link from 'next/link'
import { notFound } from 'next/navigation'

export default function CategoryPage() {
  const params = useParams()
  const [articles, setArticles] = useState([])
  const [categoryInfo, setCategoryInfo] = useState(null)
  const [loading, setLoading] = useState(true)
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)

  // Category mapping from slug to display info
  const categoryMap = {
    'ai-research': {
      name: 'AI Research',
      description: 'Latest breakthroughs and developments in artificial intelligence research',
      icon: '🧠',
      color: 'bg-blue-600'
    },
    'machine-learning': {
      name: 'Machine Learning',
      description: 'Machine learning algorithms, neural networks, and deep learning advances',
      icon: '🤖',
      color: 'bg-green-600'
    },
    'tech-news': {
      name: 'Industry News',
      description: 'Technology industry updates, company news, and market developments',
      icon: '🏢',
      color: 'bg-purple-600'
    },
    'robotics': {
      name: 'Robotics',
      description: 'Robotics innovations, automation, and human-robot interaction',
      icon: '🦾',
      color: 'bg-red-600'
    },
    'industry': {
      name: 'Industry News',
      description: 'AI industry updates, company news, and market developments',
      icon: '🏢',
      color: 'bg-purple-600'
    },
    'computer-vision': {
      name: 'Computer Vision',
      description: 'Computer vision, image recognition, and visual AI technologies',
      icon: '👁️',
      color: 'bg-yellow-600'
    },
    'natural-language-processing': {
      name: 'Natural Language Processing',
      description: 'Language models, text processing, and conversational AI',
      icon: '💬',
      color: 'bg-indigo-600'
    },
    'ai-ethics': {
      name: 'AI Ethics',
      description: 'AI safety, ethics, governance, and responsible AI development',
      icon: '⚖️',
      color: 'bg-gray-600'
    }
  }

  useEffect(() => {
    if (params.slug) {
      fetchCategoryData()
    }
  }, [params.slug, currentPage])

  const fetchCategoryData = async () => {
    try {
      const category = categoryMap[params.slug]
      if (!category) {
        notFound()
        return
      }

      setCategoryInfo(category)

      // Fetch articles for this category
      baseurl= process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'
      const response = await fetch(`${baseurl}/api/articles?category=${encodeURIComponent(category.name)}&page=${currentPage}&limit=12`)
      if (!response.ok) throw new Error('Failed to fetch articles')

      const data = await response.json()
      setArticles(data.articles || [])
      setTotalPages(data.totalPages || 1)
    } catch (error) {
      console.error('Error fetching category data:', error)
    } finally {
      setLoading(false)
    }
  }

  const getTimeAgo = (publishDate) => {
    const now = new Date()
    const published = new Date(publishDate)
    const diffMs = now - published
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60))
    const diffDays = Math.floor(diffHours / 24)

    if (diffDays > 0) {
      return `${diffDays} day${diffDays > 1 ? 's' : ''} ago`
    } else if (diffHours > 0) {
      return `${diffHours} hour${diffHours > 1 ? 's' : ''} ago`
    } else {
      return 'Just now'
    }
  }

  if (loading) {
    return (
      <main className="min-h-screen bg-white">
        <Header />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-yellow-400 mx-auto mb-4"></div>
            <p className="text-gray-600">Loading category...</p>
          </div>
        </div>
        <Footer />
      </main>
    )
  }

  if (!categoryInfo) {
    notFound()
  }

  return (
    <main className="min-h-screen bg-white">
      <Header />
      
      {/* Category Hero Section */}
      <section className="bg-gray-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Breadcrumb */}
          <nav className="flex items-center space-x-2 text-sm mb-8">
            <Link href="/" className="text-gray-400 hover:text-white transition-colors">
              Home
            </Link>
            <span className="text-gray-600">/</span>
            <span className="text-white">Categories</span>
            <span className="text-gray-600">/</span>
            <span className="text-yellow-400">{categoryInfo.name}</span>
          </nav>

          <div className="flex items-center space-x-6">
            <div className={`w-20 h-20 ${categoryInfo.color} rounded-2xl flex items-center justify-center text-3xl`}>
              {categoryInfo.icon}
            </div>
            <div>
              <h1 className="text-4xl lg:text-5xl font-bold mb-4">
                {categoryInfo.name}
              </h1>
              <p className="text-xl text-gray-300 max-w-2xl">
                {categoryInfo.description}
              </p>
              <div className="mt-4 text-sm text-gray-400">
                {articles.length} article{articles.length !== 1 ? 's' : ''} available
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Articles Grid */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {articles.length === 0 ? (
            <div className="text-center py-16">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">{categoryInfo.icon}</span>
              </div>
              <h3 className="text-xl font-medium text-gray-900 mb-2">
                No articles in {categoryInfo.name} yet
              </h3>
              <p className="text-gray-600 mb-6">
                Check back soon for the latest updates in {categoryInfo.name.toLowerCase()}.
              </p>
              <Link
                href="/"
                className="inline-flex items-center px-4 py-2 bg-yellow-400 text-black font-medium rounded-lg hover:bg-yellow-500 transition-colors"
              >
                ← Back to Homepage
              </Link>
            </div>
          ) : (
            <>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {articles.map((article) => (
                  <Link
                    key={article._id}
                    href={`/story/${article.slug}`}
                    className="group bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 border border-gray-100"
                  >
                    <div className="relative">
                      <img
                        src={article.heroImage}
                        alt={article.title}
                        className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute top-3 left-3">
                        <span className="bg-yellow-400 text-black px-2 py-1 text-xs font-bold uppercase tracking-wide">
                          {article.categoryTag}
                        </span>
                      </div>
                      <div className="absolute top-3 right-3">
                        <span className="bg-black bg-opacity-70 text-white px-2 py-1 text-xs font-medium rounded">
                          {getTimeAgo(article.publishDate)}
                        </span>
                      </div>
                    </div>
                    
                    <div className="p-6">
                      <h3 className="text-xl font-bold text-black group-hover:text-gray-700 transition-colors mb-3 line-clamp-2">
                        {article.title}
                      </h3>
                      
                      <p className="text-gray-600 mb-4 line-clamp-3">
                        {article.subtitle}
                      </p>
                      
                      <div className="flex items-center justify-between">
                        <div className="text-sm font-bold uppercase tracking-wide text-gray-600">
                          {article.author}
                        </div>
                        <div className="text-sm text-gray-500">
                          {article.readTime}
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="mt-12 flex justify-center space-x-2">
                  <button
                    onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                    disabled={currentPage === 1}
                    className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Previous
                  </button>
                  
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                    <button
                      key={page}
                      onClick={() => setCurrentPage(page)}
                      className={`px-4 py-2 rounded-lg ${
                        currentPage === page
                          ? 'bg-yellow-400 text-black font-bold'
                          : 'border border-gray-300 text-gray-700 hover:bg-gray-50'
                      }`}
                    >
                      {page}
                    </button>
                  ))}
                  
                  <button
                    onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                    disabled={currentPage === totalPages}
                    className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Next
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </section>

      <Footer />
    </main>
  )
}