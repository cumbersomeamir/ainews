// app/components/ReadMoreSection.js
'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'

const ReadMoreSection = ({ currentArticleId }) => {
  const [relatedArticles, setRelatedArticles] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchRelatedArticles()
  }, [currentArticleId])

  const fetchRelatedArticles = async () => {
    try {
      baseurl= process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'
      const response = await fetch(`${baseurl}/api/articles?limit=8`)
      if (!response.ok) throw new Error('Failed to fetch articles')
      
      const data = await response.json()
      const articles = data.articles || []
      
      // Filter out current article and take first 4
      const filteredArticles = articles
        .filter(article => article._id !== currentArticleId)
        .slice(0, 4)
        .map(article => ({
          id: article._id,
          slug: article.slug,
          title: article.title,
          author: article.author,
          category: article.category,
          categoryTag: article.categoryTag || 'NEWS',
          image: article.heroImage,
          excerpt: article.subtitle || 'Latest updates in artificial intelligence and technology.'
        }))
      
      setRelatedArticles(filteredArticles)
    } catch (error) {
      console.error('Error fetching related articles:', error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <section className="bg-gray-50 py-16 border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-yellow-400 mx-auto mb-4"></div>
            <p className="text-gray-600">Loading related articles...</p>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="bg-gray-50 py-16 border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12">
          <div className="bg-black text-white px-4 py-2 inline-block text-sm font-bold uppercase tracking-wide mb-4">
            Read More
          </div>
          <h2 className="text-3xl font-bold text-black">
            Related Articles
          </h2>
          <p className="text-gray-600 mt-2">
            Discover more insights on artificial intelligence and technology
          </p>
        </div>

        {/* Articles Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {relatedArticles.map((article) => (
            <Link 
              key={article.id}
              href={`/story/${article.slug}`}
              className="group bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-all duration-300"
            >
              <div className="relative">
                <img
                  src={article.image}
                  alt={article.title}
                  className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute top-3 left-3">
                  <span className="bg-yellow-400 text-black px-2 py-1 text-xs font-bold uppercase tracking-wide">
                    {article.categoryTag}
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

        {/* Newsletter CTA */}
        <div className="mt-16 bg-black text-white rounded-lg p-8 text-center">
          <h3 className="text-2xl font-bold mb-4">
            Stay Ahead of the AI Revolution
          </h3>
          <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
            Get the latest artificial intelligence news, breakthroughs, and insights delivered directly to your inbox every week.
          </p>
          <div className="flex flex-col sm:flex-row max-w-md mx-auto gap-4">
            <input
              type="email"
              placeholder="Enter your email address"
              className="flex-1 px-4 py-3 rounded-lg text-black placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-yellow-400"
            />
            <button className="px-6 py-3 bg-yellow-400 text-black font-bold rounded-lg hover:bg-yellow-500 transition-colors duration-200">
              Subscribe
            </button>
          </div>
          <p className="text-xs text-gray-400 mt-4">
            Join 100,000+ AI enthusiasts. Unsubscribe anytime.
          </p>
        </div>

        {/* Browse More Categories */}
        <div className="mt-16 text-center">
          <h3 className="text-xl font-bold text-black mb-6">
            Explore More Topics
          </h3>
          <div className="flex flex-wrap justify-center gap-4">
            {[
              'AI Research',
              'Machine Learning', 
              'Robotics',
              'Computer Vision',
              'Natural Language Processing',
              'AI Ethics',
              'Industry News'
            ].map((category, index) => (
              <Link
                key={index}
                href={`/category/${category.toLowerCase().replace(/\s+/g, '-')}`}
                className="bg-white border border-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-50 hover:border-gray-400 transition-colors duration-200 text-sm font-medium"
              >
                {category}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default ReadMoreSection