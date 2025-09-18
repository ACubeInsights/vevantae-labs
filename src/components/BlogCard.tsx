'use client'

import Image from 'next/image'
import Link from 'next/link'
import { BlogPost } from '@/lib/supabase'
import { formatDate, truncateText } from '@/lib/utils'

interface BlogCardProps {
  post: BlogPost
  className?: string
}

export function BlogCard({ post, className = '' }: BlogCardProps) {
  return (
    <article className={`group cursor-pointer ${className}`}>
      <Link href={`/blog/${post.slug}`} className="block">
        <div className="relative overflow-hidden bg-white">
          <Image
            src={post.image_url}
            alt={post.title}
            width={400}
            height={250}
            className="w-full h-[250px] object-cover transition-transform duration-300 group-hover:scale-105"
            loading="lazy"
          />
          
          {/* Category badge */}
          <div className="absolute top-4 left-4">
            <span className="bg-background/90 text-primary px-3 py-1 text-xs uppercase tracking-wider font-semibold">
              {post.category}
            </span>
          </div>
        </div>
        
        <div className="pt-6 space-y-3">
          <div className="flex items-center gap-4 text-xs text-secondary uppercase tracking-wider">
            <span>{formatDate(post.published_at)}</span>
            <span>•</span>
            <span>By {post.author}</span>
          </div>
          
          <h3 className="text-xl font-semibold text-primary group-hover:text-secondary transition-colors duration-200 leading-tight">
            {post.title}
          </h3>
          
          <p className="text-secondary leading-relaxed">
            {truncateText(post.excerpt, 120)}
          </p>
          
          {post.tags && post.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 pt-2">
              {post.tags.slice(0, 3).map((tag, index) => (
                <span
                  key={index}
                  className="text-xs text-amber bg-amber/10 px-2 py-1 rounded-sm"
                >
                  #{tag}
                </span>
              ))}
            </div>
          )}
          
          <div className="pt-4">
            <span className="text-sm font-semibold text-primary uppercase tracking-wider group-hover:text-secondary transition-colors duration-200">
              Read More →
            </span>
          </div>
        </div>
      </Link>
    </article>
  )
}