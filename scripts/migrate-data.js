// scripts/migrate-data.js
import mongoose from 'mongoose'
import Article from '../lib/models/Article.js'
import Category from '../lib/models/Category.js'
import User from '../lib/models/User.js'

const MONGODB_URI = 'mongodb+srv://amir:T7ySBtTl5MxA7FKf@ainews.ufjwlfv.mongodb.net/ainews?retryWrites=true&w=majority'

// Default categories data
const categories = [
  {
    name: 'AI Research',
    slug: 'ai-research',
    tag: 'BREAKTHROUGH',
    icon: '🧠',
    description: 'Latest breakthroughs and developments in artificial intelligence research',
    featuredImage: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=600&h=400&fit=crop',
    order: 1
  },
  {
    name: 'Machine Learning',
    slug: 'machine-learning',
    tag: 'ML',
    icon: '🤖',
    description: 'Machine learning algorithms, neural networks, and deep learning advances',
    featuredImage: 'https://images.unsplash.com/photo-1555255707-c07966088b7b?w=600&h=400&fit=crop',
    order: 2
  },
  {
    name: 'Robotics',
    slug: 'robotics',
    tag: 'ROBOTS',
    icon: '🦾',
    description: 'Robotics innovations, automation, and human-robot interaction',
    featuredImage: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=600&h=400&fit=crop',
    order: 3
  },
  {
    name: 'Computer Vision',
    slug: 'computer-vision',
    tag: 'VISION',
    icon: '👁️',
    description: 'Computer vision, image recognition, and visual AI technologies',
    featuredImage: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=600&h=400&fit=crop',
    order: 4
  },
  {
    name: 'Natural Language Processing',
    slug: 'natural-language-processing',
    tag: 'NLP',
    icon: '💬',
    description: 'Language models, text processing, and conversational AI',
    featuredImage: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=600&h=400&fit=crop',
    order: 5
  },
  {
    name: 'AI Ethics',
    slug: 'ai-ethics',
    tag: 'ETHICS',
    icon: '⚖️',
    description: 'AI safety, ethics, governance, and responsible AI development',
    featuredImage: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&h=400&fit=crop',
    order: 6
  },
  {
    name: 'Industry News',
    slug: 'industry-news',
    tag: 'INDUSTRY',
    icon: '🏢',
    description: 'AI industry updates, company news, and market developments',
    featuredImage: 'https://images.unsplash.com/photo-1563206767-5b18f218e8de?w=600&h=400&fit=crop',
    order: 7
  }
]

