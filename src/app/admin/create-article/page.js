// app/admin/create-article/page.js
'use client'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

export default function CreateArticle() {
  const [isAdmin, setIsAdmin] = useState(false)
  const [loading, setLoading] = useState(false)
  const [article, setArticle] = useState({
    title: '',
    subtitle: '',
    author: '',
    category: 'AI Research',
    categoryTag: 'BREAKTHROUGH',
    heroImage: '',
    content: ''
  })
  const router = useRouter()

  const categories = [
    { name: 'AI Research', tag: 'BREAKTHROUGH' },
    { name: 'Machine Learning', tag: 'ML' },
    { name: 'Robotics', tag: 'ROBOTS' },
    { name: 'Computer Vision', tag: 'VISION' },
    { name: 'Natural Language Processing', tag: 'NLP' },
    { name: 'AI Ethics', tag: 'ETHICS' },
    { name: 'Industry News', tag: 'INDUSTRY' }
  ]

  useEffect(() => {
    const adminAuth = localStorage.getItem('adminAuth')
    if (adminAuth !== 'true') {
      router.push('/admin/login')
      return
    }
    setIsAdmin(true)
  }, [router])

  const parseContent = (contentText) => {
    const lines = contentText.split('\n').filter(line => line.trim())
    const contentBlocks = []

    lines.forEach(line => {
      const trimmed = line.trim()
      
      if (trimmed.startsWith('# ')) {
        contentBlocks.push({
          type: 'heading',
          text: trimmed.substring(2)
        })
      } else if (trimmed.startsWith('> ')) {
        const quoteText = trimmed.substring(2)
        const parts = quoteText.split(' - ')
        if (parts.length > 1) {
          contentBlocks.push({
            type: 'quote',
            text: parts[0],
            author: parts[1]
          })
        } else {
          contentBlocks.push({
            type: 'quote',
            text: quoteText
          })
        }
      } else if (trimmed.startsWith('![')) {
        const match = trimmed.match(/!\[([^\]]*)\]\(([^)]+)\)(?:\s*"([^"]*)")?/)
        if (match) {
          contentBlocks.push({
            type: 'image',
            src: match[2],
            alt: match[1],
            caption: match[3] || ''
          })
        }
      } else if (trimmed.startsWith('- ')) {
        const listItem = trimmed.substring(2)
        const lastBlock = contentBlocks[contentBlocks.length - 1]
        if (lastBlock && lastBlock.type === 'list') {
          lastBlock.items.push(listItem)
        } else {
          contentBlocks.push({
            type: 'list',
            items: [listItem]
          })
        }
      } else if (trimmed.length > 0) {
        contentBlocks.push({
          type: 'paragraph',
          text: trimmed
        })
      }
    })

    return contentBlocks
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)

    try {
      const contentBlocks = parseContent(article.content)
      
      const articleData = {
        title: article.title,
        subtitle: article.subtitle,
        author: article.author || 'AI News Team',
        category: article.category,
        categoryTag: article.categoryTag,
        heroImage: article.heroImage || 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=1200&h=600&fit=crop',
        content: contentBlocks,
        published: true
      }
      baseurl= process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'

      // POST to API
      const response = await fetch(`${baseurl}/api/articles`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(articleData)
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || 'Failed to create article')
      }

      const createdArticle = await response.json()
      console.log('Article created successfully:', createdArticle)

      // Redirect to dashboard
      router.push('/admin/dashboard')
    } catch (error) {
      console.error('Error creating article:', error)
      alert(`Error creating article: ${error.message}`)
    }

    setLoading(false)
  }

  const handleCategoryChange = (categoryName) => {
    const category = categories.find(cat => cat.name === categoryName)
    setArticle({
      ...article,
      category: categoryName,
      categoryTag: category?.tag || 'NEWS'
    })
  }

  if (!isAdmin) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-yellow-400 mx-auto mb-4"></div>
          <p className="text-gray-600">Checking authentication...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Admin Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <Link href="/admin/dashboard" className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-yellow-400 rounded-lg flex items-center justify-center">
                  <span className="text-black font-bold text-lg">AI</span>
                </div>
                <span className="text-xl font-bold text-black">Create Article</span>
              </Link>
            </div>
            
            <div className="flex items-center space-x-4">
              <Link 
                href="/admin/dashboard"
                className="text-gray-600 hover:text-gray-900 text-sm font-medium"
              >
                ← Back to Dashboard
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Form Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Basic Information */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-lg font-medium text-gray-900 mb-6">Basic Information</h2>
            
            <div className="grid grid-cols-1 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Article Title *
                </label>
                <input
                  type="text"
                  required
                  value={article.title}
                  onChange={(e) => setArticle({...article, title: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent"
                  placeholder="Enter the article title"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Article Subtitle *
                </label>
                <textarea
                  required
                  value={article.subtitle}
                  onChange={(e) => setArticle({...article, subtitle: e.target.value})}
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent"
                  placeholder="Enter a brief description or subtitle for the article"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Author Name
                  </label>
                  <input
                    type="text"
                    value={article.author}
                    onChange={(e) => setArticle({...article, author: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent"
                    placeholder="Author name (optional)"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Category *
                  </label>
                  <select
                    required
                    value={article.category}
                    onChange={(e) => handleCategoryChange(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent"
                  >
                    {categories.map((category) => (
                      <option key={category.name} value={category.name}>
                        {category.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Hero Image URL
                </label>
                <input
                  type="url"
                  value={article.heroImage}
                  onChange={(e) => setArticle({...article, heroImage: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent"
                  placeholder="https://example.com/image.jpg (optional)"
                />
                {article.heroImage && (
                  <div className="mt-3">
                    <img
                      src={article.heroImage}
                      alt="Hero preview"
                      className="w-full h-32 object-cover rounded-lg"
                      onError={(e) => {
                        e.target.style.display = 'none'
                      }}
                    />
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Content Editor */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-lg font-medium text-gray-900 mb-4">Article Content</h2>
            
            <div className="mb-4 p-4 bg-gray-50 rounded-lg">
              <h3 className="text-sm font-medium text-gray-700 mb-2">Formatting Guide:</h3>
              <div className="text-xs text-gray-600 space-y-1">
                <p><code># Heading</code> - Creates a section heading</p>
                <p><code>&gt; Quote text - Author Name</code> - Creates a blockquote</p>
                <p><code>![Alt text](image-url) "Caption"</code> - Adds an image</p>
                <p><code>- List item</code> - Creates bulleted lists</p>
                <p>Regular paragraphs are created automatically from text lines</p>
              </div>
            </div>

            <textarea
              required
              value={article.content}
              onChange={(e) => setArticle({...article, content: e.target.value})}
              rows={20}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent font-mono text-sm"
              placeholder="Write your article content here...

Example:
OpenAI has just announced a groundbreaking advancement in artificial intelligence that could reshape the entire industry.

# The Technical Breakthrough

The new model demonstrates unprecedented capabilities in reasoning and problem-solving, surpassing previous benchmarks by significant margins.

> This represents a fundamental shift in how we approach artificial intelligence development. - Dr. Sarah Chen, AI Researcher

# Key Implications

The implications of this breakthrough extend far beyond the laboratory:

- Enhanced decision-making capabilities
- Improved natural language understanding  
- Revolutionary applications in healthcare
- Transformative impact on education

![AI Breakthrough](https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&h=400&fit=crop) &quot;The future of AI is here&quot;

This development marks a significant milestone in the journey toward artificial general intelligence."
            />

            {/* Live Preview */}
            {article.content && (
              <div className="mt-6">
                <h3 className="text-sm font-medium text-gray-700 mb-3">Live Preview:</h3>
                <div className="border border-gray-200 rounded-lg p-4 bg-gray-50 max-h-64 overflow-y-auto">
                  {parseContent(article.content).map((block, index) => {
                    switch (block.type) {
                      case 'heading':
                        return <h2 key={index} className="text-xl font-bold mb-3">{block.text}</h2>
                      case 'paragraph':
                        return <p key={index} className="mb-3 text-gray-700">{block.text}</p>
                      case 'quote':
                        return (
                          <blockquote key={index} className="border-l-4 border-yellow-400 pl-4 mb-3 italic text-gray-600">
                            "{block.text}" {block.author && <cite>- {block.author}</cite>}
                          </blockquote>
                        )
                      case 'list':
                        return (
                          <ul key={index} className="list-disc pl-6 mb-3">
                            {block.items.map((item, i) => <li key={i}>{item}</li>)}
                          </ul>
                        )
                      case 'image':
                        return (
                          <div key={index} className="mb-3">
                            <img src={block.src} alt={block.alt} className="max-w-full h-auto rounded" />
                            {block.caption && <p className="text-sm text-gray-500 mt-1">{block.caption}</p>}
                          </div>
                        )
                      default:
                        return null
                    }
                  })}
                </div>
              </div>
            )}
          </div>

          {/* Submit Button */}
          <div className="flex justify-end space-x-4">
            <Link
              href="/admin/dashboard"
              className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Cancel
            </Link>
            <button
              type="submit"
              disabled={loading}
              className="px-6 py-3 bg-yellow-400 text-black font-bold rounded-lg hover:bg-yellow-500 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Publishing...' : 'Publish Article'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}