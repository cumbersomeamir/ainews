// app/api/articles/[slug]/route.js
import { NextResponse } from 'next/server'
import connectToDatabase from '../../../../../lib/mongodb'
import Article from '../../../../../lib/models/Article'

// GET /api/articles/[slug] - Get single article by slug
export async function GET(request, { params }) {
  try {
    await connectToDatabase()
    
    const resolvedParams = await params
    const article = await Article.findOne({ 
      slug: resolvedParams.slug,
      published: true 
    }).lean()
    
    if (!article) {
      return NextResponse.json(
        { error: 'Article not found' },
        { status: 404 }
      )
    }
    
    // Increment view count
    await Article.findByIdAndUpdate(article._id, { 
      $inc: { views: 1 } 
    })
    
    return NextResponse.json(article)
    
  } catch (error) {
    console.error('Error fetching article:', error)
    return NextResponse.json(
      { error: 'Failed to fetch article' },
      { status: 500 }
    )
  }
}

// PUT /api/articles/[slug] - Update article
export async function PUT(request, { params }) {
  try {
    await connectToDatabase()
    
    const resolvedParams = await params
    const body = await request.json()
    
    const article = await Article.findOneAndUpdate(
      { slug: resolvedParams.slug },
      body,
      { new: true, runValidators: true }
    )
    
    if (!article) {
      return NextResponse.json(
        { error: 'Article not found' },
        { status: 404 }
      )
    }
    
    return NextResponse.json(article)
    
  } catch (error) {
    console.error('Error updating article:', error)
    return NextResponse.json(
      { error: 'Failed to update article' },
      { status: 500 }
    )
  }
}

// DELETE /api/articles/[slug] - Delete article
export async function DELETE(request, { params }) {
  try {
    await connectToDatabase()
    
    const resolvedParams = await params
    const article = await Article.findOneAndDelete({ 
      slug: resolvedParams.slug 
    })
    
    if (!article) {
      return NextResponse.json(
        { error: 'Article not found' },
        { status: 404 }
      )
    }
    
    return NextResponse.json({ 
      message: 'Article deleted successfully' 
    })
    
  } catch (error) {
    console.error('Error deleting article:', error)
    return NextResponse.json(
      { error: 'Failed to delete article' },
      { status: 500 }
    )
  }
}