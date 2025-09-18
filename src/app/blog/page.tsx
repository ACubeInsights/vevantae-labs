'use client'

import { useState } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Calendar, User, ArrowRight, Clock } from 'lucide-react'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { BlogCard } from '@/components/BlogCard'

interface BlogPost {
  id: string
  slug: string
  title: string
  excerpt: string
  content: string
  author: string
  published_at: string
  readTime: string
  category: string
  image_url: string
  featured: boolean
  tags?: string[]
  created_at: string
  updated_at: string
}

const blogPosts: BlogPost[] = [
  {
    id: '1',
    slug: 'science-behind-ayurvedic-skincare',
    title: 'The Science Behind Ayurvedic Skincare',
    excerpt: 'Discover how ancient Ayurvedic principles are being validated by modern dermatological research.',
    content: 'Full article content...',
    author: 'Dr. Priya Sharma',
    published_at: '2024-01-15',
    readTime: '5 min read',
    category: 'Skincare',
    image_url: 'https://via.placeholder.com/600x400/F8F6F3/8B7355?text=Blog+Post',
    featured: true,
    tags: ['skincare', 'ayurveda', 'research'],
    created_at: '2024-01-15',
    updated_at: '2024-01-15'
  },
  {
    id: '2',
    slug: 'understanding-your-dosha-beginners-guide',
    title: 'Understanding Your Dosha: A Beginner\'s Guide',
    excerpt: 'Learn about the three doshas and how understanding your constitution can improve your wellness journey.',
    content: 'Full article content...',
    author: 'Rajesh Kumar',
    published_at: '2024-01-10',
    readTime: '7 min read',
    category: 'Wellness',
    image_url: 'https://via.placeholder.com/600x400/F8F6F3/8B7355?text=Blog+Post',
    featured: true,
    tags: ['dosha', 'wellness', 'ayurveda'],
    created_at: '2024-01-10',
    updated_at: '2024-01-10'
  },
  {
    id: '3',
    slug: 'natural-immunity-boosters-modern-life',
    title: 'Natural Immunity Boosters for Modern Life',
    excerpt: 'Explore time-tested herbs and practices that can strengthen your immune system naturally.',
    content: 'Full article content...',
    author: 'Dr. Priya Sharma',
    published_at: '2024-01-05',
    readTime: '6 min read',
    category: 'Health',
    image_url: 'https://via.placeholder.com/600x400/F8F6F3/8B7355?text=Blog+Post',
    featured: false,
    tags: ['immunity', 'herbs', 'health'],
    created_at: '2024-01-05',
    updated_at: '2024-01-05'
  },
  {
    id: '4',
    slug: 'art-mindful-living-ayurveda',
    title: 'The Art of Mindful Living with Ayurveda',
    excerpt: 'How incorporating Ayurvedic principles into daily routines can enhance mental clarity and peace.',
    content: 'Full article content...',
    author: 'Anita Desai',
    published_at: '2023-12-28',
    readTime: '8 min read',
    category: 'Lifestyle',
    image_url: 'https://via.placeholder.com/600x400/F8F6F3/8B7355?text=Blog+Post',
    featured: false,
    tags: ['mindfulness', 'lifestyle', 'ayurveda'],
    created_at: '2023-12-28',
    updated_at: '2023-12-28'
  },
  {
    id: '5',
    slug: 'seasonal-wellness-adapting-routine',
    title: 'Seasonal Wellness: Adapting Your Routine',
    excerpt: 'Learn how to adjust your wellness practices according to seasonal changes for optimal health.',
    content: 'Full article content...',
    author: 'Rajesh Kumar',
    published_at: '2023-12-20',
    readTime: '5 min read',
    category: 'Wellness',
    image_url: 'https://via.placeholder.com/600x400/F8F6F3/8B7355?text=Blog+Post',
    featured: false,
    tags: ['seasonal', 'wellness', 'routine'],
    created_at: '2023-12-20',
    updated_at: '2023-12-20'
  },
  {
    id: '6',
    slug: 'sustainable-beauty-eco-friendly-skincare',
    title: 'Sustainable Beauty: Eco-Friendly Skincare',
    excerpt: 'Discover how choosing natural, sustainable beauty products benefits both you and the environment.',
    content: 'Full article content...',
    author: 'Anita Desai',
    published_at: '2023-12-15',
    readTime: '4 min read',
    category: 'Skincare',
    image_url: 'https://via.placeholder.com/600x400/F8F6F3/8B7355?text=Blog+Post',
    featured: false,
    tags: ['sustainability', 'skincare', 'eco-friendly'],
    created_at: '2023-12-15',
    updated_at: '2023-12-15'
  }
]

