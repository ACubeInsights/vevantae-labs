'use client'

import { useState } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Calendar, User, ArrowRight, Clock } from 'lucide-react'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'

interface BlogPost {
  id: string
  title: string
  excerpt: string
  content: string
  author: string
  date: string
  readTime: string
  category: string
  image: string
  featured: boolean
}

const blogPosts: BlogPost[] = [
  {
    id: '1',
    title: 'The Science Behind Ayurvedic Skincare',
    excerpt: 'Discover how ancient Ayurvedic principles are being validated by modern dermatological research.',
    content: 'Full article content...',
    author: 'Dr. Priya Sharma',
    date: '2024-01-15',
    readTime: '5 min read',
    category: 'Skincare',
    image: 'https://via.placeholder.com/600x400/F8F6F3/8B7355?text=Blog+Post',
    featured: true
  },
  {
    id: '2',
    title: 'Understanding Your Dosha: A Beginner\'s Guide',
    excerpt: 'Learn about the three doshas and how understanding your constitution can improve your wellness journey.',
    content: 'Full article content...',
    author: 'Rajesh Kumar',
    date: '2024-01-10',
    readTime: '7 min read',
    category: 'Wellness',
    image: 'https://via.placeholder.com/600x400/F8F6F3/8B7355?text=Blog+Post',
    featured: true
  },
  {
    id: '3',
    title: 'Natural Immunity Boosters for Modern Life',
    excerpt: 'Explore time-tested herbs and practices that can strengthen your immune system naturally.',
    content: 'Full article content...',
    author: 'Dr. Priya Sharma',
    date: '2024-01-05',
    readTime: '6 min read',
    category: 'Health',
    image: 'https://via.placeholder.com/600x400/F8F6F3/8B7355?text=Blog+Post',
    featured: false
  },
  {
    id: '4',
    title: 'The Art of Mindful Living with Ayurveda',
    excerpt: 'How incorporating Ayurvedic principles into daily routines can enhance mental clarity and peace.',
    content: 'Full article content...',
    author: 'Anita Desai',
    date: '2023-12-28',
    readTime: '8 min read',
    category: 'Lifestyle',
    image: 'https://via.placeholder.com/600x400/F8F6F3/8B7355?text=Blog+Post',
    featured: false
  },
  {
    id: '5',
    title: 'Seasonal Wellness: Adapting Your Routine',
    excerpt: 'Learn how to adjust your wellness practices according to seasonal changes for optimal health.',
    content: 'Full article content...',
    author: 'Rajesh Kumar',
    date: '2023-12-20',
    readTime: '5 min read',
    category: 'Wellness',
    image: 'https://via.placeholder.com/600x400/F8F6F3/8B7355?text=Blog+Post',
    featured: false
  },
  {
    id: '6',
    title: 'Sustainable Beauty: Eco-Friendly Skincare',
    excerpt: 'Discover how choosing natural, sustainable beauty products benefits both you and the environment.',
    content: 'Full article content...',
    author: 'Anita Desai',
    date: '2023-12-15',
    readTime: '4 min read',
    category: 'Skincare',
    image: 'https://via.placeholder.com/600x400/F8F6F3/8B7355?text=Blog+Post',
    featured: false
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
                  <motion.article
                    key={post.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="group"
                  >
                    <Link href={`/blog/${post.id}`} className="block">
                      <div className="bg-white rounded-sm overflow-hidden hover:shadow-lg transition-shadow duration-300">
                        <div className="aspect-[3/2] bg-[#E8E6E0] overflow-hidden">
                          <img
                            src={post.image}
                            alt={post.title}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          />
                        </div>
                        
                        <div className="p-8">
                          <div className="flex items-center gap-4 mb-4 text-sm text-[#8B7355] uppercase tracking-wider">
                            <span>{post.category}</span>
                            <span>•</span>
                            <span>{post.readTime}</span>
                          </div>
                          
                          <h3 className="text-xl font-medium text-[#111111] mb-4 group-hover:text-[#8B7355] transition-colors">
                            {post.title}
                          </h3>
                          
                          <p className="text-[#666666] leading-relaxed mb-6">
                            {post.excerpt}
                          </p>
                          
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2 text-sm text-[#666666]">
                              <User className="w-4 h-4" />
                              <span>{post.author}</span>
                              <span>•</span>
                              <Calendar className="w-4 h-4" />
                              <span>{new Date(post.date).toLocaleDateString()}</span>
                            </div>
                            
                            <ArrowRight className="w-5 h-5 text-[#8B7355] group-hover:translate-x-1 transition-transform" />
                          </div>
                        </div>
                      </div>
                    </Link>
                  </motion.article>
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
                <motion.article
                  key={post.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="group"
                >
                  <Link href={`/blog/${post.id}`} className="block">
                    <div className="bg-[#FAF9F6] rounded-sm overflow-hidden hover:shadow-lg transition-shadow duration-300">
                      <div className="aspect-[4/3] bg-[#E8E6E0] overflow-hidden">
                        <img
                          src={post.image}
                          alt={post.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                      </div>
                      
                      <div className="p-6">
                        <div className="flex items-center gap-4 mb-3 text-xs text-[#8B7355] uppercase tracking-wider">
                          <span>{post.category}</span>
                          <span>•</span>
                          <span>{post.readTime}</span>
                        </div>
                        
                        <h3 className="text-lg font-medium text-[#111111] mb-3 group-hover:text-[#8B7355] transition-colors">
                          {post.title}
                        </h3>
                        
                        <p className="text-[#666666] text-sm leading-relaxed mb-4">
                          {post.excerpt}
                        </p>
                        
                        <div className="flex items-center justify-between text-xs text-[#666666]">
                          <div className="flex items-center gap-2">
                            <User className="w-3 h-3" />
                            <span>{post.author}</span>
                          </div>
                          
                          <div className="flex items-center gap-2">
                            <Calendar className="w-3 h-3" />
                            <span>{new Date(post.date).toLocaleDateString()}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Link>
                </motion.article>
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