// Default articles data
const articles = [
  {
    slug: 'how-gpt-5-changed-everything-ai',
    title: 'How GPT-5 Just Changed Everything We Know About Artificial Intelligence',
    subtitle: 'The latest breakthrough in AI capabilities has researchers reconsidering fundamental assumptions about machine learning, consciousness, and the future of human-AI collaboration.',
    author: 'Sarah Chen',
    category: 'AI Research',
    categoryTag: 'BREAKTHROUGH',
    readTime: '8 min read',
    heroImage: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=1200&h=600&fit=crop',
    featured: true,
    publishDate: new Date('2025-06-22T07:00:00Z'),
    content: [
      {
        type: 'paragraph',
        text: 'In a groundbreaking announcement that has sent shockwaves through the artificial intelligence community, OpenAI unveiled GPT-5 yesterday, marking what many experts are calling the most significant leap in AI capabilities since the advent of large language models.'
      },
      {
        type: 'paragraph',
        text: 'The new model demonstrates unprecedented reasoning abilities, solving complex mathematical proofs, generating novel scientific hypotheses, and exhibiting what researchers describe as "emergent consciousness-like behaviors" that weren\'t explicitly programmed into the system.'
      },
      {
        type: 'heading',
        text: 'Breaking the Reasoning Barrier'
      },
      {
        type: 'paragraph',
        text: 'Dr. Elena Rodriguez, lead researcher at Stanford\'s AI Safety Institute, described the breakthrough as "fundamentally different from anything we\'ve seen before." Unlike previous models that primarily relied on pattern matching and statistical prediction, GPT-5 appears to engage in genuine logical reasoning.'
      },
      {
        type: 'quote',
        text: 'This isn\'t just a bigger, faster version of GPT-4. We\'re seeing qualitatively different cognitive abilities emerge. The model can now engage in multi-step reasoning that requires holding complex ideas in working memory and manipulating them in novel ways.',
        author: 'Dr. Elena Rodriguez, Stanford AI Safety Institute'
      },
      {
        type: 'paragraph',
        text: 'In controlled tests, GPT-5 successfully solved mathematical problems that had stumped previous AI systems, including several open problems in number theory that have challenged human mathematicians for decades.'
      },
      {
        type: 'heading',
        text: 'Implications for AI Safety'
      },
      {
        type: 'paragraph',
        text: 'The rapid advancement has reignited debates about AI safety and the potential risks of artificial general intelligence (AGI). Leading AI safety researchers are calling for immediate regulatory frameworks to govern the deployment of such powerful systems.'
      },
      {
        type: 'paragraph',
        text: 'Meanwhile, tech industry leaders are divided on the implications. Some see GPT-5 as a revolutionary tool that will accelerate scientific discovery and solve humanity\'s greatest challenges. Others worry about the potential for misuse and the economic disruption that could follow widespread deployment.'
      },
      {
        type: 'heading',
        text: 'What This Means for the Future'
      },
      {
        type: 'paragraph',
        text: 'As GPT-5 begins limited testing with select research institutions, the AI community is grappling with fundamental questions about consciousness, intelligence, and the future relationship between humans and machines.'
      },
      {
        type: 'paragraph',
        text: 'One thing is certain: the landscape of artificial intelligence has been permanently altered, and we\'re only beginning to understand the implications of this remarkable breakthrough.'
      }
    ],
    tags: ['GPT-5', 'OpenAI', 'Language Models', 'AI Safety']
  },
  {
    slug: 'meta-ai-breakthrough-reasoning',
    title: 'Meta\'s New AI Model Surpasses Human Performance in Complex Reasoning Tasks',
    subtitle: 'The implications for artificial general intelligence are staggering as researchers achieve new milestones in logical reasoning.',
    author: 'Emma Watson',
    category: 'AI Research',
    categoryTag: 'RESEARCH',
    readTime: '6 min read',
    heroImage: 'https://images.unsplash.com/photo-1555255707-c07966088b7b?w=1200&h=600&fit=crop',
    publishDate: new Date('2025-06-21T14:30:00Z'),
    content: [
      {
        type: 'paragraph',
        text: 'Meta\'s AI research division has achieved a significant milestone in artificial intelligence with the development of their latest reasoning model, which has demonstrated performance exceeding human capabilities in several complex logical reasoning tasks.'
      },
      {
        type: 'paragraph',
        text: 'The breakthrough represents a major step forward in the quest for artificial general intelligence, with implications that extend far beyond the laboratory.'
      },
      {
        type: 'heading',
        text: 'Revolutionary Performance Metrics'
      },
      {
        type: 'paragraph',
        text: 'In standardized reasoning benchmarks, Meta\'s new model achieved accuracy rates of 94.7%, compared to the human average of 87.3%. The model excelled particularly in abstract reasoning, logical deduction, and pattern recognition tasks.'
      }
    ],
    tags: ['Meta', 'Reasoning', 'AGI', 'Benchmarks']
  },
  {
    slug: 'tesla-bot-factory-assembly',
    title: 'Tesla Bot Successfully Completes Factory Assembly Tasks',
    subtitle: 'Elon Musk\'s humanoid robot achieves a major milestone by performing complex manufacturing tasks alongside human workers.',
    author: 'Chen Liu',
    category: 'Robotics',
    categoryTag: 'BREAKTHROUGH',
    readTime: '5 min read',
    heroImage: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=1200&h=600&fit=crop',
    publishDate: new Date('2025-06-20T10:15:00Z'),
    content: [
      {
        type: 'paragraph',
        text: 'Tesla\'s humanoid robot, known as Optimus, has successfully completed its first series of complex factory assembly tasks, marking a significant milestone in the development of general-purpose robotics.'
      },
      {
        type: 'paragraph',
        text: 'The achievement represents years of development in robotics, AI, and manufacturing automation, bringing us closer to a future where humanoid robots work alongside humans in industrial settings.'
      }
    ],
    tags: ['Tesla', 'Robotics', 'Manufacturing', 'Automation']
  },
  {
    slug: 'brain-computer-interface-breakthrough',
    title: 'Scientists Create Brain-Computer Interface That Reads Thoughts',
    subtitle: 'Revolutionary BCI technology allows paralyzed patients to control computers and robotic limbs with unprecedented precision.',
    author: 'Dr. Amanda Foster',
    category: 'AI Research',
    categoryTag: 'RESEARCH',
    readTime: '7 min read',
    heroImage: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=1200&h=600&fit=crop',
    publishDate: new Date('2025-06-19T16:45:00Z'),
    content: [
      {
        type: 'paragraph',
        text: 'Researchers at Stanford University have developed a revolutionary brain-computer interface that can decode human thoughts with unprecedented accuracy, offering new hope for paralyzed patients.'
      }
    ],
    tags: ['BCI', 'Neurotechnology', 'Medical AI', 'Stanford']
  },
  {
    slug: 'quantum-ai-milestone',
    title: 'Scientists Achieve Quantum-AI Fusion in Revolutionary Experiment',
    subtitle: 'The convergence of quantum computing and artificial intelligence reaches a new milestone with unprecedented results.',
    author: 'Dr. Rachel Green',
    category: 'AI Research',
    categoryTag: 'BREAKTHROUGH',
    readTime: '6 min read',
    heroImage: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=1200&h=600&fit=crop',
    publishDate: new Date('2025-06-18T09:30:00Z'),
    content: [
      {
        type: 'paragraph',
        text: 'In a landmark experiment, researchers have successfully demonstrated the fusion of quantum computing with artificial intelligence, achieving computational results that were previously thought impossible.'
      }
    ],
    tags: ['Quantum Computing', 'AI', 'Research', 'Innovation']
  }
]

