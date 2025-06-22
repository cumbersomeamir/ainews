// app/components/Newsletter.js
'use client'
import { useState } from 'react'

const Newsletter = () => {
  const [email, setEmail] = useState('')
  const [isSubscribed, setIsSubscribed] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    if (email) {
      setIsSubscribed(true)
      setEmail('')
      setTimeout(() => setIsSubscribed(false), 3000)
    }
  }

  return (
    <section className="bg-yellow-400 py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="bg-black text-white px-4 py-2 inline-block text-sm font-bold uppercase tracking-wide mb-6">
          Stay Informed
        </div>
        
        <h2 className="text-3xl lg:text-4xl font-bold text-black mb-4">
          Get the Latest AI News Delivered to Your Inbox
        </h2>
        
        <p className="text-lg text-black mb-8 max-w-2xl mx-auto">
          Join over 100,000 tech professionals who rely on our daily newsletter for the most important AI and technology updates.
        </p>

        {isSubscribed ? (
          <div className="bg-black text-white px-6 py-4 rounded-lg inline-block">
            <div className="flex items-center space-x-2">
              <svg className="w-5 h-5 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              <span className="font-medium">Successfully subscribed! Check your email.</span>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="max-w-md mx-auto">
            <div className="flex flex-col sm:flex-row gap-4">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email address"
                className="flex-1 px-4 py-3 rounded-lg border-2 border-black text-black placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                required
              />
              <button
                type="submit"
                className="px-6 py-3 bg-black text-white font-bold uppercase tracking-wide text-sm hover:bg-gray-800 transition-colors duration-200 rounded-lg"
              >
                Subscribe
              </button>
            </div>
            <p className="text-sm text-black mt-4 opacity-80">
              Free newsletter, unsubscribe anytime. We respect your privacy.
            </p>
          </form>
        )}

        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8 text-black">
          <div className="space-y-2">
            <div className="font-bold text-lg">Daily Briefings</div>
            <p className="text-sm opacity-80">Get the most important AI news every morning at 7 AM</p>
          </div>
          <div className="space-y-2">
            <div className="font-bold text-lg">Weekly Deep Dives</div>
            <p className="text-sm opacity-80">In-depth analysis of emerging AI trends and technologies</p>
          </div>
          <div className="space-y-2">
            <div className="font-bold text-lg">Breaking News Alerts</div>
            <p className="text-sm opacity-80">Instant notifications for major AI breakthroughs and announcements</p>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Newsletter