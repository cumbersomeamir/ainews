// app/story/[slug]/not-found.js
import Link from 'next/link'
import Header from '../../components/Header'
import Footer from '../../components/Footer'

export default function NotFound() {
  return (
    <main className="min-h-screen bg-white">
      <Header />
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-32 text-center">
        <div className="mb-8">
          <div className="w-24 h-24 bg-yellow-400 rounded-full flex items-center justify-center mx-auto mb-6">
            <span className="text-3xl font-bold text-black">404</span>
          </div>
          
          <h1 className="text-4xl font-bold text-black mb-4">
            Article Not Found
          </h1>
          
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Sorry, we couldn't find the article you're looking for. It may have been moved, deleted, or the URL might be incorrect.
          </p>
          
          <div className="space-y-4 sm:space-y-0 sm:space-x-4 sm:flex sm:justify-center">
            <Link 
              href="/"
              className="inline-block px-6 py-3 bg-black text-white font-bold rounded-lg hover:bg-gray-800 transition-colors duration-200"
            >
              Back to Homepage
            </Link>
            <Link 
              href="/latest"
              className="inline-block px-6 py-3 bg-yellow-400 text-black font-bold rounded-lg hover:bg-yellow-500 transition-colors duration-200"
            >
              Browse Latest Articles
            </Link>
          </div>
        </div>

        {/* Suggested Articles */}
        <div className="mt-16">
          <h2 className="text-2xl font-bold text-black mb-8">
            You Might Be Interested In
          </h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: 'How GPT-5 Just Changed Everything We Know About AI',
                category: 'AI Research',
                slug: 'how-gpt-5-changed-everything-ai',
                image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=400&h=200&fit=crop'
              },
              {
                title: 'Meta\'s AI Model Surpasses Human Performance',
                category: 'Machine Learning',
                slug: 'meta-ai-breakthrough-reasoning',
                image: 'https://images.unsplash.com/photo-1555255707-c07966088b7b?w=400&h=200&fit=crop'
              },
              {
                title: 'Tesla Bot Successfully Completes Factory Tasks',
                category: 'Robotics',
                slug: 'tesla-bot-factory-assembly',
                image: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=400&h=200&fit=crop'
              }
            ].map((article, index) => (
              <Link 
                key={index}
                href={`/story/${article.slug}`}
                className="group bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-md transition-shadow duration-300"
              >
                <img
                  src={article.image}
                  alt={article.title}
                  className="w-full h-32 object-cover group-hover:opacity-90 transition-opacity"
                />
                <div className="p-4">
                  <div className="text-xs font-bold uppercase tracking-wide text-gray-600 mb-2">
                    {article.category}
                  </div>
                  <h3 className="font-bold text-black group-hover:text-gray-700 transition-colors text-sm">
                    {article.title}
                  </h3>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
      
      <Footer />
    </main>
  )
}