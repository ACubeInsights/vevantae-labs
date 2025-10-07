'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { BlogCard } from '@/components/BlogCard';
import { getBlogPosts, BlogPost } from '@/lib/supabase';
import { usePageTracking } from '@/hooks/usePageTracking';

const categories = ['All', 'Wellness', 'Skincare', 'Health', 'Lifestyle'];

export default function BlogPage() {
  usePageTracking({
    pageName: 'Blog'
  });

  const [selectedCategory, setSelectedCategory] = useState('All');
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlogPosts = async () => {
      try {
        const posts = await getBlogPosts();
        setBlogPosts(posts);
      } catch (error) {
        console.error('Error fetching blog posts:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogPosts();
  }, []);

  const filteredPosts =
    selectedCategory === 'All'
      ? blogPosts
      : blogPosts.filter((post) => post.category === selectedCategory);

  const featuredPosts = blogPosts.filter((post) => post.is_featured);
  const regularPosts = filteredPosts.filter((post) => !post.is_featured);

  return (
    <div className="min-h-screen bg-[#FAF9F6]">

      <main>
        
        <section className="py-20 lg:py-32">
          <div className="container mx-auto px-6">
            <div className="max-w-4xl mx-auto text-center space-y-8">
              <motion.h1
                className="text-4xl md:text-6xl font-light text-[#111111] leading-tight"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                Insights &amp; Knowledge
              </motion.h1>

              <motion.p
                className="text-lg text-[#666666] max-w-3xl mx-auto leading-relaxed"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                Explore the intersection of ancient wisdom and modern wellness through our curated
                collection of articles and insights.
              </motion.p>
            </div>
          </div>
        </section>

        
        {loading ? (
          <section className="py-20">
            <div className="container mx-auto px-6">
              <div className="text-center">
                <p className="text-lg text-[#666666]">Loading articles...</p>
              </div>
            </div>
          </section>
        ) : (
          featuredPosts.length > 0 && (
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
                  <p className="text-lg text-[#666666]">Our most popular and insightful pieces</p>
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
          )
        )}

        
        <section className="py-20 bg-white">
          <div className="container mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl lg:text-4xl font-light text-[#111111] mb-8">All Articles</h2>

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

        
        <section className="py-20 bg-[#111111] text-white">
          <div className="container mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="max-w-2xl mx-auto text-center space-y-8"
            >
              <h2 className="text-3xl lg:text-4xl font-light">Stay Informed</h2>
              <p className="text-lg text-gray-300 leading-relaxed">
                Subscribe to our newsletter for the latest insights on wellness, Ayurveda, and
                natural health.
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

    </div>
  );
}
