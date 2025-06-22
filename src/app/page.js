// app/page.js
import Header from './components/Header'
import Hero from './components/Hero'
import FeaturedNews from './components/FeaturedNews'
import CategoryGrid from './components/CategoryGrid'
import LatestNews from './components/LatestNews'
import Newsletter from './components/Newsletter'
import Footer from './components/Footer'

export default function Home() {
  return (
    <main className="min-h-screen bg-white">
      <Header />
      <Hero />
      <FeaturedNews />
      <CategoryGrid />
      <LatestNews />
      <Newsletter />
      <Footer />
    </main>
  )
}