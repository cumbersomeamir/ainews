// app/api/categories/route.js
import { NextResponse } from 'next/server'
import connectToDatabase from '@/lib/mongodb'
import Category from '@/lib/models/Category'

// GET /api/categories - Get all categories
export async function GET() {
  try {
    await connectToDatabase()
    
    const categories = await Category.find({ active: true })
      .sort({ order: 1 })
      .lean()
    
    return NextResponse.json(categories)
    
  } catch (error) {
    console.error('Error fetching categories:', error)
    return NextResponse.json(
      { error: 'Failed to fetch categories' },
      { status: 500 }
    )
  }
}

// POST /api/categories - Create new category
export async function POST(request) {
  try {
    await connectToDatabase()
    
    const body = await request.json()
    
    // Generate slug if not provided
    if (!body.slug) {
      body.slug = body.name
        .toLowerCase()
        .replace(/[^a-z0-9 -]/g, '')
        .replace(/\s+/g, '-')
        .replace(/-+/g, '-')
        .trim('-')
    }
    
    const category = new Category(body)
    await category.save()
    
    return NextResponse.json(category, { status: 201 })
    
  } catch (error) {
    console.error('Error creating category:', error)
    
    if (error.code === 11000) {
      return NextResponse.json(
        { error: 'Category with this name or slug already exists' },
        { status: 409 }
      )
    }
    
    return NextResponse.json(
      { error: 'Failed to create category' },
      { status: 500 }
    )
  }
}