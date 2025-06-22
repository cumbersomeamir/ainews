// app/components/CategoryGrid.js
'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'

const CategoryGrid = () => {
  const [categories, setCategories] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchCategoriesWithArticles()
  }, [])

  const fetchCategoriesWithArticles = async () => {
    try {
      // Fetch all articles
      const baseurl= process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'
      const articlesResponse = await fetch(`${baseurl}/api/articles?limit=50`)
      if (!articlesResponse.ok) throw new Error('Failed to fetch articles')
      
      const articlesData = await articlesResponse.json()
      const articles = articlesData.articles || []

      // Group articles by category and create category data
      const categoryMap = {
        'Machine Learning': {
          name: 'Machine Learning',
          tag: 'ML',
          image: 'https://images.unsplash.com/photo-1555255707-c07966088b7b?w=400&h=300&fit=crop',
          color: 'bg-blue-600'
        },
        'Robotics': {
          name: 'Robotics',
          tag: 'ROBOTS',
          image: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=400&h=300&fit=crop',
          color: 'bg-red-600'
        },
        'Computer Vision': {
          name: 'Computer Vision',
          tag: 'VISION',
          image: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=400&h=300&fit=crop',
          color: 'bg-green-600'
        },
        'Natural Language Processing': {
          name: 'Natural Language Processing',
          tag: 'NLP',
          image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=400&h=300&fit=crop',
          color: 'bg-purple-600'
        }
      }

      // Process articles by category
      const processedCategories = Object.keys(categoryMap).map(categoryName => {
        const categoryArticles = articles
          .filter(article => article.category === categoryName)
          .slice(0, 3) // Get first 3 articles for each category
          .map(article => ({
            title: article.title,
            author: article.author,
            slug: article.slug
          }))

        return {
          ...categoryMap[categoryName],
          stories: categoryArticles
        }
      }).filter(category => category.stories.length > 0) // Only show categories with articles

      setCategories(processedCategories)
    } catch (error) {
      console.error('Error fetching categories and articles:', error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <section className="bg-white py-16 border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-yellow-400 mx-auto mb-4"></div>
            <p className="text-gray-600">Loading categories...</p>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="bg-white py-16 border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {categories.map((category, index) => (
            <div key={index} className="space-y-6">
              {/* Category Header */}
              <div className="relative">
                <div className="bg-black text-white px-4 py-2 inline-block text-sm font-bold uppercase tracking-wide mb-4">
                  {category.tag}
                </div>
                <Link href={`/category/${category.name.toLowerCase().replace(/\s+/g, '-')}`} className="group">
                  <div className="relative overflow-hidden rounded-lg mb-4">
                    <img
                      src={category.image}
                      alt={category.name}
                      className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-black bg-opacity-40 group-hover:bg-opacity-30 transition-all duration-300" />
                    <div className="absolute bottom-4 left-4 text-white">
                      <h3 className="text-xl font-bold">{category.name}</h3>
                    </div>
                  </div>
                </Link>
              </div>

              {/* Category Stories */}
              <div className="space-y-4">
                {category.stories.map((story, storyIndex) => (
                  <Link 
                    key={storyIndex} 
                    href={`/story/${story.slug}`}
                    className="group block"
                  >
                    <h4 className="font-bold text-black group-hover:text-gray-700 transition-colors text-sm leading-tight mb-1">
                      {story.title}
                    </h4>
                    <div className="text-xs font-bold uppercase tracking-wide text-gray-600">
                      {story.author}
                    </div>
                  </Link>
                ))}
                
                <Link 
                  href={`/category/${category.name.toLowerCase().replace(/\s+/g, '-')}`}
                  className="inline-flex items-center text-blue-600 hover:text-blue-800 font-medium text-sm group"
                >
                  View all {category.name} articles
                  <svg className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default CategoryGrid