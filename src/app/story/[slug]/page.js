// app/story/[slug]/page.js
'use client'
import { useState, useEffect } from 'react'
import Header from '../../components/Header'
import Footer from '../../components/Footer'
import ArticleHero from '../../components/ArticleHero'
import ArticleContent from '../../components/ArticleContent'
import ReadMoreSection from '../../components/ReadMoreSection'
import { notFound } from 'next/navigation'

export default function ArticlePage({ params }) {
  const [article, setArticle] = useState(null)
  const [loading, setLoading] = useState(true)
  const [slug, setSlug] = useState('')

  useEffect(() => {
    // Handle async params
    const getSlug = async () => {
      const resolvedParams = await params
      setSlug(resolvedParams.slug)
    }
    getSlug()
  }, [params])

  useEffect(() => {
    if (slug) {
      fetchArticle()
    }
  }, [slug])

  const fetchArticle = async () => {
    try {
      const baseurl= process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'
      const response = await fetch(`${baseurl}/api/articles/${slug}`)

      if (!response.ok) {
        if (response.status === 404) {
          notFound()
        }
        throw new Error('Failed to fetch article')
      }
      
      const articleData = await response.json()
      setArticle(articleData)
    } catch (error) {
      console.error('Error fetching article:', error)
      notFound()
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <main className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-yellow-400 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading article...</p>
        </div>
      </main>
    )
  }

  if (!article) {
    notFound()
  }

  return (
    <main className="min-h-screen bg-white">
      <Header />
      <ArticleHero article={article} />
      <ArticleContent article={article} />
      <ReadMoreSection currentArticleId={article._id} />
      <Footer />
    </main>
  )
}