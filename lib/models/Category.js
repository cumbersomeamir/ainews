// lib/models/Category.js
import mongoose from 'mongoose'

const CategorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  slug: {
    type: String,
    required: true,
    unique: true,
    index: true
  },
  tag: {
    type: String,
    required: true
  },
  icon: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  color: {
    type: String,
    default: '#FFE600'
  },
  featuredImage: {
    type: String,
    required: true
  },
  articleCount: {
    type: Number,
    default: 0
  },
  order: {
    type: Number,
    default: 0
  },
  active: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
})

export default mongoose.models.Category || mongoose.model('Category', CategorySchema)