// app/api/articles/route.js
import { NextResponse } from 'next/server'
import connectToDatabase from '@/../lib/mongodb'
import Article from '@/../lib/models/Article'

// GET /api/articles - Get all articles with filtering
export async function GET(request) {
  try {
    await connectToDatabase()
    
    const { searchParams } = new URL(request.url)
    const category = searchParams.get('category')
    const featured = searchParams.get('featured')
    const limit = parseInt(searchParams.get('limit')) || 10
    const page = parseInt(searchParams.get('page')) || 1
    
    let query = { published: true }
    
    // Filter by category if provided
    if (category) {
      query.category = category
    }
    
    // Filter by featured if provided
    if (featured === 'true') {
      query.featured = true
    }
    
    const articles = await Article.find(query)
      .sort({ publishDate: -1 })
      .limit(limit)
      .skip((page - 1) * limit)
      .lean()
    
    const totalCount = await Article.countDocuments(query)
    
    return NextResponse.json({
      articles,
      totalCount,
      totalPages: Math.ceil(totalCount / limit),
      currentPage: page,
      category: category || null
    })
    
  } catch (error) {
    console.error('Error fetching articles:', error)
    return NextResponse.json(
      { error: 'Failed to fetch articles' },
      { status: 500 }
    )
  }
}

// POST /api/articles - Create new article
export async function POST(request) {
  try {
    await connectToDatabase()
    
    const body = await request.json()
    
    // Generate slug if not provided
    if (!body.slug) {
      body.slug = body.title
        .toLowerCase()
        .replace(/[^a-z0-9 -]/g, '')
        .replace(/\s+/g, '-')
        .replace(/-+/g, '-')
        .trim('-')
    }
    
    // Calculate read time if not provided
    if (!body.readTime) {
      const wordCount = body.content
        .filter(block => block.type === 'paragraph')
        .reduce((count, block) => count + block.text.split(' ').length, 0)
      body.readTime = `${Math.max(1, Math.ceil(wordCount / 200))} min read`
    }
    
    const article = new Article(body)
    await article.save()
    
    return NextResponse.json(article, { status: 201 })
    
  } catch (error) {
    console.error('Error creating article:', error)
    
    if (error.code === 11000) {
      return NextResponse.json(
        { error: 'Article with this slug already exists' },
        { status: 409 }
      )
    }
    
    return NextResponse.json(
      { error: 'Failed to create article' },
      { status: 500 }
    )
  }
}