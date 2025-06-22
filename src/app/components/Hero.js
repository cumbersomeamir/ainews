// app/components/Hero.js
'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'

const Hero = () => {
  const [featuredArticle, setFeaturedArticle] = useState(null)
  const [recentArticles, setRecentArticles] = useState([])
  const [loading, setLoading] = useState(true)

  const categories = [
    { name: 'AI Research', icon: '🧠', href: '/category/ai-research' },
    { name: 'Machine Learning', icon: '🤖', href: '/category/machine-learning' },
    { name: 'Neural Networks', icon: '🕸️', href: '/category/neural-networks' },
    { name: 'Computer Vision', icon: '👁️', href: '/category/computer-vision' },
    { name: 'NLP', icon: '💬', href: '/category/nlp' },
    { name: 'Robotics', icon: '🦾', href: '/category/robotics' },
    { name: 'AI Ethics', icon: '⚖️', href: '/category/ai-ethics' }
  ]

  useEffect(() => {
    fetchArticles()
  }, [])

  const fetchArticles = async () => {
    try {
      const baseurl= process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'
      // Fetch recent articles from API
      const response = await fetch(`${baseurl}/api/articles?limit=5`)
      if (!response.ok) throw new Error('Failed to fetch articles')
      
      const data = await response.json()
      const articles = data.articles || []
      
      if (articles.length > 0) {
        // First article is featured
        setFeaturedArticle(articles[0])
        // Next 4 are recent articles
        setRecentArticles(articles.slice(1, 5))
      }
    } catch (error) {
      console.error('Error fetching articles:', error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <section className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-yellow-400 mx-auto mb-4"></div>
            <p className="text-gray-600">Loading articles...</p>
          </div>
        </div>
      </section>
    )
  }

  if (!featuredArticle) {
    return (
      <section className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center">
            <p className="text-gray-600">No articles found</p>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Category Navigation Bar */}
        <div className="mb-12">
          <div className="bg-black text-white px-4 py-2 inline-block text-sm font-bold uppercase tracking-wide mb-6">
            How to Navigate AI
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4">
            {categories.map((category, index) => (
              <Link
                key={index}
                href={category.href}
                className="group text-center p-4 rounded-lg hover:bg-gray-50 transition-colors duration-200"
              >
                <div className="w-16 h-16 mx-auto mb-3 bg-yellow-400 rounded-full flex items-center justify-center text-2xl group-hover:bg-yellow-500 transition-colors duration-200">
                  {category.icon}
                </div>
                <div className="text-sm font-medium text-gray-900 group-hover:text-blue-600">
                  {category.name}
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Featured Story */}
        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="bg-black text-white px-4 py-2 inline-block text-sm font-bold uppercase tracking-wide mb-4">
              The Big Story
            </div>
            <Link href={`/story/${featuredArticle.slug}`} className="group">
              <div className="relative overflow-hidden rounded-lg mb-4">
                <img
                  src={featuredArticle.heroImage}
                  alt={featuredArticle.title}
                  className="w-full h-80 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute top-4 left-4">
                  <span className="bg-yellow-400 text-black px-3 py-1 text-xs font-bold uppercase tracking-wide">
                    {featuredArticle.categoryTag}
                  </span>
                </div>
              </div>
              <h1 className="text-3xl lg:text-4xl font-bold text-black mb-4 group-hover:text-gray-700 transition-colors">
                {featuredArticle.title}
              </h1>
              <div className="text-sm font-bold uppercase tracking-wide text-gray-600 mb-2">
                {featuredArticle.author}
              </div>
              <p className="text-gray-600 text-lg leading-relaxed">
                {featuredArticle.subtitle}
              </p>
            </Link>
          </div>

          {/* Side Stories */}
          <div className="space-y-6">
            <div className="bg-black text-white px-4 py-2 inline-block text-sm font-bold uppercase tracking-wide">
              Most Recent
            </div>
            
            {recentArticles.map((story, index) => (
              <Link key={story._id || index} href={`/story/${story.slug}`} className="group block">
                <div className="flex space-x-4">
                  <img
                    src={story.heroImage}
                    alt={story.title}
                    className="w-20 h-20 object-cover rounded-lg flex-shrink-0 group-hover:opacity-80 transition-opacity"
                  />
                  <div className="flex-1 min-w-0">
                    <h3 className="font-bold text-black group-hover:text-gray-700 transition-colors line-clamp-2 mb-1">
                      {story.title}
                    </h3>
                    <div className="text-xs font-bold uppercase tracking-wide text-gray-600">
                      {story.author}
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default Hero