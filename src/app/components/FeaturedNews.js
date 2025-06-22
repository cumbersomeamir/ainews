// app/components/FeaturedNews.js
'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'

const FeaturedNews = () => {
  const [featuredStories, setFeaturedStories] = useState([])
  const [sideStories, setSideStories] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchFeaturedArticles()
  }, [])

  const fetchFeaturedArticles = async () => {
    try {
      // Fetch articles from API
      const baseurl= process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'
      const response = await fetch(`${baseurl}/api/articles?limit=8`)
      if (!response.ok) throw new Error('Failed to fetch articles')
      
      const data = await response.json()
      const articles = data.articles || []
      
      // Split articles into featured and side stories
      const mainFeatured = articles.slice(0, 2).map(article => ({
        ...article,
        categoryTag: article.categoryTag || 'BREAKTHROUGH',
        excerpt: article.subtitle,
        href: `/story/${article.slug}`
      }))
      
      const sideArticles = articles.slice(2, 6).map(article => ({
        ...article,
        categoryTag: article.categoryTag || 'NEWS',
        image: article.heroImage
      }))
      
      setFeaturedStories(mainFeatured)
      setSideStories(sideArticles)
    } catch (error) {
      console.error('Error fetching featured articles:', error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <section className="bg-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-yellow-400 mx-auto mb-4"></div>
            <p className="text-gray-600">Loading featured articles...</p>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="bg-gray-50 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Featured Stories */}
          <div className="lg:col-span-2 space-y-8">
            <div className="bg-black text-white px-4 py-2 inline-block text-sm font-bold uppercase tracking-wide">
              Today's Picks
            </div>
            
            {featuredStories.map((story, index) => (
              <article key={story._id || index} className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300">
                <Link href={story.href} className="group">
                  <div className="md:flex">
                    <div className="md:w-1/2">
                      <div className="relative">
                        <img
                          src={story.heroImage}
                          alt={story.title}
                          className="w-full h-64 md:h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                        <div className="absolute top-4 left-4">
                          <span className="bg-black text-white px-3 py-1 text-xs font-bold uppercase tracking-wide">
                            {story.categoryTag}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="md:w-1/2 p-6">
                      <div className="text-xs font-bold uppercase tracking-wide text-gray-600 mb-2">
                        {story.category}
                      </div>
                      <h2 className="text-2xl font-bold text-black mb-4 group-hover:text-gray-700 transition-colors">
                        {story.title}
                      </h2>
                      <div className="text-xs font-bold uppercase tracking-wide text-gray-600 mb-3">
                        {story.author}
                      </div>
                      <p className="text-gray-600 leading-relaxed">
                        {story.excerpt}
                      </p>
                    </div>
                  </div>
                </Link>
              </article>
            ))}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <div className="bg-black text-white px-4 py-2 inline-block text-sm font-bold uppercase tracking-wide">
              Most Recent
            </div>
            
            {sideStories.map((story, index) => (
              <Link key={story._id || index} href={`/story/${story.slug}`} className="group block bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300">
                <div className="relative">
                  <img
                    src={story.image}
                    alt={story.title}
                    className="w-full h-32 object-cover group-hover:opacity-90 transition-opacity"
                  />
                  <div className="absolute top-3 left-3">
                    <span className="bg-yellow-400 text-black px-2 py-1 text-xs font-bold uppercase tracking-wide">
                      {story.categoryTag}
                    </span>
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="font-bold text-black group-hover:text-gray-700 transition-colors mb-2 line-clamp-2">
                    {story.title}
                  </h3>
                  <div className="text-xs font-bold uppercase tracking-wide text-gray-600">
                    {story.author}
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

export default FeaturedNews