// lib/models/Article.js
import mongoose from 'mongoose'

const ContentBlockSchema = new mongoose.Schema({
  type: {
    type: String,
    required: true,
    enum: ['paragraph', 'heading', 'quote', 'image', 'list']
  },
  text: String,
  author: String, // For quotes
  src: String,    // For images
  alt: String,    // For images
  caption: String, // For images
  items: [String] // For lists
}, { _id: false })

const ArticleSchema = new mongoose.Schema({
  slug: {
    type: String,
    required: true,
    unique: true,
    index: true
  },
  title: {
    type: String,
    required: true
  },
  subtitle: {
    type: String,
    required: true
  },
  author: {
    type: String,
    required: true
  },
  category: {
    type: String,
    required: true,
    enum: [
      'AI Research',
      'Machine Learning',
      'Robotics',
      'Computer Vision',
      'Natural Language Processing',
      'AI Ethics',
      'Industry News',
      'Healthcare',
      'Climate',
      'Ethics'
    ]
  },
  categoryTag: {
    type: String,
    required: true
  },
  heroImage: {
    type: String,
    required: true
  },
  readTime: {
    type: String,
    required: true
  },
  content: [ContentBlockSchema],
  publishDate: {
    type: Date,
    default: Date.now
  },
  featured: {
    type: Boolean,
    default: false
  },
  published: {
    type: Boolean,
    default: true
  },
  views: {
    type: Number,
    default: 0
  },
  tags: [String]
}, {
  timestamps: true
})

// Add text index for search functionality
ArticleSchema.index({
  title: 'text',
  subtitle: 'text',
  author: 'text'
})

export default mongoose.models.Article || mongoose.model('Article', ArticleSchema)