'use client';

import Image from 'next/image';
import Link from 'next/link';
import { BlogPost } from '@/lib/supabase';
import { formatDate } from '@/lib/utils';

interface BlogCardProps {
  post: BlogPost;
  className?: string;
}

export function BlogCard({ post, className = '' }: BlogCardProps) {
  return (
    <article
      className={`group cursor-pointer h-full flex flex-col bg-white border border-gray-200 rounded-sm overflow-hidden hover:shadow-lg transition-all duration-300 ${className}`}
    >
      <Link href={`/blog/${post.slug}`} className="block h-full flex flex-col">
        <div className="relative aspect-[4/5] overflow-hidden bg-gray-100">
          <Image
            src={
              post.featured_image ||
              'https://via.placeholder.com/600x400/F8F6F3/8B7355?text=Blog+Post'
            }
            alt={post.title}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
            loading="lazy"
          />

          
          <div className="absolute top-4 left-4">
            <span className="bg-white/90 text-[#8B7355] px-3 py-1 text-xs uppercase tracking-wider font-semibold rounded-sm">
              {post.category}
            </span>
          </div>
        </div>

        <div className="p-6 space-y-3 flex-1 flex flex-col min-h-0">
          <div className="flex items-center gap-4 text-xs text-[#8B7355] uppercase tracking-wider">
            <span>{formatDate(post.published_at)}</span>
            <span>•</span>
            <span>By {post.author}</span>
          </div>

          <h3 className="text-xl font-semibold text-[#111111] group-hover:text-[#8B7355] transition-colors duration-200 leading-tight line-clamp-2">
            {post.title}
          </h3>

          <p className="text-[#666666] leading-relaxed line-clamp-2">{post.excerpt}</p>

          <div className="flex flex-wrap gap-2 pt-2 h-6 overflow-hidden">
            {post.tags?.slice(0, 3).map((tag, index) => (
              <span
                key={index}
                className="text-xs text-[#8B7355] bg-[#8B7355]/10 px-2 py-1 rounded-sm"
              >
                #{tag}
              </span>
            ))}
          </div>

          <div className="pt-4 mt-auto border-t border-gray-100">
            <span className="text-sm font-semibold text-[#8B7355] uppercase tracking-wider group-hover:text-[#111111] transition-colors duration-200">
              Read More →
            </span>
          </div>
        </div>
      </Link>
    </article>
  );
}
