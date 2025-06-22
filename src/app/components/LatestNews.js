// app/components/LatestNews.js
'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'

const LatestNews = () => {
  const [articles, setArticles] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchLatestArticles()
  }, [])

  const fetchLatestArticles = async () => {
    try {
      const baseurl= process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'
      const response = await fetch(`${baseurl}/api/articles?limit=6`)
      if (!response.ok) throw new Error('Failed to fetch articles')
      
      const data = await response.json()
      const articlesWithTime = (data.articles || []).map(article => ({
        ...article,
        timeAgo: getTimeAgo(article.publishDate),
        excerpt: article.subtitle || 'Latest updates in artificial intelligence and technology.'
      }))
      
      setArticles(articlesWithTime)
    } catch (error) {
      console.error('Error fetching articles:', error)
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
      <section className="bg-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-yellow-400 mx-auto mb-4"></div>
            <p className="text-gray-600">Loading latest news...</p>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="bg-gray-50 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <div className="bg-black text-white px-4 py-2 inline-block text-sm font-bold uppercase tracking-wide">
            Latest News
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {articles.map((article) => (
            <Link 
              key={article._id}
              href={`/story/${article.slug}`}
              className="group bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-all duration-300"
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
                    {article.timeAgo}
                  </span>
                </div>
              </div>
              
              <div className="p-6">
                <div className="text-xs font-bold uppercase tracking-wide text-gray-600 mb-2">
                  {article.category}
                </div>
                <h3 className="font-bold text-black group-hover:text-gray-700 transition-colors mb-3 line-clamp-2">
                  {article.title}
                </h3>
                <div className="text-xs font-bold uppercase tracking-wide text-gray-600 mb-3">
                  {article.author}
                </div>
                <p className="text-gray-600 text-sm leading-relaxed line-clamp-3">
                  {article.excerpt}
                </p>
              </div>
            </Link>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link 
            href="/latest" 
            className="inline-flex items-center px-6 py-3 bg-black text-white font-bold uppercase tracking-wide text-sm hover:bg-gray-800 transition-colors duration-200"
          >
            View All Latest News
            <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  )
}

export default LatestNews