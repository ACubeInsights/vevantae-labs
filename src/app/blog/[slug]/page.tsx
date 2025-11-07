'use client';

import { useState, useEffect, useRef } from 'react';
import { useParams } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  ArrowLeft,
  Calendar,
  User,
  Clock,
  Tag,
  Share2,
  Copy,
  Check,
  Facebook,
  Twitter,
  Linkedin,
} from 'lucide-react';
import { getBlogPost, getBlogPosts, BlogPost } from '@/lib/supabase';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { formatDate } from '@/lib/utils';

export default function BlogDetailPage() {
  const params = useParams();
  const [post, setPost] = useState<BlogPost | null>(null);
  const [relatedPosts, setRelatedPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [copySuccess, setCopySuccess] = useState(false);
  const [showShareMenu, setShowShareMenu] = useState(false);
  const shareMenuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchBlogPost = async () => {
      try {
        if (!params.slug || typeof params.slug !== 'string') {
          setError('Invalid blog post URL');
          return;
        }

        const blogPost = await getBlogPost(params.slug);
        setPost(blogPost);

        if (blogPost) {
          const allPosts = await getBlogPosts();
          const related = allPosts
            .filter((p) => p.id !== blogPost.id && p.category === blogPost.category)
            .slice(0, 3);
          setRelatedPosts(related);
        } else {
          setRelatedPosts([]);
        }
      } catch {
        setError('Blog post not found');
      } finally {
        setLoading(false);
      }
    };

    fetchBlogPost();
  }, [params.slug]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (shareMenuRef.current && !shareMenuRef.current.contains(event.target as Node)) {
        setShowShareMenu(false);
      }
    };

    if (showShareMenu) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showShareMenu]);

  const handleCopyLink = async () => {
    try {
      const currentUrl = window.location.href;
      await navigator.clipboard.writeText(currentUrl);
      setCopySuccess(true);
      setTimeout(() => setCopySuccess(false), 2000);
    } catch (err) {
      console.error('Failed to copy link:', err);
    }
  };

  const handleShare = (platform: string) => {
    if (platform === 'copy') {
      handleCopyLink();
      setShowShareMenu(false);
      return;
    }

    const currentUrl = window.location.href;
    const title = post?.title || 'Check out this article';

    let shareUrl = '';

    switch (platform) {
      case 'facebook':
        shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(currentUrl)}`;
        break;
      case 'twitter':
        shareUrl = `https://twitter.com/intent/tweet?url=${encodeURIComponent(currentUrl)}&text=${encodeURIComponent(title)}`;
        break;
      case 'linkedin':
        shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(currentUrl)}`;
        break;
      default:
        return;
    }

    window.open(shareUrl, '_blank', 'noopener,noreferrer');
    setShowShareMenu(false);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#FAF9F6]">
        <main className="py-20">
          <div className="container mx-auto px-6">
            <div className="max-w-4xl mx-auto">
              
              <div className="animate-pulse space-y-8">
                <div className="h-8 bg-gray-200 rounded w-1/4"></div>
                <div className="h-12 bg-gray-200 rounded w-3/4"></div>
                <div className="h-6 bg-gray-200 rounded w-1/2"></div>
                <div className="aspect-[16/9] bg-gray-200 rounded"></div>
                <div className="space-y-4">
                  <div className="h-4 bg-gray-200 rounded"></div>
                  <div className="h-4 bg-gray-200 rounded w-5/6"></div>
                  <div className="h-4 bg-gray-200 rounded w-4/6"></div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    );
  }

  if (error || !post) {
    return (
      <div className="min-h-screen bg-[#FAF9F6]">
        <main className="py-20">
          <div className="container mx-auto px-6">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="text-4xl font-light text-[#111111] mb-4">
                {error || 'Blog post not found'}
              </h1>
              <p className="text-[#666666] mb-8">
                The blog post you&apos;re looking for doesn&apos;t exist or has been removed.
              </p>
              <Link
                href="/blog"
                className="inline-flex items-center gap-2 px-6 py-3 bg-[#111111] text-white text-sm font-medium uppercase tracking-wider hover:bg-[#333333] transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
                Back to Blog
              </Link>
            </div>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FAF9F6]">

      <main>
        
        <section className="py-8 bg-white border-b border-[#E8E6E0]">
          <div className="container mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <Link
                href="/blog"
                className="inline-flex items-center gap-2 text-[#8B7355] hover:text-[#111111] transition-colors text-sm font-medium uppercase tracking-wider"
              >
                <ArrowLeft className="w-4 h-4" />
                Back to Blog
              </Link>
            </motion.div>
          </div>
        </section>

        
        <section className="py-16 lg:py-24 bg-white">
          <div className="container mx-auto px-6">
            <div className="max-w-4xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="space-y-8"
              >
                
                <div className="flex justify-center">
                  <span className="bg-[#8B7355]/10 text-[#8B7355] px-4 py-2 text-sm uppercase tracking-wider font-semibold rounded-sm">
                    {post.category}
                  </span>
                </div>

                
                <h1 className="text-4xl lg:text-5xl font-light text-[#111111] leading-tight text-center">
                  {post.title}
                </h1>

                
                <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-[#8B7355] uppercase tracking-wider">
                  <div className="flex items-center gap-2">
                    <User className="w-4 h-4" />
                    <span>By {post.author}</span>
                  </div>
                  <span>•</span>
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    <span>{formatDate(post.published_at)}</span>
                  </div>
                  <span>•</span>
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4" />
                    <span>5 min read</span>
                  </div>
                </div>

                
                {post.excerpt && (
                  <p className="text-lg text-[#666666] leading-relaxed text-center max-w-3xl mx-auto">
                    {post.excerpt}
                  </p>
                )}
              </motion.div>
            </div>
          </div>
        </section>

        
        {post.featured_image && (
          <section className="py-8">
            <div className="container mx-auto px-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="max-w-5xl mx-auto"
              >
                <div className="relative aspect-[16/9] overflow-hidden rounded-sm bg-gray-100">
                  <Image
                    src={
                      post.featured_image ||
                      'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAwIiBoZWlnaHQ9IjQwMCIgdmlld0JveD0iMCAwIDYwMCA0MDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSI2MDAiIGhlaWdodD0iNDAwIiBmaWxsPSIjRjhGNkYzIi8+Cjx0ZXh0IHg9IjMwMCIgeT0iMjAwIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBkb21pbmFudC1iYXNlbGluZT0iY2VudHJhbCIgZmlsbD0iIzhCNzM1NSIgZm9udC1mYW1pbHk9IkFyaWFsLCBzYW5zLXNlcmlmIiBmb250LXNpemU9IjE4Ij5CbG9nIFBvc3Q8L3RleHQ+Cjwvc3ZnPg=='
                    }
                    alt={post.title}
                    fill
                    className="object-cover"
                    priority
                  />
                </div>
              </motion.div>
            </div>
          </section>
        )}

        
        <section className="py-16 lg:py-24 bg-white">
          <div className="container mx-auto px-6">
            <div className="max-w-4xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="prose prose-lg max-w-none"
              >
                <ReactMarkdown
                  remarkPlugins={[remarkGfm]}
                  className="prose-headings:font-light prose-h1:text-[#111111] prose-h2:text-[#111111] prose-h3:text-[#111111] prose-p:text-[#333333] prose-strong:text-[#111111] prose-li:marker:text-[#8B7355] prose-a:text-[#8B7355] prose-a:no-underline hover:prose-a:underline prose-img:rounded-sm"
                >
                  {post.content}
                </ReactMarkdown>
              </motion.div>

              
              {post.tags && post.tags.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                  className="mt-12 pt-8 border-t border-[#E8E6E0]"
                >
                  <div className="flex items-center gap-4 flex-wrap">
                    <div className="flex items-center gap-2 text-[#8B7355]">
                      <Tag className="w-4 h-4" />
                      <span className="text-sm font-medium uppercase tracking-wider">Tags:</span>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {post.tags.map((tag, index) => (
                        <span
                          key={index}
                          className="text-sm text-[#8B7355] bg-[#8B7355]/10 px-3 py-1 rounded-sm hover:bg-[#8B7355]/20 transition-colors cursor-pointer"
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}

              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.5 }}
                className="mt-12 pt-8 border-t border-[#E8E6E0]"
              >
                <div className="flex items-center justify-end gap-6">
                  
                  <button
                    onClick={handleCopyLink}
                    className="flex items-center gap-2 text-[#8B7355] hover:text-[#111111] transition-colors text-sm font-medium uppercase tracking-wider"
                  >
                    {copySuccess ? (
                      <>
                        <Check className="w-4 h-4 text-green-600" />
                        Copied!
                      </>
                    ) : (
                      <>
                        <Copy className="w-4 h-4" />
                        Copy Link
                      </>
                    )}
                  </button>

                  
                  <div className="relative" ref={shareMenuRef}>
                    <button
                      onClick={() => setShowShareMenu(!showShareMenu)}
                      className="flex items-center gap-2 text-[#8B7355] hover:text-[#111111] transition-colors text-sm font-medium uppercase tracking-wider"
                    >
                      <Share2 className="w-4 h-4" />
                      Share
                    </button>

                    {showShareMenu && (
                      <div className="absolute right-0 top-full mt-2 bg-white border border-[#E8E6E0] rounded-sm shadow-lg z-10 min-w-[160px]">
                        <button
                          onClick={() => handleShare('facebook')}
                          className="flex items-center gap-3 w-full px-4 py-3 text-left text-sm text-[#333333] hover:bg-[#FAF9F6] transition-colors"
                        >
                          <Facebook className="w-4 h-4 text-[#1877F2]" />
                          Facebook
                        </button>
                        <button
                          onClick={() => handleShare('twitter')}
                          className="flex items-center gap-3 w-full px-4 py-3 text-left text-sm text-[#333333] hover:bg-[#FAF9F6] transition-colors"
                        >
                          <Twitter className="w-4 h-4 text-[#1DA1F2]" />
                          Twitter
                        </button>
                        <button
                          onClick={() => handleShare('linkedin')}
                          className="flex items-center gap-3 w-full px-4 py-3 text-left text-sm text-[#333333] hover:bg-[#FAF9F6] transition-colors"
                        >
                          <Linkedin className="w-4 h-4 text-[#0A66C2]" />
                          LinkedIn
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        
        {relatedPosts.length > 0 && (
          <section className="py-20 bg-[#FAF9F6]">
            <div className="container mx-auto px-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                className="max-w-6xl mx-auto"
              >
                <div className="text-center mb-12">
                  <h2 className="text-3xl lg:text-4xl font-light text-[#111111] mb-4">
                    Related Articles
                  </h2>
                  <p className="text-[#666666]">More insights from the {post.category} category</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {relatedPosts.map((relatedPost, index) => (
                    <motion.div
                      key={relatedPost.id}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: index * 0.1 }}
                      viewport={{ once: true }}
                    >
                      <Link href={`/blog/${relatedPost.slug}`} className="group block">
                        <article className="bg-white border border-gray-200 rounded-sm overflow-hidden hover:shadow-lg transition-all duration-300 h-full flex flex-col">
                          <div className="relative aspect-[4/3] overflow-hidden bg-gray-100">
                            <Image
                              src={
                                relatedPost.featured_image ||
                                'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAwIiBoZWlnaHQ9IjQwMCIgdmlld0JveD0iMCAwIDYwMCA0MDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSI2MDAiIGhlaWdodD0iNDAwIiBmaWxsPSIjRjhGNkYzIi8+Cjx0ZXh0IHg9IjMwMCIgeT0iMjAwIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBkb21pbmFudC1iYXNlbGluZT0iY2VudHJhbCIgZmlsbD0iIzhCNzM1NSIgZm9udC1mYW1pbHk9IkFyaWFsLCBzYW5zLXNlcmlmIiBmb250LXNpemU9IjE4Ij5CbG9nIFBvc3Q8L3RleHQ+Cjwvc3ZnPg=='
                              }
                              alt={relatedPost.title}
                              fill
                              className="object-cover transition-transform duration-300 group-hover:scale-105"
                              loading="lazy"
                            />
                          </div>

                          <div className="p-6 space-y-3 flex-1 flex flex-col">
                            <div className="flex items-center gap-4 text-xs text-[#8B7355] uppercase tracking-wider">
                              <span>{formatDate(relatedPost.published_at)}</span>
                              <span>•</span>
                              <span>By {relatedPost.author}</span>
                            </div>

                            <h3 className="text-lg font-semibold text-[#111111] group-hover:text-[#8B7355] transition-colors duration-200 leading-tight">
                              {relatedPost.title}
                            </h3>

                            <p className="text-[#666666] leading-relaxed text-sm flex-1">
                              {relatedPost.excerpt}
                            </p>

                            <div className="pt-4 mt-auto border-t border-gray-100">
                              <span className="text-sm font-semibold text-[#8B7355] uppercase tracking-wider group-hover:text-[#111111] transition-colors duration-200">
                                Read More →
                              </span>
                            </div>
                          </div>
                        </article>
                      </Link>
                    </motion.div>
                  ))}
                </div>

                <div className="text-center mt-12">
                  <Link
                    href="/blog"
                    className="inline-flex items-center gap-2 px-8 py-3 bg-[#111111] text-white text-sm font-medium uppercase tracking-wider hover:bg-[#333333] transition-colors"
                  >
                    View All Articles
                    <ArrowLeft className="w-4 h-4 rotate-180" />
                  </Link>
                </div>
              </motion.div>
            </div>
          </section>
        )}

        
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
