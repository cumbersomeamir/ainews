// app/components/ArticleContent.js
const ArticleContent = ({ article }) => {
  const renderContent = (contentBlock, index) => {
    switch (contentBlock.type) {
      case 'paragraph':
        return (
          <p key={index} className="text-lg leading-relaxed text-gray-800 mb-6">
            {contentBlock.text}
          </p>
        )
      
      case 'heading':
        return (
          <h2 key={index} className="text-2xl font-bold text-black mt-12 mb-6">
            {contentBlock.text}
          </h2>
        )
      
      case 'quote':
        return (
          <blockquote key={index} className="my-12 pl-8 border-l-4 border-yellow-400 bg-gray-50 py-6 pr-6 rounded-r-lg">
            <p className="text-xl italic text-gray-700 leading-relaxed mb-4">
              "{contentBlock.text}"
            </p>
            {contentBlock.author && (
              <cite className="text-sm font-bold text-gray-600 uppercase tracking-wide">
                — {contentBlock.author}
              </cite>
            )}
          </blockquote>
        )
      
      case 'image':
        return (
          <figure key={index} className="my-12">
            <img
              src={contentBlock.src}
              alt={contentBlock.alt}
              className="w-full h-auto rounded-lg shadow-lg"
            />
            {contentBlock.caption && (
              <figcaption className="text-sm text-gray-600 mt-4 text-center">
                {contentBlock.caption}
              </figcaption>
            )}
          </figure>
        )
      
      case 'list':
        return (
          <ul key={index} className="my-6 space-y-3">
            {contentBlock.items.map((item, itemIndex) => (
              <li key={itemIndex} className="flex items-start">
                <span className="w-2 h-2 bg-yellow-400 rounded-full mt-3 mr-4 flex-shrink-0" />
                <span className="text-lg text-gray-800">{item}</span>
              </li>
            ))}
          </ul>
        )
      
      default:
        return null
    }
  }

  return (
    <article className="bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Article Body */}
        <div className="prose prose-lg max-w-none">
          {article.content.map((contentBlock, index) => renderContent(contentBlock, index))}
        </div>

        {/* Article Footer */}
        <div className="mt-16 pt-8 border-t border-gray-200">
          <div className="flex items-center justify-between">
            {/* Author Info */}
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-gray-300 rounded-full flex items-center justify-center">
                <span className="text-lg font-bold text-gray-600">
                  {article.author.split(' ').map(name => name[0]).join('')}
                </span>
              </div>
              <div>
                <div className="font-bold text-black">{article.author}</div>
                <div className="text-sm text-gray-600">Senior AI Reporter</div>
              </div>
            </div>

            {/* Tags */}
            <div className="flex items-center space-x-2">
              <span className="text-sm text-gray-600">Tags:</span>
              <span className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm font-medium">
                {article.category}
              </span>
              <span className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm font-medium">
                AI Technology
              </span>
            </div>
          </div>

          {/* Share Section */}
          <div className="mt-8 pt-6 border-t border-gray-100">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <span className="text-sm font-medium text-gray-600">Share this article:</span>
                <div className="flex space-x-3">
                  <button className="p-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors">
                    <svg className="w-4 h-4 text-gray-600" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                    </svg>
                  </button>
                  <button className="p-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors">
                    <svg className="w-4 h-4 text-gray-600" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                    </svg>
                  </button>
                  <button className="p-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors">
                    <svg className="w-4 h-4 text-gray-600" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                    </svg>
                  </button>
                </div>
              </div>

              <div className="text-sm text-gray-500">
                Published {article.publishDate}
              </div>
            </div>
          </div>
        </div>
      </div>
    </article>
  )
}

export default ArticleContent