const categories = ['All', 'Wellness', 'Skincare', 'Health', 'Lifestyle']

export default function BlogPage() {
  const [selectedCategory, setSelectedCategory] = useState('All')
  
  const filteredPosts = selectedCategory === 'All' 
    ? blogPosts 
    : blogPosts.filter(post => post.category === selectedCategory)
  
  const featuredPosts = blogPosts.filter(post => post.featured)
  const regularPosts = filteredPosts.filter(post => !post.featured)

  return (
    <div className="min-h-screen bg-[#FAF9F6]">
      <Header />
      
      <main>
        {/* Hero Section */}
        <section className="py-20 lg:py-32">
          <div className="container mx-auto px-6">
            <div className="max-w-4xl mx-auto text-center space-y-8">
              <motion.h1 
                className="text-4xl md:text-6xl font-light text-[#111111] leading-tight"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                Insights & Knowledge
              </motion.h1>
              
              <motion.p 
                className="text-lg text-[#666666] max-w-3xl mx-auto leading-relaxed"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                Explore the intersection of ancient wisdom and modern wellness through 
                our curated collection of articles and insights.
              </motion.p>
            </div>
          </div>
        </section>

        {/* Featured Articles */}
        {featuredPosts.length > 0 && (
          <section className="py-20">
            <div className="container mx-auto px-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                className="mb-16"
              >
                <h2 className="text-3xl lg:text-4xl font-light text-[#111111] mb-4">
                  Featured Articles
                </h2>
                <p className="text-lg text-[#666666]">
                  Our most popular and insightful pieces
                </p>
              </motion.div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {featuredPosts.map((post, index) => (
                  <motion.div
                    key={post.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    viewport={{ once: true }}
                  >
                    <BlogCard post={post} />
                  </motion.div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Category Filter */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl lg:text-4xl font-light text-[#111111] mb-8">
                All Articles
              </h2>
              
              <div className="flex flex-wrap justify-center gap-4">
                {categories.map((category) => (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={`px-6 py-2 text-sm font-medium uppercase tracking-wider transition-colors ${
                      selectedCategory === category
                        ? 'bg-[#111111] text-white'
                        : 'bg-transparent text-[#666666] hover:text-[#111111] border border-[#E8E6E0] hover:border-[#111111]'
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </motion.div>

            {/* Articles Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {regularPosts.map((post, index) => (
                <motion.div
                  key={post.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <BlogCard post={post} />
                </motion.div>
              ))}
            </div>

            {filteredPosts.length === 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                className="text-center py-16"
              >
                <p className="text-lg text-[#666666]">
                  No articles found in the {selectedCategory} category.
                </p>
              </motion.div>
            )}
          </div>
        </section>

        {/* Newsletter Section */}
        <section className="py-20 bg-[#111111] text-white">
          <div className="container mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="max-w-2xl mx-auto text-center space-y-8"
            >
              <h2 className="text-3xl lg:text-4xl font-light">
                Stay Informed
              </h2>
              <p className="text-lg text-gray-300 leading-relaxed">
                Subscribe to our newsletter for the latest insights on wellness, 
                Ayurveda, and natural health.
              </p>
              
              <form className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 px-4 py-3 bg-transparent border border-gray-600 text-white placeholder-gray-400 focus:outline-none focus:border-white transition-colors"
                />
                <button
                  type="submit"
                  className="px-8 py-3 bg-white text-black text-sm font-medium hover:bg-gray-100 transition-colors uppercase tracking-wider"
                >
                  Subscribe
                </button>
              </form>
            </motion.div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  )
}