// Default admin user
const adminUser = {
  username: 'admin',
  email: 'admin@ainews.com',
  password: 'ainews2025', // In production, this should be hashed
  role: 'admin',
  firstName: 'Admin',
  lastName: 'User',
  bio: 'System administrator for AI News',
  isActive: true,
  articlesPublished: 0
}

async function migrateData() {
  try {
    console.log('🔄 Connecting to MongoDB...')
    await mongoose.connect(MONGODB_URI)
    console.log('✅ Connected to MongoDB')

    // Clear existing data
    console.log('🗑️ Clearing existing data...')
    await Article.deleteMany({})
    await Category.deleteMany({})
    await User.deleteMany({})
    console.log('✅ Cleared existing data')

    // Insert categories
    console.log('📂 Inserting categories...')
    const insertedCategories = await Category.insertMany(categories)
    console.log(`✅ Inserted ${insertedCategories.length} categories`)

    // Insert articles
    console.log('📰 Inserting articles...')
    const insertedArticles = await Article.insertMany(articles)
    console.log(`✅ Inserted ${insertedArticles.length} articles`)

    // Insert admin user
    console.log('👤 Inserting admin user...')
    const insertedUser = await User.create(adminUser)
    console.log(`✅ Inserted admin user: ${insertedUser.username}`)

    // Update category article counts
    console.log('🔢 Updating category article counts...')
    for (const category of insertedCategories) {
      const count = await Article.countDocuments({ category: category.name })
      await Category.findByIdAndUpdate(category._id, { articleCount: count })
    }
    console.log('✅ Updated category article counts')

    console.log('\n🎉 Migration completed successfully!')
    console.log('\n📊 Summary:')
    console.log(`   Categories: ${insertedCategories.length}`)
    console.log(`   Articles: ${insertedArticles.length}`)
    console.log(`   Users: 1`)
    console.log('\n🔗 You can now check your MongoDB Atlas collections:')
    console.log('   - articles')
    console.log('   - categories') 
    console.log('   - users')

  } catch (error) {
    console.error('❌ Migration failed:', error)
  } finally {
    await mongoose.disconnect()
    console.log('📡 Disconnected from MongoDB')
    process.exit(0)
  }
}

// Run the migration
migrateData()