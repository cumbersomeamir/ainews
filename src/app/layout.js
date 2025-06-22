// app/layout.js
import './globals.css'

export const metadata = {
  title: 'Artificial Intelligence News - Latest AI Technology Updates',
  description: 'Stay informed with the latest artificial intelligence news, machine learning breakthroughs, and technology insights from leading experts and researchers.',
  keywords: 'artificial intelligence, AI news, machine learning, neural networks, robotics, computer vision, natural language processing, AI research, technology news',
  authors: [{ name: 'AI News Team' }],
  creator: 'Artificial Intelligence News',
  publisher: 'Artificial Intelligence News',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://www.artificialintelligencenews.com'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'Artificial Intelligence News - Latest AI Technology Updates',
    description: 'Stay informed with the latest artificial intelligence news, machine learning breakthroughs, and technology insights.',
    url: 'https://www.artificialintelligencenews.com',
    siteName: 'Artificial Intelligence News',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Artificial Intelligence News',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Artificial Intelligence News - Latest AI Technology Updates',
    description: 'Stay informed with the latest artificial intelligence news, machine learning breakthroughs, and technology insights.',
    creator: '@ainews',
    images: ['/twitter-image.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    nocache: true,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'google-verification-code',
    yandex: 'yandex-verification-code',
    yahoo: 'yahoo-verification-code',
  },
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        {/* Favicon */}
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="manifest" href="/site.webmanifest" />
        
        {/* Theme color */}
        <meta name="theme-color" content="#FFE600" />
        <meta name="msapplication-TileColor" content="#FFE600" />
        
        {/* Preconnect to external domains for performance */}
        <link rel="preconnect" href="https://images.unsplash.com" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        
        {/* Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "NewsMediaOrganization",
              "name": "Artificial Intelligence News",
              "alternateName": "AI News",
              "url": "https://www.artificialintelligencenews.com",
              "logo": {
                "@type": "ImageObject",
                "url": "https://www.artificialintelligencenews.com/logo.png",
                "width": 300,
                "height": 60
              },
              "sameAs": [
                "https://twitter.com/ainews",
                "https://linkedin.com/company/ainews",
                "https://github.com/ainews",
                "https://youtube.com/ainews"
              ],
              "contactPoint": {
                "@type": "ContactPoint",
                "telephone": "+1-555-AI-NEWS",
                "contactType": "customer service",
                "availableLanguage": "English"
              },
              "address": {
                "@type": "PostalAddress",
                "addressCountry": "US"
              },
              "description": "Leading source for artificial intelligence news, machine learning breakthroughs, and emerging technology insights.",
              "foundingDate": "2023",
              "specialty": ["Artificial Intelligence", "Machine Learning", "Technology News", "AI Research"]
            })
          }}
        />
      </head>
      <body className="min-h-screen bg-white text-gray-900 antialiased">
        {/* Skip to content link for accessibility */}
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-yellow-400 text-black px-4 py-2 rounded-lg font-bold z-50"
        >
          Skip to main content
        </a>
        
        <div id="main-content">
          {children}
        </div>
        
        {/* Analytics Scripts - Add your tracking codes here */}
        {process.env.NODE_ENV === 'production' && (
          <>
            {/* Google Analytics */}
            <script
              async
              src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_ID}`}
            />
            <script
              dangerouslySetInnerHTML={{
                __html: `
                  window.dataLayer = window.dataLayer || [];
                  function gtag(){dataLayer.push(arguments);}
                  gtag('js', new Date());
                  gtag('config', '${process.env.NEXT_PUBLIC_GA_ID}', {
                    page_title: document.title,
                    page_location: window.location.href,
                  });
                `,
              }}
            />
          </>
        )}
      </body>
    </html>
  )
}